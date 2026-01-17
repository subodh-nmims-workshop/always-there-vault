import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssetDto, UpdateAssetDto, AssetMetadataDto } from './dto/asset.dto';

@Injectable()
export class AssetsService {
  // In-memory storage for demo (replace with database in production)
  private assets: Map<string, AssetMetadataDto> = new Map();

  async createAsset(createAssetDto: CreateAssetDto): Promise<AssetMetadataDto> {
    const asset: AssetMetadataDto = {
      id: this.generateId(),
      ...createAssetDto,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'active',
    };

    this.assets.set(asset.id, asset);
    return asset;
  }

  async getAllAssets(walletAddress: string): Promise<AssetMetadataDto[]> {
    return Array.from(this.assets.values()).filter(
      (asset) => asset.ownerAddress === walletAddress,
    );
  }

  async getAsset(id: string): Promise<AssetMetadataDto> {
    const asset = this.assets.get(id);
    if (!asset) {
      throw new NotFoundException(`Asset with ID ${id} not found`);
    }
    return asset;
  }

  async updateAsset(id: string, updateAssetDto: UpdateAssetDto): Promise<AssetMetadataDto> {
    const asset = await this.getAsset(id);
    const updatedAsset = {
      ...asset,
      ...updateAssetDto,
      updatedAt: new Date(),
    };
    this.assets.set(id, updatedAsset);
    return updatedAsset;
  }

  async deleteAsset(id: string): Promise<void> {
    const asset = await this.getAsset(id);
    this.assets.delete(id);
  }

  async getReleaseStatus(id: string): Promise<{ canRelease: boolean; reason: string }> {
    const asset = await this.getAsset(id);
    
    // Check if asset can be released based on heartbeat status
    // This would integrate with blockchain smart contract in production
    return {
      canRelease: asset.status === 'active',
      reason: asset.status === 'active' 
        ? 'Asset is active and ready for release' 
        : 'Asset is not in releasable state',
    };
  }

  private generateId(): string {
    return `asset_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
