'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, EyeOff, Diamond, Scale, Globe, Network, Cpu } from 'lucide-react';
import { useRef } from 'react';

export default function AboutPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const yParallax = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const opacityFade = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

    const defaultTransition: any = { duration: 0.8, ease: "easeOut" };

    const ethos = [
        {
            icon: <Diamond className="w-6 h-6 text-[#2b52ff]" />,
            title: "Absolute Immutability",
            desc: "Once deployed to the Polygon blockchain, your will becomes a literal force of nature. It cannot be altered by states, attorneys, or even our own engineers."
        },
        {
            icon: <EyeOff className="w-6 h-6 text-[#2b52ff]" />,
            title: "Total Zero-Knowledge",
            desc: "Your data is encrypted locally. At no point in time does any centralized server possess the capability to decrypt the names of your beneficiaries."
        },
        {
            icon: <Scale className="w-6 h-6 text-[#2b52ff]" />,
            title: "Post-State Legal Resolution",
            desc: "The probate court system is a legacy API. By converting legal intent into deterministic code, we skip the court entirely."
        }
    ];

    return (
        <div ref={containerRef} className="min-h-screen bg-[#050a1a] font-sans selection:bg-[#2b52ff]/30 selection:text-white pb-20">

            {/* Massive Hero Section - Skai Style */}
            <div className="relative h-[90vh] flex items-center justify-center overflow-hidden">
                <motion.div style={{ y: yParallax }} className="absolute inset-0 z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-[#2b52ff]/20 blur-[200px] rounded-full mix-blend-screen pointer-events-none"></div>
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80')] opacity-[0.05] mix-blend-screen bg-cover bg-center"></div>
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#050a1a] to-transparent"></div>
                </motion.div>

                <motion.div
                    style={{ opacity: opacityFade }}
                    className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center pt-20"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ...defaultTransition, delay: 0.1 }}
                        className="border border-[#2b52ff]/30 bg-[#2b52ff]/10 backdrop-blur-xl px-4 py-1.5 rounded-full uppercase tracking-widest text-[#2b52ff] text-xs font-bold mb-8 shadow-lg shadow-[#2b52ff]/10"
                    >
                        THE PROTOCOL GENESIS
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ...defaultTransition, delay: 0.2 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-8 leading-[1.05]"
                    >
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#2b52ff]">Algorithm</span> <br /> Over Authority.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ...defaultTransition, delay: 0.3 }}
                        className="text-lg md:text-xl text-blue-100/70 font-medium leading-relaxed max-w-2xl mx-auto"
                    >
                        We are a collective of cryptographers who realized that trusting humans with sensitive seed phrases guarantees ultimate failure.
                    </motion.p>
                </motion.div>
            </div>

            {/* Content Deep Dive */}
            <div className="relative z-10 bg-[#050a1a] pt-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Founder Manifesto Section */}
                    <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-center mb-40">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={defaultTransition}
                            className="lg:col-span-5 relative"
                        >
                            <div className="absolute -left-10 md:-left-20 top-0 text-[15rem] font-black text-white/[0.02] leading-none pointer-events-none select-none">
                                I
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15] mb-8 relative z-10">
                                Why we built this.
                            </h2>
                            <p className="text-blue-100/70 font-medium text-lg leading-relaxed mb-6 relative z-10">
                                The year is 2026. Institutional capital has flooded the decentralized web. Billions of dollars in value are secured behind 24-word seed phrases written on steel plates.
                            </p>
                            <p className="text-blue-100/70 font-medium text-lg leading-relaxed relative z-10">
                                Yet, what happens when the owner of those keys dies? They hire lawyers. They draft wills. They trust a third party to execute their final wishes. This introduces the very vulnerability the blockchain was designed to eliminate: <strong className="text-white font-bold">Human Trust.</strong>
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ ...defaultTransition, delay: 0.2 }}
                            className="lg:col-span-7"
                        >
                            <div className="aspect-[4/3] rounded-[2rem] overflow-hidden bg-[#0a1536] border border-[#2b52ff]/20 relative shadow-2xl shadow-[#2b52ff]/10">
                                <img src="https://images.unsplash.com/photo-1639322537231-2f206e06af84?q=80&w=2600&auto=format&fit=crop" alt="Server Crypto" className="w-full h-full object-cover mix-blend-screen opacity-50 hover:scale-105 transition-transform duration-1000 ease-out" />
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#050a1a] via-[#050a1a]/50 to-transparent"></div>
                                <div className="absolute bottom-8 left-8 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                                        <Cpu className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="text-sm font-bold text-white tracking-widest uppercase">Immutable Infrastructure</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Architectural Ethos */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={defaultTransition}
                        className="mb-16 text-center"
                    >
                        <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1] max-w-3xl mx-auto">
                            The pillars of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#2b52ff]">digital sovereignty.</span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6 lg:gap-8 pb-32">
                        {ethos.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ ...defaultTransition, delay: idx * 0.1 }}
                                className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-10 lg:p-12 flex flex-col items-start hover:bg-white/[0.04] transition-colors duration-300 relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#2b52ff]/10 rounded-full blur-[40px] -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700 pointer-events-none"></div>
                                <div className="w-14 h-14 rounded-xl bg-[#2b52ff]/10 border border-[#2b52ff]/20 flex items-center justify-center mb-8 shadow-lg shadow-[#2b52ff]/5">
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                                    {item.title}
                                </h3>
                                <p className="text-blue-100/60 font-medium leading-relaxed text-base">
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
                        transition={{ duration: 1 }}
                        className="pt-20 border-t border-white/5 text-center relative"
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-[#2b52ff]/50 to-transparent"></div>
                        <h2 className="text-[10vw] font-black text-white leading-none tracking-tighter opacity-5 select-none pointer-events-none">
                            DECENTRALIZED
                        </h2>
                        <div className="relative -mt-10 lg:-mt-20 w-full flex justify-center z-10">
                            <button className="bg-[#2b52ff] hover:bg-white text-white hover:text-[#2b52ff] px-10 py-5 rounded-xl font-bold tracking-wide transition-all duration-300 text-sm shadow-lg shadow-[#2b52ff]/25 hover:-translate-y-1">
                                Institutional Consultation
                            </button>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
