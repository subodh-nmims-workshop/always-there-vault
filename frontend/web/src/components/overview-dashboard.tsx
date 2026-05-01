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

    useEffect(() => {
        refreshState()
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

    const assets = state?.assets || []
    const loading = false

    const calculateVaultHealth = () => {
        if (loading) return 0
        let health = 100

        // Reduce health if no heartbeat
        if (!heartbeat?.isActive) health -= 30

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
        <div className="relative flex h-auto min-h-[calc(100vh-120px)] w-full flex-col overflow-x-hidden text-slate-100 font-sans p-2">
            <div className="max-w-[1440px] mx-auto w-full">
                {/* Security Alert Setup Banner */}
                {!hasEmail && showEmailBanner && (
                    <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/30 rounded-3xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                        <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none"></div>
                        <button 
                            onClick={() => setShowEmailBanner(false)}
                            className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
                        >
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                        
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-blue-500/20 rounded-2xl border border-blue-500/30 text-blue-400 shrink-0">
                                <EnvelopeIcon className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white tracking-tight">Enable Login & Security Alerts</h3>
                                <p className="text-sm text-slate-400 mt-1 max-w-xl">
                                    Web3 meets premium security. Link an email to receive instant alerts if a new device accesses your vault, and get a backup record of your public Protocol ID.
                                </p>
                            </div>
                        </div>

                        <div className="flex w-full md:w-auto items-center gap-2 shrink-0 z-10">
                            <input 
                                type="email" 
                                placeholder="name@example.com" 
                                value={emailInput}
                                onChange={(e) => setEmailInput(e.target.value)}
                                className="bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-sm font-medium text-white outline-none focus:border-blue-500 transition-colors w-full md:w-64"
                            />
                            <button 
                                onClick={handleEnableEmail}
                                disabled={isSavingEmail}
                                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] disabled:opacity-50 whitespace-nowrap"
                            >
                                {isSavingEmail ? 'Saving...' : 'Enable Alerts'}
                            </button>
                        </div>
                    </div>
                )}

                {/* Hero Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-slate-900/40 p-6 rounded-3xl border border-slate-800 flex items-center justify-between overflow-hidden relative group">
                        <div className="absolute -right-4 -bottom-4 size-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"></div>
                        <div>
                            <p className="text-slate-400 text-sm font-medium mb-1">Vault Health</p>
                            <h3 className="text-4xl font-bold tracking-tighter text-white">{vaultHealth}%</h3>
                            <p className={`text-xs mt-2 flex items-center gap-1 font-semibold uppercase ${vaultHealth >= 80 ? 'text-green-400' : vaultHealth >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                                <ShieldCheckIcon className="w-4 h-4" /> {vaultHealth >= 80 ? 'Optimal' : vaultHealth >= 50 ? 'Warning' : 'Critical'}
                            </p>
                        </div>
                        <div className="relative size-20">
                            <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                                <circle className="stroke-slate-800" cx="18" cy="18" fill="none" r="16" strokeWidth="3"></circle>
                                <circle className="stroke-blue-500" cx="18" cy="18" fill="none" r="16" strokeDasharray="100" strokeDashoffset={100 - vaultHealth} strokeLinecap="round" strokeWidth="3"></circle>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center glow-primary">
                                <ShieldCheckIcon className="text-blue-500 w-8 h-8" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900/40 p-6 rounded-3xl border border-slate-800 flex flex-col justify-between">
                        <p className="text-slate-400 text-sm font-medium">Encrypted Assets</p>
                        <div className="flex items-end justify-between mt-4">
                            <h3 className="text-3xl font-bold text-white">{totalAssets}</h3>
                            <div className="flex gap-1 h-8 items-end">
                                {[...Array(Math.min(totalAssets, 5))].map((_, i) => (
                                    <div key={i} className={`w-1.5 bg-blue-500 rounded-full ${i === Math.min(totalAssets, 5) - 1 ? 'h-8 shadow-[0_0_10px_theme(colors.blue.500)]' : `h-${4 + i}`}`}></div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900/40 p-6 rounded-3xl border border-slate-800 flex flex-col justify-between">
                        <p className="text-slate-400 text-sm font-medium">Beneficiaries</p>
                        <div className="flex items-end justify-between mt-4">
                            <h3 className="text-3xl font-bold text-white tracking-tighter">{totalBeneficiaries}</h3>
                            <p className="text-slate-400 text-sm font-medium">Active</p>
                        </div>
                    </div>
                </div>

                {/* Protocol Overview & Features */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-6 rounded-3xl border border-blue-500/20 backdrop-blur-sm relative overflow-hidden">
                        <div className="absolute right-0 top-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full"></div>
                        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                            <ShieldCheckIcon className="w-6 h-6 text-blue-400" /> Protocol Security Posture
                        </h3>
                        <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                            AlwaysThere uses military-grade AES-256-GCM encryption on your local device before any data is sent. Only you and your designated beneficiaries hold the decryption keys.
                        </p>
                        <div className="grid grid-cols-2 gap-3 mt-4">
                            <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-700">
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Encryption</p>
                                <p className="text-sm text-green-400 font-bold">AES-256-GCM Active</p>
                            </div>
                            <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-700">
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Architecture</p>
                                <p className="text-sm text-blue-400 font-bold">Zero-Knowledge</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900/40 p-6 rounded-3xl border border-slate-800 flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">Recommended Actions</h3>
                            <p className="text-slate-400 text-sm mb-4">Complete these steps to fully secure your digital inheritance.</p>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className={`size-6 rounded-full flex items-center justify-center ${totalAssets > 0 ? 'bg-green-500/20 text-green-500' : 'bg-slate-800 text-slate-500'}`}>
                                    {totalAssets > 0 ? '✓' : '1'}
                                </div>
                                <span className={`text-sm ${totalAssets > 0 ? 'text-slate-300' : 'text-white font-medium'}`}>Encrypt your first asset or secret</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className={`size-6 rounded-full flex items-center justify-center ${totalBeneficiaries > 0 ? 'bg-green-500/20 text-green-500' : 'bg-slate-800 text-slate-500'}`}>
                                    {totalBeneficiaries > 0 ? '✓' : '2'}
                                </div>
                                <span className={`text-sm ${totalBeneficiaries > 0 ? 'text-slate-300' : 'text-white font-medium'}`}>Add a trusted beneficiary</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className={`size-6 rounded-full flex items-center justify-center ${heartbeat?.isActive ? 'bg-green-500/20 text-green-500' : 'bg-slate-800 text-slate-500'}`}>
                                    {heartbeat?.isActive ? '✓' : '3'}
                                </div>
                                <span className={`text-sm ${heartbeat?.isActive ? 'text-slate-300' : 'text-white font-medium'}`}>Initialize the Dead Man's Switch</span>
                            </div>
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
                                    <h2 className="text-xl font-bold text-white">Protocol Pulse Timeline</h2>
                                    <p className="text-slate-400 text-sm mt-1">Proof of life cryptographic verifications over time</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-3xl font-bold text-white tracking-tight">{heartbeats.length}</span>
                                    <p className="text-slate-400 text-sm font-medium mt-1">Total Pings Issued</p>
                                </div>
                            </div>

                            <div className="h-[280px] w-full relative">
                                {loading ? (
                                    <div className="flex items-center justify-center h-full">
                                        <div className="text-slate-500">Loading data...</div>
                                    </div>
                                ) : heartbeats.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-center px-4">
                                        <BoltIcon className="w-16 h-16 text-slate-700 mb-4" />
                                        <p className="text-slate-500 font-medium">No structural pings recorded yet.</p>
                                        <p className="text-slate-600 text-sm mt-1">Sign your first heartbeat on the network to initialize your protocol timeline.</p>
                                    </div>
                                ) : (
                                    <svg className="w-full h-full overflow-visible" viewBox="0 0 800 280">
                                        <defs>
                                            <linearGradient id="gradient" x1="0%" x2="0%" y1="0%" y2="100%">
                                                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3"></stop>
                                                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0"></stop>
                                            </linearGradient>
                                            <linearGradient id="lineGradient" x1="0%" x2="100%" y1="0%" y2="0%">
                                                <stop offset="0%" stopColor="#3b82f6"></stop>
                                                <stop offset="100%" stopColor="#8b5cf6"></stop>
                                            </linearGradient>
                                        </defs>
                                        {(() => {
                                            // Generate path based on actual heartbeat accumulation dates
                                            const sortedHeartbeats = [...heartbeats].sort((a, b) => a.timestamp - b.timestamp)

                                            const points = sortedHeartbeats.map((ping, index) => ({
                                                x: (index / Math.max(sortedHeartbeats.length - 1, 1)) * 800,
                                                y: 240 - (index * (180 / Math.max(sortedHeartbeats.length - 1, 1)))
                                            }))

                                            if (points.length === 1) {
                                                points.unshift({ x: 0, y: 260 })
                                            }

                                            const pathD = points.map((p, i) =>
                                                i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`
                                            ).join(' ')

                                            const areaD = `${pathD} L800,280 L0,280 Z`

                                            return (
                                                <>
                                                    <path d={pathD} fill="none" stroke="url(#lineGradient)" strokeLinecap="round" strokeWidth="4"></path>
                                                    <path d={areaD} fill="url(#gradient)"></path>
                                                    {points.map((point, i) => (
                                                        <circle
                                                            key={i}
                                                            className="shadow-[0_0_15px_theme(colors.purple.500)]"
                                                            cx={point.x}
                                                            cy={point.y}
                                                            fill={i === points.length - 1 ? "#ec4899" : "#8b5cf6"}
                                                            r="6"
                                                            stroke="#fff"
                                                            strokeWidth="2"
                                                        />
                                                    ))}
                                                </>
                                            )
                                        })()}
                                    </svg>
                                )}
                                <div className="flex justify-between mt-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                                    <span>Genesis</span><span>Pulse Evolution</span><span>Active Target</span>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity Section */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between px-2">
                                <h2 className="text-lg font-bold text-white">Recent Activity</h2>
                            </div>
                            <div className="grid gap-3">
                                {loading ? (
                                    <div className="bg-slate-900/40 p-8 rounded-2xl border border-slate-800 text-center text-slate-500">
                                        Loading activity...
                                    </div>
                                ) : assets.length === 0 && !heartbeat ? (
                                    <div className="bg-slate-900/40 p-8 rounded-2xl border border-slate-800 text-center">
                                        <p className="text-slate-500">No activity yet. Start by creating assets or signing a heartbeat.</p>
                                    </div>
                                ) : (
                                    <>
                                        {heartbeat?.isActive && (
                                            <div className="bg-slate-900/40 p-4 rounded-2xl flex items-center justify-between border border-slate-800 hover:border-slate-700 transition-all">
                                                <div className="flex items-center gap-4">
                                                    <div className="size-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 border border-green-500/20">
                                                        <BoltIcon className="h-6 w-6" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-white">Heartbeat Active</p>
                                                        <p className="text-xs text-slate-400 mt-0.5">Last verified: {new Date(heartbeat.lastHeartbeat).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xs font-medium text-green-500 uppercase">Active</p>
                                                </div>
                                            </div>
                                        )}

                                        {assets.slice(0, 2).map((asset: any, index: number) => (
                                            <div key={asset.id || asset._id || index} className="bg-slate-900/40 p-4 rounded-2xl flex items-center justify-between border border-slate-800 hover:border-slate-700 transition-all">
                                                <div className="flex items-center gap-4">
                                                    <div className="size-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                                                        <ShieldCheckIcon className="h-6 w-6" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-white">Asset Encrypted</p>
                                                        <p className="text-xs text-slate-400 mt-0.5">{asset.name}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xs font-medium text-slate-500 uppercase">
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
                                <h2 className="text-lg font-bold text-white">Quick Documentation</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800 hover:border-blue-500/30 hover:bg-slate-800/50 transition-all cursor-pointer group">
                                    <h4 className="text-sm font-bold text-white group-hover:text-blue-400 mb-2 transition-colors">How Encryption Works</h4>
                                    <p className="text-xs text-slate-400 leading-relaxed">
                                        Your files are encrypted locally using AES-256-GCM. The key is sharded across the network using Shamir's Secret Sharing. We never see your data.
                                    </p>
                                </div>
                                <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800 hover:border-purple-500/30 hover:bg-slate-800/50 transition-all cursor-pointer group">
                                    <h4 className="text-sm font-bold text-white group-hover:text-purple-400 mb-2 transition-colors">Dead Man's Switch Trigger</h4>
                                    <p className="text-xs text-slate-400 leading-relaxed">
                                        You must sign a heartbeat transaction periodically. If you miss the deadline, the protocol assumes you are offline and releases the key shards to your beneficiaries.
                                    </p>
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
                                    <span className={`${heartbeat?.isActive ? 'bg-green-500/10 text-green-400 border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.2)]' : 'bg-red-500/10 text-red-400 border-red-500/20'} border px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${heartbeat?.isActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'} mr-2`}></span>
                                        {heartbeat?.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </div>

                                <div className="flex flex-col items-center py-6">
                                    {heartbeat?.nextDeadline ? (
                                        <>
                                            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 tracking-tighter mb-2">
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
                                            <p className="text-slate-400 text-sm font-medium">Until next required heartbeat</p>
                                        </>
                                    ) : (
                                        <>
                                            <div className="text-3xl font-bold text-slate-500 tracking-tighter mb-2">No Heartbeat</div>
                                            <p className="text-slate-400 text-sm font-medium">Sign your first heartbeat</p>
                                        </>
                                    )}
                                </div>

                                <div className="mt-8 space-y-3">
                                    <button
                                        onClick={() => onNavigate?.('heartbeat')}
                                        className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] flex items-center justify-center gap-2"
                                    >
                                        <FingerPrintIcon className="w-5 h-5" />
                                        Sign Heartbeat Now
                                    </button>
                                    <button
                                        onClick={() => onNavigate?.('heartbeat')}
                                        className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl border border-slate-700 transition-colors text-sm"
                                    >
                                        Edit Trigger Settings
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Beneficiaries Card */}
                        <div className="bg-slate-900/40 rounded-3xl p-8 border border-slate-800">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold text-white">Beneficiaries</h2>
                                <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-xs font-bold border border-blue-500/20">
                                    {totalBeneficiaries} Total
                                </span>
                            </div>

                            <div className="space-y-3 mb-8">
                                {loading ? (
                                    <div className="text-center text-slate-500 py-4">Loading...</div>
                                ) : beneficiaries.length === 0 ? (
                                    <div className="text-center text-slate-500 py-8">
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
                                            <div key={beneficiary.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-700/50 bg-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer">
                                                <div className="flex items-center gap-3">
                                                    <div className={`size-10 rounded-full bg-gradient-to-tr ${colors[index % colors.length]} flex items-center justify-center text-white font-bold text-sm shadow-inner`}>
                                                        {initials}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-white text-sm">{beneficiary.name}</p>
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
                                className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors text-sm border border-slate-700"
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
