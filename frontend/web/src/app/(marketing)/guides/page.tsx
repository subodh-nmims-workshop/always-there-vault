'use client';

import { PlayCircle, Target, Waypoints, KeySquare, ShieldAlert, Cpu } from 'lucide-react';
import Link from 'next/link';

export default function GuidesPage() {
    const guides = [
        {
            title: "Zero-Knowledge Hardware Wallet Setup",
            description: "How to bind your Ledger or Trezor to the protocol executing EIP-4361 auth without ever exposing your private key to the browser.",
            category: "Security",
            icon: <KeySquare className="h-6 w-6 text-orange-400" />,
            level: "Advanced"
        },
        {
            title: "Distributing Shamir Shares Securely",
            description: "A step-by-step guide on generating a 3-of-5 Shamir Secret threshold and securely distributing the fragmented polynomial shards to diverse cold storage locations.",
            category: "Cryptography",
            icon: <Waypoints className="h-6 w-6 text-blue-400" />,
            level: "Intermediate"
        },
        {
            title: "Deploying the Vault Smart Contract",
            description: "Visual walkthrough of interacting with the Polygon Mainnet to deploy your personalized immutable vault and funding it with MATIC for gas.",
            category: "Smart Contracts",
            icon: <Cpu className="h-6 w-6 text-purple-400" />,
            level: "Beginner"
        },
        {
            title: "Beneficiary Onboarding & Decryption",
            description: "What a beneficiary sees when a vault unlocks. How they retrieve the CID, reassemble the Shards, and run AES decryption locally.",
            category: "Onboarding",
            icon: <Target className="h-6 w-6 text-emerald-400" />,
            level: "Beginner"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16 slide-up max-w-4xl mx-auto pt-10">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white tracking-tight">
                        Integration <span className="text-blue-500">Guides</span>
                    </h1>
                    <p className="text-xl text-slate-400 font-light leading-relaxed mb-10">
                        Operational manuals for engineering extreme security within the protocol. Learn to establish unbreakable cryptographic inheritances.
                    </p>

                    <div className="relative max-w-2xl mx-auto">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                            <Search className="w-5 h-5 text-slate-500" />
                        </div>
                        <input type="text" className="w-full bg-slate-900 border border-slate-800 text-white rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-blue-500 transition-colors shadow-inner" placeholder="Search guides, setups, or errors..." />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-24 relative z-10 max-w-6xl mx-auto">
                    {guides.map((guide, idx) => (
                        <div key={idx} className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 hover:border-slate-600 transition-all duration-300 group cursor-pointer hover:shadow-lg hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-6">
                                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 group-hover:border-slate-600 transition-colors">
                                    {guide.icon}
                                </div>
                                <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${guide.level === 'Advanced' ? 'text-orange-400 border-orange-400/30 bg-orange-400/10' :
                                        guide.level === 'Intermediate' ? 'text-blue-400 border-blue-400/30 bg-blue-400/10' :
                                            'text-emerald-400 border-emerald-400/30 bg-emerald-400/10'
                                    }`}>
                                    {guide.level}
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                                {guide.title}
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                {guide.description}
                            </p>
                            <div className="flex items-center text-blue-400 font-semibold text-sm">
                                <PlayCircle className="w-4 h-4 mr-2" /> Read Guide
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-blue-600 rounded-3xl p-12 text-center max-w-4xl mx-auto shadow-[0_0_40px_rgba(59,130,246,0.3)] relative overflow-hidden flex flex-col items-center">
                    <ShieldAlert className="w-16 h-16 text-blue-300 mb-6" />
                    <h2 className="text-3xl font-extrabold text-white mb-4 relative z-10">OpSec Best Practices</h2>
                    <p className="text-blue-100 text-lg mb-8 relative z-10 max-w-2xl">
                        A chain is only as strong as its weakest link. Review our extreme operational security manifesto to ensure your local environment isn't compromised before encryption occurs.
                    </p>
                    <button className="bg-slate-950 hover:bg-slate-900 text-white font-bold py-4 px-10 rounded-xl transition-colors relative z-10 border border-slate-800">
                        View Threat Modeling Guide
                    </button>
                </div>

            </div>
        </div>
    );
}

// Quick inline icon since lucide-react Search wasn't imported at top
function Search(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    )
}
