'use client';

import { Shield, Lock, FileSearch } from 'lucide-react';

export default function SecurityPolicyPage() {
    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="mb-12 border-b border-slate-800 pb-8 slide-up text-center">
                    <Shield className="h-12 w-12 text-blue-500 mx-auto mb-6" />
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                        Vulnerability <span className="text-blue-500">Disclosure Policy</span>
                    </h1>
                    <p className="text-slate-400 text-lg">We welcome rigorous testing of the Digital Will Protocol.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
                        <Lock className="h-8 w-8 text-emerald-400 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">In Scope</h3>
                        <ul className="space-y-2 text-slate-400 text-sm mt-4">
                            <li>&bull; Smart Contract Re-Entrancy / Frontrunning</li>
                            <li>&bull; Cracking AES-256-GCM via padding or timing</li>
                            <li>&bull; Bypassing Shamir Secret Share thresholds</li>
                            <li>&bull; Wallet verification identity spoofing (EIP-4361)</li>
                        </ul>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
                        <FileSearch className="h-8 w-8 text-rose-400 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Out of Scope</h3>
                        <ul className="space-y-2 text-slate-400 text-sm mt-4">
                            <li>&bull; Volumetric DDoS attacks against Node API</li>
                            <li>&bull; Spamming the Web3.Storage PIN limits</li>
                            <li>&bull; Clickjacking on Marketing/Informational Pages</li>
                            <li>&bull; Exploits requiring physical access to target machine</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10">
                    <h2 className="text-2xl font-bold text-white mb-6">Bounty Tiers (USDC/ETH)</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center bg-slate-950 p-4 border border-slate-800 rounded-xl">
                            <div>
                                <span className="text-rose-500 font-bold block mb-1">Critical</span>
                                <span className="text-sm text-slate-400">Complete protocol destruction, bypassing SSS math, unauthenticated decryption of payloads.</span>
                            </div>
                            <span className="text-white font-mono font-bold">$100,000+</span>
                        </div>
                        <div className="flex justify-between items-center bg-slate-950 p-4 border border-slate-800 rounded-xl">
                            <div>
                                <span className="text-orange-500 font-bold block mb-1">High</span>
                                <span className="text-sm text-slate-400">Halting smart contract execution, impersonating Nominee wallet signatures.</span>
                            </div>
                            <span className="text-white font-mono font-bold">$25,000+</span>
                        </div>
                        <div className="flex justify-between items-center bg-slate-950 p-4 border border-slate-800 rounded-xl">
                            <div>
                                <span className="text-yellow-500 font-bold block mb-1">Medium</span>
                                <span className="text-sm text-slate-400">Server misconfigurations exposing plaintext metadata, persistent XSS in the Vault Client.</span>
                            </div>
                            <span className="text-white font-mono font-bold">$5,000+</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
