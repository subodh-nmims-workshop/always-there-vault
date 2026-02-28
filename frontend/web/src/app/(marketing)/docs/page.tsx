'use client';

import { motion } from 'framer-motion';
import { Book, Code, Terminal, ChevronRight, Activity, GitBranch, Shield, Zap } from 'lucide-react';
import Link from 'next/link';

export default function DocsPage() {
    const defaultTransition = { duration: 0.8, ease: "easeOut" as any };

    return (
        <div className="min-h-screen bg-[#050a1a] font-sans selection:bg-[#2b52ff]/30 selection:text-white flex flex-col md:flex-row pt-20">
            {/* Sidebar Navigation */}
            <motion.aside
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={defaultTransition}
                className="w-full md:w-64 lg:w-72 bg-[#050a1a] border-r border-white/5 md:fixed md:h-[calc(100vh-80px)] overflow-y-auto px-6 py-10 z-20 shrink-0"
            >
                <div className="mb-10 lg:mb-12">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Getting Started</h4>
                    <ul className="space-y-3">
                        <li><Link href="#" className="text-[#2b52ff] font-semibold text-sm flex items-center"><ChevronRight className="w-3 h-3 mr-1" /> Introduction</Link></li>
                        <li><Link href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Quick Start</Link></li>
                        <li><Link href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Security Prerequisites</Link></li>
                    </ul>
                </div>

                <div className="mb-10 lg:mb-12">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Core Concepts</h4>
                    <ul className="space-y-3">
                        <li><Link href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Zero-Knowledge Architecture</Link></li>
                        <li><Link href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Shamir SDK</Link></li>
                        <li><Link href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Decentralized Storage (IPFS)</Link></li>
                        <li><Link href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Smart Contract Verification</Link></li>
                    </ul>
                </div>

                <div className="mb-10 lg:mb-12">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Integration Guides</h4>
                    <ul className="space-y-3">
                        <li><Link href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Node.js Examples</Link></li>
                        <li><Link href="#" className="text-slate-400 hover:text-white transition-colors text-sm">React Native SDK</Link></li>
                        <li><Link href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Go Subagent</Link></li>
                    </ul>
                </div>
            </motion.aside>

            {/* Main Content Area */}
            <main className="flex-1 md:ml-64 lg:ml-72 bg-[#050a1a] p-6 lg:p-16 relative overflow-hidden min-h-[calc(100vh-80px)]">

                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2b52ff]/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="max-w-4xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={defaultTransition}
                        className="mb-16"
                    >
                        <div className="inline-flex items-center gap-2 mb-6 text-sm font-semibold text-[#2b52ff] uppercase tracking-widest bg-[#2b52ff]/10 border border-[#2b52ff]/20 px-3 py-1 rounded-full">
                            <Book className="w-4 h-4" /> v1.2 Protocol
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
                            Architectural Overview
                        </h1>
                        <p className="text-lg text-blue-100/70 font-medium leading-relaxed">
                            The Digital Will Protocol abstracts the complexity of executing post-state programmatic actions. This documentation specifically covers the initial integration of our Zero-Knowledge storage pipeline and EVM compatible heartbeat contracts.
                        </p>
                    </motion.div>

                    <div className="space-y-16">

                        <motion.section
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={defaultTransition}
                            className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 lg:p-10 relative overflow-hidden group shadow-2xl shadow-black/20"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#101b3d] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10">
                                <h2 className="text-2xl font-bold text-white mb-6 tracking-tight flex items-center">
                                    <Shield className="w-6 h-6 text-[#2b52ff] mr-3" /> Step 1: Client-Side Encryption
                                </h2>
                                <p className="text-blue-100/70 mb-6 font-medium leading-relaxed">
                                    All payloads are encrypted directly in the user's browser using <code>AES-256-GCM</code>. Your infrastructure should never receive unmodified plaintext payload data from the client context.
                                </p>

                                <div className="bg-[#050a1a] rounded-xl border border-white/10 p-5 overflow-x-auto relative shadow-inner">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-[#2b52ff]"></div>
                                    <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
                                        <span className="text-xs text-slate-500 font-mono font-bold">encryption.ts</span>
                                    </div>
                                    <pre className="text-xs lg:text-sm font-mono leading-loose text-slate-300">
                                        <code className="text-purple-400">import</code> {'{'} encryptData, generateKey {'}'} <code className="text-purple-400">from</code> <code className="text-green-300">'@dwp/crypto-sdk'</code>;{'\n\n'}
                                        <code className="text-slate-500">// 1. Generate 256-bit symmetric key locally</code>{'\n'}
                                        <code className="text-purple-400">const</code> masterKey = <code className="text-blue-300">await</code> generateKey();{'\n\n'}
                                        <code className="text-slate-500">// 2. Encrypt sensitive payload string directly on device</code>{'\n'}
                                        <code className="text-purple-400">const</code> encryptedPayload = <code className="text-blue-300">await</code> encryptData(userPayloadData, masterKey);
                                    </pre>
                                </div>
                            </div>
                        </motion.section>

                        <motion.section
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={defaultTransition}
                            className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 lg:p-10 relative overflow-hidden group shadow-2xl shadow-black/20"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#0a1536] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10">
                                <h2 className="text-2xl font-bold text-white mb-6 tracking-tight flex items-center">
                                    <Zip className="w-6 h-6 text-[#2b52ff] mr-3" /> Step 2: Contract Instantiation
                                </h2>
                                <p className="text-blue-100/70 mb-6 font-medium leading-relaxed">
                                    Once the encrypted payload is pinned to IPFS, you deploy a deterministic vault on Polygon.
                                </p>

                                <div className="bg-[#050a1a] rounded-xl border border-white/10 p-5 overflow-x-auto shadow-inner relative">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2b52ff] to-purple-500"></div>
                                    <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
                                        <span className="text-xs text-slate-500 font-mono font-bold">deploy.ts</span>
                                    </div>
                                    <pre className="text-xs lg:text-sm font-mono leading-loose text-slate-300">
                                        <code className="text-purple-400">const</code> tx = <code className="text-blue-300">await</code> ProtocolContract.createVault({'\n'}
                                        {'  '}ipfsCID: encryptedPayload.cid,{'\n'}
                                        {'  '}decayPeriod: <span className="text-orange-300">86400</span> * <span className="text-orange-300">180</span>, <code className="text-slate-500">// 6 months in seconds</code>{'\n'}
                                        {'  '}beneficiaries: [addr1, addr2]{'\n'}
                                        {'});'}{'\n\n'}
                                        <code className="text-blue-300">await</code> tx.wait();{'\n'}
                                        <code className="text-blue-300">console</code>.log(<code className="text-green-300">`Vault created at block ${'{receipt.blockNumber}'}`</code>);
                                    </pre>
                                </div>
                            </div>
                        </motion.section>

                    </div>

                    <div className="mt-20 pt-10 border-t border-white/10 flex justify-between items-center">
                        <Link href="#" className="flex items-center text-slate-400 hover:text-white transition-colors text-sm font-bold">
                            Previous: Installation
                        </Link>
                        <Link href="/api" className="flex items-center text-[#2b52ff] hover:text-white transition-colors text-sm font-bold">
                            Next: API Reference <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>

                </div>
            </main>
        </div>
    );
}

function Zip(props: any) {
    return <Zap {...props} />;
}
