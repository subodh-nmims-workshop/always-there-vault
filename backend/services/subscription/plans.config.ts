import { PlanType, ServiceMode } from './subscription.schema';

export interface PlanConfig {
  name: string;
  price: number;
  interval: 'month' | 'year';
  mode: ServiceMode;
  limits: {
    assets: number;
    beneficiaries: number;
    centralizedStorageMB: number;
    decentralizedStorageMB: number;
  };
  features: string[];
  stripePriceId?: string;
}

export const PLANS: Record<PlanType, PlanConfig> = {
  // LITE PLAN (FREE)
  [PlanType.STARTER]: {
    name: 'Vault Lite',
    price: 0,
    interval: 'month',
    mode: ServiceMode.CENTRALIZED,
    limits: {
      assets: 20,
      beneficiaries: 1,
      centralizedStorageMB: 500,
      decentralizedStorageMB: 500,
    },
    features: [
      '500 MB Secure Cloud (Lifetime Free)',
      '500 MB Protocol IPFS (Lifetime Free)',
      '1 Nominee / Beneficiary',
      'Centralized Primary Backup',
      'Standard Heartbeat',
    ],
  },
  // PRO PLAN
  [PlanType.PROFESSIONAL]: {
    name: 'Vault Pro',
    price: 9.99,
    interval: 'month',
    mode: ServiceMode.DECENTRALIZED,
    limits: {
      assets: Infinity,
      beneficiaries: 5,
      centralizedStorageMB: 50000, // 50 GB
      decentralizedStorageMB: 50000, // 50 GB
    },
    features: [
      '50 GB Encrypted Storage',
      '5 Nominees / Quorum',
      'Full IPFS Sharding (SSS)',
      'Priority Relayer Service',
      'Decentralized Redundancy',
    ],
  },
  // ENTERPRISE PLAN
  [PlanType.ENTERPRISE]: {
    name: 'Vault Enterprise',
    price: 49.99,
    interval: 'month',
    mode: ServiceMode.DECENTRALIZED,
    limits: {
      assets: Infinity,
      beneficiaries: Infinity,
      centralizedStorageMB: Infinity,
      decentralizedStorageMB: Infinity,
    },
    features: [
      'Unlimited Cloud Storage',
      'Unlimited IPFS Storage',
      'Unlimited Nominees',
      'Institutional Relayer Nodes',
      'Legal Verification Layer',
    ],
  },
  // Keep other plans for backward compatibility or as hidden tiers
  [PlanType.FREEDOM]: {
     name: 'Freedom (Legacy)',
     price: 19.99,
     interval: 'month',
     mode: ServiceMode.DECENTRALIZED,
     limits: { assets: Infinity, beneficiaries: Infinity, centralizedStorageMB: 1000, decentralizedStorageMB: Infinity },
     features: ['IPFS Focused']
  },
  [PlanType.SOVEREIGN]: {
     name: 'Sovereign (Legacy)',
     price: 49.99,
     interval: 'month',
     mode: ServiceMode.DECENTRALIZED,
     limits: { assets: Infinity, beneficiaries: Infinity, centralizedStorageMB: 10000, decentralizedStorageMB: Infinity },
     features: ['Arweave Focused']
  },
  [PlanType.IMMORTAL]: {
     name: 'Immortal (Legacy)',
     price: 149.99,
     interval: 'month',
     mode: ServiceMode.DECENTRALIZED,
     limits: { assets: Infinity, beneficiaries: Infinity, centralizedStorageMB: Infinity, decentralizedStorageMB: Infinity },
     features: ['Quantum Resistant']
  }
};

export const TRIAL_CONFIG = {
  durationDays: 30,
  limits: {
    assets: 10,
    beneficiaries: 3,
    centralizedStorageMB: 1024,
    decentralizedStorageMB: 1024,
  },
  features: [
    'Trial Mode Access',
    '1 GB Mixed Storage',
    '3 Beneficiaries',
  ],
};

export const MODE_MIGRATION_FEE = 0; // Free migration for better UX
