'use client';

import { Newspaper } from 'lucide-react';
import Link from 'next/link';

export default function BlogPage() {
    const posts = [
        {
            title: "Why Centralized Will Custodians are a Systematic Point of Failure",
            date: "October 12, 2026",
            category: "Architecture",
            readTime: "6 min read",
            excerpt: "When you hand over your master private key to a traditional 'crypto inheritance' startup, you are reintroducing the exact middleman that Web3 was meant to destroy."
        },
        {
            title: "The Math Behind Shamir Secret Sharing in Digital Wills",
            date: "September 28, 2026",
            category: "Cryptography",
            readTime: "12 min read",
            excerpt: "A deep dive into GF(2^8) polynomial interpolation and how we ensure that no single entity—not even us—can mathematically reconstruct your AES-256 payload."
        },
        {
            title: "Automating Death Certifications via Chainlink Oracles",
            date: "September 15, 2026",
            category: "Smart Contracts",
            readTime: "8 min read",
            excerpt: "How we are moving beyond simple interval-based 'heartbeats' to utilizing decentralized oracle networks to verify civil registry databases seamlessly."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16 slide-up">
                    <Newspaper className="h-12 w-12 text-blue-500 mx-auto mb-6" />
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                        Engineering <span className="gradient-text-premium">Research</span>
                    </h1>
                    <p className="text-lg text-slate-400">
                        Insights on cryptography, zero-trust infrastructure, and the future of digital legacy.
                    </p>
                </div>

                <div className="space-y-8 max-w-4xl mx-auto">
                    {posts.map((post, idx) => (
                        <article key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-blue-500/30 transition-colors group cursor-pointer">
                            <div className="flex items-center space-x-4 mb-4 text-xs font-semibold uppercase tracking-wider">
                                <span className="text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full">{post.category}</span>
                                <span className="text-slate-500">{post.date}</span>
                                <span className="text-slate-500 hidden sm:inline">&bull; {post.readTime}</span>
                            </div>

                            <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{post.title}</h2>
                            <p className="text-slate-400 leading-relaxed max-w-3xl">
                                {post.excerpt}
                            </p>

                            <div className="mt-6">
                                <span className="text-blue-500 text-sm font-semibold group-hover:underline underline-offset-4">Read Article &rarr;</span>
                            </div>
                        </article>
                    ))}
                </div>

            </div>
        </div>
    );
}
