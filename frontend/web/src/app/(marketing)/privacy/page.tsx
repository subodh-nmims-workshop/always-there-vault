'use client'

import { ThemeToggle } from '@/components/theme-toggle'

import { motion } from 'framer-motion'
import {
    Shield,
    Info,
    Database,
    LockKeyhole,
    Network,
    Globe
} from 'lucide-react'
import Link from 'next/link'
import { SharedFooter } from '@/components/shared-footer'

export default function PrivacyPolicyPage() {
    const defaultTransition = { duration: 0.5, ease: "easeOut" as const }

    return (
        <div className="min-h-screen bg-[#0a0c10] font-sans text-slate-100 selection:bg-[#1152d4]/30 flex flex-col overflow-x-hidden relative">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-[#0a0c10]/80 backdrop-blur-xl border-b border-white/5 px-4 sm:px-8 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
          <img src="/logo-simple.png" alt="AlwaysThere Logo" className="h-10 w-auto object-contain group-hover:scale-110 transition-transform duration-300" />
          <div className="flex flex-col text-left">
            <span className="text-xl font-black tracking-wider text-slate-900 dark:text-white leading-none">ALWAYS THERE</span>
            <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-none mt-1.5">SECURE YOUR DIGITAL LEGACY</span>
          </div>
        </Link>
                <div className="hidden md:flex gap-8 items-center absolute left-1/2 -translate-x-1/2">
                    <Link href="/features" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Features</Link>
                    <Link href="/docs" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Documentation</Link>
                    <Link href="/security" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Security</Link>
                </div>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <Link href="/" className="bg-[#1152d4] hover:bg-[#1152d4]/80 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-[0_0_20px_rgba(17,82,212,0.4)]">
                    Launch App
                </Link>
                </div>
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
                                1. Introduction
                            </a>
                            <a href="#data" className="text-slate-400 hover:text-white transition-all flex items-center gap-3 group text-sm">
                                <span className="h-1.5 w-1.5 rounded-full bg-transparent group-hover:bg-white/50 transition-all"></span>
                                2. Data We Process
                            </a>
                            <a href="#crypto" className="text-slate-400 hover:text-white transition-all flex items-center gap-3 group text-sm">
                                <span className="h-1.5 w-1.5 rounded-full bg-transparent group-hover:bg-white/50 transition-all"></span>
                                3. Cryptography
                            </a>
                            <a href="#third-party" className="text-slate-400 hover:text-white transition-all flex items-center gap-3 group text-sm">
                                <span className="h-1.5 w-1.5 rounded-full bg-transparent group-hover:bg-white/50 transition-all"></span>
                                4. Third Parties
                            </a>
                            <a href="#cookies" className="text-slate-400 hover:text-white transition-all flex items-center gap-3 group text-sm">
                                <span className="h-1.5 w-1.5 rounded-full bg-transparent group-hover:bg-white/50 transition-all"></span>
                                5. Cookies
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
                                1. Introduction
                            </h2>
                            <p className="text-lg">
                                AlwaysThere is built on the fundamental principle that privacy is a human right. Our architecture is explicitly designed to protect your digital legacy without ever compromising your identity or sensitive credentials. This policy outlines how we minimize data collection while maintaining the protocol's integrity and liveness.
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
                                    <h4 className="font-bold text-[#8b5cf6] uppercase tracking-widest text-sm">Zero-Knowledge Guarantee</h4>
                                </div>
                                <p className="text-[#8b5cf6]/90 leading-relaxed font-medium text-lg">
                                    The protocol's architecture ensures even the creators of the protocol cannot access your encrypted seeds, documents, or private keys. The backend logic only orchestrates the heartbeat timers and handles encrypted blobs; the decryption relies entirely on cryptographic proofs occurring client-side or within isolated smart contract environments upon valid release.
                                </p>
                            </div>
                        </div>

                        <div id="data" className="mb-16 scroll-mt-32">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 tracking-tight">
                                <Database className="text-[#1152d4] w-6 h-6" />
                                2. Data We Process
                            </h2>
                            <p className="mb-6 text-lg">
                                We actively avoid collecting Personally Identifiable Information (PII) such as your name, physical address, or IP address logs. The AlwaysThere only interacts with the following technical data:
                            </p>
                            <ul className="space-y-4">
                                <li className="flex gap-3 items-start bg-white/[0.02] p-4 rounded-xl border border-white/5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#1152d4] mt-2.5 shrink-0 shadow-[0_0_8px_#1152d4]"></div>
                                    <div className="flex-1">
                                        <strong className="text-white block mb-1">Public Wallet Addresses</strong>
                                        <span className="text-slate-400 text-sm">Used exclusively to map ownership of vaults to your cryptographic identity, allowing the smart contract to verify heartbeat signatures.</span>
                                    </div>
                                </li>
                                <li className="flex gap-3 items-start bg-white/[0.02] p-4 rounded-xl border border-white/5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] mt-2.5 shrink-0 shadow-[0_0_8px_#8b5cf6]"></div>
                                    <div className="flex-1">
                                        <strong className="text-white block mb-1">Encrypted Payload Blobs (IPFS CIDs)</strong>
                                        <span className="text-slate-400 text-sm">The content ID referencing your encrypted assets stored on decentralized networks. We cannot read the contents of these blobs.</span>
                                    </div>
                                </li>
                                <li className="flex gap-3 items-start bg-white/[0.02] p-4 rounded-xl border border-white/5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2.5 shrink-0 shadow-[0_0_8px_#10b981]"></div>
                                    <div className="flex-1">
                                        <strong className="text-white block mb-1">On-Chain Activity Metadata</strong>
                                        <span className="text-slate-400 text-sm">Timestamps of your heartbeat transactions and the configured expiration interval to accurately trigger the Dead Man's Switch.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div id="crypto" className="mb-16 scroll-mt-32">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 tracking-tight">
                                <LockKeyhole className="text-[#1152d4] w-6 h-6" />
                                3. Cryptography Standards
                            </h2>
                            <p className="text-lg">
                                All data stored via the AlwaysThere UI is secured using AES-256-GCM encryption in the browser prior to transmission. Secrets are sharded using Shamir's Secret Sharing (SSS) before they are sent to the relayer network. Because the decryption keys are never transmitted whole, even a complete database compromise of an indexing node yields no actionable intelligence to an attacker.
                            </p>
                        </div>

                        <div id="third-party" className="mb-16 scroll-mt-32">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 tracking-tight">
                                <Network className="text-[#1152d4] w-6 h-6" />
                                4. Third-Party Interactions
                            </h2>
                            <p className="text-lg">
                                By interacting with our interface, your browser must communicate with external decentralized infrastructure to function correctly. This is inherent to Web3 architecture:
                            </p>
                            <br />
                            <h3 className="text-xl font-bold text-white mt-4 mb-2">RPC Providers</h3>
                            <p className="text-lg mb-4">
                                Our frontend queries blockchain data (like contract state) via RPC providers (e.g., Alchemy, Infura, or public endpoints). These providers may log your IP address temporarily for DDoS protection, subject to their own respective privacy policies.
                            </p>
                            <h3 className="text-xl font-bold text-white mt-4 mb-2">IPFS Pinning Services</h3>
                            <p className="text-lg">
                                Your encrypted blobs are pinned using decentralized storage providers (such as Storacha or Web3.Storage). While the encrypted bytes reside on public networks, they remain indecipherable without the threshold of key shards held by the smart contract.
                            </p>
                        </div>

                        <div id="cookies" className="mb-16 scroll-mt-32">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 tracking-tight">
                                <Globe className="text-[#1152d4] w-6 h-6" />
                                5. Cookies & Local Storage
                            </h2>
                            <p className="text-lg">
                                We do not use tracking cookies. We utilize your browser's Local Storage exclusively to cache non-sensitive application state (like your preferred UI theme, or current wallet connection status) to enhance performance. We never store raw private keys in Local Storage.
                            </p>
                        </div>

                    </motion.div>
                </section>
            </main>

            <SharedFooter />
        </div>
    )
}
