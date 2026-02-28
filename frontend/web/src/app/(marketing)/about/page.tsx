'use client';

import { Shield, Globe, Users, Target, Lock, Activity, Link2, Hexagon } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center max-w-4xl mx-auto mb-24 slide-up pt-10">
                    <span className="text-blue-500 font-bold tracking-widest text-sm uppercase mb-6 block">Our Genesis</span>
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-8 text-white tracking-tight">
                        Securing the Future of <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">Digital Wealth</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light mb-12">
                        The Digital Will Protocol was engineered to solve a critical vulnerability in the web3 era: the permanent loss of cryptographic assets and digital legacies due to unforeseen tragedy or loss of physical access. We are eliminating the single point of failure inherent in human mortality.
                    </p>

                    <div className="flex justify-center gap-6">
                        <div className="flex flex-col items-center">
                            <span className="text-4xl font-extrabold text-blue-400 mb-2">$0</span>
                            <span className="text-sm text-slate-500 uppercase tracking-wider font-semibold">User Funds Stored</span>
                        </div>
                        <div className="w-px bg-slate-800"></div>
                        <div className="flex flex-col items-center">
                            <span className="text-4xl font-extrabold text-indigo-400 mb-2">100%</span>
                            <span className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Zero-Knowledge</span>
                        </div>
                        <div className="w-px bg-slate-800"></div>
                        <div className="flex flex-col items-center">
                            <span className="text-4xl font-extrabold text-purple-400 mb-2">&infin;</span>
                            <span className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Immutable Storage</span>
                        </div>
                    </div>
                </div>

                {/* The Paradigm Shift Section */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-10 md:p-16 mb-24 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full filter blur-[100px] pointer-events-none"></div>

                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="relative z-10">
                            <div className="inline-flex items-center justify-center p-3 bg-indigo-500/10 rounded-xl mb-6">
                                <Target className="h-8 w-8 text-indigo-400" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-6">The Paradigm Shift</h2>
                            <p className="text-slate-400 mb-6 leading-relaxed">
                                Traditional estate planning relies on high-friction legal intermediaries, paper trails, and immense human trust. Lawyers must hold physical documents, keys, or passwords—creating massive security vectors and single points of failure. Furthermore, these archaic systems are fundamentally incompatible with the decentralized nature of cryptocurrency, seed phrases, and programmatic assets.
                            </p>
                            <p className="text-slate-400 leading-relaxed">
                                We constructed the Digital Will Protocol as a direct rebuttal to this legacy system. By fusing AES-256-GCM encryption, Shamir Secret Sharing, EVM-compatible smart contracts, and IPFS distributed storage, we have created the world's first mathematically enforced, completely trustless inheritance vehicle.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6 relative z-10">
                            <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl">
                                <Lock className="h-8 w-8 text-blue-400 mb-4" />
                                <h4 className="font-bold text-white mb-2">Trustless</h4>
                                <p className="text-sm text-slate-500">We cannot read your files. We cannot access your keys.</p>
                            </div>
                            <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl transform translate-y-8">
                                <Link2 className="h-8 w-8 text-purple-400 mb-4" />
                                <h4 className="font-bold text-white mb-2">Immutable</h4>
                                <p className="text-sm text-slate-500">Your legacy logic is hardcoded into the Polygon blockchain.</p>
                            </div>
                            <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl">
                                <Activity className="h-8 w-8 text-green-400 mb-4" />
                                <h4 className="font-bold text-white mb-2">Autonomous</h4>
                                <p className="text-sm text-slate-500">Execution relies solely on programmatic dead-man switches.</p>
                            </div>
                            <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl transform translate-y-8">
                                <Hexagon className="h-8 w-8 text-orange-400 mb-4" />
                                <h4 className="font-bold text-white mb-2">Decentralized</h4>
                                <p className="text-sm text-slate-500">Storage spans thousands of nodes worldwide via IPFS.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Team & Governance */}
                <div className="max-w-5xl mx-auto text-center mb-24">
                    <h2 className="text-3xl font-bold text-white mb-6">Organizational Structure</h2>
                    <p className="text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                        The protocol is maintained by a distributed assembly of cryptographers, distributed systems engineers, and smart contract auditors.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 shadow-lg">
                            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Users className="h-8 w-8 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Pseudonymous by Design</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                To ensure the protocol remains neutrally resilient to state-level coercion, core contributors operate pseudonymously, verifiable only via their PGP keys and Git signatures.
                            </p>
                        </div>
                        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 shadow-lg">
                            <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Globe className="h-8 w-8 text-indigo-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Swiss Jurisdiction Headquartered</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Our foundational legal entity is registered in Zug, Switzerland (the Crypto Valley), ensuring maximum regulatory clarity and strict privacy protections for the protocol's infrastructure.
                            </p>
                        </div>
                        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 shadow-lg">
                            <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Shield className="h-8 w-8 text-purple-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Transitioning to DAO</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                By Q4 2026, the administrative keys to the smart contracts and treasury will be formally handed over to a decentralized autonomous organization (DAO) governed by the community.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Final CTA */}
                <div className="bg-blue-600 rounded-3xl p-12 text-center max-w-3xl mx-auto shadow-[0_0_40px_rgba(59,130,246,0.3)] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
                    <h2 className="text-3xl font-extrabold text-white mb-6 relative z-10">Don't Leave Your Legacy to Chance</h2>
                    <p className="text-blue-100 text-lg mb-8 relative z-10">
                        Join the hundreds of institutional holders and crypto natives who trust the Digital Will Protocol to secure their post-mortem asset distribution.
                    </p>
                    <Link href="/" className="inline-block bg-slate-950 hover:bg-slate-900 text-white font-bold py-4 px-10 rounded-xl transition-colors relative z-10 shadow-xl">
                        Deploy Your Vault
                    </Link>
                </div>

            </div>
        </div>
    );
}
