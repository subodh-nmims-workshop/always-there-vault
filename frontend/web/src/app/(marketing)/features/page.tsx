'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Fingerprint, Lock, Zap, FileCode, CheckCircle2, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import Link from 'next/link';

export default function FeaturesPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const defaultTransition = { duration: 1.5, ease: [0.16, 1, 0.3, 1] };

    const features = [
        {
            icon: <Lock className="w-8 h-8 text-white" />,
            title: "Zero-Knowledge Architecture",
            description: "End-to-end client-side AES-256-GCM encryption ensures your payloads are mathematically inaccessible to our infrastructure before they even reach IPFS.",
            bgImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2600&auto=format&fit=crop"
        },
        {
            icon: <Fingerprint className="w-8 h-8 text-white" />,
            title: "Shamir Secret Sharing",
            description: "No single point of failure. Your master decryption key is mathematically fragmented via GF(2^8) polynomials and requires a threshold (e.g., 3-of-5) of your beneficiaries to reassemble.",
            bgImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2600&auto=format&fit=crop"
        },
        {
            icon: <Zap className="w-8 h-8 text-white" />,
            title: "Autonomous Execution",
            description: "Immutable smart contracts on the Polygon network track your cryptographic heartbeats. If the temporal decay timer reaches zero, the contract acts seamlessly, unlocking the ciphertext URI.",
            bgImage: "https://images.unsplash.com/photo-1639762681485-074b7f4d2315?q=80&w=2600&auto=format&fit=crop"
        }
    ];

    return (
        <div ref={containerRef} className="min-h-screen bg-[#050505] font-sans selection:bg-white/20 selection:text-white">

            {/* Minimal Luxury Hero */}
            <div className="h-[90vh] flex flex-col justify-end pb-32 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
                <div className="absolute inset-x-0 bottom-0 h-[60vh] bg-gradient-to-t from-black via-transparent to-transparent z-10 pointer-events-none"></div>
                <motion.div
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.4 }}
                    transition={{ duration: 4, ease: "easeOut" }}
                    className="absolute inset-0 z-0 origin-center"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2600&auto=format&fit=crop')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'grayscale(100%) contrast(120%) brightness(50%)'
                    }}
                />

                <div className="max-w-7xl mx-auto w-full relative z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ...defaultTransition, delay: 0.2 }}
                        className="mb-6 overflow-hidden"
                    >
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-medium tracking-tighter text-white leading-[0.9]">
                            Absolute<br />
                            <span className="text-slate-500 font-light italic text-[0.8em]">Certainty.</span>
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ...defaultTransition, delay: 0.5 }}
                        className="max-w-xl"
                    >
                        <p className="text-xl lg:text-3xl text-slate-300 font-light leading-relaxed">
                            A protocol engineered to replace human trust with unyielding cryptography.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Sticky Scroll Features */}
            <div className="bg-[#050505] relative z-20 py-32 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="grid lg:grid-cols-2 gap-24 lg:gap-12">
                        {/* Sticky Header Side */}
                        <div className="lg:sticky lg:top-40 h-fit">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={defaultTransition}
                            >
                                <span className="text-white/40 uppercase tracking-[0.2em] text-xs font-bold mb-6 block">Capabilities</span>
                                <h2 className="text-5xl lg:text-7xl font-medium text-white mb-8 tracking-tighter leading-[1.05]">
                                    Engineered <br />for Extremes.
                                </h2>
                                <p className="text-xl text-slate-400 font-light leading-relaxed max-w-lg mb-12">
                                    Every component of the Digital Will Protocol is designed assuming the underlying network is hostile. We do not secure your data; we mathematically mandate that it cannot be accessed until the exact conditions are met.
                                </p>

                                <Link href="/docs" className="inline-flex items-center text-white font-medium group hover:text-slate-300 transition-colors uppercase tracking-widest text-sm">
                                    Read Architecture Docs
                                    <span className="ml-4 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                                        <ChevronRight className="w-4 h-4" />
                                    </span>
                                </Link>
                            </motion.div>
                        </div>

                        {/* Scroll Content Side */}
                        <div className="space-y-32">
                            {features.map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 100 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-10%" }}
                                    transition={defaultTransition}
                                    className="group"
                                >
                                    <div className="h-[400px] w-full rounded-[2.5rem] overflow-hidden bg-[#111] mb-10 relative">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-[15s] ease-linear group-hover:scale-110 opacity-60 mix-blend-luminosity"
                                            style={{ backgroundImage: \`url('\${feature.bgImage}')\` }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
                                        <div className="absolute top-8 left-8 w-16 h-16 rounded-full border border-white/10 bg-black/50 backdrop-blur-md flex items-center justify-center">
                                            {feature.icon}
                                        </div>
                                    </div>

                                    <h3 className="text-4xl font-medium text-white mb-6 tracking-tight leading-tight">
                                        {feature.title}
                                    </h3>
                                    <p className="text-xl text-slate-400 font-light leading-relaxed">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* Deep Tech Verification Section */}
            <div className="bg-[#0a0a0a] py-40 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={defaultTransition}
                    >
                        <Shield className="w-16 h-16 text-white/50 mx-auto mb-10" />
                        <h2 className="text-4xl lg:text-6xl font-medium text-white tracking-tighter mb-8">
                            Mathematically Proven.
                        </h2>
                        <div className="max-w-2xl mx-auto mb-16">
                            <p className="text-lg text-slate-400 font-light mb-4">
                                The smart contracts governing the Digital Will Protocol are fully open-source and have undergone rigorous, multi-month formal verification and audits by elite Web3 security firms.
                            </p>
                            <p className="text-lg text-slate-400 font-light">
                                Furthermore, the encryption is performed using WebCrypto APIs entirely within your browser's local execution context.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto text-left">
                            <div className="flex items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                                <CheckCircle2 className="w-5 h-5 text-white/70 mr-4" />
                                <span className="text-white font-medium text-sm tracking-wide">Halborn Audited</span>
                            </div>
                            <div className="flex items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                                <CheckCircle2 className="w-5 h-5 text-white/70 mr-4" />
                                <span className="text-white font-medium text-sm tracking-wide">EIP-4361 Auth</span>
                            </div>
                            <div className="flex items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                                <CheckCircle2 className="w-5 h-5 text-white/70 mr-4" />
                                <span className="text-white font-medium text-sm tracking-wide">No Backend Secrets</span>
                            </div>
                            <div className="flex items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                                <CheckCircle2 className="w-5 h-5 text-white/70 mr-4" />
                                <span className="text-white font-medium text-sm tracking-wide">Open Source</span>
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
                transition={{ duration: 2 }}
                className="py-32 bg-[#020202] text-center"
            >
                <div className="mb-12">
                    <FileCode className="w-12 h-12 text-slate-600 mx-auto" />
                </div>
                <h2 className="text-5xl lg:text-7xl font-light text-white leading-none tracking-tighter mix-blend-difference mb-12">
                    Deploy Your Vault.
                </h2>
                <button className="bg-white text-black px-12 py-5 rounded-full font-medium tracking-wide transition-all transform hover:scale-105 duration-500 text-lg shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.25)]">
                    Initiate Protocol
                </button>
            </motion.div>

        </div>
    );
}
