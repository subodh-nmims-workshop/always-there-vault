'use client'


import { Shield, Bug, Search, Lock, ShieldCheck, Mail } from 'lucide-react';

import Link from 'next/link';

export default function SecurityPolicyPage() {
    return (
        <div className="w-full font-sans selection:bg-[#2b52ff]/30 selection:text-slate-900 dark:text-white relative overflow-hidden dark:text-slate-100 bg-transparent text-slate-800">

            
            

            <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-24 pb-32">

                <div className="text-center mb-16 slide-up">
                    <div className="inline-flex items-center justify-center p-4 bg-red-500/10 rounded-full mb-6 border border-red-500/20">
                        <Shield className="h-10 w-10 text-red-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900 dark:text-slate-900 dark:text-slate-900 dark:text-white tracking-tight">
                        Vulnerability <span className="text-red-500">Disclosure Policy</span>
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                        Security is not a feature; it is the entire product. We welcome white-hat hackers and cryptographic researchers to dismantle our architecture.
                    </p>
                </div>

                <div className="prose dark:prose-invert prose-red max-w-none space-y-12">

                    <section className="bg-slate-50 dark:bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full filter blur-[80px] pointer-events-none"></div>

                        <div className="flex items-center mb-6 relative z-10">
                            <Bug className="h-8 w-8 text-red-400 mr-4" />
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-900 dark:text-white m-0">The $100,000 Bug Bounty Program</h2>
                        </div>
                        <p className="text-slate-700 dark:text-slate-650 dark:text-slate-750 dark:text-slate-300 leading-relaxed mb-6 relative z-10">
                            We operate a continuous, tiered bug bounty program to incentivize the responsible disclosure of critical vulnerabilities. As a protocol managing high-net-worth lineages, our threat model assumes state-level adversaries.
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 relative z-10">
                            <div className="bg-white dark:bg-slate-50 dark:bg-[#050a1a] border border-red-200 dark:border-red-900/50 p-6 rounded-2xl relative shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                                <div className="absolute top-0 right-0 bg-red-900/50 text-red-200 text-xs font-bold px-3 py-1 rounded-bl-lg">CRITICAL</div>
                                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-900 dark:text-slate-900 dark:text-white mb-2">Up to $100,000</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Paid in USDC/ETH</p>
                                <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-750 dark:text-slate-300">
                                    <li className="flex items-start"><span className="text-red-500 mr-2">•</span> Remote Code Execution (RCE) on our Node.js routing layer.</li>
                                    <li className="flex items-start"><span className="text-red-500 mr-2">•</span> Complete bypass of the EIP-4361 authentication schema.</li>
                                    <li className="flex items-start"><span className="text-red-500 mr-2">•</span> Mathematical flaws resulting in the deterministic extraction of the AES-256 master key.</li>
                                    <li className="flex items-start"><span className="text-red-500 mr-2">•</span> Unauthorized state mutation in the Polygon Smart Contracts (e.g., bypassing the heartbeat temporal lock).</li>
                                </ul>
                            </div>

                            <div className="bg-white dark:bg-slate-50 dark:bg-[#050a1a] border border-orange-200 dark:border-orange-900/50 p-6 rounded-2xl relative">
                                <div className="absolute top-0 right-0 bg-orange-900/50 text-orange-200 text-xs font-bold px-3 py-1 rounded-bl-lg">HIGH</div>
                                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-900 dark:text-slate-900 dark:text-white mb-2">Up to $25,000</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Paid in USDC/ETH</p>
                                <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-750 dark:text-slate-300">
                                    <li className="flex items-start"><span className="text-orange-500 mr-2">•</span> Logic errors in Shamir Secret Sharing reconstruction allowing threshold bypass.</li>
                                    <li className="flex items-start"><span className="text-orange-500 mr-2">•</span> Database injection (NoSQL) leaking encrypted metadata or partial CIDs.</li>
                                    <li className="flex items-start"><span className="text-orange-500 mr-2">•</span> Sub-domain takeover of production routing endpoints.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="bg-slate-50 dark:bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-12">
                        <div className="flex items-center mb-6">
                            <Lock className="h-8 w-8 text-blue-400 mr-4" />
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-900 dark:text-white m-0">Safe Harbor Protocol</h2>
                        </div>
                        <p className="text-slate-700 dark:text-slate-650 dark:text-slate-750 dark:text-slate-300 leading-relaxed mb-4">
                            We consider security research to be a public good. If you conduct your research and disclosure in accordance with this policy, we consider your conduct to be authorized.
                        </p>
                        <h4 className="font-bold text-slate-900 dark:text-slate-900 dark:text-slate-900 dark:text-white mb-2 mt-6">You must strictly adhere to the following:</h4>
                        <ul className="list-disc pl-6 space-y-3 text-slate-700 dark:text-slate-750 dark:text-slate-300 mb-6">
                            <li><strong>Do not</strong> attempt to access, modify, or destroy data belonging to other actual users. Create your own test wallets for research.</li>
                            <li><strong>Do not</strong> execute Denial of Service (DoS) attacks on our routing layer.</li>
                            <li><strong>Do not</strong> utilize social engineering, phishing, or physical attacks against our team members or hosting providers.</li>
                            <li>Provide us a reasonable amount of time (minimum 30 days) to patch the vulnerability before disclosing it publicly (0-day drops invalidate the bounty).</li>
                        </ul>
                    </section>

                    <section className="bg-slate-50 dark:bg-slate-50 dark:bg-[#050a1a] border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-12 text-center">
                        <Mail className="h-12 w-12 text-slate-600 dark:text-slate-400 mx-auto mb-6" />
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-900 dark:text-slate-900 dark:text-white mb-4">How to Submit a Report</h2>
                        <p className="text-slate-700 dark:text-slate-650 dark:text-slate-750 dark:text-slate-300 leading-relaxed mb-8 max-w-xl mx-auto">
                            Submit your detailed findings, including reproducible Proof of Concept (PoC) scripts, via encrypted email.
                        </p>

                        <div className="bg-slate-900 p-6 rounded-xl inline-block text-left border border-slate-800 max-w-md w-full mb-8">
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Send to:</p>
                            <p className="text-lg font-mono text-slate-900 dark:text-slate-900 dark:text-slate-900 dark:text-white mb-4">security@digitalwill.protocol</p>

                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">PGP Fingerprint (Required for Critical):</p>
                            <p className="text-xs font-mono text-blue-400 select-all break-all">
                                4F92 B7A1 08DE 3C44 291A 6BB2 D4F1 88E9 C12A 99F3
                            </p>
                        </div>
                        <p className="text-sm text-slate-500">
                            We typically respond to critical PGP-encrypted reports within 12 hours.
                        </p>
                    </section>
                </div>
            </main>

            
        </div>
    );
}
