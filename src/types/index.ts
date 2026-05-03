/**
 * Core type definitions for the Decentralized AlwaysThere Protocol
 */

export type UserStatus = 'active' | 'grace_period' | 'triggered' | 'emergency_override';

export type AssetType = 'crypto_wallet' | 'credentials' | 'document' | 'message';

export type ShareHolder = 'smart_contract' | 'trusted_person' | 'dao_oracle' | 'user_device' | 'hardware_wallet';

export interface ContactInfo {
  email?: string;
  phone?: string;
  address?: string;
  name: string;
}

export interface ReleaseCondition {
  type: 'time_delay' | 'multi_signature' | 'oracle_verification';
  parameters: Record<string, any>;
}

/**
 * User Configuration Model
 * Represents the main configuration for a user's digital will
 */
export interface UserConfig {
  userId: string;
  heartbeatInterval: number; // days (7-365)
  gracePeriod: number; // days (30-180)
  lastHeartbeat: number; // timestamp
  emergencyContacts: ContactInfo[];
  status: UserStatus;
}

/**
 * Digital Asset Model
 * Represents an encrypted digital asset stored in the system
 */
export interface DigitalAsset {
  assetId: string;
  type: AssetType;
  encryptedData: string; // AES-256 encrypted
  storageHash: string; // IPFS/Arweave hash
  keyShares: ShamirShare[];
  beneficiaryRules: BeneficiaryRule[];
}

/**
 * Beneficiary Rule Model
 * Defines how and when assets should be released to beneficiaries
 */
export interface BeneficiaryRule {
  beneficiaryId: string;
  assetId: string;
  releaseDelay: number; // days after trigger
  conditions: ReleaseCondition[];
  walletAddress: string;
  contactInfo: ContactInfo;
}

/**
 * Shamir Share Model
 * Represents a fragment of an encryption key using Shamir Secret Sharing
 */
export interface ShamirShare {
  shareId: number;
  shareData: string; // encrypted share
  holder: ShareHolder;
  holderAddress: string;
}

/**
 * Heartbeat Model
 * Represents a proof-of-life signal from a user
 */
export interface Heartbeat {
  userId: string;
  timestamp: number;
  signature: string;
  method: 'wallet_signature' | 'biometric' | 'hardware_wallet';
}

/**
 * Audit Log Entry Model
 * Represents an immutable log entry for system actions
 */
export interface AuditLogEntry {
  id: string;
  timestamp: number;
  userId: string;
  action: string;
  details: Record<string, any>;
  hash: string; // cryptographic hash for integrity
}

/**
 * Configuration validation result
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Encryption key information
 */
export interface EncryptionKey {
  keyId: string;
  algorithm: 'AES-256';
  shares: ShamirShare[];
  threshold: number; // number of shares required for reconstruction
}

/**
 * Storage metadata for decentralized storage
 */
export interface StorageMetadata {
  hash: string;
  provider: 'ipfs' | 'arweave';
  size: number;
  timestamp: number;
  encrypted: boolean;
}