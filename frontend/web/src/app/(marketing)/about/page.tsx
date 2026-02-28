'use client';

import { Target, Users2, Building2 } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16 slide-up">
                    <Building2 className="h-12 w-12 text-slate-500 mx-auto mb-6" />
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                        About The <span className="gradient-text-premium">Protocol</span>
                    </h1>
                    <p className="text-lg text-slate-400">
                        Founded by cryptography researchers, we are engineering the final missing piece of decentralized finance: immutable inheritance.
                    </p>
                </div>

                <div className="space-y-12">
                    <section className="bg-slate-900 border border-slate-800 rounded-3xl p-10">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                            <Target className="mr-3 text-blue-500" />
                            Our Mission
                        </h2>
                        <p className="text-slate-300 leading-relaxed">
                            In the era of self-custody, billions of dollars in Bitcoin and digital assets are lost annually because owners die without a mechanism to pass their private keys to heirs. We believe that reliance on centralized lawyers, physical safe deposit boxes, or trusting web2 cloud providers defeats the entire purpose of crypto.
                            <br /><br />
                            Digital Will Protocol was built to provide a mathematically guaranteed, non-custodial pipeline for transferring generational wealth and secrets when you can no longer do it yourself.
                        </p>
                    </section>

                    <section className="bg-slate-900 border border-slate-800 rounded-3xl p-10">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                            <Users2 className="mr-3 text-purple-500" />
                            The Team
                        </h2>
                        <p className="text-slate-300 leading-relaxed mb-6">
                            Our core contributors operate pseudonymously to ensure the protocol remains immune to coercion. The codebase however is entirely open-source, audited by elite smart contract security firms, and actively maintained on major decentralized subnets.
                        </p>
                        <div className="p-4 bg-slate-950 rounded-lg text-sm font-mono text-slate-500 text-center border border-slate-800">
                            `Code is Law. Math is Truth.`
                        </div>
                    </section>
                </div>

            </div>
        </div>
    );
}
