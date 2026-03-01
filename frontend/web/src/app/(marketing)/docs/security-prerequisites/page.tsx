'use client';

import { motion } from 'framer-motion';
import { ShieldAlert, Lock, AlertTriangle, EyeOff, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function SecurityPrerequisitesPage() {
    const defaultTransition = { duration: 0.8, ease: "easeOut" as any };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={defaultTransition}
                className="mb-16"
            >
                <div className="inline-flex items-center gap-2 mb-6 text-sm font-semibold text-orange-500 uppercase tracking-widest bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full">
                    <ShieldAlert className="w-4 h-4" /> Mandatory Architecture
                </div>
                <h1 className="text-4xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
                    Security Prerequisites
                </h1>
                <p className="text-lg text-blue-100/70 font-medium leading-relaxed max-w-3xl">
                    Because we are handling decentralized inheritance of digital assets, operational security is paramount. Your frontend application must strictly adhere to the following architectural patterns before integrating the SDK.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 mb-16 flex items-start gap-4"
            >
                <AlertTriangle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                <div>
                    <h4 className="text-red-400 font-bold mb-2">CRITICAL: Server-Side Avoidance</h4>
                    <p className="text-red-200/80 text-sm leading-relaxed">
                        The core philosophy of the Digital Will Protocol is Zero-Knowledge. If you transmit unencrypted payload data (seed phrases, private keys, passwords) to your backend (even momentarily) before encrypting it, you violate the trust model and assume immense legal and custodial liability.
                    </p>
                </div>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 mb-16">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 hover:bg-white/[0.04] transition-colors relative overflow-hidden group"
                >
                    <Lock className="w-10 h-10 text-green-400 mb-6" />
                    <h3 className="text-2xl font-bold text-white mb-4">Strict HTTPS Transport</h3>
                    <p className="text-blue-100/70 leading-relaxed mb-6">
                        The Web Crypto API (`window.crypto.subtle`) is restricted to Secure Contexts. The SDK will hard-fault and refuse to initialize if imported in an environment that is not served over SSL/TLS (except for `localhost` during development).
                    </p>
                    <div className="flex items-center gap-2 text-sm text-green-400 font-semibold bg-green-400/10 w-fit px-3 py-1 rounded-lg">
                        <Lock className="w-4 h-4" /> Enforced by Browser
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 hover:bg-white/[0.04] transition-colors relative"
                >
                    <EyeOff className="w-10 h-10 text-[#a259ff] mb-6" />
                    <h3 className="text-2xl font-bold text-white mb-4">No 3rd Party Telemetry on Input</h3>
                    <p className="text-blue-100/70 leading-relaxed mb-6">
                        Forms capturing highly sensitive information must be completely isolated. You MUST disable tools like Hotjar, LogRocket, Sentry, or any DOM-recording analytics on the specific pages where the vault payload is constructed.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-[#a259ff] font-semibold bg-[#a259ff]/10 w-fit px-3 py-1 rounded-lg">
                        <ShieldAlert className="w-4 h-4" /> Application Level Responsibility
                    </div>
                </motion.div>

            </div>

            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#050a1a] border border-white/10 rounded-2xl p-8"
            >
                <h3 className="text-xl font-bold text-white mb-6">Recommended Architecture</h3>
                <div className="space-y-4 font-mono text-sm text-slate-300">
                    <div className="flex items-center gap-4 bg-white/[0.03] p-4 rounded-xl border border-white/5">
                        <span className="text-green-400 font-bold shrink-0">1. INPUT</span>
                        <span>User enters seed phrase in an isolated React component.</span>
                    </div>
                    <div className="flex items-center gap-4 bg-white/[0.03] p-4 rounded-xl border border-white/5">
                        <span className="text-[#2b52ff] font-bold shrink-0">2. ENCRYPT</span>
                        <span>DWP SDK generates AES-256 key instantly in JS memory.</span>
                    </div>
                    <div className="flex items-center gap-4 bg-white/[0.03] p-4 rounded-xl border border-white/5">
                        <span className="text-purple-400 font-bold shrink-0">3. SHARD</span>
                        <span>SDK splits the AES key using Shamir's Secret Sharing.</span>
                    </div>
                    <div className="flex items-center gap-4 bg-white/[0.03] p-4 rounded-xl border border-white/5">
                        <span className="text-orange-400 font-bold shrink-0">4. TRANSMIT</span>
                        <span>Only the encrypted blob & distributed shards leave the device.</span>
                    </div>
                </div>
            </motion.section>

            <div className="mt-20 pt-10 border-t border-white/10 flex justify-between items-center">
                <Link href="/docs/quick-start" className="flex items-center text-slate-400 hover:text-white transition-colors text-sm font-bold">
                    Previous: Quick Start
                </Link>
                <Link href="/docs/zero-knowledge" className="flex items-center text-[#2b52ff] hover:text-white transition-colors text-sm font-bold">
                    Next: Zero-Knowledge Architecture <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
            </div>
        </>
    );
}
