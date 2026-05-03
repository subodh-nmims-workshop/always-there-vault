/**
 * Core Library Exports for Decentralized AlwaysThere Protocol
 */

// Core types (original)
export * from './types';

// Extended types (avoid conflicts by using specific exports)
export { 
  Asset, 
  AssetType as NewAssetType, 
  SensitivityLevel,
  CreateAssetRequest,
  AssetMetadata,
  Folder
} from './types/assets';

export { 
  HeartbeatConfig,
  HeartbeatMethod,
  HeartbeatStatus as HeartbeatStatusType,
  HeartbeatValidation,
  HeartbeatReminder
} from './types/heartbeat';

export { 
  Beneficiary,
  BeneficiaryType,
  NotificationMethod,
  BeneficiaryAssetRule,
  BeneficiaryVerification
} from './types/beneficiary';

// Crypto
export * from './crypto/encryption';
export * from './crypto/shamir';
export * from './crypto/key-management';

// Validation
export * from './validation/validation';