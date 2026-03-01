'use client';

import Link from 'next/link';

import { Shield } from 'lucide-react';

export function SharedFooter() {
    return (
        <footer className="py-12 bg-[#0a0c10] text-slate-400 border-t border-white/5 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Link href="/" className="flex items-center space-x-3 group hover:opacity-80 transition-opacity">
                                <div className="text-[#1152d4] flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Shield className="w-8 h-8" />
                                </div>
                                <span className="text-white font-bold text-lg tracking-tight">DeadMan Protocol</span>
                            </Link>
                        </div>
                        <p className="text-sm">
                            Securing digital legacies for the decentralized future. Your assets, your rules.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Product</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
                            <li><Link href="/security" className="hover:text-white transition-colors">Security</Link></li>
                            <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                            <li><Link href="/roadmap" className="hover:text-white transition-colors">Roadmap</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Resources</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
                            <li><Link href="/docs" className="hover:text-white transition-colors">API Reference</Link></li>
                            <li><Link href="/docs" className="hover:text-white transition-colors">Guides</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Support</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Company</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors">Blog</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors">Careers</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
                    <p>© 2026 DeadMan Protocol. All rights reserved.</p>
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="/security" className="hover:text-white transition-colors">Security</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
