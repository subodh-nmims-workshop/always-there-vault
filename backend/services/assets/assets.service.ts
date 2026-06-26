import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
import { HeartbeatService } from '../heartbeat/heartbeat.service';
import { beneficiaries } from '../../src/db/schema/beneficiaries';

import { B2Service } from './b2.service';

@Injectable()
export class AssetsService {
  constructor(
    @Inject('DRIZZLE_DB') private db: any,
    private usersService: UsersService,
    private ipfsService: IpfsService,
    private b2Service: B2Service,
    private auditService: AuditService,
    private encryptionService: SecureEncryptionService,
    private scannerService: MalwareScannerService,
    private heartbeatService: HeartbeatService,
    private configService: ConfigService,
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

  async getFolderContents(walletAddress: string, folderId?: string, ownerAddress?: string) {
    let targetUserId: string;

    if (ownerAddress && ownerAddress.toLowerCase() !== walletAddress.toLowerCase()) {
      // Requester is checking another user's assets (nominee check)
      const owner = await this.usersService.findUserByWallet(ownerAddress);
      if (!owner) throw new NotFoundException('Owner not found');

      // Verify nominee status
      const isNominee = await this.db.query.beneficiaries.findFirst({
        where: and(
          eq(beneficiaries.userId, owner.id),
          eq(beneficiaries.walletAddress, walletAddress)
        )
      });

      if (!isNominee) {
        throw new BadRequestException('Access denied. You are not a beneficiary of this wallet.');
      }

      // Check heartbeat status of the owner
      const status: any = await this.heartbeatService.getHeartbeatStatus(ownerAddress);
      if (status.status !== 'overdue' && status.status !== 'grace_period') {
        throw new BadRequestException('Access denied. Protocol has not been triggered yet.');
      }

      targetUserId = owner.id;
    } else {
      // User is checking their own assets
      const user = await this.usersService.findUserByWallet(walletAddress);
      if (!user) throw new NotFoundException('User not found');
      targetUserId = user.id;
    }

    const folderList = await this.db.query.folders.findMany({
      where: and(
        eq(folders.userId, targetUserId),
        folderId ? eq(folders.parentId, folderId) : isNull(folders.parentId)
      ),
    });

    const fileList = await this.db.query.files.findMany({
      where: and(
        eq(files.userId, targetUserId),
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
    const hasSpace = await this.usersService.checkAndIncrementStorage(walletAddress, file.size, 'cloud');
    if (!hasSpace) {
      throw new BadRequestException('Storage quota exceeded');
    }

    // MANDATORY SERVER-SIDE ENCRYPTION
    const encryptedResult = await this.encryptionService.encryptFile(file.buffer, user.id);

    // Upload to Backblaze B2 (Optimized for Cold Storage)
    const b2Key = `${walletAddress}/${Date.now()}-${file.originalname}`;
    const b2Result = await this.b2Service.uploadFile(
      b2Key,
      encryptedResult.encrypted, 
      file.mimetype
    );

    // Create file record with envelope encryption metadata
    const [fileRecord] = await this.db.insert(files).values({
      name: file.originalname,
      size: file.size,
      mimeType: file.mimetype,
      location: b2Result,
      isIpfs: false,
      encrypted: true,
      
      // Envelope Encryption Metadata
      encryptedFEK: encryptedResult.encryptedFEK,
      fekIv: encryptedResult.fekIv,
      fekAuthTag: encryptedResult.fekAuthTag,
      fileIv: encryptedResult.fileIv,
      fileAuthTag: encryptedResult.fileAuthTag,
      
      userId: user.id,
      folderId: folderId || null,
      metadata: { 
        storageProvider: 'backblaze-b2',
        bucket: this.configService.get('B2_BUCKET_NAME')
      }
    } as NewFile).returning();

    await this.auditService.trackAction(user.id, 'UPLOAD_FILE', 'FILE', fileRecord.id, { 
      name: fileRecord.name,
      provider: 'B2'
    });

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

  async getDownloadUrl(id: string, walletAddress: string) {
    const user = await this.usersService.findUserByWallet(walletAddress);
    let file = await this.db.query.files.findFirst({
      where: and(eq(files.id, id), eq(files.userId, user.id)),
    });

    if (!file) {
      // Check if it belongs to someone else and requester is a nominee
      const fileToClaim = await this.db.query.files.findFirst({
        where: eq(files.id, id),
      });

      if (fileToClaim) {
        const owner = await this.db.query.users.findFirst({
          where: eq(users.id, fileToClaim.userId),
        });

        if (owner) {
          const isNominee = await this.db.query.beneficiaries.findFirst({
            where: and(
              eq(beneficiaries.userId, owner.id),
              eq(beneficiaries.walletAddress, walletAddress)
            )
          });

          if (isNominee) {
            const status: any = await this.heartbeatService.getHeartbeatStatus(owner.walletAddress);
            if (status.status === 'overdue' || status.status === 'grace_period') {
              file = fileToClaim;
            }
          }
        }
      }
    }

    if (!file) throw new NotFoundException('Asset not found or access denied');

    if (file.metadata?.storageProvider === 'backblaze-b2') {
      const url = await this.b2Service.getDownloadUrl(file.location);
      return { url, provider: 'B2' };
    }

    if (file.isIpfs) {
      return { url: `https://ipfs.io/ipfs/${file.cid}`, provider: 'IPFS' };
    }

    return { url: file.location, provider: 'Local' };
  }

  async shareFolder(folderId: string, ownerWalletAddress: string, walletToShareWith: string, permission: string = 'READ') {
    try {
      const ownerUser = await this.usersService.findUserByWallet(ownerWalletAddress);
      const folder = await this.db.query.folders.findFirst({
        where: and(eq(folders.id, folderId), eq(folders.userId, ownerUser.id)),
      });
      if (!folder) throw new NotFoundException('Folder not found or access denied');

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

  async deleteAsset(id: string, walletAddress: string) {
    const user = await this.usersService.findUserByWallet(walletAddress);
    const file = await this.db.query.files.findFirst({
      where: and(eq(files.id, id), eq(files.userId, user.id)),
    });

    if (!file) throw new NotFoundException('Asset not found or access denied');

    await this.db.delete(files).where(eq(files.id, id));
    
    // Decrement storage
    await this.usersService.decrementStorage(user.walletAddress, file.size, file.isIpfs ? 'web3' : 'cloud');

    await this.auditService.trackAction(file.userId, 'DELETE_ASSET', 'FILE', id, { name: file.name });

    return { success: true };
  }

  async updateFolder(id: string, walletAddress: string, updates: { name?: string, parentId?: string, beneficiaries?: string[] }) {
    const user = await this.usersService.findUserByWallet(walletAddress);
    const folder = await this.db.query.folders.findFirst({
      where: and(eq(folders.id, id), eq(folders.userId, user.id)),
    });
    if (!folder) throw new NotFoundException('Folder not found or access denied');

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

  async saveKeyDistribution(keyId: string, walletAddress: string, shares: any) {
    const user = await this.usersService.findUserByWallet(walletAddress);
    
    // Verify the asset belongs to the user
    const asset = await this.db.query.files.findFirst({
      where: and(eq(files.encryptionKeyId, keyId), eq(files.userId, user.id)),
    });
    if (!asset) throw new NotFoundException('Asset for this key not found or access denied');

    const { keyDistributions } = await import('../../src/db/schema/keys');
    return this.db.insert(keyDistributions).values({
      keyId,
      shares,
    }).onConflictDoUpdate({
      target: keyDistributions.keyId,
      set: { shares }
    }).returning();
  }

  async getKeyDistribution(keyId: string, requesterWallet: string) {
    const { keyDistributions } = await import('../../src/db/schema/keys');
    
    // 1. Find the asset associated with this key to identify the owner
    const asset = await this.db.query.files.findFirst({
      where: eq(files.encryptionKeyId, keyId),
    });

    if (!asset) {
        // If no asset found, maybe it's just a raw key store. Check direct ownership if possible.
        // For now, if we can't find the asset, we can't verify nominee status.
        throw new NotFoundException('Key distribution or associated asset not found');
    }

    const owner = await this.db.query.users.findFirst({
        where: eq(users.id, asset.userId)
    });

    // 2. If requester is owner, allow access
    if (owner && owner.walletAddress.toLowerCase() === requesterWallet.toLowerCase()) {
        const result = await this.db.query.keyDistributions.findFirst({
            where: eq(keyDistributions.keyId, keyId),
        });
        return result;
    }

    // 3. If requester is a nominee
    const isNominee = await this.db.query.beneficiaries.findFirst({
        where: and(
            eq(beneficiaries.userId, owner.id),
            eq(beneficiaries.walletAddress, requesterWallet)
        )
    });

    if (isNominee) {
        // CHECK PROTOCOL STATUS
        const status: any = await this.heartbeatService.getHeartbeatStatus(owner.walletAddress);
        if (status.status === 'overdue' || status.status === 'grace_period') {
             const result = await this.db.query.keyDistributions.findFirst({
                where: eq(keyDistributions.keyId, keyId),
            });
            await this.auditService.trackAction(isNominee.id, 'CLAIM_KEY', 'SECURITY', keyId, { owner: owner.walletAddress });
            return result;
        } else {
            throw new BadRequestException('Protocol not yet triggered. Heartbeat is still active.');
        }
    }

    // 4. Unauthorized
    await this.auditService.trackAction(owner.id, 'UNAUTHORIZED_KEY_ACCESS', 'SECURITY', keyId, { requester: requesterWallet });
    throw new NotFoundException('Key not found or access denied');
  }
}
