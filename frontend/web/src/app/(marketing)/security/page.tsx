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
import { SecuritySimulator } from '@/components/security-simulator'

export default function SecurityPage() {
    const defaultTransition = { duration: 0.6, ease: "easeOut" as const }

    return (
        <div className="w-full font-sans dark:text-slate-100 selection:bg-[#1152d4]/30 relative transition-colors duration-300 bg-transparent text-slate-800">
            
            

            <main className="flex-1 flex flex-col relative w-full items-center">
                {/* Header */}
                <header className="relative pt-24 pb-16 px-6 text-center w-full max-w-5xl">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-500/10 blur-[120px] rounded-full"></div>
                    </div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={defaultTransition} className="inline-flex items-center bg-slate-100 dark:bg-slate-50 dark:bg-white/[0.03] backdrop-blur-md px-4 py-1.5 rounded-full border border-red-500/30 mb-6">
                        <span className="text-[10px] font-black tracking-[0.2em] text-red-500">THREAT MODEL REPORT</span>
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...defaultTransition, delay: 0.1 }} className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight text-slate-900 dark:text-slate-900 dark:text-white">
                        Uncompromising <span className="text-red-500">Security</span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...defaultTransition, delay: 0.2 }} className="max-w-2xl mx-auto text-slate-600 dark:text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                        AlwaysThere assumes servers are compromised. We build exclusively on client-side encryption and decentralized consensus.
                    </motion.p>
                </header>

                {/* Security Content */}
                <div className="space-y-24 px-6 pb-32 max-w-5xl w-full">
                    {/* Cryptography Playground Simulator */}
                    <section className="w-full">
                        <SecuritySimulator />
                    </section>

                    {/* Section 1 */}
                    <section className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-2 md:order-1 space-y-6">
                            <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                                <LockKeyhole className="w-7 h-7" />
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Client-Side AES-256-GCM</h2>
                            <p className="text-slate-600 dark:text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                                Your seeds, passwords, and documents are encrypted directly in your browser using the wildly standard WebCrypto API before any data is transmitted to an IPFS node. Even if our servers are fully breached, the attackers only recover cipher-text.
                            </p>
                            <ul className="space-y-3 pt-2">
                                <li className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-750 dark:text-slate-300"><CheckCircle2 className="w-4 h-4 mr-3 text-red-500" /> WebCrypto Subsystem Isolation</li>
                                <li className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-750 dark:text-slate-300"><CheckCircle2 className="w-4 h-4 mr-3 text-red-500" /> Ephemeral Memory Wipes post-encryption</li>
                            </ul>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-1 md:order-2 bg-slate-50 dark:bg-slate-50 dark:bg-white/[0.02] backdrop-blur-md rounded-2xl p-6 font-mono text-sm text-slate-700 dark:text-slate-600 dark:text-slate-400 overflow-hidden border border-slate-200 dark:border-slate-200 dark:border-white/5 shadow-2xl relative group hover:border-red-500/30 transition-colors">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500 opacity-50"></div>
                            <div className="flex gap-2 mb-6">
                                <div className="w-3 h-3 rounded-full bg-slate-400 dark:bg-slate-600"></div>
                                <div className="w-3 h-3 rounded-full bg-slate-400 dark:bg-slate-600"></div>
                                <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
                            </div>
                            <pre className="opacity-90 overflow-x-auto leading-loose text-slate-800 dark:text-slate-750 dark:text-slate-300"><code>
                                <span className="text-purple-600 dark:text-purple-400">const</span> <span className="text-blue-600 dark:text-blue-400">iv</span> = window.crypto.getRandomValues(<span className="text-purple-600 dark:text-purple-400">new</span> Uint8Array(<span className="text-orange-600 dark:text-orange-300">12</span>));
                                <span className="text-purple-600 dark:text-purple-400">const</span> <span className="text-blue-600 dark:text-blue-400">encodedData</span> = <span className="text-purple-600 dark:text-purple-400">new</span> TextEncoder().encode(plaintextSeed);

                                <span className="text-slate-500">{"// Payload is encrypted BEFORE leaving device"}</span>
                                <span className="text-purple-600 dark:text-purple-400">const</span> encryptedBuffer = <span className="text-purple-600 dark:text-purple-400">await</span> window.crypto.subtle.encrypt(
                                {'{'} <span className="text-emerald-600 dark:text-emerald-300">name</span>: <span className="text-emerald-600 dark:text-emerald-300">"AES-GCM"</span>, iv {'}'},
                                keyMaterial,
                                encodedData
                                );
                            </code></pre>
                        </motion.div>
                    </section>

                    {/* Section 2 */}
                    <section className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-slate-50 dark:bg-slate-50 dark:bg-white/[0.02] backdrop-blur-md aspect-square max-h-[400px] rounded-3xl flex items-center justify-center relative overflow-hidden border border-slate-200 dark:border-[#1152d4]/20 shadow-2xl">
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
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Immutable Smart Contracts</h2>
                            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                                The protocol's heartbeat mechanism runs on Polygon smart contracts. These contracts are open-source and strictly enforce decay timers. The emergency pause capability exists only to freeze new registrations during active exploits—it can never delay or block a beneficiary's already-eligible payout.
                            </p>
                            <Link href="/docs" className="inline-flex items-center gap-2 text-[#1152d4] font-bold text-sm hover:underline hover:gap-3 transition-all">
                                Read Technical Docs <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </section>

                    {/* Bottom CTA Overlay block */}
                    <section className="relative pt-16">
                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-slate-50 dark:bg-slate-50 dark:bg-white/[0.03] backdrop-blur-xl p-12 rounded-[3rem] border border-slate-200 dark:border-slate-200 dark:border-white/10 text-center overflow-hidden relative shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-[#1152d4]/10 opacity-50 pointer-events-none"></div>
                            <h2 className="text-4xl font-black mb-6 relative z-10 tracking-tight text-slate-900 dark:text-slate-900 dark:text-white">Trust Math, Not Humans.</h2>
                            <p className="text-slate-600 dark:text-slate-600 dark:text-slate-400 text-lg mb-10 max-w-2xl mx-auto relative z-10 leading-relaxed">
                                Verify our cryptographic claims yourself. The code is entirely open-source, publicly verifiable, and designed for maximum paranoia.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                                <Link href="https://github.com/subodh-001/decentralized-digital-will-protocol" className="bg-slate-900 text-white dark:bg-white dark:text-[#0a0c10] px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all">
                                    View on GitHub
                                </Link>
                                <Link href="/docs" className="bg-slate-200/50 dark:bg-white/[0.05] hover:bg-slate-200 dark:hover:bg-white/[0.1] px-10 py-4 rounded-full font-bold text-lg transition-all border border-slate-300 dark:border-white/10 text-slate-800 dark:text-white">
                                    Technical Whitepaper
                                </Link>
                            </div>
                        </motion.div>
                    </section>

                    {/* Threat Model section */}
                    <section className="mt-32 border-t border-slate-200 dark:border-slate-200 dark:border-white/10 pt-20">
                        <div className="max-w-4xl mx-auto space-y-12">
                            <div className="text-center space-y-4">
                                <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-900 dark:text-white">Adversarial Threat Models</h2>
                                <p className="text-xl text-slate-600 dark:text-slate-600 dark:text-slate-400">How we mitigate state-level actors, malicious insiders, and infrastructure collapse.</p>
                            </div>

                            <div className="space-y-12">
                                <div className="bg-slate-50 dark:bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-slate-200 dark:border-white/5 p-8 rounded-2xl flex flex-col md:flex-row gap-8">
                                    <div className="md:w-1/3">
                                        <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Scenario 1: Complete Database Breach</h3>
                                    </div>
                                    <div className="md:w-2/3 space-y-4">
                                        <p className="text-slate-600 dark:text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                            <strong className="text-slate-900 dark:text-slate-900 dark:text-slate-900 dark:text-white block mb-1">The Threat:</strong> Hackers compromise our backend database (MongoDB) and gain access to all records.
                                        </p>
                                        <p className="text-emerald-700 dark:text-emerald-400 leading-relaxed text-sm bg-emerald-500/5 dark:bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/10 dark:border-emerald-500/20">
                                            <strong className="text-emerald-800 dark:text-emerald-300 block mb-1">The Defense:</strong> They acquire nothing actionable. Our database only stores the IPFS hash (CID) pointing to your ciphertext payload and encrypted Shamir shares. Without your precise Decryption Key Sequence (which remains client-side), it is mathematically impossible to read your will.
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-slate-50 dark:bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-slate-200 dark:border-white/5 p-8 rounded-2xl flex flex-col md:flex-row gap-8">
                                    <div className="md:w-1/3">
                                        <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Scenario 2: Malicious Validator Node</h3>
                                    </div>
                                    <div className="md:w-2/3 space-y-4">
                                        <p className="text-slate-600 dark:text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                            <strong className="text-slate-900 dark:text-slate-900 dark:text-slate-900 dark:text-white block mb-1">The Threat:</strong> A node operator attempts to prematurely release your inheritance or steal your data.
                                        </p>
                                        <p className="text-emerald-700 dark:text-emerald-400 leading-relaxed text-sm bg-emerald-500/5 dark:bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/10 dark:border-emerald-500/20">
                                            <strong className="text-emerald-800 dark:text-emerald-300 block mb-1">The Defense:</strong> The threshold signature scheme requires an m-of-n consensus. A single malicious node cannot recreate the key. Furthermore, the nodes don't have the final decryption key—they only hold encrypted shards meant strictly for the beneficiary's public wallet address.
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-slate-50 dark:bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-slate-200 dark:border-white/5 p-8 rounded-2xl flex flex-col md:flex-row gap-8">
                                    <div className="md:w-1/3">
                                        <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Scenario 3: AWS / Server Takedown</h3>
                                    </div>
                                    <div className="md:w-2/3 space-y-4">
                                        <p className="text-slate-600 dark:text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                            <strong className="text-slate-900 dark:text-slate-900 dark:text-slate-900 dark:text-white block mb-1">The Threat:</strong> The core development team is coerced or physical servers are seized by authorities.
                                        </p>
                                        <p className="text-emerald-700 dark:text-emerald-400 leading-relaxed text-sm bg-emerald-500/5 dark:bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/10 dark:border-emerald-500/20">
                                            <strong className="text-emerald-800 dark:text-emerald-300 block mb-1">The Defense:</strong> Asset storage exists entirely on the decentralized IPFS network (via Storacha), secured by native Polygon smart contracts. The execution of the decay timer and release protocols occurs purely on-chain, requiring zero centralized infrastructure to execute successfully.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </main>

            
        </div>
    )
}
