'use client';

import { motion } from 'framer-motion';
import { Compass, Search, FileText, ArrowRight, BookOpen } from 'lucide-react';

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
            desc: "A theoretical breakdown of distributing AES decryption keys across an N-of-M network.",
        },
        {
            title: "Verifying the Smart Contract on Polygon",
            cat: "Smart Contract Integration",
            desc: "How to use hardhat and the Etherscan API to independently verify the contract bytecode.",
        },
        {
            title: "Client-Side Zero-Knowledge Flow in React",
            cat: "Frontend Implementation",
            desc: "Overcoming SSR bottlenecks to ensure keys never leak during hydration.",
        },
        {
            title: "Setting up a Heartbeat Server",
            cat: "Node Architecture",
            desc: "Running an automated python script to maintain your alive status on-chain.",
        }
    ];

    return (
        <div className="min-h-screen bg-[#050a1a] pt-32 pb-24 font-sans selection:bg-[#2b52ff]/30 selection:text-white relative overflow-hidden">

            <div className="absolute top-[10%] left-[50%] -translate-x-1/2 w-[800px] h-[400px] bg-[#2b52ff]/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

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
                            placeholder="Search architecture..."
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

                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-24">
                    {guides.map((guide, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ ...defaultTransition, delay: idx * 0.1 }}
                        >
                            <a href="#" className="block p-10 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 group shadow-xl shadow-black/20 h-full flex flex-col relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#2b52ff]/5 rounded-full blur-[30px] -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700 pointer-events-none"></div>

                                <span className="bg-[#2b52ff]/20 text-[#2b52ff] text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest border border-[#2b52ff]/30 w-max mb-6">
                                    {guide.cat}
                                </span>
                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#2b52ff] transition-colors leading-snug tracking-tight">
                                    {guide.title}
                                </h3>
                                <p className="text-blue-100/60 font-medium mb-8 leading-relaxed flex-grow">
                                    {guide.desc}
                                </p>
                                <div className="flex items-center text-sm font-bold text-slate-300 mt-auto pt-6 border-t border-white/5">
                                    <BookOpen className="w-4 h-4 mr-2 text-[#2b52ff]" /> Read Documentation
                                </div>
                            </a>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
}
