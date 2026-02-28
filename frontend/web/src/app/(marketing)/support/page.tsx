'use client';

import { LifeBuoy, FileQuestion, BookOpen, MessageCircle, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function SupportPage() {
    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16 slide-up">
                    <div className="inline-flex items-center justify-center p-4 bg-blue-500/10 rounded-full mb-6 border border-blue-500/20">
                        <LifeBuoy className="h-10 w-10 text-blue-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-white tracking-tight">
                        Protocol <span className="text-blue-500">Support</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                        We provide architectural guidance and UI troubleshooting. Please note: due to our Zero-Knowledge constraint, we cannot reset passwords or recover lost cryptographic keys.
                    </p>
                </div>

                {/* The "Cannot Recover" Warning */}
                <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 mb-12 flex items-start shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                    <AlertTriangle className="h-8 w-8 text-red-500 mr-4 shrink-0 mt-1" />
                    <div>
                        <h3 className="font-bold text-red-400 text-lg mb-2">Notice Regarding Account Recovery</h3>
                        <p className="text-red-200/80 text-sm leading-relaxed">
                            If you have lost your master AES decryption key or cannot access your threshold of Shamir Shares, your data is mathematically unrecoverable. Our support engineers have absolutely no backdoor access. Submitting a ticket requesting a password reset or data recovery will result in an automated closure.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {/* FAQ Portal */}
                    <Link href="/docs" className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-slate-700 transition-colors group flex flex-col justify-between">
                        <div>
                            <div className="p-3 bg-slate-950 rounded-xl mb-6 border border-slate-800 inline-block">
                                <FileQuestion className="h-6 w-6 text-emerald-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Knowledge Base & FAQ</h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                Browse our extensive repository solving 95% of common issues regarding IPFS pinning, Polygon gas estimation, and file extension handling.
                            </p>
                        </div>
                        <span className="text-emerald-400 font-semibold text-sm group-hover:text-emerald-300 transition-colors flex items-center">
                            Browse FAQs →
                        </span>
                    </Link>

                    {/* Community */}
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-slate-700 transition-colors group flex flex-col justify-between">
                        <div>
                            <div className="p-3 bg-slate-950 rounded-xl mb-6 border border-slate-800 inline-block">
                                <MessageCircle className="h-6 w-6 text-blue-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Community Discord</h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                Connect with thousands of other users and distributed systems engineers. Real-time community debugging and protocol discussion.
                            </p>
                        </div>
                        <span className="text-blue-400 font-semibold text-sm group-hover:text-blue-300 transition-colors flex items-center">
                            Join Server →
                        </span>
                    </div>
                </div>

                {/* Ticket Submission */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-10 relative overflow-hidden">
                    <h2 className="text-2xl font-bold text-white mb-6">Submit a Support Ticket</h2>
                    <p className="text-slate-400 mb-8">For bug reports, API integration issues, or billing inquiries on the Lifetime Vault tier.</p>

                    <form className="space-y-6 relative z-10">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Category</label>
                                <select className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer">
                                    <option>Bug Report / Interface Glitch</option>
                                    <option>Smart Contract Error</option>
                                    <option>API & Integration</option>
                                    <option>Lifetime Vault Billing</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Wallet Address (Optional)</label>
                                <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white font-mono placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-all" placeholder="0x..." />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Description</label>
                            <textarea className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white font-mono placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-all min-h-[150px]" placeholder="Detailed description..."></textarea>
                        </div>
                        <button type="button" className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 rounded-xl transition-colors border border-slate-700 hover:border-slate-500">
                            Create Ticket securely
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}
