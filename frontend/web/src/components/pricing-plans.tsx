'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Zap, Shield, Crown, Cloud, Database, ArrowRight } from 'lucide-react'
import { CENTRALIZED_PLANS, DECENTRALIZED_PLANS, type UserMode, type BillingCycle } from '@/types/subscription'
import { toast } from 'sonner'

export function PricingPlans() {
  const [selectedMode, setSelectedMode] = useState<UserMode>('centralized')
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly')
  
  const plans = selectedMode === 'centralized' ? Object.values(CENTRALIZED_PLANS) : Object.values(DECENTRALIZED_PLANS)

  const handleSelectPlan = (planId: string) => {
    const walletAddress = localStorage.getItem('dwp_wallet_address')
    if (!walletAddress) {
      toast.error('Identity Not Verified', { description: 'Please connect your wallet to secure a vault.' })
      return
    }
    window.location.href = `/payment/crypto?plan=${planId}&billing=${billingCycle}&mode=${selectedMode}`
  }

  return (
    <div className="relative py-24 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 dark:bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 dark:bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-8"
          >
            <Shield className="w-3 h-3" /> Secure Inheritance Protocol
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter mb-6 uppercase">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-blue-500 dark:from-blue-400 dark:via-purple-400 dark:to-blue-500">Vault Capacity</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            Standard tiers designed for every stage of your digital life. 
            From master keys to massive family archives.
          </p>
        </div>

        {/* Toggles */}
        <div className="flex flex-col items-center gap-8 mb-16">
          <div className="p-1.5 bg-slate-200/50 dark:bg-white/5 rounded-2xl border border-slate-300 dark:border-white/10 flex gap-2">
            {[
              { id: 'centralized', label: 'Cloud Vault', icon: Cloud },
              { id: 'decentralized', label: 'Web3 Vault', icon: Database }
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMode(m.id as UserMode)}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm transition-all duration-500 ${
                  selectedMode === m.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300'
                }`}
              >
                <m.icon className="w-4 h-4" />
                {m.label}
              </button>
            ))}
          </div>

          <div className="p-1 bg-slate-200/50 dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl flex">
            {(['monthly', 'quarterly', 'yearly'] as BillingCycle[]).map((cycle) => (
              <button
                key={cycle}
                onClick={() => setBillingCycle(cycle)}
                className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${
                  billingCycle === cycle ? 'bg-slate-300 dark:bg-white/10 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300'
                }`}
              >
                {cycle.charAt(0).toUpperCase() + cycle.slice(1)}
                {cycle === 'yearly' && <span className="ml-1 text-[8px] text-emerald-500 dark:text-emerald-400">BEST VALUE</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-24">
          <AnimatePresence mode="wait">
            {plans.map((plan, idx) => {
              const price = billingCycle === 'yearly' ? plan.yearlyPrice : billingCycle === 'quarterly' ? plan.quarterlyPrice : plan.price
              const isPopular = plan.popular
              const isHuge = plan.limits.storageGB >= 500

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`group relative p-0.5 rounded-[2rem] transition-all duration-500 ${
                    isPopular ? 'bg-gradient-to-b from-blue-500 to-purple-600' : 'bg-slate-200 dark:bg-white/10 hover:bg-slate-300/50 dark:hover:bg-white/20'
                  }`}
                >
                  <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-transparent rounded-[1.9rem] p-8 h-full flex flex-col relative overflow-hidden transition-colors duration-300">
                    {isPopular && (
                      <div className="absolute top-4 right-4 px-2 py-1 bg-blue-600 text-[8px] font-black uppercase tracking-widest text-white rounded-md">
                        Most Popular
                      </div>
                    )}
                    
                    <div className="mb-6">
                      <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">{plan.name}</div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-black text-slate-900 dark:text-white">${price}</span>
                        <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">/{billingCycle === 'monthly' ? 'mo' : billingCycle === 'quarterly' ? 'qt' : 'yr'}</span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/5 mb-6 text-center">
                      <div className="text-2xl font-black text-blue-600 dark:text-blue-400">{plan.limits.storage}</div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Vault Space</div>
                    </div>

                    <div className="space-y-3 mb-8 flex-1">
                      {plan.features.slice(1).map((f, i) => (
                        <div key={i} className="flex items-start gap-2">
                           <Check size={12} className="text-emerald-600 dark:text-emerald-500 mt-0.5" />
                           <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400">{f}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => handleSelectPlan(plan.id)}
                      className={`w-full py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                        isPopular 
                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30' 
                        : 'bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-white border border-slate-200 dark:border-white/10'
                      }`}
                    >
                      {isHuge ? 'Initialize Elite' : 'Select Tier'}
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Upsell Footer */}
        <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-600/20 dark:to-purple-600/20 border border-slate-200 dark:border-white/10 rounded-[3rem] p-12 text-center transition-all duration-300">
          <Crown className="w-12 h-12 text-yellow-500 mx-auto mb-6" />
          <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-4">Need More than 1TB?</h3>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto mb-8 font-medium">
            For institutional archives, government-grade protection, or massive data estates, 
            our concierge team can custom-build a shard-distributed vault up to 100TB.
          </p>
          <button className="px-8 py-4 bg-slate-900 text-white dark:bg-white dark:text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 dark:hover:bg-slate-200 transition-all inline-flex items-center gap-2">
            Contact Concierge <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
