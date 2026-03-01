'use client';

import { motion } from 'framer-motion';
import { Database, Network, HardDrive, Infinity, ChevronRight, CheckCircle, Link2 } from 'lucide-react';
import Link from 'next/link';

export default function IpfsPage() {
    const defaultTransition = { duration: 0.8, ease: "easeOut" as any };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={defaultTransition}
                className="mb-16"
            >
                <div className="inline-flex items-center gap-2 mb-6 text-sm font-semibold text-blue-400 uppercase tracking-widest bg-blue-400/10 border border-blue-400/20 px-3 py-1 rounded-full">
                    <Database className="w-4 h-4" /> Permanent Infrastructure
                </div>
                <h1 className="text-4xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
                    Decentralized Storage (IPFS)
                </h1>
                <p className="text-lg text-blue-100/70 font-medium leading-relaxed max-w-3xl">
                    Once the payload is successfully encrypted client-side, the resulting AES-256 cipher-text blob must be stored. To guarantee censorship resistance and longevity beyond any single company's existence, DWP leverages the InterPlanetary File System (IPFS).
                </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.04] transition-colors relative"
                >
                    <Network className="w-8 h-8 text-blue-400 mb-6" />
                    <h3 className="text-2xl font-bold text-white mb-4">Content Addressing</h3>
                    <p className="text-blue-100/70 leading-relaxed mb-6">
                        In a centralized system, files are located by their physical address (URL/server). On IPFS, files are located by their cryptographic hash (Content Identifier, or CID). Even if every Digital Will server goes offline, the encrypted payload exists perpetually on the decentralized web as long as one node hosts it.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-[#050a15] border border-blue-500/20 rounded-3xl p-8 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-[50px]"></div>
                    <HardDrive className="w-8 h-8 text-blue-400 mb-6 relative z-10" />
                    <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Web3.Storage Pinning</h3>
                    <p className="text-blue-100/70 leading-relaxed mb-6 relative z-10">
                        The SDK uses Web3.Storage to automatically "pin" your encrypted blob across the Filecoin network. This financially incentivizes storage operators to maintain your vault's encrypted data indefinitely.
                    </p>
                </motion.div>
            </div>

            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#050a1a] border border-white/10 rounded-2xl p-8 mb-16 overflow-x-auto shadow-inner"
            >
                <h3 className="text-xl font-bold text-white mb-6 flex items-center"><Link2 className="w-5 h-5 mr-3 text-blue-400" /> Resolving the CID</h3>
                <p className="text-slate-400 text-sm mb-6">
                    Because the smart contract only stores the 46-character IPFS CID string to save on gas, the recovery client must resolve it through a gateway.
                </p>
                <pre className="text-sm font-mono leading-loose text-slate-300">
                    <code className="text-slate-500">// 1. Retrieve the anchored CID from the Vault Smart Contract</code>{'\n'}
                    <code className="text-purple-400">const</code> vaultData = <code className="text-blue-300">await</code> protocolContract.getVaultInfo(userAddress);{'\n'}
                    <code className="text-slate-500">// vaultData.ipfsHash === 'bafybeigdyrzt5sfp7ud...'</code>{'\n\n'}
                    <code className="text-slate-500">// 2. Fetch the encrypted blob from ANY public IPFS gateway</code>{'\n'}
                    <code className="text-purple-400">const</code> gatewayUrl = <code className="text-green-300">`https://ipfs.io/ipfs/${'{vaultData.ipfsHash}'}`</code>;{'\n'}
                    <code className="text-purple-400">const</code> response = <code className="text-blue-300">await</code> fetch(gatewayUrl);{'\n'}
                    <code className="text-purple-400">const</code> encryptedBlob = <code className="text-blue-300">await</code> response.arrayBuffer();
                </pre>
            </motion.section>

            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 flex items-start gap-4"
            >
                <Infinity className="w-8 h-8 text-[#a259ff] shrink-0 mt-1" />
                <div>
                    <h3 className="text-xl font-bold text-white mb-2">Maximum Payload Size</h3>
                    <p className="text-blue-100/70 leading-relaxed mb-4">
                        The current protocol SDK optimally handles text-based payloads up to 10MB (sufficient for thousands of private keys, documents, and instructions). For video or large file inheritance, we recommend encrypting the files locally and referencing their separate CIDs within the primary text payload.
                    </p>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center text-sm text-slate-400"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> 10MB Text Allocation allowed per Vault block.</div>
                        <div className="flex items-center text-sm text-slate-400"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> End-to-End verified via SHA-256 before pinning.</div>
                    </div>
                </div>
            </motion.section>

            <div className="mt-20 pt-10 border-t border-white/10 flex justify-between items-center">
                <Link href="/docs/shamir-sdk" className="flex items-center text-slate-400 hover:text-white transition-colors text-sm font-bold">
                    Previous: Shamir SDK
                </Link>
                <Link href="/docs/smart-contract" className="flex items-center text-[#2b52ff] hover:text-white transition-colors text-sm font-bold">
                    Next: Smart Contract Verification <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
            </div>
        </>
    );
}
