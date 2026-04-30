import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';

@Injectable()
export class BlockchainService {
  private readonly contractAddress: string;
  private readonly networkName: string;

  private provider: ethers.JsonRpcProvider;
  private signer: ethers.Wallet;

  constructor(private configService: ConfigService) {
    this.contractAddress = this.configService.get<string>('CONTRACT_ADDRESS') || '0x0000000000000000000000000000000000000000';
    this.networkName = this.configService.get<string>('NETWORK_NAME') || 'polygon-mumbai';

    const rpcUrl = this.configService.get<string>('ETHEREUM_RPC_URL');
    const privateKey = this.configService.get<string>('KEEPER_PRIVATE_KEY');

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

  async triggerAlwaysThere(walletAddress: string): Promise<boolean> {
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

  async isAlwaysThereTriggered(walletAddress: string): Promise<boolean> {
    if (!this.provider) return false;

    try {
        const abi = ["function wills(address owner) public view returns (uint256, uint256, uint256, bool, bool)"];
        const contract = new ethers.Contract(this.contractAddress, abi, this.provider);
        const will = await contract.wills(walletAddress);
        return will[2]; // isTriggered is the 3rd element (index 2)
    } catch (error) {
        return false;
    }
  }
}
