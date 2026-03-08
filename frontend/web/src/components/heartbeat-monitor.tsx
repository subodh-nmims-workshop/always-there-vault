'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Clock, Activity, AlertTriangle, Fingerprint, Settings, RefreshCw, X, ShieldAlert, CheckCircle2 } from 'lucide-react'
import { recordHeartbeat, getHeartbeatStatus, HeartbeatPayload, getHeartbeatSettings, updateHeartbeatSettings } from '@/app/actions/heartbeat'
import { submitHeartbeat, configureHeartbeat as configureBlockchainHeartbeat } from '@/lib/blockchain'
import { useApp } from '@/contexts/AppContext'

export function HeartbeatMonitor() {
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [lastHeartbeat, setLastHeartbeat] = useState<Date | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [heartbeats, setHeartbeats] = useState<any[]>([])
  const [statusInfo, setStatusInfo] = useState<{ status: string; daysUntilDue: number; isOverdue: boolean } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { refreshState } = useApp()

  const [settings, setSettings] = useState({
    heartbeatInterval: 30,
    gracePeriod: 14
  })
  const [showSettings, setShowSettings] = useState(false)
  const [isSavingSettings, setIsSavingSettings] = useState(false)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)

  useEffect(() => {
    const address = localStorage.getItem('dwp_wallet_address')
    if (address) {
      setWalletAddress(address)
    } else {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (walletAddress) fetchLiveStatus()
  }, [walletAddress])

  const fetchLiveStatus = async () => {
    setIsLoading(true)
    try {
      const setRes = await getHeartbeatSettings(walletAddress)
      if (setRes.success) setSettings({ heartbeatInterval: setRes.interval, gracePeriod: setRes.gracePeriod })

      const statRes = await getHeartbeatStatus(walletAddress)
      if (statRes.success && statRes.status !== 'Not Found' && statRes.status !== 'inactive') {
        setStatusInfo({ status: statRes.status || 'unknown', daysUntilDue: statRes.daysUntilDue || 0, isOverdue: statRes.isOverdue || false })
        if (statRes.lastHeartbeat) setLastHeartbeat(new Date(statRes.lastHeartbeat))
        if (statRes.interval && statRes.gracePeriod) setSettings({ heartbeatInterval: statRes.interval, gracePeriod: statRes.gracePeriod })
      } else if (statRes.status === 'inactive' || statRes.status === 'Not Found') {
        setStatusInfo({ status: 'active', daysUntilDue: settings.heartbeatInterval, isOverdue: false })
      }
    } catch (error) {
      console.error('Failed to sync heartbeat data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleHeartbeat = async () => {
    if (!walletAddress) return
    setIsRecording(true)

    try {
      // DECENTRALIZED SMART CONTRACT EXECUTION
      const chainResponse = await submitHeartbeat()

      if (!chainResponse.success) {
        throw new Error(chainResponse.error || 'Smart Contract execution reverted')
      }

      const payload: HeartbeatPayload = {
        walletAddress,
        method: 'wallet_signature',
        signature: chainResponse.txHash || '0x' + Array.from({ length: 128 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
        ipAddress: '127.0.0.1'
      }
      const response = await recordHeartbeat(payload)

      if (response.success) {
        await fetchLiveStatus()
        await refreshState()
        setShowSuccessPopup(true)
        setTimeout(() => setShowSuccessPopup(false), 3000)
      } else throw new Error('Local Context Rejected Pulse')

    } catch (error: any) {
      console.error('Failed to record heartbeat:', error)
      alert(`Failed to transmit cryptographic proof-of-life.\n\nError: ${error.message}`)
    } finally {
      setIsRecording(false)
    }
  }

  const handleSettingsUpdate = async () => {
    setIsSavingSettings(true)

    try {
      // Try to sync with blockchain, but don't block local save if it fails
      let chainError: string | null = null
      try {
        const chainResponse = await configureBlockchainHeartbeat(settings.heartbeatInterval, settings.gracePeriod)
        if (!chainResponse.success) {
          chainError = chainResponse.error || 'Smart Contract setting update reverted'
        }
      } catch (err: any) {
        chainError = err?.message || 'Unable to reach blockchain provider'
      }

      // Always persist settings locally so the app behaves correctly
      const res = await updateHeartbeatSettings(walletAddress || 'local', settings.heartbeatInterval, settings.gracePeriod)
      if (!res.success) {
        throw new Error('Failed to update local protocol settings.')
      }

      await fetchLiveStatus()
      await refreshState()
      setShowSettings(false)

      if (chainError) {
        // Inform user that on-chain sync failed but local config is saved
        alert(`Config saved locally.\n\nOn-chain sync failed: ${chainError}`)
      }
    } catch (error: any) {
      console.error(error)
      alert(`Configuration update failed:\n${error.message}`)
    } finally {
      setIsSavingSettings(false)
    }
  }

  const getHeartbeatDisplayState = () => {
    if (!statusInfo) return { status: 'unknown', color: 'slate', message: 'No Data' }
    if (statusInfo.status === 'active') return { status: 'active', color: 'emerald', message: 'Active & Verified', glow: 'shadow-[0_0_15px_rgba(16,185,129,0.3)]' }
    if (statusInfo.status === 'grace_period') return { status: 'grace', color: 'amber', message: 'Grace Period', glow: 'shadow-[0_0_15px_rgba(245,158,11,0.3)]' }
    return { status: 'triggered', color: 'red', message: 'Triggered (Overdue)', glow: 'shadow-[0_0_15px_rgba(239,68,68,0.3)]' }
  }

  const getNextHeartbeatDue = (): Date => {
    if (!lastHeartbeat) return new Date(Date.now() + settings.heartbeatInterval * 24 * 60 * 60 * 1000)
    return new Date(lastHeartbeat.getTime() + settings.heartbeatInterval * 24 * 60 * 60 * 1000)
  }

  const getDaysUntilDueDisplay = (): number => {
    if (statusInfo && typeof statusInfo.daysUntilDue === 'number' && !isNaN(statusInfo.daysUntilDue)) {
      return statusInfo.daysUntilDue
    }
    const nextDue = getNextHeartbeatDue()
    const days = Math.ceil((nextDue.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    return isNaN(days) ? 0 : days
  }

  const calculateProgress = () => {
    const totalDays = settings.heartbeatInterval;
    const daysLeft = getDaysUntilDueDisplay();
    if (daysLeft < 0) return 100;
    const progress = ((totalDays - daysLeft) / totalDays) * 100;
    return Math.min(Math.max(progress, 0), 100);
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 space-y-4">
        <Activity className="w-10 h-10 text-blue-500 animate-pulse" />
        <p className="text-slate-400 font-medium tracking-wide">Syncing Protocol Matrix...</p>
      </div>
    )
  }

  const heartbeatDisplay = getHeartbeatDisplayState()
  const daysUntilDue = getDaysUntilDueDisplay()
  const progress = calculateProgress()

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto font-sans">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-slate-900/40 rounded-3xl p-8 relative overflow-hidden backdrop-blur-xl border border-white/5 shadow-2xl">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none"></div>

        <div className="flex items-center justify-between mb-8 relative z-10">
          <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Live Connection
          </span>
          <button onClick={() => setShowSettings(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm font-medium text-slate-200 shadow-inner">
            <Settings className="w-4 h-4" />
            Protocol Config
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 mb-8">
          <div className="space-y-4">
            {/* Status */}
            <div className="bg-white/[0.03] p-5 rounded-2xl flex items-center gap-5 border border-white/5 shadow-inner">
              <div className={`w-12 h-12 rounded-xl bg-${heartbeatDisplay.color}-500/20 flex flex-shrink-0 items-center justify-center shadow-[0_0_15px_theme(colors.${heartbeatDisplay.color}.500/30)] border border-${heartbeatDisplay.color}-500/20`}>
                {heartbeatDisplay.status === 'active' ? <ShieldCheck className={`w-6 h-6 text-${heartbeatDisplay.color}-400`} /> : <ShieldAlert className={`w-6 h-6 text-${heartbeatDisplay.color}-400`} />}
              </div>
              <div className="flex-1">
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Status</p>
                <p className="text-white font-bold text-lg">{heartbeatDisplay.message}</p>
              </div>
            </div>

            {/* Interval */}
            <div className="bg-white/[0.03] p-5 rounded-2xl flex items-center gap-5 border border-white/5 shadow-inner">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex flex-shrink-0 items-center justify-center shadow-[0_0_15px_theme(colors.blue.500/20)] border border-blue-500/20">
                <Clock className="w-6 h-6 text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Interval</p>
                <p className="text-white font-bold text-lg">{settings.heartbeatInterval}D Recurrence</p>
              </div>
            </div>

            {/* Last Pulse */}
            <div className="bg-white/[0.03] p-5 rounded-2xl flex items-center gap-5 border border-white/5 shadow-inner">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex flex-shrink-0 items-center justify-center shadow-[0_0_15px_theme(colors.purple.500/20)] border border-purple-500/20">
                <Activity className="w-6 h-6 text-purple-400" />
              </div>
              <div className="flex-1">
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Last Pulse</p>
                <p className="text-white font-bold text-lg">{lastHeartbeat ? lastHeartbeat.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Never'}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center py-4">
            <div className="relative w-56 h-56 flex items-center justify-center group">
              <svg className="absolute inset-0 w-full h-full transform -rotate-90 filter drop-shadow-xl" viewBox="0 0 100 100">
                <circle
                  className="text-slate-800 stroke-current"
                  strokeWidth="6"
                  cx="50"
                  cy="50"
                  r="44"
                  fill="transparent"
                ></circle>
                <circle
                  className={`stroke-current transition-all duration-1000 ease-out text-${heartbeatDisplay.color}-500`}
                  strokeWidth="6"
                  strokeLinecap="round"
                  cx="50"
                  cy="50"
                  r="44"
                  fill="transparent"
                  strokeDasharray={`${progress * 2.76} 276`}
                ></circle>
              </svg>

              <div className="text-center z-10 relative">
                <p className={`text-6xl font-black text-white drop-shadow-[0_0_10px_theme(colors.${heartbeatDisplay.color}.500/50)] tracking-tighter`}>{Math.max(0, daysUntilDue)}</p>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Days Left</p>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {daysUntilDue <= 7 && daysUntilDue > 0 && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-6 overflow-hidden">
              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl flex items-center gap-4 relative z-10">
                <div className="p-2 bg-amber-500/20 rounded-full shadow-[0_0_15px_theme(colors.amber.500/30)] animate-pulse">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                </div>
                <p className="text-sm font-medium text-amber-100">Protocol requires signature in <span className="text-amber-400 font-bold underline">{daysUntilDue} days</span>.</p>
              </div>
            </motion.div>
          )}

          {daysUntilDue <= 0 && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-6 overflow-hidden">
              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl flex items-center gap-4 relative z-10">
                <div className="p-2 bg-red-500/20 rounded-full shadow-[0_0_15px_theme(colors.red.500/30)] animate-pulse">
                  <ShieldAlert className="w-5 h-5 text-red-500" />
                </div>
                <p className="text-sm font-medium text-red-100">Critical: Heartbeat Overdue. Sign immediately to prevent protocol trigger.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={handleHeartbeat}
          disabled={isRecording}
          className="w-full py-5 rounded-2xl bg-gradient-to-r from-red-600 via-rose-500 to-red-600 hover:from-rose-500 hover:via-red-400 hover:to-rose-500 relative group overflow-hidden shadow-[0_0_30px_rgba(225,29,72,0.3)] transition-all disabled:opacity-70 disabled:cursor-not-allowed border border-rose-400/30"
        >
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
          <div className="relative flex items-center justify-center gap-3 text-white font-bold text-lg tracking-wide">
            {isRecording ? (
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.8 }}>
                <Fingerprint className="w-6 h-6" />
              </motion.div>
            ) : (
              <Fingerprint className="w-6 h-6 group-hover:scale-110 transition-transform" />
            )}
            {isRecording ? 'Generating Proof...' : 'Record Heartbeat Signature'}
          </div>
        </button>
      </motion.div>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-lg w-full relative shadow-2xl">
              <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20">
                    <Settings className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">Protocol Lifecycle Config</h3>
                    <p className="text-xs text-slate-400 mt-1">Fine-tune your personal dead man's switch timings</p>
                  </div>
                </div>
                <button onClick={() => setShowSettings(false)} className="text-slate-500 hover:text-white transition-colors bg-white/5 p-2 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6 mb-8">
                <div className="space-y-3">
                  <label className="block text-[10px] font-bold tracking-widest text-slate-400 uppercase">Heartbeat Interval</label>
                  <p className="text-xs text-slate-500">How frequently you must check in.</p>
                  <select
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium text-sm"
                    value={settings.heartbeatInterval}
                    onChange={(e) => setSettings(prev => ({ ...prev, heartbeatInterval: parseInt(e.target.value) }))}
                  >
                    <option value={7}>7 days (Weekly)</option>
                    <option value={14}>14 days (Bi-weekly)</option>
                    <option value={30}>30 days (Monthly)</option>
                    <option value={60}>60 days (Bi-monthly)</option>
                    <option value={90}>90 days (Quarterly)</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="block text-[10px] font-bold tracking-widest text-slate-400 uppercase">Grace Period</label>
                  <p className="text-xs text-slate-500">Time before asset release triggers after overdue.</p>
                  <select
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium text-sm"
                    value={settings.gracePeriod}
                    onChange={(e) => setSettings(prev => ({ ...prev, gracePeriod: parseInt(e.target.value) }))}
                  >
                    <option value={7}>7 days Rescue Window</option>
                    <option value={14}>14 days Rescue Window</option>
                    <option value={30}>30 days Rescue Window</option>
                    <option value={60}>60 days Rescue Window</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleSettingsUpdate}
                  disabled={isSavingSettings}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3.5 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center disabled:opacity-70 text-sm"
                >
                  {isSavingSettings ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <ShieldCheck className="w-4 h-4 mr-2" />}
                  {isSavingSettings ? 'Deploying Config...' : 'Save Protocol Configuration'}
                </button>
                <button
                  onClick={() => {
                    setShowSettings(false)
                    fetchLiveStatus()
                  }}
                  className="px-6 py-3.5 rounded-xl border border-slate-700 bg-slate-800/40 text-slate-300 font-bold hover:bg-slate-800 transition-all text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Popup */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-xl px-6 py-4 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.2)]"
          >
            <div className="bg-emerald-500/20 p-2 rounded-full">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-white font-bold tracking-wide">Heartbeat Recorded</p>
              <p className="text-emerald-200 text-xs font-medium">Proof-of-life verified successfully.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}