'use client';

import { Shield, Lock, Globe, Zap, Key, Users, Clock, Database, ChevronRight, Fingerprint, Cpu, Network, FileCode2 } from 'lucide-react';
import Link from 'next/link';

export default function FeaturesPage() {
    const coreFeatures = [
        {
            icon: <Lock className="h-8 w-8 text-blue-500" />,
            title: 'Zero-Trust Architecture',
            description: 'Your data is encrypted locally on your device using AES-256-GCM before it ever touches our servers. We employ a strict zero-knowledge architecture. We have absolutely zero access to your plaintext data, metadata, or encryption keys. The server is completely blind to your operations.',
        },
        {
            icon: <Key className="h-8 w-8 text-purple-500" />,
            title: 'Shamir Secret Sharing Engine',
            description: 'Your master encryption keys are mathematically split into dynamically determined shares (e.g., 5 shares) using polynomial interpolation over a finite Galois Field (GF(2^8)). An attacker would need to compromise multiple isolated infrastructures simultaneously to reconstruct a single key.',
        },
        {
            icon: <Globe className="h-8 w-8 text-green-500" />,
            title: 'Decentralized Storage (IPFS)',
            description: 'Files are chunked, hashed, and distributed across the InterPlanetary File System (IPFS) utilizing Web3.Storage. Your encrypted legacy avoids traditional single points of failure (AWS, GCP) and is mathematically resistant to censorship, server outages, and localized data loss.',
        },
        {
            icon: <Clock className="h-8 w-8 text-red-500" />, // Corrected unescaped single quote here? Wait, no single quote issue in comment.
            title: 'Automated Dead-Man Switch',
            description: 'A highly customizable heartbeat monitor constantly verifies your activity. If the threshold is breached, the protocol automatically interfaces with the Polygon blockchain to autonomously execute your predetermined release instructions without human intervention.',
        },
        {
            icon: <Zap className="h-8 w-8 text-yellow-500" />,
            title: 'Smart Contract Enforcement',
            description: 'Release mechanisms and access controls are dictated by immutable, rigorously audited Polygon smart contracts. No human intervention, corporate policy, or legal bureaucracy can delay, prevent, or alter the execution of your digital will.',
        },
        {
            icon: <Users className="h-8 w-8 text-indigo-500" />,
            title: 'Granular Access Control',
            description: 'Assign specific assets or entire hierarchical folders to unique beneficiaries. Set complex conditions ranging from immediate transfer upon inactivity to complex multi-signature approvals involving legal teams or trusted family members.',
        },
        {
            icon: <Shield className="h-8 w-8 text-teal-500" />,
            title: 'Hardware Wallet Integration',
            description: 'Native compatibility with industry-leading cold storage solutions like Ledger, Trezor, and GridPlus via EIP-4361 (Sign-In with Ethereum). Sign transactions and encrypt files leveraging the secure enclave of your existing devices.',
        },
        {
            icon: <Database className="h-8 w-8 text-orange-500" />,
            title: 'Metadata Obfuscation',
            description: 'Even the metadata residing on our centralized routing clusters is cryptographically obscured. Folder names, asset categorizations, file sizes, and beneficiary identities are salted and hashed to prevent traffic analysis.',
        }
    ];

    const advancedCapabilities = [
        {
            icon: <Fingerprint className="h-10 w-10 text-slate-400" />,
            title: "Self-Sovereign Identity",
            desc: "Authenticate purely via cryptographic signatures. No KYC, no email requirements, no centralized identity providers."
        },
        {
            icon: <Cpu className="h-10 w-10 text-slate-400" />,
            title: "Client-Side Processing",
            desc: "All CPU-intensive cryptographic operations (key generation, AES encryption, SSS sharding) occur exclusively within the memory boundaries of your local browser."
        },
        {
            icon: <Network className="h-10 w-10 text-slate-400" />,
            title: "Censorship Resistance",
            desc: "By leveraging decentralized node RPCs and IPFS pinning, the protocol cannot be taken offline by state-level actors or DNS takedowns."
        },
        {
            icon: <FileCode2 className="h-10 w-10 text-slate-400" />,
            title: "Deterministic Execution",
            desc: "Every action is verifiable on-chain. The source code for our smart contracts is open-source and deterministic, guaranteeing identical outputs for identical inputs."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Hero Section */}
                <div className="text-center max-w-4xl mx-auto mb-20 slide-up pt-12">
                    <span className="text-blue-500 font-bold tracking-widest text-sm uppercase mb-4 block">Uncompromising Security</span>
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-8 leading-tight">
                        <span className="text-white">Enterprise-Grade</span> <span className="gradient-text-premium">Features</span>
                    </h1>
                    <p className="text-xl text-slate-400 leading-relaxed font-light">
                        Engineered for high-net-worth individuals, institutional wealth managers, crypto whales, and security absolutists. The Digital Will Protocol leaves absolutely nothing to chance or human error.
                    </p>
                </div>

                {/* Core Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-32">
                    {coreFeatures.map((feature, idx) => (
                        <div
                            key={idx}
                            className="bg-slate-900 border border-slate-800 p-10 rounded-3xl hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.1)] group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 group-hover:scale-150 transition-all duration-700">
                                {feature.icon}
                            </div>
                            <div className="bg-slate-950 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border border-slate-800 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 relative z-10">
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{feature.title}</h3>
                            <p className="text-slate-400 leading-relaxed text-base relative z-10">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Advanced Capabilities Row */}
                <div className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">Deep Architectural Advantages</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
                    </div>
                    <div className="grid md:grid-cols-4 gap-6">
                        {advancedCapabilities.map((cap, i) => (
                            <div key={i} className="text-center p-6 border-t border-slate-800 pt-8">
                                <div className="mx-auto w-fit mb-6 p-4 rounded-full bg-slate-900 border border-slate-800">
                                    {cap.icon}
                                </div>
                                <h4 className="text-lg font-bold text-white mb-3">{cap.title}</h4>
                                <p className="text-sm text-slate-500 leading-relaxed">{cap.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Banner */}
                <div className="bg-gradient-to-r from-blue-900/40 via-slate-900 to-purple-900/40 border border-blue-500/20 rounded-3xl p-16 text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full filter blur-[100px] mix-blend-screen"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full filter blur-[100px] mix-blend-screen"></div>

                    <h2 className="text-4xl font-extrabold text-white mb-6 relative z-10 tracking-tight">Ready to institutionalize your digital legacy?</h2>
                    <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto relative z-10 font-light">
                        Join the protocol today and ensure your digital footprint, wealth, and secrets outlive the physical world with absolute mathematical certainty.
                    </p>
                    <Link href="/" className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-bold px-10 py-5 rounded-2xl transition-all duration-300 relative z-10 shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:shadow-[0_0_50px_rgba(59,130,246,0.6)] hover:-translate-y-1 text-lg">
                        Initialize Master Vault <ChevronRight className="ml-3 h-6 w-6" />
                    </Link>
                </div>

            </div>
        </div>
    );
}
