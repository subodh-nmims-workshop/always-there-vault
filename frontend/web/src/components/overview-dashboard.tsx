'use client'

import { BoltIcon, ChartBarIcon, FingerPrintIcon, ShieldCheckIcon, EnvelopeIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { useApp } from '@/contexts/AppContext'
import WebStorageService from '@/lib/storage'
import { toast } from 'sonner'

interface OverviewDashboardProps {
    onNavigate?: (tab: string) => void
}

export function OverviewDashboard({ onNavigate }: OverviewDashboardProps) {
    const { state, refreshState } = useApp()
    const [emailInput, setEmailInput] = useState('')
    const [showEmailBanner, setShowEmailBanner] = useState(true)
    const [isSavingEmail, setIsSavingEmail] = useState(false)
    const [profileEmail, setProfileEmail] = useState<string>('')
    const [emailVerified, setEmailVerified] = useState<boolean>(false)

    useEffect(() => {
        refreshState()
        
        const fetchProfileInfo = async () => {
            try {
                const token = localStorage.getItem('dwp_token')
                if (!token) return
                const apiEndpoint = process.env.NEXT_PUBLIC_API_URL || 'https://always-there-protocol-api.onrender.com'
                const res = await fetch(`${apiEndpoint}/api/users/profile`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (res.ok) {
                    const data = await res.json()
                    setProfileEmail(data.email || '')
                    setEmailVerified(data.emailVerified || false)
                }
            } catch (err) {
                console.error("Error fetching profile in overview dashboard:", err)
            }
        }
        
        fetchProfileInfo()
    }, [refreshState])

    const beneficiaries = state?.beneficiaries || []
    const heartbeats = state?.heartbeats || []
    const settings = state?.settings

    // Derive heartbeat status logically from AppState
    const lastHeartbeatMs = heartbeats.length > 0 ? Math.max(...heartbeats.map(h => h.timestamp)) : 0
    const intervalMs = (settings?.heartbeatInterval || 30) * 24 * 60 * 60 * 1000

    // Deactivated if never pushed or past interval
    const isActive = lastHeartbeatMs > 0 && (Date.now() - lastHeartbeatMs) <= intervalMs
    const nextDeadlineStr = lastHeartbeatMs > 0 ? new Date(lastHeartbeatMs + intervalMs).toISOString() : ''

    const heartbeat = lastHeartbeatMs > 0 ? {
        lastHeartbeat: new Date(lastHeartbeatMs).toISOString(),
        isActive: isActive,
        nextDeadline: nextDeadlineStr
    } : null

    const isEmailConfigured = !!profileEmail && emailVerified
    const isHeartbeatActive = isActive && isEmailConfigured

    const assets = state?.assets || []
    const loading = false

    const calculateVaultHealth = () => {
        if (loading) return 0
        let health = 100

        // Reduce health if no heartbeat
        if (!isHeartbeatActive) health -= 30

        // Reduce health if no assets
        if (assets.length === 0) health -= 20

        // Reduce health if no beneficiaries
        if (beneficiaries.length === 0) health -= 20

        return Math.max(health, 0)
    }

    const vaultHealth = calculateVaultHealth()
    const totalAssets = assets?.length || 0
    const totalBeneficiaries = beneficiaries?.length || 0
    const hasEmail = !!state?.settings?.emailNotification

    const handleEnableEmail = async () => {
        if (!emailInput || !emailInput.includes('@')) {
            toast.error('Please enter a valid email address')
            return
        }
        setIsSavingEmail(true)
        try {
            const storage = WebStorageService.getInstance()
            await storage.saveSettings({ emailNotification: emailInput })
            await refreshState()
            toast.success(`Security alerts enabled for ${emailInput}`)
            setShowEmailBanner(false)
        } catch (error) {
            toast.error('Failed to save email settings')
        } finally {
            setIsSavingEmail(false)
        }
    }

    return (
        <div className="relative flex h-auto min-h-[calc(100vh-120px)] w-full flex-col overflow-x-hidden text-slate-800 dark:text-slate-100 font-sans p-2">
            <div className="max-w-[1440px] mx-auto w-full">
                {/* Security Alert Setup Banner */}
                {!hasEmail && showEmailBanner && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/40 dark:to-indigo-900/40 border border-blue-200 dark:border-blue-500/30 rounded-3xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                        <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none"></div>
                        <button 
                            onClick={() => setShowEmailBanner(false)}
                            className="absolute top-4 right-4 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                        >
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                        
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-blue-50 dark:bg-blue-500/20 rounded-2xl border border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400 shrink-0">
                                <EnvelopeIcon className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Enable Login & Security Alerts</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
                                    Web3 meets premium security. Link an email to receive instant alerts if a new device accesses your vault, and get a backup record of your public Protocol ID.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row w-full md:w-auto items-stretch sm:items-center gap-2 shrink-0 z-10">
                            <input 
                                type="email" 
                                placeholder="name@example.com" 
                                value={emailInput}
                                onChange={(e) => setEmailInput(e.target.value)}
                                className="bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 dark:text-white outline-none focus:border-blue-500 transition-colors w-full sm:w-64"
                            />
                            <button 
                                onClick={handleEnableEmail}
                                disabled={isSavingEmail}
                                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] disabled:opacity-50 whitespace-nowrap text-center"
                            >
                                {isSavingEmail ? 'Saving...' : 'Enable Alerts'}
                            </button>
                        </div>
                    </div>
                )}

                {/* Hero Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Vault Health */}
                    <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-3xl overflow-hidden shadow-xl shadow-blue-500/20 group">
                        <div className="absolute -right-6 -bottom-6 size-40 bg-white/10 rounded-full blur-2xl group-hover:bg-white/15 transition-all"></div>
                        <div className="absolute top-4 right-4">
                            <div className="relative size-16">
                                <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                                    <circle className="stroke-white/20" cx="18" cy="18" fill="none" r="15" strokeWidth="3"></circle>
                                    <circle className="stroke-white" cx="18" cy="18" fill="none" r="15" strokeDasharray="100" strokeDashoffset={100 - vaultHealth} strokeLinecap="round" strokeWidth="3"></circle>
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-white text-xs font-black">{vaultHealth}%</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-blue-100 text-xs font-bold uppercase tracking-widest mb-2">Vault Health</p>
                        <h3 className="text-4xl font-black text-white tracking-tight">{vaultHealth}%</h3>
                        <p className={`text-xs mt-3 font-bold uppercase tracking-wider flex items-center gap-1.5 ${vaultHealth >= 80 ? 'text-green-300' : vaultHealth >= 50 ? 'text-yellow-300' : 'text-red-300'}`}>
                            <ShieldCheckIcon className="w-4 h-4" />
                            {vaultHealth >= 80 ? 'Optimal Protection' : vaultHealth >= 50 ? 'Needs Attention' : 'Critical – Act Now'}
                        </p>
                    </div>

                    {/* Encrypted Assets */}
                    <div className="bg-white dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm hover:border-blue-500/30 transition-all group">
                        <div className="flex items-center justify-between">
                            <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">Encrypted Assets</p>
                            <div className="size-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                <ShieldCheckIcon className="w-4 h-4 text-blue-500" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">{totalAssets}</h3>
                            <p className="text-slate-500 text-xs mt-1 font-medium">{totalAssets === 0 ? 'No assets yet – add your first' : `${totalAssets} file${totalAssets > 1 ? 's' : ''} secured`}</p>
                        </div>
                        <div className="flex gap-1 h-6 items-end mt-4">
                            {Array.from({length: 8}).map((_, i) => (
                                <div key={i} className={`flex-1 rounded-sm transition-all ${ i < totalAssets ? 'bg-blue-500' : 'bg-slate-100 dark:bg-slate-800'}`} style={{height: `${Math.min(100, 30 + i * 10)}%`}}></div>
                            ))}
                        </div>
                    </div>

                    {/* Beneficiaries */}
                    <div className="bg-white dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm hover:border-purple-500/30 transition-all group">
                        <div className="flex items-center justify-between">
                            <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">Beneficiaries</p>
                            <div className="size-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                <ChartBarIcon className="w-4 h-4 text-purple-500" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">{totalBeneficiaries}</h3>
                            <p className="text-slate-500 text-xs mt-1 font-medium">{totalBeneficiaries === 0 ? 'No nominees added yet' : `${totalBeneficiaries} trusted nominee${totalBeneficiaries > 1 ? 's' : ''}`}</p>
                        </div>
                        <div className="flex -space-x-2 mt-4">
                            {totalBeneficiaries === 0
                                ? <span className="text-xs text-slate-400 dark:text-slate-500">Add nominees to secure your legacy</span>
                                : beneficiaries.slice(0,4).map((b,i) => (
                                    <div key={i} className="size-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 border-2 border-white dark:border-slate-900 flex items-center justify-center text-white text-[10px] font-black">
                                        {b.name?.[0]?.toUpperCase()}
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>

                {/* Protocol Overview & Features */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-blue-250 dark:border-blue-500/20 backdrop-blur-sm relative overflow-hidden shadow-sm">
                        <div className="absolute right-0 top-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full"></div>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                            <ShieldCheckIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" /> Protocol Security Posture
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                            AlwaysThere uses military-grade AES-256-GCM encryption on your local device before any data is sent. Only you and your designated beneficiaries hold the decryption keys.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                            <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mb-1">Encryption</p>
                                <p className="text-xs sm:text-sm text-green-400 font-bold">AES-256-GCM Active</p>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mb-1">Architecture</p>
                                <p className="text-xs sm:text-sm text-blue-400 font-bold">Zero-Knowledge</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900/40 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm">
                        <div>
                            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">Recommended Actions</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mb-4">Complete these steps to fully secure your digital inheritance.</p>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className={`size-6 rounded-full flex items-center justify-center shrink-0 ${totalAssets > 0 ? 'bg-green-500/20 text-green-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'}`}>
                                    {totalAssets > 0 ? '✓' : '1'}
                                </div>
                                <span className={`text-xs sm:text-sm ${totalAssets > 0 ? 'text-slate-600 dark:text-slate-300' : 'text-slate-900 dark:text-white font-medium'}`}>Encrypt your first asset or secret</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className={`size-6 rounded-full flex items-center justify-center shrink-0 ${totalBeneficiaries > 0 ? 'bg-green-500/20 text-green-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'}`}>
                                    {totalBeneficiaries > 0 ? '✓' : '2'}
                                </div>
                                <span className={`text-xs sm:text-sm ${totalBeneficiaries > 0 ? 'text-slate-600 dark:text-slate-300' : 'text-slate-900 dark:text-white font-medium'}`}>Add a trusted beneficiary</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className={`size-6 rounded-full flex items-center justify-center shrink-0 ${isHeartbeatActive ? 'bg-green-500/20 text-green-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'}`}>
                                    {isHeartbeatActive ? '✓' : '3'}
                                </div>
                                <span className={`text-xs sm:text-sm ${isHeartbeatActive ? 'text-slate-600 dark:text-slate-300' : 'text-slate-900 dark:text-white font-medium'}`}>Initialize the Dead Man's Switch</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Column */}
                    <div className="lg:w-2/3 flex flex-col gap-6">
                        {/* Chart Section */}
                        <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 relative overflow-hidden shadow-sm">
                            {/* CSS for ECG wave animation */}
                            <style>{`
                                @keyframes ecgPulse {
                                    to {
                                        stroke-dashoffset: -600;
                                    }
                                }
                                .animate-ecg-pulse {
                                    animation: ecgPulse 4s linear infinite;
                                }
                            `}</style>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                <div>
                                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Security & Pulse Center</h2>
                                    <p className="text-slate-650 dark:text-slate-400 text-xs sm:text-sm mt-1">Proof of life active monitoring and on-chain verification record</p>
                                </div>
                                <div className="text-left sm:text-right shrink-0">
                                    <span className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{heartbeats.length}</span>
                                    <p className="text-slate-650 dark:text-slate-400 text-[10px] sm:text-xs font-semibold uppercase tracking-wider mt-0.5 sm:mt-1">Total Pings</p>
                                </div>
                            </div>

                            {loading ? (
                                <div className="flex items-center justify-center h-[280px]">
                                    <div className="text-slate-400 dark:text-slate-500">Loading data...</div>
                                </div>
                            ) : heartbeats.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-[280px] text-center px-4">
                                    <BoltIcon className="w-16 h-16 text-slate-300 dark:text-slate-700 mb-4" />
                                    <p className="text-slate-400 dark:text-slate-500 font-medium">No structural pings recorded yet.</p>
                                    <p className="text-slate-500 dark:text-slate-600 text-sm mt-1">Sign your first heartbeat on the network to initialize your protocol timeline.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[280px]">
                                    {/* Left Side: Live ECG Animation */}
                                    <div className="flex flex-col justify-between bg-slate-50 dark:bg-slate-950/30 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-4 sm:p-6 relative overflow-hidden">
                                        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-[9px] font-bold text-green-500 uppercase tracking-wider">
                                            <span className="relative flex h-1.5 w-1.5">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                                            </span>
                                            LIVE MONITORING
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-450 dark:text-slate-500 font-bold uppercase tracking-wider">Cryptographic Heartbeat</p>
                                            <h3 className="text-lg font-black text-slate-900 dark:text-white mt-1">Proof of Life Pulse</h3>
                                        </div>

                                        {/* ECG SVG */}
                                        <div className="w-full h-24 my-4 relative bg-slate-100/50 dark:bg-slate-900/20 rounded-xl border border-slate-150 dark:border-slate-800/40 p-2 flex items-center">
                                            <svg className="w-full h-full overflow-hidden" viewBox="0 0 300 100" preserveAspectRatio="none">
                                                {/* Grid background */}
                                                <defs>
                                                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                                                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(147, 197, 253, 0.05)" strokeWidth="1" />
                                                    </pattern>
                                                </defs>
                                                <rect width="100%" height="100%" fill="url(#grid)" />
                                                {/* Glowing ECG Path */}
                                                <path
                                                    d="M 0 50 L 60 50 L 70 40 L 75 65 L 85 10 L 95 85 L 102 45 L 110 50 L 190 50 L 200 40 L 205 65 L 215 10 L 225 85 L 232 45 L 240 50 L 300 50"
                                                    fill="none"
                                                    stroke="#2563eb"
                                                    strokeWidth="3"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="animate-ecg-pulse"
                                                    style={{
                                                        strokeDasharray: 600,
                                                        strokeDashoffset: 600,
                                                    }}
                                                />
                                            </svg>
                                        </div>

                                        <div className="grid grid-cols-3 gap-2 border-t border-slate-200 dark:border-slate-800/80 pt-4 text-center">
                                            <div>
                                                <p className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase">Rate Limit</p>
                                                <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">30 Days</p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase">On-Chain</p>
                                                <p className="text-xs font-bold text-green-500 mt-0.5">Active</p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase">Protocol</p>
                                                <p className="text-xs font-bold text-blue-500 mt-0.5">Smart Will</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Side: Uptime Grid Matrix */}
                                    <div className="flex flex-col justify-between bg-slate-50 dark:bg-slate-950/30 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-4 sm:p-6">
                                        <div>
                                            <p className="text-xs text-slate-450 dark:text-slate-500 font-bold uppercase tracking-wider">Verification History</p>
                                            <h3 className="text-lg font-black text-slate-900 dark:text-white mt-1">Audit Matrix</h3>
                                        </div>

                                        {/* Grid of Blocks */}
                                        <div className="grid grid-cols-8 gap-2 my-4">
                                            {Array.from({ length: 24 }).map((_, index) => {
                                                const totalPings = heartbeats.length;
                                                const isVerified = index < totalPings;
                                                const isActive = index === totalPings;
                                                return (
                                                    <div
                                                        key={index}
                                                        className={`aspect-square rounded-lg flex items-center justify-center border transition-all text-[9px] font-bold ${
                                                            isVerified
                                                                ? "bg-green-500/10 dark:bg-green-500/20 border-green-500/30 dark:border-green-500/40 text-green-600 dark:text-green-400 shadow-[0_0_10px_rgba(34,197,94,0.1)]"
                                                                : isActive
                                                                ? "bg-blue-600 border-blue-500 text-white animate-pulse shadow-[0_0_12px_rgba(59,130,246,0.4)]"
                                                                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-700"
                                                        }`}
                                                        title={
                                                            isVerified
                                                                ? `Heartbeat Checkpoint ${index + 1}: VERIFIED`
                                                                : isActive
                                                                ? `Heartbeat Checkpoint ${index + 1}: CURRENT WINDOW`
                                                                : `Heartbeat Checkpoint ${index + 1}: SCHEDULED`
                                                        }
                                                    >
                                                        {index + 1}
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 font-medium border-t border-slate-200 dark:border-slate-800/80 pt-4">
                                            <div className="flex items-center gap-1.5">
                                                <span className="w-2.5 h-2.5 rounded bg-green-500/25 border border-green-500/40"></span> Verified
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <span className="w-2.5 h-2.5 rounded bg-blue-600 animate-pulse"></span> Active
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <span className="w-2.5 h-2.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"></span> Scheduled
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Recent Activity Section */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between px-2">
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent Activity</h2>
                            </div>
                            <div className="grid gap-3">
                                {loading ? (
                                    <div className="bg-white dark:bg-slate-900/40 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 text-center text-slate-400 dark:text-slate-500 shadow-sm">
                                        Loading activity...
                                    </div>
                                ) : assets.length === 0 && !heartbeat ? (
                                    <div className="bg-white dark:bg-slate-900/40 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 text-center shadow-sm">
                                        <p className="text-slate-600 dark:text-slate-400">No activity yet. Start by creating assets or signing a heartbeat.</p>
                                    </div>
                                ) : (
                                    <>
                                        {heartbeat && (
                                            <div className="bg-white dark:bg-slate-900/40 p-4 rounded-2xl flex items-center justify-between border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm">
                                                <div className="flex items-center gap-4">
                                                    <div className={`size-12 rounded-xl flex items-center justify-center border ${
                                                        isHeartbeatActive 
                                                            ? 'bg-green-500/10 text-green-500 border-green-500/20' 
                                                            : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                                    }`}>
                                                        <BoltIcon className={`h-6 w-6 ${!isHeartbeatActive ? 'animate-pulse' : ''}`} />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-900 dark:text-white font-outfit">
                                                            {isHeartbeatActive ? 'Heartbeat Active' : !isEmailConfigured ? 'Setup Incomplete' : 'Heartbeat Inactive'}
                                                        </p>
                                                        <p className="text-xs text-slate-650 dark:text-slate-450 mt-0.5 font-outfit">
                                                            {isHeartbeatActive 
                                                                ? `Last verified: ${new Date(heartbeat.lastHeartbeat).toLocaleDateString()}` 
                                                                : !isEmailConfigured 
                                                                ? 'Alert email configuration missing or unverified' 
                                                                : 'Protocol initialized but inactive'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className={`text-xs font-bold uppercase font-outfit ${
                                                        isHeartbeatActive 
                                                            ? 'text-green-500' 
                                                            : 'text-amber-500'
                                                    }`}>
                                                        {isHeartbeatActive ? 'Active' : !isEmailConfigured ? 'Email Missing' : 'Inactive'}
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {assets.slice(0, 2).map((asset: any, index: number) => (
                                            <div key={asset.id || asset._id || index} className="bg-white dark:bg-slate-900/40 p-4 rounded-2xl flex items-center justify-between border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm">
                                                <div className="flex items-center gap-4">
                                                    <div className="size-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                                                        <ShieldCheckIcon className="h-6 w-6" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-900 dark:text-white">Asset Encrypted</p>
                                                        <p className="text-xs text-slate-650 dark:text-slate-400 mt-0.5">{asset.name}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase">
                                                        {new Date(asset.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>
                        {/* Quick Documentation Section */}
                        <div className="flex flex-col gap-4 mt-4">
                            <div className="flex items-center justify-between px-2">
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Quick Documentation</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/30 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer group shadow-sm">
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-2 transition-colors">How Encryption Works</h4>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                        Your files are encrypted locally using AES-256-GCM. The key is sharded across the network using Shamir's Secret Sharing. We never see your data.
                                    </p>
                                </div>
                                <div className="bg-white dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-purple-500/30 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer group shadow-sm">
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 mb-2 transition-colors">Dead Man's Switch Trigger</h4>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                        You must sign a heartbeat transaction periodically. If you miss the deadline, the protocol assumes you are offline and releases the key shards to your beneficiaries.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:w-1/3 flex flex-col gap-6">
                        {/* Dead Man's Switch Card */}
                        <div className="relative group rounded-3xl overflow-hidden">
                            <div className={`absolute inset-0 opacity-10 blur-2xl ${isHeartbeatActive ? 'bg-green-500' : !isEmailConfigured ? 'bg-amber-500' : 'bg-red-500'}`}></div>
                            <div className="relative bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-8 border dark:border-slate-800 h-full shadow-lg
                                border-slate-200">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white font-outfit">Dead Man's Switch</h2>
                                    <span className={`${
                                        isHeartbeatActive
                                            ? 'bg-green-50/50 dark:bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-500/20 shadow-sm'
                                            : !isEmailConfigured
                                            ? 'bg-amber-50/50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/20 shadow-sm'
                                            : 'bg-red-50/50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/20'
                                    } border px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center font-outfit`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${
                                            isHeartbeatActive
                                                ? 'bg-green-500 animate-pulse'
                                                : !isEmailConfigured
                                                ? 'bg-amber-500 animate-pulse'
                                                : 'bg-red-500'
                                        } mr-2`}></span>
                                        {isHeartbeatActive ? 'Active' : !isEmailConfigured ? 'Email Missing' : 'Inactive'}
                                    </span>
                                </div>

                                <div className="flex flex-col items-center py-6">
                                    {isHeartbeatActive && heartbeat?.nextDeadline ? (
                                        <>
                                            <div className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 tracking-tighter mb-2 font-outfit">
                                                {(() => {
                                                    const now = new Date().getTime()
                                                    const deadline = new Date(heartbeat.nextDeadline).getTime()
                                                    const diff = deadline - now
                                                    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
                                                    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                                                    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
                                                    return `${days}d ${hours}h ${minutes}m`
                                                })()}
                                            </div>
                                            <p className="text-slate-655 dark:text-slate-400 text-xs sm:text-sm font-medium font-outfit">Until next required heartbeat</p>
                                        </>
                                    ) : !isEmailConfigured ? (
                                        <>
                                            <div className="text-2xl sm:text-3xl font-bold text-amber-500 dark:text-amber-400 tracking-tighter mb-2 font-outfit font-bold">Setup Required</div>
                                            <p className="text-slate-655 dark:text-slate-400 text-xs sm:text-sm font-medium font-outfit">Configure Email in Settings</p>
                                        </>
                                    ) : (
                                        <>
                                            <div className="text-2xl sm:text-3xl font-bold text-slate-400 dark:text-slate-500 tracking-tighter mb-2 font-outfit">No Heartbeat</div>
                                            <p className="text-slate-655 dark:text-slate-400 text-xs sm:text-sm font-medium font-outfit">Sign your first heartbeat</p>
                                        </>
                                    )}
                                </div>

                                <div className="mt-6 space-y-3">
                                    <button
                                        onClick={() => onNavigate?.('heartbeat')}
                                        className={`w-full py-3.5 font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-white shadow-lg ${
                                            isHeartbeatActive
                                                ? 'bg-green-600 hover:bg-green-500 shadow-green-500/20'
                                                : 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/30 shadow-[0_0_20px]'
                                        }`}
                                    >
                                        <FingerPrintIcon className="w-5 h-5" />
                                        {isHeartbeatActive ? 'Renew Heartbeat' : 'Sign Heartbeat Now'}
                                    </button>
                                    <button
                                        onClick={() => onNavigate?.(isEmailConfigured ? 'heartbeat' : 'settings')}
                                        className="w-full py-3 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-300 font-bold rounded-xl border border-slate-200 dark:border-slate-700/50 transition-colors text-sm"
                                    >
                                        {isEmailConfigured ? 'Edit Trigger Settings' : '⚙️ Configure Email First'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Beneficiaries Card */}
                        <div className="bg-white dark:bg-slate-900/40 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Beneficiaries</h2>
                                <span className="bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-bold border border-blue-200 dark:border-blue-500/20">
                                    {totalBeneficiaries} Total
                                </span>
                            </div>

                            <div className="space-y-3 mb-8">
                                {loading ? (
                                    <div className="text-center text-slate-400 dark:text-slate-500 py-4">Loading...</div>
                                ) : beneficiaries.length === 0 ? (
                                    <div className="text-center text-slate-400 dark:text-slate-500 py-8">
                                        <p className="mb-2">No beneficiaries added yet</p>
                                        <p className="text-xs">Add beneficiaries to distribute your assets</p>
                                    </div>
                                ) : (
                                    beneficiaries.slice(0, 2).map((beneficiary, index) => {
                                        const colors = [
                                            'from-blue-500 to-purple-500',
                                            'from-emerald-500 to-teal-500',
                                            'from-orange-500 to-red-500',
                                            'from-pink-500 to-rose-500'
                                        ]
                                        const textColors = [
                                            'text-blue-400',
                                            'text-emerald-400',
                                            'text-orange-400',
                                            'text-pink-400'
                                        ]
                                        const initials = beneficiary.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

                                        return (
                                            <div key={beneficiary.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shadow-sm">
                                                <div className="flex items-center gap-3">
                                                    <div className={`size-10 rounded-full bg-gradient-to-tr ${colors[index % colors.length]} flex items-center justify-center text-white font-bold text-sm shadow-inner`}>
                                                        {initials}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-900 dark:text-white text-sm">{beneficiary.name}</p>
                                                        <p className={`text-xs ${textColors[index % textColors.length]} font-medium`}>
                                                            100% Share
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                )}
                            </div>

                            <button
                                onClick={() => onNavigate?.('beneficiaries')}
                                className="w-full py-3 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-white font-bold rounded-xl transition-colors text-sm border border-slate-200 dark:border-slate-700 shadow-sm"
                            >
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
