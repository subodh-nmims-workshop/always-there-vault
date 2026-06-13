import { PlanType, ServiceMode } from './subscription.schema';

export interface PlanConfig {
  name: string;
  price: number; // monthly
  quarterlyPrice: number;
  yearlyPrice: number;
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
  // --- Centralized Tiers ---
  [PlanType.STARTER]: {
    name: 'Vault Lite',
    price: 0,
    quarterlyPrice: 0,
    yearlyPrice: 0,
    interval: 'month',
    mode: ServiceMode.CENTRALIZED,
    limits: {
      assets: -1,
      beneficiaries: 1,
      centralizedStorageMB: 500,
      decentralizedStorageMB: 0,
    },
    features: ['500 MB Secure Cloud (Lifetime Free)', '1 Beneficiary', 'Daily Backups', 'Community Support'],
  },
  [PlanType.NANO]: {
    name: 'Nano Vault',
    price: 1.00,
    quarterlyPrice: 3.00,
    yearlyPrice: 5.00,
    interval: 'month',
    mode: ServiceMode.CENTRALIZED,
    limits: {
      assets: -1,
      beneficiaries: 2,
      centralizedStorageMB: 1024,
      decentralizedStorageMB: 0,
    },
    features: ['1 GB Secure Cloud', '2 Beneficiaries', 'Daily Backups', 'Email Support'],
  },
  [PlanType.LITE]: {
    name: 'Lite Vault',
    price: 1.99,
    quarterlyPrice: 4.99,
    yearlyPrice: 9.99,
    interval: 'month',
    mode: ServiceMode.CENTRALIZED,
    limits: {
      assets: -1,
      beneficiaries: 5,
      centralizedStorageMB: 5 * 1024,
      decentralizedStorageMB: 0,
    },
    features: ['5 GB Secure Cloud', '5 Beneficiaries', 'Daily Backups', 'Email Support'],
  },
  [PlanType.ESSENTIAL]: {
    name: 'Essential Vault',
    price: 3.99,
    quarterlyPrice: 9.99,
    yearlyPrice: 19.99,
    interval: 'month',
    mode: ServiceMode.CENTRALIZED,
    limits: {
      assets: -1,
      beneficiaries: 10,
      centralizedStorageMB: 15 * 1024,
      decentralizedStorageMB: 0,
    },
    features: ['15 GB Secure Cloud', '10 Beneficiaries', 'Daily Backups', 'Standard Support'],
  },
  [PlanType.SECURE]: {
    name: 'Secure Vault',
    price: 6.99,
    quarterlyPrice: 16.99,
    yearlyPrice: 39.99,
    interval: 'month',
    mode: ServiceMode.CENTRALIZED,
    limits: {
      assets: -1,
      beneficiaries: -1,
      centralizedStorageMB: 50 * 1024,
      decentralizedStorageMB: 0,
    },
    features: ['50 GB Secure Cloud', 'Unlimited Beneficiaries', 'Daily Backups', 'Priority Support'],
  },
  [PlanType.PROFESSIONAL]: {
    name: 'Pro Vault',
    price: 12.99,
    quarterlyPrice: 29.99,
    yearlyPrice: 79.99,
    interval: 'month',
    mode: ServiceMode.CENTRALIZED,
    limits: {
      assets: -1,
      beneficiaries: -1,
      centralizedStorageMB: 100 * 1024,
      decentralizedStorageMB: 0,
    },
    features: ['100 GB Secure Cloud', 'Unlimited Everything', 'Hourly Backups', 'Priority Support'],
  },
  [PlanType.MEGA]: {
    name: 'Mega Vault',
    price: 19.99,
    quarterlyPrice: 49.99,
    yearlyPrice: 149.99,
    interval: 'month',
    mode: ServiceMode.CENTRALIZED,
    limits: {
      assets: -1,
      beneficiaries: -1,
      centralizedStorageMB: 500 * 1024,
      decentralizedStorageMB: 0,
    },
    features: ['500 GB Secure Cloud', 'Full Family Protection', 'Real-time Backups', 'Priority Support'],
  },
  [PlanType.ENTERPRISE]: {
    name: 'Elite Vault',
    price: 34.99,
    quarterlyPrice: 89.99,
    yearlyPrice: 299.99,
    interval: 'month',
    mode: ServiceMode.CENTRALIZED,
    limits: {
      assets: -1,
      beneficiaries: -1,
      centralizedStorageMB: 1024 * 1024,
      decentralizedStorageMB: 0,
    },
    features: ['1 TB Secure Cloud', 'Dedicated Concierge', 'Legacy Counseling', 'SLA Guarantee'],
  },

  // --- Decentralized Tiers ---
  [PlanType.FREEDOM_STARTER]: {
    name: 'Web3 Starter',
    price: 0,
    quarterlyPrice: 0,
    yearlyPrice: 0,
    interval: 'month',
    mode: ServiceMode.DECENTRALIZED,
    limits: {
      assets: -1,
      beneficiaries: 1,
      centralizedStorageMB: 0,
      decentralizedStorageMB: 500,
    },
    features: ['500 MB Arweave (Lifetime Free)', 'True Ownership', 'No Counterparty Risk', 'Community Support'],
  },
  [PlanType.FREEDOM_NANO]: {
    name: 'Web3 Nano',
    price: 4.99,
    quarterlyPrice: 12.99,
    yearlyPrice: 49.99,
    interval: 'month',
    mode: ServiceMode.DECENTRALIZED,
    limits: {
      assets: -1,
      beneficiaries: 2,
      centralizedStorageMB: 0,
      decentralizedStorageMB: 1024,
    },
    features: ['1 GB Arweave (Permanent)', 'Censorship Resistant', 'Self-Custody Keys', 'Email Support'],
  },
  [PlanType.FREEDOM_LITE]: {
    name: 'Web3 Lite',
    price: 9.99,
    quarterlyPrice: 29.99,
    yearlyPrice: 99.99,
    interval: 'month',
    mode: ServiceMode.DECENTRALIZED,
    limits: {
      assets: -1,
      beneficiaries: 5,
      centralizedStorageMB: 0,
      decentralizedStorageMB: 5 * 1024,
    },
    features: ['5 GB Arweave (Permanent)', 'True Ownership', 'No Counterparty Risk', 'Email Support'],
  },
  [PlanType.FREEDOM_BASIC]: {
    name: 'Web3 Basic',
    price: 19.99,
    quarterlyPrice: 49.99,
    yearlyPrice: 199.99,
    interval: 'month',
    mode: ServiceMode.DECENTRALIZED,
    limits: {
      assets: -1,
      beneficiaries: 10,
      centralizedStorageMB: 0,
      decentralizedStorageMB: 15 * 1024,
    },
    features: ['15 GB Arweave (Permanent)', 'Shard-Distributed', 'Quantum Ready', 'Priority Support'],
  },
  [PlanType.FREEDOM_SECURE]: {
    name: 'Web3 Secure',
    price: 12.99,
    quarterlyPrice: 34.99,
    yearlyPrice: 99.99,
    interval: 'month',
    mode: ServiceMode.DECENTRALIZED,
    limits: {
      assets: -1,
      beneficiaries: -1,
      centralizedStorageMB: 0,
      decentralizedStorageMB: 50 * 1024,
    },
    features: ['50 GB IPFS Storage', 'Decentralized Access', 'Zero Logs Policy', 'Priority Support'],
  },
  [PlanType.SOVEREIGN_PRO]: {
    name: 'Web3 Pro',
    price: 19.99,
    quarterlyPrice: 49.99,
    yearlyPrice: 149.99,
    interval: 'month',
    mode: ServiceMode.DECENTRALIZED,
    limits: {
      assets: -1,
      beneficiaries: -1,
      centralizedStorageMB: 0,
      decentralizedStorageMB: 100 * 1024,
    },
    features: ['100 GB IPFS Storage', 'Multi-Chain Release', 'Custom Heartbeat', 'Priority Support'],
  },
  [PlanType.SOVEREIGN_MEGA]: {
    name: 'Web3 Mega',
    price: 49.99,
    quarterlyPrice: 129.99,
    yearlyPrice: 499.99,
    interval: 'month',
    mode: ServiceMode.DECENTRALIZED,
    limits: {
      assets: -1,
      beneficiaries: -1,
      centralizedStorageMB: 0,
      decentralizedStorageMB: 500 * 1024,
    },
    features: ['500 GB IPFS Storage', 'Family Node Access', 'Hardware Key Support', 'Dedicated Support'],
  },
  [PlanType.IMMORTAL_ELITE]: {
    name: 'Web3 Immortal',
    price: 89.99,
    quarterlyPrice: 199.99,
    yearlyPrice: 899.99,
    interval: 'month',
    mode: ServiceMode.DECENTRALIZED,
    limits: {
      assets: -1,
      beneficiaries: -1,
      centralizedStorageMB: 0,
      decentralizedStorageMB: 1024 * 1024,
    },
    features: ['1 TB IPFS Storage', 'Quantum Guard Vault', 'Multi-Sig Handover', 'Dedicated Support'],
  },
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
