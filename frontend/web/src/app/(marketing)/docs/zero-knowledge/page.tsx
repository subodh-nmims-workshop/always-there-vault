'use client';

import { motion } from 'framer-motion';
import { Network, ServerOff, CheckCircle, ChevronRight, Fingerprint } from 'lucide-react';
import Link from 'next/link';

export default function ZeroKnowledgePage() {
    const defaultTransition = { duration: 0.8, ease: "easeOut" as any };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={defaultTransition}
                className="mb-16"
            >
                <div className="inline-flex items-center gap-2 mb-6 text-sm font-semibold text-green-400 uppercase tracking-widest bg-green-400/10 border border-green-400/20 px-3 py-1 rounded-full">
                    <ServerOff className="w-4 h-4" /> Trustless Design
                </div>
                <h1 className="text-4xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
                    Zero-Knowledge Architecture
                </h1>
                <p className="text-lg text-blue-100/70 font-medium leading-relaxed max-w-3xl">
                    "Zero-Knowledge" (ZK) in the context of the Digital Will Protocol means that neither our servers, your application servers, nor the blockchain nodes ever have access to the unencrypted assets of the vault creator.
                </p>
            </motion.div>

            <div className="space-y-16">

                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 lg:p-12 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-green-400/5 rounded-full blur-[80px]"></div>

                    <h3 className="text-3xl font-bold text-white mb-8 relative z-10 flex items-center">
                        <Fingerprint className="w-8 h-8 mr-4 text-green-400" />
                        The Disconnect Principle
                    </h3>

                    <p className="text-blue-100/70 leading-relaxed mb-8 max-w-3xl text-lg relative z-10">
                        Traditional custodial systems (like password managers or centralized exchanges) secure your data by encrypting it, but they hold the master decryption key on their servers.
                        If they are subpoenaed, hacked, or structurally compromised, your data is exposed.
                        <br /><br />
                        DWP separates the **storage** of data from the **decryption keys**.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 relative z-10">
                        <div className="bg-[#050a1a] p-6 rounded-xl border border-white/10 shadow-inner">
                            <h4 className="text-red-400 font-bold mb-3 flex items-center"><ServerOff className="w-5 h-5 mr-2" /> What We Don't Know</h4>
                            <ul className="space-y-3 text-sm text-slate-300">
                                <li className="flex items-start"><CheckCircle className="w-4 h-4 text-slate-600 mr-2 mt-0.5" /> What the payload contains (seed phrase, notes)</li>
                                <li className="flex items-start"><CheckCircle className="w-4 h-4 text-slate-600 mr-2 mt-0.5" /> What the symmetric AES key is</li>
                                <li className="flex items-start"><CheckCircle className="w-4 h-4 text-slate-600 mr-2 mt-0.5" /> Which IPFS node physically stores the blob</li>
                            </ul>
                        </div>
                        <div className="bg-[#0a1536] p-6 rounded-xl border border-[#2b52ff]/20 shadow-inner relative overflow-hidden">
                            <div className="absolute inset-0 bg-[#2b52ff]/5"></div>
                            <h4 className="text-green-400 font-bold mb-3 flex items-center relative z-10"><Network className="w-5 h-5 mr-2" /> What We Do Know</h4>
                            <ul className="space-y-3 text-sm text-slate-300 relative z-10">
                                <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5" /> The EVM smart contract address of the Vault</li>
                                <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5" /> When the last heartbeat (EIP-4361 signature) occurred</li>
                                <li className="flex items-start"><CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5" /> The public addresses of the assigned beneficiaries</li>
                            </ul>
                        </div>
                    </div>
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-2xl font-bold text-white mb-6">Cryptographic Pipeline</h3>
                    <div className="flex flex-col space-y-4">
                        <div className="bg-white/5 border border-white/10 p-5 rounded-xl flex items-center">
                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center mr-6 font-bold text-slate-400">1</div>
                            <div>
                                <h4 className="font-bold text-white">Browser Memory</h4>
                                <p className="text-sm text-slate-400">User types payload. Key is generated in RAM. Payload is encrypted. Key is immediately shredded from RAM.</p>
                            </div>
                        </div>
                        <div className="w-0.5 h-6 bg-gradient-to-b from-white/20 to-transparent ml-10"></div>
                        <div className="bg-white/5 border border-white/10 p-5 rounded-xl flex items-center">
                            <div className="w-10 h-10 rounded-full bg-[#2b52ff]/20 border border-[#2b52ff]/30 flex items-center justify-center mr-6 font-bold text-[#2b52ff]">2</div>
                            <div>
                                <h4 className="font-bold text-white">Sharding Mechanism</h4>
                                <p className="text-sm text-slate-400">The encryption key is split into 5 cryptographic shards using polynomial evaluation.</p>
                            </div>
                        </div>
                        <div className="w-0.5 h-6 bg-gradient-to-b from-white/20 to-transparent ml-10"></div>
                        <div className="bg-white/5 border border-white/10 p-5 rounded-xl flex items-center">
                            <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mr-6 font-bold text-purple-400">3</div>
                            <div>
                                <h4 className="font-bold text-white">Network Distribution</h4>
                                <p className="text-sm text-slate-400">Encrypted blob goes to IPFS. Shards are distributed to separate geographical validator nodes.</p>
                            </div>
                        </div>
                    </div>
                </motion.section>

            </div>

            <div className="mt-20 pt-10 border-t border-white/10 flex justify-between items-center">
                <Link href="/docs/security-prerequisites" className="flex items-center text-slate-400 hover:text-white transition-colors text-sm font-bold">
                    Previous: Prerequisites
                </Link>
                <Link href="/docs/shamir-sdk" className="flex items-center text-[#2b52ff] hover:text-white transition-colors text-sm font-bold">
                    Next: Shamir SDK <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
            </div>
        </>
    );
}
