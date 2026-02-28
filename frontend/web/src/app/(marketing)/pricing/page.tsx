'use client';

import { motion } from 'framer-motion';
import { Network, Check, ArrowRight, Fingerprint, Lock, Banknote } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
    const defaultTransition = { duration: 1.5, ease: [0.16, 1, 0.3, 1] };

    const plans = [
        {
            name: "Protocol Standard",
            price: "Free",
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
            primary: false
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
            highlight: "RECOMMENDED FOR HIGH NET-WORTH"
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
        <div className="min-h-screen bg-[#020202] pt-32 pb-24 font-sans selection:bg-white/20 selection:text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={defaultTransition}
                    className="mb-32 text-center"
                >
                    <div className="inline-flex items-center gap-3 mb-8 border border-white/5 bg-white/[0.02] backdrop-blur-md px-6 py-2 rounded-full uppercase tracking-[0.2em] text-[10px] text-slate-400 font-medium hover:bg-white/10 transition-colors cursor-pointer">
                        <Banknote className="h-3 w-3 text-slate-300" />
                        <span>The Cost of Sovereignty</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-light tracking-tighter text-white mb-8 leading-[0.9]">
                        Valuation <br />
                        <span className="font-medium text-slate-500 italic">Redefined.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed max-w-4xl mx-auto">
                        Traditional estate planning is an extractionary industry dependent on state violence and paperwork. We replaced it with a smart contract. The mathematics are free.
                    </p>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto mb-40">
                    {plans.map((plan, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ ...defaultTransition, delay: idx * 0.2 }}
                            className={\`relative overflow-hidden rounded-[3rem] p-12 lg:p-16 border \${plan.primary ? 'bg-gradient-to-b from-[#111] to-[#050505] border-white/20' : 'bg-[#0a0a0a] border-white/5 hover:border-white/10'} transition-all duration-500 flex flex-col h-full\`}
                        >
                    {plan.primary && (
                        <div className="absolute top-0 right-0 p-8">
                            <span className="bg-white text-black text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-[0.2em]">
                                {plan.highlight}
                            </span>
                        </div>
                    )}

                    <h3 className="text-3xl font-medium text-white mb-4 tracking-tight">{plan.name}</h3>
                    <div className="flex items-baseline gap-2 mb-6">
                        <span className="text-5xl lg:text-7xl font-light text-white tracking-tighter">{plan.price}</span>
                        <span className="text-slate-500 font-mono text-sm tracking-widest uppercase">/ {plan.period}</span>
                    </div>

                    <p className="text-lg text-slate-400 font-light leading-relaxed mb-12">
                        {plan.description}
                    </p>

                    <ul className="space-y-6 mb-16 flex-grow">
                        {plan.features.map((feat, i) => (
                            <li key={i} className="flex items-start">
                                <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mr-4 shrink-0 mt-0.5">
                                    <Check className="w-3 h-3 text-white" />
                                </div>
                                <span className="text-slate-300 font-light text-lg">{feat}</span>
                            </li>
                        ))}
                    </ul>

                    <button className={\`w-full py-5 rounded-full font-medium tracking-wide uppercase text-sm transition-all duration-500 \${plan.primary ? 'bg-white text-black hover:bg-slate-200 shadow-[0_0_40px_rgba(255,255,255,0.15)]' : 'bg-[#111] border border-white/10 text-white hover:bg-white/5'}\`}>
                    {plan.cta}
                </button>
            </motion.div>
                    ))}
        </div>

                {/* The Comparison Data */ }
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={defaultTransition}
        className="max-w-5xl mx-auto bg-[#050505] border border-white/5 rounded-[3rem] overflow-hidden"
    >
        <div className="p-12 lg:p-16 border-b border-white/5">
            <h2 className="text-4xl font-medium text-white tracking-tight mb-4">Legacy vs. Protocol</h2>
            <p className="text-lg text-slate-400 font-light">An economical analysis of automated inheritance versus traditional legal retainers.</p>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-white/5 bg-[#0a0a0a]">
                        <th className="py-6 px-8 text-slate-500 font-mono text-xs uppercase tracking-widest font-normal">Metric / Liability</th>
                        <th className="py-6 px-8 text-slate-500 font-mono text-xs uppercase tracking-widest font-normal">Traditional Trust / Will</th>
                        <th className="py-6 px-8 text-white font-mono text-xs uppercase tracking-widest font-normal">Digital Will Protocol</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {comparisons.map((row, idx) => (
                        <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-6 px-8 font-medium text-white text-lg">{row.feature}</td>
                            <td className="py-6 px-8 text-slate-400 font-light text-lg">{row.traditional}</td>
                            <td className="py-6 px-8 text-white font-light text-lg border-l border-white/5 bg-white/[0.01]">{row.protocol}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </motion.div>

    {/* Final Simple CTA */ }
    <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
        className="py-40 text-center"
    >
        <h2 className="text-5xl lg:text-7xl font-light text-white leading-none tracking-tighter mb-12">
            Stop paying for bureaucracy.
        </h2>
        <Link href="/docs" className="inline-flex items-center text-white font-medium group transition-colors uppercase tracking-widest text-sm border-b border-white/30 hover:border-white pb-2">
            Read the Implementation Docs
            <ArrowRight className="w-4 h-4 ml-4 transform group-hover:translate-x-2 transition-transform" />
        </Link>
    </motion.div>

            </div >
        </div >
    );
}
