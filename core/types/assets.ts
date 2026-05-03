/**
 * Asset and Folder Models for Decentralized AlwaysThere Protocol
 * 
 * Key Principle: NO MIXING - Folders are UI only, Assets have real control
 */

export type AssetType = 
  | 'crypto_keys'        // Crypto keys / seed phrases
  | 'audio_message'      // Audio messages
  | 'photo'              // Photos & videos
  | 'video'              // Photos & videos
  | 'letter'             // Letters & notes
  | 'document'           // Documents & folders
  | 'business_secret'    // Business secrets
  | 'intelligence'       // Intelligence / whistleblower data
  | 'military_evidence'  // Military / journalist evidence
  | 'other';             // Any other encrypted data

export type SensitivityLevel = 'low' | 'medium' | 'high' | 'critical';

export type EncryptionMethod = 'AES-256-GCM' | 'ECC' | 'Hybrid';

/**
 * Folder (UI Grouping Only)
 * Folders have NO security authority - they are purely for organization
 */
export interface Folder {
  folder_id: string;
  name: string;
  description?: string;
  parent_folder_id?: string;
  created_at: number;
  updated_at: number;
}

/**
 * Asset (Real Control Unit)
 * Each asset has its own encryption key, rules, and is released independently
 */
export interface Asset {
  asset_id: string;
  asset_type: AssetType;
  name: string;
  description?: string;
  
  // Storage & Encryption
  encrypted_data_hash: string;    // IPFS/Arweave CID
  encryption_method: EncryptionMethod;
  key_shares: string[];           // Shamir secret shares
  
  // Access Control
  beneficiaries: string[];        // Wallet addresses
  release_conditions: ReleaseCondition[];
  sensitivity_level: SensitivityLevel;
  
  // Metadata
  file_size?: number;
  mime_type?: string;
  created_at: number;
  updated_at: number;
  
  // UI Organization (optional)
  folder_id?: string;             // For UI grouping only
}

/**
 * Release Condition for Assets
 */
export interface ReleaseCondition {
  condition_id: string;
  type: 'time_delay' | 'multi_signature' | 'oracle_verification' | 'immediate';
  
  // Time-based conditions
  delay_days?: number;            // Days after trigger
  
  // Multi-signature conditions
  required_signatures?: number;
  authorized_signers?: string[];  // Wallet addresses
  
  // Oracle conditions
  oracle_address?: string;
  oracle_condition?: string;
  
  // Metadata
  enabled: boolean;
  created_at: number;
}

/**
 * Asset Rule (Granular Control)
 * Maps specific assets to specific beneficiaries with specific conditions
 */
export interface AssetRule {
  rule_id: string;
  asset_id: string;
  beneficiary_address: string;
  release_conditions: ReleaseCondition[];
  
  // Notifications
  notify_email?: string;
  notify_method?: 'email' | 'push' | 'sms';
  
  // Status
  enabled: boolean;
  created_at: number;
  updated_at: number;
}

/**
 * Asset Creation Request
 */
export interface CreateAssetRequest {
  name: string;
  description?: string;
  asset_type: AssetType;
  sensitivity_level: SensitivityLevel;
  
  // Data (will be encrypted client-side)
  raw_data: string | Buffer;
  mime_type?: string;
  
  // Access rules
  beneficiary_rules: {
    beneficiary_address: string;
    release_delay_days: number;
    conditions?: Partial<ReleaseCondition>[];
  }[];
  
  // UI organization
  folder_id?: string;
}

/**
 * Asset Metadata (stored on blockchain)
 */
export interface AssetMetadata {
  asset_id: string;
  encrypted_data_hash: string;    // IPFS CID
  beneficiary_addresses: string[];
  release_time: number;           // Timestamp when asset becomes eligible
  enabled: boolean;
}

/**
 * Supported Asset Examples
 */
export const ASSET_TYPE_EXAMPLES: Record<AssetType, string[]> = {
  crypto_keys: ['Private keys', 'Seed phrases', 'Hardware wallet recovery'],
  audio_message: ['Voice messages', 'Audio recordings', 'Spoken instructions'],
  photo: ['Family photos', 'Important documents (scanned)', 'Evidence photos'],
  video: ['Video messages', 'Recorded instructions', 'Family videos'],
  letter: ['Written messages', 'Instructions', 'Personal notes'],
  document: ['Legal documents', 'Contracts', 'Certificates'],
  business_secret: ['API keys', 'Business plans', 'Trade secrets'],
  intelligence: ['Whistleblower evidence', 'Sensitive information'],
  military_evidence: ['Classified documents', 'Evidence files'],
  other: ['Any other encrypted data']
};

/**
 * Asset Validation Rules
 */
export interface AssetValidationRules {
  max_file_size: number;          // bytes
  allowed_mime_types?: string[];
  min_beneficiaries: number;
  max_beneficiaries: number;
  min_release_delay_days: number;
  max_release_delay_days: number;
}

export const DEFAULT_ASSET_VALIDATION: AssetValidationRules = {
  max_file_size: 100 * 1024 * 1024,  // 100MB
  min_beneficiaries: 1,
  max_beneficiaries: 10,
  min_release_delay_days: 0,          // Immediate release allowed
  max_release_delay_days: 365 * 10    // 10 years max
};