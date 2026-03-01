import {
    DocumentTextIcon,
    ServerStackIcon,
    KeyIcon,
    CommandLineIcon,
    CloudArrowUpIcon,
    HeartIcon,
    ShareIcon,
    ShieldCheckIcon
} from '@heroicons/react/24/outline'

const logs = [
    { time: '14:20:01', status: 'OK', message: 'Encrypted shard 3 broadcasted to node 0xf2...', color: 'text-green-500' },
    { time: '14:20:04', status: 'INFO', message: 'Syncing with Layer 2 Oracle via Chainlink...', color: 'text-blue-500' },
    { time: '14:20:12', status: 'SECURE', message: 'Heartbeat signature verified at 0x921...8a1', color: 'text-emerald-400' },
    { time: '14:20:15', status: 'OK', message: 'Entropy pool updated (Source: Local HSM)', color: 'text-green-500' },
    { time: '14:20:18', status: 'INFO', message: 'Propagating state root to IPFS Cluster...', color: 'text-blue-500' },
    { time: '14:20:25', status: 'SECURE', message: 'Zero-knowledge proof generated for vault #9482', color: 'text-emerald-400' },
    { time: '14:20:31', status: 'OK', message: 'Cross-chain message acknowledged on Polygon Edge', color: 'text-green-500' },
]

export function StatusDashboard() {
    return (
        <div className="relative min-h-[calc(100vh-120px)] w-full flex flex-col overflow-x-hidden font-sans text-slate-100 p-2">
            <main className="flex-1 max-w-[1440px] mx-auto w-full space-y-8">
                {/* Status Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-white text-4xl font-black tracking-tight">System Status & Node Connectivity</h1>
                        <div className="flex items-center gap-3 bg-green-500/10 px-4 py-1.5 rounded-full border border-green-500/20 w-fit">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                            </span>
                            <p className="text-green-400 font-mono text-xs uppercase tracking-widest font-bold">All Systems Operational</p>
                        </div>
                    </div>

                    <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800/50 border border-slate-700 hover:bg-slate-800 text-white text-sm font-bold transition-all shadow-inner relative overflow-hidden group">
                        <ServerStackIcon className="w-5 h-5 text-blue-400 group-hover:rotate-180 transition-transform duration-500" />
                        Refresh Node Connection
                    </button>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1: Smart Contract Health */}
                    <div className="bg-slate-900/40 rounded-3xl p-8 flex flex-col gap-6 border border-slate-800 border-l-4 border-l-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.05)]">
                        <div className="flex justify-between items-start">
                            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
                                <DocumentTextIcon className="w-6 h-6" />
                            </div>
                            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-green-500/10 text-green-400 border border-green-500/20 uppercase tracking-widest">Verified</span>
                        </div>
                        <div>
                            <h3 className="text-white text-lg font-bold mb-1">Smart Contract Health</h3>
                            <div className="flex items-center gap-2 mb-6">
                                <div className="size-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></div>
                                <p className="text-slate-400 text-sm font-medium">Ethereum Mainnet: <span className="text-white">Active</span></p>
                            </div>
                            <div className="space-y-3 font-mono text-sm">
                                <div className="flex justify-between items-center p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                                    <span className="text-slate-500">Gas Price</span>
                                    <span className="text-blue-400 font-bold">18 Gwei</span>
                                </div>
                                <div className="flex justify-between items-center p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                                    <span className="text-slate-500">Latest Block</span>
                                    <span className="text-white">19,452,001</span>
                                </div>
                                <div className="flex justify-between items-center p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                                    <span className="text-slate-500">Syncing</span>
                                    <span className="text-green-400">100% Synced</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: IPFS Storage Nodes */}
                    <div className="bg-slate-900/40 rounded-3xl p-8 flex flex-col gap-6 border border-slate-800 border-l-4 border-l-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.05)]">
                        <div className="flex justify-between items-start">
                            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                <CloudArrowUpIcon className="w-6 h-6" />
                            </div>
                            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 uppercase tracking-widest">Distributed</span>
                        </div>
                        <div>
                            <h3 className="text-white text-lg font-bold mb-1">IPFS Storage Nodes</h3>
                            <div className="flex items-center gap-2 mb-6">
                                <div className="size-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></div>
                                <p className="text-slate-400 text-sm font-medium">Pinning Status: <span className="text-white">Active</span></p>
                            </div>
                            <div className="space-y-6">
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between text-xs uppercase font-bold text-slate-500">
                                        <span>Distributed Shards</span>
                                        <span className="text-purple-400">5/5 Healthy</span>
                                    </div>
                                    <div className="flex gap-1.5 w-full">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <div key={i} className="h-1.5 flex-1 rounded-full bg-purple-500 shadow-[0_0_8px_theme(colors.purple.500)]"></div>
                                        ))}
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-slate-800">
                                    <p className="text-slate-500 text-[10px] uppercase font-bold mb-3">Network Latency (Avg)</p>
                                    <div className="flex items-end gap-1 h-10 w-full opacity-80">
                                        {[40, 60, 45, 70, 55, 85, 20, 65, 40, 90].map((h, i) => (
                                            <div key={i} className={`w-full rounded-t-sm ${i === 9 ? 'bg-purple-400' : 'bg-purple-500/30'}`} style={{ height: `${h}%` }}></div>
                                        ))}
                                    </div>
                                    <p className="text-white font-mono text-lg mt-2 font-bold flex items-center gap-2">
                                        42ms <span className="text-xs text-green-400 font-sans font-normal bg-green-500/10 px-2 py-0.5 rounded-md">Optimal</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Cryptographic Engine */}
                    <div className="bg-slate-900/40 rounded-3xl p-8 flex flex-col gap-6 border border-slate-800 border-l-4 border-l-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.05)]">
                        <div className="flex justify-between items-start">
                            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                <KeyIcon className="w-6 h-6" />
                            </div>
                            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-widest">Standardized</span>
                        </div>
                        <div>
                            <h3 className="text-white text-lg font-bold mb-1">Cryptographic Engine</h3>
                            <div className="flex items-center gap-2 mb-6">
                                <div className="size-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></div>
                                <p className="text-slate-400 text-sm font-medium">HSM Connectivity: <span className="text-white">Secure</span></p>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                                    <ShieldCheckIcon className="w-6 h-6 text-emerald-500" />
                                    <div>
                                        <p className="text-white text-sm font-bold font-mono">AES-256-GCM</p>
                                        <p className="text-slate-500 text-xs mt-0.5">Encryption Standard Active</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                                    <ShareIcon className="w-6 h-6 text-emerald-500" />
                                    <div>
                                        <p className="text-white text-sm font-bold font-mono">Shamir Secret Sharing</p>
                                        <p className="text-slate-500 text-xs mt-0.5">3/5 Threshold Verified</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Console Area */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 px-2">
                        <TerminalIcon className="w-5 h-5 text-slate-500" />
                        <h2 className="text-slate-400 text-sm font-bold uppercase tracking-widest">Protocol Log Console</h2>
                    </div>

                    <div className="bg-slate-900/60 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
                        <div className="bg-slate-950/80 border-b border-slate-800 px-6 py-3 flex items-center justify-between">
                            <div className="flex gap-2">
                                <div className="size-3 rounded-full bg-rose-500/50"></div>
                                <div className="size-3 rounded-full bg-amber-500/50"></div>
                                <div className="size-3 rounded-full bg-emerald-500/50"></div>
                            </div>
                            <span className="text-xs text-slate-600 font-mono font-medium tracking-wide">bash — vault-node — 80x24</span>
                        </div>

                        <div className="p-8 h-[280px] overflow-y-auto font-mono text-sm leading-loose space-y-2 custom-scrollbar">
                            {logs.map((log, i) => (
                                <div key={i} className="flex gap-4">
                                    <span className="text-slate-600">[{log.time}]</span>
                                    <span className={`${log.color} font-bold w-20`}>[{log.status}]</span>
                                    <span className="text-slate-300">{log.message}</span>
                                </div>
                            ))}
                            <div className="flex gap-4 animate-pulse mt-4">
                                <span className="text-slate-600">[14:20:55]</span>
                                <span className="text-blue-500 font-bold w-20">&gt;</span>
                                <span className="text-slate-100 flex items-center">
                                    Listening for new protocol events
                                    <span className="w-2.5 h-5 bg-blue-500 inline-block ml-1 opacity-70"></span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Stats */}
                <div className="flex flex-wrap gap-4 pt-6">
                    <div className="flex-1 min-w-[200px] bg-slate-900/40 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
                        <div>
                            <p className="text-slate-500 text-[10px] uppercase font-bold mb-1">Total Nodes</p>
                            <p className="text-white text-2xl font-bold font-mono">1,240 <span className="text-green-400 text-sm font-normal ml-2 bg-green-500/10 px-2 py-0.5 rounded-lg">+12</span></p>
                        </div>
                        <ServerStackIcon className="w-8 h-8 text-slate-700" />
                    </div>

                    <div className="flex-1 min-w-[200px] bg-slate-900/40 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
                        <div>
                            <p className="text-slate-500 text-[10px] uppercase font-bold mb-1">Protocol Health</p>
                            <p className="text-white text-2xl font-bold font-mono">99.9% <span className="text-blue-400 text-sm font-normal ml-2 bg-blue-500/10 px-2 py-0.5 rounded-lg">Stable</span></p>
                        </div>
                        <HeartIcon className="w-8 h-8 text-slate-700" />
                    </div>

                    <div className="flex-1 min-w-[200px] bg-slate-900/40 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
                        <div>
                            <p className="text-slate-500 text-[10px] uppercase font-bold mb-1">Encrypted Storage</p>
                            <p className="text-white text-2xl font-bold font-mono">14.2 PB <span className="text-purple-400 text-sm font-normal ml-2 bg-purple-500/10 px-2 py-0.5 rounded-lg">↑ 0.4%</span></p>
                        </div>
                        <CloudArrowUpIcon className="w-8 h-8 text-slate-700" />
                    </div>
                </div>
            </main>

            {/* Background Accents */}
            <div className="fixed top-0 left-0 -z-10 w-full h-full overflow-hidden pointer-events-none bg-[#080c14]">
                <div className="absolute top-[-20%] right-[-10%] size-[800px] bg-blue-600/5 rounded-full blur-[150px]"></div>
            </div>
        </div>
    )
}

function TerminalIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
    )
}
