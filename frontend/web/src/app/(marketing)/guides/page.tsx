'use client';

import { motion } from 'framer-motion';
import { Compass, Search, FileText, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { SharedFooter } from '@/components/shared-footer';

export default function GuidesPage() {
    const defaultTransition = { duration: 0.8, ease: "easeOut" as any };

    const categories = [
        "Cryptographic Theory",
        "Smart Contract Integration",
        "Frontend Implementation",
        "Node Architecture"
    ];

    const guides = [
        {
            title: "Implementing Multi-Party Computation",
            cat: "Cryptographic Theory",
            desc: "A theoretical breakdown of distributing AES decryption keys across an M-of-N validator network using Shamir's Secret Sharing.",
        },
        {
            title: "Verifying the Smart Contract on Polygon",
            cat: "Smart Contract Integration",
            desc: "Step-by-step guide to using Hardhat and the Etherscan API to independently verify our deployed EVM bytecode.",
        },
        {
            title: "Client-Side Zero-Knowledge Flow in React",
            cat: "Frontend Implementation",
            desc: "Overcoming SSR bottlenecks in Next.js to ensure encryption keys never leak during hydration.",
        },
        {
            title: "Setting up a Heartbeat Relayer",
            cat: "Node Architecture",
            desc: "Run a dockerized Python script to monitor addresses and automate L2 gasless heartbeat signatures on behalf of your users.",
        },
        {
            title: "Handling Beneficiary Claims Safely",
            cat: "Smart Contract Integration",
            desc: "How beneficiaries can prove ownership of an assigned wallet address without compromising their identity prior to claim.",
        },
        {
            title: "Pinning Encrypted Blobs to IPFS",
            cat: "Node Architecture",
            desc: "Best practices for utilizing Storacha (web3.storage) or dedicated IPFS nodes to ensure your encrypted assets are never garbage collected.",
        }
    ];

    return (
        <div className="min-h-screen bg-[#050a1a] font-sans selection:bg-[#2b52ff]/30 selection:text-white relative overflow-hidden flex flex-col">

            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-[#050a1a]/80 backdrop-blur-xl border-b border-white/5 px-4 sm:px-8 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="text-[#2b52ff] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Compass className="w-8 h-8" />
                    </div>
                    <span className="font-bold text-xl tracking-tight hidden sm:block">DeadMan Guides</span>
                </Link>
                <div className="hidden md:flex gap-8 items-center absolute left-1/2 -translate-x-1/2">
                    <Link href="/docs" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Documentation</Link>
                    <Link href="/api" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">API Reference</Link>
                    <Link href="/guides" className="text-white transition-colors text-sm font-medium">Guides</Link>
                </div>
                <Link href="/" className="bg-[#2b52ff] hover:bg-[#2b52ff]/80 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-[0_0_20px_rgba(43,82,255,0.4)]">
                    Dashboard
                </Link>
            </nav>

            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 pb-32">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={defaultTransition}
                    className="mb-20 text-center max-w-4xl mx-auto"
                >
                    <div className="inline-flex items-center gap-3 mb-8 border border-[#2b52ff]/20 bg-[#2b52ff]/10 backdrop-blur-md px-4 py-1.5 rounded-full uppercase tracking-widest text-[#2b52ff] text-xs font-bold shadow-lg shadow-[#2b52ff]/5">
                        <Compass className="h-4 w-4" />
                        <span>Knowledge Base</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-8 leading-[1.05]">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#2b52ff]">Guides</span> & Tutorials.
                    </h1>

                    {/* Search Bar Bento Style */}
                    <div className="relative w-full max-w-2xl mx-auto mt-12 group">
                        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                            <Search className="h-6 w-6 text-slate-400 group-hover:text-[#2b52ff] transition-colors" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-16 pr-6 py-6 bg-white/[0.02] border border-white/10 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-[#2b52ff] focus:border-[#2b52ff] transition-all font-medium text-lg leading-none shadow-xl shadow-black/30 backdrop-blur-md"
                            placeholder="Search architecture, integration patterns..."
                        />
                    </div>
                </motion.div>

                {/* Categories */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ ...defaultTransition, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-4 mb-20"
                >
                    <button className="bg-[#2b52ff] text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-[#2b52ff]/30 border border-[#2b52ff]">All Guides</button>
                    {categories.map((cat, i) => (
                        <button key={i} className="bg-white/[0.03] text-slate-300 hover:text-white px-6 py-2.5 rounded-full text-sm font-bold border border-white/10 hover:border-white/20 hover:bg-white/[0.05] transition-all tracking-wide">
                            {cat}
                        </button>
                    ))}
                </motion.div>

                {/* Expanded Guide Content */}
                <div className="max-w-4xl mx-auto space-y-24 mb-24">

                    {/* Guide 1: Heartbeat Relayer */}
                    <section id="heartbeat-relayer" className="scroll-mt-32">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-xs font-bold bg-white/10 text-slate-300 px-3 py-1 rounded-full uppercase tracking-widest border border-white/10">Node Architecture</span>
                            <span className="text-slate-500 text-sm">12 min read</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">Setting up a Heartbeat Relayer</h2>
                        <p className="text-xl text-slate-400 mb-10 leading-relaxed font-normal">
                            To ensure true zero-knowledge and gasless operations for the end-user, the DeadMan Protocol relies on a network of automated relayers to ping the Liveness Oracle. Here is how to run a dockerized node to monitor addresses and automate L2 signatures.
                        </p>

                        <div className="prose prose-invert prose-blue max-w-none text-slate-300">
                            <h3 className="text-white text-2xl font-semibold mb-4 mt-8">Prerequisites</h3>
                            <ul className="mb-6 space-y-2 list-disc pl-5">
                                <li>Docker and Docker-Compose installed</li>
                                <li>An active Polygon RPC Provider URL (Alchemy, Infura, etc.)</li>
                                <li>A Relayer Wallet with sufficient MATIC for transaction fees</li>
                            </ul>

                            <h3 className="text-white text-2xl font-semibold mb-4 mt-8">1. Clone and Configure</h3>
                            <p className="mb-4">Begin by cloning the relayer repository and configuring your environment variables. The relayer needs to know which contract it is interacting with and its own private funding key.</p>
                            <div className="bg-[#0a0c10] border border-white/10 p-5 rounded-2xl font-mono text-sm text-[#5c8df6] overflow-x-auto mb-8 shadow-inner">
                                <pre><code>{`git clone https://github.com/deadman-protocol/relayer-node.git
cd relayer-node
cp .env.example .env

# Edit the .env file
RELAYER_PRIVATE_KEY=your_private_key
POLYGON_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/YOUR_KEY
CONTRACT_ADDRESS=0x123...`}</code></pre>
                            </div>

                            <h3 className="text-white text-2xl font-semibold mb-4 mt-8">2. Run the Docker Container</h3>
                            <p className="mb-4">The relayer is designed to be highly available and lightweight. It runs a continuous polling loop validating EIP-712 signatures against the Polygon network.</p>

                            <div className="bg-[#0a0c10] border border-white/10 p-5 rounded-2xl font-mono text-sm text-[#5c8df6] overflow-x-auto mb-8 shadow-inner">
                                <pre><code>{`docker-compose up -d --build

# Check the logs to ensure successful connection
docker logs -f relayer-node-main`}</code></pre>
                            </div>

                            <div className="bg-[#2b52ff]/10 border border-[#2b52ff]/30 p-6 rounded-2xl mt-8">
                                <h4 className="text-white font-bold mb-2 flex items-center gap-2">⚠️ Important Note on Gas</h4>
                                <p className="text-sm text-blue-200/80 m-0">
                                    The relayer will pay the gas fees on behalf of the users to submit their heartbeat transactions. Ensure your relayer wallet always maintains a minimum balance of 2 MATIC to prevent transaction halts.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Guide 2: React SSR Encryption Flow */}
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                    <section id="react-ssr-flow" className="scroll-mt-32">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-xs font-bold bg-[#1152d4]/10 text-[#5c8df6] px-3 py-1 rounded-full uppercase tracking-widest border border-[#1152d4]/30">Frontend Implementation</span>
                            <span className="text-slate-500 text-sm">8 min read</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">Client-Side Zero-Knowledge Flow in React</h2>
                        <p className="text-xl text-slate-400 mb-10 leading-relaxed font-normal">
                            Modern web frameworks like Next.js blur the lines between server and client. Discover how we isolate the encryption context strictly to the browser window, preventing secret leakage during SSR hydration.
                        </p>

                        <div className="prose prose-invert prose-blue max-w-none text-slate-300">
                            <h3 className="text-white text-2xl font-semibold mb-4 mt-8">The Hydration Dilemma</h3>
                            <p className="mb-6">During Next.js hydration, initial state is rendered on the server before being sent to the client. If an encryption key is generated or used within the initial render cycle without proper scoping, it could theoretically be captured in server logs or memory dumps.</p>

                            <h3 className="text-white text-2xl font-semibold mb-4 mt-8">Isolating the Web Crypto API</h3>
                            <p className="mb-4">We wrap all AES-256-GCM logic in a strict client-side boundary, leveraging the `window.crypto.subtle` API which naturally cannot execute in a Node.js server context.</p>

                            <div className="bg-[#0a0c10] border border-white/10 p-5 rounded-2xl font-mono text-sm text-[#5c8df6] overflow-x-auto shadow-inner">
                                <pre><code>{`'use client';

import { useEffect, useState } from 'react';

export function EncryptAssetComponent({ file }) {
  const [encryptedBlob, setEncryptedBlob] = useState(null);

  useEffect(() => {
    // This strictly runs ONLY in the browser after mount.
    const encryptPayload = async () => {
      if (!window.crypto || !window.crypto.subtle) return;
      
      const key = await window.crypto.subtle.generateKey(
        { name: "AES-GCM", length: 256 },
        true, // extractable (needed for Shamir sharding)
        ["encrypt", "decrypt"]
      );

      // Proceed with encryption...
    };
    
    encryptPayload();
  }, [file]);
}`}</code></pre>
                            </div>
                        </div>
                    </section>

                    {/* Guide 3: Next JS and IPFS */}
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                    <section id="ipfs-pinning" className="scroll-mt-32">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-xs font-bold bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full uppercase tracking-widest border border-purple-500/30">Node Architecture</span>
                            <span className="text-slate-500 text-sm">15 min read</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">Pinning Encrypted Blobs to IPFS</h2>
                        <p className="text-xl text-slate-400 mb-10 leading-relaxed font-normal">
                            IPFS is wonderful for decentralization but lacks inherent persistence guarantees without "pinning". Here is our strategy for ensuring digital wills survive the test of time using backend microservices.
                        </p>

                        <div className="prose prose-invert prose-purple max-w-none text-slate-300">
                            <p className="mb-6">Instead of pushing to IPFS directly from the browser (which exposes API keys or relies on unstable client connections), we utilize a robust NestJS backend proxy that interacts with Web3.Storage.</p>

                            <h3 className="text-white text-2xl font-semibold mb-4 mt-8">Backend Architecture Pattern</h3>
                            <ul className="mb-6 space-y-2 list-disc pl-5">
                                <li><strong>Client:</strong> Encrypts file -&gt; Converts to ArrayBuffer -&gt; POSTs FormData to NestJS.</li>
                                <li><strong>Backend (IpfsService):</strong> Receives blob -&gt; Authenticates via @web3-storage/w3up-client -&gt; Uploads -&gt; Pins -&gt; Returns CID.</li>
                                <li><strong>Client:</strong> Receives CID -&gt; Dispatches transaction to Polygon linking Vault to CID.</li>
                            </ul>

                            <p>This architecture abstracts the immense complexity of IPFS persistence directly away from the user, whilst retaining 100% data sovereignity since the backend only ever receives an uncrackable AES ciphertext blob.</p>
                        </div>
                    </section>

                </div>
            </main>

            <SharedFooter />
        </div>
    );
}
