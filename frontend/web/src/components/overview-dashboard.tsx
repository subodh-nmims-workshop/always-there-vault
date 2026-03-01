import { BoltIcon, ChartBarIcon, FingerPrintIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

export function OverviewDashboard() {
    return (
        <div className="relative flex h-auto min-h-[calc(100vh-120px)] w-full flex-col overflow-x-hidden text-slate-100 font-sans p-2">
            <div className="max-w-[1440px] mx-auto w-full">
                {/* Hero Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-slate-900/40 p-6 rounded-3xl border border-slate-800 flex items-center justify-between overflow-hidden relative group">
                        <div className="absolute -right-4 -bottom-4 size-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"></div>
                        <div>
                            <p className="text-slate-400 text-sm font-medium mb-1">Vault Health</p>
                            <h3 className="text-4xl font-bold tracking-tighter text-white">98.2%</h3>
                            <p className="text-green-400 text-xs mt-2 flex items-center gap-1 font-semibold uppercase">
                                <ShieldCheckIcon className="w-4 h-4" /> Optimal Security
                            </p>
                        </div>
                        <div className="relative size-20">
                            <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                                <circle className="stroke-slate-800" cx="18" cy="18" fill="none" r="16" strokeWidth="3"></circle>
                                <circle className="stroke-blue-500" cx="18" cy="18" fill="none" r="16" strokeDasharray="100" strokeDashoffset="2" strokeLinecap="round" strokeWidth="3"></circle>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center glow-primary">
                                <ShieldCheckIcon className="text-blue-500 w-8 h-8" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900/40 p-6 rounded-3xl border border-slate-800 flex flex-col justify-between">
                        <p className="text-slate-400 text-sm font-medium">Network Protection</p>
                        <div className="flex items-end justify-between mt-4">
                            <h3 className="text-3xl font-bold text-white">Quantum-Safe</h3>
                            <div className="flex gap-1 h-8 items-end">
                                <div className="w-1.5 h-4 bg-blue-500/40 rounded-full"></div>
                                <div className="w-1.5 h-6 bg-blue-500/60 rounded-full"></div>
                                <div className="w-1.5 h-8 bg-blue-500 rounded-full shadow-[0_0_10px_theme(colors.blue.500)]"></div>
                                <div className="w-1.5 h-5 bg-blue-500/50 rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900/40 p-6 rounded-3xl border border-slate-800 flex flex-col justify-between">
                        <p className="text-slate-400 text-sm font-medium">Gas Reserved</p>
                        <div className="flex items-end justify-between mt-4">
                            <h3 className="text-3xl font-bold text-white tracking-tighter">0.45 ETH</h3>
                            <p className="text-slate-400 text-sm font-medium">~$1,250.00</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Column */}
                    <div className="lg:w-2/3 flex flex-col gap-6">
                        {/* Chart Section */}
                        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 relative overflow-hidden">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-xl font-bold text-white">Asset Value Locked</h2>
                                    <p className="text-slate-400 text-sm mt-1">Portfolio valuation across all encrypted vaults</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-3xl font-bold text-white tracking-tight">$1,240,500.00</span>
                                    <p className="text-green-400 text-sm font-medium mt-1">+12.5% <span className="text-slate-500">last 30d</span></p>
                                </div>
                            </div>

                            <div className="h-[280px] w-full relative">
                                <svg className="w-full h-full overflow-visible" viewBox="0 0 800 280">
                                    <defs>
                                        <linearGradient id="gradient" x1="0%" x2="0%" y1="0%" y2="100%">
                                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"></stop>
                                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"></stop>
                                        </linearGradient>
                                        <linearGradient id="lineGradient" x1="0%" x2="100%" y1="0%" y2="0%">
                                            <stop offset="0%" stopColor="#2563eb"></stop>
                                            <stop offset="100%" stopColor="#9333ea"></stop>
                                        </linearGradient>
                                    </defs>
                                    <path d="M0,220 C100,210 150,240 250,180 S400,120 500,140 S650,40 800,60" fill="none" stroke="url(#lineGradient)" strokeLinecap="round" strokeWidth="4"></path>
                                    <path d="M0,220 C100,210 150,240 250,180 S400,120 500,140 S650,40 800,60 L800,280 L0,280 Z" fill="url(#gradient)"></path>

                                    {/* Nodes */}
                                    <circle className="shadow-[0_0_15px_theme(colors.blue.500)]" cx="250" cy="180" fill="#2563eb" r="6" stroke="#fff" strokeWidth="2"></circle>
                                    <circle cx="500" cy="140" fill="#9333ea" r="6" stroke="#fff" strokeWidth="2"></circle>
                                    <circle cx="800" cy="60" fill="#9333ea" r="6" stroke="#fff" strokeWidth="2"></circle>
                                </svg>
                                <div className="flex justify-between mt-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                                    <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity Section */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between px-2">
                                <h2 className="text-lg font-bold text-white">Recent Activity</h2>
                                <button className="text-blue-500 text-sm font-semibold hover:text-blue-400 transition-colors">View All Logs</button>
                            </div>
                            <div className="grid gap-3">
                                <div className="bg-slate-900/40 p-4 rounded-2xl flex items-center justify-between border border-slate-800 hover:border-slate-700 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="size-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                                            <ShieldCheckIcon className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white">Asset Encrypted</p>
                                            <p className="text-xs text-slate-400 mt-0.5">Hardware Wallet cold storage vault #4</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-medium text-slate-500 uppercase">2 hours ago</p>
                                        <p className="text-[10px] text-blue-500 font-mono mt-1">TX: 0x8a...e1</p>
                                    </div>
                                </div>

                                <div className="bg-slate-900/40 p-4 rounded-2xl flex items-center justify-between border border-slate-800 hover:border-slate-700 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="size-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 border border-green-500/20">
                                            <BoltIcon className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white">Heartbeat Signed</p>
                                            <p className="text-xs text-slate-400 mt-0.5">Daily verification protocol successful</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-medium text-slate-500 uppercase">6 hours ago</p>
                                        <p className="text-[10px] text-green-500 font-mono mt-1">TX: 0x2b...f9</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:w-1/3 flex flex-col gap-6">
                        {/* Dead Man's Switch Card */}
                        <div className="relative group rounded-3xl p-1 bg-gradient-to-b from-blue-500/20 to-purple-500/20">
                            <div className="absolute inset-0 bg-blue-500/5 blur-xl rounded-3xl opacity-50"></div>
                            <div className="relative bg-slate-900/80 rounded-[22px] p-8 border border-slate-800/50 h-full backdrop-blur-xl">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-lg font-bold text-white">Dead Man's Switch</h2>
                                    <span className="bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                                        Active
                                    </span>
                                </div>

                                <div className="flex flex-col items-center py-6">
                                    <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 tracking-tighter mb-2">14d 06h 22m</div>
                                    <p className="text-slate-400 text-sm font-medium">Until next required heartbeat</p>
                                </div>

                                <div className="mt-8 space-y-3">
                                    <button className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] flex items-center justify-center gap-2">
                                        <FingerPrintIcon className="w-5 h-5" />
                                        Sign Heartbeat Now
                                    </button>
                                    <button className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl border border-slate-700 transition-colors text-sm">
                                        Edit Trigger Settings
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Beneficiaries Card */}
                        <div className="bg-slate-900/40 rounded-3xl p-8 border border-slate-800">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold text-white">Beneficiaries</h2>
                                <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs font-bold border border-blue-500/20">5 Total</span>
                            </div>

                            <div className="space-y-3 mb-8">
                                <div className="flex items-center justify-between p-3 rounded-xl border border-slate-700/50 bg-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-inner">SJ</div>
                                        <div>
                                            <p className="font-bold text-white text-sm">Sarah Jenkins</p>
                                            <p className="text-xs text-blue-400 font-medium">Primary Heir (40%)</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-3 rounded-xl border border-slate-700/50 bg-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm shadow-inner">DM</div>
                                        <div>
                                            <p className="font-bold text-white text-sm">David Miller</p>
                                            <p className="text-xs text-emerald-400 font-medium">Secondary (20%)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors text-sm border border-slate-700">
                                Manage Beneficiaries
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Accents */}
            <div className="fixed top-0 left-0 -z-10 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] size-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] size-[600px] bg-purple-600/10 rounded-full blur-[150px]"></div>
            </div>
        </div>
    )
}
