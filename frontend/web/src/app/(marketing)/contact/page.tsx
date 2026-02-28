'use client';

import { Mail, MessageSquare, Twitter, Github, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16 slide-up max-w-3xl mx-auto pt-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-white tracking-tight">
                        Encrypted <span className="text-blue-500">Communications</span>
                    </h1>
                    <p className="text-lg text-slate-400 font-light leading-relaxed">
                        Whether you are an institutional client seeking custom smart contract deployment, an auditor, or a researcher, we offer direct lines to our core engineering team.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-blue-500/30 transition-colors">
                            <div className="flex items-start mb-6">
                                <div className="p-3 bg-blue-500/10 rounded-xl mr-4 border border-blue-500/20">
                                    <Mail className="h-6 w-6 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">Direct Outreach</h3>
                                    <p className="text-sm text-slate-400">For general inquiries and partnership discussions.</p>
                                </div>
                            </div>
                            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800/50 mb-4">
                                <p className="font-mono text-sm text-blue-300">hello@digitalwill.protocol</p>
                            </div>
                            <p className="text-xs text-slate-500 flex items-center">
                                * Expected response time: 24-48 hours
                            </p>
                        </div>

                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-purple-500/30 transition-colors">
                            <div className="flex items-start mb-6">
                                <div className="p-3 bg-purple-500/10 rounded-xl mr-4 border border-purple-500/20">
                                    <MessageSquare className="h-6 w-6 text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">Community & Support</h3>
                                    <p className="text-sm text-slate-400">Join our Discord for real-time protocol discussions.</p>
                                </div>
                            </div>
                            <a href="#" className="w-full inline-flex items-center justify-center p-4 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-xl font-bold transition-colors">
                                Join our Discord Server
                            </a>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <a href="#" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center hover:border-slate-600 transition-colors group">
                                <Twitter className="h-8 w-8 text-slate-400 group-hover:text-blue-400 mb-3 transition-colors" />
                                <span className="text-sm font-semibold text-slate-300">@DigitalWill_X</span>
                            </a>
                            <a href="https://github.com/subodh-001/decentralized-digital-will-protocol" target="_blank" rel="noopener noreferrer" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center hover:border-slate-600 transition-colors group">
                                <Github className="h-8 w-8 text-slate-400 group-hover:text-white mb-3 transition-colors" />
                                <span className="text-sm font-semibold text-slate-300">GitHub Repo</span>
                            </a>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-3xl p-8 lg:p-10 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full filter blur-[50px] pointer-events-none"></div>

                        <h2 className="text-2xl font-bold text-white mb-6">Send an Encrypted Message</h2>
                        <form className="space-y-6 relative z-10">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Alias / Name</label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono"
                                    placeholder="Satoshi"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Email Address or PGP Key</label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                    placeholder="you@domain.com or PGP Fingerprint"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Message</label>
                                <textarea
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all min-h-[150px] font-mono whitespace-pre-wrap"
                                    placeholder="State your inquiry..."
                                ></textarea>
                            </div>
                            <button
                                type="button"
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center group"
                            >
                                Send Payload <Send className="h-4 w-4 ml-2 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}
