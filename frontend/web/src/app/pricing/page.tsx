'use client'

import { ThemeToggle } from '@/components/theme-toggle'

import React from 'react'
import { Shield } from 'lucide-react'
import Link from 'next/link'
import { PricingPlans } from '@/components/pricing-plans'
import { SharedFooter } from '@/components/shared-footer'

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0c10] font-sans text-slate-800 dark:text-slate-100 selection:bg-[#1152d4]/30 flex flex-col overflow-x-hidden relative">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#0a0c10]/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 px-4 sm:px-8 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
          <img src="/logo-simple.png" alt="AlwaysThere Logo" className="h-10 w-auto object-contain group-hover:scale-110 transition-transform duration-300" />
          <div className="flex flex-col text-left">
            <span className="text-xl font-black tracking-wider text-slate-900 dark:text-white leading-none">ALWAYS THERE</span>
            <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-none mt-1.5">SECURE YOUR DIGITAL LEGACY</span>
          </div>
        </Link>
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/investors" className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black uppercase tracking-widest text-[#2b52ff] hover:bg-blue-500/20 hover:text-white transition-all shadow-[0_0_15px_rgba(43,82,255,0.3)]">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        Partners & Investors
                    </Link>
                    <Link href="/#how-it-works" className="text-xs font-black uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">How it works</Link>
                    <Link href="/#security" className="text-xs font-black uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Security</Link>
                    <Link href="/docs" className="text-xs font-black uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Tech Guide</Link>
                    <Link href="/pricing" className="text-xs font-black uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Pricing</Link>
                    <Link href="/donate" className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2b52ff]/10 border border-[#2b52ff]/20 text-[10px] font-black uppercase tracking-widest text-[#2b52ff] hover:bg-[#2b52ff]/20 hover:text-white transition-all">Support Us</Link>
                </div>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <Link href="/dashboard" className="bg-[#1152d4] hover:bg-[#1152d4]/80 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-[0_0_20px_rgba(17,82,212,0.4)]">
                    Launch App
                </Link>
                </div>
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
