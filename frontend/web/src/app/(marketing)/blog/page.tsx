'use client';

import { Calendar, ChevronRight, User, Tag, BookOpen, Clock, ArrowUpRight, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { SharedFooter } from '@/components/shared-footer';

export default function BlogPage() {
    const defaultTransition: any = { duration: 0.8, ease: "easeOut" };

    const heroVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: defaultTransition }
    };

    const posts = [
        {
            title: "Post-Mortem Cryptography: The Mathematics of Inheritance",
            excerpt: "How we utilize Shamir Secret Sharing over GF(2^8) to fundamentally eliminate the single point of failure in digital asset custody. An analysis of multi-party computation and why legacy legal frameworks are structurally incapable of bridging into Web3 without algorithmic enforcement.",
            date: "Oct 24, 2026",
            author: "Dr. Aris Thorne",
            category: "Core Architecture",
            readTime: "8 min read",
            image: "https://images.unsplash.com/photo-1639762681485-074b7f4d2315?q=80&w=2600&auto=format&fit=crop"
        },
        {
            title: "Auditing the Immutable: Zero-Knowledge Switches",
            excerpt: "A rigorous deep dive into our recent Halborn smart contract audit. We explore the implementation of temporal decay functions, proving mathematical resistance against front-running, reentrancy attacks, and unauthorized state manipulations on the Polygon blockchain.",
            date: "Oct 12, 2026",
            author: "Protocol Engineering",
            category: "Smart Contracts",
            readTime: "12 min read",
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2600&auto=format&fit=crop"
        },
        {
            title: "The Fallacy of Traditional Estate Planning",
            excerpt: "The fundamental flaw in giving a lawyer your seed phrase, and why programmatic legal execution is the only sovereign path forward. We breakdown exactly how the AlwaysThere Protocol bypasses the probate process entirely via autonomous execution.",
            date: "Sep 28, 2026",
            author: "Governance DAO",
            category: "Philosophy",
            readTime: "6 min read",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2600&auto=format&fit=crop"
        },
        {
            title: "AES-256-GCM in the Browser: Overcoming SSR Bottlenecks",
            excerpt: "Engineering a secure client-side encryption pipeline requires overcoming massive React hydration and Server-Side Rendering hurdles. Here is how we orchestrated pure client-side AES before any IPFS transit.",
            date: "Sep 15, 2026",
            author: "Frontend Architecture",
            category: "Engineering",
            readTime: "10 min read",
            image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2600&auto=format&fit=crop"
        },
        {
            title: "Decentralized Storage: IPFS vs Arweave for Encrypted Blobs",
            excerpt: "A technical comparison of immutable storage networks and why AlwaysThere utilizes IPFS with a pinning coalition for immediate availability, backed by Arweave for permanent archival persistence.",
            date: "Aug 30, 2026",
            author: "Infrastructure Team",
            category: "Infrastructure",
            readTime: "14 min read",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2600&auto=format&fit=crop"
        }
    ];

    return (
        <div className="min-h-screen bg-[#0a0c10] font-sans selection:bg-[#2b52ff]/30 selection:text-white flex flex-col relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="fixed top-0 inset-x-0 h-[800px] pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-[#1152d4]/10 blur-[130px] rounded-full mix-blend-screen"></div>
                <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-purple-900/10 blur-[120px] rounded-full mix-blend-screen"></div>
            </div>

            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-[#0a0c10]/80 backdrop-blur-xl border-b border-white/5 px-4 sm:px-8 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="text-[#1152d4] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Shield className="w-8 h-8" />
                    </div>
                    <span className="font-bold text-xl tracking-tight hidden sm:block text-white">AlwaysThere</span>
                </Link>
                <div className="hidden md:flex gap-8 items-center absolute left-1/2 -translate-x-1/2">
                    <Link href="/features" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Features</Link>
                    <Link href="/docs" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Documentation</Link>
                    <Link href="/security" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Security</Link>
                    <Link href="/blog" className="text-white transition-colors text-sm font-medium">Blog</Link>
                </div>
                <Link href="/" className="bg-[#1152d4] hover:bg-[#1152d4]/80 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-[0_0_20px_rgba(17,82,212,0.4)]">
                    Launch App
                </Link>
            </nav>

            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16 w-full">

                {/* Header Section */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={heroVariants}
                    className="mb-24 max-w-4xl"
                >
                    <motion.div variants={itemVariants} className="inline-flex items-center gap-3 mb-8 border border-white/10 bg-white/[0.03] backdrop-blur-xl px-4 py-2 rounded-full uppercase tracking-[0.2em] text-[10px] text-slate-300 font-semibold shadow-xl shadow-[#2b52ff]/5">
                        <BookOpen className="h-3 w-3 text-[#1152d4]" />
                        <span>The DWP Engineering Journal</span>
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8 leading-[1.05]">
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-extrabold pb-2">Protocol</span>
                        Research & Insights.
                    </motion.h1>

                    <motion.p variants={itemVariants} className="text-xl md:text-2xl text-slate-400 font-normal leading-relaxed max-w-2xl">
                        A rigorous exploration of the mathematics, distributed systems, and immutable architecture powering the world's most secure digital inheritance protocol.
                    </motion.p>
                </motion.div>

                {/* Featured Master Piece */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={defaultTransition}
                    className="mb-20"
                >
                    <Link href="#" className="group block relative w-full overflow-hidden rounded-[2rem] bg-white/[0.02] backdrop-blur-md shadow-2xl shadow-black/50 border border-white/5 transition-all duration-300 hover:border-white/20 hover:shadow-[#1152d4]/10">
                        <div className="grid lg:grid-cols-2 min-h-[500px]">
                            {/* Image Side with slow pan */}
                            <div className="relative overflow-hidden h-full min-h-[350px]">
                                <motion.div
                                    className="absolute inset-0 w-full h-full bg-cover bg-center origin-center transition-transform duration-700 ease-out group-hover:scale-105"
                                    style={{ backgroundImage: `url('${posts[0].image}')` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0c10]/90 via-[#0a0c10]/40 to-transparent lg:hidden"></div>
                            </div>

                            {/* Content Side */}
                            <div className="relative p-10 lg:p-14 flex flex-col justify-center border-l-0 lg:border-l border-white/5 bg-[#0a0c10]/40 backdrop-blur-sm">
                                <div className="flex items-center gap-4 mb-8">
                                    <span className="bg-[#1152d4]/10 text-[#5c8df6] border border-[#1152d4]/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">{posts[0].category}</span>
                                    <span className="text-slate-400 text-xs tracking-wider flex items-center font-medium"><Clock className="w-3 h-3 mr-2" />{posts[0].readTime}</span>
                                </div>

                                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-5 leading-tight tracking-tight group-hover:text-[#5c8df6] transition-colors duration-300">
                                    {posts[0].title}
                                </h2>

                                <p className="text-base text-slate-400 mb-10 font-normal leading-relaxed">
                                    {posts[0].excerpt}
                                </p>

                                <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-black/40 rounded-full flex items-center justify-center border border-white/10">
                                            <User className="h-4 w-4 text-slate-300" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-white">{posts[0].author}</p>
                                            <p className="text-xs text-slate-500 font-medium mt-0.5">{posts[0].date}</p>
                                        </div>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-[#1152d4]/20 border border-[#1152d4]/40 flex items-center justify-center shadow-lg group-hover:bg-[#1152d4] text-white transition-all duration-300 transform group-hover:scale-110">
                                        <ArrowUpRight className="h-4 w-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </motion.div>

                {/* Secondary Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 pb-32">
                    {posts.slice(1).map((post, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ ...defaultTransition, delay: idx * 0.1 }}
                        >
                            <Link href="#" className="group block bg-white/[0.02] backdrop-blur-md shadow-xl shadow-black/40 border border-white/5 rounded-[2rem] overflow-hidden hover:border-white/20 hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
                                {/* Image Container */}
                                <div className="relative h-64 overflow-hidden">
                                    <div
                                        className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                                        style={{ backgroundImage: `url('${post.image}')` }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10] via-[#0a0c10]/50 to-transparent opacity-90"></div>

                                    <div className="absolute top-5 left-5">
                                        <span className="bg-black/50 border border-white/10 backdrop-blur-xl text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content Container */}
                                <div className="p-8 flex flex-col flex-grow bg-gradient-to-b from-[#0a0c10]/0 to-[#0a0c10]">
                                    <div className="flex items-center gap-3 text-xs text-slate-400 font-semibold mb-4">
                                        <span className="flex items-center"><Calendar className="w-3 h-3 mr-1.5" />{post.date}</span>
                                        <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                                        <span>{post.readTime}</span>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-3 tracking-tight leading-snug group-hover:text-[#5c8df6] transition-colors duration-300">
                                        {post.title}
                                    </h3>

                                    <p className="text-slate-400 font-normal text-sm leading-relaxed mb-8 flex-grow">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between pt-5 border-t border-white/10 mt-auto">
                                        <p className="text-sm font-semibold text-slate-300">{post.author}</p>
                                        <ArrowUpRight className="h-5 w-5 text-[#5c8df6] opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Newsletter Sub - Bento Style */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={defaultTransition}
                    className="rounded-[2rem] p-10 lg:p-16 relative overflow-hidden bg-gradient-to-br from-[#1152d4]/10 to-purple-900/10 border border-white/10 shadow-2xl backdrop-blur-xl flex flex-col items-center mb-32"
                >
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80')] opacity-5 mix-blend-overlay bg-cover bg-center pointer-events-none"></div>
                    <div className="w-16 h-16 bg-[#1152d4]/20 rounded-2xl flex items-center justify-center border border-[#1152d4]/30 mb-6 shadow-[0_0_30px_rgba(17,82,212,0.3)]">
                        <Tag className="w-8 h-8 text-[#5c8df6]" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4 text-center">Stay ahead of the curve.</h3>
                    <p className="text-slate-400 text-base mb-10 max-w-xl text-center font-medium">
                        Subscribe to receive rare technical briefings on decentralized hardware, zero-knowledge proofs, and smart contract architecture.
                    </p>
                    <div className="relative w-full max-w-lg group">
                        <input
                            type="text"
                            className="w-full bg-black/40 backdrop-blur-md border border-white/10 text-white rounded-2xl px-6 py-4 focus:outline-none focus:border-[#1152d4] focus:ring-1 focus:ring-[#1152d4] transition-all placeholder:text-slate-500 font-medium text-sm shadow-inner"
                            placeholder="YOUR EMAIL OR ENS..."
                        />
                        <button className="absolute right-1.5 top-1.5 bottom-1.5 bg-[#1152d4] text-white hover:bg-[#1152d4]/80 font-bold px-6 rounded-xl transition-all flex items-center text-sm shadow-md">
                            Subscribe
                        </button>
                    </div>
                </motion.div>

            </main>

            <SharedFooter />
        </div>
    );
}
