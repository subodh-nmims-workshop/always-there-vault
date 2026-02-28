'use client';

import { CheckCircle2, Circle, Milestone } from 'lucide-react';

export default function RoadmapPage() {
    const roadmapItems = [
        {
            quarter: "Q1 2026",
            title: "Protocol Genesis (Current)",
            description: "Launch of the core decentralized will protocol. AES-256-GCM encryption, Shamir Secret engine, IPFS integrations, and Next.js / React Native identical clients.",
            status: "completed",
            features: [
                "Zero-Trust Architecture",
                "Polygon Smart Contract Deployment",
                "Automated Heartbeat CRON Integration",
                "Nominee Hierarchical Access"
            ]
        },
        {
            quarter: "Q2 2026",
            title: "Multi-Chain Expansion",
            description: "Expanding smart-contract execution beyond Polygon. Integrating cross-chain messaging to trigger will executions directly on Ethereum Mainnet, Arbitrum, and Optimism.",
            status: "in-progress",
            features: [
                "LayerZero V2 Integration",
                "Ethereum Mainnet Native Triggers",
                "ZK-Proofs for Nominee Verifications",
                "Hardware Wallet Direct Signatures"
            ]
        },
        {
            quarter: "Q3 2026",
            title: "Decentralized Oracle Integration",
            description: "Replacing our backend CRON interval system with fully decentralized Chainlink Automation networks. The protocol will run entirely independently of any centralized infrastructure.",
            status: "planned",
            features: [
                "Chainlink Functions for Web2 API Pings",
                "Death Registry Oracle Integration APIs",
                "Multi-Sig Beneficiary Approvals",
                "On-Chain Asset Liquidation Automation"
            ]
        },
        {
            quarter: "Q4 2026",
            title: "Institutional Vaults & DAO",
            description: "Onboarding family offices and wealth managers with institutional grade multi-signature setups. Launching the Protocol DAO to govern future protocol upgrades and fees.",
            status: "planned",
            features: [
                "Organization & Sub-Account Management",
                "Legal Firm API Hooks",
                "DAO Governance Token Launch",
                "Fully Open-Sourced Core Repository"
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16 slide-up">
                    <Milestone className="h-12 w-12 text-blue-500 mx-auto mb-6" />
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                        Protocol <span className="gradient-text-premium">Roadmap</span>
                    </h1>
                    <p className="text-lg text-slate-400">
                        Our vision for the future of decentralized legacy management.
                    </p>
                </div>

                <div className="relative border-l-2 border-slate-800 ml-4 md:ml-12 pl-8 md:pl-16 py-8 space-y-16">
                    {roadmapItems.map((item, idx) => (
                        <div key={idx} className="relative">

                            {/* Timeline dot */}
                            <div className="absolute -left-[41px] md:-left-[73px] top-6 bg-slate-950 p-1">
                                {item.status === 'completed' ? (
                                    <CheckCircle2 className="h-8 w-8 text-blue-500 bg-slate-950" />
                                ) : item.status === 'in-progress' ? (
                                    <Circle className="h-8 w-8 text-blue-400 fill-blue-500/20 bg-slate-950 animate-pulse" />
                                ) : (
                                    <Circle className="h-8 w-8 text-slate-700 bg-slate-950" />
                                )}
                            </div>

                            <div className={`bg-slate-900 border ${item.status === 'in-progress' ? 'border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.1)]' : 'border-slate-800'} rounded-2xl p-8`}>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm font-bold tracking-widest text-blue-500 uppercase">{item.quarter}</span>
                                    <span className={`text-xs px-3 py-1 rounded-full ${item.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' :
                                            item.status === 'in-progress' ? 'bg-blue-500/10 text-blue-400' :
                                                'bg-slate-800 text-slate-400'
                                        }`}>
                                        {item.status === 'completed' ? 'Completed' : item.status === 'in-progress' ? 'In Progress' : 'Planned'}
                                    </span>
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-slate-400 mb-6 leading-relaxed text-sm md:text-base">
                                    {item.description}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-slate-800 pt-6">
                                    {item.features.map((feature, fIdx) => (
                                        <div key={fIdx} className="flex items-center text-sm text-slate-300">
                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-600 mr-2 shrink-0"></div>
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
