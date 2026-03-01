'use client';

import { motion } from 'framer-motion';
import { Compass, Search, FileText, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { SharedFooter } from '@/components/shared-footer';

export default function GuidesPage() {
    const defaultTransition = { duration: 0.8, ease: "easeOut" as any };

    const categories = [
        "Cryptographic Theory",
        "Smart Contract Integration",
        "Frontend Implementation",
        "Node Architecture"
    ];

    const guides = [
        {
            title: "Implementing Multi-Party Computation",
            cat: "Cryptographic Theory",
            desc: "A theoretical breakdown of distributing AES decryption keys across an M-of-N validator network using Shamir's Secret Sharing.",
        },
        {
            title: "Verifying the Smart Contract on Polygon",
            cat: "Smart Contract Integration",
            desc: "Step-by-step guide to using Hardhat and the Etherscan API to independently verify our deployed EVM bytecode.",
        },
        {
            title: "Client-Side Zero-Knowledge Flow in React",
            cat: "Frontend Implementation",
            desc: "Overcoming SSR bottlenecks in Next.js to ensure encryption keys never leak during hydration.",
        },
        {
            title: "Setting up a Heartbeat Relayer",
            cat: "Node Architecture",
            desc: "Run a dockerized Python script to monitor addresses and automate L2 gasless heartbeat signatures on behalf of your users.",
        },
        {
            title: "Handling Beneficiary Claims Safely",
            cat: "Smart Contract Integration",
            desc: "How beneficiaries can prove ownership of an assigned wallet address without compromising their identity prior to claim.",
        },
        {
            title: "Pinning Encrypted Blobs to IPFS",
            cat: "Node Architecture",
            desc: "Best practices for utilizing Storacha (web3.storage) or dedicated IPFS nodes to ensure your encrypted assets are never garbage collected.",
        }
    ];

    return (
        <div className="min-h-screen bg-[#050a1a] font-sans selection:bg-[#2b52ff]/30 selection:text-white relative overflow-hidden flex flex-col">

            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-[#050a1a]/80 backdrop-blur-xl border-b border-white/5 px-4 sm:px-8 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="text-[#2b52ff] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Compass className="w-8 h-8" />
                    </div>
                    <span className="font-bold text-xl tracking-tight hidden sm:block">DeadMan Guides</span>
                </Link>
                <div className="hidden md:flex gap-8 items-center absolute left-1/2 -translate-x-1/2">
                    <Link href="/docs" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Documentation</Link>
                    <Link href="/api" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">API Reference</Link>
                    <Link href="/guides" className="text-white transition-colors text-sm font-medium">Guides</Link>
                </div>
                <Link href="/" className="bg-[#2b52ff] hover:bg-[#2b52ff]/80 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-[0_0_20px_rgba(43,82,255,0.4)]">
                    Dashboard
                </Link>
            </nav>

            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 pb-32">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={defaultTransition}
                    className="mb-20 text-center max-w-4xl mx-auto"
                >
                    <div className="inline-flex items-center gap-3 mb-8 border border-[#2b52ff]/20 bg-[#2b52ff]/10 backdrop-blur-md px-4 py-1.5 rounded-full uppercase tracking-widest text-[#2b52ff] text-xs font-bold shadow-lg shadow-[#2b52ff]/5">
                        <Compass className="h-4 w-4" />
                        <span>Knowledge Base</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-8 leading-[1.05]">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#2b52ff]">Guides</span> & Tutorials.
                    </h1>

                    {/* Search Bar Bento Style */}
                    <div className="relative w-full max-w-2xl mx-auto mt-12 group">
                        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                            <Search className="h-6 w-6 text-slate-400 group-hover:text-[#2b52ff] transition-colors" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-16 pr-6 py-6 bg-white/[0.02] border border-white/10 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-[#2b52ff] focus:border-[#2b52ff] transition-all font-medium text-lg leading-none shadow-xl shadow-black/30 backdrop-blur-md"
                            placeholder="Search architecture, integration patterns..."
                        />
                    </div>
                </motion.div>

                {/* Categories */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ ...defaultTransition, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-4 mb-20"
                >
                    <button className="bg-[#2b52ff] text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-[#2b52ff]/30 border border-[#2b52ff]">All Guides</button>
                    {categories.map((cat, i) => (
                        <button key={i} className="bg-white/[0.03] text-slate-300 hover:text-white px-6 py-2.5 rounded-full text-sm font-bold border border-white/10 hover:border-white/20 hover:bg-white/[0.05] transition-all tracking-wide">
                            {cat}
                        </button>
                    ))}
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24">
                    {guides.map((guide, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ ...defaultTransition, delay: idx * 0.1 }}
                        >
                            <a href="#" className="block p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 group shadow-xl shadow-black/20 h-full flex flex-col relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#2b52ff]/5 rounded-full blur-[30px] -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700 pointer-events-none"></div>

                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 block group-hover:text-[#2b52ff] transition-colors">
                                    {guide.cat}
                                </span>
                                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors leading-snug tracking-tight">
                                    {guide.title}
                                </h3>
                                <p className="text-blue-100/60 font-medium mb-8 leading-relaxed flex-grow text-sm">
                                    {guide.desc}
                                </p>
                                <div className="flex items-center text-sm font-bold text-[#2b52ff] mt-auto pt-6 border-t border-white/5 group-hover:text-white transition-colors">
                                    <BookOpen className="w-4 h-4 mr-2" /> Read Guide <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                </div>
                            </a>
                        </motion.div>
                    ))}
                </div>
            </main>

            <SharedFooter />
        </div>
    );
}
