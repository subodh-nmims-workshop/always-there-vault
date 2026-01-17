/**
 * Decentralized storage interface for IPFS and Arweave integration
 */

import { StorageMetadata } from '../types';

export interface StorageProvider {
  upload(data: Buffer): Promise<string>;
  download(hash: string): Promise<Buffer>;
  verify(hash: string): Promise<boolean>;
}

export interface StorageResult {
  hash: string;
  metadata: StorageMetadata;
}

/**
 * Abstract base class for decentralized storage providers
 */
export abstract class DecentralizedStorage implements StorageProvider {
  abstract upload(data: Buffer): Promise<string>;
  abstract download(hash: string): Promise<Buffer>;
  abstract verify(hash: string): Promise<boolean>;
  
  /**
   * Stores encrypted data and returns storage metadata
   */
  async storeEncryptedData(encryptedData: string): Promise<StorageResult> {
    const buffer = Buffer.from(encryptedData, 'hex');
    const hash = await this.upload(buffer);
    
    const metadata: StorageMetadata = {
      hash,
      provider: this.getProviderType(),
      size: buffer.length,
      timestamp: Date.now(),
      encrypted: true
    };
    
    return { hash, metadata };
  }
  
  abstract getProviderType(): 'ipfs' | 'arweave';
}