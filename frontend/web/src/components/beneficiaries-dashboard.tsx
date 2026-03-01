import {
    UserPlusIcon,
    ChartPieIcon,
    UserGroupIcon,
    ClockIcon,
    ShieldCheckIcon,
    DocumentDuplicateIcon,
    PencilSquareIcon,
    TrashIcon,
    ArrowTrendingUpIcon,
    InformationCircleIcon,
    DocumentTextIcon,
    CodeBracketIcon,
    CheckCircleIcon,
    XCircleIcon
} from '@heroicons/react/24/outline'

const beneficiaries = [
    { id: 1, name: 'Sarah Jenkins', avatar: 'SJ', address: '0x71C...921', allocation: 60, condition: 'Immediate', color: 'blue' },
    { id: 2, name: 'David Miller', avatar: 'DM', address: '0x42A...115', allocation: 30, condition: 'Time-delay', color: 'purple' },
    { id: 3, name: 'Crypto Charity', avatar: 'CC', address: '0x99B...332', allocation: 10, condition: 'Immediate', color: 'emerald' },
]

export function BeneficiariesDashboard() {
    return (
        <div className="relative min-h-[calc(100vh-120px)] w-full flex flex-col overflow-x-hidden font-sans text-slate-100 p-2">
            <main className="flex-1 max-w-[1440px] mx-auto w-full space-y-8">
                {/* Header & Stats */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                    <div>
                        <h2 className="text-4xl font-black tracking-tight text-white mb-2">Inheritance Beneficiaries</h2>
                        <p className="text-slate-400 max-w-xl">Configure the cryptographic distribution of your digital legacy. Assets are autonomously transferred via smart contract upon protocol triggers.</p>
                    </div>
                    <button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-transform hover:scale-[1.02] shadow-[0_0_20px_rgba(59,130,246,0.3)] border border-white/10">
                        <UserPlusIcon className="w-5 h-5" />
                        Add New Beneficiary
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl flex flex-col items-center justify-center text-center relative overflow-hidden group">
                        <div className="absolute -top-4 -right-4 text-blue-500/10">
                            <ChartPieIcon className="w-24 h-24" />
                        </div>
                        <div className="relative size-24 mb-4">
                            <svg className="size-full transform -rotate-90">
                                <circle className="text-slate-800" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeWidth="8"></circle>
                                <circle className="text-blue-500" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeDasharray="251.2" strokeDashoffset="0" strokeWidth="8"></circle>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xl font-bold text-white shadow-[0_0_15px_theme(colors.blue.500)] bg-clip-text">100%</span>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Total Allocated</p>
                    </div>

                    <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl flex flex-col justify-center relative overflow-hidden group">
                        <div className="absolute -top-4 -right-4 text-purple-500/10">
                            <UserGroupIcon className="w-28 h-28" />
                        </div>
                        <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Active Beneficiaries</p>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-5xl font-black text-white">03</h3>
                            <span className="text-emerald-400 text-sm font-bold flex items-center bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                                <ArrowTrendingUpIcon className="w-3 h-3 mr-1" /> 1
                            </span>
                        </div>
                    </div>

                    <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl flex flex-col justify-center relative overflow-hidden group">
                        <div className="absolute -top-4 -right-4 text-cyan-500/10">
                            <ClockIcon className="w-28 h-28" />
                        </div>
                        <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Avg. Time Lock</p>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-5xl font-black text-white">180</h3>
                            <span className="text-slate-500 text-sm font-medium uppercase tracking-wider">Days</span>
                        </div>
                    </div>

                    <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl flex flex-col justify-center relative overflow-hidden group">
                        <div className="absolute -top-4 -right-4 text-emerald-500/10">
                            <ShieldCheckIcon className="w-28 h-28" />
                        </div>
                        <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Protocol Status</p>
                        <div className="flex items-center gap-2 mt-4">
                            <div className="size-3 flex-shrink-0 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_12px_#10b981]"></div>
                            <h3 className="text-2xl font-bold text-white tracking-tight">Active Secured</h3>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-slate-900/40 rounded-3xl overflow-hidden border border-slate-800">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-800/40 border-b border-slate-700/50">
                                    <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">Name</th>
                                    <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">Wallet Address</th>
                                    <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">Allocation</th>
                                    <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">Unlock Condition</th>
                                    <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {beneficiaries.map((b) => (
                                    <tr key={b.id} className="hover:bg-slate-800/30 transition-colors group">
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className={`size-10 rounded-full border-2 border-${b.color}-500/30 bg-${b.color}-500/10 flex items-center justify-center font-bold text-${b.color}-400 shadow-inner`}>
                                                    {b.avatar}
                                                </div>
                                                <span className="font-bold text-white tracking-wide">{b.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 font-mono text-sm text-slate-400">
                                            <div className="flex items-center gap-2">
                                                <span>{b.address}</span>
                                                <button className="text-slate-600 hover:text-cyan-400 transition-colors">
                                                    <DocumentDuplicateIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex flex-col gap-2 w-32">
                                                <div className="flex justify-between items-center">
                                                    <span className={`text-xs font-bold text-${b.color}-400 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]`}>{b.allocation}%</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                                    <div className={`h-full bg-${b.color}-500 shadow-[0_0_10px_theme(colors.${b.color}.500)]`} style={{ width: `${b.allocation}%` }}></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className="px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold uppercase tracking-widest">
                                                {b.condition}
                                            </span>
                                        </td>
                                        <td className="px-6 py-6 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 bg-blue-500/10 hover:bg-blue-500/20 rounded-xl text-blue-400 transition-all border border-blue-500/10">
                                                    <PencilSquareIcon className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 bg-rose-500/10 hover:bg-rose-500/20 rounded-xl text-rose-400 transition-all border border-rose-500/10">
                                                    <TrashIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Configuration Info Card */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-slate-900/40 p-8 rounded-3xl relative overflow-hidden flex flex-col md:flex-row gap-8 items-center border border-slate-800">
                        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_100%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
                        <div className="relative z-10 size-32 flex-shrink-0 bg-slate-800/80 rounded-2xl border border-blue-500/20 flex items-center justify-center group overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                            <ShieldCheckIcon className="w-16 h-16 text-blue-500 opacity-80" />
                        </div>
                        <div className="relative z-10 space-y-4">
                            <div className="flex items-center gap-2">
                                <InformationCircleIcon className="w-4 h-4 text-blue-500" />
                                <span className="text-xs font-bold uppercase tracking-widest text-blue-500">Protocol Logic</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white tracking-tight">Beneficiary Configuration Protocol</h3>
                            <p className="text-slate-400 leading-relaxed text-sm">
                                Aethelgard uses multi-sig validation combined with time-locked encryption. Upon a verified trigger event (e.g. wallet inactivity + public record verification), the protocol's smart contracts autonomously reconstruct private key shards for distribution.
                            </p>
                            <div className="flex gap-4 pt-2">
                                <button className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white text-sm font-bold rounded-xl transition-all flex items-center gap-2">
                                    <DocumentTextIcon className="w-4 h-4" /> View Whitepaper
                                </button>
                                <button className="px-5 py-2.5 text-slate-400 hover:text-white text-sm font-bold rounded-xl transition-all flex items-center gap-2">
                                    <CodeBracketIcon className="w-4 h-4" /> Smart Contract
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900/40 p-8 rounded-3xl flex flex-col justify-between border border-slate-800 border-l-4 border-l-cyan-500 relative overflow-hidden">
                        <div className="absolute -right-4 top-10 w-24 h-24 bg-cyan-500/10 blur-2xl rounded-full"></div>
                        <div className="space-y-4 relative z-10">
                            <h4 className="text-lg font-bold text-white">Security Checklist</h4>
                            <ul className="space-y-5">
                                <li className="flex items-start gap-3">
                                    <CheckCircleIcon className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                                    <span className="text-sm text-slate-300 font-medium">Addresses verified on-chain</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircleIcon className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                                    <span className="text-sm text-slate-300 font-medium">Allocations total 100%</span>
                                </li>
                                <li className="flex items-start gap-3 text-slate-500">
                                    <XCircleIcon className="w-5 h-5 flex-shrink-0" />
                                    <span className="text-sm font-medium">Emergency witness assigned</span>
                                </li>
                            </ul>
                        </div>
                        <button className="w-full mt-8 py-3.5 bg-slate-800 border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-700 hover:text-cyan-400 text-slate-300 font-bold text-sm rounded-xl transition-all shadow-inner relative z-10">
                            Update Protocol Settings
                        </button>
                    </div>
                </div>
            </main>

            {/* Background Accents */}
            <div className="fixed top-0 left-0 -z-10 w-full h-full overflow-hidden pointer-events-none bg-[#0a0f1c]">
                <div className="absolute top-[-20%] left-[-10%] size-[800px] bg-blue-600/5 rounded-full blur-[150px]"></div>
            </div>
        </div>
    )
}
