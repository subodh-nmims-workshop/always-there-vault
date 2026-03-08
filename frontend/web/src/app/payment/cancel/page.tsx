'use client'

import { motion } from 'framer-motion'
import { XCircle, ArrowLeft, HelpCircle } from 'lucide-react'
import Link from 'next/link'

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full"
      >
        {/* Cancel Card */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-12 text-center backdrop-blur-xl">
          {/* Cancel Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(245,158,11,0.4)]"
          >
            <XCircle className="w-12 h-12 text-white" />
          </motion.div>

          {/* Cancel Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-4xl font-bold text-white mb-4">
              Payment Cancelled
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              No charges were made to your account
            </p>
          </motion.div>

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 mb-8"
          >
            <div className="flex items-start gap-3 text-left">
              <HelpCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-white font-semibold mb-2">What Happened?</h3>
                <p className="text-slate-300 text-sm">
                  You cancelled the payment process. Your subscription remains unchanged, 
                  and you can try again anytime. If you encountered any issues, please contact our support team.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Still on Trial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 mb-8"
          >
            <h3 className="text-white font-semibold mb-2">Continue with Free Trial</h3>
            <p className="text-slate-300 text-sm">
              You can still use all features during your 30-day free trial. 
              Upgrade anytime to continue after the trial ends.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/pricing"
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Pricing
            </Link>
            <Link
              href="/dashboard"
              className="flex-1 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-all border border-white/10 flex items-center justify-center gap-2"
            >
              Go to Dashboard
            </Link>
          </motion.div>
        </div>

        {/* Support Link */}
        <p className="text-center text-slate-500 text-sm mt-6">
          Having trouble? <Link href="/support" className="text-blue-400 hover:text-blue-300">Contact Support</Link>
        </p>
      </motion.div>
    </div>
  )
}
