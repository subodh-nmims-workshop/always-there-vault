'use client';

import { motion } from 'framer-motion';
import { Terminal, Server, Webhook, Cpu, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function NodejsPage() {
    const defaultTransition = { duration: 0.8, ease: "easeOut" as any };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={defaultTransition}
                className="mb-16"
            >
                <div className="inline-flex items-center gap-2 mb-6 text-sm font-semibold text-green-500 uppercase tracking-widest bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full">
                    <Server className="w-4 h-4" /> Backend Tools
                </div>
                <h1 className="text-4xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
                    Node.js Examples
                </h1>
                <p className="text-lg text-blue-100/70 font-medium leading-relaxed max-w-3xl">
                    While encryption must occur client-side, integrating DWP into your backend is essential for tracking user vault statuses, listening to decay events, and orchestrating centralized fallbacks.
                </p>
            </motion.div>

            <div className="space-y-12">

                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 lg:p-10 relative overflow-hidden group shadow-2xl shadow-black/20"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0a1520] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold text-white mb-6 tracking-tight flex items-center">
                            <Webhook className="w-6 h-6 text-green-400 mr-3" /> Event Listening (Express.js)
                        </h2>
                        <p className="text-blue-100/70 mb-6 font-medium leading-relaxed">
                            Initialize a listener via Ethers.js to monitor the Polygon contract for state changes (e.g., when a vault fully decays and assets become releasable).
                        </p>

                        <div className="bg-[#050a1a] rounded-xl border border-white/10 p-5 overflow-x-auto relative shadow-inner">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-[#2b52ff]"></div>
                            <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
                                <span className="text-xs text-slate-500 font-mono font-bold">server.js</span>
                            </div>
                            <pre className="text-xs lg:text-sm font-mono leading-loose text-slate-300">
                                <code className="text-purple-400">const</code> ethers = <code className="text-purple-400">require</code>(<code className="text-green-300">'ethers'</code>);{'\n'}
                                <code className="text-purple-400">const</code> express = <code className="text-purple-400">require</code>(<code className="text-green-300">'express'</code>);{'\n\n'}
                                <code className="text-slate-500">// Connect to Polygon RPC</code>{'\n'}
                                <code className="text-purple-400">const</code> provider = <code className="text-blue-300">new</code> ethers.providers.JsonRpcProvider(process.env.POLYGON_RPC);{'\n'}
                                <code className="text-purple-400">const</code> contract = <code className="text-blue-300">new</code> ethers.Contract(DWP_ADDRESS, DWP_ABI, provider);{'\n\n'}
                                <code className="text-slate-500">// Listen for Decay Events</code>{'\n'}
                                contract.on(<code className="text-green-300">"VaultDecayed"</code>, (vaultOwner, blockTimestamp) =&gt; {'{'}{'\n'}
                                {'  '}<code className="text-blue-300">console</code>.log(<code className="text-green-300">`[!] Vault for ${'{vaultOwner}'} has reached terminal decay.`</code>);{'\n'}
                                {'  '}<code className="text-slate-500">// Trigger internal business logic (email beneficiaries, SMS alerts, etc.)</code>{'\n'}
                                {'  '}alertBeneficiaries(vaultOwner);{'\n'}
                                {'});'}
                            </pre>
                        </div>
                    </div>
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 lg:p-10 relative overflow-hidden group shadow-2xl shadow-black/20"
                >
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold text-white mb-6 tracking-tight flex items-center">
                            <Cpu className="w-6 h-6 text-[#2b52ff] mr-3" /> Headless Distribution Node
                        </h2>
                        <p className="text-blue-100/70 mb-6 font-medium leading-relaxed">
                            For enterprise partners, you can run a headless distribution node using PM2 or Docker. This node stores 1 Shamir shard and automatically verifies smart contract state before transmitting the shard to a verified beneficiary email.
                        </p>

                        <div className="bg-[#050a1a] rounded-xl border border-white/10 p-5 overflow-x-auto relative shadow-inner">
                            <pre className="text-xs lg:text-sm font-mono leading-loose text-slate-300">
                                <code className="text-slate-500">// run-validator.js</code>{'\n'}
                                <code className="text-purple-400">import</code> {'{'} DwpValidatorNode {'}'} <code className="text-purple-400">from</code> <code className="text-green-300">'@digitalwill/node-core'</code>;{'\n\n'}
                                <code className="text-purple-400">const</code> node = <code className="text-blue-300">new</code> DwpValidatorNode({'{'}{'\n'}
                                {'  '}postgresUri: process.env.DB_URI, <code className="text-slate-500">// Store encrypted shards</code>{'\n'}
                                {'  '}rpcEndpoint: process.env.POLYGON_RPC,{'\n'}
                                {'  '}mailerConfig: {'{'}{'\n'}
                                {'    '}sendgridKey: process.env.SG_KEY{'\n'}
                                {'  }'}{'\n'}
                                {'});'}{'\n\n'}
                                node.start();
                            </pre>
                        </div>
                    </div>
                </motion.section>

            </div>

            <div className="mt-20 pt-10 border-t border-white/10 flex justify-between items-center">
                <Link href="/docs/smart-contract" className="flex items-center text-slate-400 hover:text-white transition-colors text-sm font-bold">
                    Previous: Smart Contract
                </Link>
                <Link href="/docs/react-native" className="flex items-center text-[#2b52ff] hover:text-white transition-colors text-sm font-bold">
                    Next: React Native SDK <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
            </div>
        </>
    );
}
