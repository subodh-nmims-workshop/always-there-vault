'use client';

import { motion } from 'framer-motion';
import { Smartphone, Fingerprint, RefreshCw, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function ReactNativePage() {
    const defaultTransition = { duration: 0.8, ease: "easeOut" as any };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={defaultTransition}
                className="mb-16"
            >
                <div className="inline-flex items-center gap-2 mb-6 text-sm font-semibold text-pink-400 uppercase tracking-widest bg-pink-400/10 border border-pink-400/20 px-3 py-1 rounded-full">
                    <Smartphone className="w-4 h-4" /> Mobile Integration
                </div>
                <h1 className="text-4xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
                    React Native SDK
                </h1>
                <p className="text-lg text-blue-100/70 font-medium leading-relaxed max-w-3xl">
                    Bringing the Digital Will Protocol to iOS and Android requires polyfilling Node's crypto libraries. We provide an exact React Native wrapper to simplify securing assets via mobile.
                </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.04] transition-colors relative"
                >
                    <RefreshCw className="w-8 h-8 text-pink-400 mb-6" />
                    <h3 className="text-2xl font-bold text-white mb-4">Crypto Polyfills</h3>
                    <p className="text-blue-100/70 leading-relaxed text-sm">
                        React Native does not natively support `window.crypto`. You must install `react-native-crypto` and `react-native-randombytes` to ensure the Shamir secret generation has enough entropy.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.04] transition-colors relative"
                >
                    <Fingerprint className="w-8 h-8 text-cyan-400 mb-6" />
                    <h3 className="text-2xl font-bold text-white mb-4">Biometric Signatures</h3>
                    <p className="text-blue-100/70 leading-relaxed text-sm">
                        For cryptographic heartbeats (pings) from a mobile device, we highly recommend wrapping the contract execution in a LocalAuthentication prompt (FaceID/TouchID) to prevent unauthorized decay resets.
                    </p>
                </motion.div>
            </div>

            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#050a1a] border border-white/10 rounded-2xl p-8 mb-16 overflow-x-auto shadow-inner"
            >
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">Implementation Snippet</h3>
                <pre className="text-sm font-mono leading-loose text-slate-300">
                    <code className="text-slate-500">// Must be imported at the very top of your index.js</code>{'\n'}
                    <code className="text-purple-400">import</code> <code className="text-green-300">'react-native-get-random-values'</code>;{'\n'}
                    <code className="text-purple-400">import</code> <code className="text-green-300">'@ethersproject/shims'</code>;{'\n\n'}
                    <code className="text-purple-400">import</code> {'{'} DWPReactNativeClient {'}'} <code className="text-purple-400">from</code> <code className="text-green-300">'@digitalwill/react-native-sdk'</code>;{'\n'}
                    <code className="text-purple-400">import</code> * <code className="text-purple-400">as</code> LocalAuthentication <code className="text-purple-400">from</code> <code className="text-green-300">'expo-local-authentication'</code>;{'\n\n'}
                    <code className="text-purple-400">const</code> emitHeartbeat = <code className="text-blue-300">async</code> () =&gt; {'{'}{'\n'}
                    {'  '}<code className="text-purple-400">const</code> auth = <code className="text-blue-300">await</code> LocalAuthentication.authenticateAsync();{'\n'}
                    {'  '}<code className="text-orange-400">if</code> (auth.success) {'{'}{'\n'}
                    {'    '}<code className="text-slate-500">// Emit cryptographically signed heartbeat via WalletConnect / injected wallet</code>{'\n'}
                    {'    '}<code className="text-blue-300">await</code> DWPReactNativeClient.pingContract();{'\n'}
                    {'  }'}{'\n'}
                    {'};'}
                </pre>
            </motion.section>

            <div className="mt-20 pt-10 border-t border-white/10 flex justify-between items-center">
                <Link href="/docs/nodejs" className="flex items-center text-slate-400 hover:text-white transition-colors text-sm font-bold">
                    Previous: Node.js
                </Link>
                <Link href="/docs/go-subagent" className="flex items-center text-[#2b52ff] hover:text-white transition-colors text-sm font-bold">
                    Next: Go Subagent <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
            </div>
        </>
    );
}
