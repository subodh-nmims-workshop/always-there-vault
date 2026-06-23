import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface TrialStatus {
  isExpired: boolean;
  daysRemaining: number;
  status: string;
}

interface Subscription {
  mode: string;
  plan: string;
  status: string;
  trialEndsAt: string;
  price: number;
  canSwitchMode: boolean;
}

export default function SubscriptionBanner() {
  const router = useRouter();
  const [trialStatus, setTrialStatus] = useState<TrialStatus | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscriptionStatus();
  }, []);

  const fetchSubscriptionStatus = async () => {
    const userId = localStorage.getItem('userId') || localStorage.getItem('dwp_wallet_address');
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const apiEndpoint = process.env.NEXT_PUBLIC_API_URL || 'https://always-there-protocol-api.onrender.com' /* 'http://localhost:7001' */
      const [trialRes, subRes] = await Promise.all([
        fetch(`${apiEndpoint}/subscription/${userId}/trial-status`),
        fetch(`${apiEndpoint}/subscription/${userId}`),
      ]);

      const trialData = trialRes.ok ? await trialRes.json() : null;
      const subData = subRes.ok ? await subRes.json() : null;

      if (trialData) setTrialStatus(trialData);
      if (subData) setSubscription(subData);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch subscription status:', error);
      setLoading(false);
    }
  };

  if (loading || !subscription) return null;

  // Trial Active
  if (subscription.status === 'trial' && trialStatus && !trialStatus.isExpired) {
    const isWarning = trialStatus.daysRemaining <= 5;

    return (
      <div
        className={`${
          isWarning ? 'bg-yellow-600' : 'bg-blue-600'
        } text-white px-6 py-3 flex items-center justify-between`}
      >
        <div className="flex items-center space-x-4">
          <span className="text-2xl">{isWarning ? '⚠️' : '🎉'}</span>
          <div>
            <p className="font-semibold">
              {isWarning ? 'Trial Ending Soon!' : 'Free Trial Active'}
            </p>
            <p className="text-sm">
              {trialStatus.daysRemaining} days remaining • Current mode:{' '}
              {subscription.mode === 'centralized' ? '🏢 Centralized' : '⛓️ Decentralized'}
            </p>
          </div>
        </div>
        <button
          onClick={() => router.push('/pricing')}
          className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all"
        >
          View Plans
        </button>
      </div>
    );
  }

  // Trial Expired
  if (subscription.status === 'expired') {
    return (
      <div className="bg-red-600 text-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-2xl">🔒</span>
          <div>
            <p className="font-semibold">Trial Ended - Data Locked</p>
            <p className="text-sm">Subscribe to continue accessing your data</p>
          </div>
        </div>
        <button
          onClick={() => router.push('/pricing')}
          className="bg-white text-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all"
        >
          Choose Plan
        </button>
      </div>
    );
  }

  // Active Subscription
  if (subscription.status === 'active') {
    return (
      <div className="bg-green-600 text-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-2xl">✅</span>
          <div>
            <p className="font-semibold">
              {subscription.mode === 'centralized' ? '🏢' : '⛓️'} {subscription.plan} Plan Active
            </p>
            <p className="text-sm">${subscription.price}/month</p>
          </div>
        </div>
        <button
          onClick={() => router.push('/subscription')}
          className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all"
        >
          Manage
        </button>
      </div>
    );
  }

  return null;
}
