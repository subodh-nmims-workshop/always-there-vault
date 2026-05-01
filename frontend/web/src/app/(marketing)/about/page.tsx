'use client'

import { motion } from 'framer-motion'
import {
    Shield,
    Building2,
    Users,
    Code2
} from 'lucide-react'
import Link from 'next/link'
import { SharedFooter } from '@/components/shared-footer'

export default function AboutPage() {
    const defaultTransition = { duration: 0.5, ease: "easeOut" as const }

    return (
        <div className="min-h-screen bg-[#0a0c10] font-sans text-slate-100 selection:bg-[#1152d4]/30 flex flex-col overflow-x-hidden relative">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-[#0a0c10]/80 backdrop-blur-xl border-b border-white/5 px-4 sm:px-8 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="text-[#1152d4] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Shield className="w-8 h-8" />
                    </div>
                    <span className="font-bold text-xl tracking-tight hidden sm:block">AlwaysThere</span>
                </Link>
                <div className="hidden md:flex gap-8 items-center absolute left-1/2 -translate-x-1/2">
                    <Link href="/features" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Features</Link>
                    <Link href="/pricing" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Pricing</Link>
                    <Link href="/about" className="text-white transition-colors text-sm font-medium">About Us</Link>
                </div>
                <Link href="/" className="bg-[#1152d4] hover:bg-[#1152d4]/80 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-[0_0_20px_rgba(17,82,212,0.4)]">
                    Launch App
                </Link>
            </nav>

            <main className="flex-1 flex flex-col items-center px-4 py-20 max-w-5xl mx-auto w-full relative z-10">

                {/* Header */}
                <div className="text-center mb-20">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={defaultTransition} className="inline-flex items-center justify-center p-4 rounded-full bg-white/[0.03] border border-white/10 mb-6">
                        <Building2 className="w-8 h-8 text-[#1152d4]" />
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...defaultTransition, delay: 0.1 }} className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white">
                        The Foundation
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...defaultTransition, delay: 0.2 }} className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        We are a collective of cryptographers and distributed systems engineers building the final, immutable layer of the decentralized internet.
                    </motion.p>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-24">

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...defaultTransition, delay: 0.3 }} className="bg-white/[0.02] backdrop-blur-md rounded-3xl p-10 border border-white/10 flex flex-col items-center text-center">
                        <Users className="w-10 h-10 text-[#8b5cf6] mb-6" />
                        <h3 className="text-2xl font-bold mb-4 text-white">Our Mission</h3>
                        <p className="text-slate-400 leading-relaxed text-lg">
                            To ensure that sovereign wealth remains sovereign. We eliminate the single points of failure in legacy estate planning by trusting mathematics over institutions.
                        </p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...defaultTransition, delay: 0.4 }} className="bg-white/[0.02] backdrop-blur-md rounded-3xl p-10 border border-white/10 flex flex-col items-center text-center">
                        <Code2 className="w-10 h-10 text-emerald-500 mb-6" />
                        <h3 className="text-2xl font-bold mb-4 text-white">Open Source</h3>
                        <p className="text-slate-400 leading-relaxed text-lg">
                            Security thrives in the light. Every line of protocol code, every client library, and every relayer node implementation is entirely open-source.
                        </p>
                    </motion.div>

                </div>

                {/* Company Story and Stats */}
                <div className="w-full space-y-24 mb-24">
                    <section className="bg-white/[0.02] border border-white/5 p-12 rounded-3xl backdrop-blur-md">
                        <h2 className="text-3xl font-bold mb-6 text-white tracking-tight">The Origin Story</h2>
                        <div className="space-y-6 text-slate-300 leading-relaxed text-lg">
                            <p>
                                AlwaysThere was born out of necessity. In 2023, the sudden loss of several prominent early cryptocurrency figures highlighted a massive structural flaw in self-custody: if you are your own bank, what happens when the banker passes away?
                            </p>
                            <p>
                                Centralized solutions required trusting lawyers, third-party vaults, or multi-sig services that could be hacked, coerced, or simply go out of business. We realized the only solution was a cryptographically assured, zero-knowledge, and fully decentralized dead man's switch.
                            </p>
                            <p>
                                Our team spent 18 months researching Shamir Secret Sharing, zero-knowledge proofs, and gasless relayer networks to build a protocol that guarantees asset inheritance without ever exposing the assets during the user's lifetime.
                            </p>
                        </div>
                    </section>

                    <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { label: 'Total Value Locked', value: '$400M+' },
                            { label: 'Active Vaults', value: '12,500+' },
                            { label: 'Relayer Nodes', value: '142' },
                            { label: 'Security Audits', value: '3' }
                        ].map((stat, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center p-8 bg-[#1152d4]/5 rounded-2xl border border-[#1152d4]/20 shadow-[0_0_20px_rgba(17,82,212,0.1)]">
                                <h4 className="text-4xl font-black text-white mb-2">{stat.value}</h4>
                                <p className="text-sm font-semibold text-[#1152d4] uppercase tracking-widest">{stat.label}</p>
                            </motion.div>
                        ))}
                    </section>
                </div>

            </main>

            <SharedFooter />
        </div>
    )
}
