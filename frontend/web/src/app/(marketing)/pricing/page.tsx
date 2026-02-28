'use client';

import { Check, ShieldAlert, Sparkles } from 'lucide-react';

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center max-w-3xl mx-auto mb-20 slide-up">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                        Simple, Transparent <span className="gradient-text-premium">Pricing</span>
                    </h1>
                    <p className="text-lg text-slate-400">
                        One permanent fee for immutable peace of mind. No monthly subscriptions to hold your data hostage. Pay in crypto or fiat.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">

                    {/* Free Tier */}
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 hover:border-slate-700 transition-colors">
                        <h3 className="text-2xl font-bold text-white mb-2">Basic Protocol</h3>
                        <p className="text-slate-400 mb-8">Test the cryptographic limits.</p>
                        <div className="text-5xl font-extrabold text-white mb-8">
                            $0<span className="text-lg text-slate-500 font-normal">/forever</span>
                        </div>
                        <ul className="space-y-4 mb-10 text-slate-300">
                            <li className="flex items-start"><Check className="h-6 w-6 text-emerald-500 mr-3 shrink-0" /> <span className="pt-0.5">Up to 3 Encrypted Folders</span></li>
                            <li className="flex items-start"><Check className="h-6 w-6 text-emerald-500 mr-3 shrink-0" /> <span className="pt-0.5">1 Beneficiary Slot</span></li>
                            <li className="flex items-start"><Check className="h-6 w-6 text-emerald-500 mr-3 shrink-0" /> <span className="pt-0.5">Shamir Secret Sharing (default 3-of-5)</span></li>
                            <li className="flex items-start"><Check className="h-6 w-6 text-emerald-500 mr-3 shrink-0" /> <span className="pt-0.5">5GB Decentralized Storage via Web3.Storage</span></li>
                            <li className="flex items-start"><Check className="h-6 w-6 text-emerald-500 mr-3 shrink-0" /> <span className="pt-0.5">Standard Heartbeat Ping (Weekly)</span></li>
                        </ul>
                        <button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-4 rounded-xl transition-colors">
                            Create Free Account
                        </button>
                    </div>

                    {/* Premium Tier */}
                    <div className="bg-gradient-to-b from-blue-900/40 to-slate-900 border-2 border-blue-500 rounded-3xl p-10 relative overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.15)]">
                        <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl uppercase tracking-wider flex items-center">
                            <Sparkles className="h-3 w-3 mr-1" /> Elite Edition
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Lifetime Secure Vault</h3>
                        <p className="text-blue-200 mb-8">For high-net-worth data protection.</p>
                        <div className="text-5xl font-extrabold text-white mb-8">
                            $499<span className="text-lg text-slate-400 font-normal"> one-time</span>
                        </div>
                        <ul className="space-y-4 mb-10 text-slate-200">
                            <li className="flex items-start"><Check className="h-6 w-6 text-blue-400 mr-3 shrink-0" /> <span className="pt-0.5">Unlimited Deep Folder Hierarchies</span></li>
                            <li className="flex items-start"><Check className="h-6 w-6 text-blue-400 mr-3 shrink-0" /> <span className="pt-0.5">Unlimited Beneficiaries & Multi-Sig Rules</span></li>
                            <li className="flex items-start"><Check className="h-6 w-6 text-blue-400 mr-3 shrink-0" /> <span className="pt-0.5">Custom SSS Thresholds (e.g., 5-of-10)</span></li>
                            <li className="flex items-start"><Check className="h-6 w-6 text-blue-400 mr-3 shrink-0" /> <span className="pt-0.5">100GB Dedicated IFPS Pinning Nodes</span></li>
                            <li className="flex items-start"><Check className="h-6 w-6 text-blue-400 mr-3 shrink-0" /> <span className="pt-0.5">Daily, Hourly, or Blockchain-Event Heartbeat Triggers</span></li>
                            <li className="flex items-start"><Check className="h-6 w-6 text-blue-400 mr-3 shrink-0" /> <span className="pt-0.5">Priority Smart Contract Execution</span></li>
                        </ul>
                        <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-xl transition-colors shadow-lg shadow-blue-500/25">
                            Secure Your Lifetime Vault
                        </button>
                    </div>

                </div>

                <div className="mt-20 max-w-4xl mx-auto flex items-start p-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-200/90 text-sm">
                    <ShieldAlert className="h-8 w-8 text-amber-500 mr-4 shrink-0" />
                    <p>
                        <strong>Note on Gas Fees:</strong> While the platform fee is a one-time lifetime payment, interacting with the Polygon blockchain for heartbeat renewals or smart-contract updates requires MATIC to cover network gas fees. These are nominal (often less than $0.01 per transaction) but must be maintained in your connected wallet.
                    </p>
                </div>

            </div>
        </div>
    );
}
