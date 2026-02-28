'use client';

import { Briefcase, Code, Terminal, Lock } from 'lucide-react';

export default function CareersPage() {
    const roles = [
        {
            title: "Senior Smart Contract Auditor",
            dept: "Security",
            type: "Remote / Pseudonymous",
            icon: <Lock className="h-6 w-6 text-orange-400" />,
            desc: "Deep expertise in EVM assembly, formal verification, and exploit mitigation. You will be responsible for attacking the Digital Will Protocol internally before updates hit mainnet."
        },
        {
            title: "Applied Cryptography Lead",
            dept: "Engineering",
            type: "Remote / Pseudonymous",
            icon: <Code className="h-6 w-6 text-blue-400" />,
            desc: "Architecting the transition from pure AES-256 SSS to fully-integrated Multi-Party Computation (MPC) wallets and Zero Knowledge proof validation systems."
        },
        {
            title: "Full-Stack Web3 Engineer",
            dept: "Engineering",
            type: "Remote / Pseudonymous",
            icon: <Terminal className="h-6 w-6 text-emerald-400" />,
            desc: "Building the Next.js / React Native bridges that interact with our Web3.Storage IPFS pipelines and Polygon JSON-RPC nodes."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16 slide-up">
                    <Briefcase className="h-12 w-12 text-purple-500 mx-auto mb-6" />
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                        Join the <span className="gradient-text-premium">Protocol</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        We are a decentralized collective of paranoid engineers building bulletproof sovereign vaults.
                    </p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 mb-16 max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Why Work With Us?</h2>
                    <p className="text-slate-400 leading-relaxed">
                        We don't care about your real name, your degree, or your location. We pay entirely in USDC/USDT stablecoins or ETH. We judge wholly on GitHub commits, mathematical prowess, and security mindset. If you can break our code or build it better, we want you.
                    </p>
                </div>

                <div className="space-y-6 max-w-4xl mx-auto">
                    <h3 className="text-xl font-bold text-white mb-6 border-b border-slate-800 pb-4">Open Roles</h3>
                    {roles.map((role, idx) => (
                        <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6">

                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="p-2 bg-slate-950 rounded-lg">{role.icon}</span>
                                    <h4 className="text-xl font-bold text-white">{role.title}</h4>
                                </div>
                                <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4 mt-2 pl-12">
                                    <span className="text-slate-400">{role.dept}</span> &bull; <span>{role.type}</span>
                                </div>
                                <p className="text-slate-400 text-sm pl-12">
                                    {role.desc}
                                </p>
                            </div>

                            <div className="md:border-l border-slate-800 pl-0 md:pl-8 pt-4 md:pt-0 shrink-0">
                                <a href={`mailto:careers@digitalwill.protocol?subject=Application: ${role.title}`} className="inline-block bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors text-sm w-full md:w-auto text-center">
                                    Apply Now
                                </a>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
