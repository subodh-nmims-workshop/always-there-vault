import { Scale } from 'lucide-react';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="mb-12 border-b border-slate-800 pb-8 slide-up flex items-center gap-4">
                    <Scale className="h-10 w-10 text-slate-500 shrink-0" />
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                            Terms of <span className="text-slate-400">Service</span>
                        </h1>
                        <p className="text-slate-500 text-sm font-mono uppercase tracking-widest">Effective Date: October 2026</p>
                    </div>
                </div>

                <div className="prose prose-invert prose-slate max-w-none text-slate-300">

                    <h2 className="text-2xl font-bold text-white mb-6 border-b border-slate-800 pb-2">1. The Protocol is Unstoppable Software</h2>
                    <p className="mb-8 leading-relaxed">
                        By interacting with the Digital Will Protocol, you acknowledge that you are executing immutable <strong>mathematics and self-executing code</strong> on the Polygon network. We, the developers (the "Contributors"), merely provide a user interface to this decentralized logic. Once a smart contract is deployed and an encrypted payload is pinned to IPFS, it cannot be reversed, paused, or altered by us. You are solely responsible for the configuration of your vault.
                    </p>

                    <h2 className="text-2xl font-bold text-white mb-6 border-b border-slate-800 pb-2">2. Zero-Liability Clause</h2>
                    <p className="mb-8 leading-relaxed">
                        The Contributors shall not be held liable for any loss of assets, cryptocurrencies, private keys, or data under any circumstances, including but not limited to:
                        <br /><br />
                        - Loss of your master seed phrase or inability to reconstruct Shamir Shares.<br />
                        - Premature triggering of the Dead-Man protocol due to failure to register a heartbeat ping.<br />
                        - Compromise of a Nominee's wallet address.<br />
                        - Complete destruction of the IPFS network or Web3.Storage downtime.<br />
                        - Malicious exploitation of an unforeseen zero-day vulnerability in our reviewed EVM smart contracts.
                    </p>

                    <h2 className="text-2xl font-bold text-white mb-6 border-b border-slate-800 pb-2">3. Cryptographic Export Restrictions</h2>
                    <p className="mb-8 leading-relaxed">
                        You agree not to use the Digital Will Protocol if you reside in a jurisdiction where the execution of AES-256 symmetric encryption, zero-knowledge proofs, or the acquisition of Shamir Secret fragments is prohibited by civil law. You are solely responsible for compliance with your local sovereign regulations concerning cryptography.
                    </p>

                    <h2 className="text-2xl font-bold text-white mb-6 border-b border-slate-800 pb-2">4. Disclaimers of Warranties</h2>
                    <p className="mb-8 leading-relaxed">
                        The Digital Will Protocol, its client instances, routing APIs, and blockchain contracts are provided "AS-IS" and "AS AVAILABLE" without warranties of any kind, either express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
                        <br /><br />
                        We do not warrant that the functions contained in the protocol will be uninterrupted or error-free, that defects will be corrected, or that the interfaces or the servers that make it available are free of viruses or other harmful components.
                    </p>

                    <h2 className="text-2xl font-bold text-white mb-6 border-b border-slate-800 pb-2">5. Jurisdiction & Governance</h2>
                    <p className="mb-8 leading-relaxed">
                        In the event of an unavoidable dispute regarding the use of the client interfaces (not the open-source EVM contracts), these Terms of Service shall be governed by the laws of Switzerland (Canton of Zug). By utilizing our infrastructure, you agree to submit to the exclusive cryptography-first arbitration methods established by the Digital Will DAO.
                    </p>
                </div>

            </div>
        </div>
    );
}
