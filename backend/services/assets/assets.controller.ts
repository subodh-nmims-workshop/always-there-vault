import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Patch,
  BadRequestException,
  Inject,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AssetsService } from './assets.service';
import { IpfsService } from './ipfs.service';
import { CreateAssetDto, UpdateAssetDto } from './dto/asset.dto';
import { Asset } from './schemas/asset.schema';
import { UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from '../users/users.service';
import { TokenService } from '../auth/token.service';
import { eq } from 'drizzle-orm';
import { users } from '../../src/db/schema/users';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import * as jwt from 'jsonwebtoken';

@ApiTags('assets')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@SkipThrottle() // Authenticated users are already verified — rely on JWT, not rate limit
@Controller('api/assets')
export class AssetsController {
  constructor(
    private readonly assetsService: AssetsService,
    private readonly ipfsService: IpfsService,
    private readonly usersService: UsersService,
  ) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload an encrypted file to IPFS' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'File uploaded successfully' })
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 50 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: /(octet-stream|plain|pdf|png|jpe?g|gif|json|zip|msword|document)/ }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Req() req: any,
    @Query('folderId') folderId?: string,
  ): Promise<any> {
    if (hasDoubleExtension(file.originalname)) {
      throw new BadRequestException('Double file extensions are not allowed for security reasons.');
    }
    if (scanForExecutableMagicBytes(file.buffer)) {
      throw new BadRequestException('Uploaded file failed the malware/executable signature scan.');
    }
    const walletAddress = req.user.walletAddress;
    return this.assetsService.uploadFile(file, walletAddress, folderId);
  }

  @Post('ipfs')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload a file to IPFS via Pinata' })
  async uploadToIpfs(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 50 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: /(octet-stream|plain|pdf|png|jpe?g|gif|json|zip|msword|document)/ }),
        ],
      }),
    ) file: Express.Multer.File,
    @Req() req: any,
  ): Promise<any> {
    if (hasDoubleExtension(file.originalname)) {
      throw new BadRequestException('Double file extensions are not allowed for security reasons.');
    }
    if (scanForExecutableMagicBytes(file.buffer)) {
      throw new BadRequestException('Uploaded file failed the malware/executable signature scan.');
    }
    const walletAddress = req.user.walletAddress;
    
    // Check and increment Web3 storage quota
    const hasSpace = await this.usersService.checkAndIncrementStorage(walletAddress, file.size, 'web3');
    if (!hasSpace) {
      throw new BadRequestException('Web3 storage quota exceeded. Please upgrade your plan.');
    }

    return this.ipfsService.uploadFile(file);
  }

  @Post()
  @ApiOperation({ summary: 'Register asset metadata (encrypted data stored client-side)' })
  @ApiResponse({ status: 201, description: 'Asset metadata registered successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async createAsset(@Body() body: any, @Req() req: any): Promise<any> {
    const walletAddress = req.user.walletAddress;
    return this.assetsService.createAsset(body, walletAddress);
  }

  @Get()
  @ApiOperation({ summary: 'Get all asset metadata for a user' })
  @ApiResponse({ status: 200, description: 'Asset metadata retrieved successfully' })
  async getAllAssets(@Req() req: any): Promise<Asset[]> {
    const walletAddress = req.user.walletAddress;
    return this.assetsService.getAllAssets(walletAddress);
  }

  @Get('folders')
  @ApiOperation({ summary: 'Get all folders for a user' })
  @ApiResponse({ status: 200, description: 'Folders retrieved successfully' })
  async getAllFolders(@Req() req: any): Promise<any[]> {
    const walletAddress = req.user.walletAddress;
    return this.assetsService.getAllFolders(walletAddress);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get specific asset metadata' })
  @ApiResponse({ status: 200, description: 'Asset metadata retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Asset not found' })
  async getAssetMock(): Promise<any> { return null; }

  @Put(':id')
  @ApiOperation({ summary: 'Update asset metadata' })
  @ApiResponse({ status: 200, description: 'Asset metadata updated successfully' })
  @ApiResponse({ status: 404, description: 'Asset not found' })
  async updateAssetMock(): Promise<any> { return null; }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete asset metadata' })
  @ApiResponse({ status: 204, description: 'Asset metadata deleted successfully' })
  @ApiResponse({ status: 404, description: 'Asset not found' })
  async deleteAsset(@Param('id') id: string, @Req() req: any): Promise<any> {
    const walletAddress = req.user.walletAddress;
    return this.assetsService.deleteAsset(id, walletAddress);
  }

  @Post('folders')
  @ApiOperation({ summary: 'Create a new folder' })
  async createFolder(
    @Body('name') name: string,
    @Req() req: any,
    @Body('parentId') parentId?: string,
    @Body('id') id?: string,
    @Body('beneficiaries') beneficiaries?: string[],
    @Body('type') type?: string,
  ) {
    const wallet = req.user.walletAddress;
    return this.assetsService.createFolder(name, wallet, parentId, id, beneficiaries, type);
  }

  @Get('contents')
  @ApiOperation({ summary: 'Get folder contents (subfolders and assets)' })
  async getContents(
    @Req() req: any,
    @Query('folderId') folderId?: string,
    @Query('ownerAddress') ownerAddress?: string,
  ) {
    const wallet = req.user.walletAddress;
    return this.assetsService.getFolderContents(wallet, folderId, ownerAddress);
  }

  @Post('folders/:id/share')
  @ApiOperation({ summary: 'Share a folder with another wallet' })
  async shareFolder(
    @Param('id') id: string,
    @Body('walletToShareWith') wallet: string,
    @Req() req: any,
    @Body('permission') permission?: string
  ) {
    return this.assetsService.shareFolder(id, req.user.walletAddress, wallet, permission);
  }

  @Get(':id/release-status')
  @ApiOperation({ summary: 'Check if asset is ready for release to beneficiaries' })
  @ApiResponse({ status: 200, description: 'Release status retrieved successfully' })
  async getReleaseStatus(@Param('id') id: string): Promise<{ canRelease: boolean; reason: string }> {
    return this.assetsService.getReleaseStatus(id);
  }

  @Post('keys/:id')
  @ApiOperation({ summary: 'Store key distribution for recovery' })
  async saveKey(@Param('id') id: string, @Body('shares') shares: any, @Req() req: any) {
    return this.assetsService.saveKeyDistribution(id, req.user.walletAddress, shares);
  }

  @Get('keys/:id')
  @ApiOperation({ summary: 'Retrieve key distribution for decryption' })
  async getKey(@Param('id') id: string, @Req() req: any) {
    const requesterWallet = req.user.walletAddress;
    return this.assetsService.getKeyDistribution(id, requesterWallet);
  }
  @Get(':id/download')
  @ApiOperation({ summary: 'Get a temporary download URL for an asset' })
  async getDownloadUrl(@Param('id') id: string, @Req() req: any) {
    const walletAddress = req.user.walletAddress;
    return this.assetsService.getDownloadUrl(id, walletAddress);
  }

  @Patch('folders/:id')
  @ApiOperation({ summary: 'Update folder details (rename, move, etc)' })
  async updateFolder(
    @Param('id') id: string,
    @Req() req: any,
    @Body('name') name?: string,
    @Body('parentId') parentId?: string,
    @Body('type') type?: string,
    @Body('beneficiaries') beneficiaries?: string[]
  ) {
    return this.assetsService.updateFolder(id, req.user.walletAddress, { name, parentId, type, beneficiaries });
  }

  @Patch(':id/assign-nominee')
  @ApiOperation({ summary: 'Assign a specific nominee to receive this file on heartbeat timeout' })
  async assignNominee(
    @Param('id') id: string,
    @Body('assignedBeneficiaryId') assignedBeneficiaryId: string | null,
    @Req() req: any,
  ) {
    const walletAddress = req.user.walletAddress;
    return this.assetsService.assignNomineeToFile(id, walletAddress, assignedBeneficiaryId ?? null);
  }

  @Delete('folders/:id')
  @ApiOperation({ summary: 'Delete folder and all its contents' })
  @ApiResponse({ status: 200, description: 'Folder deleted successfully' })
  @ApiResponse({ status: 404, description: 'Folder not found' })
  async deleteFolder(@Param('id') id: string, @Req() req: any) {
    const walletAddress = req.user.walletAddress;
    return this.assetsService.deleteFolder(id, walletAddress);
  }
}

/**
 * PUBLIC endpoint — no JWT required.
 * Beneficiaries use their CLAIM_ACCESS token (from email) to access assets.
 */
@ApiTags('claim-assets')
@Throttle({ strict: { ttl: 60000, limit: 10 } }) // Max 10 claim attempts per minute per IP
@Controller('api/claim-assets')
export class ClaimAssetsController {
  constructor(
    private readonly assetsService: AssetsService,
    private readonly tokenService: TokenService,
    @Inject('DRIZZLE_DB') private db: any,
  ) {}

  private verifyClaimSessionToken(claimToken: string): { userId: string; targetAddress: string } {
    try {
      const decoded: any = jwt.verify(claimToken, process.env.JWT_SECRET || 'secret');
      if (decoded.type !== 'CLAIM_SESSION') {
        throw new BadRequestException('Invalid claim token type.');
      }
      return {
        userId: decoded.userId,
        targetAddress: decoded.targetAddress,
      };
    } catch (e) {
      throw new BadRequestException('Invalid or expired claim token.');
    }
  }

  @Get('contents')
  @ApiOperation({ summary: 'Get owner assets using a CLAIM_ACCESS token (public, no JWT)' })
  async getClaimContents(
    @Query('claimToken') claimToken: string,
    @Query('folderId') folderId?: string,
  ) {
    if (!claimToken) throw new BadRequestException('claimToken is required');

    const decoded = this.verifyClaimSessionToken(claimToken);

    // Get owner wallet address from userId
    const owner = await this.db.query.users.findFirst({
      where: eq(users.id, decoded.userId)
    });

    if (!owner) throw new BadRequestException('Owner account not found.');

    const nomineeWallet = decoded.targetAddress;

    // getFolderContents with nominee check (already verifies heartbeat status)
    return this.assetsService.getFolderContents(nomineeWallet, folderId, owner.walletAddress);
  }

  @Get('download/:id')
  @ApiOperation({ summary: 'Get download URL for an asset using a CLAIM_ACCESS token (public)' })
  async getClaimDownload(
    @Param('id') assetId: string,
    @Query('claimToken') claimToken: string,
  ) {
    if (!claimToken) throw new BadRequestException('claimToken is required');

    const decoded = this.verifyClaimSessionToken(claimToken);
    const nomineeWallet = decoded.targetAddress;

    return this.assetsService.getDownloadUrl(assetId, nomineeWallet);
  }

  @Get('keys/:keyId')
  @ApiOperation({ summary: 'Retrieve key distribution using a CLAIM_ACCESS token (public)' })
  async getClaimKey(
    @Param('keyId') keyId: string,
    @Query('claimToken') claimToken: string,
  ) {
    if (!claimToken) throw new BadRequestException('claimToken is required');

    const decoded = this.verifyClaimSessionToken(claimToken);
    const nomineeWallet = decoded.targetAddress;

    return this.assetsService.getKeyDistribution(keyId, nomineeWallet);
  }

  @Get('local-download/:key')
  @ApiOperation({ summary: 'Download a simulated local asset (Dev Fallback)' })
  async downloadLocalAsset(@Param('key') key: string, @Res() res: any) {
    const fs = await import('fs/promises');
    const path = await import('path');
    const uploadDir = path.join(process.cwd(), 'uploads');
    const filePath = path.join(uploadDir, encodeURIComponent(key));
    
    try {
      const buffer = await fs.readFile(filePath);
      res.setHeader('Content-Type', 'application/octet-stream');
      res.send(buffer);
    } catch (e) {
      throw new NotFoundException('Local asset file not found');
    }
  }
}

function scanForExecutableMagicBytes(buffer: Buffer): boolean {
  if (!buffer || buffer.length < 4) return false;
  
  // MZ (PE Executable)
  if (buffer[0] === 0x4D && buffer[1] === 0x5A) {
    return true;
  }
  
  // ELF Executable
  if (buffer[0] === 0x7F && buffer[1] === 0x45 && buffer[2] === 0x4c && buffer[3] === 0x46) {
    return true;
  }
  
  // Mach-O Executable
  try {
    const magic = buffer.readUInt32BE(0);
    if (magic === 0xFEEDFACE || magic === 0xFEEDFACF || magic === 0xCEFAEDFE || magic === 0xCFFAEDFE) {
      return true;
    }
  } catch (e) {
    // Ignore read errors for very small files
  }
  
  return false;
}

function hasDoubleExtension(filename: string): boolean {
  if (!filename) return false;
  const parts = filename.split('.');
  if (parts.length < 3) return false;
  const blockedExtensions = ['exe', 'bat', 'cmd', 'sh', 'bash', 'scr', 'dll', 'msi', 'com', 'vbs', 'js', 'jar'];
  const lastExt = parts[parts.length - 1].toLowerCase();
  const secondLastExt = parts[parts.length - 2].toLowerCase();
  return blockedExtensions.includes(lastExt) || blockedExtensions.includes(secondLastExt);
}

