'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Wallet, Check, ArrowRight, AlertCircle, Coins, Loader2, ChevronDown, Settings, ArrowDownUp, Shield, CreditCard, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ethers } from 'ethers'
import { toast } from 'sonner'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { API_URL } from '@/lib/api-config'

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
  starter: { monthly: '0.00', quarterly: '0.00', yearly: '0.00' },
  nano: { monthly: '1.00', quarterly: '3.00', yearly: '5.00' },
  lite: { monthly: '1.99', quarterly: '4.99', yearly: '9.99' },
  essential: { monthly: '3.99', quarterly: '9.99', yearly: '19.99' },
  secure: { monthly: '6.99', quarterly: '16.99', yearly: '39.99' },
  professional: { monthly: '12.99', quarterly: '29.99', yearly: '79.99' },
  mega: { monthly: '19.99', quarterly: '49.99', yearly: '149.99' },
  enterprise: { monthly: '34.99', quarterly: '89.99', yearly: '299.99' },
  
  // Decentralized
  freedom_starter: { monthly: '0.00', quarterly: '0.00', yearly: '0.00' },
  freedom_nano: { monthly: '4.99', quarterly: '12.99', yearly: '49.99' },
  freedom_lite: { monthly: '9.99', quarterly: '29.99', yearly: '99.99' },
  freedom_basic: { monthly: '19.99', quarterly: '49.99', yearly: '199.99' },
  freedom_secure: { monthly: '12.99', quarterly: '34.99', yearly: '99.99' },
  sovereign_pro: { monthly: '19.99', quarterly: '49.99', yearly: '149.99' },
  sovereign_mega: { monthly: '49.99', quarterly: '129.99', yearly: '499.99' },
  immortal_elite: { monthly: '89.99', quarterly: '199.99', yearly: '899.99' }
}

const detectCountry = () => {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const tzLower = tz.toLowerCase();
    if (tzLower.includes('calcutta') || tzLower.includes('kolkata') || tzLower.includes('india') || tzLower.includes('asia/kolkata')) return 'IN';
    if (tzLower.includes('port_of_spain') || tzLower.includes('trinidad') || tzLower.includes('tobago') || tzLower.includes('america/port_of_spain')) return 'TT';
    if (tzLower.includes('london') || tzLower.includes('europe/london')) return 'GB';
    if (tzLower.includes('toronto') || tzLower.includes('vancouver') || tzLower.includes('montreal') || tzLower.includes('america/toronto')) return 'CA';
    if (tzLower.includes('sydney') || tzLower.includes('melbourne') || tzLower.includes('australia')) return 'AU';
  } catch (e) {}
  return 'US';
}

function CryptoPaymentContent() {
  const searchParams = useSearchParams()
  const plan = searchParams?.get('plan') || 'starter'
  const billing = searchParams?.get('billing') || 'monthly'

  const [walletAddress, setWalletAddress] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isPaid, setIsPaid] = useState(false)
  const [selectedOption, setSelectedOption] = useState<'paypal_wallet' | 'card' | 'crypto'>('paypal_wallet')
  const [orderId, setOrderId] = useState<string>('')
  const [billingCountry, setBillingCountry] = useState<string>('US')
  const [nonce, setNonce] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const nonceMeta = document.querySelector('meta[name="csp-nonce"]')
      if (nonceMeta) {
        const val = nonceMeta.getAttribute('content')
        if (val) setNonce(val)
      }
    }
  }, [])

  const amount = PRICING[plan as keyof typeof PRICING]?.[billing as 'monthly' | 'quarterly' | 'yearly'] || '0.00'
  const planId = PLAN_IDS[plan] || 0

  useEffect(() => {
    setOrderId('at_fgtechllp_' + Math.floor(Math.random() * 90000000 + 10000000))
  }, [])

  useEffect(() => {
    const detected = detectCountry()
    if (detected === 'IN') {
      setBillingCountry('US')
    } else {
      setBillingCountry(detected)
    }
  }, [])

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
        await fetch(`${API_URL}/api/payment/process`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            walletAddress: walletAddress,
            method: 'CRYPTO',
            planId: plan,
            billingCycle: billing.toUpperCase(),
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
      let cleanMessage = 'Please try again or contact support.'
      
      const errMsg = (error?.message || '').toLowerCase()
      const errReason = (error?.reason || '').toLowerCase()
      
      if (
        error?.code === 'ACTION_REJECTED' || 
        error?.code === 4001 || 
        errMsg.includes('rejected') || 
        errMsg.includes('denied') || 
        errMsg.includes('user rejected')
      ) {
        cleanMessage = 'Transaction Cancelled: You rejected the request in your wallet.'
      } else if (errMsg.includes('insufficient') || errReason.includes('insufficient')) {
        cleanMessage = 'Insufficient Funds: You do not have enough MATIC/USDC to cover the gas fee or plan price.'
      } else if (errMsg.includes('network') || errMsg.includes('rpc') || errMsg.includes('failed to fetch')) {
        cleanMessage = 'Network Error: Failed to connect to the blockchain. Please check your internet.'
      } else if (error?.reason) {
        cleanMessage = `Failed: ${error.reason}`
      } else if (error?.message && error.message.length < 120) {
        cleanMessage = error.message
      } else {
        cleanMessage = 'Wallet transaction failed. Please confirm details and try again.'
      }

      toast.error('Payment failed', {
        description: cleanMessage
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handlePayPalSuccess = async (orderId: string) => {
    setIsProcessing(true)
    try {
      const response = await fetch(`${API_URL}/api/payment/process`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          walletAddress: walletAddress || 'guest-paypal',
          method: 'PAYPAL',
          planId: plan,
          billingCycle: billing.toUpperCase(),
          reference: orderId
        })
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Verification failed')
      }

      setIsPaid(true)
      toast.success('Payment verified!', {
        description: 'Your premium vault features have been unlocked successfully!'
      })

      setTimeout(() => {
        window.location.href = '/payment/success?method=paypal'
      }, 2000)
    } catch (err: any) {
      console.error('PayPal Verification Error:', err)
      toast.error('Payment verification failed', {
        description: err.message || 'Please contact support.'
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0c10] flex flex-col items-center justify-center p-4 font-sans selection:bg-purple-500/30">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="bg-white dark:bg-[#141414] border border-slate-200 dark:border-white/5 rounded-[2rem] w-full shadow-2xl relative transition-all duration-300 max-w-[1080px] overflow-hidden flex flex-col md:flex-row"
      >
        {/* Left Column: Invoice/Summary Side */}
        <div className="w-full md:w-[320px] bg-gradient-to-br from-[#1e40af] to-[#1e3a8a] p-6 text-white flex flex-col justify-between rounded-t-[2rem] md:rounded-l-[2rem] md:rounded-tr-none min-h-[420px]">
          <div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-semibold text-blue-200 uppercase tracking-widest">AlwaysThere Vault</span>
              <span className="text-[10px] bg-blue-500/30 px-2.5 py-0.5 rounded-full text-blue-100 uppercase font-black tracking-wider border border-blue-400/20">Secure</span>
            </div>
            
            <h3 className="text-xl font-bold mb-2">AlwaysThere Vault</h3>
            <p className="text-[11px] text-blue-200/60 font-mono tracking-tight mb-6 select-all">Order ID: {orderId}</p>

            <div className="space-y-3 border-t border-blue-400/20 pt-4">
              <div className="flex justify-between text-xs text-blue-100">
                <span>Selected Plan</span>
                <span className="font-semibold uppercase">{plan}</span>
              </div>
              <div className="flex justify-between text-xs text-blue-100">
                <span>Billing Interval</span>
                <span className="font-semibold uppercase">{billing}</span>
              </div>
              <div className="flex justify-between text-xs text-blue-100">
                <span>Order Amount</span>
                <span>${amount} USD</span>
              </div>
              <div className="flex justify-between text-xs text-blue-100">
                <span>Transaction Fee</span>
                <span>$0.00 USD</span>
              </div>
            </div>
          </div>

          <div className="border-t border-blue-400/20 pt-6 mt-6">
            <div className="flex justify-between items-end mb-4">
              <span className="text-xs text-blue-200">Total Payable</span>
              <span className="text-2xl font-black">${amount} USD</span>
            </div>
            <div className="flex justify-between items-center text-[10px] text-blue-200/60 pt-2 border-t border-blue-400/10">
              <span>Secured by AlwaysThere Rails</span>
              <span className="font-bold tracking-wider">PCI-DSS</span>
            </div>
          </div>
        </div>

        {/* Right Column: Payment Options Side */}
        <div className="flex-1 p-6 flex flex-col justify-between bg-slate-50 dark:bg-[#121214] rounded-b-[2rem] md:rounded-r-[2rem] md:rounded-bl-none min-h-[420px]">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[11px] font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase">CHOOSE A PAYMENT OPTION</h3>
              <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-white/5">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Location:</span>
                <select
                  value={billingCountry}
                  onChange={(e) => setBillingCountry(e.target.value)}
                  className="bg-transparent border-none text-[10px] font-bold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer pr-1"
                >
                  <option value="US" className="dark:bg-[#121214]">🇺🇸 US</option>
                  <option value="IN" className="dark:bg-[#121214]">🇮🇳 IN</option>
                  <option value="GB" className="dark:bg-[#121214]">🇬🇧 UK</option>
                  <option value="CA" className="dark:bg-[#121214]">🇨🇦 CA</option>
                  <option value="AU" className="dark:bg-[#121214]">🇦🇺 AU</option>
                  <option value="DE" className="dark:bg-[#121214]">🇩🇪 DE</option>
                  <option value="SG" className="dark:bg-[#121214]">🇸🇬 SG</option>
                </select>
              </div>
            </div>
            
            {isPaid ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full bg-green-500/10 border border-green-500/20 text-green-400 py-8 rounded-2xl font-bold flex flex-col items-center justify-center gap-3 shadow-[0_0_20px_rgba(34,197,94,0.1)] my-auto"
              >
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-green-400" suppressHydrationWarning />
                </div>
                <div className="text-center">
                  <h4 className="text-base font-bold text-slate-800 dark:text-white">Payment Successful!</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Unlocking premium vault features...</p>
                </div>
              </motion.div>
            ) : (
              <PayPalScriptProvider key={billingCountry} options={{ 
                  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
                  currency: "USD",
                  intent: "capture",
                  locale: "en_US",
                  "buyer-country": billingCountry,
                  ...(nonce ? { "data-csp-nonce": nonce } : {})
              }}>
                <div className="space-y-3">
                {/* Option 1: PayPal */}
                <div 
                  onMouseDown={() => setSelectedOption('paypal_wallet')}
                  className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    selectedOption === 'paypal_wallet' 
                      ? 'border-purple-500 bg-purple-50/50 dark:bg-purple-500/5 shadow-[0_0_15px_rgba(124,58,237,0.05)]' 
                      : 'border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.02] hover:bg-slate-100/50 dark:hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Wallet className="w-5 h-5 text-blue-400" />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">PayPal Checkout</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">Pay using your PayPal balance or registered cards</span>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${selectedOption === 'paypal_wallet' ? 'rotate-90' : ''}`} />
                  </div>

                  {selectedOption === 'paypal_wallet' && (
                    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/5" onClick={(e) => e.stopPropagation()}>
                      <div className="bg-slate-100 dark:bg-black/20 p-2 sm:p-4 rounded-xl border border-slate-200 dark:border-white/5 shadow-inner">
                            <PayPalButtons
                                key={`paypal_${billingCountry}`}
                                fundingSource="paypal"
                                style={{ layout: "vertical", color: "gold", shape: "rect", height: 40 }}
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        intent: "CAPTURE",
                                        purchase_units: [{
                                            description: `AlwaysThere - ${plan.charAt(0).toUpperCase() + plan.slice(1)} Vault Subscription`,
                                            amount: { currency_code: "USD", value: amount }
                                        }],
                                        payer: {
                                            address: {
                                                country_code: billingCountry
                                            }
                                        }
                                    });
                                }}
                                onApprove={async (data, actions) => {
                                    if (!actions.order) return;
                                    const details = await actions.order.capture();
                                    handlePayPalSuccess(data.orderID);
                                }}
                                onError={(err) => {
                                    console.error("PayPal checkout error:", err);
                                    toast.error("PayPal payment failed.");
                                }}
                            />
                      </div>
                    </div>
                  )}
                </div>

                {/* Option 2: Debit or Credit Card */}
                <div 
                  onMouseDown={() => setSelectedOption('card')}
                  className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    selectedOption === 'card' 
                      ? 'border-purple-500 bg-purple-50/50 dark:bg-purple-500/5 shadow-[0_0_15px_rgba(124,58,237,0.05)]' 
                      : 'border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.02] hover:bg-slate-100/50 dark:hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-purple-400" />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Debit or Credit Card</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">Pay securely without logging into PayPal</span>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${selectedOption === 'card' ? 'rotate-90' : ''}`} />
                  </div>

                  {selectedOption === 'card' && (
                    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/5" onClick={(e) => e.stopPropagation()}>
                      <div className="bg-slate-100 dark:bg-black/20 p-2 sm:p-4 rounded-xl border border-slate-200 dark:border-white/5 shadow-inner">
                            <PayPalButtons
                                key={`card_${billingCountry}`}
                                fundingSource="card"
                                style={{ layout: "vertical", color: "black", shape: "rect", height: 40 }}
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        intent: "CAPTURE",
                                        purchase_units: [{
                                            description: `AlwaysThere - ${plan.charAt(0).toUpperCase() + plan.slice(1)} Vault Subscription`,
                                            amount: { currency_code: "USD", value: amount }
                                        }],
                                        payer: {
                                            address: {
                                                country_code: billingCountry
                                            }
                                        }
                                    });
                                }}
                                onApprove={async (data, actions) => {
                                    if (!actions.order) return;
                                    const details = await actions.order.capture();
                                    handlePayPalSuccess(data.orderID);
                                }}
                                onError={(err) => {
                                    console.error("Card checkout error:", err);
                                    toast.error("Card payment failed.");
                                }}
                            />
                      </div>
                    </div>
                  )}
                </div>

                {/* Option 3: Crypto USDC */}
                <div 
                  onMouseDown={() => setSelectedOption('crypto')}
                  className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    selectedOption === 'crypto' 
                      ? 'border-purple-500 bg-purple-50/50 dark:bg-purple-500/5 shadow-[0_0_15px_rgba(124,58,237,0.05)]' 
                      : 'border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.02] hover:bg-slate-100/50 dark:hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Coins className="w-5 h-5 text-yellow-500" />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">USDC Stablecoin</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">Polygon Chain USDC</span>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${selectedOption === 'crypto' ? 'rotate-90' : ''}`} />
                  </div>

                  {selectedOption === 'crypto' && (
                    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/5" onClick={(e) => e.stopPropagation()}>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                          <span>Connected Wallet</span>
                          <span className="text-slate-800 dark:text-white font-mono bg-slate-200/60 dark:bg-white/5 px-2 py-1 rounded text-[11px]">
                            {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Not Connected'}
                          </span>
                        </div>

                        <button
                          onClick={handlePayment}
                          disabled={isProcessing || !walletAddress}
                          className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] active:scale-[0.98] text-white py-3 rounded-xl font-bold text-xs transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isProcessing ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" suppressHydrationWarning />
                              Processing Blockchain Transaction...
                            </>
                          ) : (
                            'Pay with Web3 Wallet'
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </PayPalScriptProvider>
          )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 font-medium">
            <span>Powered by Always There Rails</span>
            <Link href="/pricing" className="text-xs text-red-500 hover:text-red-600 dark:text-rose-400 dark:hover:text-rose-300 font-bold transition-colors underline underline-offset-4">
              Cancel payment
            </Link>
          </div>
        </div>
      </motion.div>
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
