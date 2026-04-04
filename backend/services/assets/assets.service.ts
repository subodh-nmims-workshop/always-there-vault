import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { eq, and, isNull, or, sql } from 'drizzle-orm';
import { users } from '../../src/db/schema/users';
import { folders, type NewFolder } from '../../src/db/schema/folders';
import { files, type NewFile } from '../../src/db/schema/files';
import { sharedAccess, type NewSharedAccess } from '../../src/db/schema/sharing';
import { IpfsService } from './ipfs.service';
import { UsersService } from '../users/users.service';
import { AuditService } from '../audit/audit.service';
import { SecureEncryptionService } from '../crypto/secure-encryption.service';
import { MalwareScannerService } from './malware-scanner.service';

@Injectable()
export class AssetsService {
  constructor(
    @Inject('DRIZZLE_DB') private db: any,
    private usersService: UsersService,
    private ipfsService: IpfsService,
    private auditService: AuditService,
    private encryptionService: SecureEncryptionService,
    private scannerService: MalwareScannerService,
  ) { }

  async createFolder(name: string, walletAddress: string, parentId?: string, id?: string, beneficiaries?: string[]) {
    const user = await this.usersService.findUserByWallet(walletAddress);
    
    // Check if the UUID was generated from the frontend
    const folderId = id || undefined;

    const [folder] = await this.db.insert(folders).values({
      id: folderId as any,
      name,
      userId: user.id,
      parentId: parentId || null,
    } as NewFolder).returning();

    await this.auditService.trackAction(user.id, 'CREATE_FOLDER', 'FOLDER', folder.id, { name });

    // Give beneficiaries access
    if (beneficiaries && beneficiaries.length > 0) {
      for (const benId of beneficiaries) {
        // Here we just map to the beneficiary's raw id if possible,
        // or wait, shared_access uses userId!
        // The frontend is sending the 'beneficiaries' UUID array from the Local DB.
        // It's just local string tracking so we keep it simple for now or fetch corresponding emails.
      }
    }

    return folder;
  }

  async getFolderContents(walletAddress: string, folderId?: string) {
    const user = await this.usersService.findUserByWallet(walletAddress);

    const folderList = await this.db.query.folders.findMany({
      where: and(
        eq(folders.userId, user.id),
        folderId ? eq(folders.parentId, folderId) : isNull(folders.parentId)
      ),
    });

    const fileList = await this.db.query.files.findMany({
      where: and(
        eq(files.userId, user.id),
        folderId ? eq(files.folderId, folderId) : isNull(files.folderId)
      ),
    });

    return { folders: folderList, assets: fileList };
  }

  async uploadFile(file: Express.Multer.File, walletAddress: string, folderId?: string) {
    const user = await this.usersService.findUserByWallet(walletAddress);

    // SECURITY SCAN: Prevent Malware/Scripts/Executables
    const scanResult = await this.scannerService.scanFile(file.buffer, file.originalname);
    if (!scanResult.safe) {
      this.auditService.trackAction(user.id, 'MALWARE_DETECTED', 'SECURITY', null, { 
        name: file.originalname, 
        reason: scanResult.reason 
      });
      throw new BadRequestException(scanResult.reason || 'Malicious or unauthorized file detected.');
    }

    // Check quota
    const hasSpace = await this.usersService.checkAndIncrementStorage(walletAddress, file.size);
    if (!hasSpace) {
      throw new BadRequestException('Storage quota exceeded');
    }

    // MANDATORY SERVER-SIDE ENCRYPTION
    // Even if the client already encrypted, we add another layer of protection
    // controlled by the master key hierarchy.
    const encryptedResult = await this.encryptionService.encryptFile(file.buffer, user.id);

    // Upload ENCRYPTED buffer to IPFS
    const ipfsResult = await this.ipfsService.uploadBuffer(encryptedResult.encrypted, file.originalname);

    // Create file record with envelope encryption metadata
    const [fileRecord] = await this.db.insert(files).values({
      name: file.originalname,
      size: file.size,
      mimeType: file.mimetype,
      cid: ipfsResult.cid,
      location: ipfsResult.cid,
      isIpfs: true,
      encrypted: true,
      
      // Envelope Encryption Metadata
      encryptedFEK: encryptedResult.encryptedFEK,
      fekIv: encryptedResult.fekIv,
      fekAuthTag: encryptedResult.fekAuthTag,
      fileIv: encryptedResult.fileIv,
      fileAuthTag: encryptedResult.fileAuthTag,
      
      userId: user.id,
      folderId: folderId || null,
    } as NewFile).returning();

    await this.auditService.trackAction(user.id, 'UPLOAD_FILE', 'FILE', fileRecord.id, { name: fileRecord.name });

    return fileRecord;
  }

  async createAsset(data: any, walletAddress: string) {
    const user = await this.usersService.findUserByWallet(walletAddress);

    const [fileRecord] = await this.db.insert(files).values({
      id: data.id || undefined,
      name: data.name,
      size: data.size || 0,
      mimeType: data.mimeType || 'application/json',
      cid: data.ipfsHash || null,
      location: data.ipfsHash || 'local',
      encryptionKeyId: data.keyId || null,
      encryptionIv: data.iv || null,
      encryptedData: data.encryptedData || null,
      encryptionKey: data.encryptionKey || null,
      isIpfs: !!data.ipfsHash,
      metadata: data.metadata || {},
      userId: user.id,
      folderId: data.folderId || null,
    } as NewFile).returning();

    await this.auditService.trackAction(user.id, 'CREATE_ASSET', 'FILE', fileRecord.id, { name: fileRecord.name, type: fileRecord.mimeType });

    if (data.beneficiaries && data.beneficiaries.length > 0) {
      // Loop or store logical tracking if desired
    }

    return fileRecord;
  }

  async shareFolder(folderId: string, walletToShareWith: string, permission: string = 'READ') {
    try {
      const targetUser = await this.usersService.findUserByWallet(walletToShareWith);
      if (targetUser) {
        const [share] = await this.db.insert(sharedAccess).values({
          folderId,
          userId: targetUser.id,
          permission,
        } as NewSharedAccess).returning();
        return share;
      }
    } catch (e) {
      console.warn('Target user not registered yet for sharing, tracking via frontend exclusively for now.', walletToShareWith);
      return null;
    }
  }

  async getAllAssets(walletAddress: string) {
    const user = await this.usersService.findUserByWallet(walletAddress);
    return this.db.query.files.findMany({
      where: eq(files.userId, user.id),
    });
  }

  async deleteAsset(id: string) {
    const file = await this.db.query.files.findFirst({
      where: eq(files.id, id),
    });

    if (!file) throw new NotFoundException('Asset not found');

    await this.db.delete(files).where(eq(files.id, id));
    
    // Decrement storage
    const user = await this.db.query.users.findFirst({
        where: eq(users.id, file.userId)
    });
    if (user) {
        await this.usersService.decrementStorage(user.walletAddress, file.size);
    }

    await this.auditService.trackAction(file.userId, 'DELETE_ASSET', 'FILE', id, { name: file.name });

    return { success: true };
  }

  async updateFolder(id: string, updates: { name?: string, parentId?: string, beneficiaries?: string[] }) {
    const updateData: any = { updatedAt: new Date() };
    if (updates.name) updateData.name = updates.name;
    if (updates.parentId !== undefined) updateData.parentId = updates.parentId;
    
    await this.db.update(folders).set(updateData).where(eq(folders.id, id));
    return { success: true };
  }

  async getReleaseStatus(id: string): Promise<{ canRelease: boolean; reason: string }> {
    // Basic logic for now
    return { canRelease: false, reason: 'Manual trigger only for now' };
  }

  async saveKeyDistribution(keyId: string, shares: any) {
    const { keyDistributions } = await import('../../src/db/schema/keys');
    return this.db.insert(keyDistributions).values({
      keyId,
      shares,
    }).onConflictDoUpdate({
      target: keyDistributions.keyId,
      set: { shares }
    }).returning();
  }

  async getKeyDistribution(keyId: string) {
    const { keyDistributions } = await import('../../src/db/schema/keys');
    const result = await this.db.query.keyDistributions.findFirst({
      where: eq(keyDistributions.keyId, keyId),
    });
    if (!result) throw new NotFoundException('Key distribution not found');
    return result;
  }
}
