import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class BlockchainService {
  private readonly contractAddress = process.env.CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000';
  private readonly networkName = process.env.NETWORK_NAME || 'polygon-mumbai';

  private provider: ethers.JsonRpcProvider;
  private signer: ethers.Wallet;

  constructor() {
    const rpcUrl = process.env.RPC_URL || process.env.LOCAL_RPC_URL;
    const privateKey = process.env.ADMIN_PRIVATE_KEY || process.env.LOCAL_PRIVATE_KEY;

    if (rpcUrl && privateKey) {
      this.provider = new ethers.JsonRpcProvider(rpcUrl);
      this.signer = new ethers.Wallet(privateKey, this.provider);
    }
  }

  async verifySignature(message: string, signature: string, address: string): Promise<{ isValid: boolean }> {
    try {
      const recoveredAddress = ethers.verifyMessage(message, signature);
      return { isValid: recoveredAddress.toLowerCase() === address.toLowerCase() };
    } catch (error) {
      return { isValid: false };
    }
  }

  async estimateGas(operation: string): Promise<{ estimatedGas: string, unit: string }> {
    return { estimatedGas: '0.001', unit: 'MATIC' };
  }

  async getUserData(walletAddress: string): Promise<any> {
    return {
      walletAddress,
      status: 'active',
      plan: 'free'
    };
  }

  async getContractInfo() {
    return {
      address: this.contractAddress,
      network: this.networkName,
      version: '1.0.0',
      status: this.provider ? 'Connected' : 'Simulation Mode',
      features: [
        'Asset Registration',
        'Heartbeat Tracking',
        'Automated Release',
        'Multi-signature Support',
        'Emergency Override',
      ],
    };
  }

  async triggerLastWish(walletAddress: string): Promise<boolean> {
    if (!this.signer) {
        console.warn(`🏗️  Simulating contract trigger for: ${walletAddress}`);
        return true;
    }

    try {
        const abi = [
            "function checkAndTrigger(address owner) external",
            "function wills(address owner) public view returns (uint256, uint256, uint256, bool, bool)"
        ];
        const contract = new ethers.Contract(this.contractAddress, abi, this.signer);
        
        console.log(`📡 Triggering smart contract for wallet: ${walletAddress}...`);
        const tx = await contract.checkAndTrigger(walletAddress);
        await tx.wait();
        
        console.log(`✅ Contract trigger successful! TX: ${tx.hash}`);
        return true;
    } catch (error) {
        console.error('❌ Blockchain Trigger Failed:', error.message);
        throw error;
    }
  }

  async isLastWishTriggered(walletAddress: string): Promise<boolean> {
    if (!this.provider) return false;

    try {
        const abi = ["function wills(address owner) public view returns (uint256, uint256, uint256, bool, bool)"];
        const contract = new ethers.Contract(this.contractAddress, abi, this.provider);
        const will = await contract.wills(walletAddress);
        return will[3]; // isTriggered is the 4th element (index 3)
    } catch (error) {
        return false;
    }
  }
}
