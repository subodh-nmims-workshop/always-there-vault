'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Crown, ArrowRight, X } from 'lucide-react'
import Link from 'next/link'
import { useSubscription } from '@/contexts/SubscriptionContext'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export function TrialExpiredModal() {
  const { subscription } = useSubscription()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // Check if trial has expired
    if (subscription?.status === 'trial' && subscription.trialEndsAt) {
      const isExpired = subscription.trialEndsAt < new Date()
      setShowModal(isExpired)
    } else if (subscription?.status === 'expired') {
      setShowModal(true)
    }
  }, [subscription])

  if (!showModal) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-start justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-gradient-to-br from-slate-900 to-slate-950 border-2 border-amber-500/30 rounded-3xl p-8 max-w-lg w-full relative shadow-[0_0_50px_rgba(245,158,11,0.3)] my-8 md:my-16"
        >
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl blur-xl opacity-20 -z-10" />

          {/* Icon */}
          <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(245,158,11,0.4)]">
            <AlertTriangle className="w-10 h-10 text-white" />
          </div>

          {/* Content */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-3">
              Trial Period Ended
            </h2>
            <p className="text-slate-300 text-lg mb-2">
              Your 30-day free trial has expired
            </p>
            <p className="text-slate-400 text-sm">
              Upgrade now to continue accessing your digital assets and premium features
            </p>
          </div>

          {/* Features Locked */}
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 mb-6">
            <p className="text-red-400 text-sm font-semibold mb-2">🔒 Features Currently Locked:</p>
            <ul className="text-slate-400 text-sm space-y-1">
              <li>• Asset creation and management</li>
              <li>• Beneficiary management</li>
              <li>• Heartbeat tracking</li>
              <li>• Asset sharing</li>
            </ul>
          </div>

          {/* Special Offer */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-5 h-5 text-yellow-400" />
              <p className="text-white font-semibold">Limited Time Offer</p>
            </div>
            <p className="text-slate-300 text-sm">
              Upgrade now and get <span className="text-green-400 font-bold">20% off</span> your first year!
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Link
              href="/pricing"
              className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-4 rounded-xl font-bold text-center transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
            >
              Upgrade Now
              <ArrowRight className="w-5 h-5" />
            </Link>

            <button
              onClick={() => {
                // Extend trial for $4.99
                toast.info('Feature Coming Soon', {
                  description: 'Trial extension feature coming soon! For now, please upgrade to a paid plan.'
                })
              }}
              className="w-full bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-xl font-semibold transition-all border border-white/10"
            >
              Extend Trial for $4.99
            </button>

            <button
              onClick={() => setShowModal(false)}
              className="w-full text-slate-400 hover:text-white text-sm font-medium transition-colors py-2"
            >
              I'll decide later
            </button>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors bg-white/5 p-2 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
