/**
 * Subscription & Mode Types for Dual-Mode System
 */

export type UserMode = 'centralized' | 'decentralized'

export type SubscriptionStatus = 'trial' | 'active' | 'expired' | 'cancelled'

export type CentralizedPlan = 'starter' | 'professional' | 'enterprise'
export type DecentralizedPlan = 'freedom' | 'sovereign' | 'immortal'

export type PlanType = CentralizedPlan | DecentralizedPlan

export interface SubscriptionLimits {
  assets: number // Infinity for unlimited
  beneficiaries: number
  storage: string // e.g., "10GB", "unlimited"
  storageGB?: number // Numerical limit for UI bars
  support: 'email' | 'priority' | 'dedicated' | 'community'
  backup?: 'daily' | 'hourly' | 'realtime'
  chains?: string[]
}

export interface PricingPlan {
  id: PlanType
  name: string
  mode: UserMode
  price: number // monthly in USD
  yearlyPrice?: number // annual pricing
  features: string[]
  limits: SubscriptionLimits
  popular?: boolean
}

export interface UserSubscription {
  userId: string
  mode: UserMode
  plan: PlanType
  status: SubscriptionStatus
  trialEndsAt: Date | null
  subscriptionEndsAt: Date | null
  createdAt: Date
  updatedAt: Date
  canSwitchMode: boolean
  stripeCustomerId?: string
  stripeSubscriptionId?: string
  assetsCount?: number
  beneficiariesCount?: number
  storageUsedGB?: number
  limits?: SubscriptionLimits
}

// Pricing Plans
export const CENTRALIZED_PLANS: Record<CentralizedPlan, PricingPlan> = {
  starter: {
    id: 'starter',
    name: 'Starter',
    mode: 'centralized',
    price: 4.99,
    yearlyPrice: 49.90,
    features: [
      '50 assets',
      '5 beneficiaries',
      '10 GB storage',
      'Email support',
      'Auto-backup daily',
      'Mobile app access',
      '2FA security'
    ],
    limits: {
      assets: 50,
      beneficiaries: 5,
      storage: '10GB',
      support: 'email',
      backup: 'daily'
    }
  },
  professional: {
    id: 'professional',
    name: 'Professional',
    mode: 'centralized',
    price: 14.99,
    yearlyPrice: 149.90,
    popular: true,
    features: [
      'Unlimited assets',
      'Unlimited beneficiaries',
      '100 GB storage',
      'Priority support',
      'Hourly backups',
      'API access',
      'Advanced analytics',
      'Multi-device sync',
      'Custom domains'
    ],
    limits: {
      assets: Infinity,
      beneficiaries: Infinity,
      storage: '100GB',
      support: 'priority',
      backup: 'hourly'
    }
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    mode: 'centralized',
    price: 49.99,
    yearlyPrice: 499.90,
    features: [
      'Everything in Professional',
      'Dedicated support',
      '1 TB storage',
      'White-label option',
      'SLA guarantee',
      'Custom integrations',
      'Team management',
      'Audit logs',
      'Compliance reports'
    ],
    limits: {
      assets: Infinity,
      beneficiaries: Infinity,
      storage: '1TB',
      support: 'dedicated',
      backup: 'realtime'
    }
  }
}

export const DECENTRALIZED_PLANS: Record<DecentralizedPlan, PricingPlan> = {
  freedom: {
    id: 'freedom',
    name: 'Freedom',
    mode: 'decentralized',
    price: 9.99,
    yearlyPrice: 99.90,
    features: [
      'Unlimited assets (on-chain)',
      'Unlimited beneficiaries',
      'IPFS storage (unlimited)',
      'Community support',
      'No data custody',
      'True ownership',
      'Censorship resistant',
      '+ Gas fees (user pays)'
    ],
    limits: {
      assets: Infinity,
      beneficiaries: Infinity,
      storage: 'unlimited',
      support: 'community',
      chains: ['ethereum', 'polygon']
    }
  },
  sovereign: {
    id: 'sovereign',
    name: 'Sovereign',
    mode: 'decentralized',
    price: 29.99,
    yearlyPrice: 299.90,
    popular: true,
    features: [
      'Everything in Freedom',
      'Arweave permanent storage',
      'Multi-chain support',
      'Advanced smart contracts',
      'Priority gas optimization',
      'Hardware wallet support',
      'Multi-sig support',
      '+ Gas fees (user pays)'
    ],
    limits: {
      assets: Infinity,
      beneficiaries: Infinity,
      storage: 'unlimited',
      support: 'priority',
      chains: ['ethereum', 'polygon', 'bsc', 'arbitrum']
    }
  },
  immortal: {
    id: 'immortal',
    name: 'Immortal',
    mode: 'decentralized',
    price: 149.00,
    yearlyPrice: 1499.00, // One-Time Lifetime Fee equivalent
    features: [
      'Everything in Sovereign',
      'Lifetime Arweave storage',
      'All chains supported',
      'Zero-knowledge proofs',
      'Quantum-resistant encryption',
      'Dedicated IPFS node',
      'Custom smart contracts',
      'Legal document templates',
      '+ Gas fees (user pays)'
    ],
    limits: {
      assets: Infinity,
      beneficiaries: Infinity,
      storage: 'permanent',
      support: 'dedicated',
      chains: ['all']
    }
  }
}

export const ALL_PLANS = {
  ...CENTRALIZED_PLANS,
  ...DECENTRALIZED_PLANS
}

export const TRIAL_DURATION_DAYS = 30
export const MIGRATION_FEE = 9.99
