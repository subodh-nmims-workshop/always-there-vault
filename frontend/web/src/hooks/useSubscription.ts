import { useState, useEffect } from 'react';

interface Subscription {
  mode: string;
  plan: string;
  status: string;
  trialEndsAt: string;
  currentPeriodEnd: string;
  price: number;
  canSwitchMode: boolean;
  features: string[];
  limits: {
    assets: number;
    beneficiaries: number;
    storageGB: number;
  };
}

interface TrialStatus {
  isExpired: boolean;
  daysRemaining: number;
  status: string;
}

interface Limits {
  canAddAsset: boolean;
  canAddBeneficiary: boolean;
  canUploadFile: boolean;
  usage: {
    assets: string;
    beneficiaries: string;
    storageGB: string;
  };
}

export function useSubscription(userId: string | null) {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [trialStatus, setTrialStatus] = useState<TrialStatus | null>(null);
  const [limits, setLimits] = useState<Limits | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE = 'http://localhost:7001'; // Secondary backend (NestJS)

  useEffect(() => {
    if (userId) {
      fetchSubscription();
    }
  }, [userId]);

  const fetchSubscription = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const [subRes, trialRes, limitsRes] = await Promise.all([
        fetch(`${API_BASE}/subscription/${userId}`),
        fetch(`${API_BASE}/subscription/${userId}/trial-status`),
        fetch(`${API_BASE}/subscription/${userId}/limits`),
      ]);

      if (!subRes.ok) throw new Error('Failed to fetch subscription');

      const subData = await subRes.json();
      const trialData = await trialRes.json();
      const limitsData = await limitsRes.json();

      setSubscription(subData);
      setTrialStatus(trialData);
      setLimits(limitsData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch subscription');
    } finally {
      setLoading(false);
    }
  };

  const startTrial = async (mode: 'centralized' | 'decentralized') => {
    if (!userId) return;

    try {
      const response = await fetch(`${API_BASE}/subscription/trial`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, mode }),
      });

      if (!response.ok) throw new Error('Failed to start trial');

      await fetchSubscription();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start trial');
      return false;
    }
  };

  const createCheckoutSession = async (planType: string) => {
    if (!userId) return null;

    try {
      const response = await fetch(`${API_BASE}/subscription/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          planType,
          successUrl: `${window.location.origin}/dashboard?payment=success`,
          cancelUrl: `${window.location.origin}/pricing?payment=cancelled`,
        }),
      });

      if (!response.ok) throw new Error('Failed to create checkout session');

      const data = await response.json();
      return data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create checkout');
      return null;
    }
  };

  const switchMode = async (newMode: 'centralized' | 'decentralized') => {
    if (!userId) return false;

    try {
      const response = await fetch(`${API_BASE}/subscription/${userId}/switch-mode`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: newMode }),
      });

      if (!response.ok) throw new Error('Failed to switch mode');

      await fetchSubscription();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to switch mode');
      return false;
    }
  };

  const cancelSubscription = async (reason?: string) => {
    if (!userId) return false;

    try {
      const response = await fetch(`${API_BASE}/subscription/${userId}/cancel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason }),
      });

      if (!response.ok) throw new Error('Failed to cancel subscription');

      await fetchSubscription();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to cancel subscription');
      return false;
    }
  };

  const checkLimit = (type: 'asset' | 'beneficiary' | 'storage'): boolean => {
    if (!limits) return false;

    switch (type) {
      case 'asset':
        return limits.canAddAsset;
      case 'beneficiary':
        return limits.canAddBeneficiary;
      case 'storage':
        return limits.canUploadFile;
      default:
        return false;
    }
  };

  const isActive = subscription?.status === 'active' || subscription?.status === 'trial';
  const isExpired = subscription?.status === 'expired';
  const isTrial = subscription?.status === 'trial';

  return {
    subscription,
    trialStatus,
    limits,
    loading,
    error,
    isActive,
    isExpired,
    isTrial,
    startTrial,
    createCheckoutSession,
    switchMode,
    cancelSubscription,
    checkLimit,
    refresh: fetchSubscription,
  };
}
