'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Zap, Shield, Infinity, Crown } from 'lucide-react'
import { CENTRALIZED_PLANS, DECENTRALIZED_PLANS, type UserMode, type PlanType } from '@/types/subscription'
import { useSubscription } from '@/contexts/SubscriptionContext'
import { toast } from 'sonner'

export function PricingPlans() {
  const [selectedMode, setSelectedMode] = useState<UserMode>('centralized')
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
  const { subscription, upgradePlan } = useSubscription()

  const plans = selectedMode === 'centralized' ? CENTRALIZED_PLANS : DECENTRALIZED_PLANS

  const handleSelectPlan = async (planId: PlanType) => {
    try {
      console.log('🎯 Selected plan:', planId, 'Mode:', selectedMode)

      // For decentralized mode, use crypto payment
      if (selectedMode === 'decentralized') {
        // Redirect to crypto payment page
        window.location.href = `/payment/crypto?plan=${planId}&billing=${billingCycle}`
        return
      }

      // For centralized mode, create Stripe checkout session
      const userId = localStorage.getItem('dwp_wallet_address') || 'user_' + Date.now()

      const response = await fetch('http://localhost:7001/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          planType: planId,
          mode: selectedMode,
          successUrl: `${window.location.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/pricing?cancelled=true`
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const { url } = await response.json()

      // Redirect to Stripe checkout
      window.location.href = url

    } catch (error) {
      console.error('❌ Failed to select plan:', error)
      toast.error('Payment initiation failed', {
        description: 'Please ensure the backend is running and Stripe is configured.'
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
          <h1 className="text-5xl font-bold text-white mb-4 relative z-10">
            Choose Your <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Freedom</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto relative z-10">
            Start with 30 days free. No credit card required. Cancel anytime.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full relative z-10 text-sm font-medium text-blue-300">
            <Zap className="w-4 h-4 text-blue-400" />
            Seamlessly map and migrate assets between Centralized and Decentralized nodes anytime.
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-2 inline-flex">
            <button
              onClick={() => setSelectedMode('centralized')}
              className={`px-8 py-3 rounded-xl font-semibold transition-all ${selectedMode === 'centralized'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
                }`}
            >
              <Shield className="inline-block w-5 h-5 mr-2" />
              Centralized
            </button>
            <button
              onClick={() => setSelectedMode('decentralized')}
              className={`px-8 py-3 rounded-xl font-semibold transition-all ${selectedMode === 'decentralized'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
                }`}
            >
              <Infinity className="inline-block w-5 h-5 mr-2" />
              Decentralized
            </button>
          </div>
        </div>

        {/* Billing Cycle Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/5 border border-white/10 rounded-xl p-1 inline-flex">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${billingCycle === 'monthly'
                ? 'bg-white/10 text-white'
                : 'text-slate-400 hover:text-white'
                }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${billingCycle === 'yearly'
                ? 'bg-white/10 text-white'
                : 'text-slate-400 hover:text-white'
                }`}
            >
              Yearly
              <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {Object.values(plans).map((plan, index) => {
            const price = billingCycle === 'yearly' ? plan.yearlyPrice || plan.price * 10 : plan.price
            const Icon = index === 0 ? Zap : index === 1 ? Shield : Crown

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-gradient-to-br from-white/5 to-white/[0.02] border rounded-3xl p-8 ${plan.popular
                  ? 'border-blue-500/50 shadow-[0_0_50px_rgba(59,130,246,0.3)]'
                  : 'border-white/10'
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-white">${price}</span>
                    <span className="text-slate-400">/{billingCycle === 'yearly' ? 'year' : 'month'}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-300">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`w-full py-3 rounded-xl font-semibold transition-all ${plan.popular
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                    }`}
                >
                  {subscription?.status === 'trial' ? 'Start Free Trial' : 'Upgrade Now'}
                </button>
              </motion.div>
            )
          })}
        </div>

        {/* Comparison Note */}
        <div className="mt-16 text-center">
          <p className="text-slate-400 text-sm">
            All plans include 30-day free trial • No credit card required • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  )
}
