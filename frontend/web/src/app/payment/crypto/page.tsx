'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Wallet, Check, ArrowRight, AlertCircle, Coins, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ethers } from 'ethers'
import { toast } from 'sonner'

export const dynamic = 'force-dynamic'

// Contract addresses (update after deployment)
const SUBSCRIPTION_CONTRACT = process.env.NEXT_PUBLIC_SUBSCRIPTION_CONTRACT || ''
const USDC_ADDRESS = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174' // Polygon USDC

// Plan mapping
const PLAN_IDS: Record<string, number> = {
  starter: 0,
  guardian: 1,
  legacy: 2,
  immortal: 3
}

// Pricing in USDC (6 decimals)
const PRICING = {
  starter: { monthly: '9.99', yearly: '99' },
  guardian: { monthly: '24.99', yearly: '249' },
  legacy: { monthly: '49.99', yearly: '499' },
  immortal: { monthly: '99.99', yearly: '999' }
}

function CryptoPaymentContent() {
  const searchParams = useSearchParams()
  const plan = searchParams?.get('plan') || 'starter'
  const billing = searchParams?.get('billing') || 'monthly'

  const [walletAddress, setWalletAddress] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isPaid, setIsPaid] = useState(false)

  const amount = PRICING[plan as keyof typeof PRICING]?.[billing as 'monthly' | 'yearly'] || '9.99'
  const planId = PLAN_IDS[plan] || 0

  useEffect(() => {
    const address = localStorage.getItem('dwp_wallet_address')
    if (address) {
      setWalletAddress(address)
    }
  }, [])

  const handlePayment = async () => {
    if (!walletAddress) {
      toast.error('Wallet not connected')
      return
    }

    if (!SUBSCRIPTION_CONTRACT) {
      toast.error('Contract not deployed yet', {
        description: 'Please deploy contracts first'
      })
      return
    }

    setIsProcessing(true)

    try {
      // Connect to wallet
      if (!window.ethereum) {
        throw new Error('Please install MetaMask')
      }

      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()

      // USDC Contract ABI (minimal)
      const usdcAbi = [
        'function approve(address spender, uint256 amount) returns (bool)',
        'function allowance(address owner, address spender) view returns (uint256)'
      ]

      // Subscription Contract ABI (minimal)
      const subscriptionAbi = [
        'function subscribeMonthly(uint8 plan, address token)',
        'function subscribeYearly(uint8 plan, address token)'
      ]

      const usdcContract = new ethers.Contract(USDC_ADDRESS, usdcAbi, signer)
      const subscriptionContract = new ethers.Contract(SUBSCRIPTION_CONTRACT, subscriptionAbi, signer)

      // Parse amount (USDC has 6 decimals)
      const amountWei = ethers.parseUnits(amount, 6)

      // Step 1: Approve USDC
      toast.info('Approving USDC...', { description: 'Please confirm in your wallet' })
      const approveTx = await usdcContract.approve(SUBSCRIPTION_CONTRACT, amountWei)
      await approveTx.wait()

      // Step 2: Subscribe
      toast.info('Processing subscription...', { description: 'Please confirm in your wallet' })
      const subscribeTx = billing === 'yearly'
        ? await subscriptionContract.subscribeYearly(planId, USDC_ADDRESS)
        : await subscriptionContract.subscribeMonthly(planId, USDC_ADDRESS)

      await subscribeTx.wait()

      setIsPaid(true)
      toast.success('Payment successful!', {
        description: 'Your subscription is now active'
      })

      // Redirect after 2 seconds
      setTimeout(() => {
        window.location.href = '/payment/success?crypto=true'
      }, 2000)

    } catch (error: any) {
      console.error('Payment error:', error)
      toast.error('Payment failed', {
        description: error.message || 'Please try again'
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full"
      >
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
              Pay with USDC for {plan} plan ({billing})
            </p>
          </div>

          {/* Amount */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
            <div className="text-center">
              <p className="text-slate-400 text-sm mb-2">Amount to Pay</p>
              <p className="text-4xl font-bold text-white mb-1">
                ${amount}
              </p>
              <p className="text-slate-500 text-sm">
                USDC on Polygon Network
              </p>
            </div>
          </div>

          {/* Wallet Info */}
          {walletAddress && (
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 mb-6 flex items-center gap-3">
              <Wallet className="w-5 h-5 text-slate-500" />
              <div className="flex-1">
                <p className="text-slate-400 text-xs mb-1">Connected Wallet</p>
                <p className="text-white font-mono text-sm">
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </p>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-slate-300">
                <p className="font-semibold text-blue-300 mb-2">Payment Instructions:</p>
                <ol className="space-y-1 list-decimal list-inside">
                  <li>Make sure you have ${amount} USDC in your wallet</li>
                  <li>You'll need to approve 2 transactions</li>
                  <li>First: Approve USDC spending</li>
                  <li>Second: Complete subscription payment</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Pay Button */}
          {!isPaid && (
            <button
              onClick={handlePayment}
              disabled={isProcessing || !walletAddress}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Pay ${amount} USDC
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
                  <p className="font-semibold">Payment Successful!</p>
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
            Network: <span className="text-slate-400 font-semibold">Polygon Mainnet</span>
          </p>
          <p className="text-slate-500 text-xs mt-2">
            Make sure you're connected to Polygon network
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default function CryptoPaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    }>
      <CryptoPaymentContent />
    </Suspense>
  )
}
