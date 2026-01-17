/**
 * Heartbeat (Proof-of-Life) Types
 * 
 * Heartbeat system ensures users are active and resets release timers
 */

export type HeartbeatMethod = 
  | 'wallet_signature'    // EIP-712 wallet signature
  | 'app_login'          // App authentication
  | 'biometric'          // Fingerprint / Face ID
  | 'hardware_wallet'    // Hardware wallet confirmation
  | 'multi_factor';      // Multiple methods combined

export type HeartbeatStatusEnum = 'active' | 'grace_period' | 'triggered' | 'emergency_override';

/**
 * Heartbeat Configuration
 */
export interface HeartbeatConfig {
  user_id: string;
  
  // Timing
  heartbeat_interval_days: number;    // How often user must check in (7-365 days)
  grace_period_days: number;          // Additional time before trigger (7-180 days)
  
  // Methods
  allowed_methods: HeartbeatMethod[];
  require_multi_factor: boolean;
  
  // Thresholds
  consecutive_missed_limit: number;   // Max missed heartbeats before trigger
  
  // Status
  enabled: boolean;
  created_at: number;
  updated_at: number;
}

/**
 * Heartbeat Record
 */
export interface Heartbeat {
  heartbeat_id: string;
  user_id: string;
  
  // Timing
  timestamp: number;
  next_required_by: number;           // When next heartbeat is due
  
  // Authentication
  method: HeartbeatMethod;
  signature?: string;                 // EIP-712 signature for wallet method
  biometric_hash?: string;           // Hash of biometric data
  device_id?: string;                // Device identifier
  
  // Verification
  verified: boolean;
  verification_data?: Record<string, any>;
  
  // Metadata
  ip_address?: string;
  user_agent?: string;
  location?: string;                  // Optional geolocation
}

/**
 * Heartbeat Status Summary
 */
export interface HeartbeatStatus {
  user_id: string;
  current_status: HeartbeatStatusEnum;
  
  // Last activity
  last_heartbeat: number;
  last_heartbeat_method: HeartbeatMethod;
  
  // Next requirements
  next_heartbeat_due: number;
  grace_period_ends?: number;
  
  // Counters
  consecutive_missed: number;
  total_heartbeats: number;
  
  // Trigger info
  trigger_time?: number;              // When system was triggered
  trigger_reason?: string;
  
  // Override info
  emergency_override_by?: string;     // Who initiated emergency override
  emergency_override_reason?: string;
}

/**
 * EIP-712 Heartbeat Signature Data
 */
export interface HeartbeatSignatureData {
  user_address: string;
  timestamp: number;
  nonce: string;
  message: string;
}

/**
 * Heartbeat Validation Result
 */
export interface HeartbeatValidation {
  valid: boolean;
  errors: string[];
  warnings: string[];
  
  // Timing validation
  is_on_time: boolean;
  is_in_grace_period: boolean;
  days_overdue?: number;
  
  // Method validation
  method_allowed: boolean;
  signature_valid?: boolean;
  biometric_valid?: boolean;
}

/**
 * Heartbeat Reminder Configuration
 */
export interface HeartbeatReminder {
  user_id: string;
  
  // Timing
  remind_days_before: number[];       // Days before due date to send reminders
  escalation_hours: number[];         // Hours after due date for escalation
  
  // Methods
  email_enabled: boolean;
  push_enabled: boolean;
  sms_enabled: boolean;
  
  // Contacts
  reminder_email?: string;
  emergency_contacts: string[];       // For escalation
  
  // Status
  enabled: boolean;
}

/**
 * Default Heartbeat Configuration
 */
export const DEFAULT_HEARTBEAT_CONFIG: Partial<HeartbeatConfig> = {
  heartbeat_interval_days: 30,        // Monthly check-in
  grace_period_days: 14,              // 2 week grace period
  allowed_methods: ['wallet_signature', 'app_login'],
  require_multi_factor: false,
  consecutive_missed_limit: 2,        // Trigger after 2 missed heartbeats
  enabled: true
};

/**
 * Heartbeat Interval Options (in days)
 */
export const HEARTBEAT_INTERVALS = [7, 14, 30, 60, 90, 180, 365] as const;

/**
 * Grace Period Options (in days)
 */
export const GRACE_PERIODS = [7, 14, 30, 60, 90, 180] as const;

/**
 * Heartbeat Method Descriptions
 */
export const HEARTBEAT_METHOD_INFO: Record<HeartbeatMethod, {
  name: string;
  description: string;
  security_level: 'low' | 'medium' | 'high';
  requires_device: boolean;
}> = {
  wallet_signature: {
    name: 'Wallet Signature',
    description: 'Sign a message with your crypto wallet',
    security_level: 'high',
    requires_device: false
  },
  app_login: {
    name: 'App Login',
    description: 'Login to the mobile or web app',
    security_level: 'medium',
    requires_device: true
  },
  biometric: {
    name: 'Biometric',
    description: 'Fingerprint or Face ID verification',
    security_level: 'high',
    requires_device: true
  },
  hardware_wallet: {
    name: 'Hardware Wallet',
    description: 'Confirm with hardware wallet device',
    security_level: 'high',
    requires_device: true
  },
  multi_factor: {
    name: 'Multi-Factor',
    description: 'Combination of multiple methods',
    security_level: 'high',
    requires_device: true
  }
};