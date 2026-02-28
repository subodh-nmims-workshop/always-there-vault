'use client';

import { motion } from 'framer-motion';
import { Banknote, Check, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
    const defaultTransition: any = { duration: 0.8, ease: "easeOut" };

    const plans = [
        {
            name: "Protocol Standard",
            price: "$0",
            period: "Forever",
            description: "Interact directly with the smart contracts on Polygon via your own infrastructure. You only pay network gas fees.",
            features: [
                "Full Client-Side AES-256-GCM SDK",
                "Deploy immutable Vault Smart Contracts",
                "Self-hosted Heartbeat trigger scripts",
                "Direct API / ABI interface",
                "Open-source local storage fallback"
            ],
            cta: "Connect Wallet",
            primary: false,
            icon: <Zap className="w-6 h-6 text-blue-400" />
        },
        {
            name: "Lifetime Vault",
            price: "$999",
            period: "One-Time",
            description: "Institutional-grade infrastructure orchestration. We handle the heavy lifting, pinning, and heartbeat monitoring via our edge nodes.",
            features: [
                "Guaranteed IPFS Pinning via Web3.Storage",
                "Automated Multi-Node Heartbeat Monitoring",
                "Priority Email & SMS Trigger Alerts",
                "Dedicated Node Allocation",
                "VIP Bug Bounty / Incident Support"
            ],
            cta: "Consult an Engineer",
            primary: true,
            highlight: "RECOMMENDED",
            icon: <ShieldCheck className="w-6 h-6 text-[#2b52ff]" />
        }
    ];

    const comparisons = [
        { feature: "Upfront Cost", traditional: "$5,000 - $15,000+", protocol: "Gas Fees (~$2.00)" },
        { feature: "Retainer Fees", traditional: "$500 - $2,000 / year", protocol: "$0 (Immutable on-chain)" },
        { feature: "Execution Speed", traditional: "6 - 18 months (Probate)", protocol: "Under 2 minutes" },
        { feature: "Privacy Guarantee", traditional: "Atty-Client Privilege (Revocable)", protocol: "Zero-Knowledge (Mathematics)" },
        { feature: "Asset Limits", traditional: "Complex tax audits", protocol: "Unlimited Cryptographic Keys" }
    ];

    return (
        <div className="min-h-screen bg-[#050a1a] pt-32 pb-24 font-sans selection:bg-[#2b52ff]/30 selection:text-white">
            <div className="fixed top-0 inset-x-0 h-[600px] pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[0%] left-[50%] -translate-x-1/2 w-[800px] h-[500px] bg-[#2b52ff]/10 blur-[150px] rounded-full mix-blend-screen"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={defaultTransition}
                    className="mb-24 text-center mt-12"
                >
                    <div className="inline-flex items-center gap-3 mb-8 border border-[#2b52ff]/20 bg-[#2b52ff]/10 backdrop-blur-md px-4 py-1.5 rounded-full uppercase tracking-widest text-xs font-bold text-[#2b52ff] shadow-lg shadow-[#2b52ff]/5">
                        <Banknote className="h-4 w-4" />
                        <span>The Cost of Sovereignty</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-6 leading-[1.05]">
                        Valuation <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#2b52ff]">Redefined.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-blue-100/70 font-medium leading-relaxed max-w-3xl mx-auto">
                        Traditional estate planning is an extractionary industry dependent on state violence and paperwork. We replaced it with a smart contract. The mathematics are free.
                    </p>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto mb-32 relative">
                    {plans.map((plan, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ ...defaultTransition, delay: idx * 0.1 }}
                            className={`relative overflow-hidden rounded-[2rem] p-10 lg:p-14 border ${plan.primary ? 'bg-gradient-to-br from-[#101b3d] to-[#050a1a] border-[#2b52ff]/30 shadow-2xl shadow-[#2b52ff]/10 scale-105 z-10' : 'bg-white/[0.02] border-white/10 hover:border-white/20 mt-4 lg:mt-8'} transition-all duration-300 flex flex-col h-full`}
                        >
                            {plan.primary && (
                                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-400 to-purple-500"></div>
                            )}

                            {plan.primary && (
                                <div className="absolute top-8 right-8">
                                    <span className="bg-[#2b52ff]/20 text-[#2b52ff] border border-[#2b52ff]/30 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
                                        {plan.highlight}
                                    </span>
                                </div>
                            )}

                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                                    {plan.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-white tracking-tight">{plan.name}</h3>
                            </div>

                            <div className="flex items-baseline gap-2 mb-4">
                                <span className={`text-6xl font-black ${plan.primary ? 'text-white' : 'text-slate-300'} tracking-tighter`}>{plan.price}</span>
                                <span className="text-slate-500 font-bold text-sm tracking-widest uppercase">/ {plan.period}</span>
                            </div>

                            <p className="text-base text-blue-100/60 font-medium leading-relaxed mb-10 min-h-[80px]">
                                {plan.description}
                            </p>

                            <ul className="space-y-5 mb-12 flex-grow">
                                {plan.features.map((feat, i) => (
                                    <li key={i} className="flex items-start">
                                        <div className="w-5 h-5 rounded-full bg-[#2b52ff]/20 flex items-center justify-center mr-4 shrink-0 mt-0.5 border border-[#2b52ff]/30">
                                            <Check className="w-3 h-3 text-[#2b52ff]" />
                                        </div>
                                        <span className="text-slate-300 font-medium text-sm leading-snug">{feat}</span>
                                    </li>
                                ))}
                            </ul>

                            <button className={`w-full py-4 rounded-xl font-bold tracking-wide transition-all duration-300 ${plan.primary ? 'bg-[#2b52ff] text-white hover:bg-blue-600 shadow-lg shadow-[#2b52ff]/20' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'}`}>
                                {plan.cta}
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* The Comparison Data */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={defaultTransition}
                    className="max-w-5xl mx-auto bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden backdrop-blur-md mb-24"
                >
                    <div className="p-10 lg:p-12 border-b border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#2b52ff]/10 blur-[80px] pointer-events-none"></div>
                        <h2 className="text-3xl font-bold text-white tracking-tight mb-3">Legacy vs. Protocol</h2>
                        <p className="text-blue-100/60 font-medium">An economical analysis of automated inheritance versus traditional legal retainers.</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/5 bg-black/20">
                                    <th className="py-5 px-8 text-slate-500 font-semibold text-xs uppercase tracking-widest w-1/3">Metric / Liability</th>
                                    <th className="py-5 px-8 text-slate-500 font-semibold text-xs uppercase tracking-widest w-1/3">Traditional Trust</th>
                                    <th className="py-5 px-8 text-[#2b52ff] font-bold text-xs uppercase tracking-widest w-1/3 border-l border-white/5">Digital Will Protocol</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {comparisons.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="py-6 px-8 font-semibold text-white/90">{row.feature}</td>
                                        <td className="py-6 px-8 text-slate-400 font-medium">{row.traditional}</td>
                                        <td className="py-6 px-8 text-white font-bold border-l border-white/5 bg-[#2b52ff]/[0.02]">{row.protocol}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Final Simple CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={defaultTransition}
                    className="py-20 text-center"
                >
                    <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-8">
                        Stop paying for bureaucracy.
                    </h2>
                    <Link href="/docs" className="inline-flex items-center text-[#2b52ff] font-bold group transition-all tracking-wide bg-[#2b52ff]/10 hover:bg-[#2b52ff]/20 px-8 py-4 rounded-full border border-[#2b52ff]/20">
                        Read the Implementation Docs
                        <ArrowRight className="w-4 h-4 ml-3 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

            </div>
        </div>
    );
}
