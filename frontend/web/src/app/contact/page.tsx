'use client';

import { Mail, MapPin, KeyRound, Globe2 } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16 slide-up">
                    <Globe2 className="h-12 w-12 text-blue-500 mx-auto mb-6" />
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                        Secure <span className="gradient-text-premium">Communications</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        We prioritize secure, encrypted, and verifiable communication lines. We will never ask for your private keys or seed phrases under any circumstances.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">

                    <div className="space-y-8">
                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-blue-500/30 transition-colors">
                            <Mail className="h-8 w-8 text-blue-400 mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">General Inquiries</h3>
                            <p className="text-slate-400 text-sm mb-4">For press, partnerships, or non-technical support.</p>
                            <a href="mailto:hello@digitalwill.protocol" className="text-blue-500 hover:text-blue-400 font-mono text-sm underline underline-offset-4">hello@digitalwill.protocol</a>
                        </div>

                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-emerald-500/30 transition-colors">
                            <KeyRound className="h-8 w-8 text-emerald-400 mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Security & Bug Bounties</h3>
                            <p className="text-slate-400 text-sm mb-4">To report vulnerabilities, please encrypt your findings using our PGP public key below.</p>
                            <a href="mailto:security@digitalwill.protocol" className="text-emerald-500 hover:text-emerald-400 font-mono text-sm underline underline-offset-4 mb-4 block">security@digitalwill.protocol</a>
                            <div className="p-4 bg-slate-950 rounded-lg text-xs font-mono text-slate-500 overflow-x-auto border border-slate-800">
                                Fingerprint: 4E53 D392 A0B1 C928 E849 F3A2 B110 C028
                            </div>
                        </div>

                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-purple-500/30 transition-colors">
                            <MapPin className="h-8 w-8 text-purple-400 mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Headquarters</h3>
                            <p className="text-slate-400 text-sm">
                                Crypto Valley<br />
                                Zug, Switzerland<br />
                                <em>(Remote First Organization)</em>
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10">
                        <h3 className="text-2xl font-bold text-white mb-6">Send an Encrypted Message</h3>
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">PGP Public Key (Optional)</label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors font-mono text-xs"
                                    placeholder="Paste your public key block to receive an encrypted reply"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Subject</label>
                                <select className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors">
                                    <option>Partnership Inquiry</option>
                                    <option>Enterprise Deployment</option>
                                    <option>Press / Media</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Message</label>
                                <textarea
                                    rows={5}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                    placeholder="Provide details..."
                                />
                            </div>
                            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-blue-500/20">
                                Sign & Submit
                            </button>
                        </form>
                    </div>

                </div>

            </div>
        </div>
    );
}
