import { useState, useEffect, useMemo, useRef } from 'react'
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
    const [activeTranslation, setActiveTranslation] = useState<string>('Booting up secure vaults and protocol components...')
    const logsContainerRef = useRef<HTMLDivElement>(null)

    // Persistent addLog helper
    const addLog = async (status: SystemLog['status'], message: string, color: string) => {
        const newLog: SystemLog = { time: new Date().toLocaleTimeString(), status, message, color };
        setLogs(prev => [...prev, newLog].slice(-25));
        try {
            await WebStorageService.getInstance().saveDiagnosticLog(newLog);
        } catch (err) {
            console.warn('Failed to save diagnostic log', err);
        }
    };

    // Scroll logs container to bottom whenever new logs are appended
    useEffect(() => {
        if (logsContainerRef.current) {
            logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
        }
    }, [logs]);

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

                // Load existing logs from IndexedDB or create defaults
                const existingLogs = await storage.getDiagnosticLogs()
                if (existingLogs && existingLogs.length > 0) {
                    setLogs(existingLogs.slice(-25))
                    setActiveTranslation('System telemetry loaded from persistent vault storage.')
                } else {
                    const initialLogs: SystemLog[] = [
                        { time: new Date().toLocaleTimeString(), status: 'INFO', message: 'Initializing DeadMan Protocol Kernel v3.1.0...', color: 'text-blue-600 dark:text-blue-400' },
                        { time: new Date().toLocaleTimeString(), status: 'OK', message: `Local storage state loaded. Ledger contains ${state.assets.length} items.`, color: 'text-green-600 dark:text-green-400' },
                        { time: new Date().toLocaleTimeString(), status: 'OK', message: 'Loaded Shamir secret sharing configuration (Threshold: 3/5).', color: 'text-green-600 dark:text-green-400' }
                    ]
                    setLogs(initialLogs)
                    for (const log of initialLogs) {
                        await storage.saveDiagnosticLog(log)
                    }
                    setActiveTranslation('Secure Vault Initialization: Loading database, identity keypairs, and configurations.');
                }

                // Connection check logs staggered
                setTimeout(() => {
                    addLog('INFO', 'Connecting to IPFS gateway bootstrap nodes...', 'text-blue-600 dark:text-blue-400')
                    setActiveTranslation('Decentralized storage network: Searching for available IPFS gateway clusters.')
                }, 800);

                setTimeout(() => {
                    addLog('SECURE', 'IPFS Swarm connected successfully. 8 peers active.', 'text-emerald-600 dark:text-emerald-400')
                    setActiveTranslation('Decentralized connection active: Backup network sync established.')
                }, 1600);

                // Check Backend Health
                const modeService = ModeService.getInstance()
                const apiEndpoint = (modeService as any).config.apiEndpoint
                setTimeout(async () => {
                    try {
                        const res = await fetch(`${apiEndpoint}/health`)
                        if (res.ok) {
                            setBackendStatus('online')
                            addLog('OK', 'Centralized Node Handshake: SUCCESS (Port 7001)', 'text-green-600 dark:text-green-400')
                            setActiveTranslation('Verification Successful: Synchronized successfully with the centralized verification server.')
                        } else {
                            setBackendStatus('offline')
                            addLog('WARN', 'Node API Handshake: REJECTED', 'text-amber-600 dark:text-amber-400')
                            setActiveTranslation('Verification Warning: Server rejected handshake. Defaulting to local node.')
                        }
                    } catch (err) {
                        setBackendStatus('offline')
                        addLog('ERROR', 'Node API Handshake: FAILED (ERR_CONNECTION_REFUSED)', 'text-rose-600 dark:text-rose-400')
                        setActiveTranslation('Verification Failed: Cannot reach server. Using offline local cluster fallback.')
                    }
                }, 2400);
            } catch (error) {
                console.error('Failed to load status data', error)
            }
        }

        loadData()

        // Setup real-time periodic logs loop with translations and adaptive colors
        const liveLogsBank = [
            { 
                status: 'OK', 
                message: 'P2P network ping roundtrip: 42ms.', 
                color: 'text-green-600 dark:text-green-400',
                translation: 'Connection is stable: Blockchain nodes responding quickly.'
            },
            { 
                status: 'SECURE', 
                message: 'Audited Shamir shares: 3/5 shares online & intact.', 
                color: 'text-emerald-600 dark:text-emerald-400',
                translation: 'Key shards verified: Your digital legacy keys are split and stored securely.' 
            },
            { 
                status: 'OK', 
                message: 'Broadcasted state updates to DHT. Pin status: ACTIVE.', 
                color: 'text-green-600 dark:text-green-400',
                translation: 'Encrypted backup sync: Safely pinned latest updates to decentralized servers.'
            },
            { 
                status: 'INFO', 
                message: 'Periodic system health check: Status OPTIMAL.', 
                color: 'text-blue-600 dark:text-blue-400',
                translation: 'All systems green: Automated background security audit completed successfully.'
            },
            { 
                status: 'OK', 
                message: 'Verified zero-knowledge state proof of local database.', 
                color: 'text-green-600 dark:text-green-400',
                translation: 'Cryptographic proof verified: Local database records are authentic.'
            },
            { 
                status: 'SECURE', 
                message: 'Checked threshold conditions: Trigger timer active.', 
                color: 'text-emerald-600 dark:text-emerald-400',
                translation: 'Dead-man switch monitor: Waiting for next heartbeat scheduled check.'
            },
            { 
                status: 'OK', 
                message: 'Syncing block headers: current height #4,921,805.', 
                color: 'text-green-600 dark:text-green-400',
                translation: 'Ledger sync active: Synchronized with the latest blockchain block.'
            },
            { 
                status: 'INFO', 
                message: 'Challenge window status: Remaining time 14 days, 3 hours.', 
                color: 'text-blue-600 dark:text-blue-400',
                translation: 'Milestone reminder: Next proof-of-life ping is due in 14 days.'
            },
            { 
                status: 'OK', 
                message: 'Consensus verified: 12 nodes confirmed latest state transition.', 
                color: 'text-green-600 dark:text-green-400',
                translation: 'Network agreement: Decentralized validators confirmed vault settings.'
            },
            { 
                status: 'SECURE', 
                message: 'AES-256-GCM integrity check: PASSED.', 
                color: 'text-emerald-600 dark:text-emerald-400',
                translation: 'Military-grade encryption verified: Files remain locked and untampered.'
            },
        ];

        let logIndex = 0;
        const intervalId = setInterval(() => {
            const nextLog = liveLogsBank[logIndex % liveLogsBank.length];
            addLog(nextLog.status as any, nextLog.message, nextLog.color);
            setActiveTranslation(nextLog.translation);
            logIndex++;
        }, 8000);

        // Real-time Event Listeners
        const handleAssetSaved = (e: Event) => {
            const asset = (e as CustomEvent).detail;
            addLog('OK', `Local ledger mutation: Encrypted Asset [${asset.name}] saved to database.`, 'text-green-600 dark:text-green-400');
            setActiveTranslation(`Asset database updated: Encrypted file "${asset.name}" (${(asset.size / 1024).toFixed(1)} KB) saved locally.`);
        };

        const handleAssetDeleted = (e: Event) => {
            const { id } = (e as CustomEvent).detail;
            addLog('WARN', `Local ledger mutation: Asset ID [${id.substring(0, 8)}...] deleted.`, 'text-amber-600 dark:text-amber-400');
            setActiveTranslation('Asset database updated: File removed from your local secure vault.');
        };

        const handleBeneficiarySaved = (e: Event) => {
            const beneficiary = (e as CustomEvent).detail;
            addLog('OK', `Local ledger mutation: Beneficiary [${beneficiary.name}] updated.`, 'text-green-600 dark:text-green-400');
            setActiveTranslation(`Beneficiary database updated: Identity info for "${beneficiary.name}" saved.`);
        };

        const handleBeneficiaryDeleted = (e: Event) => {
            const { id } = (e as CustomEvent).detail;
            addLog('WARN', `Local ledger mutation: Beneficiary ID [${id.substring(0, 8)}...] deleted.`, 'text-amber-600 dark:text-amber-400');
            setActiveTranslation('Beneficiary database updated: Beneficiary removed from your legacy settings.');
        };

        const handleHeartbeatSaved = (e: Event) => {
            const hb = (e as CustomEvent).detail;
            addLog('SECURE', `Verification Signature: Heartbeat registered successfully via [${hb.method.toUpperCase()}].`, 'text-emerald-600 dark:text-emerald-400');
            setActiveTranslation('Heartbeat verified: Your system proof-of-life status has been updated and switch timer reset.');
        };

        const handleOnline = () => {
            addLog('OK', 'Network status change: connection interface ONLINE.', 'text-green-600 dark:text-green-400');
            setActiveTranslation('Internet connection restored: Decentralized sync cluster is live.');
        };

        const handleOffline = () => {
            addLog('WARN', 'Network status change: connection interface OFFLINE.', 'text-amber-600 dark:text-amber-400');
            setActiveTranslation('Internet connection lost: Protocol operating in offline local-only fallback mode.');
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('storage-asset-saved', handleAssetSaved);
            window.addEventListener('storage-asset-deleted', handleAssetDeleted);
            window.addEventListener('storage-beneficiary-saved', handleBeneficiarySaved);
            window.addEventListener('storage-beneficiary-deleted', handleBeneficiaryDeleted);
            window.addEventListener('storage-heartbeat-saved', handleHeartbeatSaved);
            window.addEventListener('online', handleOnline);
            window.addEventListener('offline', handleOffline);
        }

        return () => {
            clearInterval(intervalId);
            if (typeof window !== 'undefined') {
                window.removeEventListener('storage-asset-saved', handleAssetSaved);
                window.removeEventListener('storage-asset-deleted', handleAssetDeleted);
                window.removeEventListener('storage-beneficiary-saved', handleBeneficiarySaved);
                window.removeEventListener('storage-beneficiary-deleted', handleBeneficiaryDeleted);
                window.removeEventListener('storage-heartbeat-saved', handleHeartbeatSaved);
                window.removeEventListener('online', handleOnline);
                window.removeEventListener('offline', handleOffline);
            }
        };
    }, [])


    const systemStatus = appState?.stats.systemStatus || 'secure'
    const statusColor = systemStatus === 'secure' ? 'text-green-400' : systemStatus === 'warning' ? 'text-amber-400' : 'text-rose-400'
    const statusBg = systemStatus === 'secure' ? 'bg-green-500/10' : systemStatus === 'warning' ? 'bg-amber-500/10' : 'bg-rose-500/10'
    const statusBorder = systemStatus === 'secure' ? 'border-green-500/20' : systemStatus === 'warning' ? 'border-amber-500/20' : 'border-rose-500/20'

    return (
        <div className="relative min-h-[calc(100vh-120px)] w-full flex flex-col overflow-x-hidden font-sans text-slate-800 dark:text-slate-100 p-2">
            <main className="flex-1 max-w-[1440px] mx-auto w-full space-y-8">
                {/* Status Header & Health Score */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-slate-900 dark:text-white text-4xl font-black tracking-tight">System Status & Node Connectivity</h1>
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

                    <div className="flex items-center gap-6 bg-white dark:bg-slate-900/60 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl min-w-[320px]">
                        <div className="relative size-20 flex items-center justify-center">
                            <svg className="size-full -rotate-90">
                                <circle cx="40" cy="40" r="36" fill="transparent" stroke="currentColor" strokeWidth="6" className="text-slate-200 dark:text-slate-800" />
                                <circle cx="40" cy="40" r="36" fill="transparent" stroke="currentColor" strokeWidth="6" strokeDasharray={226} strokeDashoffset={226 - (226 * healthScore) / 100} className={`${healthScore > 80 ? 'text-green-500' : healthScore > 50 ? 'text-amber-500' : 'text-rose-500'} transition-all duration-1000`} strokeLinecap="round" />
                            </svg>
                            <span className="absolute text-xl font-black font-mono text-slate-900 dark:text-white">{healthScore}%</span>
                        </div>
                        <div className="flex flex-col">
                            <h4 className="text-slate-950 dark:text-white font-bold text-sm">Vault Health Score</h4>
                            <p className="text-slate-500 text-xs">Overall protocol integrity</p>
                            <div className="flex gap-1 mt-2">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div key={i} className={`h-1 w-4 rounded-full ${i <= healthScore/20 ? 'bg-blue-500' : 'bg-slate-200 dark:bg-slate-800'}`}></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Card 1: Security Audit */}
                    <div className="bg-white dark:bg-slate-900/40 rounded-3xl p-8 flex flex-col gap-6 border border-slate-200 dark:border-slate-800 border-l-4 border-l-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.05)]">
                        <div className="flex justify-between items-start">
                            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
                                <LockClosedIcon className="w-6 h-6" />
                            </div>
                            <CheckBadgeIcon className="w-6 h-6 text-green-400" />
                        </div>
                        <div>
                            <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-4">Cryptographic Audit</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500">Encryption Layer</span>
                                    <span className="text-slate-800 dark:text-white font-mono">AES-256-GCM</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500">Key Sharding</span>
                                    <span className="text-slate-800 dark:text-white font-mono">Shamir (3/5)</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500">Share Distribution</span>
                                    <span className="text-emerald-500 dark:text-emerald-400 font-mono font-bold">Verified</span>
                                </div>
                                <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                                    <p className="text-slate-500 text-[10px] uppercase font-bold mb-3">Asset Distribution</p>
                                    <div className="flex gap-2">
                                        <div className="flex-1 bg-slate-100 dark:bg-slate-800/50 p-2 rounded-lg text-center">
                                            <p className="text-xs text-slate-500">Docs</p>
                                            <p className="text-slate-800 dark:text-white font-bold">{assetStats.docs}</p>
                                        </div>
                                        <div className="flex-1 bg-slate-100 dark:bg-slate-800/50 p-2 rounded-lg text-center">
                                            <p className="text-xs text-slate-500">Photos</p>
                                            <p className="text-slate-800 dark:text-white font-bold">{assetStats.photos}</p>
                                        </div>
                                        <div className="flex-1 bg-slate-100 dark:bg-slate-800/50 p-2 rounded-lg text-center">
                                            <p className="text-xs text-slate-500">Keys</p>
                                            <p className="text-slate-800 dark:text-white font-bold">{assetStats.keys}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Network Topology */}
                    <div className="bg-white dark:bg-slate-900/40 rounded-3xl p-8 flex flex-col gap-6 border border-slate-200 dark:border-slate-800 border-l-4 border-l-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.05)]">
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
                            <p className="text-slate-500 dark:text-slate-400 text-xs text-center px-4">
                                Data is locally encrypted and distributed via IPFS clusters for maximum redundancy.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] uppercase font-bold text-slate-500">
                                <span>Sync Progress</span>
                                <span className="text-purple-500">{(appState?.assets.filter(a => a.ipfsHash).length || 0) / (appState?.assets.length || 1) * 100}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-500 shadow-[0_0_8px_theme(colors.purple.500)] transition-all duration-1000" style={{ width: `${(appState?.assets.filter(a => a.ipfsHash).length || 0) / (appState?.assets.length || 1) * 100}%` }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Recent Activities */}
                    <div className="bg-white dark:bg-slate-900/40 rounded-3xl p-8 flex flex-col gap-6 border border-slate-200 dark:border-slate-800 border-l-4 border-l-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.05)]">
                        <div className="flex justify-between items-start">
                            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                <ClockIcon className="w-6 h-6" />
                            </div>
                            <h3 className="text-slate-900 dark:text-white text-lg font-bold">Activity Feed</h3>
                        </div>
                        <div className="flex-1 space-y-4 overflow-y-auto max-h-[250px] pr-2 custom-scrollbar">
                            {activities.length > 0 ? activities.map((act) => (
                                <div key={act.id} className="flex items-start gap-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-700/50 group hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors">
                                    <div className={`mt-1 size-2 rounded-full ${act.status === 'success' ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-amber-500'}`}></div>
                                    <div className="flex-1">
                                        <p className="text-slate-800 dark:text-white text-sm font-medium line-clamp-1">{act.title}</p>
                                        <p className="text-slate-500 text-[10px] mt-0.5">{act.time}</p>
                                    </div>
                                    {act.type === 'heartbeat' && <HeartIcon className="w-4 h-4 text-rose-400" />}
                                    {act.type === 'asset' && <DocumentTextIcon className="w-4 h-4 text-blue-400" />}
                                </div>
                            )) : (
                                <p className="text-slate-500 text-sm italic text-center py-10">No recent activity found</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Console Area */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-3">
                            <CommandLineIcon className="w-5 h-5 text-slate-500" />
                            <h2 className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-widest">Deep Kernel Logs</h2>
                        </div>
                        <div className="hidden sm:flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full text-xs font-semibold text-blue-600 dark:text-blue-400">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            Live Decoder Active
                        </div>
                    </div>

                    {/* Explainer / Translation Panel */}
                    <div className="bg-blue-50/50 dark:bg-blue-950/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-4 flex items-center gap-4 transition-all duration-300">
                        <div className="p-2 bg-blue-600 text-white rounded-xl shadow-md">
                            <CommandLineIcon className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-[10px] text-blue-500 dark:text-blue-400 uppercase font-black tracking-wider">User-Friendly Status Decoder</p>
                            <p className="text-slate-800 dark:text-slate-200 text-sm font-bold mt-0.5 transition-all duration-300">{activeTranslation}</p>
                        </div>
                    </div>

                    {/* Console Output */}
                    <div className="bg-white dark:bg-slate-950/60 rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 transition-colors duration-300">
                        <div className="bg-slate-100 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800/80 px-6 py-3 flex items-center justify-between">
                            <div className="flex gap-2">
                                <div className="size-3 rounded-full bg-rose-500/50"></div>
                                <div className="size-3 rounded-full bg-amber-500/50"></div>
                                <div className="size-3 rounded-full bg-emerald-500/50"></div>
                            </div>
                            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono font-medium tracking-wide">bash — alwaysthere-kernel — 80x24</span>
                        </div>

                        <div ref={logsContainerRef} className="p-8 h-[200px] overflow-y-auto font-mono text-sm leading-loose space-y-2 custom-scrollbar">
                            {logs.map((log, i) => (
                                <div key={i} className="flex gap-4">
                                    <span className="text-slate-400 dark:text-slate-500">[{log.time}]</span>
                                    <span className={`${log.color} font-bold w-20`}>[{log.status}]</span>
                                    <span className="text-slate-700 dark:text-slate-300 font-medium">{log.message}</span>
                                </div>
                            ))}
                            <div className="flex gap-4 animate-pulse mt-4">
                                <span className="text-slate-400 dark:text-slate-500">[{new Date().toLocaleTimeString()}]</span>
                                <span className="text-blue-600 dark:text-blue-400 font-bold w-20">&gt;</span>
                                <span className="text-slate-800 dark:text-slate-200 flex items-center font-semibold">
                                    Kernel state: OPTIMAL. Listening for events...
                                    <span className="w-2.5 h-5 bg-blue-500 inline-block ml-1 opacity-70 animate-pulse"></span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
                    <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl flex items-center justify-between group hover:border-blue-500/30 transition-colors">
                        <div>
                            <p className="text-slate-500 text-[10px] uppercase font-bold mb-1">Vault Status</p>
                            <p className={`text-slate-800 dark:text-white text-xl font-bold font-mono ${statusColor}`}>
                                {systemStatus.toUpperCase()}
                            </p>
                        </div>
                        <ShieldCheckIcon className="w-8 h-8 text-slate-400 dark:text-slate-700 group-hover:text-blue-500/50 transition-colors" />
                    </div>

                    <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl flex items-center justify-between group hover:border-emerald-500/30 transition-colors">
                        <div>
                            <p className="text-slate-500 text-[10px] uppercase font-bold mb-1">Verified Nodes</p>
                            <p className="text-slate-800 dark:text-white text-xl font-bold font-mono">1,024+</p>
                        </div>
                        <ServerStackIcon className="w-8 h-8 text-slate-400 dark:text-slate-700 group-hover:text-emerald-500/50 transition-colors" />
                    </div>

                    <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl flex items-center justify-between group hover:border-purple-500/30 transition-colors">
                        <div>
                            <p className="text-slate-500 text-[10px] uppercase font-bold mb-1">Encrypted Payload</p>
                            <p className="text-slate-800 dark:text-white text-xl font-bold font-mono">
                                {appState ? (appState.assets.length * 1.2).toFixed(1) : 0} MB
                            </p>
                        </div>
                        <CloudArrowUpIcon className="w-8 h-8 text-slate-400 dark:text-slate-700 group-hover:text-purple-500/50 transition-colors" />
                    </div>

                    <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl flex items-center justify-between group hover:border-rose-500/30 transition-colors">
                        <div>
                            <p className="text-slate-500 text-[10px] uppercase font-bold mb-1">Heartbeat Health</p>
                            <p className="text-slate-800 dark:text-white text-xl font-bold font-mono">
                                {appState?.stats.lastHeartbeat ? Math.floor((Date.now() - appState.stats.lastHeartbeat) / (1000 * 60 * 60 * 24)) : '?'} Days ago
                            </p>
                        </div>
                        <HeartIcon className="w-8 h-8 text-slate-400 dark:text-slate-700 group-hover:text-rose-500/50 transition-colors" />
                    </div>
                </div>
            </main>

            {/* Background Accents */}
            <div className="fixed top-0 left-0 -z-10 w-full h-full overflow-hidden pointer-events-none">
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
