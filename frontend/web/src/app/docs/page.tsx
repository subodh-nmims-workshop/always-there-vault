'use client';

import { Book, Code2, Terminal, Shield, FolderGit2 } from 'lucide-react';
import Link from 'next/link';

export default function DocsPage() {
    const sections = [
        {
            title: "Getting Started",
            icon: <Terminal className="h-6 w-6 text-blue-400" />,
            links: ["Protocol Overview", "Creating Your First Vault", "Connecting MetaMask", "Understanding Heartbeats"]
        },
        {
            title: "Architecture",
            icon: <FolderGit2 className="h-6 w-6 text-purple-400" />,
            links: ["Zero-Trust Security Model", "Folder Heirarchies & Overrides", "Decentralized Database Sync", "IPFS Storage Mechanics"]
        },
        {
            title: "Smart Contracts",
            icon: <Code2 className="h-6 w-6 text-emerald-400" />,
            links: ["Contract Addresses", "ABI Injections", "The Polygon Node Array", "Emergency Force Majeure"]
        },
        {
            title: "Cryptography",
            icon: <Shield className="h-6 w-6 text-rose-400" />,
            links: ["AES-256-GCM Parameters", "Generating Shamir Shares", "Client-Side RNG", "Salting Metdata"]
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-12">

                {/* Left Sidebar Menu */}
                <div className="w-full md:w-64 shrink-0 border-r border-slate-800 pr-8 hidden md:block">
                    <div className="mb-8">
                        <h3 className="text-white font-bold mb-4 flex items-center">
                            <Book className="h-5 w-5 mr-2 text-slate-400" /> Docs
                        </h3>
                        <div className="space-y-6">
                            {sections.map((sec, i) => (
                                <div key={i}>
                                    <h4 className="text-slate-400 text-sm font-semibold mb-3 uppercase tracking-wider">{sec.title}</h4>
                                    <ul className="space-y-2">
                                        {sec.links.map((link, j) => (
                                            <li key={j}>
                                                <a href="#" className="text-slate-300 hover:text-blue-400 text-sm transition-colors">{link}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1">
                    <div className="mb-12">
                        <span className="text-blue-500 font-semibold tracking-wider text-sm uppercase">Documentation</span>
                        <h1 className="text-4xl font-bold text-white mt-2 mb-4">Protocol Overview</h1>
                        <p className="text-slate-400 text-lg">
                            The Digital Will Protocol is a zero-trust, non-custodial decentralized application (dApp) designed to securely store and conditionally release encrypted digital assets, private keys, and critical information.
                        </p>
                    </div>

                    <div className="prose prose-invert prose-blue max-w-none">
                        <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-slate-800 pb-4">Core Principles</h2>
                        <div className="grid md:grid-cols-2 gap-6 mb-12">
                            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
                                <h3 className="text-lg font-bold text-white mb-2">1. The Server is Blind</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">Everything is encrypted by your local browser before transmission. We possess zero decryption capabilities. If we were subpoenaed by a government entity, we would only be able to provide AES-256 cipher-blobs.</p>
                            </div>
                            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
                                <h3 className="text-lg font-bold text-white mb-2">2. Unstoppable Execution</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">Once a Heartbeat timeline lapses, the Smart Contract irreversibly unlocks the required key reconstructor shards. No engineer or executive can stop the automated transfer.</p>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-white mt-12 mb-6 border-b border-slate-800 pb-4">The Cryptographic Lifecycle</h2>

                        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 overflow-x-auto font-mono text-sm mb-8 text-slate-300">
                            <div className="flex items-center text-slate-500 mb-4">// Sequence of an Asset Upload</div>
                            <div><span className="text-blue-400">1.</span> User selects `Private_Key_Backup.txt`</div>
                            <div><span className="text-blue-400">2.</span> Browser generates `AES-256` Key K</div>
                            <div><span className="text-blue-400">3.</span> Browser encrypts file with K -&gt; `Payload`</div>
                            <div><span className="text-blue-400">4.</span> Browser uploads `Payload` to `Web3.Storage (IPFS)`</div>
                            <div><span className="text-blue-400">5.</span> Browser calls `secrets.js` to split K into [S1, S2, S3, S4, S5]</div>
                            <div><span className="text-blue-400">6.</span> Shards are distributed to Smart Contract, Nominee Wallet, etc.</div>
                        </div>

                        <div className="mt-12 flex items-center justify-between border-t border-slate-800 pt-8">
                            <button disabled className="text-slate-500 cursor-not-allowed text-sm font-semibold">&larr; Previous</button>
                            <Link href="/api" className="text-blue-500 hover:text-blue-400 transition-colors text-sm font-semibold">Creating Your First Vault &rarr;</Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
