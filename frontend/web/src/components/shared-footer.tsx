'use client';

import Link from 'next/link';

export function SharedFooter() {
    return (
        <footer className="py-12 bg-slate-950 text-gray-400 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                                <div className="w-8 h-8 flex-shrink-0">
                                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M50 5L90 25V65L50 95L10 65V25L50 5Z" fill="url(#gradFooter1)" />
                                        <path d="M50 15L80 30V60L50 85L20 60V30L50 15Z" fill="#0f172a" />
                                        <path d="M50 25L70 35V55L50 75L30 55V35L50 25Z" fill="url(#gradFooter2)" />
                                        <defs>
                                            <linearGradient id="gradFooter1" x1="10" y1="5" x2="90" y2="95" gradientUnits="userSpaceOnUse">
                                                <stop stopColor="#3b82f6" />
                                                <stop offset="1" stopColor="#8b5cf6" />
                                            </linearGradient>
                                            <linearGradient id="gradFooter2" x1="30" y1="25" x2="70" y2="75" gradientUnits="userSpaceOnUse">
                                                <stop stopColor="#10b981" />
                                                <stop offset="1" stopColor="#3b82f6" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                                <span className="text-white font-bold text-lg">Digital Will Protocol</span>
                            </Link>
                        </div>
                        <p className="text-sm">
                            Securing digital legacies for the decentralized future. Your assets, your rules.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Product</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/features" className="hover:text-blue-400 transition-colors">Features</Link></li>
                            <li><Link href="/security" className="hover:text-blue-400 transition-colors">Security</Link></li>
                            <li><Link href="/pricing" className="hover:text-blue-400 transition-colors">Pricing</Link></li>
                            <li><Link href="/roadmap" className="hover:text-blue-400 transition-colors">Roadmap</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Resources</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/docs" className="hover:text-blue-400 transition-colors">Documentation</Link></li>
                            <li><Link href="/api" className="hover:text-blue-400 transition-colors">API Reference</Link></li>
                            <li><Link href="/guides" className="hover:text-blue-400 transition-colors">Guides</Link></li>
                            <li><Link href="/support" className="hover:text-blue-400 transition-colors">Support</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Company</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/about" className="hover:text-blue-400 transition-colors">About</Link></li>
                            <li><Link href="/blog" className="hover:text-blue-400 transition-colors">Blog</Link></li>
                            <li><Link href="/careers" className="hover:text-blue-400 transition-colors">Careers</Link></li>
                            <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
                    <p>© 2026 Digital Will Protocol. All rights reserved.</p>
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
                        <Link href="/security-policy" className="hover:text-blue-400 transition-colors">Security</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
