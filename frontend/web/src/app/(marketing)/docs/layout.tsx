'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const defaultTransition = { duration: 0.8, ease: "easeOut" as any };

    const isActive = (path: string) => {
        return pathname === path || (pathname === '/docs' && path === '/docs');
    };

    const linkBaseClass = "text-sm transition-colors flex items-center py-1";
    const activeClass = "text-[#2b52ff] font-semibold";
    const inactiveClass = "text-slate-400 hover:text-white";

    return (
        <div className="min-h-screen bg-[#050a1a] font-sans selection:bg-[#2b52ff]/30 selection:text-white flex flex-col md:flex-row pt-20">
            {/* Sidebar Navigation */}
            <motion.aside
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={defaultTransition}
                className="w-full md:w-64 lg:w-72 bg-[#050a1a] border-r border-white/5 md:fixed md:h-[calc(100vh-80px)] overflow-y-auto px-6 py-10 z-20 shrink-0 custom-scrollbar"
            >
                <div className="mb-10 lg:mb-12">
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Getting Started</h4>
                    <ul className="space-y-3">
                        <li>
                            <Link href="/docs" className={`${linkBaseClass} ${isActive('/docs') ? activeClass : inactiveClass}`}>
                                {isActive('/docs') && <ChevronRight className="w-3 h-3 mr-1 text-[#2b52ff]" />}
                                Introduction
                            </Link>
                        </li>
                        <li>
                            <Link href="/docs/quick-start" className={`${linkBaseClass} ${isActive('/docs/quick-start') ? activeClass : inactiveClass}`}>
                                {isActive('/docs/quick-start') && <ChevronRight className="w-3 h-3 mr-1 text-[#2b52ff]" />}
                                Quick Start
                            </Link>
                        </li>
                        <li>
                            <Link href="/docs/security-prerequisites" className={`${linkBaseClass} ${isActive('/docs/security-prerequisites') ? activeClass : inactiveClass}`}>
                                {isActive('/docs/security-prerequisites') && <ChevronRight className="w-3 h-3 mr-1 text-[#2b52ff]" />}
                                Security Prerequisites
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="mb-10 lg:mb-12">
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Core Concepts</h4>
                    <ul className="space-y-3">
                        <li>
                            <Link href="/docs/zero-knowledge" className={`${linkBaseClass} ${isActive('/docs/zero-knowledge') ? activeClass : inactiveClass}`}>
                                {isActive('/docs/zero-knowledge') && <ChevronRight className="w-3 h-3 mr-1 text-[#2b52ff]" />}
                                Zero-Knowledge Architecture
                            </Link>
                        </li>
                        <li>
                            <Link href="/docs/shamir-sdk" className={`${linkBaseClass} ${isActive('/docs/shamir-sdk') ? activeClass : inactiveClass}`}>
                                {isActive('/docs/shamir-sdk') && <ChevronRight className="w-3 h-3 mr-1 text-[#2b52ff]" />}
                                Shamir SDK
                            </Link>
                        </li>
                        <li>
                            <Link href="/docs/ipfs" className={`${linkBaseClass} ${isActive('/docs/ipfs') ? activeClass : inactiveClass}`}>
                                {isActive('/docs/ipfs') && <ChevronRight className="w-3 h-3 mr-1 text-[#2b52ff]" />}
                                Decentralized Storage (IPFS)
                            </Link>
                        </li>
                        <li>
                            <Link href="/docs/smart-contract" className={`${linkBaseClass} ${isActive('/docs/smart-contract') ? activeClass : inactiveClass}`}>
                                {isActive('/docs/smart-contract') && <ChevronRight className="w-3 h-3 mr-1 text-[#2b52ff]" />}
                                Smart Contract Verification
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="mb-10 lg:mb-12">
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Integration Guides</h4>
                    <ul className="space-y-3">
                        <li>
                            <Link href="/docs/nodejs" className={`${linkBaseClass} ${isActive('/docs/nodejs') ? activeClass : inactiveClass}`}>
                                {isActive('/docs/nodejs') && <ChevronRight className="w-3 h-3 mr-1 text-[#2b52ff]" />}
                                Node.js Examples
                            </Link>
                        </li>
                        <li>
                            <Link href="/docs/react-native" className={`${linkBaseClass} ${isActive('/docs/react-native') ? activeClass : inactiveClass}`}>
                                {isActive('/docs/react-native') && <ChevronRight className="w-3 h-3 mr-1 text-[#2b52ff]" />}
                                React Native SDK
                            </Link>
                        </li>
                        <li>
                            <Link href="/docs/go-subagent" className={`${linkBaseClass} ${isActive('/docs/go-subagent') ? activeClass : inactiveClass}`}>
                                {isActive('/docs/go-subagent') && <ChevronRight className="w-3 h-3 mr-1 text-[#2b52ff]" />}
                                Go Subagent
                            </Link>
                        </li>
                    </ul>
                </div>
            </motion.aside>

            {/* Main Content Area */}
            <main className="flex-1 md:ml-64 lg:ml-72 bg-[#050a1a] p-6 lg:p-16 relative overflow-hidden min-h-[calc(100vh-80px)]">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2b52ff]/5 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="max-w-4xl relative z-10">
                    {children}
                </div>
            </main>
        </div>
    );
}
