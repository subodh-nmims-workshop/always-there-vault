'use client'

import { ThemeToggle } from '@/components/theme-toggle';

import { motion } from 'framer-motion';
import { Globe, ArrowRight, Network, Fingerprint, LockKeyhole, Github, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { SharedFooter } from '@/components/shared-footer';

export default function CareersPage() {
    const defaultTransition: any = { duration: 0.8, ease: "easeOut" };

    const openings = [
        {
            role: "Principal Cryptography Engineer",
            department: "Core Architecture",
            type: "Full-Time",
            location: "Remote (Global)",
            salary: "$180k - $250k USDC / yr",
            icon: <Fingerprint className="h-6 w-6 text-[#2b52ff]" />
        },
        {
            role: "Smart Contract Auditor",
            department: "Security & Governance",
            type: "Contract/Retainer",
            location: "Remote (Global)",
            salary: "$150k - $200k USDC / yr",
            icon: <LockKeyhole className="h-6 w-6 text-[#2b52ff]" />
        },
        {
            role: "Distributed Systems Architect (IPFS)",
            department: "Infrastructure",
            type: "Full-Time",
            location: "Remote (Global)",
            salary: "$160k - $220k USDC / yr",
            icon: <Network className="h-6 w-6 text-[#2b52ff]" />
        }
    ];

    return (
        <div className="min-h-screen bg-[#050a1a] font-sans selection:bg-[#2b52ff]/30 selection:text-white relative overflow-hidden flex flex-col">

            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-[#050a1a]/80 backdrop-blur-xl border-b border-white/5 px-4 sm:px-8 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
          <img src="/logo-simple.png" alt="AlwaysThere Logo" className="h-10 w-auto object-contain group-hover:scale-110 transition-transform duration-300" />
          <div className="flex flex-col text-left">
            <span className="text-xl font-black tracking-wider text-slate-900 dark:text-white leading-none">ALWAYS THERE</span>
            <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-none mt-1.5">SECURE YOUR DIGITAL LEGACY</span>
          </div>
        </Link>
                <div className="hidden md:flex gap-8 items-center absolute left-1/2 -translate-x-1/2">
                    <Link href="/about" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">About</Link>
                    <Link href="/blog" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Blog</Link>
                    <Link href="/careers" className="text-white transition-colors text-sm font-medium">Careers</Link>
                    <Link href="/contact" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Contact</Link>
                </div>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <Link href="/" className="bg-[#2b52ff] hover:bg-[#2b52ff]/80 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-[0_0_20px_rgba(43,82,255,0.4)]">
                    Dashboard
                </Link>
                </div>
            </nav>

            {/* Ambient background meshes */}
            <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#2b52ff]/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none"></div>

            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-32 pb-32">

                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={defaultTransition}
                    className="mb-32 text-center"
                >
                    <div className="inline-flex items-center gap-3 mb-8 border border-[#2b52ff]/20 bg-[#2b52ff]/10 backdrop-blur-md px-4 py-1.5 rounded-full uppercase tracking-widest text-xs font-bold text-[#2b52ff] shadow-lg shadow-[#2b52ff]/5">
                        <Globe className="h-4 w-4" />
                        <span>The Collective</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-8 leading-[1.05]">
                        Build the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2b52ff] to-[#a259ff]">Immutable.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-blue-100/70 font-medium leading-relaxed max-w-3xl mx-auto">
                        We are a distributed, pseudonymous collective of engineers building the world's first mathematically infallible inheritance protocol. We operate asynchronously, transparently, and without borders.
                    </p>
                </motion.div>

                {/* Cultural Principles block */}
                <div className="grid md:grid-cols-2 gap-8 lg:gap-10 mb-32 max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={defaultTransition}
                        className="p-10 lg:p-14 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.03] transition-colors shadow-2xl shadow-black/40 backdrop-blur-md relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#2b52ff]/5 rounded-full blur-[60px] pointer-events-none transition-transform group-hover:scale-150 duration-700"></div>
                        <h3 className="text-3xl font-bold text-white mb-10 tracking-tight">Radical Autonomy</h3>
                        <ul className="space-y-8 text-blue-100/60 font-medium text-base relative z-10">
                            <li className="flex items-start bg-white/[0.01] p-4 rounded-2xl border border-white/5">
                                <CheckCircle2 className="text-[#2b52ff] shrink-0 mr-4 w-6 h-6" />
                                <div>
                                    <strong className="text-white font-bold block mb-1">Open Documentation</strong>
                                    All architectural decisions, research, and technical debt are documented publicly.
                                </div>
                            </li>
                            <li className="flex items-start bg-white/[0.01] p-4 rounded-2xl border border-white/5">
                                <CheckCircle2 className="text-[#2b52ff] shrink-0 mr-4 w-6 h-6" />
                                <div>
                                    <strong className="text-white font-bold block mb-1">Asynchronous by Default</strong>
                                    No mandatory standups. No surveillance. We measure cryptographic output and code quality, not hours online.
                                </div>
                            </li>
                            <li className="flex items-start bg-white/[0.01] p-4 rounded-2xl border border-white/5">
                                <CheckCircle2 className="text-[#2b52ff] shrink-0 mr-4 w-6 h-6" />
                                <div>
                                    <strong className="text-white font-bold block mb-1">Pseudonymity Accepted</strong>
                                    We do not require your real identity. Apply, work, and be compensated under a verified PGP pseudonym.
                                </div>
                            </li>
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ ...defaultTransition, delay: 0.1 }}
                        className="p-10 lg:p-14 rounded-[2rem] bg-gradient-to-br from-[#101b3d] to-[#050a1a] border border-[#2b52ff]/20 shadow-2xl shadow-[#2b52ff]/10 relative overflow-hidden flex flex-col justify-center group hover:border-[#2b52ff]/40 transition-colors"
                    >
                        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80')] bg-cover mix-blend-screen transition-transform duration-1000 group-hover:scale-105 pointer-events-none"></div>
                        <div className="w-14 h-14 bg-[#2b52ff]/20 rounded-xl flex items-center justify-center mb-8 border border-[#2b52ff]/30 relative z-10 shadow-lg shadow-[#2b52ff]/20">
                            <Github className="w-6 h-6 text-[#2b52ff]" />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-6 tracking-tight relative z-10">The Mandate</h3>
                        <p className="text-xl text-blue-100/90 font-medium leading-relaxed mb-8 relative z-10 italic">
                            "Human trust scales poorly. Mathematics scales infinitely. We are replacing the reliance on lawyers and centralized databases with deterministic cryptography."
                        </p>
                        <p className="text-[#2b52ff] font-bold uppercase tracking-widest text-xs relative z-10">
                            — DWP Core Contributors
                        </p>
                    </motion.div>
                </div>

                {/* Open Positions */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={defaultTransition}
                    className="max-w-5xl mx-auto"
                >
                    <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-6">
                        <h2 className="text-4xl font-bold text-white tracking-tight">Open Positions.</h2>
                        <span className="text-slate-400 font-bold text-xs uppercase tracking-widest bg-white/5 border border-white/10 px-4 py-2 rounded-full hidden md:block">{openings.length} Roles Available</span>
                    </div>

                    <div className="space-y-4">
                        {openings.map((job, idx) => (
                            <Link href="/contact" key={idx} className="block bg-white/[0.01] border border-white/5 hover:border-[#2b52ff]/40 hover:bg-white/[0.03] rounded-[1.5rem] p-8 lg:p-10 transition-all duration-300 group shadow-lg shadow-black/20 hover:shadow-[#2b52ff]/5">
                                <div className="flex flex-col md:flex-row md:items-center justify-between">
                                    <div className="flex items-center mb-6 md:mb-0">
                                        <div className="w-16 h-16 bg-[#0a1536] rounded-2xl border border-[#2b52ff]/20 flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                                            {job.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-white group-hover:text-[#2b52ff] transition-colors tracking-tight mb-3">
                                                {job.role}
                                            </h3>
                                            <div className="flex flex-wrap items-center text-xs font-bold gap-3 uppercase tracking-widest text-slate-400">
                                                <span className="bg-white/5 px-2 py-1 rounded">{job.department}</span>
                                                <span className="bg-[#2b52ff]/10 text-[#2b52ff] px-2 py-1 rounded">{job.type}</span>
                                                <span className="text-slate-500">{job.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between md:flex-col md:items-end md:justify-center">
                                        <span className="text-white font-mono font-medium text-sm md:mb-4 bg-black/30 px-3 py-1.5 rounded-lg border border-white/5">{job.salary}</span>
                                        <div className="w-12 h-12 rounded-full bg-[#2b52ff] flex items-center justify-center text-white opacity-0 md:opacity-100 md:scale-0 group-hover:scale-100 transition-all duration-300 shadow-lg shadow-[#2b52ff]/30">
                                            <ArrowRight className="h-5 w-5" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-24 text-center pb-12">
                        <h4 className="text-2xl font-bold text-white mb-4 tracking-tight">Don't see a fit?</h4>
                        <p className="text-blue-100/60 text-lg font-medium mb-8 max-w-xl mx-auto">
                            We are always looking for exceptional engineers who understand Zero-Knowledge proofs, Rust, or decentralized infrastructure.
                        </p>
                        <a href="mailto:careers@digitalwill.protocol" className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm px-8 py-4 rounded-full tracking-wider uppercase transition-colors">
                            Submit your PGP / GitHub
                        </a>
                    </div>
                </motion.div>

            </main>

            <SharedFooter />
        </div>
    );
}

