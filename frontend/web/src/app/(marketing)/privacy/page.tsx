import { ShieldAlert } from 'lucide-react';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="mb-12 border-b border-slate-800 pb-8 slide-up">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                        Privacy <span className="text-blue-500">Policy</span>
                    </h1>
                    <p className="text-slate-400 text-sm font-mono uppercase tracking-widest">Last Updated: October 2026</p>
                </div>

                <div className="bg-blue-900/20 border border-blue-500/30 rounded-2xl p-8 mb-12 flex items-start gap-4">
                    <ShieldAlert className="h-8 w-8 text-blue-400 shrink-0" />
                    <div>
                        <h3 className="text-lg font-bold text-blue-400 mb-2">The Zero-Knowledge Guarantee</h3>
                        <p className="text-blue-200/80 text-sm leading-relaxed">
                            We operate under a mathematical zero-knowledge constraint. <strong>We cannot read your files, your private keys, or your unencrypted messages.</strong> Everything is symmetrically encrypted on your local device (AES-256) before touching our infrastructure. The cryptographic shards uploaded to our IPs or the blockchain cannot be utilized to reconstruct your data without the predefined threshold of keys held by your device, smart contract, and nominees.
                        </p>
                    </div>
                </div>

                <div className="prose prose-invert prose-slate max-w-none text-slate-300">
                    <h2 className="text-2xl font-bold text-white mb-6 border-b border-slate-800 pb-2">1. Data We Do Not Collect</h2>
                    <p className="mb-8 leading-relaxed">
                        - <strong>Plaintext Files:</strong> We never receive unencrypted files.<br />
                        - <strong>Private Keys / Seed phrases:</strong> We never request or store your wallet master secrets.<br />
                        - <strong>IP Addresses:</strong> We aggressively strip IP-logging from our Node.js load balancers.<br />
                        - <strong>Unencrypted Metadata:</strong> Folder names and asset classifications are salted and hashed.
                    </p>

                    <h2 className="text-2xl font-bold text-white mb-6 border-b border-slate-800 pb-2">2. Data We *Must* Process</h2>
                    <p className="mb-8 leading-relaxed">
                        To provide the core functionality of the Dead-Man Protocol, the following data is processed by our infrastructure:
                        <br /><br />
                        - <strong>Public Wallet Addresses:</strong> Stored on our MongoDB cluster to identify users and authenticate API requests utilizing EIP-4361 standard signatures.<br />
                        - <strong>Heartbeat Timestamps:</strong> To compute inactivity thresholds for the automated release smart contract.<br />
                        - <strong>Encrypted Blobs:</strong> AES-256-GCM cipher-text, temporarily held prior to IPFS pinning.<br />
                        - <strong>Email Addresses (Optional):</strong> If you choose to enable Web2 alerting, your email is stored alongside your public key.
                    </p>

                    <h2 className="text-2xl font-bold text-white mb-6 border-b border-slate-800 pb-2">3. Third Party & On-Chain Sharing</h2>
                    <p className="mb-8 leading-relaxed">
                        Due to the nature of decentalized smart contracts, any `Nominee Public Key` or `Execution Logic` you broadcast to the Polygon blockchain becomes immutable, transparent public data. While the <em>payload content</em> remains heavily encrypted, the transparent metadata showing that Wallet A has designated Wallet B as a successor is visible on block explorers.
                        <br /><br />
                        We use Web3.Storage for decentralized pinning. They follow strict cryptographic constraints, but you must acknowledge that CIDs pinned to IPFS are distributed globally.
                    </p>

                    <h2 className="text-2xl font-bold text-white mb-6 border-b border-slate-800 pb-2">4. Law Enforcement Subpoenas</h2>
                    <p className="mb-8 leading-relaxed">
                        If legally compelled by a recognized international jurisdiction, we will comply. <strong>However</strong>, compliance solely means handing over encrypted blobs and the zero-knowledge metadata we possess. We do not have backdoors. We cannot forge Shamir Shares. <strong>We mathematically cannot decrypt your data for the government, or anyone else.</strong>
                    </p>
                </div>

            </div>
        </div>
    );
}
