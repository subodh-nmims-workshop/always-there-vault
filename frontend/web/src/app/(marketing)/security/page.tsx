'use client';

import { ShieldCheck, Server, KeyRound, EyeOff, Code, FileDigit, Cpu, Network, Lock, Zap } from 'lucide-react';
import Link from 'next/link';

export default function SecurityPage() {
    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16 slide-up max-w-4xl mx-auto">
                    <div className="inline-flex items-center justify-center p-4 bg-blue-500/10 rounded-full mb-8 border border-blue-500/20">
                        <ShieldCheck className="h-12 w-12 text-blue-400" />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-8 text-white tracking-tight">
                        Uncompromising <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Security Architecture</span>
                    </h1>
                    <p className="text-xl text-slate-400 leading-relaxed font-light">
                        We operate under a strict, mathematically verified zero-knowledge constraint. We cannot recover your keys, we cannot read your files, and we cannot alter your smart contract logic. You do not have to trust us; you only have to trust the math.
                    </p>
                </div>

                <div className="space-y-16">
                    {/* Section 1: Cryptographic Primitives */}
                    <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-10 md:p-16 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-[100px] pointer-events-none"></div>

                        <div className="flex items-center mb-10">
                            <div className="p-3 bg-slate-800 rounded-xl mr-6 border border-slate-700">
                                <KeyRound className="h-8 w-8 text-purple-400" />
                            </div>
                            <h2 className="text-3xl font-bold text-white">Cryptographic Primitives</h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 text-slate-400">
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <Lock className="h-6 w-6 text-blue-400 mr-4 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-3">Symmetric Encryption (AES-256-GCM)</h3>
                                        <p className="leading-relaxed">All files, metadata labels, and text payloads are symmetrically encrypted using <strong>AES-256-GCM</strong> (Galois/Counter Mode). This specific cipher mode is utilized by the NSA for TOP SECRET information. It provides both confidentiality (against eavesdropping) and data authenticity (integrity verification against tampering).</p>
                                        <div className="mt-4 p-5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-sm text-green-400 shadow-inner overflow-x-auto">
                                            crypto.subtle.encrypt(&#123; name: 'AES-GCM', iv &#125;, key, data);
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <Cpu className="h-6 w-6 text-emerald-400 mr-4 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-3">Key Sharding & Threshold Logic (SSS)</h3>
                                        <p className="leading-relaxed">Instead of relying on a single master password, your AES-256 key is mathematically fragmented into a polynomial curve utilizing <strong>Shamir's Secret Sharing</strong> over a finite Galois Field (GF(2^8)). We enforce a strict threshold (e.g., 3-of-5 shares) required for reconstruction.</p>
                                        <div className="mt-4 p-5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-sm text-yellow-400 shadow-inner overflow-x-auto">
                                            const shares = secrets.share(secretHex, 5, 3);
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Infrastructure & Attack Vectors */}
                    <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-10 md:p-16 relative overflow-hidden">
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-[100px] pointer-events-none"></div>

                        <div className="flex items-center mb-10">
                            <div className="p-3 bg-slate-800 rounded-xl mr-6 border border-slate-700">
                                <Server className="h-8 w-8 text-blue-400" />
                            </div>
                            <h2 className="text-3xl font-bold text-white">Infrastructure Integrity & Threat Models</h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-slate-950 rounded-2xl p-8 border border-slate-800/80 hover:border-blue-500/30 transition-colors shadow-lg">
                                <EyeOff className="h-10 w-10 text-blue-400 mb-6" />
                                <h3 className="text-xl font-bold text-white mb-4">Blind Cloud Backend</h3>
                                <p className="text-slate-400 leading-relaxed text-sm">Our Node.js API acts strictly as a validation and rate-limiting layer. It blindly accepts encrypted blobs (IV + Ciphertext) and forwards them to IPFS. Our databases never hold plaintext context, meaning a database leak yields only cryptographically secure garbage.</p>
                            </div>

                            <div className="bg-slate-950 rounded-2xl p-8 border border-slate-800/80 hover:border-orange-500/30 transition-colors shadow-lg">
                                <FileDigit className="h-10 w-10 text-orange-400 mb-6" />
                                <h3 className="text-xl font-bold text-white mb-4">Immutable State (IPFS)</h3>
                                <p className="text-slate-400 leading-relaxed text-sm">Through Web3.Storage, we utilize IPFS content addressing (CIDs). If an adversary alters a single byte of your encrypted payload, the cryptographic hash (CID) changes entirely, breaking the fetch logic and alerting the client to the tampering attempt immediately.</p>
                            </div>

                            <div className="bg-slate-950 rounded-2xl p-8 border border-slate-800/80 hover:border-rose-500/30 transition-colors shadow-lg">
                                <Code className="h-10 w-10 text-rose-400 mb-6" />
                                <h3 className="text-xl font-bold text-white mb-4">Smart Contract Autonomy</h3>
                                <p className="text-slate-400 leading-relaxed text-sm">Release conditions are anchored to Polygon smart contracts. These are mathematically verified against reentrancy vectors and unsigned state mutations. Post-deployment, the execution logic is completely immutable and unstoppable.</p>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Decentralized Identity & Auth */}
                    <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-10 md:p-16">
                        <div className="flex items-center mb-10">
                            <div className="p-3 bg-slate-800 rounded-xl mr-6 border border-slate-700">
                                <Network className="h-8 w-8 text-emerald-400" />
                            </div>
                            <h2 className="text-3xl font-bold text-white">Identity & Authentication</h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-10">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-4">Signature-Based Auth (EIP-4361)</h3>
                                <p className="text-slate-400 leading-relaxed mb-6">
                                    We do not use standard email/password authentication (which is susceptible to phishing and database dumps). All authentication is performed via cryptographic signatures using your Web3 wallet (e.g., MetaMask, Ledger, Trezor).
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-start text-slate-300">
                                        <Zap className="h-5 w-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                                        <span>No centralized identity provider (IdP) to hack.</span>
                                    </li>
                                    <li className="flex items-start text-slate-300">
                                        <Zap className="h-5 w-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                                        <span>Immune to traditional credential stuffing.</span>
                                    </li>
                                    <li className="flex items-start text-slate-300">
                                        <Zap className="h-5 w-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                                        <span>Guaranteed mathematical proof of ownership.</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-8 flex items-center justify-center">
                                <div className="text-center">
                                    <ShieldCheck className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                                    <div className="text-sm text-slate-500 font-mono">
                                        0x71C...976F SIGNED THIS MESSAGE<br />
                                        NONCE: 8f92a4e9-b5a8-43d9-95e2<br />
                                        URI: app.digitalwill.protocol
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bug Bounty */}
                    <div className="bg-gradient-to-r from-slate-900 via-blue-900/20 to-slate-900 border border-blue-500/30 rounded-3xl p-12 text-center shadow-xl">
                        <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Code className="h-10 w-10 text-blue-400" />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-6">Vulnerability Disclosure & Bug Bounty</h3>
                        <p className="text-lg text-slate-400 mb-8 max-w-3xl mx-auto leading-relaxed">
                            We believe in open, verifiable security paradigms. If you are a white-hat hacker or security researcher and find a critical perimeter bypass, smart contract vulnerability, or cryptographic flaw, we will compensate you generously.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <span className="inline-block bg-slate-950 border border-slate-800 text-white font-mono px-6 py-4 rounded-xl">
                                CRITICAL PAYOUT: <strong>$100,000 USDC</strong>
                            </span>
                            <Link href="/security-policy" className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl transition-all border border-blue-400/50 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                                View Security Policy
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
