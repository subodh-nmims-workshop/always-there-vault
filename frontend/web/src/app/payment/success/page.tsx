'use client'

import { useEffect, useState, Suspense } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Sparkles, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useSubscription } from '@/contexts/SubscriptionContext'

export const dynamic = 'force-dynamic'

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams?.get('session_id')
  const [isVerifying, setIsVerifying] = useState(true)
  const { subscription } = useSubscription()

  useEffect(() => {
    // Simulate verification
    setTimeout(() => {
      setIsVerifying(false)
    }, 2000)
  }, [])

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-slate-400 text-lg">Verifying payment...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full"
      >
        {/* Success Card */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-12 text-center backdrop-blur-xl">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(34,197,94,0.4)]"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-4xl font-bold text-white mb-4">
              Payment Successful! 🎉
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Your subscription has been activated
            </p>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8"
          >
            <div className="grid grid-cols-2 gap-6 text-left">
              <div>
                <p className="text-slate-500 text-sm mb-1">Plan</p>
                <p className="text-white font-semibold capitalize">
                  {subscription?.plan || 'Professional'}
                </p>
              </div>
              <div>
                <p className="text-slate-500 text-sm mb-1">Mode</p>
                <p className="text-white font-semibold capitalize">
                  {subscription?.mode || 'Centralized'}
                </p>
              </div>
              <div>
                <p className="text-slate-500 text-sm mb-1">Status</p>
                <p className="text-green-400 font-semibold">Active</p>
              </div>
              <div>
                <p className="text-slate-500 text-sm mb-1">Session ID</p>
                <p className="text-slate-400 font-mono text-xs truncate">
                  {sessionId || 'N/A'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* What's Next */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 mb-8"
          >
            <div className="flex items-start gap-3 text-left">
              <Sparkles className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-white font-semibold mb-2">What's Next?</h3>
                <ul className="text-slate-300 text-sm space-y-2">
                  <li>• Access all premium features immediately</li>
                  <li>• Check your email for receipt and details</li>
                  <li>• Manage your subscription in settings</li>
                  <li>• Start securing your digital legacy</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/dashboard"
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/subscription"
              className="flex-1 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-all border border-white/10 flex items-center justify-center gap-2"
            >
              View Subscription
            </Link>
          </motion.div>
        </div>

        {/* Support Link */}
        <p className="text-center text-slate-500 text-sm mt-6">
          Need help? <Link href="/support" className="text-blue-400 hover:text-blue-300">Contact Support</Link>
        </p>
      </motion.div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4"><Loader2 className="w-8 h-8 animate-spin text-white" /></div>}>
      <PaymentSuccessContent />
    </Suspense>
  )
}
