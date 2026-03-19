import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { eq, and, isNull, or, sql } from 'drizzle-orm';
import { users } from '../../src/db/schema/users';
import { folders, type NewFolder } from '../../src/db/schema/folders';
import { files, type NewFile } from '../../src/db/schema/files';
import { sharedAccess, type NewSharedAccess } from '../../src/db/schema/sharing';
import { IpfsService } from './ipfs.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AssetsService {
  constructor(
    @Inject('DRIZZLE_DB') private db: any,
    private usersService: UsersService,
    private ipfsService: IpfsService,
  ) { }

  async createFolder(name: string, walletAddress: string, parentId?: string) {
    const user = await this.usersService.findUserByWallet(walletAddress);
    
    const [folder] = await this.db.insert(folders).values({
      name,
      userId: user.id,
      parentId: parentId || null,
    } as NewFolder).returning();

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

    // Check quota
    const hasSpace = await this.usersService.checkAndIncrementStorage(walletAddress, file.size);
    if (!hasSpace) {
      throw new Error('Storage quota exceeded');
    }

    // Upload to IPFS (using existing service logic)
    const ipfsResult = await this.ipfsService.uploadFile(file);

    // Create file record
    const [fileRecord] = await this.db.insert(files).values({
      name: file.originalname,
      size: file.size,
      mimeType: file.mimetype,
      cid: ipfsResult.cid,
      location: ipfsResult.cid,
      isIpfs: true,
      userId: user.id,
      folderId: folderId || null,
    } as NewFile).returning();

    return fileRecord;
  }

  async shareFolder(folderId: string, walletToShareWith: string, permission: string = 'READ') {
    const targetUser = await this.usersService.findUserByWallet(walletToShareWith);
    
    const [share] = await this.db.insert(sharedAccess).values({
      folderId,
      userId: targetUser.id,
      permission,
    } as NewSharedAccess).returning();

    return share;
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

    return { success: true };
  }

  async getReleaseStatus(id: string): Promise<{ canRelease: boolean; reason: string }> {
    // Basic logic for now
    return { canRelease: false, reason: 'Manual trigger only for now' };
  }
}
