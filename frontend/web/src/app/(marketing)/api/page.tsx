'use client';

import { motion } from 'framer-motion';
import { Server, Code, Terminal, Key, Database, Globe, Play } from 'lucide-react';
import Link from 'next/link';
import { SharedFooter } from '@/components/shared-footer';

export default function ApiReferencePage() {
    const defaultTransition = { duration: 0.8, ease: "easeOut" as any };

    const endpoints = [
        {
            method: "POST",
            path: "/v1/assets",
            desc: "Create a new encrypted asset reference. Associates the IPFS CID with the owner's wallet and defines release conditions.",
            status: "Stable"
        },
        {
            method: "GET",
            path: "/v1/assets/owner/:walletAddress",
            desc: "Retrieve all active asset configurations for a specific wallet address. Returns metadata, not the decryption keys.",
            status: "Stable"
        },
        {
            method: "POST",
            path: "/v1/heartbeat/ping",
            desc: "Record a liveness check-in for a specific wallet. Extends the decay timer before assets are released to beneficiaries.",
            status: "Stable"
        },
        {
            method: "POST",
            path: "/v1/beneficiaries/claim",
            desc: "Initiate an asset claim process. Requires proving identity and verifying the owner's vault has decayed.",
            status: "Beta"
        }
    ];

    return (
        <div className="min-h-screen bg-[#050a1a] font-sans selection:bg-[#2b52ff]/30 selection:text-white relative overflow-hidden flex flex-col">

            {/* Navigation (Added for consistency) */}
            <nav className="sticky top-0 z-50 bg-[#050a1a]/80 backdrop-blur-xl border-b border-white/5 px-4 sm:px-8 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="text-[#2b52ff] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Terminal className="w-8 h-8" />
                    </div>
                    <span className="font-bold text-xl tracking-tight hidden sm:block">Always There API</span>
                </Link>
                <div className="hidden md:flex gap-8 items-center absolute left-1/2 -translate-x-1/2">
                    <Link href="/docs" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Documentation</Link>
                    <Link href="/api" className="text-white transition-colors text-sm font-medium">API Reference</Link>
                    <Link href="/support" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Support</Link>
                </div>
                <Link href="/" className="bg-[#2b52ff] hover:bg-[#2b52ff]/80 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-[0_0_20px_rgba(43,82,255,0.4)]">
                    Dashboard
                </Link>
            </nav>

            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 pb-24 w-full">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={defaultTransition}
                    className="mb-20 max-w-4xl"
                >
                    <div className="inline-flex items-center gap-3 mb-8 border border-[#2b52ff]/20 bg-[#2b52ff]/10 backdrop-blur-md px-4 py-1.5 rounded-full uppercase tracking-widest text-[#2b52ff] text-xs font-bold shadow-lg shadow-[#2b52ff]/5">
                        <Terminal className="h-4 w-4" />
                        <span>REST API Specification</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-6 leading-[1.05]">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#2b52ff]">API</span> Reference.
                    </h1>
                    <p className="text-lg md:text-xl text-blue-100/70 font-medium leading-relaxed">
                        Interact programmatically with our indexing and metadata nodes. While the core protocol is EVM based, our secondary indexing layer exposes traditional REST endpoints for UI convenience.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-10">

                    {/* Endpoint List */}
                    <div className="lg:col-span-8 space-y-12">

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={defaultTransition}
                        >
                            <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">Authentication & Host</h2>
                            <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 shadow-xl shadow-black/20">
                                <p className="text-slate-400 text-sm font-medium mb-4">All requests must be prefixed with the base URL:</p>
                                <div className="flex items-center gap-3 bg-[#050a1a] p-4 rounded-xl border border-white/10 mb-6 shadow-inner">
                                    <Globe className="w-5 h-5 text-[#2b52ff]" />
                                    <code className="text-white font-mono text-sm">https://api.digitalwill.protocol/api</code>
                                </div>

                                <p className="text-slate-400 text-sm font-medium mb-4">You authenticate via an EIP-4361 standard JWT derived from your wallet signature. Pass this in the header:</p>
                                <div className="bg-[#050a1a] p-4 rounded-xl border border-white/10 border-l-4 border-l-[#2b52ff] shadow-inner">
                                    <code className="text-blue-300 font-mono text-sm block mb-1">Authorization: Bearer <span className="text-slate-500">{"<YOUR_SIGNED_JWT>"}</span></code>
                                    <code className="text-blue-300 font-mono text-sm block">Content-Type: application/json</code>
                                </div>
                            </div>
                        </motion.div>

                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">Endpoints</h2>
                            {endpoints.map((ep, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ ...defaultTransition, delay: idx * 0.1 }}
                                    className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 hover:bg-white/[0.04] transition-all group overflow-hidden relative shadow-xl shadow-black/20"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#2b52ff]/5 blur-[40px] pointer-events-none group-hover:scale-150 transition-transform duration-700 rounded-full"></div>
                                    <div className="flex flex-wrap items-center justify-between mb-4 relative z-10 gap-4">
                                        <div className="flex items-center gap-3">
                                            <span className={`px-3 py-1 text-xs font-bold rounded-md tracking-wider ${ep.method === 'POST' ? 'bg-[#2b52ff]/20 text-[#2b52ff] border border-[#2b52ff]/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}>
                                                {ep.method}
                                            </span>
                                            <code className="text-white font-mono font-bold text-lg">{ep.path}</code>
                                        </div>
                                        <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full border ${ep.status === 'Stable' ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-orange-500/10 border-orange-500/20 text-orange-400'}`}>
                                            {ep.status}
                                        </span>
                                    </div>
                                    <p className="text-blue-100/60 font-medium text-base relative z-10 leading-relaxed">
                                        {ep.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                    </div>

                    {/* Playground Side Panel */}
                    <div className="lg:col-span-4 mt-6 lg:mt-0 relative hidden lg:block">
                        <div className="sticky top-32">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ ...defaultTransition, delay: 0.2 }}
                                className="bg-[#020510] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
                            >
                                <div className="bg-[#050a1b] p-4 flex items-center justify-between border-b border-white/5">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                    </div>
                                    <span className="text-xs text-slate-500 font-mono font-bold uppercase tracking-widest">Example Response</span>
                                </div>
                                <div className="p-6 bg-[#020510] relative text-sm overflow-x-auto shadow-inner">
                                    <pre className="font-mono text-xs leading-loose">
                                        <span className="text-slate-400">{'{'}</span>{'\n'}
                                        <span className="text-slate-400">  </span><span className="text-purple-400">"status"</span><span className="text-slate-400">: </span><span className="text-green-300">"success"</span><span className="text-slate-400">,</span>{'\n'}
                                        <span className="text-slate-400">  </span><span className="text-purple-400">"data"</span><span className="text-slate-400">: </span><span className="text-slate-400">[</span>{'\n'}
                                        <span className="text-slate-400">    </span><span className="text-slate-400">{'{'}</span>{'\n'}
                                        <span className="text-slate-400">      </span><span className="text-blue-300">"assetId"</span><span className="text-slate-400">: </span><span className="text-green-300">"ast_f83h29"</span><span className="text-slate-400">,</span>{'\n'}
                                        <span className="text-slate-400">      </span><span className="text-blue-300">"type"</span><span className="text-slate-400">: </span><span className="text-green-300">"seed_phrase"</span><span className="text-slate-400">,</span>{'\n'}
                                        <span className="text-slate-400">      </span><span className="text-blue-300">"cid"</span><span className="text-slate-400">: </span><span className="text-green-300">"bafybeig..."</span>{'\n'}
                                        <span className="text-slate-400">    </span><span className="text-slate-400">{'}'}</span>{'\n'}
                                        <span className="text-slate-400">  </span><span className="text-slate-400">]</span>{'\n'}
                                        <span className="text-slate-400">{'}'}</span>
                                    </pre>
                                    <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#020510] to-transparent pointer-events-none"></div>
                                </div>
                                <div className="p-4 bg-[#050a1b] border-t border-white/5 flex justify-center">
                                    <button className="flex items-center text-[#2b52ff] hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">
                                        <Play className="w-3 h-3 mr-2" /> Run in Sandbox
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                </div>
            </main>

            <SharedFooter />
        </div>
    );
}
