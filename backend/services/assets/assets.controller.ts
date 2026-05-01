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
  Patch,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AssetsService } from './assets.service';
import { IpfsService } from './ipfs.service';
import { CreateAssetDto, UpdateAssetDto } from './dto/asset.dto';
import { Asset } from './schemas/asset.schema';
import { UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('assets')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/assets')
export class AssetsController {
  constructor(
    private readonly assetsService: AssetsService,
    private readonly ipfsService: IpfsService,
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
        ],
      }),
    )
    file: Express.Multer.File,
    @Req() req: any,
    @Query('folderId') folderId?: string,
  ): Promise<any> {
    const walletAddress = req.user.walletAddress;
    return this.assetsService.uploadFile(file, walletAddress, folderId);
  }

  @Post('ipfs')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload a file to IPFS via Pinata' })
  async uploadToIpfs(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
  ): Promise<any> {
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
  async deleteAssetMock(): Promise<any> { return null; }

  @Post('folders')
  @ApiOperation({ summary: 'Create a new folder' })
  async createFolder(
    @Body('name') name: string,
    @Req() req: any,
    @Body('parentId') parentId?: string,
    @Body('id') id?: string,
    @Body('beneficiaries') beneficiaries?: string[]
  ) {
    const wallet = req.user.walletAddress;
    return this.assetsService.createFolder(name, wallet, parentId, id, beneficiaries);
  }

  @Get('contents')
  @ApiOperation({ summary: 'Get folder contents (subfolders and assets)' })
  async getContents(
    @Req() req: any,
    @Query('folderId') folderId?: string
  ) {
    const wallet = req.user.walletAddress;
    return this.assetsService.getFolderContents(wallet, folderId);
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
    @Body('beneficiaries') beneficiaries?: string[]
  ) {
    return this.assetsService.updateFolder(id, req.user.walletAddress, { name, parentId, beneficiaries });
  }
}
