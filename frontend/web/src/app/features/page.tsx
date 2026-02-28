'use client';

import { Shield, Lock, Globe, Zap, Key, Users, Clock, Database, ChevronRight } from 'lucide-react';

export default function FeaturesPage() {
    const features = [
        {
            icon: <Lock className="h-8 w-8 text-blue-500" />,
            title: 'Zero-Trust Architecture',
            description: 'Your data is encrypted locally on your device using AES-256-GCM before it ever touches our servers. We have absolutely zero access to your plaintext data or keys.',
        },
        {
            icon: <Key className="h-8 w-8 text-purple-500" />,
            title: 'Shamir Secret Sharing',
            description: 'Your encryption keys are mathematically split into 5 shares using polynomial interpolation. An attacker would need to compromise 3 isolated infrastructures simultaneously to reconstruct it.',
        },
        {
            icon: <Globe className="h-8 w-8 text-green-500" />,
            title: 'Decentralized Storage (IPFS)',
            description: 'Files are chunked and distributed across the InterPlanetary File System (IPFS). Your encrypted legacy is resistant to censorship, server outages, and localized data loss.',
        },
        {
            icon: <Clock className="h-8 w-8 text-red-500" />,
            title: 'Automated Dead-Man Switch',
            description: 'A customizable heartbeat monitor constantly verifies your activity. If the threshold is breached, the protocol automatically executes your predetermined release instructions.',
        },
        {
            icon: <Zap className="h-8 w-8 text-yellow-500" />,
            title: 'Smart Contract Enforcement',
            description: 'Release mechanisms are dictated by immutable Polygon smart contracts. No human intervention or legal bureaucracy can delay or prevent the execution of your digital will.',
        },
        {
            icon: <Users className="h-8 w-8 text-indigo-500" />,
            title: 'Granular Access Control',
            description: 'Assign specific assets or entire folders to unique beneficiaries. Set conditions ranging from immediate transfer upon inactivity to complex multi-signature approvals.',
        },
        {
            icon: <Shield className="h-8 w-8 text-teal-500" />,
            title: 'Hardware Wallet Integration',
            description: 'Native compatibility with Ledger, Trezor, and MetaMask. Sign transactions and encrypt files using the secure enclave of your existing cold storage devices.',
        },
        {
            icon: <Database className="h-8 w-8 text-orange-500" />,
            title: 'Metadata Obfuscation',
            description: 'Even the metadata stored on our centralized Atlas clusters is anonymized. Folder names, asset types, and beneficiary identities are cryptographically masked.',
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center max-w-3xl mx-auto mb-20 slide-up">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="text-white">Enterprise-Grade</span> <span className="gradient-text-premium">Features</span>
                    </h1>
                    <p className="text-lg text-slate-400">
                        Engineered for high-net-worth individuals, crypto whales, and security absolutists. Our protocol leaves nothing to chance.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] group"
                        >
                            <div className="bg-slate-950 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                            <p className="text-slate-400 leading-relaxed text-sm">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/20 rounded-3xl p-12 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl mix-blend-screen"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl mix-blend-screen"></div>

                    <h2 className="text-3xl font-bold text-white mb-4 relative z-10">Ready to secure your digital assets?</h2>
                    <p className="text-slate-300 mb-8 max-w-2xl mx-auto relative z-10">
                        Join the protocol today and ensure your legacy outlives the physical world. Setup takes less than 5 minutes.
                    </p>
                    <a href="/" className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl transition-colors relative z-10 shadow-lg shadow-blue-500/20">
                        Launch App <ChevronRight className="ml-2 h-5 w-5" />
                    </a>
                </div>

            </div>
        </div>
    );
}
