/**
 * Advanced Key Management for Decentralized AlwaysThere Vault
 * 
 * Implements military-grade key splitting and distribution
 */

import { ShamirShare, ShareHolder } from '../types';
import { generateEncryptionKey } from './encryption';

export interface KeyManagementConfig {
  totalShares: number;
  threshold: number;
  shareHolders: ShareHolder[];
}

export interface KeyDistribution {
  keyId: string;
  shares: DistributedShare[];
  metadata: KeyMetadata;
}

export interface DistributedShare {
  shareId: number;
  shareData: string;
  holder: ShareHolder;
  holderAddress: string;
  distributionMethod: 'smart_contract' | 'encrypted_storage' | 'hardware_device' | 'trusted_party';
  backupLocation?: string;
  createdAt: number;
}

export interface KeyMetadata {
  keyId: string;
  algorithm: 'AES-256-GCM';
  keySize: number;
  createdAt: number;
  expiresAt?: number;
  purpose: string;
  assetIds: string[];
}

/**
 * Military-grade key distribution configuration
 * 5 shares, 3 required for reconstruction
 */
export const MILITARY_GRADE_CONFIG: KeyManagementConfig = {
  totalShares: 5,
  threshold: 3,
  shareHolders: [
    'smart_contract',    // Stored on blockchain
    'user_device',       // User's secure device
    'trusted_person',    // Designated trusted contact
    'dao_oracle',        // Decentralized oracle
    'hardware_wallet'    // Hardware security module
  ]
};

/**
 * Distribution methods for each share holder type
 */
export const DISTRIBUTION_METHODS: Record<ShareHolder, {
  method: string;
  security: 'high' | 'medium' | 'low';
  description: string;
}> = {
  smart_contract: {
    method: 'smart_contract',
    security: 'high',
    description: 'Stored in smart contract, released automatically'
  },
  user_device: {
    method: 'encrypted_storage',
    security: 'high',
    description: 'Encrypted on user device with biometric protection'
  },
  trusted_person: {
    method: 'encrypted_storage',
    security: 'medium',
    description: 'Encrypted file sent to trusted contact'
  },
  dao_oracle: {
    method: 'smart_contract',
    security: 'high',
    description: 'Held by decentralized oracle network'
  },
  hardware_wallet: {
    method: 'hardware_device',
    security: 'high',
    description: 'Stored in hardware security module'
  }
};

/**
 * Creates and distributes encryption keys using Shamir Secret Sharing
 */
export function createAndDistributeKey(
  assetId: string,
  purpose: string,
  config: KeyManagementConfig = MILITARY_GRADE_CONFIG
): KeyDistribution {
  
  // Generate master encryption key
  const masterKey = generateEncryptionKey();
  const keyId = generateKeyId(masterKey, assetId);
  
  // Split key using Shamir Secret Sharing
  const shares = splitKeyAdvanced(masterKey, config);
  
  // Create distributed shares with metadata
  const distributedShares: DistributedShare[] = shares.map((share, index) => {
    const holder = config.shareHolders[index];
    if (!holder) {
      throw new Error(`No holder configured for share ${index + 1}`);
    }
    
    return {
      shareId: share.shareId,
      shareData: share.shareData,
      holder: holder,
      holderAddress: share.holderAddress,
      distributionMethod: DISTRIBUTION_METHODS[holder]?.method as any || 'encrypted_storage',
      createdAt: Date.now()
    };
  });
  
  // Create key metadata
  const metadata: KeyMetadata = {
    keyId,
    algorithm: 'AES-256-GCM',
    keySize: 256,
    createdAt: Date.now(),
    purpose,
    assetIds: [assetId]
  };
  
  return {
    keyId,
    shares: distributedShares,
    metadata
  };
}

/**
 * Advanced Shamir Secret Sharing with cryptographic security
 */
function splitKeyAdvanced(
  secret: string,
  config: KeyManagementConfig
): ShamirShare[] {
  
  if (config.threshold > config.totalShares) {
    throw new Error('Threshold cannot exceed total shares');
  }
  
  // Use proper polynomial-based Shamir Secret Sharing
  // This is a simplified implementation - production should use a proven library
  const shares: ShamirShare[] = [];
  const secretBuffer = Buffer.from(secret, 'hex');
  
  // Generate polynomial coefficients
  const coefficients = generatePolynomialCoefficients(config.threshold - 1, secretBuffer);
  
  // Generate shares using polynomial evaluation
  for (let i = 1; i <= config.totalShares; i++) {
    const shareValue = evaluatePolynomial(coefficients, i);
    const holder = config.shareHolders[i - 1];
    
    if (!holder) {
      throw new Error(`No holder defined for share ${i}`);
    }
    
    shares.push({
      shareId: i,
      shareData: shareValue.toString('hex'),
      holder: holder,
      holderAddress: generateHolderAddress(holder, secret)
    });
  }
  
  return shares;
}

/**
 * Reconstructs a key from Shamir shares using Lagrange interpolation
 */
export function reconstructKey(shares: ShamirShare[]): string {
  if (shares.length < 3) {
    throw new Error('Insufficient shares for reconstruction');
  }
  
  // Use Lagrange interpolation to reconstruct the secret
  // This is a simplified implementation
  const points = shares.slice(0, 3).map(share => ({
    x: share.shareId,
    y: Buffer.from(share.shareData, 'hex')
  }));
  
  // Reconstruct using Lagrange interpolation at x=0
  const secret = lagrangeInterpolation(points, 0);
  return secret.toString('hex');
}

/**
 * Validates key distribution security
 */
export function validateKeyDistribution(distribution: KeyDistribution): {
  isSecure: boolean;
  warnings: string[];
  recommendations: string[];
} {
  const warnings: string[] = [];
  const recommendations: string[] = [];
  
  // Check share distribution
  const holderCounts = new Map<ShareHolder, number>();
  distribution.shares.forEach(share => {
    const count = holderCounts.get(share.holder) || 0;
    holderCounts.set(share.holder, count + 1);
  });
  
  // Ensure no single holder has threshold or more shares
  let isSecure = true;
  holderCounts.forEach((count, holder) => {
    if (count >= 3) { // threshold
      isSecure = false;
      warnings.push(`Holder ${holder} has ${count} shares (threshold: 3)`);
    }
  });
  
  // Check distribution methods
  const highSecurityCount = distribution.shares.filter(share => 
    DISTRIBUTION_METHODS[share.holder]?.security === 'high'
  ).length;
  
  if (highSecurityCount < 3) {
    warnings.push('Less than 3 shares use high-security distribution methods');
    recommendations.push('Increase high-security share distribution');
  }
  
  // Check for backup locations
  const sharesWithBackup = distribution.shares.filter(share => share.backupLocation).length;
  if (sharesWithBackup < 2) {
    recommendations.push('Add backup locations for critical shares');
  }
  
  return {
    isSecure,
    warnings,
    recommendations
  };
}

/**
 * Emergency key recovery process
 */
export function initiateEmergencyRecovery(
  keyId: string,
  availableShares: ShamirShare[],
  emergencyContact: string
): {
  canRecover: boolean;
  missingShares: number;
  recoveryOptions: string[];
} {
  const canRecover = availableShares.length >= 3;
  const missingShares = Math.max(0, 3 - availableShares.length);
  
  const recoveryOptions: string[] = [];
  
  if (canRecover) {
    recoveryOptions.push('Direct reconstruction with available shares');
  } else {
    recoveryOptions.push('Contact emergency contact for additional shares');
    recoveryOptions.push('Initiate DAO oracle recovery process');
    recoveryOptions.push('Hardware wallet recovery procedure');
  }
  
  return {
    canRecover,
    missingShares,
    recoveryOptions
  };
}

// Helper functions

function generateKeyId(key: string, assetId: string): string {
  const crypto = require('crypto');
  const combined = `${key}-${assetId}-${Date.now()}`;
  return crypto.createHash('sha256').update(combined).digest('hex').substring(0, 32);
}

function generateHolderAddress(holder: ShareHolder, secret: string): string {
  const crypto = require('crypto');
  const combined = `${holder}-${secret}`;
  return crypto.createHash('sha256').update(combined).digest('hex').substring(0, 40);
}

function generatePolynomialCoefficients(degree: number, secret: Buffer): Buffer[] {
  const crypto = require('crypto');
  const coefficients: Buffer[] = [secret]; // a0 = secret
  
  // Generate random coefficients for a1, a2, ..., a(degree)
  for (let i = 1; i <= degree; i++) {
    coefficients.push(crypto.randomBytes(secret.length));
  }
  
  return coefficients;
}

function evaluatePolynomial(coefficients: Buffer[], x: number): Buffer {
  const result = Buffer.alloc(coefficients[0]!.length);
  
  for (let i = 0; i < coefficients.length; i++) {
    const coeff = coefficients[i]!;
    const power = Math.pow(x, i);
    
    // Multiply coefficient by x^i and add to result
    for (let j = 0; j < coeff.length; j++) {
      result[j] = (result[j]! + (coeff[j]! * power)) % 256;
    }
  }
  
  return result;
}

function lagrangeInterpolation(points: {x: number, y: Buffer}[], x: number): Buffer {
  const result = Buffer.alloc(points[0]!.y.length);
  
  for (let i = 0; i < points.length; i++) {
    let numerator = 1;
    let denominator = 1;
    
    for (let j = 0; j < points.length; j++) {
      if (i !== j) {
        numerator *= (x - points[j]!.x);
        denominator *= (points[i]!.x - points[j]!.x);
      }
    }
    
    const coefficient = numerator / denominator;
    const point = points[i]!;
    
    // Add weighted point to result
    for (let k = 0; k < point.y.length; k++) {
      result[k] = (result[k]! + (point.y[k]! * coefficient)) % 256;
    }
  }
  
  return result;
}