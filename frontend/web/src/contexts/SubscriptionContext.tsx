'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { UserSubscription, UserMode, PlanType, TRIAL_DURATION_DAYS } from '@/types/subscription'

interface SubscriptionContextType {
  subscription: UserSubscription | null
  isLoading: boolean
  isTrialActive: boolean
  daysRemaining: number
  canUseFeature: (feature: string) => boolean
  switchMode: (newMode: UserMode) => Promise<void>
  upgradePlan: (plan: PlanType) => Promise<void>
  cancelSubscription: () => Promise<void>
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined)

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [subscription, setSubscription] = useState<UserSubscription | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadSubscription()
  }, [])

  const loadSubscription = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7001';
    try {
      const address = localStorage.getItem('dwp_wallet_address');
      if (!address) {
        setIsLoading(false);
        return;
      }

      // 1. Try to fetch from backend
      const response = await fetch(`${API_URL}/subscription/${address}`);

      if (response.ok) {
        const data = await response.json();
        const formatted = {
          ...data,
          plan: data.planId, // Map planId to plan
          trialEndsAt: data.trialEndsAt ? new Date(data.trialEndsAt) : null,
          subscriptionEndsAt: data.currentPeriodEnd ? new Date(data.currentPeriodEnd) : null,
          createdAt: new Date(data.createdAt),
          updatedAt: new Date(data.updatedAt)
        };
        setSubscription(formatted);
        localStorage.setItem('dwp_subscription', JSON.stringify(formatted));
      } else {
        // 2. If not found, create trial
        const createRes = await fetch(`${API_URL}/subscription/trial`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: address, mode: 'centralized' })
        });

        if (createRes.ok) {
          const newData = await createRes.json();
          const formatted = {
            ...newData,
            plan: newData.planId, // Map planId to plan
            trialEndsAt: newData.trialEndsAt ? new Date(newData.trialEndsAt) : null,
            subscriptionEndsAt: null,
            createdAt: new Date(newData.createdAt),
            updatedAt: new Date(newData.updatedAt)
          };
          setSubscription(formatted);
          localStorage.setItem('dwp_subscription', JSON.stringify(formatted));
        }
      }
    } catch (error) {
      console.error('Failed to load subscription from backend, falling back to local:', error);
      // Fallback to local storage if backend is down
      const stored = localStorage.getItem('dwp_subscription');
      if (stored) {
        const parsed = JSON.parse(stored);
        parsed.trialEndsAt = parsed.trialEndsAt ? new Date(parsed.trialEndsAt) : null;
        parsed.subscriptionEndsAt = parsed.subscriptionEndsAt ? new Date(parsed.subscriptionEndsAt) : null;
        setSubscription(parsed);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7001';

  const isTrialActive = !!(subscription?.status === 'trial' &&
    subscription.trialEndsAt &&
    subscription.trialEndsAt > new Date())

  const daysRemaining = subscription?.trialEndsAt
    ? Math.max(0, Math.ceil((subscription.trialEndsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0

  const canUseFeature = (feature: string): boolean => {
    if (!subscription) return false
    if (subscription.status === 'expired') return false
    return true // During trial or active subscription, all features available
  }

  const switchMode = async (newMode: UserMode) => {
    if (!subscription) return

    try {
      const response = await fetch(`${API_URL}/subscription/${subscription.userId}/switch-mode`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: newMode })
      });

      if (response.ok) {
        const updated = await response.json();
        
        if (updated && updated.success === false) {
           throw new Error(updated.message || 'Storage switch failed');
        }
        
        // Check if we got a valid response (not the empty {} from before)
        if (updated && (updated.status || updated.success)) {
          const formatted = {
            ...updated,
            plan: updated.planId, // Map planId to plan
            trialEndsAt: updated.trialEndsAt ? new Date(updated.trialEndsAt) : null,
            subscriptionEndsAt: updated.currentPeriodEnd ? new Date(updated.currentPeriodEnd) : null,
          };
          setSubscription(formatted);
          localStorage.setItem('dwp_subscription', JSON.stringify(formatted));
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Storage switch failed');
      }
    } catch (error: any) {
      console.error('Failed to switch mode on backend:', error);
      throw error;
    }
  }

  const upgradePlan = async (plan: PlanType) => {
    if (!subscription) return

    const updated: UserSubscription = {
      ...subscription,
      plan,
      status: 'active',
      subscriptionEndsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
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
      });

      if (response.ok) {
        const updated = await response.json();
        const formatted = {
          ...updated,
          plan: updated.planId, // Map planId to plan
          trialEndsAt: updated.trialEndsAt ? new Date(updated.trialEndsAt) : null,
          subscriptionEndsAt: updated.currentPeriodEnd ? new Date(updated.currentPeriodEnd) : null,
        };
        setSubscription(formatted);
        localStorage.setItem('dwp_subscription', JSON.stringify(formatted));
      }
    } catch (error) {
      console.error('Failed to cancel subscription on backend:', error);
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
        cancelSubscription
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
