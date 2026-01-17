/**
 * Decentralized Storage Interface
 * 
 * Abstracts IPFS, Arweave, and Filecoin storage providers
 */

export type StorageProvider = 'ipfs' | 'arweave' | 'filecoin';

export interface StorageConfig {
  provider: StorageProvider;
  endpoint?: string;
  apiKey?: string;
  timeout?: number;
  retries?: number;
}

export interface StorageMetadata {
  hash: string;                    // Content identifier (CID)
  provider: StorageProvider;
  size: number;                   // File size in bytes
  timestamp: number;              // Upload timestamp
  encrypted: boolean;             // Whether content is encrypted
  mimeType?: string;              // Content MIME type
  filename?: string;              // Original filename
  tags?: string[];                // Metadata tags
}

export interface StorageResult {
  success: boolean;
  hash?: string;                  // Content hash/CID
  metadata?: StorageMetadata;
  error?: string;
  provider: StorageProvider;
}

export interface RetrievalResult {
  success: boolean;
  data?: Buffer;
  metadata?: StorageMetadata;
  error?: string;
  provider: StorageProvider;
}

/**
 * Universal Storage Interface
 * All storage providers must implement this interface
 */
export interface IStorageProvider {
  readonly provider: StorageProvider;
  
  /**
   * Store encrypted data and return content hash
   */
  store(data: Buffer, metadata?: Partial<StorageMetadata>): Promise<StorageResult>;
  
  /**
   * Retrieve data by content hash
   */
  retrieve(hash: string): Promise<RetrievalResult>;
  
  /**
   * Check if content exists
   */
  exists(hash: string): Promise<boolean>;
  
  /**
   * Get metadata for stored content
   */
  getMetadata(hash: string): Promise<StorageMetadata | null>;
  
  /**
   * Pin content to prevent garbage collection (IPFS)
   */
  pin?(hash: string): Promise<boolean>;
  
  /**
   * Unpin content (IPFS)
   */
  unpin?(hash: string): Promise<boolean>;
  
  /**
   * Get storage cost estimate
   */
  estimateCost?(size: number, duration?: number): Promise<string>;
}

/**
 * Multi-Provider Storage Manager
 * Handles redundant storage across multiple providers
 */
export interface IStorageManager {
  /**
   * Store data across multiple providers for redundancy
   */
  storeRedundant(
    data: Buffer, 
    providers: StorageProvider[], 
    metadata?: Partial<StorageMetadata>
  ): Promise<{
    primary: StorageResult;
    backups: StorageResult[];
    allHashes: string[];
  }>;
  
  /**
   * Retrieve data with fallback to backup providers
   */
  retrieveWithFallback(
    hashes: string[], 
    providers: StorageProvider[]
  ): Promise<RetrievalResult>;
  
  /**
   * Verify data integrity across providers
   */
  verifyIntegrity(hashes: string[]): Promise<{
    hash: string;
    provider: StorageProvider;
    valid: boolean;
    error?: string;
  }[]>;
  
  /**
   * Get best provider for storage based on cost, speed, reliability
   */
  getBestProvider(
    size: number, 
    requirements: StorageRequirements
  ): Promise<StorageProvider>;
}

/**
 * Storage Requirements for Provider Selection
 */
export interface StorageRequirements {
  permanence: 'temporary' | 'long_term' | 'permanent';
  speed: 'fast' | 'medium' | 'slow';
  cost: 'low' | 'medium' | 'high';
  redundancy: boolean;
  geographic?: string[];           // Preferred regions
}

/**
 * Storage Event Types
 */
export type StorageEventType = 
  | 'stored'
  | 'retrieved' 
  | 'pinned'
  | 'unpinned'
  | 'error'
  | 'integrity_check';

export interface StorageEvent {
  type: StorageEventType;
  provider: StorageProvider;
  hash: string;
  timestamp: number;
  metadata?: Record<string, any>;
  error?: string;
}

/**
 * Storage Statistics
 */
export interface StorageStats {
  provider: StorageProvider;
  totalStored: number;            // Total files stored
  totalSize: number;              // Total bytes stored
  totalCost: string;              // Total cost (in provider's currency)
  averageRetrievalTime: number;   // Average retrieval time in ms
  successRate: number;            // Success rate (0-1)
  lastUpdated: number;
}

/**
 * Default Storage Configuration
 */
export const DEFAULT_STORAGE_CONFIG: Record<StorageProvider, StorageConfig> = {
  ipfs: {
    provider: 'ipfs',
    endpoint: 'https://ipfs.infura.io:5001',
    timeout: 30000,
    retries: 3
  },
  arweave: {
    provider: 'arweave',
    endpoint: 'https://arweave.net',
    timeout: 60000,
    retries: 2
  },
  filecoin: {
    provider: 'filecoin',
    endpoint: 'https://api.filecoin.io',
    timeout: 120000,
    retries: 2
  }
};

/**
 * Storage Provider Characteristics
 */
export const PROVIDER_CHARACTERISTICS: Record<StorageProvider, {
  permanence: 'temporary' | 'long_term' | 'permanent';
  speed: 'fast' | 'medium' | 'slow';
  cost: 'low' | 'medium' | 'high';
  maxFileSize: number;
  description: string;
}> = {
  ipfs: {
    permanence: 'temporary',
    speed: 'fast',
    cost: 'low',
    maxFileSize: 100 * 1024 * 1024, // 100MB
    description: 'Fast, distributed storage with content addressing'
  },
  arweave: {
    permanence: 'permanent',
    speed: 'medium',
    cost: 'medium',
    maxFileSize: 12 * 1024 * 1024, // 12MB per transaction
    description: 'Permanent storage with one-time payment'
  },
  filecoin: {
    permanence: 'long_term',
    speed: 'slow',
    cost: 'low',
    maxFileSize: 32 * 1024 * 1024 * 1024, // 32GB
    description: 'Decentralized storage marketplace for large files'
  }
};

/**
 * Storage Error Types
 */
export class StorageError extends Error {
  constructor(
    message: string,
    public provider: StorageProvider,
    public code?: string,
    public retryable: boolean = false
  ) {
    super(message);
    this.name = 'StorageError';
  }
}

export class StorageTimeoutError extends StorageError {
  constructor(provider: StorageProvider, timeout: number) {
    super(`Storage operation timed out after ${timeout}ms`, provider, 'TIMEOUT', true);
    this.name = 'StorageTimeoutError';
  }
}

export class StorageNotFoundError extends StorageError {
  constructor(provider: StorageProvider, hash: string) {
    super(`Content not found: ${hash}`, provider, 'NOT_FOUND', false);
    this.name = 'StorageNotFoundError';
  }
}

export class StorageQuotaError extends StorageError {
  constructor(provider: StorageProvider, size: number, limit: number) {
    super(`Storage quota exceeded: ${size} bytes > ${limit} bytes`, provider, 'QUOTA_EXCEEDED', false);
    this.name = 'StorageQuotaError';
  }
}