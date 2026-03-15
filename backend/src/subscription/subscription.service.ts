import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class SubscriptionService {
  private provider: ethers.Provider;
  private subscriptionContract: ethers.Contract;

  constructor() {
    // Initialize provider
    this.provider = new ethers.JsonRpcProvider(
      process.env.RPC_URL || 'https://rpc-mumbai.maticvigil.com'
    );

    // Initialize contract
    const contractAddress = process.env.SUBSCRIPTION_CONTRACT_ADDRESS;
    const abi = [
      'function hasActiveTrial(address user) view returns (bool)',
      'function hasActiveSubscription(address user) view returns (bool)',
      'function canUseService(address user) view returns (bool)',
      'function getStorageLimit(address user) view returns (uint256)',
      'function getSubscriptionDetails(address user) view returns (uint8 plan, string planName, uint256 startTime, uint256 endTime, bool active, uint256 daysRemaining, uint256 storageGB, uint256 storageUsedMB, uint256 maxBeneficiaries, uint256 maxAssets)',
      'function getTrialDetails(address user) view returns (bool hasUsedTrial, bool isActive, uint256 endTime, uint256 daysRemaining, uint256 storageLimitMB, uint256 storageUsedMB)',
      'function updateStorageUsage(address user, uint256 usedMB)',
    ];

    this.subscriptionContract = new ethers.Contract(
      contractAddress,
      abi,
      this.provider
    );
  }

  async canUseService(walletAddress: string): Promise<boolean> {
    try {
      return await this.subscriptionContract.canUseService(walletAddress);
    } catch (error) {
      console.error('Error checking service access:', error);
      return false;
    }
  }

  async getStorageLimit(walletAddress: string): Promise<number> {
    try {
      const limitMB = await this.subscriptionContract.getStorageLimit(walletAddress);
      return Number(limitMB);
    } catch (error) {
      console.error('Error getting storage limit:', error);
      return 0;
    }
  }

  async getSubscriptionDetails(walletAddress: string) {
    try {
      const details = await this.subscriptionContract.getSubscriptionDetails(walletAddress);
      return {
        plan: Number(details.plan),
        planName: details.planName,
        startTime: Number(details.startTime),
        endTime: Number(details.endTime),
        active: details.active,
        daysRemaining: Number(details.daysRemaining),
        storageGB: Number(details.storageGB),
        storageUsedMB: Number(details.storageUsedMB),
        maxBeneficiaries: Number(details.maxBeneficiaries),
        maxAssets: Number(details.maxAssets),
      };
    } catch (error) {
      console.error('Error getting subscription details:', error);
      return null;
    }
  }

  async getTrialDetails(walletAddress: string) {
    try {
      const details = await this.subscriptionContract.getTrialDetails(walletAddress);
      return {
        hasUsedTrial: details.hasUsedTrial,
        isActive: details.isActive,
        endTime: Number(details.endTime),
        daysRemaining: Number(details.daysRemaining),
        storageLimitMB: Number(details.storageLimitMB),
        storageUsedMB: Number(details.storageUsedMB),
      };
    } catch (error) {
      console.error('Error getting trial details:', error);
      return null;
    }
  }

  async updateStorageUsage(walletAddress: string, usedMB: number): Promise<boolean> {
    try {
      // This requires a signer with private key
      const wallet = new ethers.Wallet(process.env.ADMIN_PRIVATE_KEY, this.provider);
      const contractWithSigner = this.subscriptionContract.connect(wallet);
      
      const tx = await contractWithSigner.updateStorageUsage(walletAddress, usedMB);
      await tx.wait();
      
      return true;
    } catch (error) {
      console.error('Error updating storage usage:', error);
      return false;
    }
  }

  async checkStorageQuota(walletAddress: string, currentUsageMB: number): Promise<{
    allowed: boolean;
    limitMB: number;
    usedMB: number;
    remainingMB: number;
    percentUsed: number;
  }> {
    const limitMB = await this.getStorageLimit(walletAddress);
    const remainingMB = limitMB - currentUsageMB;
    const percentUsed = limitMB > 0 ? (currentUsageMB / limitMB) * 100 : 0;

    return {
      allowed: currentUsageMB <= limitMB,
      limitMB,
      usedMB: currentUsageMB,
      remainingMB: Math.max(0, remainingMB),
      percentUsed: Math.min(100, percentUsed),
    };
  }
}
