'use client';

import { Calendar, ChevronRight, User, Tag, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function BlogPage() {
    const posts = [
        {
            title: "Post-Mortem Cryptography: The Mathematics of Inheritance",
            excerpt: "How we utilize Shamir Secret Sharing over GF(2^8) to fundamentally eliminate the single point of failure in digital asset custody...",
            date: "Oct 24, 2026",
            author: "Dr. Aris Thorne",
            category: "Cryptography",
            readTime: "8 min read",
            featured: true
        },
        {
            title: "Auditing the Immutable: Zero-Knowledge Dead-Man Switches",
            excerpt: "A deep dive into our recent Halborn smart contract audit, proving mathematical resistance against reentrancy and temporal bypass attacks...",
            date: "Oct 12, 2026",
            author: "Protocol Engineering Team",
            category: "Smart Contracts",
            readTime: "12 min read",
            featured: false
        },
        {
            title: "Why Traditional Estate Planning is Incompatible with Web3",
            excerpt: "The fundamental flaw in giving a lawyer your seed phrase, and why programmatic legal execution is the only sovereign path forward...",
            date: "Sep 28, 2026",
            author: "Legal & Governance DAO",
            category: "Philosophy",
            readTime: "6 min read",
            featured: false
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="mb-20 slide-up max-w-3xl">
                    <div className="inline-flex items-center p-2 pr-4 bg-purple-500/10 rounded-full mb-6 border border-purple-500/20">
                        <div className="p-2 bg-purple-500/20 rounded-full mr-3">
                            <BookOpen className="h-5 w-5 text-purple-400" />
                        </div>
                        <span className="text-purple-300 font-semibold tracking-wide text-sm">THE PROTOCOL LOG</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white tracking-tight">
                        Engineering <span className="text-slate-500">Insights</span>
                    </h1>
                    <p className="text-xl text-slate-400 font-light leading-relaxed">
                        Technical deep-dives, ongoing cryptographic research, and philosophical mandates surrounding the future of decentralized sovereignty.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 mb-24 relative z-10">
                    {/* Featured Post */}
                    <Link href="#" className="col-span-1 lg:col-span-2 group bg-slate-900/50 border border-slate-800 rounded-3xl p-10 flex flex-col justify-end min-h-[400px] relative overflow-hidden transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]">
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-purple-900/20 via-slate-900/5 to-slate-950 pointer-events-none transition-opacity group-hover:opacity-100 opacity-50"></div>

                        <div className="relative z-10 flex items-center justify-between mb-6">
                            <span className="bg-purple-500/20 text-purple-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-purple-500/30">
                                {posts[0].category}
                            </span>
                            <span className="text-slate-400 text-sm flex items-center">
                                <Calendar className="h-4 w-4 mr-2" /> {posts[0].date}
                            </span>
                        </div>

                        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-purple-300 transition-colors relative z-10">
                            {posts[0].title}
                        </h2>
                        <p className="text-slate-400 mb-8 max-w-2xl text-lg relative z-10 line-clamp-2">
                            {posts[0].excerpt}
                        </p>

                        <div className="flex items-center justify-between relative z-10 border-t border-slate-800 pt-6">
                            <div className="flex items-center text-slate-300">
                                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center mr-3 border border-slate-700">
                                    <User className="h-5 w-5 text-slate-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-white">{posts[0].author}</p>
                                    <p className="text-xs text-slate-500">{posts[0].readTime}</p>
                                </div>
                            </div>
                            <span className="bg-white/5 p-3 rounded-full group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                <ChevronRight className="h-5 w-5" />
                            </span>
                        </div>
                    </Link>

                    {/* Secondary Post 1 */}
                    <Link href="#" className="col-span-1 group bg-slate-900/50 border border-slate-800 rounded-3xl p-8 flex flex-col transition-all duration-300 hover:border-blue-500/50 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(59,130,246,0.1)]">
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-blue-400 text-xs font-bold uppercase tracking-wider flex items-center">
                                <Tag className="h-3 w-3 mr-1" /> {posts[1].category}
                            </span>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-4 leading-snug group-hover:text-blue-300 transition-colors flex-grow">
                            {posts[1].title}
                        </h3>
                        <p className="text-slate-400 mb-8 text-sm line-clamp-3">
                            {posts[1].excerpt}
                        </p>

                        <div className="flex items-center justify-between border-t border-slate-800 pt-6 mt-auto">
                            <div className="text-sm">
                                <p className="font-semibold text-slate-300">{posts[1].author}</p>
                                <p className="text-xs text-slate-500">{posts[1].date} • {posts[1].readTime}</p>
                            </div>
                        </div>
                    </Link>

                    {/* Secondary Post 2 */}
                    <Link href="#" className="col-span-1 lg:col-span-3 group bg-slate-900/50 border border-slate-800 rounded-3xl p-8 flex flex-col md:flex-row md:items-center justify-between transition-all duration-300 hover:border-emerald-500/50">
                        <div className="md:w-2/3 pr-8">
                            <div className="flex items-center mb-4">
                                <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider flex items-center mr-4">
                                    <Tag className="h-3 w-3 mr-1" /> {posts[2].category}
                                </span>
                                <span className="text-slate-500 text-xs">{posts[2].date}</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">
                                {posts[2].title}
                            </h3>
                            <p className="text-slate-400 text-sm line-clamp-2 mb-6 md:mb-0">
                                {posts[2].excerpt}
                            </p>
                        </div>
                        <div className="md:w-1/3 flex md:justify-end items-center border-t md:border-t-0 border-slate-800 pt-6 md:pt-0">
                            <div className="text-sm mr-6 text-right hidden md:block">
                                <p className="font-semibold text-slate-300">{posts[2].author}</p>
                                <p className="text-xs text-slate-500">{posts[2].readTime}</p>
                            </div>
                            <span className="flex items-center text-emerald-400 font-semibold group-hover:text-emerald-300">
                                Read Article <ChevronRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                            </span>
                        </div>
                    </Link>
                </div>

            </div>
        </div>
    );
}
