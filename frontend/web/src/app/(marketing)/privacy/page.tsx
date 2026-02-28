'use client';

import { FileKey, EyeOff, ShieldCheck, Database, Server, Fingerprint } from 'lucide-react';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16 slide-up">
                    <div className="inline-flex items-center justify-center p-4 bg-blue-500/10 rounded-full mb-6 border border-blue-500/20">
                        <EyeOff className="h-10 w-10 text-blue-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-white tracking-tight">
                        Zero-Knowledge <span className="text-blue-500">Privacy Policy</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto font-light">
                        We cannot sell, leak, or expose your data because we mathematically cannot read it. Our privacy policy is driven by cryptographic impossibility, not corporate promises.
                    </p>
                    <p className="text-sm text-slate-500 mt-4 font-mono">
                        Last Updated: October 2026 | Document ID: DWP-PRIV-V2
                    </p>
                </div>

                <div className="prose prose-invert prose-blue max-w-none space-y-12">
                    <section className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12">
                        <div className="flex items-center mb-6">
                            <ShieldCheck className="h-8 w-8 text-emerald-400 mr-4" />
                            <h2 className="text-2xl font-bold text-white m-0">1. The Absolute Baseline: Zero-Knowledge</h2>
                        </div>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            The Digital Will Protocol operates on a strict zero-knowledge (ZK), end-to-end encrypted (E2EE) framework. All sensitive data—including text notes, file payloads, and folder names—is encrypted <strong>client-side</strong> within your browser or mobile device utilizing the AES-256-GCM cipher before transit.
                        </p>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            <strong>We hold absolutely zero access to your plaintext data or your encryption keys.</strong> Consequently, we cannot comply with subpoenas or government requests for your file contents, as handing over the encrypted ciphertexts would provide authorities with mathematically indecipherable noise.
                        </p>
                    </section>

                    <section className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12">
                        <div className="flex items-center mb-6">
                            <Database className="h-8 w-8 text-orange-400 mr-4" />
                            <h2 className="text-2xl font-bold text-white m-0">2. Metadata & Centralized Routing</h2>
                        </div>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            While your payload is encrypted and decentralized via IPFS, our routing APIs (housed on Node.js/MongoDB Atlas) require minimal metadata to coordinate heartbeat logic and smart contract relaying.
                        </p>
                        <h3 className="text-lg font-bold text-white mb-3 mt-6">What we intentionally store:</h3>
                        <ul className="list-disc pl-6 space-y-3 text-slate-300 mb-6">
                            <li><strong>Public Wallet Addresses:</strong> Ethereum/Polygon 0x addresses derived from EIP-4361 signatures for authentication.</li>
                            <li><strong>Encrypted Payload Artifacts:</strong> The actual AES-256 ciphertexts, Initialization Vectors (IVs), and IPFS Content Identifiers (CIDs).</li>
                            <li><strong>Heartbeat Timestamps:</strong> Epoch timestamps of your last verifiable activity ping.</li>
                            <li><strong>Notification Emails (Optional):</strong> If you choose to notify beneficiaries via standard Web2 protocols, we securely hash/salt and store these email addresses.</li>
                        </ul>
                        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl mt-6">
                            <h4 className="font-bold text-red-400 mb-2">What we explicitly DO NOT store:</h4>
                            <p className="text-slate-300 text-sm">
                                IP addresses (they are scrubbed at the edge via Cloudflare), plaintext passwords (we don't use them), KYC documentation (we are permissionless), or web analytics tracking cookies (no Google Analytics, no Facebook Pixels).
                            </p>
                        </div>
                    </section>

                    <section className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12">
                        <div className="flex items-center mb-6">
                            <Server className="h-8 w-8 text-purple-400 mr-4" />
                            <h2 className="text-2xl font-bold text-white m-0">3. Blockchain Permanence (The 'Right to be Forgotten')</h2>
                        </div>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            Please be acutely aware that <strong>blockchains are immutable ledgers</strong>. By interacting with the Digital Will Protocol smart contracts, certain transaction data (such as the deployment of your personal Vault contract, gas paid, and heartbeat transaction hashes) will be permanently etched into the Polygon network.
                        </p>
                        <p className="text-slate-300 leading-relaxed">
                            While the GDPR generally affords European citizens the "Right to be Forgotten," it is mathematically impossible for us (or anyone else) to delete on-chain transaction hashes. We strongly advise that you never initiate a transaction using a wallet address that is inextricably linked to your real-world identity if you desire absolute anonymity.
                        </p>
                    </section>

                    <section className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12">
                        <div className="flex items-center mb-6">
                            <Fingerprint className="h-8 w-8 text-cyan-400 mr-4" />
                            <h2 className="text-2xl font-bold text-white m-0">4. Third-Party Sub-Processors</h2>
                        </div>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            To ensure high availability and censorship resistance, we leverage a tightly curated list of infrastructure providers. They receive only the encrypted data required to perform their functions:
                        </p>
                        <ul className="list-disc pl-6 space-y-3 text-slate-300">
                            <li><strong>Web3.Storage / Filecoin:</strong> For decentralized pinning of your encrypted payloads via IPFS CIDs.</li>
                            <li><strong>MongoDB Atlas (Frankfurt Region):</strong> For high-speed retrieval of your routing metadata. Data at rest is encrypted via AES-256.</li>
                            <li><strong>Polygon PoS Network:</strong> The decentralized validator set executing the ultimate logic of your digital will.</li>
                        </ul>
                    </section>

                </div>
            </div>
        </div>
    );
}
