'use client';

import { BookOpen, Terminal, Code, Cpu, Database, Network, ChevronRight, Lock } from 'lucide-react';
import Link from 'next/link';

export default function DocsPage() {
    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16 slide-up max-w-4xl mx-auto pt-10">
                    <div className="inline-flex items-center justify-center p-4 bg-teal-500/10 rounded-full mb-8 border border-teal-500/20">
                        <BookOpen className="h-10 w-10 text-teal-400" />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white tracking-tight">
                        Protocol <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-emerald-500">Documentation</span>
                    </h1>
                    <p className="text-xl text-slate-400 font-light leading-relaxed">
                        Comprehensive guides and technical documentation for integrating with the Digital Will Protocol smart contracts and decentralized storage nodes.
                    </p>
                </div>

                <div className="grid md:grid-cols-12 gap-12 relative z-10">

                    {/* Sidebar Nav (mock form) */}
                    <div className="md:col-span-3 hidden md:block border-r border-slate-800 pr-8">
                        <div className="sticky top-24 space-y-8">
                            <div>
                                <h4 className="text-slate-200 font-bold mb-3 uppercase tracking-wider text-xs">Core Concepts</h4>
                                <ul className="space-y-2 text-sm text-slate-400">
                                    <li className="text-teal-400 font-semibold mb-2 flex items-center"><ChevronRight className="h-3 w-3 mr-1" /> Architecture Overview</li>
                                    <li className="hover:text-slate-200 cursor-pointer transition-colors mb-2">The Heartbeat Mechanism</li>
                                    <li className="hover:text-slate-200 cursor-pointer transition-colors mb-2">Zero-Knowledge Encryption</li>
                                    <li className="hover:text-slate-200 cursor-pointer transition-colors mb-2">Shamir Secret Sharing</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-slate-200 font-bold mb-3 uppercase tracking-wider text-xs">Smart Contracts</h4>
                                <ul className="space-y-2 text-sm text-slate-400">
                                    <li className="hover:text-slate-200 cursor-pointer transition-colors mb-2">Contract Addresses</li>
                                    <li className="hover:text-slate-200 cursor-pointer transition-colors mb-2">Vault Factory</li>
                                    <li className="hover:text-slate-200 cursor-pointer transition-colors mb-2">State Transitions</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="md:col-span-9">
                        <div className="prose prose-invert prose-teal max-w-none space-y-12">

                            <section>
                                <h2 className="text-3xl font-bold text-white mb-6 border-b border-slate-800 pb-4">Architecture Overview</h2>
                                <p className="text-slate-300 leading-relaxed text-lg mb-8">
                                    The Digital Will Protocol (DWP) utilizes a hybrid on-chain/off-chain architecture. Smart contracts on the Polygon network maintain the authoritative state of the "vault" (alive vs. deceased) while IPFS handles the immutable storage of the encrypted payload.
                                </p>

                                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                                    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                                        <Lock className="h-8 w-8 text-blue-400 mb-4" />
                                        <h3 className="text-xl font-bold text-white mb-2">1. Client-Side Encryption</h3>
                                        <p className="text-slate-400 text-sm">
                                            Payloads are encrypted in the browser utilizingAES-256-GCM before any network requests are made. The server never sees plaintext.
                                        </p>
                                    </div>
                                    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                                        <Database className="h-8 w-8 text-orange-400 mb-4" />
                                        <h3 className="text-xl font-bold text-white mb-2">2. IPFS Transit</h3>
                                        <p className="text-slate-400 text-sm">
                                            The ciphertext is pinned to IPFS via Web3.Storage. The resulting Content Identifier (CID) is the only data reference required.
                                        </p>
                                    </div>
                                    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                                        <Terminal className="h-8 w-8 text-emerald-400 mb-4" />
                                        <h3 className="text-xl font-bold text-white mb-2">3. Contract Deployment</h3>
                                        <p className="text-slate-400 text-sm">
                                            The CID and beneficiary addresses are etched into a personalized Vault Smart Contract on the Polygon PoS chain.
                                        </p>
                                    </div>
                                    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                                        <Cpu className="h-8 w-8 text-purple-400 mb-4" />
                                        <h3 className="text-xl font-bold text-white mb-2">4. State Resolution</h3>
                                        <p className="text-slate-400 text-sm">
                                            If the temporal decay function expires without a heartbeat, the contract unlocks, allowing the beneficiary to fetch the CID.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800">
                                <h3 className="text-2xl font-bold text-white mb-4">Quick Start snippet</h3>
                                <p className="text-slate-400 mb-6">Instantiating the protocol via the core SDK (TypeScript):</p>
                                <div className="bg-slate-950 rounded-xl p-6 border border-slate-800/80 overflow-x-auto shadow-inner">
                                    <pre className="text-sm font-mono text-emerald-300 leading-relaxed">
                                        <code>{`import { DigitalWillProtocol } from '@dwp/sdk';
import { JsonRpcProvider, Wallet } from 'ethers';

// 1. Initialize Provider
const provider = new JsonRpcProvider(process.env.POLYGON_RPC_URL);
const signer = new Wallet(process.env.PRIVATE_KEY, provider);

// 2. Instantiate Protocol
const protocol = new DigitalWillProtocol(signer, {
    ipfsNode: 'web3.storage',
    encryption: 'aes-256-gcm'
});

// 3. Deploy New Vault
const vault = await protocol.createVault({
    beneficiaries: ['0x71C...976F'],
    heartbeatIntervalBlocks: 43200, // ~1 month on Polygon
    payloadBuffer: myEncryptedDataBuffer
});

console.log(\`Vault deployed at \${vault.address}\`);`}</code>
                                    </pre>
                                </div>
                            </section>

                            <section>
                                <h3 className="text-2xl font-bold text-white mb-4 mt-12">Security Prerequisites</h3>
                                <p className="text-slate-400">Before deploying a production vault, ensure you have reviewed the <Link href="/security" className="text-teal-400 hover:underline">Security Architecture</Link>. Due to the immutable nature of the EVM, deploying to mainnet requires strict adherence to OPSEC guidelines regarding your master AES key generation.</p>
                            </section>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
