'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Wallet, Copy, Check, ArrowRight, AlertCircle, Coins, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

export const dynamic = 'force-dynamic'

function CryptoPaymentContent() {
  const searchParams = useSearchParams()
  const plan = searchParams?.get('plan') || 'professional'
  const billing = searchParams?.get('billing') || 'monthly'

  const [paymentAddress] = useState('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb')
  const [copied, setCopied] = useState(false)
  const [isPaid, setIsPaid] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)

  // Crypto pricing (example)
  const pricing = {
    starter: { monthly: 0, yearly: 0 },
    professional: { monthly: 0.01, yearly: 0.1 },
    enterprise: { monthly: 0.05, yearly: 0.5 }
  }

  const amount = pricing[plan as keyof typeof pricing]?.[billing as 'monthly' | 'yearly'] || 0.01

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(paymentAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const verifyPayment = async () => {
    setIsVerifying(true)

    // Simulate payment verification
    setTimeout(() => {
      setIsVerifying(false)
      setIsPaid(true)

      // Redirect to success page after 2 seconds
      setTimeout(() => {
        window.location.href = '/payment/success?crypto=true'
      }, 2000)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full"
      >
        {/* Payment Card */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(168,85,247,0.4)]">
              <Coins className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Crypto Payment
            </h1>
            <p className="text-slate-400">
              Pay with Ethereum for {plan} plan ({billing})
            </p>
          </div>

          {/* Amount */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
            <div className="text-center">
              <p className="text-slate-400 text-sm mb-2">Amount to Pay</p>
              <p className="text-4xl font-bold text-white mb-1">
                {amount} ETH
              </p>
              <p className="text-slate-500 text-sm">
                ≈ ${(amount * 2000).toFixed(2)} USD
              </p>
            </div>
          </div>

          {/* Payment Address */}
          <div className="mb-6">
            <label className="block text-slate-400 text-sm mb-2">
              Send ETH to this address:
            </label>
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 flex items-center gap-3">
              <Wallet className="w-5 h-5 text-slate-500 flex-shrink-0" />
              <input
                type="text"
                value={paymentAddress}
                readOnly
                className="flex-1 bg-transparent text-white font-mono text-sm outline-none"
              />
              <button
                onClick={copyAddress}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm font-semibold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-400 text-sm font-semibold">Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* QR Code Placeholder */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-6">
            <div className="w-48 h-48 bg-white rounded-xl mx-auto flex items-center justify-center">
              <p className="text-slate-900 text-sm font-semibold">QR Code</p>
            </div>
            <p className="text-center text-slate-400 text-sm mt-4">
              Scan with your crypto wallet
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-slate-300">
                <p className="font-semibold text-blue-300 mb-2">Payment Instructions:</p>
                <ol className="space-y-1 list-decimal list-inside">
                  <li>Send exactly {amount} ETH to the address above</li>
                  <li>Wait for blockchain confirmation (1-3 minutes)</li>
                  <li>Click "Verify Payment" to activate your subscription</li>
                  <li>Do not close this page until payment is verified</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Verify Button */}
          {!isPaid && (
            <button
              onClick={verifyPayment}
              disabled={isVerifying}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
            >
              {isVerifying ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Verifying Payment...
                </>
              ) : (
                <>
                  Verify Payment
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          )}

          {/* Success Message */}
          {isPaid && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4 mb-4"
            >
              <div className="flex items-center gap-3 text-green-400">
                <Check className="w-6 h-6" />
                <div>
                  <p className="font-semibold">Payment Verified!</p>
                  <p className="text-sm text-green-300">Redirecting to dashboard...</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Cancel Link */}
          <Link
            href="/pricing"
            className="block text-center text-slate-400 hover:text-white transition-colors text-sm"
          >
            Cancel and go back
          </Link>
        </div>

        {/* Network Info */}
        <div className="mt-6 text-center">
          <p className="text-slate-500 text-sm">
            Network: <span className="text-slate-400 font-semibold">Ethereum Mainnet</span>
          </p>
          <p className="text-slate-500 text-xs mt-2">
            Make sure you're sending from the correct network
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default function CryptoPaymentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-950 text-white"><Loader2 className="w-8 h-8 animate-spin" /></div>}>
      <CryptoPaymentContent />
    </Suspense>
  )
}
