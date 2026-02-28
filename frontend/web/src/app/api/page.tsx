'use client';

import { Terminal, Copy, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function APIPage() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText('npm install @digitalwill/protocol-sdk');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="mb-16 slide-up">
                    <Terminal className="h-10 w-10 text-emerald-500 mb-6" />
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                        API & <span className="text-emerald-500">Node SDK</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl">
                        Integrate the Digital Will Protocol directly into your own wallets, family office portals, or wealth management software.
                    </p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-12">
                    <h3 className="text-xl font-bold text-white mb-4">Installation</h3>
                    <div className="flex items-center justify-between bg-black rounded-lg p-4 border border-slate-800">
                        <code className="text-emerald-400 font-mono text-sm">npm install @digitalwill/protocol-sdk</code>
                        <button
                            onClick={handleCopy}
                            className="text-slate-400 hover:text-white transition-colors p-2"
                        >
                            {copied ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <Copy className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                <div className="space-y-12">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-6 border-b border-slate-800 pb-4">Initialize the Decentralized Vault</h3>
                        <div className="bg-[#0D1117] rounded-xl p-6 overflow-x-auto border border-slate-800">
                            <pre className="text-sm font-mono leading-relaxed"><code className="text-slate-300">
                                <span className="text-purple-400">import</span> {'{'} DigitalWill {'}'} <span className="text-purple-400">from</span> <span className="text-green-300">'@digitalwill/protocol-sdk'</span>;

                                <span className="text-slate-500">// Initialize with Web3 Provider (e.g., MetaMask, WalletConnect)</span>
                                <span className="text-purple-400">const</span> protocol = <span className="text-purple-400">new</span> DigitalWill(&#123;
                                web3Provider: window.ethereum,
                                network: <span className="text-green-300">'polygon-mainnet'</span>,
                                storage: <span className="text-green-300">'web3.storage'</span>
                                &#125;);

                                <span className="text-slate-500">// Connect and authenticate via EIP-4361 (Sign-In with Ethereum)</span>
                                <span className="text-purple-400">await</span> protocol.<span className="text-blue-400">connect</span>();
                            </code></pre>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-white mb-6 border-b border-slate-800 pb-4">Encrypt & Shard a Private Key</h3>
                        <div className="bg-[#0D1117] rounded-xl p-6 overflow-x-auto border border-slate-800">
                            <pre className="text-sm font-mono leading-relaxed"><code className="text-slate-300">
                                <span className="text-slate-500">// Local encryption and mathematical generation of Shamir shares</span>
                                <span className="text-purple-400">const</span> payload = <span className="text-purple-400">await</span> protocol.assets.<span className="text-blue-400">securePayload</span>(&#123;
                                type: <span className="text-green-300">'PRIVATE_KEY'</span>,
                                data: <span className="text-green-300">'0x...'</span>,
                                nominees: [<span className="text-green-300">'0xRecipientWalletAddress...'</span>],
                                threshold: 3,
                                totalShares: 5
                                &#125;);

                                <span className="text-slate-500">// Will automatically pin the cipher-blob to IPFS and route the isolated key-shards</span>
                                console.<span className="text-blue-400">log</span>(payload.ipfsCid);
                            </code></pre>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
