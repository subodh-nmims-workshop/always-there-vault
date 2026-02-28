'use client';

import { Check, Info, Shield, Key, FileText, Blocks, Infinity, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center max-w-4xl mx-auto mb-20 slide-up pt-10">
                    <span className="text-blue-500 font-bold tracking-widest text-sm uppercase mb-4 block">No Subscriptions. No Hidden Fees.</span>
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">
                        Pricing Engineered for <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Eternity</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light">
                        Traditional estate planning costs thousands of dollars in legal fees, recurring retainer costs, and manual intervention. We offer mathematical certainty for a single, transparent, one-time protocol fee.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto mb-24 relative z-10">

                    {/* Basic Tier */}
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 flex flex-col relative overflow-hidden group hover:border-blue-500/50 transition-all duration-300">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Shield className="w-32 h-32" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Basic Protocol</h3>
                        <p className="text-slate-400 mb-8 h-12 relative z-10">Essential cryptographic inheritance for individuals.</p>
                        <div className="mb-8 relative z-10">
                            <span className="text-5xl font-extrabold text-white">Free</span>
                            <span className="text-slate-500 ml-2">forever</span>
                        </div>
                        <ul className="space-y-5 mb-10 flex-grow relative z-10">
                            <li className="flex items-start text-slate-300">
                                <Check className="h-6 w-6 text-blue-500 mr-3 shrink-0" />
                                <span>Up to <strong>3</strong> Beneficiaries</span>
                            </li>
                            <li className="flex items-start text-slate-300">
                                <Check className="h-6 w-6 text-blue-500 mr-3 shrink-0" />
                                <span><strong>500 MB</strong> Decentralized IPFS Storage</span>
                            </li>
                            <li className="flex items-start text-slate-300">
                                <Check className="h-6 w-6 text-blue-500 mr-3 shrink-0" />
                                <span>Standard Dead-Man Switch (Monthly Check-ins)</span>
                            </li>
                            <li className="flex items-start text-slate-300">
                                <Check className="h-6 w-6 text-blue-500 mr-3 shrink-0" />
                                <span>AES-256-GCM Local Encryption</span>
                            </li>
                            <li className="flex items-start text-slate-300">
                                <Check className="h-6 w-6 text-blue-500 mr-3 shrink-0" />
                                <span>Community Protocol Support</span>
                            </li>
                        </ul>
                        <Link href="/" className="w-full text-center py-4 px-6 rounded-xl border-2 border-slate-700 text-white font-bold hover:bg-slate-800 transition-colors relative z-10 block">
                            Initialize Free Vault
                        </Link>
                    </div>

                    {/* Pro Tier */}
                    <div className="bg-gradient-to-b from-blue-900/40 to-slate-900 border border-blue-500/50 rounded-3xl p-10 flex flex-col relative overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.15)] transform hover:-translate-y-2 transition-transform duration-300">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full text-center">
                            <div className="inline-block bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-b-lg uppercase tracking-wider">
                                Institutional Grade
                            </div>
                        </div>
                        <div className="absolute bottom-0 right-0 p-8 opacity-10">
                            <Infinity className="w-40 h-40 text-blue-400" />
                        </div>

                        <h3 className="text-3xl font-bold text-white mt-4 mb-2 relative z-10">Lifetime Secure Vault</h3>
                        <p className="text-blue-300 mb-8 h-12 relative z-10">Unrestricted protocol access tailored for high-net-worth individuals and corporate entities.</p>
                        <div className="mb-8 flex items-baseline relative z-10">
                            <span className="text-5xl font-extrabold text-white">$499</span>
                            <span className="text-slate-400 ml-2">/ one-time protocol fee</span>
                        </div>

                        <ul className="space-y-5 mb-10 flex-grow relative z-10">
                            <li className="flex items-start text-white">
                                <Check className="h-6 w-6 text-blue-400 mr-3 shrink-0" />
                                <span><strong>Unlimited</strong> Beneficiaries & Multi-Sig Wallets</span>
                            </li>
                            <li className="flex items-start text-white">
                                <Check className="h-6 w-6 text-blue-400 mr-3 shrink-0" />
                                <span><strong>10 GB</strong> Dedicated Filecoin/IPFS Pinning</span>
                            </li>
                            <li className="flex items-start text-white">
                                <Check className="h-6 w-6 text-blue-400 mr-3 shrink-0" />
                                <span>Customizable Heartbeat (Daily, Weekly, Block-Height based)</span>
                            </li>
                            <li className="flex items-start text-white">
                                <Check className="h-6 w-6 text-blue-400 mr-3 shrink-0" />
                                <span>Hardware Wallet Native Integrations (Ledger, Trezor)</span>
                            </li>
                            <li className="flex items-start text-white">
                                <Check className="h-6 w-6 text-blue-400 mr-3 shrink-0" />
                                <span>Shamir Secret Sharing (Custom Thresholds up to 10 shares)</span>
                            </li>
                            <li className="flex items-start text-white">
                                <Check className="h-6 w-6 text-blue-400 mr-3 shrink-0" />
                                <span>Priority 24/7 Encrypted Support Channel</span>
                            </li>
                        </ul>
                        <Link href="/" className="text-center relative z-10 w-full py-4 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/50 text-lg block">
                            Deploy Smart Contract
                        </Link>
                    </div>

                </div>

                {/* ROI / Comparison Section */}
                <div className="max-w-4xl mx-auto bg-slate-900/50 border border-slate-800 rounded-3xl p-10 md:p-16 mb-16 relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

                    <h2 className="text-3xl font-bold text-white mb-10 text-center relative z-10">Cost Analysis: Protocol vs. Traditional Law</h2>

                    <div className="space-y-6 relative z-10">
                        <div className="flex border-b border-slate-800 pb-4">
                            <div className="w-1/3 text-slate-400 font-semibold">Aspect</div>
                            <div className="w-1/3 text-white font-bold px-4 border-l border-slate-800">Digital Will Protocol</div>
                            <div className="w-1/3 text-slate-500 px-4 border-l border-slate-800">Traditional Law Firm</div>
                        </div>
                        <div className="flex border-b border-slate-800 pb-4 pt-2">
                            <div className="w-1/3 text-slate-400">Setup Cost</div>
                            <div className="w-1/3 text-blue-400 font-semibold px-4 border-l border-slate-800">One-time $499</div>
                            <div className="w-1/3 text-slate-500 px-4 border-l border-slate-800">$2,500 - $10,000+</div>
                        </div>
                        <div className="flex border-b border-slate-800 pb-4 pt-2">
                            <div className="w-1/3 text-slate-400">Maintenance & Retainer</div>
                            <div className="w-1/3 text-blue-400 font-semibold px-4 border-l border-slate-800">$0 (Immutable)</div>
                            <div className="w-1/3 text-slate-500 px-4 border-l border-slate-800">$500+ / year</div>
                        </div>
                        <div className="flex border-b border-slate-800 pb-4 pt-2">
                            <div className="w-1/3 text-slate-400">Execution Speed</div>
                            <div className="w-1/3 text-blue-400 font-semibold px-4 border-l border-slate-800">Instant (Block Time)</div>
                            <div className="w-1/3 text-slate-500 px-4 border-l border-slate-800">Months (Probate Court)</div>
                        </div>
                        <div className="flex pt-2">
                            <div className="w-1/3 text-slate-400">Privacy & Confidentiality</div>
                            <div className="w-1/3 text-blue-400 font-semibold px-4 border-l border-slate-800">AES-256 (Zero Knowledge)</div>
                            <div className="w-1/3 text-slate-500 px-4 border-l border-slate-800">Public Record / Human Trust</div>
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto flex items-start p-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-200/90 text-sm">
                    <ShieldAlert className="h-6 w-6 text-amber-500 mr-4 shrink-0 mt-0.5" />
                    <div>
                        <p className="font-bold mb-1">Network Gas Fees Note</p>
                        <p>The Digital Will Protocol operates on the Polygon (MATIC) network. While our protocol fee is a one-time payment, users are responsible for the marginal gas fees (typically &lt; $0.05 per TX) required to deploy their individual smart contracts and submit heartbeat pings to the blockchain.</p>
                    </div>
                </div>

                <div className="mt-12 text-center text-slate-500 text-sm flex items-center justify-center max-w-2xl mx-auto">
                    <Info className="h-5 w-5 mr-2 shrink-0" />
                    <span>We accept payments natively via Web3 wallets in USDC, USDT, ETH, and MATIC.</span>
                </div>
            </div>
        </div>
    );
}
