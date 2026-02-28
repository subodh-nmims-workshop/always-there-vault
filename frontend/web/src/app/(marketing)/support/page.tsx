'use client';

import { motion } from 'framer-motion';
import { LifeBuoy, AlertTriangle, MessageCircle, FileQuestion, ArrowRight } from 'lucide-react';

export default function SupportPage() {
    const defaultTransition = { duration: 0.8, ease: "easeOut" as any };

    return (
        <div className="min-h-screen bg-[#050a1a] pt-32 pb-24 font-sans selection:bg-[#2b52ff]/30 selection:text-white relative overflow-hidden">

            <div className="absolute top-[0%] left-[20%] w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={defaultTransition}
                    className="mb-20 text-center mt-12"
                >
                    <div className="inline-flex items-center gap-3 mb-8 border border-[#2b52ff]/20 bg-[#2b52ff]/10 backdrop-blur-md px-4 py-1.5 rounded-full uppercase tracking-widest text-[#2b52ff] text-xs font-bold shadow-lg shadow-[#2b52ff]/5">
                        <LifeBuoy className="h-4 w-4" />
                        <span>System Recovery</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6 leading-[1.05]">
                        Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#2b52ff]">Support.</span>
                    </h1>
                </motion.div>

                {/* Important Warning using Skai Bento Structure */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={defaultTransition}
                    className="bg-white/[0.02] border-l-4 border-l-red-500 border-y border-r border-white/10 rounded-r-[2rem] p-8 lg:p-12 mb-16 shadow-2xl shadow-red-500/5 relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[50px] pointer-events-none"></div>
                    <div className="flex items-start relative z-10">
                        <AlertTriangle className="w-8 h-8 text-red-500 mr-5 shrink-0 mt-1" />
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Crucial: Data Recovery Limitation</h3>
                            <p className="text-blue-100/70 font-medium leading-relaxed">
                                Because we utilize strict end-to-end client-side AES encryption via Zero-Knowledge Architecture, <strong className="text-white font-bold">we cannot reset your password, nor can we decrypt your vault data if you lose your keys.</strong> We simply do not have them. Support is limited to protocol mechanics, integration troubleshooting, and contract queries.
                            </p>
                        </div>
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-10 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ ...defaultTransition, delay: 0.1 }}
                        className="p-10 bg-white/[0.02] border border-white/5 rounded-[2rem] flex flex-col hover:bg-white/[0.04] hover:border-white/20 transition-all shadow-xl shadow-black/20 group"
                    >
                        <div className="w-14 h-14 bg-[#2b52ff]/10 rounded-xl border border-[#2b52ff]/20 flex items-center justify-center mb-8 shadow-inner group-hover:bg-[#2b52ff]/20 transition-colors">
                            <MessageCircle className="w-6 h-6 text-[#2b52ff]" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Open a Ticket</h3>
                        <p className="text-blue-100/60 font-medium mb-8 flex-grow">
                            Submit a technical inquiry to our decentralized network of engineers. Expected response time is within 12 hours.
                        </p>
                        <button className="bg-white/5 hover:bg-[#2b52ff] text-white font-bold py-4 rounded-xl border border-white/10 hover:border-[#2b52ff] transition-all w-full shadow-md text-sm tracking-wide">
                            Submit Inquiry
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ ...defaultTransition, delay: 0.2 }}
                        className="p-10 bg-gradient-to-br from-[#101b3d] to-[#050a1a] border border-[#2b52ff]/20 rounded-[2rem] flex flex-col hover:border-[#2b52ff]/40 transition-all shadow-xl shadow-[#2b52ff]/10 group"
                    >
                        <div className="w-14 h-14 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center mb-8 shadow-inner shadow-black/50">
                            <FileQuestion className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">FAQ Library</h3>
                        <p className="text-blue-100/80 font-medium mb-8 flex-grow">
                            Browse the most commonly asked questions regarding gas optimizations, heartbeat mechanisms, and Shamir setups.
                        </p>
                        <button className="bg-[#2b52ff] hover:bg-white text-white hover:text-[#2b52ff] font-bold py-4 rounded-xl transition-all w-full shadow-lg shadow-[#2b52ff]/20 text-sm tracking-wide flex items-center justify-center gap-2">
                            Browse Library <ArrowRight className="w-4 h-4" />
                        </button>
                    </motion.div>
                </div>

            </div>
        </div>
    );
}
