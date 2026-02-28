'use client';

import { PlayCircle, ShieldCheck, Heart, UserPlus } from 'lucide-react';

export default function GuidesPage() {
    const guides = [
        {
            icon: <ShieldCheck className="h-6 w-6 text-blue-400" />,
            title: "Setting Up Your First Master Vault",
            time: "5 min read",
            desc: "Learn how to connect your Web3 wallet and initialize the Master AES key."
        },
        {
            icon: <UserPlus className="h-6 w-6 text-purple-400" />,
            title: "Adding Nominees securely",
            time: "8 min read",
            desc: "Assigning trusted family members using their public keys without revealing any underlying data."
        },
        {
            icon: <Heart className="h-6 w-6 text-rose-400" />,
            title: "Configuring the Heartbeat Cron",
            time: "4 min read",
            desc: "Setting up automated weekly or monthly pings to prove you are still active."
        },
        {
            icon: <PlayCircle className="h-6 w-6 text-emerald-400" />,
            title: "Video: How Smart Contract Execution Works",
            time: "12 min watch",
            desc: "A deep dive animated explanation of what happens mathematically when you stop checking in."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16 slide-up">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                        Protocol <span className="gradient-text-premium">Guides</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Step-by-step tutorials and best practices to ensure your digital legacy is flawlessly configured.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {guides.map((guide, idx) => (
                        <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-blue-500/30 transition-colors cursor-pointer group">
                            <div className="bg-slate-950 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {guide.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{guide.title}</h3>
                            <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-4">{guide.time}</p>
                            <p className="text-slate-400 text-sm">
                                {guide.desc}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
