'use client';

import { Rocket, ShieldCheck, Cpu, Globe2, Sparkles, CheckCircle2, ChevronRight, Activity, Database, Network } from 'lucide-react';

export default function RoadmapPage() {
    const phases = [
        {
            quarter: "Q1 2026",
            title: "Protocol Genesis & Core Mainnet",
            status: "completed",
            icon: <Rocket className="h-6 w-6 text-green-400" />,
            description: "The foundational deployment of the Digital Will Protocol. Establishing the base cryptographic primitives and immutable architecture.",
            items: [
                "Deployment of V1 Smart Contracts on Polygon Mainnet",
                "AES-256-GCM Local Encryption Engine integration",
                "Shamir Secret Sharing (SSS) algorithm implementation",
                "Web3.Storage (IPFS) Decentralized File Architecture",
                "Basic Heartbeat Monitor (Time-based triggers)"
            ]
        },
        {
            quarter: "Q2 2026",
            title: "Institutional Scaling & Multi-Sig",
            status: "in-progress",
            icon: <ShieldCheck className="h-6 w-6 text-blue-400" />,
            description: "Enhancing the protocol for high-net-worth individuals and corporate entities with complex, multi-layered access controls.",
            items: [
                "N-of-M Multi-Signature Beneficiary Approvals",
                "Hardware Wallet Native Integration (Ledger, Trezor via EIP-4361)",
                "ZK-Rollup Research for enhanced metadata privacy",
                "Custom Heartbeat webhooks (API Pings, Oracle Integrations)",
                "Security Audit by CertiK & Halborn ($100k Bug Bounty active)"
            ]
        },
        {
            quarter: "Q3 2026",
            title: "Cross-Chain Heritage",
            status: "upcoming",
            icon: <Network className="h-6 w-6 text-purple-400" />,
            description: "Expanding the protocol's reach beyond EVM chains, enabling cross-chain asset distribution and verifiable credentials.",
            items: [
                "LayerZero Integration for Cross-Chain Smart Contract execution",
                "Bitcoin Taproot compatibility for native BTC legacy planning",
                "Decentralized Oracle Networks (Chainlink) for off-chain death verification mechanisms",
                "Zero-Knowledge Proofs (ZKPs) for proving legacy conditions without revealing identity",
                "Mobile Protocol Clients (React Native - iOS/Android) full release"
            ]
        },
        {
            quarter: "Q4 2026",
            title: "Protocol DAO & Autonomy",
            status: "upcoming",
            icon: <Globe2 className="h-6 w-6 text-amber-400" />,
            description: "Decentralizing the ownership and governance of the protocol itself, turning it into an unstoppable, ownerless public good.",
            items: [
                "DWP Governance Token Generation Event (TGE) for network direction",
                "Transition of Smart Contract ownership to the Protocol DAO",
                "Decentralized Storage Node Federation (Self-hosted pinning)",
                "AI-driven semantic encryption for contextual legacy releases",
                "Complete protocol open-sourcing and infrastructure decentralization"
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center max-w-4xl mx-auto mb-20 slide-up pt-10">
                    <div className="inline-flex items-center justify-center p-4 bg-purple-500/10 rounded-full mb-8 border border-purple-500/20">
                        <Activity className="h-10 w-10 text-purple-400" />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-8 text-white tracking-tight">
                        Evolution of the <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Protocol</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light">
                        Our roadmap is not a marketing promise; it is a deterministic engineering timeline. We are systematically building the most resilient, unstoppable data inheritance infrastructure on the web3 stack.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto relative">
                    {/* Glowing timeline line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-pink-500/50 rounded-full hidden md:block transform -translate-x-1/2 drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]"></div>

                    {phases.map((phase, idx) => (
                        <div key={idx} className={`relative flex items-center justify-between md:justify-normal w-full mb-16 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''} group`}>

                            {/* Connector Node */}
                            <div className="absolute left-4 md:left-1/2 w-10 h-10 rounded-full border-4 border-slate-950 bg-slate-900 shadow-[0_0_20px_rgba(59,130,246,0.5)] flex items-center justify-center transform -translate-x-1/2 z-10 transition-transform group-hover:scale-125 duration-300">
                                {phase.status === 'completed' && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                                {phase.status === 'in-progress' && <div className="h-3 w-3 bg-blue-500 rounded-full animate-pulse"></div>}
                                {phase.status === 'upcoming' && <div className="h-3 w-3 bg-slate-600 rounded-full"></div>}
                            </div>

                            {/* Empty space for alternating layout */}
                            <div className="hidden md:block w-5/12"></div>

                            {/* Content Card */}
                            <div className="w-full md:w-5/12 ml-14 md:ml-0 bg-slate-900/80 backdrop-blur-sm border border-slate-800 p-8 rounded-3xl hover:border-purple-500/50 transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] relative overflow-hidden">

                                {phase.status === 'in-progress' && (
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full filter blur-[50px] pointer-events-none"></div>
                                )}

                                <div className="flex items-center justify-between mb-4 relative z-10">
                                    <span className={`text-sm font-bold tracking-wider uppercase px-3 py-1 rounded-full border ${phase.status === 'completed' ? 'text-green-400 border-green-400/30 bg-green-400/10' :
                                            phase.status === 'in-progress' ? 'text-blue-400 border-blue-400/30 bg-blue-400/10' :
                                                'text-slate-400 border-slate-700 bg-slate-800'
                                        }`}>
                                        {phase.quarter}
                                    </span>
                                    {phase.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3 relative z-10">{phase.title}</h3>
                                <p className="text-slate-400 text-sm mb-6 leading-relaxed relative z-10">
                                    {phase.description}
                                </p>
                                <ul className="space-y-3 relative z-10">
                                    {phase.items.map((item, itemIdx) => (
                                        <li key={itemIdx} className="flex items-start text-sm text-slate-300">
                                            {phase.status === 'completed' ? (
                                                <CheckCircle2 className="h-4 w-4 text-green-500 mr-3 shrink-0 mt-0.5" />
                                            ) : (
                                                <div className="h-1.5 w-1.5 bg-slate-600 rounded-full mr-4 shrink-0 mt-2"></div>
                                            )}
                                            <span className="leading-snug">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-24 bg-gradient-to-r from-indigo-900/40 via-purple-900/40 to-slate-900 border border-purple-500/30 rounded-3xl p-12 text-center max-w-4xl mx-auto shadow-[0_0_40px_rgba(168,85,247,0.1)] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
                    <Sparkles className="h-12 w-12 text-purple-400 mx-auto mb-6" />
                    <h3 className="text-3xl font-bold text-white mb-6 relative z-10">Shaping the Future Together</h3>
                    <p className="text-lg text-slate-400 mb-8 leading-relaxed relative z-10 max-w-2xl mx-auto">
                        The Digital Will Protocol is built in the open. View our GitHub repository, audit our smart contracts, and propose features via our community governance forums.
                    </p>
                    <div className="flex justify-center gap-4 relative z-10">
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-8 rounded-xl transition-all border border-slate-700 hover:border-slate-500 flex items-center">
                            View GitHub Repo
                        </a>
                        <a href="/docs" className="bg-purple-600 hover:bg-purple-500 text-white font-semibold flex items-center justify-center py-3 px-8 rounded-xl transition-all shadow-lg shadow-purple-500/30">
                            Read the Docs <ChevronRight className="ml-2 h-4 w-4" />
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
}
