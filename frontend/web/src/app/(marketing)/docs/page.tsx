'use client'

import { motion } from 'framer-motion'
import {
    Shield,
    BookOpen,
    Terminal,
    Cpu,
    Fingerprint
} from 'lucide-react'
import Link from 'next/link'
import { SharedFooter } from '@/components/shared-footer'

export default function DocsPage() {
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
                    <Link href="/docs" className="text-white transition-colors text-sm font-medium">Documentation</Link>
                    <Link href="/security" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Security</Link>
                </div>
                <Link href="/" className="bg-[#1152d4] hover:bg-[#1152d4]/80 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-[0_0_20px_rgba(17,82,212,0.4)]">
                    Launch App
                </Link>
            </nav>

            {/* Header */}
            <header className="pt-16 pb-12 px-6 text-center max-w-4xl mx-auto relative z-10">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={defaultTransition} className="inline-flex items-center justify-center p-4 rounded-full bg-white/[0.03] border border-white/10 mb-6">
                    <BookOpen className="w-8 h-8 text-[#1152d4]" />
                </motion.div>
                <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ ...defaultTransition, delay: 0.1 }} className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
                    Developer Documentation
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ ...defaultTransition, delay: 0.2 }} className="text-slate-400 text-lg max-w-2xl mx-auto">
                    Explore the architecture, integrate the SDK, or review the smart contracts powering the ultimate digital inheritance protocol.
                </motion.p>
            </header>

            <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 mt-8 pb-32">

                {/* Quick Starts Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">

                    <Link href="/docs/quick-start" className="bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-[#1152d4]/50 p-6 rounded-2xl transition-all group">
                        <Terminal className="w-8 h-8 text-[#1152d4] mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="text-lg font-bold text-white mb-2">Quick Start Guide</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">Get up and running with the client SDK in under 5 minutes. Learn how to initiate a protocol vault.</p>
                    </Link>

                    <Link href="/docs/smart-contract" className="bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-[#8b5cf6]/50 p-6 rounded-2xl transition-all group">
                        <Cpu className="w-8 h-8 text-[#8b5cf6] mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="text-lg font-bold text-white mb-2">Smart Contracts</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">Deep dive into the Solidity architecture managing the liveness checks and secure asset disbursement.</p>
                    </Link>

                    <Link href="/docs/shamir-sdk" className="bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-emerald-500/50 p-6 rounded-2xl transition-all group">
                        <Fingerprint className="w-8 h-8 text-emerald-500 mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="text-lg font-bold text-white mb-2">Cryptography & Sharding</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">Understand the mathematics behind Shamir's Secret Sharing and our zero-knowledge heartbeat signatures.</p>
                    </Link>

                </div>

                <section className="bg-white/[0.01] border border-white/5 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1152d4]/5 to-transparent pointer-events-none"></div>
                    <h2 className="text-2xl font-bold text-white mb-4 relative z-10">Looking for the API Reference?</h2>
                    <p className="text-slate-400 mb-8 max-w-lg mx-auto relative z-10">Access the full REST API documentation for relay integrations, webhook subscriptions, and custom liveness monitors.</p>
                    <button className="bg-white text-[#0a0c10] px-8 py-3 rounded-full font-bold text-sm hover:scale-105 transition-all relative z-10">
                        View API Reference
                    </button>
                </section>

            </main>

            <SharedFooter />
        </div>
    )
}
