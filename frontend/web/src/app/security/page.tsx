'use client';

import { ShieldCheck, Server, KeyRound, EyeOff, Code, FileDigit } from 'lucide-react';

export default function SecurityPage() {
    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16 slide-up">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-full mb-6">
                        <ShieldCheck className="h-10 w-10 text-blue-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                        Security <span className="text-blue-500">Architecture</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        We operate on a strict Zero-Knowledge constraint. We cannot recover your keys, read your files, or alter your smart contract logic.
                    </p>
                </div>

                <div className="space-y-12">
                    {/* Section 1 */}
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                            <KeyRound className="h-6 w-6 mr-3 text-purple-400" />
                            Cryptographic Primitives
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8 text-slate-400 text-sm">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-slate-200">Symmetric Encryption</h3>
                                <p>All files and text payloads are encrypted symmetrically using <strong>AES-256-GCM</strong> (Galois/Counter Mode). This standard is utilized by the NSA for TOP SECRET information. It provides both confidentiality and data authenticity.</p>
                                <div className="p-4 bg-slate-950 rounded-lg font-mono text-xs text-green-400 overflow-x-auto">
                                    crypto.subtle.encrypt(&#123; name: 'AES-GCM', iv &#125;, key, data);
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-slate-200">Key Sharding (SSS)</h3>
                                <p>Instead of relying on a single point of failure, the master AES key is mathematically derived into a polynomial curve using Shamir's Secret Sharing over a Galois Field GF(2^8). We enforce a strictly non-negotiable threshold (e.g., 3-of-5) required for reconstruction.</p>
                            </div>
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                            <Server className="h-6 w-6 mr-3 text-emerald-400" />
                            Infrastructure & Attack Vectors
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-slate-950 rounded-xl p-6 border border-slate-800/50">
                                <EyeOff className="h-8 w-8 text-blue-400 mb-4" />
                                <h3 className="font-bold text-white mb-2">Blind Backend</h3>
                                <p className="text-sm text-slate-400">Our Node.js API acts strictly as a routing and validation layer. It blindly accepts encrypted blobs and forwards them to IPFS. It has no cryptographic context.</p>
                            </div>
                            <div className="bg-slate-950 rounded-xl p-6 border border-slate-800/50">
                                <FileDigit className="h-8 w-8 text-orange-400 mb-4" />
                                <h3 className="font-bold text-white mb-2">Immutable Storage</h3>
                                <p className="text-sm text-slate-400">IPFS relies on content addressing (CIDs). If a single byte of your encrypted payload is altered by an adversary, the CID changes entirely, instantly breaking the fetch logic.</p>
                            </div>
                            <div className="bg-slate-950 rounded-xl p-6 border border-slate-800/50">
                                <Code className="h-8 w-8 text-rose-400 mb-4" />
                                <h3 className="font-bold text-white mb-2">Audited Contracts</h3>
                                <p className="text-sm text-slate-400">Our Polygon smart contracts are mathematically verified against reentrancy, integer overflow, and unauthorized state changes. Logic is immutable post-deployment.</p>
                            </div>
                        </div>
                    </div>

                    {/* Section 3 */}
                    <div className="text-center bg-slate-900 border border-slate-800 rounded-3xl p-10">
                        <h3 className="text-xl font-bold text-white mb-4">Bug Bounty Program</h3>
                        <p className="text-slate-400 mb-6 max-w-xl mx-auto text-sm">
                            We believe in transparent security. If you find a flaw in our smart contracts or cryptographic implementation, we pay out up to <strong>$100,000 USD</strong> in stablecoins.
                        </p>
                        <a href="mailto:security@digitalwill.protocol" className="text-blue-400 hover:text-blue-300 font-semibold underline decoration-blue-500/30 underline-offset-4">
                            Report a vulnerability
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
}
