'use client'

import { X, Clock, Zap } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSubscription } from '@/contexts/SubscriptionContext'
import Link from 'next/link'

export function TrialBanner() {
  const [isDismissed, setIsDismissed] = useState(false)
  const { subscription, isTrialActive, daysRemaining } = useSubscription()

  if (!subscription || !isTrialActive || isDismissed) return null

  const isUrgent = daysRemaining <= 5

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`relative overflow-hidden ${
          isUrgent
            ? 'bg-gradient-to-r from-orange-600/20 to-red-600/20 border-orange-500/30'
            : 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/30'
        } border-b backdrop-blur-sm`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {isUrgent ? (
                <Clock className="w-5 h-5 text-orange-400 animate-pulse" />
              ) : (
                <Zap className="w-5 h-5 text-blue-400" />
              )}
              <div>
                <p className="text-white font-semibold text-sm">
                  {isUrgent ? '⚠️ Trial Ending Soon!' : '🎉 Free Trial Active'}
                </p>
                <p className="text-slate-300 text-xs">
                  {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} remaining • 
                  <span className="ml-1">
                    Current mode: <span className="font-semibold">{subscription.mode === 'centralized' ? 'Centralized' : 'Decentralized'}</span>
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/pricing"
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  isUrgent
                    ? 'bg-orange-600 hover:bg-orange-500 text-white'
                    : 'bg-blue-600 hover:bg-blue-500 text-white'
                }`}
              >
                {isUrgent ? 'Choose Plan Now' : 'View Plans'}
              </Link>
              <button
                onClick={() => setIsDismissed(true)}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
          <motion.div
            initial={{ width: '100%' }}
            animate={{ width: `${(daysRemaining / 30) * 100}%` }}
            className={`h-full ${
              isUrgent
                ? 'bg-gradient-to-r from-orange-500 to-red-500'
                : 'bg-gradient-to-r from-blue-500 to-purple-500'
            }`}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
