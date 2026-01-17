/**
 * Beneficiary Management Types
 * 
 * Defines who can receive assets and under what conditions
 */

export type BeneficiaryType = 
  | 'individual'         // Single person
  | 'organization'       // Company, charity, etc.
  | 'smart_contract'     // Automated contract
  | 'multi_sig'          // Multi-signature wallet
  | 'dao';               // Decentralized Autonomous Organization

export type NotificationMethod = 'email' | 'push' | 'sms' | 'on_chain' | 'none';

/**
 * Beneficiary Profile
 */
export interface Beneficiary {
  beneficiary_id: string;
  
  // Identity
  name: string;
  type: BeneficiaryType;
  wallet_address: string;             // Primary receiving address
  
  // Contact Information
  email?: string;
  phone?: string;
  physical_address?: string;
  
  // Verification
  identity_verified: boolean;
  verification_method?: string;       // KYC, manual, etc.
  verification_date?: number;
  
  // Backup addresses
  backup_addresses?: string[];        // Alternative receiving addresses
  
  // Preferences
  preferred_notification: NotificationMethod;
  notification_settings: NotificationSettings;
  
  // Metadata
  notes?: string;
  tags?: string[];
  created_at: number;
  updated_at: number;
  
  // Status
  enabled: boolean;
  blocked: boolean;
  block_reason?: string;
}

/**
 * Notification Settings for Beneficiaries
 */
export interface NotificationSettings {
  // When to notify
  notify_on_asset_assignment: boolean;
  notify_on_rule_change: boolean;
  notify_on_trigger: boolean;
  notify_on_release: boolean;
  
  // How to notify
  email_notifications: boolean;
  push_notifications: boolean;
  sms_notifications: boolean;
  
  // Frequency limits
  max_notifications_per_day: number;
  quiet_hours_start?: number;         // Hour of day (0-23)
  quiet_hours_end?: number;           // Hour of day (0-23)
  
  // Language & Format
  preferred_language: string;         // ISO language code
  notification_format: 'brief' | 'detailed';
}

/**
 * Beneficiary Asset Assignment
 * Links beneficiaries to specific assets with specific rules
 */
export interface BeneficiaryAssetRule {
  rule_id: string;
  beneficiary_id: string;
  asset_id: string;
  
  // Release conditions
  release_delay_days: number;         // Days after trigger
  immediate_release: boolean;         // Override delay for emergency
  
  // Additional conditions
  requires_verification: boolean;     // Beneficiary must verify identity
  requires_multi_sig: boolean;       // Multiple signatures required
  multi_sig_threshold?: number;      // How many signatures needed
  
  // Partial release rules
  percentage_share?: number;          // If asset is split between beneficiaries
  max_amount?: string;               // Maximum value (for crypto assets)
  
  // Conditions
  conditions: ReleaseCondition[];
  
  // Status
  enabled: boolean;
  created_at: number;
  updated_at: number;
}

/**
 * Release Condition Types
 */
export interface ReleaseCondition {
  condition_id: string;
  type: 'time_delay' | 'verification' | 'multi_sig' | 'oracle' | 'manual_approval';
  
  // Time-based
  delay_days?: number;
  
  // Verification-based
  verification_required?: boolean;
  verification_method?: 'kyc' | 'biometric' | 'document' | 'witness';
  
  // Multi-signature
  required_signatures?: number;
  authorized_signers?: string[];
  
  // Oracle-based
  oracle_address?: string;
  oracle_condition?: string;
  
  // Manual approval
  approver_address?: string;
  approval_timeout_days?: number;
  
  // Status
  enabled: boolean;
  metadata?: Record<string, any>;
}

/**
 * Beneficiary Verification Request
 */
export interface BeneficiaryVerification {
  verification_id: string;
  beneficiary_id: string;
  
  // Verification details
  method: 'kyc' | 'manual' | 'document' | 'witness' | 'biometric';
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  
  // Documents/Evidence
  documents?: {
    type: string;
    hash: string;                   // IPFS hash of encrypted document
    uploaded_at: number;
  }[];
  
  // Verification data
  verifier_address?: string;        // Who verified
  verification_date?: number;
  expiry_date?: number;
  
  // Results
  verification_score?: number;      // 0-100 confidence score
  verification_notes?: string;
  rejection_reason?: string;
  
  // Metadata
  created_at: number;
  updated_at: number;
}

/**
 * Beneficiary Notification
 */
export interface BeneficiaryNotification {
  notification_id: string;
  beneficiary_id: string;
  
  // Content
  type: 'asset_assigned' | 'rule_changed' | 'system_triggered' | 'asset_released' | 'verification_required';
  title: string;
  message: string;
  
  // Delivery
  method: NotificationMethod;
  sent_at?: number;
  delivered_at?: number;
  read_at?: number;
  
  // Status
  status: 'pending' | 'sent' | 'delivered' | 'read' | 'failed';
  failure_reason?: string;
  retry_count: number;
  
  // Metadata
  created_at: number;
  metadata?: Record<string, any>;
}

/**
 * Beneficiary Statistics
 */
export interface BeneficiaryStats {
  beneficiary_id: string;
  
  // Assets
  total_assets_assigned: number;
  total_estimated_value?: string;    // In USD or ETH
  
  // Activity
  last_notification_sent?: number;
  last_activity?: number;
  total_notifications_sent: number;
  
  // Verification
  verification_status: 'unverified' | 'pending' | 'verified' | 'expired';
  verification_score?: number;
  
  // Release history
  assets_received: number;
  total_value_received?: string;
  last_asset_received?: number;
}

/**
 * Default Notification Settings
 */
export const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
  notify_on_asset_assignment: true,
  notify_on_rule_change: true,
  notify_on_trigger: true,
  notify_on_release: true,
  
  email_notifications: true,
  push_notifications: true,
  sms_notifications: false,
  
  max_notifications_per_day: 10,
  
  preferred_language: 'en',
  notification_format: 'detailed'
};

/**
 * Beneficiary Validation Rules
 */
export interface BeneficiaryValidationRules {
  max_beneficiaries_per_user: number;
  max_assets_per_beneficiary: number;
  require_email_verification: boolean;
  require_wallet_verification: boolean;
  min_release_delay_days: number;
  max_release_delay_days: number;
}

export const DEFAULT_BENEFICIARY_VALIDATION: BeneficiaryValidationRules = {
  max_beneficiaries_per_user: 50,
  max_assets_per_beneficiary: 1000,
  require_email_verification: true,
  require_wallet_verification: true,
  min_release_delay_days: 0,
  max_release_delay_days: 365 * 10
};