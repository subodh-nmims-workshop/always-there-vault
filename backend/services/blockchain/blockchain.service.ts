import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class BlockchainService {
  private readonly contractAddress = process.env.CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000';
  private readonly networkName = process.env.NETWORK_NAME || 'polygon-mumbai';

  async getContractInfo() {
    return {
      address: this.contractAddress,
      network: this.networkName,
      version: '1.0.0',
      features: [
        'Asset Registration',
        'Heartbeat Tracking',
        'Automated Release',
        'Multi-signature Support',
        'Emergency Override',
      ],
    };
  }

  async getUserData(walletAddress: string) {
    // In production, this would query the smart contract
    return {
      walletAddress,
      isRegistered: true,
      assetsCount: 0,
      beneficiariesCount: 0,
      lastHeartbeat: new Date(),
      heartbeatInterval: 30,
      gracePeriod: 14,
      status: 'active',
    };
  }

  async verifySignature(message: string, signature: string, address: string): Promise<{ valid: boolean }> {
    try {
      const recoveredAddress = ethers.verifyMessage(message, signature);
      return {
        valid: recoveredAddress.toLowerCase() === address.toLowerCase(),
      };
    } catch (error) {
      return { valid: false };
    }
  }

  async estimateGas(operation: string): Promise<{ operation: string; estimatedGas: string; estimatedCost: string }> {
    const gasEstimates = {
      register_user: '150000',
      register_asset: '200000',
      record_heartbeat: '100000',
      add_beneficiary: '120000',
      release_asset: '250000',
    };

    const estimatedGas = gasEstimates[operation] || '100000';
    const gasPrice = '30'; // Gwei
    const estimatedCost = (parseInt(estimatedGas) * parseInt(gasPrice) / 1e9).toFixed(6);

    return {
      operation,
      estimatedGas,
      estimatedCost: `${estimatedCost} MATIC`,
    };
  }
}
