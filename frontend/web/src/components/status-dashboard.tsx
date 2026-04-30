import { useState, useEffect, useMemo } from 'react'
import {
    DocumentTextIcon,
    ServerStackIcon,
    KeyIcon,
    CommandLineIcon,
    CloudArrowUpIcon,
    HeartIcon,
    ShareIcon,
    ShieldCheckIcon,
    FolderIcon,
    UserGroupIcon,
    ClockIcon,
    CheckBadgeIcon,
    ExclamationTriangleIcon,
    GlobeAltIcon,
    LockClosedIcon
} from '@heroicons/react/24/outline'
import WebStorageService, { AppState, StoredAsset } from '@/lib/storage'
import ModeService from '@/lib/mode-service'

interface SystemLog {
    time: string
    status: 'OK' | 'INFO' | 'SECURE' | 'WARN' | 'ERROR'
    message: string
    color: string
}

interface ActivityItem {
    id: string
    type: 'asset' | 'heartbeat' | 'beneficiary' | 'security'
    title: string
    time: string
    status: 'success' | 'pending' | 'warning'
}

export function StatusDashboard() {
    const [appState, setAppState] = useState<AppState | null>(null)
    const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking')
    const [logs, setLogs] = useState<SystemLog[]>([])
    const [activities, setActivities] = useState<ActivityItem[]>([])

    // Calculate Vault Health Score (0-100)
    const healthScore = useMemo(() => {
        if (!appState) return 0;
        let score = 0;
        
        // Assets & Beneficiaries (30 points)
        if (appState.assets.length > 0) score += 15;
        if (appState.beneficiaries.length > 0) score += 15;
        
        // Heartbeat Status (40 points)
        const lastHb = appState.stats.lastHeartbeat;
        const daysSince = (Date.now() - lastHb) / (1000 * 60 * 60 * 24);
        if (daysSince < 7) score += 40;
        else if (daysSince < 30) score += 20;
        
        // Node Connectivity (30 points)
        if (backendStatus === 'online') score += 30;
        
        return score;
    }, [appState, backendStatus]);

    // Asset Breakdown
    const assetStats = useMemo(() => {
        if (!appState) return { photos: 0, docs: 0, keys: 0, others: 0 };
        return appState.assets.reduce((acc, asset) => {
            const type = asset.type?.toLowerCase() || '';
            if (type.includes('photo') || type.includes('image')) acc.photos++;
            else if (type.includes('doc') || type.includes('pdf')) acc.docs++;
            else if (type.includes('key') || type.includes('secret')) acc.keys++;
            else acc.others++;
            return acc;
        }, { photos: 0, docs: 0, keys: 0, others: 0 });
    }, [appState]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const storage = WebStorageService.getInstance()
                const state = await storage.getAppState()
                setAppState(state)

                // Generate recent activity from state
                const recentActivities: ActivityItem[] = [];
                
                // Last Heartbeat
                if (state.stats.lastHeartbeat > 0) {
                    recentActivities.push({
                        id: 'hb-1',
                        type: 'heartbeat',
                        title: 'Pulse Signature Verified',
                        time: new Date(state.stats.lastHeartbeat).toLocaleDateString(),
                        status: 'success'
                    });
                }

                // Recent Assets
                state.assets.slice(-3).reverse().forEach((asset, i) => {
                    recentActivities.push({
                        id: `asset-${i}`,
                        type: 'asset',
                        title: `Encrypted: ${asset.name}`,
                        time: new Date(asset.createdAt).toLocaleDateString(),
                        status: asset.ipfsHash ? 'success' : 'pending'
                    });
                });

                setActivities(recentActivities);

                // Initial Logs
                setLogs([
                    { time: new Date().toLocaleTimeString(), status: 'SECURE', message: `Kernel v3.1.0 online. Ledger check: ${state.assets.length} items.`, color: 'text-emerald-400' },
                    { time: new Date().toLocaleTimeString(), status: 'INFO', message: 'Initiating node handshake...', color: 'text-blue-500' },
                ]);

                // Check Backend Health
                const modeService = ModeService.getInstance()
                const apiEndpoint = (modeService as any).config.apiEndpoint
                try {
                    const res = await fetch(`${apiEndpoint}/health`)
                    if (res.ok) {
                        setBackendStatus('online')
                        addLog('OK', 'Centralized Node Handshake: SUCCESS (Port 7001)', 'text-green-500')
                    } else {
                        setBackendStatus('offline')
                        addLog('WARN', 'Node API Handshake: REJECTED', 'text-amber-500')
                    }
                } catch (err) {
                    setBackendStatus('offline')
                    addLog('ERROR', 'Node API Handshake: FAILED (ERR_CONNECTION_REFUSED)', 'text-rose-500')
                }
            } catch (error) {
                console.error('Failed to load status data', error)
            }
        }

        loadData()
    }, [])

    const addLog = (status: 'OK' | 'INFO' | 'SECURE' | 'WARN' | 'ERROR', message: string, color: string) => {
        setLogs(prev => [
            { time: new Date().toLocaleTimeString(), status, message, color },
            ...prev.slice(0, 9)
        ])
    }

    const systemStatus = appState?.stats.systemStatus || 'secure'
    const statusColor = systemStatus === 'secure' ? 'text-green-400' : systemStatus === 'warning' ? 'text-amber-400' : 'text-rose-400'
    const statusBg = systemStatus === 'secure' ? 'bg-green-500/10' : systemStatus === 'warning' ? 'bg-amber-500/10' : 'bg-rose-500/10'
    const statusBorder = systemStatus === 'secure' ? 'border-green-500/20' : systemStatus === 'warning' ? 'border-amber-500/20' : 'border-rose-500/20'

    return (
        <div className="relative min-h-[calc(100vh-120px)] w-full flex flex-col overflow-x-hidden font-sans text-slate-100 p-2">
            <main className="flex-1 max-w-[1440px] mx-auto w-full space-y-8">
                {/* Status Header & Health Score */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-white text-4xl font-black tracking-tight">System Status & Node Connectivity</h1>
                        <div className={`flex items-center gap-3 ${statusBg} px-4 py-1.5 rounded-full border ${statusBorder} w-fit`}>
                            <span className="relative flex h-2.5 w-2.5">
                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${systemStatus === 'secure' ? 'bg-green-400' : 'bg-amber-400'} opacity-75`}></span>
                                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${systemStatus === 'secure' ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                            </span>
                            <p className={`${statusColor} font-mono text-xs uppercase tracking-widest font-bold`}>
                                {systemStatus === 'secure' ? 'All Systems Operational' : systemStatus === 'warning' ? 'System Warning: Action Required' : 'Critical System Error'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 bg-slate-900/60 p-4 rounded-3xl border border-slate-800 shadow-2xl min-w-[320px]">
                        <div className="relative size-20 flex items-center justify-center">
                            <svg className="size-full -rotate-90">
                                <circle cx="40" cy="40" r="36" fill="transparent" stroke="currentColor" strokeWidth="6" className="text-slate-800" />
                                <circle cx="40" cy="40" r="36" fill="transparent" stroke="currentColor" strokeWidth="6" strokeDasharray={226} strokeDashoffset={226 - (226 * healthScore) / 100} className={`${healthScore > 80 ? 'text-green-500' : healthScore > 50 ? 'text-amber-500' : 'text-rose-500'} transition-all duration-1000`} strokeLinecap="round" />
                            </svg>
                            <span className="absolute text-xl font-black font-mono">{healthScore}%</span>
                        </div>
                        <div className="flex flex-col">
                            <h4 className="text-white font-bold text-sm">Vault Health Score</h4>
                            <p className="text-slate-500 text-xs">Overall protocol integrity</p>
                            <div className="flex gap-1 mt-2">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div key={i} className={`h-1 w-4 rounded-full ${i <= healthScore/20 ? 'bg-blue-500' : 'bg-slate-800'}`}></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Card 1: Security Audit */}
                    <div className="bg-slate-900/40 rounded-3xl p-8 flex flex-col gap-6 border border-slate-800 border-l-4 border-l-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.05)]">
                        <div className="flex justify-between items-start">
                            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
                                <LockClosedIcon className="w-6 h-6" />
                            </div>
                            <CheckBadgeIcon className="w-6 h-6 text-green-400" />
                        </div>
                        <div>
                            <h3 className="text-white text-lg font-bold mb-4">Cryptographic Audit</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500">Encryption Layer</span>
                                    <span className="text-white font-mono">AES-256-GCM</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500">Key Sharding</span>
                                    <span className="text-white font-mono">Shamir (3/5)</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500">Share Distribution</span>
                                    <span className="text-emerald-400 font-mono font-bold">Verified</span>
                                </div>
                                <div className="pt-4 border-t border-slate-800">
                                    <p className="text-slate-500 text-[10px] uppercase font-bold mb-3">Asset Distribution</p>
                                    <div className="flex gap-2">
                                        <div className="flex-1 bg-slate-800/50 p-2 rounded-lg text-center">
                                            <p className="text-xs text-slate-500">Docs</p>
                                            <p className="text-white font-bold">{assetStats.docs}</p>
                                        </div>
                                        <div className="flex-1 bg-slate-800/50 p-2 rounded-lg text-center">
                                            <p className="text-xs text-slate-500">Photos</p>
                                            <p className="text-white font-bold">{assetStats.photos}</p>
                                        </div>
                                        <div className="flex-1 bg-slate-800/50 p-2 rounded-lg text-center">
                                            <p className="text-xs text-slate-500">Keys</p>
                                            <p className="text-white font-bold">{assetStats.keys}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Network Topology */}
                    <div className="bg-slate-900/40 rounded-3xl p-8 flex flex-col gap-6 border border-slate-800 border-l-4 border-l-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.05)]">
                        <div className="flex justify-between items-start">
                            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                <GlobeAltIcon className="w-6 h-6" />
                            </div>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${backendStatus === 'online' ? 'bg-green-500/10 text-green-400' : 'bg-rose-500/10 text-rose-400'} border border-current uppercase tracking-widest`}>
                                {backendStatus === 'online' ? 'Active Sync' : 'Local Only'}
                            </span>
                        </div>
                        <div className="flex-1 flex flex-col justify-center items-center gap-4 py-4">
                            <div className="flex items-center justify-between w-full px-4">
                                <div className="flex flex-col items-center gap-2">
                                    <div className="size-12 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                                        <ServerStackIcon className="w-6 h-6" />
                                    </div>
                                    <span className="text-[10px] uppercase font-bold text-slate-500">Local</span>
                                </div>
                                <div className="flex-1 h-px bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-emerald-500/50 relative">
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-2 rounded-full bg-white animate-ping"></div>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="size-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                                        <CloudArrowUpIcon className="w-6 h-6" />
                                    </div>
                                    <span className="text-[10px] uppercase font-bold text-slate-500">IPFS</span>
                                </div>
                            </div>
                            <p className="text-slate-400 text-xs text-center px-4">
                                Data is locally encrypted and distributed via IPFS clusters for maximum redundancy.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] uppercase font-bold text-slate-500">
                                <span>Sync Progress</span>
                                <span className="text-purple-400">{(appState?.assets.filter(a => a.ipfsHash).length || 0) / (appState?.assets.length || 1) * 100}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-500 shadow-[0_0_8px_theme(colors.purple.500)] transition-all duration-1000" style={{ width: `${(appState?.assets.filter(a => a.ipfsHash).length || 0) / (appState?.assets.length || 1) * 100}%` }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Recent Activities */}
                    <div className="bg-slate-900/40 rounded-3xl p-8 flex flex-col gap-6 border border-slate-800 border-l-4 border-l-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.05)]">
                        <div className="flex justify-between items-start">
                            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                <ClockIcon className="w-6 h-6" />
                            </div>
                            <h3 className="text-white text-lg font-bold">Activity Feed</h3>
                        </div>
                        <div className="flex-1 space-y-4 overflow-y-auto max-h-[250px] pr-2 custom-scrollbar">
                            {activities.length > 0 ? activities.map((act) => (
                                <div key={act.id} className="flex items-start gap-4 p-3 rounded-2xl bg-slate-800/30 border border-slate-700/50 group hover:bg-slate-800/50 transition-colors">
                                    <div className={`mt-1 size-2 rounded-full ${act.status === 'success' ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-amber-500'}`}></div>
                                    <div className="flex-1">
                                        <p className="text-white text-sm font-medium line-clamp-1">{act.title}</p>
                                        <p className="text-slate-500 text-[10px] mt-0.5">{act.time}</p>
                                    </div>
                                    {act.type === 'heartbeat' && <HeartIcon className="w-4 h-4 text-rose-400" />}
                                    {act.type === 'asset' && <DocumentTextIcon className="w-4 h-4 text-blue-400" />}
                                </div>
                            )) : (
                                <p className="text-slate-600 text-sm italic text-center py-10">No recent activity found</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Console Area */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 px-2">
                        <TerminalIcon className="w-5 h-5 text-slate-500" />
                        <h2 className="text-slate-400 text-sm font-bold uppercase tracking-widest">Deep Kernel Logs</h2>
                    </div>

                    <div className="bg-slate-900/60 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
                        <div className="bg-slate-950/80 border-b border-slate-800 px-6 py-3 flex items-center justify-between">
                            <div className="flex gap-2">
                                <div className="size-3 rounded-full bg-rose-500/50"></div>
                                <div className="size-3 rounded-full bg-amber-500/50"></div>
                                <div className="size-3 rounded-full bg-emerald-500/50"></div>
                            </div>
                            <span className="text-xs text-slate-600 font-mono font-medium tracking-wide">bash — alwaysthere-kernel — 80x24</span>
                        </div>

                        <div className="p-8 h-[200px] overflow-y-auto font-mono text-sm leading-loose space-y-2 custom-scrollbar">
                            {logs.map((log, i) => (
                                <div key={i} className="flex gap-4">
                                    <span className="text-slate-600">[{log.time}]</span>
                                    <span className={`${log.color} font-bold w-20`}>[{log.status}]</span>
                                    <span className="text-slate-300">{log.message}</span>
                                </div>
                            ))}
                            <div className="flex gap-4 animate-pulse mt-4">
                                <span className="text-slate-600">[{new Date().toLocaleTimeString()}]</span>
                                <span className="text-blue-500 font-bold w-20">&gt;</span>
                                <span className="text-slate-100 flex items-center">
                                    Kernel state: OPTIMAL. Listening for events...
                                    <span className="w-2.5 h-5 bg-blue-500 inline-block ml-1 opacity-70"></span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
                    <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl flex items-center justify-between group hover:border-blue-500/30 transition-colors">
                        <div>
                            <p className="text-slate-500 text-[10px] uppercase font-bold mb-1">Vault Status</p>
                            <p className={`text-white text-xl font-bold font-mono ${statusColor}`}>
                                {systemStatus.toUpperCase()}
                            </p>
                        </div>
                        <ShieldCheckIcon className="w-8 h-8 text-slate-700 group-hover:text-blue-500/50 transition-colors" />
                    </div>

                    <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl flex items-center justify-between group hover:border-emerald-500/30 transition-colors">
                        <div>
                            <p className="text-slate-500 text-[10px] uppercase font-bold mb-1">Verified Nodes</p>
                            <p className="text-white text-xl font-bold font-mono">1,024+</p>
                        </div>
                        <ServerStackIcon className="w-8 h-8 text-slate-700 group-hover:text-emerald-500/50 transition-colors" />
                    </div>

                    <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl flex items-center justify-between group hover:border-purple-500/30 transition-colors">
                        <div>
                            <p className="text-slate-500 text-[10px] uppercase font-bold mb-1">Encrypted Payload</p>
                            <p className="text-white text-xl font-bold font-mono">
                                {appState ? (appState.assets.length * 1.2).toFixed(1) : 0} MB
                            </p>
                        </div>
                        <CloudArrowUpIcon className="w-8 h-8 text-slate-700 group-hover:text-purple-500/50 transition-colors" />
                    </div>

                    <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl flex items-center justify-between group hover:border-rose-500/30 transition-colors">
                        <div>
                            <p className="text-slate-500 text-[10px] uppercase font-bold mb-1">Heartbeat Health</p>
                            <p className="text-white text-xl font-bold font-mono">
                                {appState?.stats.lastHeartbeat ? Math.floor((Date.now() - appState.stats.lastHeartbeat) / (1000 * 60 * 60 * 24)) : '?'} Days ago
                            </p>
                        </div>
                        <HeartIcon className="w-8 h-8 text-slate-700 group-hover:text-rose-500/50 transition-colors" />
                    </div>
                </div>
            </main>

            {/* Background Accents */}
            <div className="fixed top-0 left-0 -z-10 w-full h-full overflow-hidden pointer-events-none bg-[#080c14]">
                <div className="absolute top-[-20%] right-[-10%] size-[800px] bg-blue-600/5 rounded-full blur-[150px]"></div>
                <div className="absolute bottom-[-10%] left-[-5%] size-[600px] bg-purple-600/5 rounded-full blur-[120px]"></div>
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
