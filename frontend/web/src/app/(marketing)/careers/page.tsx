'use client';

import { motion } from 'framer-motion';
import { Terminal, Code2, Globe, ArrowRight, Network, Fingerprint } from 'lucide-react';
import Link from 'next/link';

export default function CareersPage() {
    const defaultTransition = { duration: 1.5, ease: [0.16, 1, 0.3, 1] };

    const openings = [
        {
            role: "Principal Cryptography Engineer",
            department: "Core Architecture",
            type: "Full-Time",
            location: "Remote (Global)",
            salary: "$180k - $250k USDC / yr",
            icon: <Fingerprint className="h-6 w-6 text-slate-300" />
        },
        {
            role: "Smart Contract Auditor (Solidity/Vyper)",
            department: "Security & Governance",
            type: "Contract/Retainer",
            location: "Remote (Global)",
            salary: "$150k - $200k USDC / yr",
            icon: <Code2 className="h-6 w-6 text-slate-300" />
        },
        {
            role: "Distributed Systems Architect (IPFS)",
            department: "Infrastructure",
            type: "Full-Time",
            location: "Remote (Global)",
            salary: "$160k - $220k USDC / yr",
            icon: <Network className="h-6 w-6 text-slate-300" />
        }
    ];

    return (
        <div className="min-h-screen bg-[#020202] pt-40 pb-24 font-sans selection:bg-white/20 selection:text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={defaultTransition}
                    className="mb-40"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-[#111] rounded-full flex items-center justify-center border border-white/10">
                            <Globe className="h-5 w-5 text-white/70" />
                        </div>
                        <span className="text-white/40 uppercase tracking-[0.2em] text-xs font-bold">The Collective</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tighter text-white mb-8 leading-[0.9]">
                        Build the <br />
                        <span className="font-medium text-slate-500">Immutable.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed max-w-3xl">
                        We are a distributed, pseudonymous collective of engineers building the world's first mathematically infallible inheritance protocol. We operate asynchronously, transparently, and without borders.
                    </p>
                </motion.div>

                {/* Cultural Principles block */}
                <div className="grid md:grid-cols-2 gap-12 lg:gap-24 mb-40">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={defaultTransition}
                        className="p-12 lg:p-16 rounded-[3rem] bg-[#0a0a0a] border border-white/5 hover:border-white/10 transition-colors"
                    >
                        <h3 className="text-3xl font-medium text-white mb-10 tracking-tight">Radical Autonomy</h3>
                        <ul className="space-y-8 text-slate-400 font-light text-lg">
                            <li className="flex items-start">
                                <span className="text-white font-bold mr-4">—</span>
                                <div>
                                    <strong className="text-white font-normal block mb-1">Open Documentation</strong>
                                    All architectural decisions, research, and technical debt are documented publicly.
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="text-white font-bold mr-4">—</span>
                                <div>
                                    <strong className="text-white font-normal block mb-1">Asynchronous by Default</strong>
                                    No mandatory standups. No surveillance. We measure cryptographic output and code quality, not hours online.
                                </div>
                            </li>
                            <li className="flex items-start">
                                <span className="text-white font-bold mr-4">—</span>
                                <div>
                                    <strong className="text-white font-normal block mb-1">Pseudonymity Accepted</strong>
                                    We do not require your real identity. You can apply, work, and be compensated under a verified PGP pseudonym.
                                </div>
                            </li>
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={defaultTransition}
                        className="p-12 lg:p-16 rounded-[3rem] bg-[#111] border border-white/5 relative overflow-hidden flex flex-col justify-center"
                    >
                        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2600')] bg-cover mix-blend-luminosity grayscale"></div>
                        <h3 className="text-3xl font-medium text-white mb-8 tracking-tight relative z-10">The Mandate</h3>
                        <p className="text-2xl text-slate-300 font-serif italic font-light leading-relaxed mb-8 relative z-10">
                            "Human trust scales poorly. Mathematics scales infinitely. We are replacing the reliance on lawyers and centralized databases with deterministic cryptography."
                        </p>
                        <p className="text-white font-medium uppercase tracking-widest text-xs relative z-10">
                            — DWP Core Contributors
                        </p>
                    </motion.div>
                </div>

                {/* Open Positions */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={defaultTransition}
                    className="max-w-5xl mx-auto"
                >
                    <div className="flex items-center justify-between mb-16 border-b border-white/10 pb-8">
                        <h2 className="text-5xl font-medium text-white tracking-tighter">Open Positions.</h2>
                        <span className="text-slate-500 font-mono text-sm uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full hidden md:block">3 Roles Available</span>
                    </div>

                    <div className="space-y-6">
                        {openings.map((job, idx) => (
                            <Link href="/contact" key={idx} className="block bg-[#050505] border border-white/5 hover:border-white/20 rounded-[2rem] p-8 lg:p-10 transition-all duration-500 group">
                                <div className="flex flex-col md:flex-row md:items-center justify-between">
                                    <div className="flex items-center mb-6 md:mb-0">
                                        <div className="w-16 h-16 bg-[#111] rounded-2xl border border-white/5 flex items-center justify-center mr-6 group-hover:bg-white/5 transition-colors">
                                            {job.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-medium text-white group-hover:text-slate-300 transition-colors tracking-tight mb-2">
                                                {job.role}
                                            </h3>
                                            <div className="flex flex-wrap items-center text-sm font-mono gap-4 uppercase tracking-widest text-slate-500">
                                                <span>{job.department}</span>
                                                <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                                                <span>{job.type}</span>
                                                <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                                                <span>{job.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between md:flex-col md:items-end md:justify-center">
                                        <span className="text-slate-400 font-mono text-sm md:mb-4">{job.salary}</span>
                                        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                                            <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-24 text-center">
                        <h4 className="text-xl font-medium text-white mb-4">Don't see a fit?</h4>
                        <p className="text-slate-400 text-lg font-light mb-8 max-w-xl mx-auto">
                            We are always looking for exceptional engineers who understand Zero-Knowledge proofs, Rust, or decentralized infrastructure.
                        </p>
                        <a href="mailto:careers@digitalwill.protocol" className="inline-block border-b border-white/30 text-white pb-1 font-medium tracking-wide hover:border-white transition-colors">
                            Provide your PGP or GitHub
                        </a>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
