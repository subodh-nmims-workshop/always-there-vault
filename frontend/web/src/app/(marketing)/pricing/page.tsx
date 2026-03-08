'use client'

import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'
import Link from 'next/link'
import { SharedFooter } from '@/components/shared-footer'
import { PricingPlans } from '@/components/pricing-plans'
import { useSubscription } from '@/contexts/SubscriptionContext'

export default function PricingPage() {
    const { subscription } = useSubscription()
    const defaultTransition = { duration: 0.5, ease: "easeOut" as const }

    return (
        <div className="min-h-screen bg-[#0a0c10] font-sans text-slate-100 selection:bg-[#1152d4]/30 flex flex-col overflow-x-hidden relative">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-[#0a0c10]/80 backdrop-blur-xl border-b border-white/5 px-4 sm:px-8 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="text-[#1152d4] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Shield className="w-8 h-8" />
                    </div>
                    <span className="font-bold text-xl tracking-tight hidden sm:block">DeadMan Protocol</span>
                </Link>
                <div className="hidden md:flex gap-8 items-center absolute left-1/2 -translate-x-1/2">
                    <Link href="/features" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Features</Link>
                    <Link href="/docs" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Documentation</Link>
                    <Link href="/pricing" className="text-white transition-colors text-sm font-medium">Pricing</Link>
                </div>
                <Link href="/" className="bg-[#1152d4] hover:bg-[#1152d4]/80 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-[0_0_20px_rgba(17,82,212,0.4)]">
                    Launch App
                </Link>
            </nav>

            <main className="flex-1 flex flex-col items-center px-4 py-16 max-w-7xl mx-auto w-full relative z-10">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.span 
                        initial={{ opacity: 0, scale: 0.9 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        transition={defaultTransition} 
                        className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-[#1152d4]/10 text-[#1152d4] border border-[#1152d4]/20 mb-6"
                    >
                        {subscription?.status === 'trial' 
                            ? `${Math.max(0, Math.ceil((subscription.trialEndsAt!.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))} Days Free Trial Remaining`
                            : 'Transparent Pricing'
                        }
                    </motion.span>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ ...defaultTransition, delay: 0.1 }} 
                        className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white"
                    >
                        Choose Your <span className="bg-gradient-to-r from-[#1152d4] to-[#8b5cf6] bg-clip-text text-transparent">Digital Legacy Mode</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ ...defaultTransition, delay: 0.2 }} 
                        className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed"
                    >
                        Select between centralized convenience or decentralized sovereignty. Switch anytime. Start with 30 days free.
                    </motion.p>
                </div>

                {/* Pricing Plans Component */}
                <PricingPlans />

            </main>

            <SharedFooter />
        </div>
    )
}
