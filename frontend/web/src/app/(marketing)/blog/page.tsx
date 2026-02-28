'use client';

import { Calendar, ChevronRight, User, Tag, BookOpen, Clock, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function BlogPage() {
    const defaultTransition = { duration: 1.2, ease: [0.16, 1, 0.3, 1] }; // Slow lux ease

    const heroVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { ...defaultTransition, staggerChildren: 0.2 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: defaultTransition }
    };

    const coverImages = [
        "https://images.unsplash.com/photo-1639762681485-074b7f4d2315?q=80&w=2600&auto=format&fit=crop", // Abstract nodes
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2600&auto=format&fit=crop", // Abstract shapes/marble
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2600&auto=format&fit=crop"  // Deep tech abstract
    ];

    const posts = [
        {
            title: "Post-Mortem Cryptography: The Mathematics of Inheritance",
            excerpt: "How we utilize Shamir Secret Sharing over GF(2^8) to fundamentally eliminate the single point of failure in digital asset custody. An analysis of multi-party computation and why legacy legal frameworks are structurally incapable of bridging into Web3 without algorithmic enforcement.",
            date: "Oct 24, 2026",
            author: "Dr. Aris Thorne",
            category: "Core Architecture",
            readTime: "8 min read",
            image: coverImages[0]
        },
        {
            title: "Auditing the Immutable: Zero-Knowledge Switches",
            excerpt: "A rigorous deep dive into our recent Halborn smart contract audit. We explore the implementation of temporal decay functions, proving mathematical resistance against front-running, reentrancy attacks, and unauthorized state manipulations on the Polygon blockchain.",
            date: "Oct 12, 2026",
            author: "Protocol Engineering",
            category: "Smart Contracts",
            readTime: "12 min read",
            image: coverImages[1]
        },
        {
            title: "The Fallacy of Traditional Estate Planning",
            excerpt: "The fundamental flaw in giving a lawyer your seed phrase, and why programmatic legal execution is the only sovereign path forward. We breakdown exactly how the Digital Will Protocol bypasses the probate process entirely via autonomous execution.",
            date: "Sep 28, 2026",
            author: "Governance DAO",
            category: "Philosophy",
            readTime: "6 min read",
            image: coverImages[2]
        },
        {
            title: "AES-256-GCM in the Browser: Overcoming SSR Bottlenecks",
            excerpt: "Engineering a secure client-side encryption pipeline requires overcoming massive React hydration and Server-Side Rendering hurdles. Here is how we orchestrated pure client-side AES before any IPFS transit.",
            date: "Sep 15, 2026",
            author: "Frontend Architecture",
            category: "Engineering",
            readTime: "10 min read",
            image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2600&auto=format&fit=crop"
        }
    ];

    return (
        <div className="min-h-screen bg-[#050505] pt-32 pb-24 font-sans selection:bg-purple-500/30 selection:text-purple-200">
            {/* Ambient Background Glow */}
            <div className="fixed top-0 inset-x-0 h-[800px] pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-purple-900/10 blur-[130px] rounded-full mix-blend-screen"></div>
                <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-blue-900/10 blur-[120px] rounded-full mix-blend-screen"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Header Section */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={heroVariants}
                    className="mb-32 max-w-4xl"
                >
                    <motion.div variants={itemVariants} className="inline-flex items-center gap-3 mb-8 border border-white/5 bg-white/[0.02] backdrop-blur-md px-4 py-2 rounded-full uppercase tracking-[0.2em] text-[10px] text-slate-400 font-medium">
                        <BookOpen className="h-3 w-3 text-purple-400" />
                        <span>The DWP Engineering Journal</span>
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter text-white mb-8 leading-[1.05]">
                        <span className="block text-slate-500 font-light">Protocol</span>
                        Research & Insights.
                    </motion.h1>

                    <motion.p variants={itemVariants} className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed max-w-2xl">
                        A rigorous exploration of the mathematics, distributed systems, and immutable architecture powering the world's most secure digital inheritance protocol.
                    </motion.p>
                </motion.div>

                {/* Featured Master Piece */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={defaultTransition}
                    className="mb-24"
                >
                    <Link href="#" className="group block relative w-full overflow-hidden rounded-[2.5rem] bg-[#111] border border-white/5 transition-colors hover:border-white/10">
                        <div className="grid lg:grid-cols-2 min-h-[600px]">
                            {/* Image Side with slow pan */}
                            <div className="relative overflow-hidden h-full min-h-[400px]">
                                <motion.div
                                    className="absolute inset-0 w-full h-full bg-cover bg-center origin-center transition-transform duration-[20s] ease-linear group-hover:scale-110"
                                    style={{ backgroundImage: \`url('\${posts[0].image}')\` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent lg:hidden"></div>
                            </div>

                            {/* Content Side */}
                            <div className="relative p-12 lg:p-20 flex flex-col justify-center bg-gradient-to-r from-[#050505] to-[#111] border-l border-white/5">
                                <div className="flex items-center gap-4 mb-8">
                                    <span className="text-purple-400 text-xs font-bold uppercase tracking-[0.15em]">{posts[0].category}</span>
                                    <span className="text-slate-600 text-xs">|</span>
                                    <span className="text-slate-400 text-xs tracking-wider flex items-center"><Clock className="w-3 h-3 mr-2" />{posts[0].readTime}</span>
                                </div>

                                <h2 className="text-4xl lg:text-5xl font-medium text-white mb-6 leading-[1.1] tracking-tight group-hover:text-purple-300 transition-colors duration-500">
                                    {posts[0].title}
                                </h2>

                                <p className="text-lg text-slate-400 mb-12 font-light leading-relaxed">
                                    {posts[0].excerpt}
                                </p>

                                <div className="flex items-center justify-between mt-auto pt-8 border-t border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-[#222] rounded-full flex items-center justify-center border border-white/10">
                                            <User className="h-5 w-5 text-slate-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white">{posts[0].author}</p>
                                            <p className="text-xs text-slate-500 tracking-wider mt-1">{posts[0].date}</p>
                                        </div>
                                    </div>
                                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 transform group-hover:-rotate-45">
                                        <ArrowUpRight className="h-5 w-5" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </motion.div>

                {/* Secondary Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
                    {posts.slice(1).map((post, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ ...defaultTransition, delay: idx * 0.15 }}
                        >
                            <Link href="#" className="group block bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 transition-colors h-full flex flex-col">
                                {/* Image Container */}
                                <div className="relative h-64 overflow-hidden bg-[#111]">
                                    <div
                                        className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-[15s] ease-linear group-hover:scale-110"
                                        style={{ backgroundImage: \`url('\${post.image}')\` }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>

                                    <div className="absolute top-6 left-6">
                                        <span className="bg-black/50 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-[0.15em]">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content Container */}
                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex items-center gap-4 text-xs text-slate-400 tracking-wider mb-5">
                                        <span className="flex items-center"><Calendar className="w-3 h-3 mr-2" />{post.date}</span>
                                        <span>•</span>
                                        <span>{post.readTime}</span>
                                    </div>

                                    <h3 className="text-2xl font-medium text-white mb-4 tracking-tight leading-snug group-hover:text-blue-300 transition-colors duration-500">
                                        {post.title}
                                    </h3>

                                    <p className="text-slate-400 font-light text-sm leading-relaxed mb-8 flex-grow">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                                        <p className="text-sm font-medium text-slate-300">{post.author}</p>
                                        <ArrowUpRight className="h-4 w-4 text-slate-500 group-hover:text-white transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Newsletter Sub */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={defaultTransition}
                    className="rounded-[3rem] p-12 lg:p-24 relative overflow-hidden bg-[#0a0a0a] border border-white/10 text-center flex flex-col items-center"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none"></div>
                    <Tag className="w-12 h-12 text-slate-500 mb-8" />
                    <h3 className="text-3xl md:text-5xl font-medium text-white tracking-tight mb-6">Stay ahead of the curve.</h3>
                    <p className="text-slate-400 text-lg mb-12 max-w-2xl font-light">
                        Subscribe to receive rare technical briefings on decentralized hardware, zero-knowledge proofs, and smart contract architecture. We don't spam.
                    </p>
                    <div className="relative w-full max-w-xl group">
                        <input
                            type="text"
                            className="w-full bg-[#111] border border-white/10 text-white rounded-full px-8 py-5 focus:outline-none focus:border-white/30 transition-colors placeholder:text-slate-600 tracking-wider text-sm"
                            placeholder="YOUR EMAIL OR ENS..."
                        />
                        <button className="absolute right-2 top-2 bottom-2 bg-white text-black hover:bg-slate-200 uppercase tracking-widest text-xs font-bold px-8 rounded-full transition-colors flex items-center">
                            Subscribe
                        </button>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
