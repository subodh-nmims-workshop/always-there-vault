'use client'

import { motion } from 'framer-motion'
import {
    Shield,
    FileText,
    Scale,
    AlertTriangle
} from 'lucide-react'
import Link from 'next/link'
import { SharedFooter } from '@/components/shared-footer'

export default function TermsPage() {
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
                    <Link href="/security" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Security</Link>
                </div>
                <Link href="/" className="bg-[#1152d4] hover:bg-[#1152d4]/80 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-[0_0_20px_rgba(17,82,212,0.4)]">
                    Launch App
                </Link>
            </nav>

            {/* Header */}
            <header className="pt-16 pb-12 px-6 text-center max-w-4xl mx-auto relative z-10">
                <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={defaultTransition} className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
                    Terms of Service
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ ...defaultTransition, delay: 0.1 }} className="text-slate-500 text-sm font-bold uppercase tracking-widest">
                    Last Updated: March 2026
                </motion.p>
            </header>

            <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 lg:flex lg:gap-16 pb-32">
                {/* Sticky Sidebar */}
                <aside className="hidden lg:block w-64 shrink-0 relative z-10">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ ...defaultTransition, delay: 0.2 }} className="sticky top-28 p-6 rounded-2xl bg-white/[0.02] backdrop-blur-md border border-white/5">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Table of Contents</h3>
                        <nav className="flex flex-col gap-4">
                            <a href="#acceptance" className="text-[#1152d4] font-bold flex items-center gap-3 group text-sm">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#1152d4] shadow-[0_0_8px_#1152d4]"></span>
                                Acceptance
                            </a>
                            <a href="#disclaimer" className="text-slate-400 hover:text-white transition-all flex items-center gap-3 group text-sm">
                                <span className="h-1.5 w-1.5 rounded-full bg-transparent group-hover:bg-white/50 transition-all"></span>
                                Protocol Disclaimer
                            </a>
                            <a href="#liability" className="text-slate-400 hover:text-white transition-all flex items-center gap-3 group text-sm">
                                <span className="h-1.5 w-1.5 rounded-full bg-transparent group-hover:bg-white/50 transition-all"></span>
                                Limitation of Liability
                            </a>
                        </nav>
                    </motion.div>
                </aside>

                {/* Content Area */}
                <section className="flex-1 max-w-3xl lg:mx-0 relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...defaultTransition, delay: 0.3 }} className="prose prose-invert prose-slate max-w-none text-slate-300 leading-relaxed">

                        <div id="acceptance" className="mb-16 scroll-mt-32">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 tracking-tight">
                                <FileText className="text-[#1152d4] w-6 h-6" />
                                Acceptance of Terms
                            </h2>
                            <p className="text-lg">
                                By accessing or using the DeadMan Protocol directly or through any third-party interface, you agree to be bound by these Terms of Service. If you do not agree to these terms, do not interact with our smart contracts or web interfaces.
                            </p>
                        </div>

                        {/* Callout Box */}
                        <div className="my-12 p-8 rounded-2xl bg-red-500/5 border border-red-500/30 relative overflow-hidden group shadow-[0_0_30px_rgba(239,68,68,0.1)]">
                            <div className="absolute -right-4 -top-4 opacity-5">
                                <AlertTriangle className="w-48 h-48 text-red-500" />
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <AlertTriangle className="text-red-500 w-5 h-5" />
                                    <h4 className="font-bold text-red-500 uppercase tracking-widest text-sm">Non-Custodial Warning</h4>
                                </div>
                                <p className="text-red-500/90 leading-relaxed font-medium text-lg">
                                    The protocol is entirely non-custodial. If you lose your recovery shards or fail to maintain your heartbeat without valid beneficiaries, your assets may be locked permanently. We cannot intervene or recover lost funds.
                                </p>
                            </div>
                        </div>

                        <div id="disclaimer" className="mb-16 scroll-mt-32">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 tracking-tight">
                                <Shield className="text-[#1152d4] w-6 h-6" />
                                Protocol Disclaimer
                            </h2>
                            <p className="text-lg">
                                The DeadMan Protocol is provided "as is" and "as available" without any warranty of any kind. While our smart contracts undergo rigorous audits, interacting with experimental decentralized technologies carries inherent risks. You acknowledge these risks and agree to bear full responsibility for your interactions.
                            </p>
                        </div>

                        <div id="liability" className="mb-16 scroll-mt-32">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 tracking-tight">
                                <Scale className="text-[#1152d4] w-6 h-6" />
                                Limitation of Liability
                            </h2>
                            <p className="text-lg">
                                Under no circumstances shall the maintainers, developers, or affiliates of the DeadMan Protocol be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the protocol, including but not limited to loss of funds, data, or digital assets.
                            </p>
                        </div>

                    </motion.div>
                </section>
            </main>

            <SharedFooter />
        </div>
    )
}
