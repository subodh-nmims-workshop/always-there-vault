'use client'

import { motion } from 'framer-motion'
import {
    Shield,
    CheckCircle2
} from 'lucide-react'
import Link from 'next/link'
import { SharedFooter } from '@/components/shared-footer'

export default function PricingPage() {
    const defaultTransition = { duration: 0.5, ease: "easeOut" as const }

    const faqs = [
        {
            q: "Do I pay gas fees?",
            a: "For Basic vaults, users cover L1 network gas for heartbeats. Premium users enjoy gasless heartbeats via our L2 relayer network, paid for by your subscription."
        },
        {
            q: "Can I upgrade later?",
            a: "Yes, you can upgrade your vault tier at any time. The transition is seamless and won't require you to re-verify your beneficiaries."
        },
        {
            q: "Which tokens are accepted?",
            a: "We currently accept USDC, USDT, and DAI for subscription payments across all supported EVM chains."
        },
        {
            q: "How secure is the protocol?",
            a: "DeadMan is fully audited by top security firms. All logic is on-chain, and we do not have access to your private keys or vault contents."
        }
    ]

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

            <main className="flex-1 flex flex-col items-center px-4 py-16 max-w-6xl mx-auto w-full relative z-10">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.span initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={defaultTransition} className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-[#1152d4]/10 text-[#1152d4] border border-[#1152d4]/20 mb-6">
                        Transparent Pricing
                    </motion.span>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...defaultTransition, delay: 0.1 }} className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white">
                        Protocol Fees
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...defaultTransition, delay: 0.2 }} className="text-slate-400 max-w-lg mx-auto text-lg leading-relaxed">
                        Secure your digital legacy with institutional-grade smart contracts. Simple, transparent, decentralized.
                    </motion.p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-32">

                    {/* Basic */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...defaultTransition, delay: 0.3 }} className="bg-white/[0.02] backdrop-blur-md rounded-3xl p-8 border border-white/10 flex flex-col">
                        <div className="mb-8 border-b border-white/10 pb-8">
                            <h3 className="text-2xl font-bold mb-2">Basic Vault</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-5xl font-black text-white">Free</span>
                            </div>
                        </div>
                        <ul className="space-y-4 mb-10 flex-1">
                            <li className="flex items-center gap-3 text-slate-300">
                                <CheckCircle2 className="text-slate-500 w-5 h-5 shrink-0" />
                                <span>1 Beneficiary</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-300">
                                <CheckCircle2 className="text-slate-500 w-5 h-5 shrink-0" />
                                <span>Standard L1 Heartbeat</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-300">
                                <CheckCircle2 className="text-slate-500 w-5 h-5 shrink-0" />
                                <span>Community Support</span>
                            </li>
                        </ul>
                        <button className="w-full py-4 rounded-xl border border-white/20 hover:bg-white/5 transition-all font-bold text-white">
                            Select Basic
                        </button>
                    </motion.div>

                    {/* Premium */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...defaultTransition, delay: 0.4 }} className="bg-[#1152d4]/5 backdrop-blur-md rounded-3xl p-8 border-2 border-[#1152d4]/50 flex flex-col relative scale-[1.02] md:scale-105 shadow-[0_0_30px_rgba(17,82,212,0.15)] z-10">
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#1152d4] to-[#8b5cf6] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg">
                            Most Popular
                        </div>
                        <div className="mb-8 border-b border-white/10 pb-8">
                            <h3 className="text-2xl font-bold mb-2">Premium Vault</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-5xl font-black text-white">$10</span>
                                <span className="text-slate-400 font-medium">/ mo (USDC)</span>
                            </div>
                        </div>
                        <ul className="space-y-4 mb-10 flex-1">
                            <li className="flex items-center gap-3 text-white">
                                <CheckCircle2 className="text-[#1152d4] w-5 h-5 shrink-0" />
                                <span className="font-medium">5 Beneficiaries</span>
                            </li>
                            <li className="flex items-center gap-3 text-white">
                                <CheckCircle2 className="text-[#1152d4] w-5 h-5 shrink-0" />
                                <span className="font-medium">L2 Gasless Heartbeats</span>
                            </li>
                            <li className="flex items-center gap-3 text-white">
                                <CheckCircle2 className="text-[#1152d4] w-5 h-5 shrink-0" />
                                <span className="font-medium">Priority IPFS Pinning</span>
                            </li>
                            <li className="flex items-center gap-3 text-white">
                                <CheckCircle2 className="text-[#1152d4] w-5 h-5 shrink-0" />
                                <span className="font-medium">24/7 Priority Support</span>
                            </li>
                        </ul>
                        <button className="w-full py-4 rounded-xl bg-[#1152d4] hover:bg-[#1152d4]/90 transition-all font-bold text-white shadow-[0_0_20px_rgba(17,82,212,0.4)]">
                            Select Premium
                        </button>
                    </motion.div>

                    {/* Institutional */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...defaultTransition, delay: 0.5 }} className="bg-white/[0.02] backdrop-blur-md rounded-3xl p-8 border border-emerald-500/30 flex flex-col">
                        <div className="mb-8 border-b border-white/10 pb-8">
                            <h3 className="text-2xl font-bold mb-2 text-emerald-400">Institutional</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-5xl font-black text-white">Custom</span>
                            </div>
                        </div>
                        <ul className="space-y-4 mb-10 flex-1">
                            <li className="flex items-center gap-3 text-slate-300">
                                <CheckCircle2 className="text-emerald-500 w-5 h-5 shrink-0" />
                                <span>Unlimited Scaling</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-300">
                                <CheckCircle2 className="text-emerald-500 w-5 h-5 shrink-0" />
                                <span>Dedicated Relayer Nodes</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-300">
                                <CheckCircle2 className="text-emerald-500 w-5 h-5 shrink-0" />
                                <span>Custom Smart Contract Logic</span>
                            </li>
                        </ul>
                        <button className="w-full py-4 rounded-xl border border-emerald-500/30 hover:bg-emerald-500/10 transition-colors font-bold text-emerald-400">
                            Contact Sales
                        </button>
                    </motion.div>

                </div>

                {/* FAQs */}
                <section className="w-full max-w-4xl">
                    <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-3xl font-bold mb-12 text-center text-white">
                        Frequently Asked Questions
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                        {faqs.map((faq, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                                <h4 className="font-bold text-white mb-3 text-lg">{faq.q}</h4>
                                <p className="text-slate-400 leading-relaxed text-[15px]">
                                    {faq.a}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>

            </main>

            <SharedFooter />
        </div>
    )
}
