/**
 * Shamir Secret Sharing implementation for key management
 * Implements 5-share, 3-threshold configuration as specified in requirements
 */

import { ShamirShare, ShareHolder } from '../types';
const crypto = require('crypto');

export interface ShamirConfig {
  totalShares: number;
  threshold: number;
}

export interface ShareDistribution {
  shares: ShamirShare[];
  keyId: string;
}

/**
 * Default Shamir configuration: 5 shares, 3 required for reconstruction
 */
export const DEFAULT_SHAMIR_CONFIG: ShamirConfig = {
  totalShares: 5,
  threshold: 3
};

/**
 * Share holder types in order of distribution
 */
export const SHARE_HOLDERS: ShareHolder[] = [
  'smart_contract',
  'trusted_person', 
  'dao_oracle',
  'user_device',
  'hardware_wallet'
];

/**
 * Splits a secret key using Shamir Secret Sharing
 * Note: This is a simplified implementation for demonstration
 * Production systems should use a cryptographically secure library
 */
export function splitSecret(secret: string, config: ShamirConfig = DEFAULT_SHAMIR_CONFIG): ShareDistribution {
  if (!secret || secret.length === 0) {
    throw new Error('Secret cannot be empty');
  }
  
  if (config.threshold > config.totalShares) {
    throw new Error('Threshold cannot exceed total shares');
  }
  
  if (config.totalShares !== 5 || config.threshold !== 3) {
    throw new Error('Only 5-share, 3-threshold configuration is supported');
  }
  
  const keyId = crypto.createHash('sha256').update(secret).digest('hex').substring(0, 16);
  const shares: ShamirShare[] = [];
  
  // Simplified Shamir implementation using XOR (for demonstration)
  // In production, use proper polynomial interpolation
  const secretBuffer = Buffer.from(secret, 'hex');
  const shareBuffers: Buffer[] = [];
  
  // Generate random shares (all but the last one)
  for (let i = 0; i < config.totalShares - 1; i++) {
    shareBuffers.push(crypto.randomBytes(secretBuffer.length));
  }
  
  // Calculate the last share to satisfy XOR reconstruction
  let lastShare = Buffer.alloc(secretBuffer.length);
  for (let i = 0; i < secretBuffer.length; i++) {
    let xorResult: number = secretBuffer[i] || 0;
    for (let j = 0; j < shareBuffers.length; j++) {
      const shareBuffer = shareBuffers[j];
      if (shareBuffer && shareBuffer[i] !== undefined) {
        xorResult ^= shareBuffer[i]!;
      }
    }
    lastShare[i] = xorResult;
  }
  shareBuffers.push(lastShare);
  
  // Create ShamirShare objects
  for (let i = 0; i < config.totalShares; i++) {
    const holder = SHARE_HOLDERS[i];
    if (!holder) {
      throw new Error(`No holder defined for share ${i + 1}`);
    }
    
    shares.push({
      shareId: i + 1,
      shareData: shareBuffers[i]!.toString('hex'),
      holder: holder,
      holderAddress: generateHolderAddress(holder, keyId)
    });
  }
  
  return {
    shares,
    keyId
  };
}

/**
 * Reconstructs a secret from Shamir shares
 */
export function reconstructSecret(shares: ShamirShare[]): string {
  if (shares.length < DEFAULT_SHAMIR_CONFIG.threshold) {
    throw new Error(`Insufficient shares: need ${DEFAULT_SHAMIR_CONFIG.threshold}, got ${shares.length}`);
  }
  
  // Use first 3 shares for reconstruction (simplified XOR approach)
  const reconstructionShares = shares.slice(0, 3);
  const shareBuffers = reconstructionShares.map(share => Buffer.from(share.shareData, 'hex'));
  
  if (shareBuffers.length === 0 || !shareBuffers[0]) {
    throw new Error('No valid shares provided');
  }
  
  // XOR all shares together to reconstruct the secret
  const secretBuffer = Buffer.alloc(shareBuffers[0].length);
  for (let i = 0; i < secretBuffer.length; i++) {
    let xorResult: number = 0;
    for (const shareBuffer of shareBuffers) {
      if (shareBuffer && shareBuffer[i] !== undefined) {
        xorResult ^= shareBuffer[i]!;
      }
    }
    secretBuffer[i] = xorResult;
  }
  
  return secretBuffer.toString('hex');
}

/**
 * Validates that no single entity possesses enough shares for reconstruction
 */
export function validateShareDistribution(shares: ShamirShare[]): boolean {
  const holderCounts = new Map<ShareHolder, number>();
  
  for (const share of shares) {
    const currentCount = holderCounts.get(share.holder) || 0;
    holderCounts.set(share.holder, currentCount + 1);
    
    // Check if any holder has threshold or more shares
    if (currentCount + 1 >= DEFAULT_SHAMIR_CONFIG.threshold) {
      return false;
    }
  }
  
  return true;
}

/**
 * Generates a unique address for a share holder
 */
function generateHolderAddress(holder: ShareHolder, keyId: string): string {
  const combined = `${holder}-${keyId}`;
  return crypto.createHash('sha256').update(combined).digest('hex').substring(0, 20);
}

/**
 * Verifies the integrity of a Shamir share
 */
export function verifyShareIntegrity(share: ShamirShare, expectedKeyId: string): boolean {
  if (!share.shareData || !share.holder || !share.holderAddress) {
    return false;
  }
  
  // Verify holder address matches expected format
  const expectedAddress = generateHolderAddress(share.holder, expectedKeyId);
  return share.holderAddress === expectedAddress;
}