'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Fingerprint, EyeOff, Diamond, Scale, Link2 } from 'lucide-react';
import { useRef } from 'react';

export default function AboutPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Parallax effects
    const yParallax = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const opacityFade = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    const defaultTransition = { duration: 1.5, ease: [0.16, 1, 0.3, 1] };

    const ethos = [
        {
            icon: <Diamond className="w-6 h-6 text-white" />,
            title: "Absolute Immutability",
            desc: "Once deployed to the Polygon blockchain, your will becomes a literal force of nature. It cannot be altered by states, attorneys, or even our own engineers. The mathematics define the exact conditions of asset release."
        },
        {
            icon: <EyeOff className="w-6 h-6 text-white" />,
            title: "Total Zero-Knowledge",
            desc: "Your data is encrypted via AES-256-GCM locally on your hardware. We store ciphertexts via IPFS. At no point in time does any centralized server possess the capability to decrypt the names of your beneficiaries or the keys to your wallets."
        },
        {
            icon: <Scale className="w-6 h-6 text-white" />,
            title: "Post-State Legal Resolution",
            desc: "The probate court system is a legacy API that extractionary actors navigate for profit. By converting legal intent into deterministic code, we skip the court entirely. Time and cryptography are the only arbitrators."
        }
    ];

    return (
        <div ref={containerRef} className="min-h-screen bg-[#020202] pt-0 pb-0 font-sans selection:bg-white/20 selection:text-white">

            {/* Massive Hero Section */}
            <div className="relative h-screen flex items-center justify-center overflow-hidden">
                <motion.div style={{ y: yParallax }} className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2600&auto=format&fit=crop"
                        alt="Abstract Network"
                        className="w-full h-full object-cover opacity-20 sepia-[.3] hue-rotate-[-30deg] saturate-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/50 to-transparent"></div>
                </motion.div>

                <motion.div
                    style={{ opacity: opacityFade }}
                    className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center h-full pt-32"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ...defaultTransition, delay: 0.2 }}
                        className="border border-white/10 bg-white/5 backdrop-blur-md px-6 py-2 rounded-full uppercase tracking-[0.3em] text-[10px] text-slate-300 font-medium mb-10"
                    >
                        THE PROTOCOL GENESIS
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ...defaultTransition, delay: 0.4 }}
                        className="text-6xl md:text-8xl lg:text-[7rem] font-light tracking-tighter text-white mb-8 leading-[0.95] max-w-5xl"
                    >
                        <span className="font-medium">Algorithm</span> Over Authority.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ ...defaultTransition, delay: 0.6 }}
                        className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed max-w-3xl mx-auto"
                    >
                        We are a collective of cryptographers who realized that trusting humans with sensitive seed phrases guarantees ultimate failure.
                    </motion.p>
                </motion.div>
            </div>

            {/* Content Deep Dive */}
            <div className="relative z-10 bg-[#020202] pt-32 pb-40 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Founder Manifesto Section */}
                    <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center mb-40">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={defaultTransition}
                            className="lg:col-span-5"
                        >
                            <div className="text-white/40 uppercase tracking-[0.2em] text-xs font-bold mb-6">Chapter I: The Flaw</div>
                            <h2 className="text-5xl font-medium text-white tracking-tight leading-[1.1] mb-8">
                                Why we built this.
                            </h2>
                            <p className="text-lg text-slate-400 font-light leading-relaxed mb-6">
                                The year is 2026. Institutional capital has flooded the decentralized web. Billions of dollars in value are secured behind 24-word seed phrases written on steel plates, locked in geographically distributed safety deposit boxes.
                            </p>
                            <p className="text-lg text-slate-400 font-light leading-relaxed">
                                Yet, what happens when the owner of those keys dies? They hire lawyers. They draft wills. They trust a third party to execute their final wishes. This introduces the very vulnerability the blockchain was designed to eliminate: <strong>Human Trust.</strong>
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ ...defaultTransition, delay: 0.2 }}
                            className="lg:col-span-7"
                        >
                            <div className="aspect-[4/3] rounded-[3rem] overflow-hidden bg-[#111] border border-white/10 relative">
                                <img src="https://images.unsplash.com/photo-1639322537231-2f206e06af84?q=80&w=2600&auto=format&fit=crop" alt="Server Crypto" className="w-full h-full object-cover mix-blend-luminosity opacity-40 hover:scale-105 transition-transform duration-[15s] ease-linear" />
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#020202] via-transparent to-transparent"></div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Architectural Ethos */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={defaultTransition}
                        className="mt-32 mb-16 text-center"
                    >
                        <div className="text-white/40 uppercase tracking-[0.2em] text-xs font-bold mb-6">Chapter II: The Pillars</div>
                        <h2 className="text-5xl lg:text-6xl font-medium text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">
                            The trifecta of digital sovereignty.
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8 lg:gap-12 pb-32">
                        {ethos.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ ...defaultTransition, delay: idx * 0.2 }}
                                className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-12 lg:p-16 flex flex-col items-center text-center group hover:border-white/20 transition-colors duration-500"
                            >
                                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-10 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500">
                                    {item.icon}
                                </div>
                                <h3 className="text-3xl font-medium text-white mb-6 tracking-tight">
                                    {item.title}
                                </h3>
                                <p className="text-slate-400 font-light leading-relaxed text-lg">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Massive Typography CTA */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2 }}
                        className="py-32 border-t border-white/10 text-center"
                    >
                        <h2 className="text-[10vw] font-bold text-white leading-none tracking-tighter mix-blend-exclusion opacity-5">
                            DECENTRALIZED
                        </h2>
                        <div className="relative -mt-16 lg:-mt-24 w-full flex justify-center z-10">
                            <button className="bg-white text-black hover:bg-slate-200 px-12 py-6 rounded-full font-medium tracking-wide transition-all transform hover:scale-105 duration-500 text-lg shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                                Institutional Consultation
                            </button>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
