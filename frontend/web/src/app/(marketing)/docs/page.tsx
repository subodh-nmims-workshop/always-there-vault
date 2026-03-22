'use client'

import { motion } from 'framer-motion'
import {
    Shield,
    BookOpen,
    Terminal,
    Cpu,
    Fingerprint
} from 'lucide-react'
import Link from 'next/link'
import { SharedFooter } from '@/components/shared-footer'

export default function DocsPage() {
    const defaultTransition = { duration: 0.5, ease: "easeOut" as const }

    return (
        <div className="min-h-screen bg-[#0a0c10] font-sans text-slate-100 selection:bg-[#1152d4]/30 flex flex-col overflow-x-hidden relative">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-[#0a0c10]/80 backdrop-blur-xl border-b border-white/5 px-4 sm:px-8 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="text-[#1152d4] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Shield className="w-8 h-8" />
                    </div>
                    <span className="font-bold text-xl tracking-tight hidden sm:block">LASTWISH</span>
                </Link>
                <div className="hidden md:flex gap-8 items-center absolute left-1/2 -translate-x-1/2">
                    <Link href="/features" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Features</Link>
                    <Link href="/docs" className="text-white transition-colors text-sm font-medium">Documentation</Link>
                    <Link href="/security" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Security</Link>
                </div>
                <Link href="/" className="bg-[#1152d4] hover:bg-[#1152d4]/80 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-[0_0_20px_rgba(17,82,212,0.4)]">
                    Launch App
                </Link>
            </nav>

            {/* Header */}
            <header className="pt-16 pb-12 px-6 text-center max-w-4xl mx-auto relative z-10">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={defaultTransition} className="inline-flex items-center justify-center p-4 rounded-full bg-white/[0.03] border border-white/10 mb-6">
                    <BookOpen className="w-8 h-8 text-[#1152d4]" />
                </motion.div>
                <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ ...defaultTransition, delay: 0.1 }} className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
                    Developer Documentation
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ ...defaultTransition, delay: 0.2 }} className="text-slate-400 text-lg max-w-2xl mx-auto">
                    Explore the architecture, integrate the SDK, or review the smart contracts powering the ultimate digital inheritance protocol.
                </motion.p>
            </header>

            <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 mt-8 pb-32">

                {/* Detailed Content Sections */}
                <div className="space-y-12 mb-20">

                    {/* Quick Start Guide */}
                    <section id="quick-start" className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Terminal className="w-32 h-32 text-[#1152d4]" />
                        </div>
                        <div className="relative z-10 max-w-3xl">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-3">
                                <Terminal className="w-8 h-8 text-[#1152d4]" />
                                Quick Start Guide
                            </h2>
                            <p className="text-slate-400 text-lg mb-6 leading-relaxed">
                                Get up and running with the client SDK in under 5 minutes. Learn how to initiate a protocol vault and configure your first digital asset.
                            </p>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-white font-bold mb-2">1. Installation</h3>
                                    <div className="bg-[#0a0c10] border border-white/10 p-4 rounded-xl font-mono text-sm text-slate-300">
                                        npm install @deadman/protocol-sdk ethers
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-white font-bold mb-2">2. Initialize the Vault</h3>
                                    <div className="bg-[#0a0c10] border border-white/10 p-4 rounded-xl font-mono text-sm text-slate-300 overflow-x-auto">
                                        <pre><code>{`import { DeadManVault } from '@deadman/protocol-sdk';

// Connect with standard Web3 provider
const vault = new DeadManVault(provider.getSigner());

// Initialize a new digital will with a 30-day heartbeat
await vault.initialize({
  heartbeatInterval: 30 * 24 * 60 * 60, // 30 days
  gracePeriod: 14 * 24 * 60 * 60 // 14 days
});`}</code></pre>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-white font-bold mb-2">3. Add Beneficiaries & Encrypt Assets</h3>
                                    <p className="text-slate-400 text-sm mb-3">The SDK automatically manages client-side AES encryption and Shamir key sharding before dispatching metadata to the smart contract.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Smart Contracts */}
                    <section id="smart-contracts" className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Cpu className="w-32 h-32 text-[#8b5cf6]" />
                        </div>
                        <div className="relative z-10 max-w-3xl">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-3">
                                <Cpu className="w-8 h-8 text-[#8b5cf6]" />
                                Smart Contracts Architecture
                            </h2>
                            <p className="text-slate-400 text-lg mb-6 leading-relaxed">
                                Deep dive into the Solidity architecture managing the liveness checks and secure asset disbursement on the Polygon network.
                            </p>

                            <div className="grid md:grid-cols-2 gap-6 mt-8">
                                <div className="bg-[#0a0c10] border border-white/5 p-6 rounded-2xl">
                                    <h4 className="text-white font-bold mb-2">Liveness Oracle (Heartbeat)</h4>
                                    <p className="text-sm text-slate-400">Maintains a purely decentralized mapping of wallet addresses to their `lastPing` timestamps. Emits `HeartbeatMissed` events consumed by relayers.</p>
                                </div>
                                <div className="bg-[#0a0c10] border border-white/5 p-6 rounded-2xl">
                                    <h4 className="text-white font-bold mb-2">Asset Registry</h4>
                                    <p className="text-sm text-slate-400">Stores IPFS CIDs of the encrypted payload and the encrypted Shamir shares. Ensures only designated beneficiary wallets can trigger read requests.</p>
                                </div>
                                <div className="bg-[#0a0c10] border border-white/5 p-6 rounded-2xl md:col-span-2">
                                    <h4 className="text-white font-bold mb-2">The Release Mechanism</h4>
                                    <p className="text-sm text-slate-400 mb-3">When a heartbeat expires and the grace period passes, any beneficiary can call `triggerRelease()`. The contract validates the temporal conditions, verifies the caller via `msg.sender`, and decrypts the target's Shamir shares specific to that beneficiary's public key.</p>
                                    <div className="bg-white/[0.03] p-3 rounded-lg border border-white/10 font-mono text-xs text-purple-300">
                                        function triggerRelease(address vaultOwner) external onlyBeneficiary(vaultOwner) returns (bytes memory encryptedShare)
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Cryptography & Sharding */}
                    <section id="cryptography" className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Fingerprint className="w-32 h-32 text-emerald-500" />
                        </div>
                        <div className="relative z-10 max-w-3xl">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-3">
                                <Fingerprint className="w-8 h-8 text-emerald-500" />
                                Cryptography & Sharding
                            </h2>
                            <p className="text-slate-400 text-lg mb-6 leading-relaxed">
                                Understand the mathematics behind Shamir's Secret Sharing and our zero-knowledge heartbeat signatures.
                            </p>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-white font-bold mb-2 border-l-2 border-emerald-500 pl-3">Client-Side AES-256-GCM</h3>
                                    <p className="text-slate-400 text-sm">Your files never leave your browser unencrypted. We use the Web Crypto API to generate a high-entropy 256-bit symmetric key, encrypting files locally before IPFS transit.</p>
                                </div>

                                <div>
                                    <h3 className="text-white font-bold mb-2 border-l-2 border-emerald-500 pl-3">Shamir's Secret Sharing (M-of-N)</h3>
                                    <p className="text-slate-400 text-sm mb-3">The symmetric master key is never stored whole. It is mathematically split into `N` shares using polynomial interpolation over a finite field. A minimum threshold `M` (e.g., 3 of 5) is required to reconstruct the key.</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-emerald-500/10 text-emerald-400 text-xs px-3 py-1 rounded-full border border-emerald-500/20">Polynomial: f(x) = a0 + a1*x + ... + a(k-1)*x^(k-1)</span>
                                        <span className="bg-emerald-500/10 text-emerald-400 text-xs px-3 py-1 rounded-full border border-emerald-500/20">a0 = Master Key</span>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-white font-bold mb-2 border-l-2 border-emerald-500 pl-3">Zero-Knowledge Verification</h3>
                                    <p className="text-slate-400 text-sm">Heartbeats are verified on-chain using ECDSA signatures. The backend protocol proves you are alive by relaying your signed payload without ever knowing your private key, maintaining 100% non-custodial operations.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>

                {/* Architecture Overview */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold tracking-tight text-white mb-8 text-center">System Architecture</h2>
                    <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 backdrop-blur-md">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-white">Zero-Trust Pipeline</h3>
                                <p className="text-slate-400 leading-relaxed text-sm">
                                    The LASTWISH architecture is designed explicitly so that the backend—whether ours or a decentralized relayer's—never has access to the raw payload or the complete decryption keys.
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex gap-3 items-start">
                                        <div className="w-6 h-6 rounded-full bg-[#1152d4]/10 text-[#1152d4] flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">1</div>
                                        <div>
                                            <strong className="text-white block text-sm mb-1">Client Encryption</strong>
                                            <p className="text-slate-500 text-xs">AES-256-GCM encryption occurs entirely within the user's browser context.</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-3 items-start">
                                        <div className="w-6 h-6 rounded-full bg-[#8b5cf6]/10 text-[#8b5cf6] flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">2</div>
                                        <div>
                                            <strong className="text-white block text-sm mb-1">Key Sharding</strong>
                                            <p className="text-slate-500 text-xs">The master key is split using Shamir's Secret Sharing (m-of-n threshold) and distributed to validators.</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-3 items-start">
                                        <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">3</div>
                                        <div>
                                            <strong className="text-white block text-sm mb-1">Smart Contract Lock</strong>
                                            <p className="text-slate-500 text-xs">The shares are locked on-chain, requiring a lapse in the heartbeat timer to unlock.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-[#0a0c10] border border-white/10 rounded-2xl p-6 h-full flex flex-col justify-center relative overflow-hidden group">
                                {/* Abstract Diagram */}
                                <div className="absolute inset-0 bg-[#1152d4]/5 group-hover:bg-[#1152d4]/10 transition-colors"></div>
                                <div className="relative z-10 flex flex-col items-center justify-center gap-4">
                                    <div className="w-full flex justify-between items-center px-4">
                                        <div className="px-4 py-2 rounded-lg bg-slate-800 text-xs font-mono text-slate-300 border border-slate-700">User Wallet</div>
                                        <div className="w-16 h-px bg-slate-700 relative">
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-emerald-500"></div>
                                        </div>
                                        <div className="px-4 py-2 rounded-lg bg-blue-900/40 text-xs font-mono text-blue-300 border border-blue-800">Browser (AES)</div>
                                    </div>
                                    <div className="w-px h-8 bg-slate-700"></div>
                                    <div className="w-full flex justify-center">
                                        <div className="px-6 py-3 rounded-xl bg-purple-900/40 text-sm font-bold text-purple-300 border border-purple-800 shadow-[0_0_15px_rgba(139,92,246,0.2)]">Shamir Subsystem</div>
                                    </div>
                                    <div className="flex gap-4 mt-2">
                                        <div className="w-px h-8 bg-slate-700 transform rotate-12"></div>
                                        <div className="w-px h-8 bg-slate-700"></div>
                                        <div className="w-px h-8 bg-slate-700 transform -rotate-12"></div>
                                    </div>
                                    <div className="w-full flex justify-between px-2">
                                        <div className="w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center bg-slate-800 text-[10px] text-slate-400">Node A</div>
                                        <div className="w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center bg-slate-800 text-[10px] text-slate-400">Node B</div>
                                        <div className="w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center bg-slate-800 text-[10px] text-slate-400">Node C</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-white/[0.01] border border-white/5 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1152d4]/5 to-transparent pointer-events-none"></div>
                    <h2 className="text-2xl font-bold text-white mb-4 relative z-10">Looking for the API Reference?</h2>
                    <p className="text-slate-400 mb-8 max-w-lg mx-auto relative z-10">Access the full REST API documentation for relay integrations, webhook subscriptions, and custom liveness monitors.</p>
                    <Link href="/api" className="inline-block bg-white text-[#0a0c10] px-8 py-3 rounded-full font-bold text-sm hover:scale-105 transition-all relative z-10">
                        View API Reference
                    </Link>
                </section>

            </main >

            <SharedFooter />
        </div >
    )
}
