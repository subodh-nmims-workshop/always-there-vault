'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, Clock, CheckCircle, AlertTriangle, Settings, RefreshCw, Activity, ShieldCheck, Fingerprint } from 'lucide-react'
import { recordHeartbeat, getHeartbeatStatus, getHeartbeatHistory, HeartbeatPayload, getHeartbeatSettings, updateHeartbeatSettings } from '@/app/actions/heartbeat'

export function HeartbeatMonitor() {
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [lastHeartbeat, setLastHeartbeat] = useState<Date | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [heartbeats, setHeartbeats] = useState<any[]>([])
  const [statusInfo, setStatusInfo] = useState<{ status: string; daysUntilDue: number; isOverdue: boolean } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const [settings, setSettings] = useState({
    heartbeatInterval: 30,
    gracePeriod: 14
  })
  const [showSettings, setShowSettings] = useState(false)
  const [isSavingSettings, setIsSavingSettings] = useState(false)

  // Initialize
  useEffect(() => {
    const address = localStorage.getItem('dwp_wallet_address')
    if (address) {
      setWalletAddress(address)
    } else {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (walletAddress) {
      fetchLiveStatus()
    }
  }, [walletAddress])

  const fetchLiveStatus = async () => {
    setIsLoading(true)
    try {
      // Fetch History
      const histRes = await getHeartbeatHistory(walletAddress)
      if (histRes.success) setHeartbeats(histRes.heartbeats || [])

      // Fetch Settings
      const setRes = await getHeartbeatSettings(walletAddress)
      if (setRes.success) {
        setSettings({
          heartbeatInterval: setRes.interval,
          gracePeriod: setRes.gracePeriod
        })
      }

      // Fetch Live Status Matrix
      const statRes = await getHeartbeatStatus(walletAddress)
      if (statRes.success && statRes.status !== 'Not Found' && statRes.status !== 'inactive') {
        setStatusInfo({
          status: statRes.status,
          daysUntilDue: statRes.daysUntilDue,
          isOverdue: statRes.isOverdue
        })
        if (statRes.lastHeartbeat) setLastHeartbeat(new Date(statRes.lastHeartbeat))

        // Use backend accurate settings if returned
        if (statRes.interval && statRes.gracePeriod) {
          setSettings({ heartbeatInterval: statRes.interval, gracePeriod: statRes.gracePeriod })
        }
      } else if (statRes.status === 'inactive' || statRes.status === 'Not Found') {
        setStatusInfo({
          status: 'active',
          daysUntilDue: settings.heartbeatInterval,
          isOverdue: false
        })
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
      // Simulate wallet signature latency for UX
      await new Promise(resolve => setTimeout(resolve, 2000))

      const payload: HeartbeatPayload = {
        walletAddress,
        method: 'wallet_signature',
        signature: '0x' + Array.from({ length: 128 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
        ipAddress: '127.0.0.1' // In real app, would be grabbed via headers on server
      }

      const response = await recordHeartbeat(payload)

      if (response.success) {
        await fetchLiveStatus()
      } else {
        throw new Error('Server Rejected Pulse')
      }

    } catch (error) {
      console.error('Failed to record heartbeat:', error)
      alert('Failed to transmit cryptographic proof-of-life. Please try again.')
    } finally {
      setIsRecording(false)
    }
  }

  const handleSettingsUpdate = async () => {
    if (!walletAddress) return
    setIsSavingSettings(true)

    const res = await updateHeartbeatSettings(walletAddress, settings.heartbeatInterval, settings.gracePeriod)
    if (res.success) {
      await fetchLiveStatus()
      setShowSettings(false)
    } else {
      alert("Failed to update protocol settings.")
    }

    setIsSavingSettings(false)
  }

  const getHeartbeatDisplayState = () => {
    if (!statusInfo) return { status: 'unknown', color: 'slate', message: 'No Data' }

    if (statusInfo.status === 'active') return { status: 'active', color: 'green', message: 'Active & Verified', glow: 'shadow-green-500/20' }
    if (statusInfo.status === 'grace_period') return { status: 'grace', color: 'yellow', message: 'Grace Period', glow: 'shadow-yellow-500/20' }
    return { status: 'triggered', color: 'red', message: 'Triggered (Overdue)', glow: 'shadow-red-500/30' }
  }

  const getNextHeartbeatDue = (): Date => {
    if (!lastHeartbeat) return new Date(Date.now() + settings.heartbeatInterval * 24 * 60 * 60 * 1000)
    return new Date(lastHeartbeat.getTime() + settings.heartbeatInterval * 24 * 60 * 60 * 1000)
  }

  const getDaysUntilDueDisplay = (): number => {
    if (statusInfo) return statusInfo.daysUntilDue
    const nextDue = getNextHeartbeatDue()
    return Math.ceil((nextDue.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
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
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        >
          <Activity className="w-10 h-10 text-blue-500" />
        </motion.div>
        <p className="text-slate-400 font-medium tracking-wide">Syncing Protocol Matrix...</p>
      </div>
    )
  }

  const heartbeatDisplay = getHeartbeatDisplayState()
  const daysUntilDue = getDaysUntilDueDisplay()
  const progress = calculateProgress()

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden premium-card p-8 group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 to-slate-800/20 backdrop-blur-3xl opacity-50 z-0" />

        {/* Header content */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-0 bg-rose-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full" />
              <div className="relative icon-container bg-gradient-to-br from-red-500/80 to-rose-600/80 backdrop-blur-md shadow-lg border border-red-500/20">
                <Heart className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Heartbeat Matrix</h2>
              <p className="text-sm text-slate-400 font-medium mt-1">Cryptographic proof-of-life consensus</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-5 py-2.5 bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-sm font-semibold rounded-xl transition-all border border-slate-700/50 hover:border-blue-500/50 shadow-lg flex items-center justify-center backdrop-blur-md"
            onClick={() => setShowSettings(true)}
          >
            <Settings className="h-4 w-4 mr-2" />
            Protocol Config
          </motion.button>
        </div>

        <div className="relative z-10 space-y-8">

          {/* Circular Progress & Status Container */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 py-6">

            {/* Left Status Grid */}
            <div className="grid grid-cols-2 gap-4 w-full md:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className={`col-span-2 text-center p-6 rounded-2xl border backdrop-blur-md shadow-xl ${heartbeatDisplay.glow} ${heartbeatDisplay.color === 'green' ? 'bg-green-500/10 border-green-500/20' :
                  heartbeatDisplay.color === 'yellow' ? 'bg-yellow-500/10 border-yellow-500/20' :
                    'bg-red-500/10 border-red-500/20'
                  }`}
              >
                {heartbeatDisplay.status === 'active' ? (
                  <ShieldCheck className={`h-10 w-10 mx-auto mb-3 text-${heartbeatDisplay.color}-400 drop-shadow-md`} />
                ) : heartbeatDisplay.status === 'grace' ? (
                  <AlertTriangle className={`h-10 w-10 mx-auto mb-3 text-${heartbeatDisplay.color}-400 drop-shadow-md`} />
                ) : (
                  <AlertTriangle className={`h-10 w-10 mx-auto mb-3 text-${heartbeatDisplay.color}-400 drop-shadow-md`} />
                )}
                <p className={`text-xl font-bold text-${heartbeatDisplay.color}-400 mb-1 tracking-wide`}>
                  {heartbeatDisplay.message}
                </p>
                <p className={`text-xs uppercase font-bold tracking-widest text-${heartbeatDisplay.color}-500/80`}>
                  Current Signature State
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center p-5 bg-blue-500/10 border border-blue-500/20 rounded-2xl backdrop-blur-md"
              >
                <Clock className="h-6 w-6 text-blue-400 mx-auto mb-2 opacity-80" />
                <p className="text-lg font-bold text-blue-100 mb-0.5">
                  {settings.heartbeatInterval}D
                </p>
                <p className="text-[10px] uppercase font-bold tracking-widest text-blue-400/80">Interval</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center p-5 bg-purple-500/10 border border-purple-500/20 rounded-2xl backdrop-blur-md"
              >
                <Activity className="h-6 w-6 text-purple-400 mx-auto mb-2 opacity-80" />
                <p className="text-lg font-bold text-purple-100 mb-0.5">
                  {lastHeartbeat ? lastHeartbeat.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'Never'}
                </p>
                <p className="text-[10px] uppercase font-bold tracking-widest text-purple-400/80">Last Pulse</p>
              </motion.div>
            </div>

            {/* Right Circular Progress */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="relative flex items-center justify-center w-56 h-56 group"
            >
              {/* Pulse glow effect behind circle */}
              <div className={`absolute inset-0 rounded-full blur-2xl opacity-20 transition-opacity duration-1000 ${heartbeatDisplay.color === 'green' ? 'bg-green-500' :
                  heartbeatDisplay.color === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
                } group-hover:opacity-40`} />

              <svg className="w-full h-full transform -rotate-90 filter drop-shadow-xl" viewBox="0 0 100 100">
                <circle
                  className="text-slate-800/80 stroke-current"
                  strokeWidth="4"
                  cx="50"
                  cy="50"
                  r="46"
                  fill="transparent"
                ></circle>
                <circle
                  className={`stroke-current transition-all duration-1000 ease-out ${heartbeatDisplay.color === 'green' ? 'text-green-500' :
                      heartbeatDisplay.color === 'yellow' ? 'text-yellow-400' : 'text-red-500'
                    }`}
                  strokeWidth="4"
                  strokeLinecap="round"
                  cx="50"
                  cy="50"
                  r="46"
                  fill="transparent"
                  strokeDasharray={`${progress * 2.89} 289`} // 2 * pi * 46 ~= 289
                ></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold tracking-tighter text-white drop-shadow-md">
                  {Math.max(0, daysUntilDue)}
                </span>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-1">Days Left</span>
              </div>
            </motion.div>

          </div>

          {/* Status Alert Banner */}
          <AnimatePresence>
            {daysUntilDue <= 7 && daysUntilDue > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-gradient-to-r from-yellow-500/20 to-orange-500/10 border border-yellow-500/30 rounded-xl p-4 backdrop-blur-md shadow-lg"
              >
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0 animate-pulse" />
                  <p className="text-yellow-200 font-medium">
                    Protocol requires signature in {daysUntilDue} day{daysUntilDue !== 1 ? 's' : ''}.
                  </p>
                </div>
              </motion.div>
            )}

            {daysUntilDue <= 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-gradient-to-r from-red-500/20 to-rose-600/10 border border-red-500/40 rounded-xl p-4 backdrop-blur-md shadow-lg shadow-red-500/10"
              >
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 animate-pulse" />
                  <p className="text-red-200 font-medium">
                    Critical: Heartbeat Overdue. Grace period activated. Sign immediately to prevent protocol trigger.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Big Heartbeat Button */}
          <div className="text-center py-8 relative">
            {/* Ambient glow behind button */}
            <div className="absolute inset-0 bg-red-500/10 blur-3xl rounded-full scale-150 transform translate-y-4 opacity-50 pointer-events-none" />

            <motion.button
              whileHover={{ scale: isRecording ? 1 : 1.03 }}
              whileTap={{ scale: isRecording ? 1 : 0.97 }}
              onClick={handleHeartbeat}
              disabled={isRecording}
              className="relative px-8 py-5 md:px-12 md:py-6 bg-gradient-to-r from-red-600 via-rose-600 to-red-500 hover:from-rose-500 hover:to-red-400 text-white rounded-2xl font-bold transition-all shadow-[0_0_40px_-5px_rgba(239,68,68,0.5)] border border-red-400/30 disabled:opacity-70 disabled:cursor-not-allowed mx-auto overflow-hidden group"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />

              <div className="relative flex items-center justify-center text-lg md:text-xl tracking-wide">
                {isRecording ? (
                  <>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                    >
                      <Fingerprint className="h-7 w-7 mr-3 text-red-100" />
                    </motion.div>
                    Generating Cryptographic Proof...
                  </>
                ) : (
                  <>
                    <Heart className="h-7 w-7 mr-3 text-red-100 group-hover:scale-110 transition-transform" />
                    Record Heartbeat Signature
                  </>
                )}
              </div>
            </motion.button>
            <p className="text-sm text-slate-400 mt-6 font-medium tracking-wide">
              Gasless cryptographic signature · Zero cost
            </p>
          </div>
        </div>
      </motion.div>

      {/* Settings Modal - Framer Motion Presence */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="premium-card p-8 border-blue-500/30 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-transparent pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-slate-800/80">
                <div className="icon-container bg-slate-800 border border-slate-700 shadow-inner">
                  <Settings className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-100 tracking-tight">Protocol Lifecycle Config</h3>
                  <p className="text-sm text-slate-400 mt-1">Fine-tune your personal dead man's switch timings</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-3">
                  <label className="block text-sm font-bold tracking-wide text-slate-300 uppercase">
                    Heartbeat Interval
                  </label>
                  <p className="text-xs text-slate-500 mb-2">How frequently you must check in.</p>
                  <div className="relative">
                    <select
                      className="w-full bg-slate-900/80 border border-slate-700/80 text-white rounded-xl px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-inner"
                      value={settings.heartbeatInterval}
                      onChange={(e) => setSettings(prev => ({ ...prev, heartbeatInterval: parseInt(e.target.value) }))}
                    >
                      <option value={7}>7 days (Weekly)</option>
                      <option value={14}>14 days (Bi-weekly)</option>
                      <option value={30}>30 days (Monthly)</option>
                      <option value={60}>60 days (Bi-monthly)</option>
                      <option value={90}>90 days (Quarterly)</option>
                    </select>
                    <div className="absolute right-4 top-3.5 pointer-events-none text-slate-400">▼</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-bold tracking-wide text-slate-300 uppercase">
                    Grace Period
                  </label>
                  <p className="text-xs text-slate-500 mb-2">Time before asset release triggers after overdue.</p>
                  <div className="relative">
                    <select
                      className="w-full bg-slate-900/80 border border-slate-700/80 text-white rounded-xl px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-inner"
                      value={settings.gracePeriod}
                      onChange={(e) => setSettings(prev => ({ ...prev, gracePeriod: parseInt(e.target.value) }))}
                    >
                      <option value={7}>7 days Rescue Window</option>
                      <option value={14}>14 days Rescue Window</option>
                      <option value={30}>30 days Rescue Window</option>
                      <option value={60}>60 days Rescue Window</option>
                    </select>
                    <div className="absolute right-4 top-3.5 pointer-events-none text-slate-400">▼</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSettingsUpdate}
                  disabled={isSavingSettings}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-4 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center disabled:opacity-70"
                >
                  {isSavingSettings ? (
                    <RefreshCw className="w-5 h-5 animate-spin mr-2" />
                  ) : (
                    <ShieldCheck className="w-5 h-5 mr-2" />
                  )}
                  {isSavingSettings ? 'Deploying Config...' : 'Save Protocol Configuration'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShowSettings(false)
                    fetchLiveStatus() // reset changes if canceled
                  }}
                  className="px-8 py-4 rounded-xl border border-slate-700/80 bg-slate-800/40 text-slate-300 font-semibold hover:bg-slate-800 transition-all shadow-inner"
                >
                  Cancel
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}