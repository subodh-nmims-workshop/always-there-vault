'use client'

import { motion } from 'framer-motion'
import {
    Shield,
    Key,
    Zap,
    ArrowRight,
    MonitorSmartphone,
    ServerCrash
} from 'lucide-react'
import Link from 'next/link'
import { SharedFooter } from '@/components/shared-footer'

export default function FeaturesPage() {
    const defaultTransition = { duration: 0.6, ease: "easeOut" as const }

    return (
        <div className="min-h-screen bg-[#0a0c10] font-sans text-slate-100 selection:bg-[#1152d4]/30 flex flex-col overflow-x-hidden relative">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-[#0a0c10]/80 backdrop-blur-xl border-b border-white/5 px-4 sm:px-8 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="text-[#1152d4] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Shield className="w-8 h-8" />
                    </div>
                    <span className="font-bold text-xl tracking-tight hidden sm:block">LASTWISH</span>
                </Link>
                <div className="hidden md:flex gap-8 items-center absolute left-1/2 -translate-x-1/2">
                    <Link href="/features" className="text-white transition-colors text-sm font-medium">Features</Link>
                    <Link href="/docs" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Documentation</Link>
                    <Link href="/security" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Security</Link>
                </div>
                <Link href="/" className="bg-[#1152d4] hover:bg-[#1152d4]/80 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-[0_0_20px_rgba(17,82,212,0.4)]">
                    Launch App
                </Link>
            </nav>

            <main className="flex-1 flex flex-col relative w-full items-center">
                {/* Header */}
                <header className="relative pt-24 pb-16 px-6 text-center w-full max-w-5xl">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#1152d4]/20 blur-[120px] rounded-full"></div>
                    </div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={defaultTransition} className="inline-flex items-center bg-white/[0.03] backdrop-blur-md px-4 py-1.5 rounded-full border border-[#1152d4]/30 mb-6">
                        <span className="text-[10px] font-black tracking-[0.2em] text-[#1152d4]">TECHNICAL SPECIFICATIONS</span>
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...defaultTransition, delay: 0.1 }} className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
                        Core Protocol <span className="text-[#1152d4]">Features</span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...defaultTransition, delay: 0.2 }} className="max-w-2xl mx-auto text-slate-400 text-lg leading-relaxed">
                        A trustless fail-safe mechanism for the decentralized future. Automated, secure, and permanent.
                    </motion.p>
                </header>

                {/* Features Content */}
                <div className="space-y-24 px-6 pb-32 max-w-5xl w-full">

                    {/* Feature 1 */}
                    <section className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-2 md:order-1 space-y-6">
                            <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-[#1152d4]/10 border border-[#1152d4]/20 text-[#1152d4] shadow-[0_0_20px_rgba(17,82,212,0.2)]">
                                <Shield className="w-7 h-7" />
                            </div>
                            <h2 className="text-3xl font-bold text-slate-100 tracking-tight">Trustless Asset Recovery</h2>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                Automatically trigger encrypted payload transfers to designated beneficiary wallets if no activity is detected within your custom heartbeat interval. Fully non-custodial and secure.
                            </p>
                            <Link href="/docs/smart-contract" className="inline-flex items-center gap-2 text-[#1152d4] font-bold text-sm hover:underline hover:gap-3 transition-all">
                                Explore Recovery Logic <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-1 md:order-2 bg-white/[0.02] backdrop-blur-md rounded-2xl p-6 font-mono text-sm text-emerald-500 overflow-hidden border border-white/5 shadow-2xl relative group hover:border-[#1152d4]/30 transition-colors">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1152d4] to-emerald-500 opacity-50"></div>
                            <div className="flex gap-2 mb-6">
                                <div className="w-3 h-3 rounded-full bg-red-500/30"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/30"></div>
                                <div className="w-3 h-3 rounded-full bg-emerald-500/30"></div>
                            </div>
                            <pre className="opacity-90 overflow-x-auto leading-loose"><code>
                                <span className="text-pink-500">function</span> <span className="text-blue-400">triggerRecovery</span>() <span className="text-pink-500">external</span> {'{'}
                                <span className="text-yellow-300">require</span>(block.timestamp &gt; lastHeartbeat + timeout);
                                <span className="text-yellow-300">require</span>(status == Status.Active);

                                <span className="text-pink-500">for</span> (<span className="text-slate-300">uint</span> i = 0; i &lt; beneficiaries.length; i++) {'{'}
                                transfer(beneficiaries[i], allocation[i]);
                                {'}'}

                                <span className="text-blue-400">emit</span> AssetsRecovered(block.timestamp);
                                {'}'}
                            </code></pre>
                        </motion.div>
                    </section>

                    {/* Feature 2 */}
                    <section className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white/[0.02] backdrop-blur-md aspect-square max-h-[400px] rounded-3xl flex items-center justify-center relative overflow-hidden border border-[#8b5cf6]/20 shadow-2xl">
                            <div className="absolute inset-0 bg-[#8b5cf6]/5 group-hover:bg-[#8b5cf6]/10 transition-colors"></div>
                            <div className="relative flex items-center justify-center w-full h-full">
                                <Key className="w-48 h-48 text-[#8b5cf6] opacity-20 blur-xl absolute" />
                                <Key className="w-32 h-32 text-[#8b5cf6] relative z-10 drop-shadow-[0_0_20px_rgba(139,92,246,0.6)]" />
                                <div className="absolute inset-4 grid grid-cols-3 grid-rows-3 gap-6 pointer-events-none opacity-50">
                                    <div className="border-2 border-[#8b5cf6]/20 rounded-xl backdrop-blur-sm"></div>
                                    <div className="border-2 border-[#8b5cf6]/20 rounded-xl backdrop-blur-sm translate-x-6"></div>
                                    <div className="border-2 border-[#8b5cf6]/20 rounded-xl backdrop-blur-sm -translate-y-6"></div>
                                    <div className="border-2 border-[#8b5cf6]/20 rounded-xl backdrop-blur-sm translate-y-6"></div>
                                    <div className="border-2 border-[#8b5cf6]/20 rounded-xl backdrop-blur-sm"></div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
                            <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 text-[#8b5cf6] shadow-[0_0_20px_rgba(139,92,246,0.2)]">
                                <ServerCrash className="w-7 h-7" />
                            </div>
                            <h2 className="text-3xl font-bold text-slate-100 tracking-tight">Decentralized Key Sharding</h2>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                Utilizing Shamir's Secret Sharing, your master encryption keys are split into multiple fragments distributed across our secure validator network. There is no single point of failure, and we never hold your complete key.
                            </p>
                            <Link href="/docs/shamir-sdk" className="inline-flex items-center gap-2 text-[#8b5cf6] font-bold text-sm hover:underline hover:gap-3 transition-all">
                                View Sharding Protocol <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </section>

                    {/* Feature 3 */}
                    <section className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-2 md:order-1 space-y-6">
                            <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                                <Zap className="w-7 h-7" />
                            </div>
                            <h2 className="text-3xl font-bold text-slate-100 tracking-tight">Gasless Verifications</h2>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                Update your protocol status via off-chain signatures wrapped in native ERC-4337 meta-transactions. Gasless heartbeats allow you to maintain your fail-safe without constant transaction fees.
                            </p>
                            <Link href="/docs/zero-knowledge" className="inline-flex items-center gap-2 text-emerald-400 font-bold text-sm hover:underline hover:gap-3 transition-all">
                                How it works <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-1 md:order-2 bg-white/[0.02] backdrop-blur-md rounded-3xl p-10 border border-emerald-500/20 flex flex-col justify-center min-h-[320px] shadow-2xl relative group">
                            <div className="w-full h-40 relative flex items-end">
                                <div className="absolute inset-0 grid grid-cols-8 grid-rows-4 opacity-[0.05] pointer-events-none">
                                    {Array.from({ length: 32 }).map((_, i) => (
                                        <div key={i} className={`border-slate-100 ${i % 8 !== 7 ? 'border-r' : ''} ${i < 24 ? 'border-b' : ''}`}></div>
                                    ))}
                                </div>

                                {/* Mock Chart SVG */}
                                <svg className="w-full h-full text-emerald-500 drop-shadow-[0_0_12px_rgba(16,185,129,0.5)] overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 40">
                                    <path d="M0,35 L10,35 L15,10 L20,38 L25,35 L40,35 L45,5 L50,39 L55,35 L70,35 L75,15 L80,38 L85,35 L100,35" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:stroke-[2.5px] transition-all" />
                                    {/* Pulse dots */}
                                    <circle cx="15" cy="10" r="1.5" fill="currentColor" className="animate-pulse" />
                                    <circle cx="45" cy="5" r="1.5" fill="currentColor" className="animate-pulse" />
                                    <circle cx="75" cy="15" r="1.5" fill="currentColor" className="animate-pulse" />
                                </svg>
                            </div>

                            <div className="mt-8 flex justify-between items-center text-xs uppercase font-bold text-slate-500 tracking-widest border-t border-white/5 pt-6">
                                <span className="flex items-center"><MonitorSmartphone className="w-4 h-4 mr-2" /> Liveness Check</span>
                                <span className="text-emerald-500 flex items-center bg-emerald-500/10 px-3 py-1 rounded-full"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-2"></div> Active Pulse</span>
                            </div>
                        </motion.div>
                    </section>

                    {/* Bottom CTA Overlay block */}
                    <section className="relative pt-16">
                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white/[0.03] backdrop-blur-xl p-12 rounded-[3rem] border border-white/10 text-center overflow-hidden relative shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#1152d4]/10 via-transparent to-[#8b5cf6]/10 opacity-50 pointer-events-none"></div>
                            <h2 className="text-4xl font-black mb-6 relative z-10 tracking-tight text-white">Secure Your Legacy</h2>
                            <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto relative z-10 leading-relaxed">
                                Don't leave your digital assets in limbo. Deploy your DeadMan switch today and ensure your wealth reaches the right hands.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                                <Link href="/" className="bg-[#1152d4] hover:bg-[#1152d4]/80 text-white px-10 py-4 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(17,82,212,0.4)] hover:scale-105 transition-all">
                                    Connect Wallet
                                </Link>
                                <Link href="/docs" className="bg-white/[0.05] hover:bg-white/[0.1] px-10 py-4 rounded-full font-bold text-lg transition-all border border-white/10 text-white">
                                    Read Documentation
                                </Link>
                            </div>
                        </motion.div>
                    </section>

                    {/* Deep Explanation Section */}
                    <section className="mt-32 border-t border-white/10 pt-20">
                        <div className="max-w-4xl mx-auto space-y-12">
                            <div className="text-center space-y-4">
                                <h2 className="text-4xl font-bold tracking-tight text-white">How LASTWISH Actually Works</h2>
                                <p className="text-xl text-slate-400">A deep dive into the decentralized architecture securing your digital legacy.</p>
                            </div>

                            <div className="space-y-16">
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-bold tracking-tight text-blue-400 flex items-center gap-3">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 text-sm">1</span>
                                        Asset Encryption Pipeline
                                    </h3>
                                    <p className="text-slate-300 leading-relaxed text-lg">
                                        When you upload an asset (like a private key, a legal document, or a seed phrase), the protocol never sees the raw data. It is instantly encrypted in your browser using AES-256-GCM encryption. The master key generated to encrypt this payload is then passed through our Shamir Secret Sharing algorithm, which shatters the key into multiple cryptographic shards.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-2xl font-bold tracking-tight text-purple-400 flex items-center gap-3">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 text-sm">2</span>
                                        Decentralized Storage (IPFS)
                                    </h3>
                                    <p className="text-slate-300 leading-relaxed text-lg">
                                        The securely encrypted payload is uploaded directly to the InterPlanetary File System (IPFS) via Storacha. IPFS ensures that your data is not stored on a centralized server that can be shut down, hacked, or censored. Your data becomes a permanent part of the decentralized web, accessible via a unique Content Identifier (CID).
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-2xl font-bold tracking-tight text-emerald-400 flex items-center gap-3">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 text-sm">3</span>
                                        The Smart Contract Heartbeat
                                    </h3>
                                    <p className="text-slate-300 leading-relaxed text-lg">
                                        To prove you are alive, you periodically "check in" with the Ethereum/Polygon smart contract. This is known as a Heartbeat. You set the interval (e.g., every 3 months). If you fail to check in within this timeframe, the contract enters a "Grace Period". If the grace period expires, the smart contract officially flags your status as "Inactive".
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-2xl font-bold tracking-tight text-orange-400 flex items-center gap-3">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 text-sm">4</span>
                                        Automated Beneficiary Release
                                    </h3>
                                    <p className="text-slate-300 leading-relaxed text-lg">
                                        Once the smart contract confirms your inactivity, it automatically triggers the release mechanism. The validating nodes compile the necessary key shards and encrypt them using the public keys of your designated beneficiaries. Your beneficiaries can then claim the IPFS payload, decrypt the master key with their private wallet, and finally unlock the inheritance. The system is 100% automated and zero-knowledge.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </main>

            <SharedFooter />
        </div>
    )
}
