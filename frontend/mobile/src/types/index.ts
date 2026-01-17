/**
 * Professional TypeScript Type Definitions for Mobile App
 */

// Navigation Types
export type RootStackParamList = {
  Home: undefined;
  Assets: undefined;
  Beneficiaries: undefined;
  Heartbeat: undefined;
  Settings: undefined;
  AssetDetail: { assetId: string };
  BeneficiaryDetail: { beneficiaryId: string };
  CreateAsset: undefined;
  AddBeneficiary: undefined;
  BiometricSetup: undefined;
  SecuritySettings: undefined;
};

// Asset Types
export type AssetType = 
  | 'crypto_keys'
  | 'audio_message'
  | 'photo'
  | 'video'
  | 'letter'
  | 'document'
  | 'business_secret'
  | 'intelligence'
  | 'military_evidence'
  | 'other';

export type SensitivityLevel = 'low' | 'medium' | 'high' | 'critical';

export interface Asset {
  id: string;
  name: string;
  description?: string;
  type: AssetType;
  sensitivity: SensitivityLevel;
  encryptedData: string;
  keyShares: string[];
  beneficiaries: string[];
  releaseDelay: number;
  fileSize?: number;
  fileName?: string;
  mimeType?: string;
  createdAt: number;
  updatedAt: number;
  status: 'active' | 'triggered' | 'released';
}

// Beneficiary Types
export type BeneficiaryType = 'individual' | 'organization' | 'smart_contract' | 'multi_sig' | 'dao';

export interface Beneficiary {
  id: string;
  name: string;
  type: BeneficiaryType;
  walletAddress: string;
  email?: string;
  phone?: string;
  physicalAddress?: string;
  verified: boolean;
  verificationMethod?: string;
  verificationDate?: number;
  notificationPreferences: NotificationPreferences;
  createdAt: number;
  updatedAt: number;
  enabled: boolean;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
  onAssetAssignment: boolean;
  onRuleChange: boolean;
  onTrigger: boolean;
  onRelease: boolean;
}

// Heartbeat Types
export type HeartbeatMethod = 'biometric' | 'app_login' | 'wallet_signature' | 'multi_factor';
export type HeartbeatStatus = 'active' | 'grace_period' | 'triggered' | 'emergency_override';

export interface HeartbeatConfig {
  userId: string;
  intervalDays: number;
  gracePeriodDays: number;
  allowedMethods: HeartbeatMethod[];
  requireMultiFactor: boolean;
  consecutiveMissedLimit: number;
  enabled: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface Heartbeat {
  id: string;
  userId: string;
  timestamp: number;
  method: HeartbeatMethod;
  signature?: string;
  biometricHash?: string;
  deviceId?: string;
  verified: boolean;
  ipAddress?: string;
  location?: string;
}

export interface HeartbeatStatusInfo {
  userId: string;
  currentStatus: HeartbeatStatus;
  lastHeartbeat: number;
  lastHeartbeatMethod: HeartbeatMethod;
  nextHeartbeatDue: number;
  gracePeriodEnds?: number;
  consecutiveMissed: number;
  totalHeartbeats: number;
  triggerTime?: number;
  triggerReason?: string;
}

// User Types
export interface User {
  id: string;
  walletAddress: string;
  email?: string;
  phone?: string;
  name?: string;
  profileImage?: string;
  biometricEnabled: boolean;
  notificationsEnabled: boolean;
  createdAt: number;
  updatedAt: number;
  lastLoginAt: number;
}

// Security Types
export interface SecuritySettings {
  biometricEnabled: boolean;
  biometricType?: string;
  autoLockEnabled: boolean;
  autoLockTimeout: number; // minutes
  requireBiometricForSensitive: boolean;
  allowScreenshots: boolean;
  requirePinBackup: boolean;
  sessionTimeout: number; // minutes
}

// Storage Types
export interface StorageStats {
  totalAssets: number;
  totalBeneficiaries: number;
  totalFileSize: number;
  encryptedFiles: number;
  lastBackup?: number;
  storageUsed: number; // bytes
  storageLimit: number; // bytes
}

// Notification Types
export type NotificationType = 
  | 'heartbeat_reminder'
  | 'heartbeat_overdue'
  | 'asset_created'
  | 'beneficiary_added'
  | 'system_triggered'
  | 'asset_released'
  | 'security_alert'
  | 'backup_reminder';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, any>;
  read: boolean;
  createdAt: number;
  expiresAt?: number;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface CreateAssetForm {
  name: string;
  description?: string;
  type: AssetType;
  sensitivity: SensitivityLevel;
  beneficiaries: string[];
  releaseDelay: number;
  file?: {
    uri: string;
    name: string;
    type: string;
    size: number;
  };
}

export interface AddBeneficiaryForm {
  name: string;
  type: BeneficiaryType;
  walletAddress: string;
  email?: string;
  phone?: string;
  physicalAddress?: string;
  notificationPreferences: NotificationPreferences;
}

export interface HeartbeatConfigForm {
  intervalDays: number;
  gracePeriodDays: number;
  allowedMethods: HeartbeatMethod[];
  requireMultiFactor: boolean;
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: number;
}

// Theme Types
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
  };
  fontSize: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
}

// Component Props Types
export interface ScreenProps {
  navigation: any;
  route: any;
}

export interface CardProps {
  children: React.ReactNode;
  style?: any;
  onPress?: () => void;
}

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  style?: any;
}

export interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  multiline?: boolean;
  numberOfLines?: number;
  error?: string;
  disabled?: boolean;
  style?: any;
}

// Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Constants
export const ASSET_TYPES: Record<AssetType, string> = {
  crypto_keys: 'Crypto Keys',
  audio_message: 'Audio Message',
  photo: 'Photo',
  video: 'Video',
  letter: 'Letter',
  document: 'Document',
  business_secret: 'Business Secret',
  intelligence: 'Intelligence Data',
  military_evidence: 'Military Evidence',
  other: 'Other'
};

export const SENSITIVITY_LEVELS: Record<SensitivityLevel, { label: string; color: string }> = {
  low: { label: 'Low', color: '#10b981' },
  medium: { label: 'Medium', color: '#f59e0b' },
  high: { label: 'High', color: '#ef4444' },
  critical: { label: 'Critical', color: '#dc2626' }
};

export const HEARTBEAT_METHODS: Record<HeartbeatMethod, string> = {
  biometric: 'Biometric Authentication',
  app_login: 'App Login',
  wallet_signature: 'Wallet Signature',
  multi_factor: 'Multi-Factor Authentication'
};

export const BENEFICIARY_TYPES: Record<BeneficiaryType, string> = {
  individual: 'Individual',
  organization: 'Organization',
  smart_contract: 'Smart Contract',
  multi_sig: 'Multi-Signature Wallet',
  dao: 'DAO'
};