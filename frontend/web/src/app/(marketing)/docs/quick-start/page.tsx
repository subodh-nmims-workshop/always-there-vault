'use client';

import { motion } from 'framer-motion';
import { Wallet, ShieldCheck, Clock, Zap, Target, Activity, ChevronRight, AlertTriangle, Key } from 'lucide-react';
import Link from 'next/link';

export default function QuickStartPage() {
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
                    <Zap className="w-4 h-4" /> Go Live in 5 Minutes
                </div>
                <h1 className="text-4xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
                    Quick Start
                </h1>
                <p className="text-lg text-blue-100/70 font-medium leading-relaxed max-w-3xl">
                    Welcome to the Digital Will Protocol. In this guide, you will learn exactly how to use our decentralized application (dApp) to construct your first encrypted vault and assign your beneficiaries. No coding required.
                </p>
            </motion.div>

            <div className="space-y-12">

                {/* Step 1 */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={defaultTransition}
                    className="relative"
                >
                    <div className="flex items-start gap-6">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2b52ff] to-[#a259ff] flex items-center justify-center font-bold text-white text-xl shrink-0 shadow-[0_0_20px_rgba(43,82,255,0.4)]">
                            1
                        </div>
                        <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#2b52ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="flex items-center mb-4 relative z-10">
                                <Wallet className="w-8 h-8 text-[#2b52ff] mr-4" />
                                <h3 className="text-2xl font-bold text-white">Connect Your Web3 Wallet</h3>
                            </div>
                            <p className="text-blue-100/70 mb-6 font-medium leading-relaxed max-w-2xl relative z-10">
                                To interact with the Digital Will Protocol, you must prove your cryptographic identity. We do not use traditional usernames or passwords. Instead, click the "Launch App" button in the top right corner and connect your MetaMask, Trust Wallet, or WalletConnect compatible wallet.
                            </p>
                            <div className="bg-[#050a1a] rounded-xl border border-[#2b52ff]/20 p-5 shadow-inner relative z-10 flex items-center gap-4">
                                <ShieldCheck className="w-6 h-6 text-green-400 shrink-0" />
                                <p className="text-sm text-slate-300">
                                    Your wallet acts as your <strong className="text-white">Master Identity</strong>. The address you connect with will be the only entity capable of viewing your vault status or pinging the heartbeat contract.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Step 2 */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ ...defaultTransition, delay: 0.1 }}
                    className="relative"
                >
                    <div className="flex items-start gap-6">
                        <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-white text-xl shrink-0">
                            2
                        </div>
                        <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="flex items-center mb-4 relative z-10">
                                <Target className="w-8 h-8 text-purple-400 mr-4" />
                                <h3 className="text-2xl font-bold text-white">Configure the Vault</h3>
                            </div>
                            <p className="text-blue-100/70 mb-6 font-medium leading-relaxed max-w-2xl">
                                Once inside the dashboard, click "Create Vault". You will be presented with a secure form entirely isolated from our backend servers (Zero-Knowledge):
                            </p>

                            <ul className="space-y-4 mb-6 relative z-10">
                                <li className="flex items-start bg-white/[0.03] p-4 rounded-xl border border-white/5">
                                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 mr-4 shrink-0 shadow-[0_0_10px_purple]"></div>
                                    <div>
                                        <strong className="text-white block mb-1">Enter Master Secrets</strong>
                                        <span className="text-sm text-slate-400">Paste your cryptocurrency seed phrases, banking PINs, or private instructions. This data is encrypted immediately upon typing.</span>
                                    </div>
                                </li>
                                <li className="flex items-start bg-white/[0.03] p-4 rounded-xl border border-white/5">
                                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 mr-4 shrink-0 shadow-[0_0_10px_purple]"></div>
                                    <div>
                                        <strong className="text-white block mb-1">Set the Decay Timer</strong>
                                        <span className="text-sm text-slate-400">Choose how long the protocol should wait before assuming you are gone (e.g., 90 Days, 180 Days, 1 Year).</span>
                                    </div>
                                </li>
                                <li className="flex items-start bg-white/[0.03] p-4 rounded-xl border border-white/5">
                                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 mr-4 shrink-0 shadow-[0_0_10px_purple]"></div>
                                    <div>
                                        <strong className="text-white block mb-1">Assign Beneficiaries</strong>
                                        <span className="text-sm text-slate-400">Input the email addresses and public wallet addresses of the trusted individuals who should inherit your keys.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </motion.section>

                {/* Step 3 */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ ...defaultTransition, delay: 0.2 }}
                    className="relative"
                >
                    <div className="flex items-start gap-6">
                        <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-white text-xl shrink-0">
                            3
                        </div>
                        <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="flex items-center mb-4 relative z-10">
                                <Activity className="w-8 h-8 text-green-400 mr-4" />
                                <h3 className="text-2xl font-bold text-white">Submit Heartbeats (Stay Alive)</h3>
                            </div>
                            <p className="text-blue-100/70 mb-6 font-medium leading-relaxed max-w-2xl relative z-10">
                                After your vault is deployed to the Polygon blockchain, your only responsibility is to periodically visit the application and click the <strong>Ping Heartbeat</strong> button.
                            </p>

                            <div className="bg-[#050a1a] rounded-xl border border-white/10 p-5 shadow-inner relative z-10 flex items-start gap-4">
                                <Clock className="w-6 h-6 text-orange-400 shrink-0 mt-1" />
                                <div>
                                    <h4 className="text-white font-bold mb-1">The Countdown Clock</h4>
                                    <p className="text-sm text-slate-300 leading-relaxed">
                                        Pinging the heartbeat requires mapping a free, gasless cryptographic signature using your connected wallet. This resets your decay timer back to its maximum duration. If you fail to ping before the timer hits zero, the smart contract unlocks, and your beneficiaries will receive the decryption keys.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Step 4 */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ ...defaultTransition, delay: 0.3 }}
                    className="relative"
                >
                    <div className="flex items-start gap-6">
                        <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-white text-xl shrink-0">
                            4
                        </div>
                        <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="flex items-center mb-4 relative z-10">
                                <AlertTriangle className="w-8 h-8 text-red-500 mr-4" />
                                <h3 className="text-2xl font-bold text-white">The Inevitable (Missed Heartbeat)</h3>
                            </div>
                            <p className="text-blue-100/70 mb-6 font-medium leading-relaxed max-w-2xl relative z-10">
                                If tragedy strikes or you become incapacitated, the countdown timer will eventually reach zero. When this happens, our decentralized node network detects the state change on the blockchain.
                            </p>

                            <div className="bg-[#050a1a] rounded-xl border border-red-500/20 p-5 shadow-inner relative z-10">
                                <p className="text-sm text-slate-300 leading-relaxed">
                                    The smart contract state violently shifts from <strong className="text-green-400">SECURED</strong> to <strong className="text-red-500">[RELEASABLE]</strong>. At this exact moment, automated cryptographic webhooks begin firing. The protocol has now entered the post-death execution phase, locking out the master wallet and preparing the data shards for your beneficiaries.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* Step 5 */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ ...defaultTransition, delay: 0.4 }}
                    className="relative"
                >
                    <div className="flex items-start gap-6">
                        <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-white text-xl shrink-0">
                            5
                        </div>
                        <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 relative overflow-hidden group shadow-2xl shadow-green-900/10">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#a259ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="flex items-center mb-4 relative z-10">
                                <Key className="w-8 h-8 text-[#a259ff] mr-4" />
                                <h3 className="text-2xl font-bold text-white">Beneficiary Claim Process</h3>
                            </div>
                            <p className="text-blue-100/70 mb-6 font-medium leading-relaxed max-w-2xl relative z-10">
                                Within minutes of the contract unlocking, the designated individuals receive a secure email containing a one-time DWP access link.
                            </p>

                            <ul className="space-y-4 relative z-10">
                                <li className="flex items-start bg-[#050a1a] p-4 rounded-xl border border-white/5 shadow-inner">
                                    <div className="w-2 h-2 rounded-full bg-[#a259ff] mt-2 mr-4 shrink-0 shadow-[0_0_10px_#a259ff]"></div>
                                    <div>
                                        <strong className="text-white block mb-1">Identity Verification</strong>
                                        <span className="text-sm text-slate-400">Beneficiaries must connect the exact Web3 addresses you pre-authorized to prove cryptographically that they are the intended recipients.</span>
                                    </div>
                                </li>
                                <li className="flex items-start bg-[#050a1a] p-4 rounded-xl border border-white/5 shadow-inner">
                                    <div className="w-2 h-2 rounded-full bg-[#a259ff] mt-2 mr-4 shrink-0 shadow-[0_0_10px_#a259ff]"></div>
                                    <div>
                                        <strong className="text-white block mb-1">Shard Reconstruction</strong>
                                        <span className="text-sm text-slate-400">The protocol automatically queries the decentralized network to gather the N-of-M Shamir Secret shards necessary to rebuild the original AES-256 decryption key.</span>
                                    </div>
                                </li>
                                <li className="flex items-start bg-[#050a1a] p-4 rounded-xl border border-white/5 shadow-inner">
                                    <div className="w-2 h-2 rounded-full bg-[#a259ff] mt-2 mr-4 shrink-0 shadow-[0_0_10px_#a259ff]"></div>
                                    <div>
                                        <strong className="text-white block mb-1">Zero-Knowledge Decryption</strong>
                                        <span className="text-sm text-slate-400">The IPFS payload is downloaded directly to the beneficiary's browser where it is decrypted locally. Your ultimate legacy—seed phrases, PINs, or instructions—is finally revealed to them, completely bypassing any centralized authority.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </motion.section>

            </div>

            <div className="mt-20 pt-10 border-t border-white/10 flex justify-between items-center">
                <Link href="/docs" className="flex items-center text-slate-400 hover:text-white transition-colors text-sm font-bold">
                    Previous: Introduction
                </Link>
                <Link href="/docs/security-prerequisites" className="flex items-center text-[#2b52ff] hover:text-white transition-colors text-sm font-bold">
                    Next: Security Prerequisites <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
            </div>
        </>
    );
}
