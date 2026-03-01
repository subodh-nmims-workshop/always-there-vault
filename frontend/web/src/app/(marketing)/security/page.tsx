'use client'

import { motion } from 'framer-motion'
import {
    Shield,
    FileCode2,
    Server,
    ArrowRight,
    MonitorSmartphone,
    LockKeyhole,
    CheckCircle2
} from 'lucide-react'
import Link from 'next/link'
import { SharedFooter } from '@/components/shared-footer'

export default function SecurityPage() {
    const defaultTransition = { duration: 0.6, ease: "easeOut" as const }

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
                    <Link href="/security" className="text-white transition-colors text-sm font-medium">Security</Link>
                </div>
                <Link href="/" className="bg-[#1152d4] hover:bg-[#1152d4]/80 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-[0_0_20px_rgba(17,82,212,0.4)]">
                    Launch App
                </Link>
            </nav>

            <main className="flex-1 flex flex-col relative w-full items-center">
                {/* Header */}
                <header className="relative pt-24 pb-16 px-6 text-center w-full max-w-5xl">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-500/10 blur-[120px] rounded-full"></div>
                    </div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={defaultTransition} className="inline-flex items-center bg-white/[0.03] backdrop-blur-md px-4 py-1.5 rounded-full border border-red-500/30 mb-6">
                        <span className="text-[10px] font-black tracking-[0.2em] text-red-500">THREAT MODEL REPORT</span>
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...defaultTransition, delay: 0.1 }} className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
                        Uncompromising <span className="text-red-500">Security</span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...defaultTransition, delay: 0.2 }} className="max-w-2xl mx-auto text-slate-400 text-lg leading-relaxed">
                        DeadMan Protocol assumes servers are compromised. We build exclusively on client-side encryption and decentralized consensus.
                    </motion.p>
                </header>

                {/* Security Content */}
                <div className="space-y-24 px-6 pb-32 max-w-5xl w-full">

                    {/* Section 1 */}
                    <section className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-2 md:order-1 space-y-6">
                            <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                                <LockKeyhole className="w-7 h-7" />
                            </div>
                            <h2 className="text-3xl font-bold text-slate-100 tracking-tight">Client-Side AES-256-GCM</h2>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                Your seeds, passwords, and documents are encrypted directly in your browser using the wildly standard WebCrypto API before any data is transmitted to an IPFS node. Even if our servers are fully breached, the attackers only recover cipher-text.
                            </p>
                            <ul className="space-y-3 pt-2">
                                <li className="flex items-center text-sm font-medium text-slate-300"><CheckCircle2 className="w-4 h-4 mr-3 text-red-500" /> WebCrypto Subsystem Isolation</li>
                                <li className="flex items-center text-sm font-medium text-slate-300"><CheckCircle2 className="w-4 h-4 mr-3 text-red-500" /> Ephemeral Memory Wipes post-encryption</li>
                            </ul>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-1 md:order-2 bg-white/[0.02] backdrop-blur-md rounded-2xl p-6 font-mono text-sm text-slate-400 overflow-hidden border border-white/5 shadow-2xl relative group hover:border-red-500/30 transition-colors">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500 opacity-50"></div>
                            <div className="flex gap-2 mb-6">
                                <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                                <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                                <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
                            </div>
                            <pre className="opacity-90 overflow-x-auto leading-loose"><code>
                                <span className="text-purple-400">const</span> <span className="text-blue-400">iv</span> = window.crypto.getRandomValues(<span className="text-purple-400">new</span> Uint8Array(<span className="text-orange-300">12</span>));
                                <span className="text-purple-400">const</span> <span className="text-blue-400">encodedData</span> = <span className="text-purple-400">new</span> TextEncoder().encode(plaintextSeed);

                                <span className="text-slate-500">// Payload is encrypted BEFORE leaving device</span>
                                <span className="text-purple-400">const</span> encryptedBuffer = <span className="text-purple-400">await</span> window.crypto.subtle.encrypt(
                                {'{'} <span className="text-emerald-300">name</span>: <span className="text-emerald-300">"AES-GCM"</span>, iv {'}'},
                                keyMaterial,
                                encodedData
                                );
                            </code></pre>
                        </motion.div>
                    </section>

                    {/* Section 2 */}
                    <section className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white/[0.02] backdrop-blur-md aspect-square max-h-[400px] rounded-3xl flex items-center justify-center relative overflow-hidden border border-[#1152d4]/20 shadow-2xl">
                            <div className="absolute inset-0 bg-[#1152d4]/5 group-hover:bg-[#1152d4]/10 transition-colors"></div>
                            <div className="relative flex items-center justify-center w-full h-full">
                                <Server className="w-48 h-48 text-[#1152d4] opacity-20 blur-xl absolute" />
                                <Server className="w-32 h-32 text-[#1152d4] relative z-10 drop-shadow-[0_0_20px_rgba(17,82,212,0.6)]" />
                                <div className="absolute inset-4 grid grid-cols-2 grid-rows-2 gap-6 pointer-events-none opacity-50">
                                    <div className="border border-[#1152d4]/30 rounded-full w-20 h-20 self-end justify-self-end"></div>
                                    <div className="border border-[#1152d4]/30 rounded-full w-12 h-12 self-start justify-self-center mt-8"></div>
                                    <div className="border border-[#1152d4]/30 rounded-full w-16 h-16 self-center justify-self-start ml-4"></div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
                            <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-[#1152d4]/10 border border-[#1152d4]/20 text-[#1152d4] shadow-[0_0_20px_rgba(17,82,212,0.2)]">
                                <FileCode2 className="w-7 h-7" />
                            </div>
                            <h2 className="text-3xl font-bold text-slate-100 tracking-tight">Immutable Smart Contracts</h2>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                The protocol's heartbeat mechanism runs on Polygon smart contracts. These contracts are open-source, immutable, and strictly enforce the decay timers. Not even the protocol developers can alter your configuration or trigger a payout early.
                            </p>
                            <Link href="/docs/smart-contract" className="inline-flex items-center gap-2 text-[#1152d4] font-bold text-sm hover:underline hover:gap-3 transition-all">
                                Read Audit Reports <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </section>

                    {/* Bottom CTA Overlay block */}
                    <section className="relative pt-16">
                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white/[0.03] backdrop-blur-xl p-12 rounded-[3rem] border border-white/10 text-center overflow-hidden relative shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-[#1152d4]/10 opacity-50 pointer-events-none"></div>
                            <h2 className="text-4xl font-black mb-6 relative z-10 tracking-tight text-white">Trust Math, Not Humans.</h2>
                            <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto relative z-10 leading-relaxed">
                                Verify our cryptographic claims yourself. The code is entirely open-source, heavily audited, and designed for maximum paranoia.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                                <Link href="https://github.com/deadmanprotocol" className="bg-white text-[#0a0c10] px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all">
                                    View on GitHub
                                </Link>
                                <Link href="/docs" className="bg-white/[0.05] hover:bg-white/[0.1] px-10 py-4 rounded-full font-bold text-lg transition-all border border-white/10 text-white">
                                    Technical Whitepaper
                                </Link>
                            </div>
                        </motion.div>
                    </section>

                </div>
            </main>

            <SharedFooter />
        </div>
    )
}
