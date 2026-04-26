export type UserMode = 'centralized' | 'decentralized'
export type SubscriptionStatus = 'trial' | 'active' | 'expired' | 'cancelled'
export type BillingCycle = 'monthly' | 'quarterly' | 'yearly'

export type CentralizedPlan = 'nano' | 'lite' | 'essential' | 'secure' | 'professional' | 'mega' | 'enterprise'
export type DecentralizedPlan = 'freedom_nano' | 'freedom_lite' | 'freedom_basic' | 'freedom_secure' | 'sovereign_pro' | 'sovereign_mega' | 'immortal_elite'

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
  nano: {
    id: 'nano',
    name: 'Nano Vault',
    mode: 'centralized',
    price: 1.00,
    quarterlyPrice: 3.00,
    yearlyPrice: 5.00,
    features: ['1 GB Secure Cloud', '2 Beneficiaries', 'Daily Backups', 'Email Support'],
    limits: { assets: 20, beneficiaries: 2, storage: '1GB', storageGB: 1, support: 'email', backup: 'daily' }
  },
  lite: {
    id: 'lite',
    name: 'Lite Vault',
    mode: 'centralized',
    price: 1.99,
    quarterlyPrice: 4.99,
    yearlyPrice: 9.99,
    features: ['5 GB Secure Cloud', '5 Beneficiaries', 'Daily Backups', 'Email Support'],
    limits: { assets: 100, beneficiaries: 5, storage: '5GB', storageGB: 5, support: 'email', backup: 'daily' }
  },
  essential: {
    id: 'essential',
    name: 'Essential Vault',
    mode: 'centralized',
    price: 3.99,
    quarterlyPrice: 9.99,
    yearlyPrice: 19.99,
    features: ['15 GB Secure Cloud', '10 Beneficiaries', 'Daily Backups', 'Standard Support'],
    limits: { assets: 500, beneficiaries: 10, storage: '15GB', storageGB: 15, support: 'email', backup: 'daily' }
  },
  secure: {
    id: 'secure',
    name: 'Secure Vault',
    mode: 'centralized',
    price: 6.99,
    quarterlyPrice: 16.99,
    yearlyPrice: 39.99,
    features: ['50 GB Secure Cloud', 'Unlimited Beneficiaries', 'Daily Backups', 'Priority Support'],
    limits: { assets: Infinity, beneficiaries: Infinity, storage: '50GB', storageGB: 50, support: 'priority', backup: 'daily' }
  },
  professional: {
    id: 'professional',
    name: 'Pro Vault',
    mode: 'centralized',
    price: 12.99,
    quarterlyPrice: 29.99,
    yearlyPrice: 79.99,
    popular: true,
    features: ['100 GB Secure Cloud', 'Unlimited Everything', 'Hourly Backups', 'Priority Support'],
    limits: { assets: Infinity, beneficiaries: Infinity, storage: '100GB', storageGB: 100, support: 'priority', backup: 'hourly' }
  },
  mega: {
    id: 'mega',
    name: 'Mega Vault',
    mode: 'centralized',
    price: 19.99,
    quarterlyPrice: 49.99,
    yearlyPrice: 149.99,
    features: ['500 GB Secure Cloud', 'Full Family Protection', 'Real-time Backups', 'Priority Support'],
    limits: { assets: Infinity, beneficiaries: Infinity, storage: '500GB', storageGB: 500, support: 'priority', backup: 'realtime' }
  },
  enterprise: {
    id: 'enterprise',
    name: 'Elite Vault',
    mode: 'centralized',
    price: 34.99,
    quarterlyPrice: 89.99,
    yearlyPrice: 299.99,
    features: ['1 TB Secure Cloud', 'Dedicated Concierge', 'Legacy Counseling', 'SLA Guarantee'],
    limits: { assets: Infinity, beneficiaries: Infinity, storage: '1TB', storageGB: 1024, support: 'dedicated', backup: 'realtime' }
  }
}

export const DECENTRALIZED_PLANS: Record<DecentralizedPlan, PricingPlan> = {
  freedom_nano: {
    id: 'freedom_nano',
    name: 'Web3 Nano',
    mode: 'decentralized',
    price: 4.99,
    quarterlyPrice: 12.99,
    yearlyPrice: 49.99,
    features: ['1 GB Arweave (Permanent)', 'Censorship Resistant', 'Self-Custody Keys', 'Email Support'],
    limits: { assets: 20, beneficiaries: 2, storage: '1GB', storageGB: 1, support: 'community', chains: ['poly'] }
  },
  freedom_lite: {
    id: 'freedom_lite',
    name: 'Web3 Lite',
    mode: 'decentralized',
    price: 9.99,
    quarterlyPrice: 29.99,
    yearlyPrice: 99.99,
    features: ['5 GB Arweave (Permanent)', 'True Ownership', 'No Counterparty Risk', 'Email Support'],
    limits: { assets: 100, beneficiaries: 5, storage: '5GB', storageGB: 5, support: 'community', chains: ['poly', 'eth'] }
  },
  freedom_basic: {
    id: 'freedom_basic',
    name: 'Web3 Basic',
    mode: 'decentralized',
    price: 19.99,
    quarterlyPrice: 49.99,
    yearlyPrice: 199.99,
    features: ['15 GB Arweave (Permanent)', 'Shard-Distributed', 'Quantum Ready', 'Priority Support'],
    limits: { assets: 500, beneficiaries: 10, storage: '15GB', storageGB: 15, support: 'priority', chains: ['poly', 'eth'] }
  },
  freedom_secure: {
    id: 'freedom_secure',
    name: 'Web3 Secure',
    mode: 'decentralized',
    price: 12.99,
    quarterlyPrice: 34.99,
    yearlyPrice: 99.99,
    features: ['50 GB IPFS Storage', 'Decentralized Access', 'Zero Logs Policy', 'Priority Support'],
    limits: { assets: Infinity, beneficiaries: Infinity, storage: '50GB', storageGB: 50, support: 'priority', chains: ['all'] }
  },
  sovereign_pro: {
    id: 'sovereign_pro',
    name: 'Web3 Pro',
    mode: 'decentralized',
    price: 19.99,
    quarterlyPrice: 49.99,
    yearlyPrice: 149.99,
    popular: true,
    features: ['100 GB IPFS Storage', 'Multi-Chain Release', 'Custom Heartbeat', 'Priority Support'],
    limits: { assets: Infinity, beneficiaries: Infinity, storage: '100GB', storageGB: 100, support: 'priority', chains: ['all'] }
  },
  sovereign_mega: {
    id: 'sovereign_mega',
    name: 'Web3 Mega',
    mode: 'decentralized',
    price: 49.99,
    quarterlyPrice: 129.99,
    yearlyPrice: 499.99,
    features: ['500 GB IPFS Storage', 'Family Node Access', 'Hardware Key Support', 'Dedicated Support'],
    limits: { assets: Infinity, beneficiaries: Infinity, storage: '500GB', storageGB: 500, support: 'dedicated', chains: ['all'] }
  },
  immortal_elite: {
    id: 'immortal_elite',
    name: 'Web3 Immortal',
    mode: 'decentralized',
    price: 89.99,
    quarterlyPrice: 199.99,
    yearlyPrice: 899.99,
    features: ['1 TB IPFS Storage', 'Quantum Guard Vault', 'Multi-Sig Handover', 'Dedicated Support'],
    limits: { assets: Infinity, beneficiaries: Infinity, storage: '1TB', storageGB: 1024, support: 'dedicated', chains: ['all'] }
  }
}

export const ALL_PLANS: Record<PlanType, PricingPlan> = {
  ...CENTRALIZED_PLANS,
  ...DECENTRALIZED_PLANS
}
