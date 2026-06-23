'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { UserSubscription, UserMode, PlanType, ALL_PLANS } from '@/types/subscription'
import WebStorageService from '@/lib/storage'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://always-there-protocol-api.onrender.com' /* 'http://localhost:7001' */

interface SubscriptionContextType {
  subscription: UserSubscription | null
  isLoading: boolean
  isTrialActive: boolean
  daysRemaining: number
  canUseFeature: (feature: string) => boolean
  switchMode: (newMode: UserMode) => Promise<void>
  upgradePlan: (plan: PlanType) => Promise<void>
  cancelSubscription: () => Promise<void>
  refresh: () => Promise<void>
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined)

// Map backend planId to frontend PlanType key
function normalizePlanId(planId: string, mode: string): PlanType {
  const lower = (planId || '').toLowerCase()
  // If it already matches a known plan key, return it
  if (lower in ALL_PLANS) return lower as PlanType
  // Map legacy/unknown planIds to free tier
  if (lower === 'free' || lower === 'trial' || lower === 'starter_free' || !planId) {
    return mode === 'decentralized' ? 'freedom_starter' : 'starter'
  }
  return mode === 'decentralized' ? 'freedom_starter' : 'starter'
}

// Map backend status (UPPER_CASE) → frontend status (lower)
function normalizeStatus(status: string): 'trial' | 'active' | 'expired' | 'cancelled' {
  const s = (status || '').toUpperCase()
  if (s === 'ACTIVE') return 'active'
  if (s === 'TRIAL') return 'trial'
  if (s === 'EXPIRED') return 'expired'
  if (s === 'CANCELLED') return 'cancelled'
  return 'active' // default
}

// Convert backend response → UserSubscription
function formatSubscription(data: any, walletAddress: string): UserSubscription {
  const rawMode = data.mode || data.storageEngine || 'decentralized'
  const mode: UserMode = rawMode === 'web3' || rawMode === 'decentralized' ? 'decentralized' : 'centralized'
  const planId = normalizePlanId(data.planId || data.plan, mode)
  const status = normalizeStatus(data.status)

  // storageLimit from backend is in bytes → convert to GB
  const storageLimitBytes = data.storageLimit || 524288000 // default 500MB
  const storageLimitGB = storageLimitBytes / (1024 * 1024 * 1024)

  // storageUsed from backend is in bytes → convert to GB
  const storageUsedBytes = data.storageUsed || 0
  const storageUsedGB = storageUsedBytes / (1024 * 1024 * 1024)

  return {
    id: data.id || 'local',
    userId: data.userId || walletAddress,
    planId,
    plan: planId,
    planName: ALL_PLANS[planId]?.name || planId,
    status,
    mode,
    storageUsed: storageUsedBytes,
    storageLimit: storageLimitBytes,
    storageUsedGB,
    assetsCount: data.assetsCount || 0,
    beneficiariesCount: data.beneficiariesCount || 0,
    canSwitchMode: true,
    trialEndsAt: data.trialEndsAt ? new Date(data.trialEndsAt) : null,
    subscriptionEndsAt: data.endDate || data.subscriptionEndsAt
      ? new Date(data.endDate || data.subscriptionEndsAt)
      : null,
    createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
    updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(),
  }
}

// Build a default free subscription for unauthenticated users
function buildDefaultSubscription(): UserSubscription {
  return {
    id: 'default',
    userId: 'guest',
    planId: 'freedom_starter',
    plan: 'freedom_starter',
    planName: 'Web3 Lite',
    status: 'active',
    mode: 'decentralized',
    storageUsed: 0,
    storageLimit: 524288000,
    storageUsedGB: 0,
    assetsCount: 0,
    beneficiariesCount: 0,
    canSwitchMode: true,
    trialEndsAt: null,
    subscriptionEndsAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [subscription, setSubscription] = useState<UserSubscription | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const loadSubscription = async () => {
    setIsLoading(true)
    try {
      const address = localStorage.getItem('dwp_wallet_address')
      const isDemo = localStorage.getItem('dwp_is_demo') === 'true'

      if (isDemo || !address) {
        // No wallet or demo mode → show default free plan so dashboard isn't empty
        const defSub = buildDefaultSubscription()
        if (isDemo) {
          defSub.planId = 'sovereign_pro' // Make them a Pro member in the demo!
          defSub.plan = 'sovereign_pro'
          defSub.planName = 'Web3 Pro (Demo Sandbox)'
          defSub.storageLimit = 100 * 1024 * 1024 * 1024 // 100GB
        }
        try {
          const storage = WebStorageService.getInstance()
          const appState = await storage.getAppState()
          const totalUsedBytes = appState.assets.reduce((acc, asset) => acc + (asset.size || 0), 0)
          defSub.storageUsed = totalUsedBytes
          defSub.storageUsedGB = totalUsedBytes / (1024 * 1024 * 1024)
          defSub.assetsCount = appState.assets.length
          defSub.beneficiariesCount = appState.beneficiaries.length
        } catch (e) {
          console.warn('Failed to load local storage stats for guest sub', e)
        }
        setSubscription(defSub)
        setIsLoading(false)
        return
      }

      // Fetch from backend
      const response = await fetch(`${API_URL}/subscription/${address}`)
      let formatted: UserSubscription

      if (response.ok) {
        const data = await response.json()
        formatted = formatSubscription(data, address)
      } else if (response.status === 404) {
        // Not found → create trial
        const createRes = await fetch(`${API_URL}/subscription/trial`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: address, mode: 'decentralized' })
        })
        if (createRes.ok) {
          const newData = await createRes.json()
          formatted = formatSubscription(newData, address)
        } else {
          formatted = buildDefaultSubscription()
        }
      } else {
        throw new Error(`Backend returned ${response.status}`)
      }

      // Merge local stats
      try {
        const storage = WebStorageService.getInstance()
        const appState = await storage.getAppState()
        const totalUsedBytes = appState.assets.reduce((acc, asset) => acc + (asset.size || 0), 0)
        formatted.storageUsed = totalUsedBytes
        formatted.storageUsedGB = totalUsedBytes / (1024 * 1024 * 1024)
        formatted.assetsCount = appState.assets.length
        formatted.beneficiariesCount = appState.beneficiaries.length
      } catch (e) {
        console.warn('Failed to merge local storage stats', e)
      }

      setSubscription(formatted)
      // Cache without Infinity to avoid JSON null bug
      localStorage.setItem('dwp_subscription', JSON.stringify(formatted))
    } catch (error) {
      console.warn('Backend unavailable, using local cache:', error)
      // Fallback: use cached subscription if available
      const stored = localStorage.getItem('dwp_subscription')
      let fallbackSub: UserSubscription
      if (stored) {
        try {
          fallbackSub = JSON.parse(stored)
          if (!fallbackSub.plan) fallbackSub.plan = 'freedom_starter'
        } catch {
          fallbackSub = buildDefaultSubscription()
        }
      } else {
        fallbackSub = buildDefaultSubscription()
      }

      // Merge local stats for fallback too!
      try {
        const storage = WebStorageService.getInstance()
        const appState = await storage.getAppState()
        const totalUsedBytes = appState.assets.reduce((acc, asset) => acc + (asset.size || 0), 0)
        fallbackSub.storageUsed = totalUsedBytes
        fallbackSub.storageUsedGB = totalUsedBytes / (1024 * 1024 * 1024)
        fallbackSub.assetsCount = appState.assets.length
        fallbackSub.beneficiariesCount = appState.beneficiaries.length
      } catch (e) {
        console.warn('Failed to merge local storage stats for fallback sub', e)
      }

      setSubscription(fallbackSub)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadSubscription()

    const handleStorageUpdate = () => {
      loadSubscription()
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('storage-asset-saved', handleStorageUpdate)
      window.addEventListener('storage-asset-deleted', handleStorageUpdate)
      window.addEventListener('storage-beneficiary-saved', handleStorageUpdate)
      window.addEventListener('storage-beneficiary-deleted', handleStorageUpdate)
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('storage-asset-saved', handleStorageUpdate)
        window.removeEventListener('storage-asset-deleted', handleStorageUpdate)
        window.removeEventListener('storage-beneficiary-saved', handleStorageUpdate)
        window.removeEventListener('storage-beneficiary-deleted', handleStorageUpdate)
      }
    }
  }, [])

  const isTrialActive = !!(subscription?.status === 'trial' &&
    subscription.trialEndsAt &&
    subscription.trialEndsAt > new Date())

  const daysRemaining = subscription?.trialEndsAt
    ? Math.max(0, Math.ceil((subscription.trialEndsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0

  const canUseFeature = (_feature: string): boolean => {
    if (!subscription) return false
    if (subscription.status === 'expired') return false
    return true
  }

  const switchMode = async (newMode: UserMode) => {
    if (!subscription) return
    try {
      const response = await fetch(`${API_URL}/subscription/${subscription.userId}/switch-mode`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: newMode })
      })
      if (response.ok) {
        const updated = await response.json()
        const formatted = formatSubscription({ ...updated, mode: newMode }, subscription.userId)
        setSubscription(formatted)
        localStorage.setItem('dwp_subscription', JSON.stringify(formatted))
      } else {
        throw new Error('Backend switch-mode failed')
      }
    } catch {
      // Optimistic local update
      const updated = { ...subscription, mode: newMode, updatedAt: new Date() }
      setSubscription(updated)
      localStorage.setItem('dwp_subscription', JSON.stringify(updated))
    }
  }

  const upgradePlan = async (plan: PlanType) => {
    if (!subscription) return
    const planDetails = ALL_PLANS[plan]
    const updated: UserSubscription = {
      ...subscription,
      plan,
      planId: plan,
      planName: planDetails?.name || plan,
      status: 'active',
      storageLimit: Math.round((planDetails?.limits?.storageGB || 0.5) * 1024 * 1024 * 1024),
      subscriptionEndsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      updatedAt: new Date()
    }
    setSubscription(updated)
    localStorage.setItem('dwp_subscription', JSON.stringify(updated))
  }

  const cancelSubscription = async () => {
    if (!subscription) return
    try {
      const response = await fetch(`${API_URL}/subscription/${subscription.userId}/cancel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: 'User requested via dashboard' })
      })
      if (response.ok) {
        const updated = await response.json()
        const formatted = formatSubscription(updated, subscription.userId)
        setSubscription(formatted)
        localStorage.setItem('dwp_subscription', JSON.stringify(formatted))
      }
    } catch (error) {
      console.error('Failed to cancel subscription:', error)
      // Optimistic local update
      const updated = { ...subscription, status: 'cancelled' as const, updatedAt: new Date() }
      setSubscription(updated)
      localStorage.setItem('dwp_subscription', JSON.stringify(updated))
    }
  }

  return (
    <SubscriptionContext.Provider
      value={{
        subscription,
        isLoading,
        isTrialActive,
        daysRemaining,
        canUseFeature,
        switchMode,
        upgradePlan,
        cancelSubscription,
        refresh: loadSubscription,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  )
}

export function useSubscription() {
  const context = useContext(SubscriptionContext)
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider')
  }
  return context
}
