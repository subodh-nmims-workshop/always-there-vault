'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export function SharedHeader() {
    return (
        <nav className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 transition-all duration-300 py-3">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="w-10 h-10 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M50 5L90 25V65L50 95L10 65V25L50 5Z" fill="url(#gradHeader1)" />
                                <path d="M50 15L80 30V60L50 85L20 60V30L50 15Z" fill="#0f172a" />
                                <path d="M50 25L70 35V55L50 75L30 55V35L50 25Z" fill="url(#gradHeader2)" />
                                <defs>
                                    <linearGradient id="gradHeader1" x1="10" y1="5" x2="90" y2="95" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#3b82f6" />
                                        <stop offset="1" stopColor="#8b5cf6" />
                                    </linearGradient>
                                    <linearGradient id="gradHeader2" x1="30" y1="25" x2="70" y2="75" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#10b981" />
                                        <stop offset="1" stopColor="#3b82f6" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                            Digital Will
                        </span>
                    </Link>

                    <div className="hidden md:flex space-x-8 items-center">
                        <Link href="/features" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Features</Link>
                        <Link href="/security" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Security</Link>
                        <Link href="/pricing" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Pricing</Link>
                        <Link href="/docs" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Docs</Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link
                            href="/"
                            className="group relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-full hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                        >
                            Launch App
                            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
