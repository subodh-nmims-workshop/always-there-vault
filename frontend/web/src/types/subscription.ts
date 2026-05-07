export type UserMode = 'centralized' | 'decentralized'
export type SubscriptionStatus = 'trial' | 'active' | 'expired' | 'cancelled'
export type BillingCycle = 'monthly' | 'quarterly' | 'yearly'

export type CentralizedPlan = 'starter' | 'nano' | 'lite' | 'essential' | 'secure' | 'professional' | 'mega' | 'enterprise'
export type DecentralizedPlan = 'freedom_starter' | 'freedom_nano' | 'freedom_lite' | 'freedom_basic' | 'freedom_secure' | 'sovereign_pro' | 'sovereign_mega' | 'immortal_elite'

export type PlanType = CentralizedPlan | DecentralizedPlan

export interface SubscriptionLimits {
  assets: number
  beneficiaries: number
  storage: string
  storageGB: number
  support: 'email' | 'priority' | 'dedicated' | 'community'
  backup?: 'daily' | 'hourly' | 'realtime'
  chains?: string[]
}

export interface PricingPlan {
  id: PlanType
  name: string
  mode: UserMode
  price: number // monthly
  quarterlyPrice: number
  yearlyPrice: number
  features: string[]
  limits: SubscriptionLimits
  popular?: boolean
}

/**
 * 65% PROFIT MARGIN MODEL
 * Prices adjusted to beat the market while ensuring high owner profit.
 * Centralized prices lowered for volume; Web3 prices optimized for blockchain costs.
 */
export const CENTRALIZED_PLANS: Record<CentralizedPlan, PricingPlan> = {
  starter: {
    id: 'starter',
    name: 'Vault Lite',
    mode: 'centralized',
    price: 0,
    quarterlyPrice: 0,
    yearlyPrice: 0,
    features: ['500 MB Secure Cloud (Lifetime Free)', '1 Beneficiary', 'Daily Backups', 'Community Support'],
    limits: { assets: 20, beneficiaries: 1, storage: '500MB', storageGB: 0.5, support: 'community', backup: 'daily' }
  },
  nano: {
    id: 'nano',
    name: 'Nano Vault',
    mode: 'centralized',
    price: 0.03,
    quarterlyPrice: 0.09,
    yearlyPrice: 0.36,
    features: ['1 GB Secure Cloud', '2 Beneficiaries', 'Daily Backups', 'Email Support'],
    limits: { assets: 20, beneficiaries: 2, storage: '1GB', storageGB: 1, support: 'email', backup: 'daily' }
  },
  lite: {
    id: 'lite',
    name: 'Lite Vault',
    mode: 'centralized',
    price: 0.15,
    quarterlyPrice: 0.45,
    yearlyPrice: 1.80,
    features: ['5 GB Secure Cloud', '5 Beneficiaries', 'Daily Backups', 'Email Support'],
    limits: { assets: 100, beneficiaries: 5, storage: '5GB', storageGB: 5, support: 'email', backup: 'daily' }
  },
  essential: {
    id: 'essential',
    name: 'Essential Vault',
    mode: 'centralized',
    price: 0.45,
    quarterlyPrice: 1.35,
    yearlyPrice: 5.40,
    features: ['15 GB Secure Cloud', '10 Beneficiaries', 'Daily Backups', 'Standard Support'],
    limits: { assets: 500, beneficiaries: 10, storage: '15GB', storageGB: 15, support: 'email', backup: 'daily' }
  },
  secure: {
    id: 'secure',
    name: 'Secure Vault',
    mode: 'centralized',
    price: 1.50,
    quarterlyPrice: 4.50,
    yearlyPrice: 18.00,
    features: ['50 GB Secure Cloud', 'Unlimited Beneficiaries', 'Daily Backups', 'Priority Support'],
    limits: { assets: Infinity, beneficiaries: Infinity, storage: '50GB', storageGB: 50, support: 'priority', backup: 'daily' }
  },
  professional: {
    id: 'professional',
    name: 'Pro Vault',
    mode: 'centralized',
    price: 2.99,
    quarterlyPrice: 8.97,
    yearlyPrice: 35.88,
    popular: true,
    features: ['100 GB Secure Cloud', 'Unlimited Everything', 'Hourly Backups', 'Priority Support'],
    limits: { assets: Infinity, beneficiaries: Infinity, storage: '100GB', storageGB: 100, support: 'priority', backup: 'hourly' }
  },
  mega: {
    id: 'mega',
    name: 'Mega Vault',
    mode: 'centralized',
    price: 14.95,
    quarterlyPrice: 44.85,
    yearlyPrice: 179.40,
    features: ['500 GB Secure Cloud', 'Full Family Protection', 'Real-time Backups', 'Priority Support'],
    limits: { assets: Infinity, beneficiaries: Infinity, storage: '500GB', storageGB: 500, support: 'priority', backup: 'realtime' }
  },
  enterprise: {
    id: 'enterprise',
    name: 'Elite Vault',
    mode: 'centralized',
    price: 29.90,
    quarterlyPrice: 89.70,
    yearlyPrice: 358.80,
    features: ['1 TB Secure Cloud', 'Dedicated Concierge', 'Legacy Counseling', 'SLA Guarantee'],
    limits: { assets: Infinity, beneficiaries: Infinity, storage: '1TB', storageGB: 1024, support: 'dedicated', backup: 'realtime' }
  }
}

export const DECENTRALIZED_PLANS: Record<DecentralizedPlan, PricingPlan> = {
  freedom_starter: {
    id: 'freedom_starter',
    name: 'Web3 Lite',
    mode: 'decentralized',
    price: 0,
    quarterlyPrice: 0,
    yearlyPrice: 0,
    features: ['500 MB Arweave (Lifetime Free)', 'True Ownership', 'No Counterparty Risk', 'Community Support'],
    limits: { assets: 20, beneficiaries: 1, storage: '500MB', storageGB: 0.5, support: 'community', chains: ['poly'] }
  },
  freedom_nano: {
    id: 'freedom_nano',
    name: 'Web3 Nano',
    mode: 'decentralized',
    price: 0.19,
    quarterlyPrice: 0.58,
    yearlyPrice: 2.34,
    features: ['1 GB Arweave (Permanent)', 'Censorship Resistant', 'Self-Custody Keys', 'Email Support'],
    limits: { assets: 20, beneficiaries: 2, storage: '1GB', storageGB: 1, support: 'community', chains: ['poly'] }
  },
  freedom_lite: {
    id: 'freedom_lite',
    name: 'Web3 Lite',
    mode: 'decentralized',
    price: 0.97,
    quarterlyPrice: 2.92,
    yearlyPrice: 11.70,
    features: ['5 GB Arweave (Permanent)', 'True Ownership', 'No Counterparty Risk', 'Email Support'],
    limits: { assets: 100, beneficiaries: 5, storage: '5GB', storageGB: 5, support: 'community', chains: ['poly', 'eth'] }
  },
  freedom_basic: {
    id: 'freedom_basic',
    name: 'Web3 Basic',
    mode: 'decentralized',
    price: 2.92,
    quarterlyPrice: 8.77,
    yearlyPrice: 35.10,
    features: ['15 GB Arweave (Permanent)', 'Shard-Distributed', 'Quantum Ready', 'Priority Support'],
    limits: { assets: 500, beneficiaries: 10, storage: '15GB', storageGB: 15, support: 'priority', chains: ['poly', 'eth'] }
  },
  freedom_secure: {
    id: 'freedom_secure',
    name: 'Web3 Secure',
    mode: 'decentralized',
    price: 9.75,
    quarterlyPrice: 29.25,
    yearlyPrice: 117.00,
    features: ['50 GB IPFS Storage', 'Decentralized Access', 'Zero Logs Policy', 'Priority Support'],
    limits: { assets: Infinity, beneficiaries: Infinity, storage: '50GB', storageGB: 50, support: 'priority', chains: ['all'] }
  },
  sovereign_pro: {
    id: 'sovereign_pro',
    name: 'Web3 Pro',
    mode: 'decentralized',
    price: 19.50,
    quarterlyPrice: 58.50,
    yearlyPrice: 234.00,
    popular: true,
    features: ['100 GB IPFS Storage', 'Multi-Chain Release', 'Custom Heartbeat', 'Priority Support'],
    limits: { assets: Infinity, beneficiaries: Infinity, storage: '100GB', storageGB: 100, support: 'priority', chains: ['all'] }
  },
  sovereign_mega: {
    id: 'sovereign_mega',
    name: 'Web3 Mega',
    mode: 'decentralized',
    price: 97.50,
    quarterlyPrice: 292.50,
    yearlyPrice: 1170.00,
    features: ['500 GB IPFS Storage', 'Family Node Access', 'Hardware Key Support', 'Dedicated Support'],
    limits: { assets: Infinity, beneficiaries: Infinity, storage: '500GB', storageGB: 500, support: 'dedicated', chains: ['all'] }
  },
  immortal_elite: {
    id: 'immortal_elite',
    name: 'Web3 Immortal',
    mode: 'decentralized',
    price: 195.00,
    quarterlyPrice: 585.00,
    yearlyPrice: 2340.00,
    features: ['1 TB IPFS Storage', 'Quantum Guard Vault', 'Multi-Sig Handover', 'Dedicated Support'],
    limits: { assets: Infinity, beneficiaries: Infinity, storage: '1TB', storageGB: 1024, support: 'dedicated', chains: ['all'] }
  }
}

export const ALL_PLANS: Record<PlanType, PricingPlan> = {
  ...CENTRALIZED_PLANS,
  ...DECENTRALIZED_PLANS
}

export interface UserSubscription {
  id: string
  userId: string
  planId: PlanType | 'free' | 'pro_trial'
  plan: PlanType // Added for backward compatibility in some components
  planName: string
  status: SubscriptionStatus
  mode: UserMode
  storageUsed: number
  storageLimit: number
  assetsCount?: number
  beneficiariesCount?: number
  storageUsedGB?: number
  canSwitchMode?: boolean
  trialEndsAt: Date | null
  subscriptionEndsAt: Date | null
  createdAt: Date
  updatedAt: Date
  limits?: SubscriptionLimits
}

export const TRIAL_DURATION_DAYS = 30
