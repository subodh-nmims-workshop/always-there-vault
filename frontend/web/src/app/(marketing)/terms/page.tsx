'use client';

import { Scale, AlertTriangle, FileSignature, ShieldAlert, Cpu } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16 slide-up">
                    <div className="inline-flex items-center justify-center p-4 bg-orange-500/10 rounded-full mb-6 border border-orange-500/20">
                        <Scale className="h-10 w-10 text-orange-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-white tracking-tight">
                        Terms of <span className="text-orange-500">Service</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                        By deploying a Digital Will Protocol smart contract, you are mathematically binding yourself to these terms. Read carefully; code is law.
                    </p>
                    <p className="text-sm text-slate-500 mt-4 font-mono">
                        Last Updated: October 2026 | Document ID: DWP-TOS-V2
                    </p>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-6 mb-12 flex items-start">
                    <AlertTriangle className="h-8 w-8 text-orange-400 mr-4 shrink-0 mt-1" />
                    <div>
                        <h3 className="font-bold text-orange-300 text-lg mb-2">CRITICAL DISCLAIMER: NO RECOVERY</h3>
                        <p className="text-orange-200/80 text-sm leading-relaxed">
                            Because this protocol is built entirely on zero-knowledge architecture, <strong>we cannot recover lost passwords, lost private keys, or lost Master AES Keys.</strong> If you lose the cryptographic shards necessary to reconstruct your vault, your data is permanently entombed on IPFS. We cannot "reset" your account. You bear total sovereign responsibility for your keys.
                        </p>
                    </div>
                </div>

                <div className="prose prose-invert prose-orange max-w-none space-y-12">

                    <section className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12">
                        <div className="flex items-center mb-6">
                            <Cpu className="h-8 w-8 text-emerald-400 mr-4" />
                            <h2 className="text-2xl font-bold text-white m-0">1. Acceptance & Autonomous Execution</h2>
                        </div>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            You agree that the Digital Will Protocol is fundamentally a set of autonomous, open-source smart contracts deployed on decentralized blockchain networks (e.g., Polygon). You acknowledge that interactions with these contracts are irrevocable.
                        </p>
                        <p className="text-slate-300 leading-relaxed">
                            Once a 'Dead-Man Switch' condition is met (e.g., failure to provide a heartbeat ping within the specified block height delta), the smart contract will automatically execute its predefined logic, releasing decryption keys or changing ownership states. <strong>We cannot intervene, halt, or reverse this execution.</strong>
                        </p>
                    </section>

                    <section className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12">
                        <div className="flex items-center mb-6">
                            <FileSignature className="h-8 w-8 text-blue-400 mr-4" />
                            <h2 className="text-2xl font-bold text-white m-0">2. Prohibited End Uses</h2>
                        </div>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            While our backend is blind to your payloads, you remain legally liable in your physical jurisdiction for the data you encrypt and pin to IPFS via our web interface. You explicitly agree <strong>NOT</strong> to use the protocol for:
                        </p>
                        <ul className="list-disc pl-6 space-y-3 text-slate-300">
                            <li>Storing or distributing Child Sexual Abuse Material (CSAM). (We utilize automated industry hashing APIs on the <em>encrypted ciphertexts</em> to heuristically ban known abusive payloads before IPFS transit).</li>
                            <li>Coordinating acts of terrorism or violent extremism.</li>
                            <li>Storing stolen cryptographic keys or facilitating ransomware extortion parameters.</li>
                        </ul>
                        <p className="text-slate-400 text-sm mt-4 italic">
                            Violation of these terms may result in the halting of our routing APIs for your specific wallet address, although we cannot delete data already enshrined on the decentralized web.
                        </p>
                    </section>

                    <section className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12">
                        <div className="flex items-center mb-6">
                            <ShieldAlert className="h-8 w-8 text-rose-400 mr-4" />
                            <h2 className="text-2xl font-bold text-white m-0">3. Limitation of Liability</h2>
                        </div>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            The software is provided <strong>"AS IS"</strong>, without warranty of any kind, express or implied. In no event shall the authors, core contributors, or the governing DAO be liable for any claim, damages, or other liability whether in an action of contract, tort, or otherwise.
                        </p>
                        <h4 className="font-bold text-white mb-2 mt-6">Specifically, we are not liable for:</h4>
                        <ul className="list-disc pl-6 space-y-3 text-slate-300 mb-6">
                            <li>Financial losses due to smart contract bugs, exploits, or flash-loan attacks (though we are heavily audited).</li>
                            <li>Loss of data due to catastrophic failures of the underlying IPFS/Filecoin networks.</li>
                            <li>Loss of assets due to user negligence in securing their private keys or Shamir shares.</li>
                            <li>Network congestion or exorbitant gas fees on the Polygon network preventing a timely heartbeat ping.</li>
                        </ul>
                    </section>

                    <section className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12 text-center">
                        <h2 className="text-2xl font-bold text-white mb-4">4. Open Source Licensing</h2>
                        <p className="text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto">
                            The underlying cryptography, smart contracts, and front-end interface of the Digital Will Protocol are open-sourced under the MIT License. You are free to fork, audit, and compile the code yourself.
                        </p>
                        <Link href="https://github.com/subodh-001/decentralized-digital-will-protocol" target="_blank" className="inline-flex bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-8 rounded-xl transition-all border border-slate-700">
                            Audit the Source Code
                        </Link>
                    </section>

                </div>
            </div>
        </div>
    );
}
