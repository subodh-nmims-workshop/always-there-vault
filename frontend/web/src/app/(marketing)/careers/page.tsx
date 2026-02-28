'use client';

import { Terminal, Code2, Globe, Sparkles, Network, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CareersPage() {
    const openings = [
        {
            role: "Principal Cryptography Engineer",
            department: "Core Architecture",
            type: "Full-Time",
            location: "Remote (Global)",
            salary: "$180k - $250k USDC / yr",
            icon: <Terminal className="h-6 w-6 text-purple-400" />
        },
        {
            role: "Smart Contract Auditor (Solidity/Vyper)",
            department: "Security & Governance",
            type: "Contract/Retainer",
            location: "Remote (Global)",
            salary: "$150k - $200k USDC / yr",
            icon: <Code2 className="h-6 w-6 text-emerald-400" />
        },
        {
            role: "Distributed Systems Architect (IPFS/Filecoin)",
            department: "Infrastructure",
            type: "Full-Time",
            location: "Remote (Global)",
            salary: "$160k - $220k USDC / yr",
            icon: <Network className="h-6 w-6 text-blue-400" />
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-20 slide-up max-w-4xl mx-auto pt-10">
                    <div className="inline-flex items-center justify-center p-4 bg-emerald-500/10 rounded-full mb-6 border border-emerald-500/20">
                        <Globe className="h-10 w-10 text-emerald-400" />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white tracking-tight">
                        Build the <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500">Immutable Future</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
                        We are a distributed, pseudonymous collective of engineers building the world's first mathematically infallible inheritance protocol. We operate asynchronously, transparently, and without borders.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-24 max-w-5xl mx-auto">
                    <div className="bg-slate-900/50 border border-slate-800 p-10 rounded-3xl relative overflow-hidden group">
                        <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Sparkles className="w-64 h-64 text-emerald-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-6">Our Culture</h3>
                        <ul className="space-y-4 text-slate-300">
                            <li className="flex items-start">
                                <span className="text-emerald-500 mr-3 mt-1 font-bold">»</span>
                                <span><strong>Radical Transparency:</strong> All code is open-source. All architectural decisions are documented.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-emerald-500 mr-3 mt-1 font-bold">»</span>
                                <span><strong>Asynchronous by Default:</strong> No mandatory meetings. We measure output, not hours online.</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-emerald-500 mr-3 mt-1 font-bold">»</span>
                                <span><strong>Pseudonymity Accepted:</strong> You can apply and work under a pseudonym verified via PGP.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-slate-900/50 border border-slate-800 p-10 rounded-3xl relative overflow-hidden group">
                        <div className="absolute -left-10 -top-10 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Network className="w-64 h-64 text-blue-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-6">Manifesto</h3>
                        <p className="text-slate-300 leading-relaxed mb-6 font-mono text-sm max-w-md">
                            "Human trust scales poorly. Mathematics scales infinitely. We are replacing the reliance on lawyers and centralized databases with deterministic cryptography."
                        </p>
                        <p className="text-emerald-400 font-semibold text-sm tracking-wide">
                            — Digital Will Protocol Core Contributors
                        </p>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-8">Open Positions</h2>
                    <div className="space-y-6">
                        {openings.map((job, idx) => (
                            <Link href="/contact" key={idx} className="block bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_5px_20px_rgba(16,185,129,0.1)] group">
                                <div className="flex flex-col md:flex-row md:items-center justify-between">
                                    <div className="flex items-start mb-4 md:mb-0">
                                        <div className="p-3 bg-slate-950 rounded-xl mr-4 border border-slate-800 flex-shrink-0">
                                            {job.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors mb-1">
                                                {job.role}
                                            </h3>
                                            <div className="flex flex-wrap items-center text-sm text-slate-400 gap-3 mt-2">
                                                <span className="bg-slate-800 px-2 py-1 rounded text-slate-300">{job.department}</span>
                                                <span className="bg-slate-800 px-2 py-1 rounded text-slate-300">{job.type}</span>
                                                <span className="text-slate-500">{job.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between md:flex-col md:items-end md:justify-center border-t md:border-t-0 border-slate-800 pt-4 md:pt-0">
                                        <span className="text-emerald-400 font-mono text-sm md:mb-2">{job.salary}</span>
                                        <span className="flex items-center text-white text-sm font-semibold group-hover:text-emerald-300 transition-colors">
                                            Apply <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-16 text-center bg-slate-900/30 border border-slate-800 rounded-2xl p-8">
                        <h4 className="text-lg font-bold text-white mb-2">Don't see a fit?</h4>
                        <p className="text-slate-400 text-sm mb-4">
                            We are always looking for exceptional engineers who understand Zero-Knowledge proofs, Rust, or decentralized infrastructure.
                        </p>
                        <a href="mailto:careers@digitalwill.protocol" className="text-emerald-400 hover:text-emerald-300 font-semibold underline decoration-emerald-500/30 underline-offset-4 transition-colors">
                            Send us your GitHub
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
}
