'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Wallet, Check, ArrowRight, AlertCircle, Coins, Loader2, ChevronDown, Settings, ArrowDownUp, Shield } from 'lucide-react'
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
  nano: 1,
  lite: 2,
  essential: 3,
  secure: 4,
  professional: 5,
  mega: 6,
  enterprise: 7,
  freedom_starter: 10,
  freedom_nano: 11,
  freedom_lite: 12,
  freedom_basic: 13,
  freedom_secure: 14,
  sovereign_pro: 15,
  sovereign_mega: 16,
  immortal_elite: 17
}

// Pricing in USDC (6 decimals)
const PRICING: Record<string, any> = {
  // Centralized
  starter: { monthly: '0.00', yearly: '0.00' },
  nano: { monthly: '0.03', yearly: '0.36' },
  lite: { monthly: '0.15', yearly: '1.80' },
  essential: { monthly: '0.45', yearly: '5.40' },
  secure: { monthly: '1.50', yearly: '18.00' },
  professional: { monthly: '2.99', yearly: '35.88' },
  mega: { monthly: '14.95', yearly: '179.40' },
  enterprise: { monthly: '29.90', yearly: '358.80' },
  
  // Decentralized
  freedom_starter: { monthly: '0.00', yearly: '0.00' },
  freedom_nano: { monthly: '0.19', yearly: '2.34' },
  freedom_lite: { monthly: '0.97', yearly: '11.70' },
  freedom_basic: { monthly: '2.92', yearly: '35.10' },
  freedom_secure: { monthly: '9.75', yearly: '117.00' },
  sovereign_pro: { monthly: '19.50', yearly: '234.00' },
  sovereign_mega: { monthly: '97.50', yearly: '1170.00' },
  immortal_elite: { monthly: '195.00', yearly: '2340.00' }
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

      // Notify backend to update database and send email
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7001'}/api/payment/process`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            walletAddress: walletAddress,
            method: 'CRYPTO',
            planId: plan,
            reference: subscribeTx.hash
          })
        })
      } catch (err) {
        console.error('Failed to notify backend:', err)
      }

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
    <div className="min-h-screen bg-[#0a0c10] flex flex-col items-center justify-center p-4 font-sans selection:bg-purple-500/30">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="bg-[#141414] border border-white/5 rounded-[2rem] p-6 w-full max-w-[420px] shadow-2xl relative overflow-hidden"
      >
        {/* Top Navbar */}
        <div className="flex items-center justify-between mb-8 relative z-10">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/10 text-slate-300 text-sm font-medium transition-colors border border-white/5">
            USDC <ChevronDown className="w-4 h-4 text-slate-500" suppressHydrationWarning />
          </button>
          
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/10 text-white text-sm font-medium transition-colors border border-white/5">
            <div className="w-5 h-5 bg-[#8247e5] rounded-full flex items-center justify-center shadow-inner">
              <svg viewBox="0 0 38.4 33.5" className="w-2.5 h-2.5" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M29.1 10.2L19.2 4.5l-9.9 5.7v11.4l9.9 5.7 9.9-5.7V10.2zM19.2 24.5l-6.8-4V12.7l6.8-4 6.8 4v7.8l-6.8 4z"/></svg>
            </div>
            Polygon <ChevronDown className="w-4 h-4 text-slate-500" suppressHydrationWarning />
          </button>

          <button className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors text-slate-400">
            <Settings className="w-4 h-4" suppressHydrationWarning />
          </button>
        </div>

        {/* Central Amount Display */}
        <div className="text-center mb-10 relative z-10">
          <div className="flex items-start justify-center text-white mb-2 tracking-tight">
            <span className="text-3xl mt-2 text-slate-500 font-medium mr-1 select-none">$</span>
            <span className="text-7xl font-bold bg-gradient-to-br from-white to-slate-300 bg-clip-text text-transparent">{amount.split('.')[0]}</span>
            <span className="text-3xl mt-2 text-slate-400 font-bold">.{amount.split('.')[1] || '00'}</span>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-sm text-slate-400 font-medium bg-black/20 w-fit mx-auto px-3 py-1 rounded-full border border-white/5">
            <ArrowDownUp className="w-3 h-3 text-slate-500" suppressHydrationWarning />
            {amount} USDC
          </div>
        </div>

        {/* Info Pills */}
        <div className="flex justify-center gap-2 mb-8 relative z-10">
          {['Plan: ' + plan.charAt(0).toUpperCase() + plan.slice(1), billing === 'yearly' ? 'Yearly' : 'Monthly'].map((lbl, i) => (
            <div key={i} className="px-5 py-2.5 bg-[#1c1c1e] hover:bg-[#242426] cursor-default rounded-full text-sm font-semibold text-slate-300 border border-white/5 transition-colors">
              {lbl}
            </div>
          ))}
        </div>

        {/* Connected Wallet Info */}
        <div className="flex items-center justify-between text-xs px-2 mb-4 text-slate-500 font-medium">
          <span>Connected Wallet</span>
          <span className="text-slate-400">
            {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Not Connected'}
          </span>
        </div>

        {/* Action Button */}
        {isPaid ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-green-500/10 border border-green-500/20 text-green-400 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,197,94,0.1)] relative z-10"
          >
            <Check className="w-5 h-5" suppressHydrationWarning />
            Payment Successful!
          </motion.div>
        ) : (
          <button
            onClick={handlePayment}
            disabled={isProcessing || !walletAddress}
            className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] active:scale-[0.98] text-white py-4 rounded-2xl font-semibold text-[15px] transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative z-10"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" suppressHydrationWarning />
                {billing === 'monthly' ? 'Approving & Subscribing...' : 'Processing Payment...'}
              </>
            ) : (
              'Continue with Polygon'
            )}
          </button>
        )}

        {/* Footer Brand */}
        <div className="mt-6 text-center text-[11px] text-slate-500 font-medium flex items-center justify-center gap-1.5 relative z-10">
          Powered by 
          <span className="text-slate-300 flex items-center gap-1">
            <Shield className="w-3 h-3 text-slate-400" suppressHydrationWarning /> 
            Always There Rails
          </span>
        </div>
      </motion.div>
      
      <Link
        href="/pricing"
        className="mt-8 text-slate-500 hover:text-white font-medium text-sm transition-colors py-2 px-4 rounded-full hover:bg-white/5"
      >
        Cancel and go back
      </Link>
    </div>
  )
}

export default function CryptoPaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <Loader2 className="w-8 h-8 animate-spin" suppressHydrationWarning />
      </div>
    }>
      <CryptoPaymentContent />
    </Suspense>
  )
}
