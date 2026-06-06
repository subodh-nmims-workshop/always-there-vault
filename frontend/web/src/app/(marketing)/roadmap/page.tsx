'use client'

import { ThemeToggle } from '@/components/theme-toggle'

import { motion } from 'framer-motion'
import {
    Shield,
    Map,
    CheckCircle2,
    CircleDashed,
    ArrowRight
} from 'lucide-react'
import Link from 'next/link'
import { SharedFooter } from '@/components/shared-footer'

export default function RoadmapPage() {
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
                    <Link href="/roadmap" className="text-white transition-colors text-sm font-medium">Roadmap</Link>
                </div>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <Link href="/" className="bg-[#1152d4] hover:bg-[#1152d4]/80 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-[0_0_20px_rgba(17,82,212,0.4)]">
                    Launch App
                </Link>
                </div>
            </nav>

            <main className="flex-1 flex flex-col items-center px-4 py-20 max-w-4xl mx-auto w-full relative z-10">

                {/* Header */}
                <div className="text-center mb-24">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={defaultTransition} className="inline-flex items-center justify-center p-4 rounded-full bg-white/[0.03] border border-white/10 mb-6">
                        <Map className="w-8 h-8 text-[#1152d4]" />
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...defaultTransition, delay: 0.1 }} className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white">
                        Protocol <span className="text-[#1152d4]">Roadmap</span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...defaultTransition, delay: 0.2 }} className="text-slate-400 max-w-xl mx-auto text-lg leading-relaxed">
                        Our path towards delivering the definitive inheritance layer for web3.
                    </motion.p>
                </div>

                {/* Roadmap Timeline */}
                <div className="w-full relative">

                    {/* Vertical Line */}
                    <div className="absolute left-[27px] md:left-1/2 top-4 bottom-4 w-px bg-white/10 -ml-px hidden md:block"></div>

                    <div className="space-y-12">

                        {/* Phase 1 */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative flex items-start md:justify-between w-full md:even:flex-row-reverse group">
                            <div className="hidden md:block w-[calc(50%-3rem)]"></div>

                            {/* Center Node */}
                            <div className="absolute left-0 md:left-1/2 -ml-3 mt-1.5 w-6 h-6 rounded-full bg-[#1152d4]/20 border-2 border-[#1152d4] flex items-center justify-center shrink-0 z-10">
                                <CheckCircle2 className="w-4 h-4 text-[#1152d4]" />
                            </div>

                            {/* Content */}
                            <div className="ml-12 md:ml-0 md:w-[calc(50%-3rem)] bg-white/[0.02] backdrop-blur-md rounded-2xl p-8 border border-white/10 group-hover:border-[#1152d4]/50 transition-colors">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#1152d4] bg-[#1152d4]/10 px-2 py-1 rounded">Completed</span>
                                    <span className="text-slate-500 font-mono text-sm">Q4 2025</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">V1 Liveness Monitor</h3>
                                <p className="text-slate-400 leading-relaxed text-sm mb-4">
                                    Deployment of the core AES-256-GCM encryption client and base Ethereum smart contracts testing heartbeats.
                                </p>
                            </div>
                        </motion.div>

                        {/* Phase 2 */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative flex items-start md:justify-between w-full md:even:flex-row-reverse group">
                            <div className="hidden md:block w-[calc(50%-3rem)]"></div>

                            {/* Center Node */}
                            <div className="absolute left-0 md:left-1/2 -ml-3 mt-1.5 w-6 h-6 rounded-full bg-[#8b5cf6]/20 border-2 border-[#8b5cf6] flex items-center justify-center shrink-0 z-10 shadow-[0_0_15px_rgba(139,92,246,0.4)]">
                                <div className="w-2 h-2 rounded-full bg-[#8b5cf6] animate-pulse"></div>
                            </div>

                            {/* Content */}
                            <div className="ml-12 md:ml-0 md:w-[calc(50%-3rem)] bg-white/[0.02] backdrop-blur-md rounded-2xl p-8 border border-white/10 group-hover:border-[#8b5cf6]/50 transition-colors">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#8b5cf6] bg-[#8b5cf6]/10 px-2 py-1 rounded">In Progress</span>
                                    <span className="text-slate-500 font-mono text-sm">Q1 2026</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">Gasless Relayer Network</h3>
                                <p className="text-slate-400 leading-relaxed text-sm mb-4">
                                    Implementing EIP-4337 compatibility to allow users to sign heartbeat messages off-chain without paying gas fees directly.
                                </p>
                            </div>
                        </motion.div>

                        {/* Phase 3 */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative flex items-start md:justify-between w-full md:even:flex-row-reverse group">
                            <div className="hidden md:block w-[calc(50%-3rem)]"></div>

                            {/* Center Node */}
                            <div className="absolute left-0 md:left-1/2 -ml-3 mt-1.5 w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center shrink-0 z-10">
                                <CircleDashed className="w-4 h-4 text-slate-500" />
                            </div>

                            {/* Content */}
                            <div className="ml-12 md:ml-0 md:w-[calc(50%-3rem)] bg-white/[0.02] backdrop-blur-md rounded-2xl p-8 border border-white/10 opacity-70 group-hover:opacity-100 transition-all hover:border-slate-500/50">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-white/10 px-2 py-1 rounded">Planned</span>
                                    <span className="text-slate-500 font-mono text-sm">Q3 2026</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">Cross-Chain Recovery</h3>
                                <p className="text-slate-400 leading-relaxed text-sm mb-4">
                                    Rolling out automated disbursement layers for Solana, Arbitrum, and native Bitcoin integration via DLCs.
                                </p>
                            </div>
                        </motion.div>

                        {/* Phase 4 */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative flex items-start md:justify-between w-full md:even:flex-row-reverse group">
                            <div className="hidden md:block w-[calc(50%-3rem)]"></div>

                            {/* Center Node */}
                            <div className="absolute left-0 md:left-1/2 -ml-3 mt-1.5 w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center shrink-0 z-10 transition-colors group-hover:border-emerald-500 group-hover:bg-emerald-500/20">
                                <CircleDashed className="w-4 h-4 text-slate-500 group-hover:text-emerald-500 transition-colors" />
                            </div>

                            {/* Content */}
                            <div className="ml-12 md:ml-0 md:w-[calc(50%-3rem)] bg-white/[0.02] backdrop-blur-md rounded-2xl p-8 border border-white/10 opacity-70 group-hover:opacity-100 transition-all hover:border-emerald-500/50">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-white/10 px-2 py-1 rounded group-hover:text-emerald-400 group-hover:bg-emerald-500/10 transition-colors">Future</span>
                                    <span className="text-slate-500 font-mono text-sm group-hover:text-emerald-500/70 transition-colors">Q4 2026</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">Zero-Knowledge Beneficiary Proofs</h3>
                                <p className="text-slate-400 leading-relaxed text-sm mb-4">
                                    Implementing zk-SNARKs so beneficiaries can prove their identity and right to claim assets without revealing their original wallet address to the public chain.
                                </p>
                            </div>
                        </motion.div>

                        {/* Phase 5 */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative flex items-start md:justify-between w-full md:even:flex-row-reverse group">
                            <div className="hidden md:block w-[calc(50%-3rem)]"></div>

                            {/* Center Node */}
                            <div className="absolute left-0 md:left-1/2 -ml-3 mt-1.5 w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center shrink-0 z-10 transition-colors group-hover:border-blue-500 group-hover:bg-blue-500/20">
                                <CircleDashed className="w-4 h-4 text-slate-500 group-hover:text-blue-500 transition-colors" />
                            </div>

                            {/* Content */}
                            <div className="ml-12 md:ml-0 md:w-[calc(50%-3rem)] bg-white/[0.02] backdrop-blur-md rounded-2xl p-8 border border-white/10 opacity-70 group-hover:opacity-100 transition-all hover:border-blue-500/50">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-white/10 px-2 py-1 rounded group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-colors">Future</span>
                                    <span className="text-slate-500 font-mono text-sm group-hover:text-blue-500/70 transition-colors">Q1 2027</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">Institutional Decentralized Relayers</h3>
                                <p className="text-slate-400 leading-relaxed text-sm mb-4">
                                    Allowing registered law firms, banks, and trusts to run their own dedicated relayers inside the consensus network for hybrid legal-smart-contract execution.
                                </p>
                            </div>
                        </motion.div>

                    </div>
                </div>

            </main>

            <SharedFooter />
        </div>
    )
}
