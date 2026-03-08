'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CreditCard, Calendar, TrendingUp, RefreshCw, XCircle,
  Check, AlertTriangle, ExternalLink, Download, Shield, Zap
} from 'lucide-react'
import { useSubscription } from '@/contexts/SubscriptionContext'
import { ALL_PLANS } from '@/types/subscription'
import { toast } from 'sonner'

export function SubscriptionManagement() {
  const { subscription, switchMode, cancelSubscription } = useSubscription()
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showChangeModal, setShowChangeModal] = useState(false)
  const [isCancelling, setIsCancelling] = useState(false)
  const [isSwitching, setIsSwitching] = useState(false)

  if (!subscription) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400">No subscription found</p>
      </div>
    )
  }

  const planDetails = ALL_PLANS[subscription.plan]
  const isTrialActive = subscription.status === 'trial' && subscription.trialEndsAt && subscription.trialEndsAt > new Date()
  const daysRemaining = subscription.trialEndsAt
    ? Math.max(0, Math.ceil((subscription.trialEndsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0

  const handleCancelSubscription = async () => {
    setIsCancelling(true)
    try {
      await cancelSubscription()
      setShowCancelModal(false)
      toast.success('Subscription cancelled successfully')
    } catch (error) {
      toast.error('Failed to cancel subscription')
    } finally {
      setIsCancelling(false)
    }
  }

  const handleSwitchMode = async () => {
    setIsSwitching(true)
    try {
      const newMode = subscription.mode === 'centralized' ? 'decentralized' : 'centralized'
      await switchMode(newMode)
      setShowChangeModal(false)
      toast.success(`Switched to ${newMode} mode successfully!`)
    } catch (error) {
      toast.error('Failed to switch mode')
    } finally {
      setIsSwitching(false)
    }
  }

  const openCustomerPortal = async () => {
    try {
      const userId = localStorage.getItem('dwp_wallet_address') || 'user_' + Date.now()
      const response = await fetch('http://localhost:7001/stripe/create-portal-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          returnUrl: window.location.href
        })
      })

      if (!response.ok) throw new Error('Failed to create portal session')

      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      console.error('Failed to open customer portal:', error)
      toast.error('Portal Error', {
        description: 'Failed to open billing portal. Please ensure backend is running.'
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Current Plan Card */}
      <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Current Plan</h2>
            <p className="text-slate-400">Manage your subscription and billing</p>
          </div>
          {isTrialActive && (
            <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-semibold">
              {daysRemaining} Days Trial Left
            </span>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Plan Details */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white capitalize">{subscription.plan}</h3>
                <p className="text-slate-400 text-sm capitalize">{subscription.mode} Mode</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Status</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${subscription.status === 'active'
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                    : subscription.status === 'trial'
                      ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      : 'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}>
                  {subscription.status}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Price</span>
                <span className="text-white font-semibold">
                  ${planDetails?.price || 0}/month
                </span>
              </div>

              {subscription.subscriptionEndsAt && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Renews</span>
                  <span className="text-white font-semibold">
                    {subscription.subscriptionEndsAt.toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <button
              onClick={() => window.location.href = '/pricing'}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
            >
              <TrendingUp className="w-5 h-5" />
              Upgrade Plan
            </button>

            <button
              onClick={openCustomerPortal}
              className="w-full bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all border border-white/10 flex items-center justify-center gap-2"
            >
              <CreditCard className="w-5 h-5" />
              Manage Billing
            </button>

            <button
              onClick={() => setShowChangeModal(true)}
              disabled={!subscription.canSwitchMode}
              className="w-full bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all border border-white/10 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className="w-5 h-5" />
              Switch Mode
            </button>

            <button
              onClick={() => setShowCancelModal(true)}
              className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 px-6 py-3 rounded-xl font-semibold transition-all border border-red-500/20 flex items-center justify-center gap-2"
            >
              <XCircle className="w-5 h-5" />
              Cancel Subscription
            </button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6">Plan Features</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {planDetails?.features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <span className="text-slate-300 text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Billing History</h3>
          <button className="text-blue-400 hover:text-blue-300 text-sm font-semibold flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download All
          </button>
        </div>

        <div className="space-y-3">
          {/* Placeholder for billing history */}
          <div className="text-center py-8 text-slate-400">
            <Calendar className="w-12 h-12 mx-auto mb-3 text-slate-600" />
            <p>No billing history yet</p>
            <p className="text-sm text-slate-500 mt-1">Invoices will appear here after your first payment</p>
          </div>
        </div>
      </div>

      {/* Cancel Modal */}
      <AnimatePresence>
        {showCancelModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowCancelModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full"
            >
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>

              <h3 className="text-2xl font-bold text-white text-center mb-4">
                Cancel Subscription?
              </h3>
              <p className="text-slate-400 text-center mb-6">
                Your subscription will remain active until the end of the billing period.
                After that, you'll lose access to premium features.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all border border-white/10"
                >
                  Keep Subscription
                </button>
                <button
                  onClick={handleCancelSubscription}
                  disabled={isCancelling}
                  className="flex-1 bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-50"
                >
                  {isCancelling ? 'Cancelling...' : 'Yes, Cancel'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Switch Mode Modal */}
      <AnimatePresence>
        {showChangeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowChangeModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full"
            >
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <RefreshCw className="w-8 h-8 text-blue-400" />
              </div>

              <h3 className="text-2xl font-bold text-white text-center mb-4">
                Switch to {subscription.mode === 'centralized' ? 'Decentralized' : 'Centralized'}?
              </h3>
              <p className="text-slate-400 text-center mb-6">
                Your data will be migrated to the new mode. This process is irreversible.
                Migration fee: $9.99
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowChangeModal(false)}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all border border-white/10"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSwitchMode}
                  disabled={isSwitching}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-50"
                >
                  {isSwitching ? 'Switching...' : 'Switch Mode'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
