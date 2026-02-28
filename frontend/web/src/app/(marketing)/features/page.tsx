'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Fingerprint, Lock, Zap, FileCode, CheckCircle2, ChevronRight, Activity, Server, ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import Link from 'next/link';

export default function FeaturesPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const defaultTransition: any = { duration: 0.8, ease: "easeOut" };

    const features = [
        {
            icon: <Lock className="w-6 h-6 text-[#2b52ff]" />,
            title: "Zero-Knowledge Architecture",
            description: "End-to-end client-side AES-256-GCM encryption ensures your payloads are mathematically inaccessible to our infrastructure before they even reach IPFS.",
            bgImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2600&auto=format&fit=crop"
        },
        {
            icon: <Fingerprint className="w-6 h-6 text-[#2b52ff]" />,
            title: "Shamir Secret Sharing",
            description: "No single point of failure. Your master decryption key is mathematically fragmented via GF(2^8) polynomials and requires a threshold (e.g., 3-of-5) of your beneficiaries to reassemble.",
            bgImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2600&auto=format&fit=crop"
        },
        {
            icon: <Zap className="w-6 h-6 text-[#2b52ff]" />,
            title: "Autonomous Execution",
            description: "Immutable smart contracts on the Polygon network track your cryptographic heartbeats. If the temporal decay timer reaches zero, the contract acts seamlessly, unlocking the ciphertext URI.",
            bgImage: "https://images.unsplash.com/photo-1639762681485-074b7f4d2315?q=80&w=2600&auto=format&fit=crop"
        }
    ];

    return (
        <div ref={containerRef} className="min-h-screen bg-[#050a1a] font-sans selection:bg-[#2b52ff]/30 selection:text-white">

            {/* Skai-style Hero */}
            <div className="h-[80vh] flex flex-col justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0a1536] to-[#050a1a]"></div>

                {/* Abstract animated background shapes */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-[#2b52ff]/10 rounded-full blur-[150px] pointer-events-none"
                />

                <div className="max-w-7xl mx-auto w-full relative z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ...defaultTransition, delay: 0.1 }}
                        className="mb-8 overflow-hidden"
                    >
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.1]">
                            Engineered for <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2b52ff] to-[#a259ff]">Absolute Certainty.</span>
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ...defaultTransition, delay: 0.3 }}
                        className="max-w-2xl"
                    >
                        <p className="text-lg lg:text-xl text-blue-100/70 font-medium leading-relaxed mb-10">
                            A protocol engineered to replace human trust with unyielding cryptography. Built for institutions, accessible to everyone.
                        </p>

                        <div className="flex items-center gap-6 text-sm font-semibold tracking-wide text-white">
                            <span className="flex items-center"><Activity className="w-5 h-5 mr-2 text-[#2b52ff]" /> 99.99% Uptime</span>
                            <span className="flex items-center"><Server className="w-5 h-5 mr-2 text-[#a259ff]" /> IPFS Distributed</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Platform Features - Bento Layout */}
            <div className="bg-[#050a1a] relative z-20 py-24 pb-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="text-center mb-20">
                        <span className="text-[#2b52ff] uppercase tracking-[0.15em] text-xs font-extrabold mb-4 block">Platform Architecture</span>
                        <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">
                            Complete Control Over Your Assets.
                        </h2>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-6">
                        {/* Feature 1 - Large Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={defaultTransition}
                            className="lg:col-span-8 bg-white/[0.02] border border-white/5 rounded-[2rem] p-10 lg:p-14 hover:bg-white/[0.04] transition-colors overflow-hidden relative group"
                        >
                            <div className="absolute top-0 right-0 w-96 h-96 bg-[#2b52ff]/10 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none transition-transform duration-700 group-hover:scale-110"></div>

                            <div className="w-14 h-14 bg-[#2b52ff]/20 rounded-xl flex items-center justify-center mb-8 border border-[#2b52ff]/30 shadow-lg shadow-[#2b52ff]/20">
                                {features[0].icon}
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">{features[0].title}</h3>
                            <p className="text-blue-100/60 text-lg leading-relaxed max-w-xl mb-10">
                                {features[0].description}
                            </p>

                            <Link href="/docs" className="inline-flex items-center text-[#2b52ff] font-bold text-sm hover:text-white transition-colors">
                                Read Encryption Specs <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </motion.div>

                        {/* Feature 2 - Small Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ ...defaultTransition, delay: 0.1 }}
                            className="lg:col-span-4 bg-gradient-to-br from-[#0a1536] to-[#050a1a] border border-[#2b52ff]/20 rounded-[2rem] p-10 hover:border-[#2b52ff]/40 transition-colors shadow-2xl shadow-[#2b52ff]/5"
                        >
                            <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center mb-8 border border-white/10">
                                {features[1].icon}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{features[1].title}</h3>
                            <p className="text-blue-100/60 text-base leading-relaxed">
                                {features[1].description}
                            </p>
                        </motion.div>

                        {/* Feature 3 - Wide Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ ...defaultTransition, delay: 0.2 }}
                            className="lg:col-span-12 bg-white/[0.02] border border-white/5 rounded-[2rem] p-10 lg:p-14 hover:bg-white/[0.04] transition-colors relative overflow-hidden group mt-2"
                        >
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639762681485-074b7f4d2315?q=80')] opacity-[0.03] bg-cover bg-center pointer-events-none mix-blend-screen transition-transform duration-1000 group-hover:scale-105"></div>

                            <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                                <div>
                                    <div className="w-14 h-14 bg-[#2b52ff]/20 rounded-xl flex items-center justify-center mb-8 border border-[#2b52ff]/30 shadow-lg shadow-[#2b52ff]/20">
                                        {features[2].icon}
                                    </div>
                                    <h3 className="text-4xl font-bold text-white mb-6 tracking-tight">{features[2].title}</h3>
                                    <p className="text-blue-100/60 text-lg leading-relaxed mb-8">
                                        {features[2].description}
                                    </p>
                                    <Link href="/docs/smart-contract" className="inline-flex items-center bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-6 py-3 rounded-full transition-colors border border-white/5">
                                        View Contract ABI
                                    </Link>
                                </div>

                                <div className="hidden md:block rounded-2xl border border-white/10 bg-[#050505]/50 backdrop-blur-sm p-6 overflow-hidden">
                                    <pre className="text-xs text-[#2b52ff] font-mono leading-loose shadow-inner opacity-80">
                                        <code className="text-purple-400">function</code> <code className="text-blue-200">releaseVault</code>(uint256 vaultId) <code className="text-purple-400">external</code> {'{\n'}
                                        {'  '}Vault <code className="text-purple-400">storage</code> v = vaults[vaultId];{'\n'}
                                        {'  '}<code className="text-purple-400">require</code>(block.timestamp &gt; v.unlockTime, <code className="text-green-300">"Not ready"</code>);{'\n'}
                                        {'  '}v.status = Status.RELEASED;{'\n'}
                                        {'  '}<code className="text-blue-300">emit</code> VaultReleased(vaultId, v.ipfsCID);{'\n'}
                                        {'}'}
                                    </pre>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>

            {/* Deep Tech Verification Section */}
            <div className="bg-[#0a1536] py-32 border-t border-[#2b52ff]/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={defaultTransition}
                    >
                        <Shield className="w-16 h-16 text-[#2b52ff] mx-auto mb-10" />
                        <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight mb-6">
                            Mathematically Proven.
                        </h2>
                        <div className="max-w-3xl mx-auto mb-16">
                            <p className="text-lg text-blue-100/70 font-medium mb-4">
                                The smart contracts governing the Digital Will Protocol are fully open-source and have undergone rigorous, multi-month formal verification and audits by elite Web3 security firms.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
                            <div className="flex items-center p-5 bg-white/[0.03] backdrop-blur-md rounded-2xl border border-white/10 hover:border-[#2b52ff]/50 transition-colors">
                                <CheckCircle2 className="w-5 h-5 text-[#2b52ff] mr-3" />
                                <span className="text-white font-semibold text-sm">Halborn Audited</span>
                            </div>
                            <div className="flex items-center p-5 bg-white/[0.03] backdrop-blur-md rounded-2xl border border-white/10 hover:border-[#2b52ff]/50 transition-colors">
                                <CheckCircle2 className="w-5 h-5 text-[#2b52ff] mr-3" />
                                <span className="text-white font-semibold text-sm">EIP-4361 Auth</span>
                            </div>
                            <div className="flex items-center p-5 bg-white/[0.03] backdrop-blur-md rounded-2xl border border-white/10 hover:border-[#2b52ff]/50 transition-colors">
                                <CheckCircle2 className="w-5 h-5 text-[#2b52ff] mr-3" />
                                <span className="text-white font-semibold text-sm">No Backend Secrets</span>
                            </div>
                            <div className="flex items-center p-5 bg-white/[0.03] backdrop-blur-md rounded-2xl border border-white/10 hover:border-[#2b52ff]/50 transition-colors">
                                <CheckCircle2 className="w-5 h-5 text-[#2b52ff] mr-3" />
                                <span className="text-white font-semibold text-sm">100% Open Source</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Minimalist Closing CTA */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="py-32 bg-[#050a1a] text-center relative overflow-hidden"
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-[#2b52ff]/20 blur-[120px] rounded-full"></div>

                <div className="relative z-10">
                    <h2 className="text-4xl lg:text-6xl font-bold text-white tracking-tight mb-10">
                        Deploy Your Vault Today.
                    </h2>
                    <button className="bg-[#2b52ff] hover:bg-white text-white hover:text-[#2b52ff] px-10 py-4 rounded-xl font-bold tracking-wide transition-all shadow-lg shadow-[#2b52ff]/30 hover:shadow-xl hover:-translate-y-1">
                        Initiate Protocol
                    </button>
                    <p className="mt-6 text-slate-500 font-medium text-sm">No credit card required. Pay gas only.</p>
                </div>
            </motion.div>

        </div>
    );
}
