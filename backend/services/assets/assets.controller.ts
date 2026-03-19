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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { AssetsService } from './assets.service';
import { IpfsService } from './ipfs.service';
import { CreateAssetDto, UpdateAssetDto } from './dto/asset.dto';
import { Asset } from './schemas/asset.schema';

@ApiTags('assets')
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
    @Query('walletAddress') walletAddress: string,
  ): Promise<{ ipfsHash: string }> {
    return this.assetsService.uploadFile(file, walletAddress);
  }

  @Post()
  @ApiOperation({ summary: 'Register asset metadata (encrypted data stored client-side)' })
  @ApiResponse({ status: 201, description: 'Asset metadata registered successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async createAsset(@Body() createAssetDto: CreateAssetDto): Promise<Asset> {
    return this.assetsService.createAsset(createAssetDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all asset metadata for a user' })
  @ApiResponse({ status: 200, description: 'Asset metadata retrieved successfully' })
  async getAllAssets(@Query('walletAddress') walletAddress: string): Promise<Asset[]> {
    return this.assetsService.getAllAssets(walletAddress);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get specific asset metadata' })
  @ApiResponse({ status: 200, description: 'Asset metadata retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Asset not found' })
  async getAsset(@Param('id') id: string): Promise<Asset> {
    return this.assetsService.getAsset(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update asset metadata' })
  @ApiResponse({ status: 200, description: 'Asset metadata updated successfully' })
  @ApiResponse({ status: 404, description: 'Asset not found' })
  async updateAsset(
    @Param('id') id: string,
    @Body() updateAssetDto: UpdateAssetDto,
  ): Promise<Asset> {
    return this.assetsService.updateAsset(id, updateAssetDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete asset metadata' })
  @ApiResponse({ status: 204, description: 'Asset metadata deleted successfully' })
  @ApiResponse({ status: 404, description: 'Asset not found' })
  async deleteAsset(@Param('id') id: string): Promise<void> {
    return this.assetsService.deleteAsset(id);
  }

  @Post('folders')
  @ApiOperation({ summary: 'Create a new folder' })
  async createFolder(
    @Body('name') name: string,
    @Body('walletAddress') wallet: string,
    @Body('parentId') parentId?: string
  ) {
    return this.assetsService.createFolder(name, wallet, parentId);
  }

  @Get('contents')
  @ApiOperation({ summary: 'Get folder contents (subfolders and assets)' })
  async getContents(
    @Query('walletAddress') wallet: string,
    @Query('folderId') folderId?: string
  ) {
    return this.assetsService.getFolderContents(wallet, folderId);
  }

  @Post('folders/:id/share')
  @ApiOperation({ summary: 'Share a folder with another wallet' })
  async shareFolder(
    @Param('id') id: string,
    @Body('walletToShareWith') wallet: string,
    @Body('permission') permission?: string
  ) {
    return this.assetsService.shareFolder(id, wallet, permission);
  }

  @Get(':id/release-status')
  @ApiOperation({ summary: 'Check if asset is ready for release to beneficiaries' })
  @ApiResponse({ status: 200, description: 'Release status retrieved successfully' })
  async getReleaseStatus(@Param('id') id: string): Promise<{ canRelease: boolean; reason: string }> {
    return this.assetsService.getReleaseStatus(id);
  }
}
