'use client';

import { Terminal, Database, Code, Key, ChevronRight, Share2, Layers } from 'lucide-react';

export default function ApiPage() {
    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16 slide-up max-w-4xl mx-auto pt-10">
                    <div className="inline-flex items-center justify-center p-4 bg-fuchsia-500/10 rounded-full mb-8 border border-fuchsia-500/20">
                        <Terminal className="h-10 w-10 text-fuchsia-400" />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white tracking-tight">
                        REST & RPC <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-pink-500">API Reference</span>
                    </h1>
                    <p className="text-xl text-slate-400 font-light leading-relaxed">
                        Interact with the Digital Will Protocol routing layer to automate IPFS pinning, key fragmentation (Shamir Shares), and heartbeat execution.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 relative z-10">

                    {/* Endpoints Sidebar */}
                    <div className="lg:col-span-3 hidden lg:block border-r border-slate-800 pr-8">
                        <div className="sticky top-24 space-y-8">
                            <div>
                                <h4 className="text-slate-200 font-bold mb-3 uppercase tracking-wider text-xs flex items-center"><Key className="w-4 h-4 mr-2 text-fuchsia-400" /> Authentication</h4>
                                <ul className="space-y-3 test-sm font-mono text-xs">
                                    <li className="flex items-center text-slate-300 hover:text-white cursor-pointer"><span className="text-green-400 font-bold mr-2">POST</span> /auth/verify-signature</li>
                                    <li className="flex items-center text-slate-300 hover:text-white cursor-pointer"><span className="text-blue-400 font-bold mr-2">GET</span> /auth/nonce</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-slate-200 font-bold mb-3 uppercase tracking-wider text-xs flex items-center"><Layers className="w-4 h-4 mr-2 text-fuchsia-400" /> Vaults</h4>
                                <ul className="space-y-3 test-sm font-mono text-xs">
                                    <li className="flex items-center text-fuchsia-300 cursor-pointer"><span className="text-green-400 font-bold mr-2">POST</span> /vault/create</li>
                                    <li className="flex items-center text-slate-300 hover:text-white cursor-pointer"><span className="text-blue-400 font-bold mr-2">GET</span> /vault/:address</li>
                                    <li className="flex items-center text-slate-300 hover:text-white cursor-pointer"><span className="text-yellow-400 font-bold mr-2">PUT</span> /vault/heartbeat</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-slate-200 font-bold mb-3 uppercase tracking-wider text-xs flex items-center"><Share2 className="w-4 h-4 mr-2 text-fuchsia-400" /> IPFS Storage</h4>
                                <ul className="space-y-3 test-sm font-mono text-xs">
                                    <li className="flex items-center text-slate-300 hover:text-white cursor-pointer"><span className="text-green-400 font-bold mr-2">POST</span> /storage/pin-ciphertext</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* API Content */}
                    <div className="lg:col-span-9 space-y-12">

                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
                            <div className="flex items-center justify-between border-b border-slate-800 pb-6 mb-6">
                                <h2 className="text-2xl font-bold text-white flex items-center">
                                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-md text-sm font-mono mr-4 border border-green-500/30">POST</span>
                                    /vault/create
                                </h2>
                            </div>
                            <p className="text-slate-400 mb-8 leading-relaxed">
                                Initializes a new vault record in the metadata routing database. The actual ciphertext must have already been pinned to IPFS, and the smart contract must have been deployed. This endpoint links the on-chain state to our off-chain notification mechanisms.
                            </p>

                            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4">Request Body (JSON)</h3>
                            <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-sm text-slate-300 mb-8 overflow-x-auto">
                                <pre><code>{`{
  "contractAddress": "0xDef1C0ded9bec7F1a1670819833240f027b25EfF",
  "ownerAddress": "0x71C...976F",
  "ipfsCid": "bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi",
  "beneficiaries": [
    {
      "address": "0xABC...123",
      "emailHash": "a3f8c...91b" // Optional
    }
  ],
  "heartbeatIntervalSeconds": 2592000 // 30 Days
}`}</code></pre>
                            </div>

                            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4">Response (201 Created)</h3>
                            <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-sm text-fuchsia-300 overflow-x-auto border-l-4 border-l-fuchsia-500">
                                <pre><code>{`{
  "status": "success",
  "data": {
    "vaultId": "vlt_8f92a4e9b5",
    "createdAt": "2026-10-24T10:00:00Z",
    "nextHeartbeatRequiredBy": "2026-11-23T10:00:00Z",
    "status": "ACTIVE"
  }
}`}</code></pre>
                            </div>
                        </div>

                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
                            <div className="flex items-center justify-between border-b border-slate-800 pb-6 mb-6">
                                <h2 className="text-2xl font-bold text-white flex items-center">
                                    <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-md text-sm font-mono mr-4 border border-yellow-500/30">PUT</span>
                                    /vault/heartbeat
                                </h2>
                            </div>
                            <p className="text-slate-400 mb-8 leading-relaxed">
                                Submits a cryptographic proof of life. Requires a valid EIP-4361 signature from the vault owner's wallet to authenticate. Resets the temporal decay timer for the smart contract execution.
                            </p>

                            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4">Headers</h3>
                            <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-sm text-slate-300 mb-8 overflow-x-auto">
                                <pre><code>{`Authorization: Bearer <EIP-4361-JWT-TOKEN>
x-dwp-nonce: 8f92a4e9-b5a8-43d9-95e2`}</code></pre>
                            </div>

                            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4">Response (200 OK)</h3>
                            <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-sm text-fuchsia-300 overflow-x-auto border-l-4 border-l-emerald-500">
                                <pre><code>{`{
  "status": "success",
  "message": "Heartbeat registered. Decay timer reset.",
  "data": {
    "newHeartbeatRequiredBy": "2026-12-23T10:00:00Z"
  }
}`}</code></pre>
                            </div>
                        </div>

                        {/* Banner */}
                        <div className="bg-gradient-to-r from-fuchsia-900/40 to-slate-900 border border-fuchsia-500/30 rounded-3xl p-8 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Need a high-throughput API Key?</h3>
                                <p className="text-slate-400 text-sm">Institutional partners handling massive state transitions can request elevated rate limits.</p>
                            </div>
                            <button className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-fuchsia-500/25 whitespace-nowrap ml-6">
                                Contact DevRel
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
