import { PlanType, ServiceMode } from './subscription.schema';

export interface PlanConfig {
  name: string;
  price: number;
  interval: 'month' | 'year';
  mode: ServiceMode;
  limits: {
    assets: number;
    beneficiaries: number;
    storageGB: number;
  };
  features: string[];
  stripePriceId?: string;
}

export const PLANS: Record<PlanType, PlanConfig> = {
  // CENTRALIZED PLANS
  [PlanType.STARTER]: {
    name: 'Starter',
    price: 9.99,
    interval: 'month',
    mode: ServiceMode.CENTRALIZED,
    limits: {
      assets: 50,
      beneficiaries: 5,
      storageGB: 10,
    },
    features: [
      '50 assets',
      '5 beneficiaries',
      '10 GB storage',
      'Email support',
      'Auto-backup daily',
      'Mobile app access',
      '2FA security',
    ],
  },
  [PlanType.PROFESSIONAL]: {
    name: 'Professional',
    price: 29.99,
    interval: 'month',
    mode: ServiceMode.CENTRALIZED,
    limits: {
      assets: Infinity,
      beneficiaries: Infinity,
      storageGB: 100,
    },
    features: [
      'Unlimited assets',
      'Unlimited beneficiaries',
      '100 GB storage',
      'Priority support',
      'Hourly backups',
      'API access',
      'Advanced analytics',
      'Multi-device sync',
      'Custom domains',
    ],
  },
  [PlanType.ENTERPRISE]: {
    name: 'Enterprise',
    price: 99.99,
    interval: 'month',
    mode: ServiceMode.CENTRALIZED,
    limits: {
      assets: Infinity,
      beneficiaries: Infinity,
      storageGB: 1000,
    },
    features: [
      'Everything in Professional',
      'Dedicated support',
      '1 TB storage',
      'White-label option',
      'SLA guarantee',
      'Custom integrations',
      'Team management',
      'Audit logs',
      'Compliance reports',
    ],
  },

  // DECENTRALIZED PLANS
  [PlanType.FREEDOM]: {
    name: 'Freedom',
    price: 19.99,
    interval: 'month',
    mode: ServiceMode.DECENTRALIZED,
    limits: {
      assets: Infinity,
      beneficiaries: Infinity,
      storageGB: Infinity,
    },
    features: [
      'Unlimited assets (on-chain)',
      'Unlimited beneficiaries',
      'IPFS storage (unlimited)',
      'Community support',
      'No data custody',
      'True ownership',
      'Censorship resistant',
      '+ Gas fees (user pays)',
    ],
  },
  [PlanType.SOVEREIGN]: {
    name: 'Sovereign',
    price: 49.99,
    interval: 'month',
    mode: ServiceMode.DECENTRALIZED,
    limits: {
      assets: Infinity,
      beneficiaries: Infinity,
      storageGB: Infinity,
    },
    features: [
      'Everything in Freedom',
      'Arweave permanent storage',
      'Multi-chain support (ETH, Polygon, BSC, Arbitrum)',
      'Advanced smart contracts',
      'Priority gas optimization',
      'Hardware wallet support',
      'Multi-sig support',
      '+ Gas fees (user pays)',
    ],
  },
  [PlanType.IMMORTAL]: {
    name: 'Immortal',
    price: 149.99,
    interval: 'month',
    mode: ServiceMode.DECENTRALIZED,
    limits: {
      assets: Infinity,
      beneficiaries: Infinity,
      storageGB: Infinity,
    },
    features: [
      'Everything in Sovereign',
      'Lifetime Arweave storage',
      'All chains supported',
      'Zero-knowledge proofs',
      'Quantum-resistant encryption',
      'Dedicated IPFS node',
      'Custom smart contracts',
      'Legal document templates',
      '+ Gas fees (user pays)',
    ],
  },
};

export const TRIAL_CONFIG = {
  durationDays: 30,
  limits: {
    assets: 10,
    beneficiaries: 3,
    storageGB: 1,
  },
  features: [
    'All features unlocked',
    'Up to 10 assets',
    '3 beneficiaries',
    '1 GB storage',
    'Basic support',
    'Can switch between modes',
  ],
};

export const MODE_MIGRATION_FEE = 9.99;
