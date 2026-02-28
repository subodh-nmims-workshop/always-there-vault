'use client';

import { LifeBuoy, Mail, MessageSquare, FileWarning } from 'lucide-react';

export default function SupportPage() {
    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16 slide-up">
                    <LifeBuoy className="h-12 w-12 text-blue-500 mx-auto mb-6" />
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                        Protocol <span className="gradient-text-premium">Support</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Get help navigating the cryptographic architecture.
                        <br /> <span className="text-amber-500 text-sm font-semibold">Note: We cannot recover lost passwords or decrypt files for you.</span>
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
                    <a href="mailto:support@digitalwill.protocol" className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-blue-500/50 transition-colors group flex flex-col items-center text-center">
                        <Mail className="h-10 w-10 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="text-xl font-bold text-white mb-2">Email Support</h3>
                        <p className="text-slate-400 text-sm">Response within 24 hours for Elite tier users.</p>
                    </a>

                    <a href="https://discord.gg/digitalwill" target="_blank" rel="noreferrer" className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-purple-500/50 transition-colors group flex flex-col items-center text-center">
                        <MessageSquare className="h-10 w-10 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="text-xl font-bold text-white mb-2">Community Discord</h3>
                        <p className="text-slate-400 text-sm">Chat securely with protocol engineers and other users.</p>
                    </a>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-8 max-w-4xl mx-auto flex flex-col md:flex-row items-center md:items-start text-amber-200/90 gap-6">
                    <FileWarning className="h-12 w-12 shrink-0 text-amber-500" />
                    <div>
                        <h4 className="text-lg font-bold text-amber-500 mb-2">Emergency Contract Interventions</h4>
                        <p className="text-sm leading-relaxed">
                            If you have identified a severe vulnerability or if your connected wallet has been compromised, you must immediately call the `revokeAccess()` parameter on the smart contract directly using Polygonscan or a hardware wallet. We cannot freeze your funds on your behalf due to the non-custodial design.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
