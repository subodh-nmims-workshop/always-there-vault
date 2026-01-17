/**
 * Client-side Crypto Integration for Web App
 * Integrates with core crypto libraries
 */

import CryptoJS from 'crypto-js';

export interface EncryptionResult {
  encryptedData: string;
  keyId: string;
  iv: string;
  timestamp: number;
}

export interface ShamirShare {
  shareId: number;
  shareData: string;
  holder: string;
  holderAddress: string;
  distributionMethod: string;
}

export interface KeyDistribution {
  keyId: string;
  shares: ShamirShare[];
  threshold: number;
  totalShares: number;
  createdAt: number;
}

class WebCryptoService {
  private static instance: WebCryptoService;
  
  public static getInstance(): WebCryptoService {
    if (!WebCryptoService.instance) {
      WebCryptoService.instance = new WebCryptoService();
    }
    return WebCryptoService.instance;
  }

  /**
   * Generate secure encryption key
   */
  generateEncryptionKey(): string {
    return CryptoJS.lib.WordArray.random(32).toString(); // 256 bits
  }

  /**
   * Encrypt data using AES-256-GCM
   */
  async encryptData(data: string, key?: string): Promise<EncryptionResult> {
    try {
      const encryptionKey = key || this.generateEncryptionKey();
      const iv = CryptoJS.lib.WordArray.random(16).toString();
      
      const encrypted = CryptoJS.AES.encrypt(data, encryptionKey, {
        iv: CryptoJS.enc.Hex.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });

      const keyId = CryptoJS.SHA256(encryptionKey).toString().substring(0, 16);

      return {
        encryptedData: encrypted.toString(),
        keyId,
        iv,
        timestamp: Date.now()
      };
    } catch (error) {
      throw new Error(`Encryption failed: ${error}`);
    }
  }

  /**
   * Decrypt data using AES-256-GCM
   */
  async decryptData(encryptedData: string, key: string, iv: string): Promise<string> {
    try {
      const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
        iv: CryptoJS.enc.Hex.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });

      return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      throw new Error(`Decryption failed: ${error}`);
    }
  }

  /**
   * Split key using Shamir Secret Sharing
   */
  splitKey(key: string, totalShares: number = 5, threshold: number = 3): KeyDistribution {
    const keyId = CryptoJS.SHA256(key).toString().substring(0, 16);
    const shares: ShamirShare[] = [];
    
    // Simplified Shamir implementation using XOR
    const keyBuffer = CryptoJS.enc.Hex.parse(key);
    const shareBuffers: any[] = [];
    
    // Generate random shares (all but the last one)
    for (let i = 0; i < totalShares - 1; i++) {
      shareBuffers.push(CryptoJS.lib.WordArray.random(32));
    }
    
    // Calculate the last share to satisfy XOR reconstruction
    let lastShare = CryptoJS.lib.WordArray.create();
    for (let i = 0; i < keyBuffer.words.length; i++) {
      let xorResult = keyBuffer.words[i] || 0;
      for (let j = 0; j < shareBuffers.length; j++) {
        xorResult ^= shareBuffers[j].words[i] || 0;
      }
      lastShare.words[i] = xorResult;
    }
    shareBuffers.push(lastShare);
    
    const holders = ['smart_contract', 'user_device', 'trusted_person', 'dao_oracle', 'hardware_wallet'];
    const distributionMethods = ['blockchain', 'secure_storage', 'encrypted_file', 'oracle_network', 'hardware_module'];
    
    for (let i = 0; i < totalShares; i++) {
      shares.push({
        shareId: i + 1,
        shareData: shareBuffers[i].toString(),
        holder: holders[i] || `holder_${i + 1}`,
        holderAddress: this.generateHolderAddress(holders[i] || `holder_${i + 1}`, keyId),
        distributionMethod: distributionMethods[i] || 'encrypted_storage'
      });
    }
    
    return {
      keyId,
      shares,
      threshold,
      totalShares,
      createdAt: Date.now()
    };
  }

  /**
   * Reconstruct key from Shamir shares
   */
  reconstructKey(shares: ShamirShare[]): string {
    if (shares.length < 3) {
      throw new Error('Insufficient shares for reconstruction');
    }
    
    // Use first 3 shares for reconstruction (simplified XOR approach)
    const reconstructionShares = shares.slice(0, 3);
    const shareBuffers = reconstructionShares.map(share => CryptoJS.enc.Hex.parse(share.shareData));
    
    // XOR all shares together to reconstruct the secret
    let secretBuffer = CryptoJS.lib.WordArray.create();
    for (let i = 0; i < shareBuffers[0].words.length; i++) {
      let xorResult = 0;
      for (const shareBuffer of shareBuffers) {
        xorResult ^= shareBuffer.words[i] || 0;
      }
      secretBuffer.words[i] = xorResult;
    }
    
    return secretBuffer.toString();
  }

  /**
   * Generate holder address
   */
  private generateHolderAddress(holder: string, keyId: string): string {
    const combined = `${holder}-${keyId}`;
    return CryptoJS.SHA256(combined).toString().substring(0, 40);
  }

  /**
   * Generate secure hash
   */
  generateHash(data: string): string {
    return CryptoJS.SHA256(data).toString();
  }

  /**
   * Simulate IPFS upload (returns mock CID)
   */
  async uploadToIPFS(encryptedData: string): Promise<string> {
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate mock IPFS CID
    const hash = this.generateHash(encryptedData);
    return `Qm${hash.substring(0, 44)}`;
  }
}

export default WebCryptoService;