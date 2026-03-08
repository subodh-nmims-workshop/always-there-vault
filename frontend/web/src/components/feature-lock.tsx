'use client'

import { ReactNode } from 'react'
import { Lock, Crown } from 'lucide-react'
import Link from 'next/link'
import { useSubscription } from '@/contexts/SubscriptionContext'

interface FeatureLockProps {
  children: ReactNode
  feature: string
  showUpgradePrompt?: boolean
}

export function FeatureLock({ children, feature, showUpgradePrompt = true }: FeatureLockProps) {
  const { subscription, canUseFeature } = useSubscription()

  const isLocked = !canUseFeature(feature)

  if (!isLocked) {
    return <>{children}</>
  }

  return (
    <div className="relative">
      {/* Blurred Content */}
      <div className="pointer-events-none select-none blur-sm opacity-50">
        {children}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm rounded-2xl">
        <div className="text-center p-8 max-w-md">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(245,158,11,0.4)]">
            <Lock className="w-8 h-8 text-white" />
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">
            Feature Locked
          </h3>
          <p className="text-slate-400 mb-6">
            {subscription?.status === 'trial' 
              ? 'Your trial has expired. Upgrade to continue using this feature.'
              : 'This feature requires an active subscription.'
            }
          </p>

          {showUpgradePrompt && (
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/20"
            >
              <Crown className="w-5 h-5" />
              Upgrade Now
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

// Hook to check feature access
export function useFeatureAccess(feature: string): boolean {
  const { canUseFeature } = useSubscription()
  return canUseFeature(feature)
}

// HOC to wrap components with feature lock
export function withFeatureLock<P extends object>(
  Component: React.ComponentType<P>,
  feature: string
) {
  return function FeatureLockedComponent(props: P) {
    return (
      <FeatureLock feature={feature}>
        <Component {...props} />
      </FeatureLock>
    )
  }
}
