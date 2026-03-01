'use client';

import { motion } from 'framer-motion';
import { Layers, Combine, Scissors, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function ShamirSdkPage() {
    const defaultTransition = { duration: 0.8, ease: "easeOut" as any };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={defaultTransition}
                className="mb-16"
            >
                <div className="inline-flex items-center gap-2 mb-6 text-sm font-semibold text-purple-400 uppercase tracking-widest bg-purple-400/10 border border-purple-400/20 px-3 py-1 rounded-full">
                    <Layers className="w-4 h-4" /> Mathematics
                </div>
                <h1 className="text-4xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
                    Shamir SDK
                </h1>
                <p className="text-lg text-blue-100/70 font-medium leading-relaxed max-w-3xl">
                    Shamir's Secret Sharing (SSS) is a cryptographic algorithm created by Adi Shamir. It allows a secret (in our case, the AES-256 decryption key) to be divided into parts, giving each participant its own unique part.
                </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.04] transition-colors relative"
                >
                    <Scissors className="w-8 h-8 text-pink-400 mb-6" />
                    <h3 className="text-2xl font-bold text-white mb-4">The N-of-M Threshold</h3>
                    <p className="text-blue-100/70 leading-relaxed mb-6">
                        By default, the SDK fractures the key into `M = 5` pieces. It mathematically configures polynomial curves such that any `N = 3` of those pieces can perfectly reconstruct the original key.
                    </p>
                    <p className="text-slate-400 text-sm">
                        This means if 2 node operators go offline or refuse to release their shards, the beneficiary can still decrypt the vault using the remaining 3 shards.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-[#0a0515] border border-purple-500/20 rounded-3xl p-8 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 blur-[50px]"></div>
                    <Combine className="w-8 h-8 text-purple-400 mb-6 relative z-10" />
                    <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Mathematical Security</h3>
                    <p className="text-blue-100/70 leading-relaxed mb-6 relative z-10">
                        Unlike slicing a file into 5 pieces (where having 1 piece gives you 20% of the data), Shamir's algorithm provides perfect secrecy.
                    </p>
                    <p className="text-purple-300/80 font-mono text-xs bg-purple-500/10 p-3 rounded-lg relative z-10 border border-purple-500/20">
                        Knowing (N-1) shares reveals absolutely zero mathematical information about the underlying secret. 2 shares are completely useless.
                    </p>
                </motion.div>
            </div>

            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#050a1a] border border-white/10 rounded-2xl p-8 overflow-x-auto shadow-2xl"
            >
                <h3 className="text-xl font-bold text-white mb-6">SDK Implementation Example</h3>
                <pre className="text-sm font-mono leading-loose text-slate-300">
                    <code className="text-purple-400">import</code> {'{'} splitKey, reconstructKey {'}'} <code className="text-purple-400">from</code> <code className="text-green-300">'@digitalwill/protocol-sdk/shamir'</code>;{'\n\n'}
                    <code className="text-slate-500">// 1. The original AES-256 key (Hexadecimal format)</code>{'\n'}
                    <code className="text-purple-400">const</code> originalKey = <code className="text-green-300">"8f4c7b8eac5..."</code>;{'\n\n'}
                    <code className="text-slate-500">// 2. Split into 5 shares, requiring 3 to reconstruct</code>{'\n'}
                    <code className="text-purple-400">const</code> shards = <code className="text-blue-300">await</code> splitKey(originalKey, <code className="text-orange-300">5</code>, <code className="text-orange-300">3</code>);{'\n'}
                    <code className="text-slate-500">// Returns: ['share1', 'share2', 'share3', 'share4', 'share5']</code>{'\n\n'}
                    <code className="text-slate-500">// 3. In the future (after heartbeat decay), beneficiaries collect shards</code>{'\n'}
                    <code className="text-purple-400">const</code> availableShards = [shards[0], shards[2], shards[4]]; <code className="text-slate-500">// Notice we only have 3</code>{'\n\n'}
                    <code className="text-slate-500">// 4. Perfect reconstruction</code>{'\n'}
                    <code className="text-purple-400">const</code> recoveredKey = <code className="text-blue-300">await</code> reconstructKey(availableShards);{'\n'}
                    <code className="text-blue-300">console</code>.assert(recoveredKey === originalKey); <code className="text-slate-500">// True</code>
                </pre>
            </motion.section>

            <div className="mt-20 pt-10 border-t border-white/10 flex justify-between items-center">
                <Link href="/docs/zero-knowledge" className="flex items-center text-slate-400 hover:text-white transition-colors text-sm font-bold">
                    Previous: Zero-Knowledge
                </Link>
                <Link href="/docs/ipfs" className="flex items-center text-[#2b52ff] hover:text-white transition-colors text-sm font-bold">
                    Next: Decentralized Storage <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
            </div>
        </>
    );
}
