import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAssetDto, UpdateAssetDto, AssetMetadataDto } from './dto/asset.dto';
import { Asset, AssetDocument } from './schemas/asset.schema';

@Injectable()
export class AssetsService {
  constructor(
    @InjectModel(Asset.name) private assetModel: Model<AssetDocument>,
  ) { }

  async createAsset(createAssetDto: any): Promise<Asset> {
    const newAsset = new this.assetModel({
      assetId: this.generateId(),
      ...createAssetDto,
    });
    return newAsset.save();
  }

  async getAllAssets(ownerWallet: string): Promise<Asset[]> {
    return this.assetModel.find({ ownerWallet }).exec();
  }

  async getAsset(assetId: string): Promise<Asset> {
    const asset = await this.assetModel.findOne({ assetId }).exec();
    if (!asset) {
      throw new NotFoundException(`Asset with ID ${assetId} not found`);
    }
    return asset;
  }

  async updateAsset(assetId: string, updateData: any): Promise<Asset> {
    const updated = await this.assetModel.findOneAndUpdate(
      { assetId },
      { $set: updateData },
      { new: true }
    ).exec();
    if (!updated) throw new NotFoundException('Asset not found');
    return updated;
  }

  async deleteAsset(assetId: string): Promise<void> {
    await this.assetModel.findOneAndDelete({ assetId }).exec();
  }

  async assignNominee(assetId: string, nomineeId: string): Promise<Asset> {
    return this.updateAsset(assetId, { $addToSet: { nomineeIds: nomineeId } });
  }

  // Hierarchical resolution: Get all assets for a nominee, inherited from parent folders
  async getAssetsVisibleToNominee(nomineeId: string): Promise<Asset[]> {
    const allAssets = await this.assetModel.find().exec();
    const visibleAssets: Asset[] = [];

    // Helper to check if any ancestor is explicitly assigned to this nominee
    const isNomineeInherited = (asset: Asset): boolean => {
      if (asset.nomineeIds && asset.nomineeIds.includes(nomineeId)) return true;
      if (!asset.parentFolderId) return false;
      const parent = allAssets.find(a => a.assetId === asset.parentFolderId);
      if (!parent) return false;
      // If parent has specific overrides but nominee is not included, it's blocked.
      // If parent has no overrides, recursively check its parent.
      if (parent.nomineeIds && parent.nomineeIds.length > 0) {
        return parent.nomineeIds.includes(nomineeId);
      }
      return isNomineeInherited(parent);
    };

    for (const asset of allAssets) {
      if (isNomineeInherited(asset)) {
        visibleAssets.push(asset);
      }
    }
    return visibleAssets;
  }

  async getReleaseStatus(assetId: string): Promise<{ canRelease: boolean; reason: string }> {
    const asset = await this.getAsset(assetId);
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
