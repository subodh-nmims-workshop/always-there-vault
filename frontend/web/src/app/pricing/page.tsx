'use client'

import React from 'react'
import { Shield } from 'lucide-react'
import Link from 'next/link'
import { PricingPlans } from '@/components/pricing-plans'
import { SharedFooter } from '@/components/shared-footer'

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-[#0a0c10] font-sans text-slate-100 selection:bg-[#1152d4]/30 flex flex-col overflow-x-hidden relative">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-[#0a0c10]/80 backdrop-blur-xl border-b border-white/5 px-4 sm:px-8 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="text-[#1152d4] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Shield className="w-8 h-8" />
                    </div>
                    <span className="font-bold text-xl tracking-tight hidden sm:block uppercase">AlwaysThere</span>
                </Link>
                <div className="hidden md:flex gap-8 items-center absolute left-1/2 -translate-x-1/2">
                    <Link href="/features" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Features</Link>
                    <Link href="/docs" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Documentation</Link>
                    <Link href="/pricing" className="text-white transition-colors text-sm font-medium">Pricing</Link>
                </div>
                <Link href="/dashboard" className="bg-[#1152d4] hover:bg-[#1152d4]/80 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-[0_0_20px_rgba(17,82,212,0.4)]">
                    Launch App
                </Link>
            </nav>

            <main className="flex-1">
                {/* We use the original PricingPlans component which contains the mode toggle and plans */}
                <div className="relative">
                    <div className="absolute inset-x-0 -top-20 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />
                    <PricingPlans />
                </div>
            </main>

            <SharedFooter />

            {/* Background Glows */}
            <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none -z-10" />
            <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none -z-10" />
        </div>
    )
}
