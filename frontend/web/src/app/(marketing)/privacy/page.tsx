'use client'

import { motion } from 'framer-motion'
import {
    Shield,
    Info,
    Database,
    LockKeyhole,
    Network
} from 'lucide-react'
import Link from 'next/link'
import { SharedFooter } from '@/components/shared-footer'

export default function PrivacyPolicyPage() {
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
                    Privacy Policy
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
                            <a href="#intro" className="text-[#1152d4] font-bold flex items-center gap-3 group text-sm">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#1152d4] shadow-[0_0_8px_#1152d4]"></span>
                                Introduction
                            </a>
                            <a href="#data" className="text-slate-400 hover:text-white transition-all flex items-center gap-3 group text-sm">
                                <span className="h-1.5 w-1.5 rounded-full bg-transparent group-hover:bg-white/50 transition-all"></span>
                                Data Collection
                            </a>
                            <a href="#crypto" className="text-slate-400 hover:text-white transition-all flex items-center gap-3 group text-sm">
                                <span className="h-1.5 w-1.5 rounded-full bg-transparent group-hover:bg-white/50 transition-all"></span>
                                Cryptography
                            </a>
                            <a href="#third-party" className="text-slate-400 hover:text-white transition-all flex items-center gap-3 group text-sm">
                                <span className="h-1.5 w-1.5 rounded-full bg-transparent group-hover:bg-white/50 transition-all"></span>
                                Third Parties
                            </a>
                        </nav>
                    </motion.div>
                </aside>

                {/* Content Area */}
                <section className="flex-1 max-w-3xl lg:mx-0 relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...defaultTransition, delay: 0.3 }} className="prose prose-invert prose-slate max-w-none text-slate-300 leading-relaxed">

                        <div id="intro" className="mb-16 scroll-mt-32">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 tracking-tight">
                                <Info className="text-[#1152d4] w-6 h-6" />
                                Introduction
                            </h2>
                            <p className="text-lg">
                                DeadMan Protocol is built on the fundamental principle that privacy is a human right. Our architecture is designed to protect your digital legacy without ever compromising your identity or sensitive credentials. This policy outlines how we handle the minimal data required to maintain the protocol's integrity.
                            </p>
                        </div>

                        {/* Callout Box */}
                        <div className="my-12 p-8 rounded-2xl bg-[#8b5cf6]/5 border border-[#8b5cf6]/30 relative overflow-hidden group shadow-[0_0_30px_rgba(139,92,246,0.1)]">
                            <div className="absolute -right-4 -top-4 opacity-5">
                                <LockKeyhole className="w-48 h-48 text-[#8b5cf6]" />
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <Shield className="text-[#8b5cf6] w-5 h-5" />
                                    <h4 className="font-bold text-[#8b5cf6] uppercase tracking-widest text-sm">Zero-Knowledge Security Note</h4>
                                </div>
                                <p className="text-[#8b5cf6]/90 leading-relaxed font-medium text-lg">
                                    The protocol's architecture ensures even the protocol infrastructure itself cannot access encrypted seeds or private keys. All encryption happens client-side before any data reaches the distributed ledger or IPFS.
                                </p>
                            </div>
                        </div>

                        <div id="data" className="mb-16 scroll-mt-32">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 tracking-tight">
                                <Database className="text-[#1152d4] w-6 h-6" />
                                Data Collection
                            </h2>
                            <p className="mb-6 text-lg">
                                We do not collect personal identification information (PII). The DeadMan Protocol only interacts with:
                            </p>
                            <ul className="space-y-4">
                                <li className="flex gap-3 items-start bg-white/[0.02] p-4 rounded-xl border border-white/5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#1152d4] mt-2.5 shrink-0 shadow-[0_0_8px_#1152d4]"></div>
                                    <span><strong className="text-white">Public wallet addresses</strong> used to initiate smart contract triggers.</span>
                                </li>
                                <li className="flex gap-3 items-start bg-white/[0.02] p-4 rounded-xl border border-white/5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#1152d4] mt-2.5 shrink-0 shadow-[0_0_8px_#1152d4]"></div>
                                    <span><strong className="text-white">Encrypted blobs</strong> that contain user-defined recovery instructions (which we cannot read).</span>
                                </li>
                                <li className="flex gap-3 items-start bg-white/[0.02] p-4 rounded-xl border border-white/5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#1152d4] mt-2.5 shrink-0 shadow-[0_0_8px_#1152d4]"></div>
                                    <span><strong className="text-white">Network metadata</strong> necessary for meta-transaction broadcasting via Relayers.</span>
                                </li>
                            </ul>
                        </div>

                        <div id="crypto" className="mb-16 scroll-mt-32">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 tracking-tight">
                                <LockKeyhole className="text-[#1152d4] w-6 h-6" />
                                Cryptography Standards
                            </h2>
                            <p className="text-lg">
                                All data stored via the DeadMan Protocol is secured using AES-256-GCM encryption combined with SECP256K1 elliptic curve signatures. Our "Dead Man's Switch" mechanism utilizes Time-Lock puzzles that are computationally impossible to solve before the user-defined expiration period.
                            </p>
                        </div>

                        <div id="third-party" className="mb-16 scroll-mt-32">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 tracking-tight">
                                <Network className="text-[#1152d4] w-6 h-6" />
                                Third Parties
                            </h2>
                            <p className="text-lg">
                                We utilize decentralized networks (Ethereum, Polygon, IPFS, Arweave) to ensure permanence. We do not sell, rent, or trade any metadata to centralized third-party analytics or marketing firms. Period.
                            </p>
                        </div>

                    </motion.div>
                </section>
            </main>

            <SharedFooter />
        </div>
    )
}
