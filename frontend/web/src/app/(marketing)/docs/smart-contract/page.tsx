'use client';

import { motion } from 'framer-motion';
import { Terminal, ShieldAlert, Cpu, Database, ChevronRight, CheckCircle, Activity, Lock, Play } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SmartContractPage() {
    const defaultTransition = { duration: 0.8, ease: "easeOut" as any };

    // Terminal Simulation State
    const [protocolState, setProtocolState] = useState<'idle' | 'running' | 'completed'>('idle');
    const [logs, setLogs] = useState<string[]>([]);

    const terminalLogs = [
        "> Initializing EVM routing layer...",
        "> Compiling payload hash mapping via SHA-256...",
        "[OK] Hash integrity verified.",
        "> Constructing Shamir Secret Sharing fragments (Threshold: 3/5)...",
        "[OK] N-of-M shards generated successfully.",
        "> Engaging Web3.Storage for decentralized pinning...",
        "[OK] IPFS CID retrieved: bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi",
        "> Deploying 'Dead-Man Switch' Contract to Polygon Mainnet...",
        "> Awaiting block confirmation...",
        "[OK] Transaction confirmed (Block #58291044).",
        "> Injecting temporal decay locks (Duration: 180 Days)...",
        "> Assigning beneficiary fallback addresses...",
        "[SECURED] Digital Will Protocol instantiated successfully."
    ];

    const initiateProtocol = () => {
        if (protocolState !== 'idle') return;
        setProtocolState('running');
        setLogs([]);

        let currentLogIndex = 0;
        const interval = setInterval(() => {
            if (currentLogIndex < terminalLogs.length) {
                setLogs(prev => [...prev, terminalLogs[currentLogIndex]]);
                currentLogIndex++;
            } else {
                clearInterval(interval);
                setProtocolState('completed');
            }
        }, 600); // 600ms between logs for dramatic effect
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={defaultTransition}
                className="mb-16"
            >
                <div className="inline-flex items-center gap-2 mb-6 text-sm font-semibold text-[#a259ff] uppercase tracking-widest bg-[#a259ff]/10 border border-[#a259ff]/20 px-3 py-1 rounded-full">
                    <Database className="w-4 h-4" /> Solidity v0.8.20
                </div>
                <h1 className="text-4xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
                    Smart Contract Verification
                </h1>
                <p className="text-lg text-blue-100/70 font-medium leading-relaxed max-w-3xl">
                    The core engine of the Digital Will Protocol resides entirely on-chain. Our immutable smart contracts govern the temporal decay functions and manage the cryptographic distribution of your encrypted vault key shards upon a verified heartbeat failure.
                </p>
            </motion.div>

            <div className="space-y-16">

                {/* The Interactive Terminal Section */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={defaultTransition}
                    className="relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#2b52ff]/20 via-[#a259ff]/10 to-transparent blur-3xl -z-10 rounded-[3rem]"></div>

                    <div className="bg-[#0a1024] border border-[#2b52ff]/30 shadow-2xl shadow-[#2b52ff]/20 rounded-[2rem] overflow-hidden">

                        {/* Terminal Header */}
                        <div className="bg-[#050812] px-6 py-4 flex items-center justify-between border-b border-white/5">
                            <div className="flex items-center gap-2">
                                <Terminal className="w-5 h-5 text-slate-400" />
                                <span className="text-slate-300 font-mono text-sm tracking-wide">dwp-cli execute --network polygon</span>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                                <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                                <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                            </div>
                        </div>

                        {/* Terminal Content */}
                        <div className="p-8 lg:p-12 pl-6 lg:pl-10 grid lg:grid-cols-2 gap-12 items-center">

                            {/* Execution Info */}
                            <div>
                                <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Interactive Protocol Engine</h3>
                                <p className="text-blue-100/60 mb-8 leading-relaxed">
                                    Experience the instantiation pipeline natively in your browser. This simulates the exact orchestration graph our backend relays to the Polygon RPC nodes.
                                </p>

                                <button
                                    onClick={initiateProtocol}
                                    disabled={protocolState !== 'idle'}
                                    className={`relative group flex items-center justify-center w-full sm:w-auto px-8 py-4 rounded-xl font-bold tracking-wide transition-all ${protocolState === 'idle'
                                        ? 'bg-gradient-to-r from-[#2b52ff] to-[#a259ff] text-white shadow-xl hover:shadow-[0_0_30px_rgba(43,82,255,0.4)] hover:-translate-y-1'
                                        : protocolState === 'running'
                                            ? 'bg-white/10 text-white cursor-not-allowed border border-white/20'
                                            : 'bg-green-500/20 text-green-400 border border-green-500/50 cursor-default'
                                        }`}
                                >
                                    {protocolState === 'idle' && (
                                        <>
                                            <Play className="w-5 h-5 mr-3 fill-current" /> Initiate Protocol
                                        </>
                                    )}
                                    {protocolState === 'running' && (
                                        <>
                                            <Activity className="w-5 h-5 mr-3 animate-spin" /> Orchestrating...
                                        </>
                                    )}
                                    {protocolState === 'completed' && (
                                        <>
                                            <CheckCircle className="w-5 h-5 mr-3" /> Vault Secured
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* The Simulated Console */}
                            <div className="bg-[#02040a] rounded-xl border border-white/10 h-[320px] p-6 overflow-y-auto font-mono text-[13px] leading-relaxed relative scroll-smooth custom-scrollbar">
                                {logs.length === 0 && protocolState === 'idle' && (
                                    <div className="text-slate-600 flex items-center justify-center h-full h-full flex-col">
                                        <Cpu className="w-10 h-10 mb-4 opacity-50" />
                                        <span>System Ready. Awaiting execution command.</span>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    {logs.map((log, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className={`${log?.startsWith('[OK]') ? 'text-green-400 font-semibold' :
                                                log?.startsWith('[SECURED]') ? 'text-[#2b52ff] font-bold text-base mt-4' :
                                                    'text-slate-300'
                                                }`}
                                        >
                                            {log}
                                        </motion.div>
                                    ))}
                                    {protocolState === 'running' && (
                                        <motion.div
                                            animate={{ opacity: [1, 0, 1] }}
                                            transition={{ repeat: Infinity, duration: 0.8 }}
                                            className="w-2 h-4 bg-slate-400 inline-block mt-2"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={defaultTransition}
                    className="grid md:grid-cols-2 gap-8"
                >
                    <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 hover:bg-white/[0.04] transition-colors relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#2b52ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <Lock className="w-10 h-10 text-[#2b52ff] mb-6 relative z-10" />
                        <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Temporal Decay Lock</h3>
                        <p className="text-blue-100/60 leading-relaxed relative z-10">
                            The core mechanic relies on a deterministic decay function. If the smart contract does not receive a verified EIP-4361 signature (heartbeat) within the specified block delta, the Vault state shifts from `LOCKED` to `RELEASABLE`.
                        </p>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 hover:bg-white/[0.04] transition-colors relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#a259ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <ShieldAlert className="w-10 h-10 text-[#a259ff] mb-6 relative z-10" />
                        <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Immutability Guarantee</h3>
                        <p className="text-blue-100/60 leading-relaxed relative z-10">
                            Once deployed, the logic is irrevocable. Neither the development team, the DAO, nor any nation-state actor can override the decay logic. It is mathematically immune to censorship or legal injunctions.
                        </p>
                    </div>
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={defaultTransition}
                >
                    <h2 className="text-2xl font-bold text-white mb-6">Contract Interface (ABI Snippet)</h2>
                    <div className="bg-[#050a1a] rounded-xl border border-white/10 p-6 overflow-x-auto shadow-inner">
                        <pre className="text-xs lg:text-sm font-mono leading-loose text-slate-300">
                            <code className="text-orange-400">interface</code> <code className="text-[#2b52ff]">IDigitalWillVault</code> {'{'}{'\n'}
                            {'  '}<code className="text-slate-500">// Returns the current unix timestamp of the last verified heartbeat</code>{'\n'}
                            {'  '}<code className="text-purple-400">function</code> <code className="text-blue-300">getLastHeartbeat</code>() <code className="text-orange-400">external view returns</code> (<code className="text-green-300">uint256</code>);{'\n\n'}
                            {'  '}<code className="text-slate-500">// Requires an EIP-4361 signature matching the owner's cryptographic identity</code>{'\n'}
                            {'  '}<code className="text-purple-400">function</code> <code className="text-blue-300">pulse</code>(<code className="text-green-300">bytes</code> calldata signature) <code className="text-orange-400">external</code>;{'\n\n'}
                            {'  '}<code className="text-slate-500">// Can only be called by whitelisted distribution nodes AFTER decay threshold</code>{'\n'}
                            {'  '}<code className="text-purple-400">function</code> <code className="text-blue-300">releaseKeyShards</code>() <code className="text-orange-400">external</code>;{'\n'}
                            {'}'}
                        </pre>
                    </div>
                </motion.section>

            </div>

            <div className="mt-20 pt-10 border-t border-white/10 flex justify-between items-center">
                <Link href="/docs/ipfs" className="flex items-center text-slate-400 hover:text-white transition-colors text-sm font-bold">
                    Previous: IPFS Storage
                </Link>
                <Link href="/docs/nodejs" className="flex items-center text-[#2b52ff] hover:text-white transition-colors text-sm font-bold">
                    Next: Node.js Examples <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
            </div>
        </>
    );
}
