import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class StorageQuotaService {
  private provider: ethers.Provider;
  private subscriptionContract: ethers.Contract;
  private storageUsageCache: Map<string, { usedMB: number; lastUpdated: number }> = new Map();

  constructor() {
    this.provider = new ethers.JsonRpcProvider(
      process.env.RPC_URL || 'https://rpc-mumbai.maticvigil.com'
    );

    const contractAddress = process.env.SUBSCRIPTION_CONTRACT_ADDRESS;
    const abi = [
      'function canUseService(address user) view returns (bool)',
      'function getStorageLimit(address user) view returns (uint256)',
      'function updateStorageUsage(address user, uint256 usedMB)',
    ];

    this.subscriptionContract = new ethers.Contract(
      contractAddress,
      abi,
      this.provider
    );
  }

  async checkQuota(walletAddress: string, fileSizeMB: number): Promise<boolean> {
    try {
      // Check if user can use service
      const canUse = await this.subscriptionContract.canUseService(walletAddress);
      if (!canUse) {
        throw new HttpException(
          'No active subscription or trial. Please subscribe to continue.',
          HttpStatus.FORBIDDEN
        );
      }

      // Get storage limit
      const limitMB = await this.subscriptionContract.getStorageLimit(walletAddress);
      const limit = Number(limitMB);

      // Get current usage
      const currentUsage = this.getCurrentUsage(walletAddress);
      const newUsage = currentUsage + fileSizeMB;

      if (newUsage > limit) {
        throw new HttpException(
          `Storage quota exceeded. Used: ${newUsage}MB, Limit: ${limit}MB. Please upgrade your plan.`,
          HttpStatus.FORBIDDEN
        );
      }

      return true;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error('Error checking quota:', error);
      throw new HttpException(
        'Failed to check storage quota',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updateUsage(walletAddress: string, fileSizeMB: number): Promise<void> {
    const currentUsage = this.getCurrentUsage(walletAddress);
    const newUsage = currentUsage + fileSizeMB;

    // Update cache
    this.storageUsageCache.set(walletAddress, {
      usedMB: newUsage,
      lastUpdated: Date.now(),
    });

    // Update on-chain (async, don't wait)
    this.updateOnChain(walletAddress, newUsage).catch(err => {
      console.error('Failed to update on-chain storage:', err);
    });
  }

  private getCurrentUsage(walletAddress: string): number {
    const cached = this.storageUsageCache.get(walletAddress);
    if (cached && Date.now() - cached.lastUpdated < 60000) { // 1 minute cache
      return cached.usedMB;
    }
    return 0;
  }

  private async updateOnChain(walletAddress: string, usedMB: number): Promise<void> {
    try {
      const wallet = new ethers.Wallet(process.env.ADMIN_PRIVATE_KEY, this.provider);
      const contractWithSigner = this.subscriptionContract.connect(wallet);
      
      const tx = await contractWithSigner.updateStorageUsage(walletAddress, Math.floor(usedMB));
      await tx.wait();
    } catch (error) {
      console.error('Error updating on-chain storage:', error);
    }
  }

  async getQuotaInfo(walletAddress: string): Promise<{
    limitMB: number;
    usedMB: number;
    remainingMB: number;
    percentUsed: number;
  }> {
    const limitMB = await this.subscriptionContract.getStorageLimit(walletAddress);
    const limit = Number(limitMB);
    const used = this.getCurrentUsage(walletAddress);
    const remaining = Math.max(0, limit - used);
    const percentUsed = limit > 0 ? (used / limit) * 100 : 0;

    return {
      limitMB: limit,
      usedMB: used,
      remainingMB: remaining,
      percentUsed: Math.min(100, percentUsed),
    };
  }
}
