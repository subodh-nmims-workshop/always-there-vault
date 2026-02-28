'use client';

import { motion } from 'framer-motion';
import { Mail, MessageSquare, Twitter, Github, MapPin, Send, Cpu } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
    const defaultTransition = { duration: 1.5, ease: [0.16, 1, 0.3, 1] };

    return (
        <div className="min-h-screen bg-[#050505] pt-40 pb-24 font-sans selection:bg-white/20 selection:text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Hero Minimalist Typography */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={defaultTransition}
                    className="mb-40"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-[#111] rounded-full flex items-center justify-center border border-white/10">
                            <Cpu className="h-5 w-5 text-white/70" />
                        </div>
                        <span className="text-white/40 uppercase tracking-[0.2em] text-xs font-bold">Secure Transmissions</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tighter text-white mb-8 leading-[0.9]">
                        Initiate<br />
                        <span className="font-medium text-slate-500 italic">Contact.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed max-w-3xl">
                        Whether you require custom smart contract architecture or priority lifetime vault allocation, initiate a secure transmission with our operations team.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 max-w-6xl mx-auto mb-40">

                    {/* Communications Hub */}
                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={defaultTransition}
                            className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-12 hover:border-white/10 transition-colors"
                        >
                            <div className="w-16 h-16 bg-[#111] rounded-2xl border border-white/10 flex items-center justify-center mb-8">
                                <Mail className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-3xl font-medium text-white mb-4 tracking-tight">Direct Outreach</h3>
                            <p className="text-slate-400 font-light text-lg mb-8">
                                For institutional inquiries, DAO treasury management, and audit requests.
                            </p>
                            <div className="bg-[#050505] rounded-xl p-6 border border-white/5 inline-block">
                                <p className="font-mono text-sm text-slate-300 tracking-wider">hello@digitalwill.protocol</p>
                            </div>
                            <p className="text-xs text-slate-500 mt-6 font-mono uppercase tracking-widest">
                                48-Hour SLA
                            </p>
                        </motion.div>

                        <div className="grid sm:grid-cols-2 gap-6">
                            <motion.a
                                href="#"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ ...defaultTransition, delay: 0.1 }}
                                className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-12 flex flex-col items-center justify-center hover:bg-white/[0.02] transition-colors group"
                            >
                                <Twitter className="h-8 w-8 text-slate-500 group-hover:text-white mb-6 transition-colors" />
                                <span className="text-sm font-medium tracking-widest uppercase text-slate-400 group-hover:text-white transition-colors">@DigitalWill_X</span>
                            </motion.a>
                            <motion.a
                                href="https://github.com/subodh-001/decentralized-digital-will-protocol"
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ ...defaultTransition, delay: 0.2 }}
                                className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-12 flex flex-col items-center justify-center hover:bg-white/[0.02] transition-colors group"
                            >
                                <Github className="h-8 w-8 text-slate-500 group-hover:text-white mb-6 transition-colors" />
                                <span className="text-sm font-medium tracking-widest uppercase text-slate-400 group-hover:text-white transition-colors">Repository</span>
                            </motion.a>
                        </div>
                    </div>

                    {/* Dark Minimal Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={defaultTransition}
                        className="bg-[#111] border border-white/5 rounded-[3rem] p-12 lg:p-16 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>

                        <h2 className="text-2xl font-medium text-white tracking-tight mb-2 relative z-10">Encrypted Payload</h2>
                        <p className="text-slate-500 font-light mb-12 relative z-10">All fields are end-to-end encrypted before transmission.</p>

                        <form className="space-y-10 relative z-10">
                            <div>
                                <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-4">Alias / Nom de guerre</label>
                                <input
                                    type="text"
                                    className="w-full bg-transparent border-b border-white/10 pb-4 text-white text-lg placeholder:text-slate-700 focus:outline-none focus:border-white transition-colors font-light"
                                    placeholder="Satoshi"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-4">Routing Address</label>
                                <input
                                    type="text"
                                    className="w-full bg-transparent border-b border-white/10 pb-4 text-white text-lg placeholder:text-slate-700 focus:outline-none focus:border-white transition-colors font-light"
                                    placeholder="Email or PGP Block"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-4">Transmission</label>
                                <textarea
                                    className="w-full bg-transparent border-b border-white/10 pb-4 text-white text-lg placeholder:text-slate-700 focus:outline-none focus:border-white transition-colors font-light min-h-[120px] resize-none"
                                    placeholder="State your operational intent..."
                                ></textarea>
                            </div>

                            <button
                                type="button"
                                className="w-full bg-white text-black hover:bg-slate-200 font-medium py-6 rounded-full transition-all flex items-center justify-center group tracking-widest uppercase text-xs"
                            >
                                Dispatch Signal
                                <Send className="h-4 w-4 ml-3 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </form>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
