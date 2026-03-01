'use client';

import { motion } from 'framer-motion';
import { BookOpen, Shield, Zap, Network, Clock, Lock, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function DocsPage() {
    const defaultTransition = { duration: 0.8, ease: "easeOut" as any };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={defaultTransition}
                className="mb-16"
            >
                <div className="inline-flex items-center gap-2 mb-6 text-sm font-semibold text-[#2b52ff] uppercase tracking-widest bg-[#2b52ff]/10 border border-[#2b52ff]/20 px-3 py-1 rounded-full">
                    <BookOpen className="w-4 h-4" /> v1.2 Protocol
                </div>
                <h1 className="text-4xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
                    Introduction to DWP
                </h1>
                <p className="text-lg text-blue-100/70 font-medium leading-relaxed max-w-3xl">
                    The Decentralized Digital Will Protocol (DWP) is a high-security, Zero-Knowledge cryptographic engine explicitly designed to solve the problem of digital inheritance and dead-man switching in a trustless environment.
                </p>
            </motion.div>

            <div className="space-y-16">

                {/* The Core Problem */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={defaultTransition}
                    className="grid md:grid-cols-2 gap-8"
                >
                    <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 hover:bg-white/[0.04] transition-colors relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <Lock className="w-10 h-10 text-red-400 mb-6 relative z-10" />
                        <h3 className="text-2xl font-bold text-white mb-4 relative z-10">The Core Problem</h3>
                        <p className="text-blue-100/70 leading-relaxed relative z-10">
                            Modern digital wealth (cryptocurrency seed phrases, hardware wallet PINs, critical 2FA backup codes) is highly secured but structurally fragile. If the sole owner loses the ability to transmit this data (due to incapacitation or death), the assets are permanently burned and lost to their beneficiaries.
                        </p>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 hover:bg-white/[0.04] transition-colors relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <Shield className="w-10 h-10 text-green-400 mb-6 relative z-10" />
                        <h3 className="text-2xl font-bold text-white mb-4 relative z-10">The DWP Solution</h3>
                        <p className="text-blue-100/70 leading-relaxed relative z-10">
                            DWP allows an individual to cryptographically lock their secrets inside a decentralized vault that automatically hands over the decryption keys to designated wallet addresses if, and only if, the owner fails to emit a cryptographic "heartbeat" within a predefined decaying time limit.
                        </p>
                    </div>
                </motion.section>

                {/* What the application does */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={defaultTransition}
                    className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 lg:p-12 relative overflow-hidden shadow-2xl shadow-black/20"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#2b52ff]/5 rounded-full blur-[100px]"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold text-white mb-8 tracking-tight flex items-center">
                            <Network className="w-8 h-8 text-[#2b52ff] mr-4" /> How It Works
                        </h2>

                        <div className="space-y-6">

                            <div className="bg-[#050a1a] p-6 rounded-xl border border-white/10 shadow-inner flex flex-col md:flex-row gap-6 items-start">
                                <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center font-bold text-blue-400 shrink-0">1</div>
                                <div>
                                    <h4 className="text-xl font-bold text-white mb-2">Zero-Knowledge Encryption</h4>
                                    <p className="text-blue-100/70 leading-relaxed">
                                        The user pastes their highly sensitive data into their browser. Before it ever leaves their device, the web application generates an AES-256 key and encrypts the payload locally. The raw data never touches any server.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-[#050a1a] p-6 rounded-xl border border-white/10 shadow-inner flex flex-col md:flex-row gap-6 items-start">
                                <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center font-bold text-purple-400 shrink-0">2</div>
                                <div>
                                    <h4 className="text-xl font-bold text-white mb-2">Key Sharding & Storage</h4>
                                    <p className="text-blue-100/70 leading-relaxed">
                                        The AES key required to open the payload is shattered into 5 cryptographic fragments using Shamir's Secret Sharing. The encrypted blob is pushed to the decentralized IPFS network, making it un-censorable and permanent.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-[#050a1a] p-6 rounded-xl border border-white/10 shadow-inner flex flex-col md:flex-row gap-6 items-start">
                                <div className="w-12 h-12 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center font-bold text-orange-400 shrink-0">3</div>
                                <div>
                                    <h4 className="text-xl font-bold text-white mb-2">Temporal Smart Contracts</h4>
                                    <p className="text-blue-100/70 leading-relaxed">
                                        A smart contract is deployed to Polygon. It holds the IPFS reference and a timestamp. The user must periodically prove they are alive by signing a free <code>pulse()</code> transaction (a heartbeat). This resets the countdown timer on the blockchain.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-[#0a1536] p-6 rounded-xl border border-green-500/20 shadow-inner flex flex-col md:flex-row gap-6 items-start relative overflow-hidden">
                                <div className="absolute inset-0 bg-green-500/5"></div>
                                <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center font-bold text-green-400 shrink-0 relative z-10">4</div>
                                <div className="relative z-10">
                                    <h4 className="text-xl font-bold text-green-400 mb-2">Automated Beneficiary Release</h4>
                                    <p className="text-blue-100/70 leading-relaxed">
                                        If the user fails to ping the contract before the timer reaches absolute zero, the contract violently transitions to a <code>[RELEASABLE]</code> state. The decentralized node network observes this blockchain state, reconstructing the shattered AES key and securely transmitting it directly to the predefined beneficiary wallets/emails.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </motion.section>

            </div>

            <div className="mt-20 pt-10 border-t border-white/10 flex justify-between items-center">
                <div /> {/* Empty div to align right link properly */}
                <Link href="/docs/quick-start" className="flex items-center text-[#2b52ff] hover:text-white transition-colors text-sm font-bold">
                    Next: Quick Start <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
            </div>
        </>
    );
}
