'use client';

import { motion } from 'framer-motion';
import { Mail, MessageSquare, ShieldCheck, MapPin, Send, Lock } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
    const defaultTransition: any = { duration: 0.8, ease: "easeOut" };

    return (
        <div className="min-h-screen bg-[#050a1a] pb-24 font-sans selection:bg-[#2b52ff]/30 selection:text-white relative overflow-hidden">

            {/* Ambient background meshes */}
            <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-[#2b52ff]/10 rounded-full blur-[150px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-40">

                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={defaultTransition}
                    className="mb-20 text-center"
                >
                    <div className="inline-flex items-center gap-3 mb-8 border border-[#2b52ff]/20 bg-[#2b52ff]/10 backdrop-blur-md px-4 py-1.5 rounded-full uppercase tracking-widest text-[#2b52ff] text-xs font-bold shadow-lg shadow-[#2b52ff]/5">
                        <Lock className="h-4 w-4" />
                        <span>Secure Communications</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-8 leading-[1.05]">
                        Initialize <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#2b52ff]">Contact.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-blue-100/70 font-medium leading-relaxed max-w-2xl mx-auto">
                        For institutional inquiries, integration support, or reporting vulnerabilities. All communications are strictly confidential.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-10 max-w-6xl mx-auto">

                    {/* Contact Methods */}
                    <div className="lg:col-span-5 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={defaultTransition}
                            className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all hover:bg-white/[0.04] flex items-center group shadow-xl shadow-black/20"
                        >
                            <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mr-6 group-hover:scale-110 group-hover:bg-[#2b52ff]/20 group-hover:border-[#2b52ff]/30 transition-all duration-300">
                                <Mail className="w-6 h-6 text-slate-300 group-hover:text-[#2b52ff]" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">General Inquiries</h3>
                                <p className="text-sm font-mono text-slate-400">hello@digitalwill.protocol</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ ...defaultTransition, delay: 0.1 }}
                            className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all hover:bg-white/[0.04] flex items-center group shadow-xl shadow-black/20"
                        >
                            <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mr-6 group-hover:scale-110 group-hover:bg-red-500/20 group-hover:border-red-500/30 transition-all duration-300">
                                <ShieldCheck className="w-6 h-6 text-slate-300 group-hover:text-red-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">Security & Whitehat</h3>
                                <p className="text-sm font-mono text-slate-400">security@digitalwill.protocol</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ ...defaultTransition, delay: 0.2 }}
                            className="p-8 rounded-[2rem] bg-gradient-to-br from-[#101b3d] to-[#050a1a] border border-[#2b52ff]/20 hover:border-[#2b52ff]/40 transition-all flex items-center group shadow-2xl shadow-[#2b52ff]/10 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#2b52ff]/10 rounded-full blur-[30px] -mr-10 -mt-10"></div>
                            <div className="w-14 h-14 rounded-xl bg-[#2b52ff]/20 border border-[#2b52ff]/30 flex items-center justify-center mr-6 group-hover:scale-110 transition-all duration-300">
                                <MessageSquare className="w-6 h-6 text-[#2b52ff]" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">Institutional Desk</h3>
                                <Link href="#" className="text-sm font-bold text-[#2b52ff] hover:text-white transition-colors underline decoration-dashed underline-offset-4">Schedule a Briefing &rarr;</Link>
                            </div>
                        </motion.div>
                    </div>

                    {/* Secure Form */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ ...defaultTransition, delay: 0.1 }}
                            className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 lg:p-14 shadow-2xl shadow-black/40 backdrop-blur-md relative"
                        >
                            <h3 className="text-3xl font-bold text-white mb-8 tracking-tight">Encrypted Channel</h3>
                            <form className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Designation</label>
                                        <input
                                            type="text"
                                            placeholder="Name or Alias"
                                            className="w-full bg-[#050a1a]/80 backdrop-blur-md border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#2b52ff] focus:ring-1 focus:ring-[#2b52ff] transition-all placeholder:text-slate-600 font-medium text-sm shadow-inner"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Return Address</label>
                                        <input
                                            type="email"
                                            placeholder="Email or ENS"
                                            className="w-full bg-[#050a1a]/80 backdrop-blur-md border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#2b52ff] focus:ring-1 focus:ring-[#2b52ff] transition-all placeholder:text-slate-600 font-medium text-sm shadow-inner"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Subject Header</label>
                                    <input
                                        type="text"
                                        placeholder="Purpose of inquiry"
                                        className="w-full bg-[#050a1a]/80 backdrop-blur-md border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#2b52ff] focus:ring-1 focus:ring-[#2b52ff] transition-all placeholder:text-slate-600 font-medium text-sm shadow-inner"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Payload (PGP Encrypted Optional)</label>
                                    <textarea
                                        rows={6}
                                        placeholder="Enter your message..."
                                        className="w-full bg-[#050a1a]/80 backdrop-blur-md border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#2b52ff] focus:ring-1 focus:ring-[#2b52ff] transition-all placeholder:text-slate-600 font-medium text-sm shadow-inner resize-none"
                                    ></textarea>
                                </div>

                                <button type="button" className="w-full bg-[#2b52ff] hover:bg-white text-white hover:text-[#2b52ff] font-bold py-5 rounded-xl transition-all duration-300 flex justify-center items-center shadow-lg shadow-[#2b52ff]/20">
                                    <Send className="w-5 h-5 mr-3" />
                                    Transmit Message
                                </button>

                                <div className="text-center pt-4">
                                    <p className="text-xs text-slate-500 font-mono tracking-wide">
                                        PGP Fingerprint: <span className="text-[#2b52ff]">4F9E 2A7C 90B1 6D8E</span>
                                    </p>
                                </div>
                            </form>
                        </motion.div>
                    </div>

                </div>

            </div>
        </div>
    );
}
