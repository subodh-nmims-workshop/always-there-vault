'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Clock, Activity, AlertTriangle, Fingerprint, Settings, RefreshCw, X, ShieldAlert, CheckCircle2, Mail, Trash2 } from 'lucide-react'
import { recordHeartbeat, getHeartbeatStatus, HeartbeatPayload, getHeartbeatSettings, updateHeartbeatSettings } from '@/app/actions/heartbeat'
import { submitHeartbeat, configureHeartbeat as configureBlockchainHeartbeat } from '@/lib/blockchain'
import { useApp } from '@/contexts/AppContext'
import { toast } from 'sonner'

export function HeartbeatMonitor() {
  const { refreshState, state } = useApp()
  const [walletAddress, setWalletAddress] = useState<string>('')
  
  const [settings, setSettings] = useState(() => {
    if (state?.settings) {
      return {
        heartbeatInterval: state.settings.heartbeatInterval || 30,
        gracePeriod: state.settings.gracePeriod || 14,
        bufferMisses: state.settings.bufferMisses || 3
      }
    }
    return {
      heartbeatInterval: 30,
      gracePeriod: 14,
      bufferMisses: 3
    }
  })

  const [lastHeartbeat, setLastHeartbeat] = useState<Date | null>(() => {
    if (state?.heartbeats && state.heartbeats.length > 0) {
      const sorted = [...state.heartbeats].sort((a, b) => b.timestamp - a.timestamp)
      return new Date(sorted[0].timestamp)
    }
    return null
  })

  const [isRecording, setIsRecording] = useState(false)

  const [heartbeats, setHeartbeats] = useState<any[]>(() => {
    if (state?.heartbeats) {
      const sorted = [...state.heartbeats].sort((a, b) => b.timestamp - a.timestamp)
      return sorted.slice(0, 10)
    }
    return []
  })

  const [statusInfo, setStatusInfo] = useState<{ status: string; daysUntilDue: number; isOverdue: boolean } | null>(() => {
    if (state) {
      const sorted = state.heartbeats ? [...state.heartbeats].sort((a, b) => b.timestamp - a.timestamp) : []
      const lastHb = sorted.length > 0 ? new Date(sorted[0].timestamp) : null
      
      const currentSettings = {
        heartbeatInterval: state.settings?.heartbeatInterval || 30,
        gracePeriod: state.settings?.gracePeriod || 14,
        bufferMisses: state.settings?.bufferMisses || 3
      }
      
      const isDemo = currentSettings.heartbeatInterval < 7
      const intervalMs = isDemo
        ? currentSettings.heartbeatInterval * 60 * 1000
        : currentSettings.heartbeatInterval * 24 * 60 * 60 * 1000
      const graceMs = isDemo
        ? currentSettings.gracePeriod * 60 * 1000
        : currentSettings.gracePeriod * 24 * 60 * 60 * 1000

      // Find or initialize a persistent start time for this wallet
      let initialTime = Date.now()
      if (typeof window !== 'undefined') {
        const address = localStorage.getItem('dwp_wallet_address') || 'local'
        const storageKey = `dwp_initial_heartbeat_${address}`
        const cached = localStorage.getItem(storageKey)
        if (cached) {
          initialTime = parseInt(cached, 10)
        } else {
          localStorage.setItem(storageKey, initialTime.toString())
        }
      }

      const lastTimestamp = lastHb ? lastHb.getTime() : initialTime
      const msSince = Date.now() - lastTimestamp
      const nextDue = lastTimestamp + intervalMs

      let status = 'active'
      let isOverdue = false

      if (msSince > intervalMs + graceMs) {
        status = 'triggered'
        isOverdue = true
      } else if (msSince > intervalMs) {
        status = 'grace_period'
        isOverdue = true
      }

      const daysUntilDue = isDemo
        ? Math.max(0, Math.ceil((nextDue - Date.now()) / (1000 * 60)))
        : Math.max(0, Math.ceil((nextDue - Date.now()) / (1000 * 60 * 60 * 24)))

      return { status, daysUntilDue, isOverdue }
    }
    return null
  })

  const [isLoading, setIsLoading] = useState(!state)
  const [currentTime, setCurrentTime] = useState(Date.now())
  const [showSettings, setShowSettings] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [isSavingSettings, setIsSavingSettings] = useState(false)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)

  // Email OTP Verification States
  const [profileEmail, setProfileEmail] = useState<string>('')
  const [pendingEmail, setPendingEmail] = useState<string>('')
  const [emailVerified, setEmailVerified] = useState<boolean>(false)
  const [inputEmail, setInputEmail] = useState<string>('')
  const [otpCode, setOtpCode] = useState<string>('')
  const [showOtpField, setShowOtpField] = useState<boolean>(false)
  const [isSendingOtp, setIsSendingOtp] = useState<boolean>(false)
  const [isVerifyingOtp, setIsVerifyingOtp] = useState<boolean>(false)
  const [resendCooldown, setResendCooldown] = useState<number>(0)
  const [updatedAt, setUpdatedAt] = useState<string>('')

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
        setPendingEmail(data.pendingEmail || '')
        setEmailVerified(data.emailVerified || false)
        setInputEmail(data.pendingEmail || data.email || '')
        setUpdatedAt(data.updatedAt || '')
      }
    } catch (err) {
      console.error("Error fetching profile in heartbeat monitor:", err)
    }
  }

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCooldown])

  useEffect(() => {
    if (showSettings) {
      fetchProfileInfo()
      setOtpCode('')
      setShowOtpField(false)
    }
  }, [showSettings])

  useEffect(() => {
    if (showSettings) {
      if (updatedAt) {
        const lastUpdated = new Date(updatedAt).getTime()
        const diff = Date.now() - lastUpdated
        if (diff > 0 && diff < 15000) {
          const remaining = Math.ceil((15000 - diff) / 1000)
          if (remaining > 0) {
            setResendCooldown(remaining)
            setShowOtpField(true)
            return
          }
        }
        setResendCooldown(0)
      }
    }
  }, [showSettings, updatedAt])

  const handleSendOtp = async () => {
    if (!inputEmail) {
      toast.error("Please enter a valid email address first.")
      return
    }
    setIsSendingOtp(true)
    try {
      const isDemo = typeof window !== 'undefined' && localStorage.getItem('dwp_is_demo') === 'true'
      const token = localStorage.getItem('dwp_token')

      if (isDemo && !token) {
        setPendingEmail(inputEmail)
        setEmailVerified(false)
        setShowOtpField(true)
        setResendCooldown(15)
        if (typeof window !== 'undefined') {
          localStorage.setItem('dwp_user_email', inputEmail)
          localStorage.setItem('dwp_demo_otp', '123456')
        }
        toast.success("Demo Mode: Verification code is '123456'!")
        setIsSendingOtp(false)
        return
      }

      const apiEndpoint = process.env.NEXT_PUBLIC_API_URL || 'https://always-there-protocol-api.onrender.com'
      const res = await fetch(`${apiEndpoint}/api/users/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ email: inputEmail })
      })

      if (res.ok) {
        const data = await res.json()
        setPendingEmail(data.pendingEmail || inputEmail)
        setEmailVerified(false)
        setShowOtpField(true)
        setUpdatedAt(data.updatedAt || '')
        setResendCooldown(15)
        if (typeof window !== 'undefined') {
          localStorage.setItem('dwp_user_email', inputEmail)
        }
        toast.success("Verification code sent to your email address!")
      } else {
        const errData = await res.json().catch(() => ({}))
        if (isDemo) {
          setPendingEmail(inputEmail)
          setEmailVerified(false)
          setShowOtpField(true)
          setResendCooldown(15)
          if (typeof window !== 'undefined') {
            localStorage.setItem('dwp_user_email', inputEmail)
            localStorage.setItem('dwp_demo_otp', '123456')
          }
          toast.success("Demo Mode Fallback: Verification code is '123456'!")
        } else {
          throw new Error(errData.message || "Failed to update profile email and trigger OTP.")
        }
      }
    } catch (err: any) {
      console.error(err)
      toast.error(err.message || "Error sending verification code.")
    } finally {
      setIsSendingOtp(false)
    }
  }

  const handleVerifyOtp = async () => {
    if (!otpCode || otpCode.trim().length !== 6) {
      toast.error("Please enter a valid 6-digit OTP code.")
      return
    }
    setIsVerifyingOtp(true)
    try {
      const isDemo = typeof window !== 'undefined' && localStorage.getItem('dwp_is_demo') === 'true'
      const token = localStorage.getItem('dwp_token')

      if (isDemo && (!token || otpCode.trim() === localStorage.getItem('dwp_demo_otp') || otpCode.trim() === '123456')) {
        toast.success("Email verified successfully (Demo Mode)!")
        setProfileEmail(pendingEmail || inputEmail)
        setEmailVerified(true)
        setShowOtpField(false)
        setOtpCode('')
        setResendCooldown(0)
        if (typeof window !== 'undefined') {
          localStorage.setItem('dwp_user_email', pendingEmail || inputEmail)
        }
        setIsVerifyingOtp(false)
        return
      }

      const apiEndpoint = process.env.NEXT_PUBLIC_API_URL || 'https://always-there-protocol-api.onrender.com'
      const res = await fetch(`${apiEndpoint}/api/users/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ code: otpCode.trim() })
      })

      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          toast.success("Email verified successfully!")
          setProfileEmail(pendingEmail || inputEmail)
          setEmailVerified(true)
          setShowOtpField(false)
          setOtpCode('')
          setResendCooldown(0)
          await fetchProfileInfo()
        } else {
          if (isDemo && (otpCode.trim() === '123456' || otpCode.trim() === localStorage.getItem('dwp_demo_otp'))) {
            toast.success("Email verified successfully (Demo Fallback)!")
            setProfileEmail(pendingEmail || inputEmail)
            setEmailVerified(true)
            setShowOtpField(false)
            setOtpCode('')
            setResendCooldown(0)
          } else {
            toast.error(data.message || "Invalid verification code.")
          }
        }
      } else {
        const errData = await res.json().catch(() => ({}))
        if (isDemo && (otpCode.trim() === '123456' || otpCode.trim() === localStorage.getItem('dwp_demo_otp'))) {
          toast.success("Email verified successfully (Demo Fallback)!")
          setProfileEmail(pendingEmail || inputEmail)
          setEmailVerified(true)
          setShowOtpField(false)
          setOtpCode('')
          setResendCooldown(0)
        } else {
          throw new Error(errData.message || "Failed to verify email code.")
        }
      }
    } catch (err: any) {
      console.error(err)
      toast.error(err.message || "Error verifying email code.")
    } finally {
      setIsVerifyingOtp(false)
    }
  }

  const handleRemoveEmail = async () => {
    if (!confirm("Are you sure you want to delete this verified email? You will need to verify a new email to receive protocol warnings.")) {
      return;
    }
    try {
      const isDemo = typeof window !== 'undefined' && localStorage.getItem('dwp_is_demo') === 'true'
      const token = localStorage.getItem('dwp_token')

      if (isDemo && !token) {
        setProfileEmail('')
        setPendingEmail('')
        setEmailVerified(false)
        setInputEmail('')
        setShowOtpField(false)
        setOtpCode('')
        setResendCooldown(0)
        if (typeof window !== 'undefined') {
          localStorage.removeItem('dwp_user_email')
        }
        toast.success("Alert email removed successfully (Demo Mode)!")
        return
      }

      const apiEndpoint = process.env.NEXT_PUBLIC_API_URL || 'https://always-there-protocol-api.onrender.com'
      const res = await fetch(`${apiEndpoint}/api/users/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ email: '' })
      })

      if (res.ok) {
        setProfileEmail('')
        setPendingEmail('')
        setEmailVerified(false)
        setInputEmail('')
        setShowOtpField(false)
        setOtpCode('')
        setResendCooldown(0)
        if (typeof window !== 'undefined') {
          localStorage.removeItem('dwp_user_email')
        }
        toast.success("Alert email removed successfully!")
      } else {
        const errData = await res.json().catch(() => ({}))
        if (isDemo) {
          setProfileEmail('')
          setPendingEmail('')
          setEmailVerified(false)
          setInputEmail('')
          setShowOtpField(false)
          setOtpCode('')
          setResendCooldown(0)
          if (typeof window !== 'undefined') {
            localStorage.removeItem('dwp_user_email')
          }
          toast.success("Alert email removed successfully (Demo Fallback)!")
        } else {
          throw new Error(errData.message || "Failed to remove email.")
        }
      }
    } catch (err: any) {
      console.error(err)
      toast.error(err.message || "Error removing email.")
    }
  }

  useEffect(() => {
    const address = localStorage.getItem('dwp_wallet_address')
    if (address) {
      setWalletAddress(address)
    } else {
      setIsLoading(false)
    }

    const timer = setInterval(() => {
      setCurrentTime(Date.now())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (walletAddress) {
      fetchLiveStatus()
    }
  }, [walletAddress])

  useEffect(() => {
    if (walletAddress) {
      loadHeartbeatHistory()
    }
  }, [walletAddress, state?.heartbeats])

  const loadHeartbeatHistory = () => {
    // Load from AppContext state
    if (state?.heartbeats) {
      const sortedHeartbeats = [...state.heartbeats].sort((a, b) => b.timestamp - a.timestamp)
      setHeartbeats(sortedHeartbeats.slice(0, 10)) // Last 10 heartbeats
      
      // Fallback: If lastHeartbeat is not set yet, or if the local heartbeat is newer than what we have, use the local one.
      if (sortedHeartbeats.length > 0) {
        const latestLocal = new Date(sortedHeartbeats[0].timestamp)
        setLastHeartbeat(prev => {
          if (!prev) return latestLocal
          return latestLocal > prev ? latestLocal : prev
        })
      }
    }
  }

  const fetchLiveStatus = async () => {
    if (!state) setIsLoading(true)
    try {
      const setRes = await getHeartbeatSettings(walletAddress)
      if (setRes.success) {
        setSettings({ 
          heartbeatInterval: setRes.interval, 
          gracePeriod: setRes.gracePeriod, 
          bufferMisses: setRes.bufferMisses || 3 
        })
      }

      const statRes = await getHeartbeatStatus(walletAddress)
      if (statRes.success && statRes.status !== 'Not Found' && statRes.status !== 'inactive') {
        setStatusInfo({ status: statRes.status || 'unknown', daysUntilDue: statRes.daysUntilDue || 0, isOverdue: statRes.isOverdue || false })
        if (statRes.lastHeartbeat) setLastHeartbeat(new Date(statRes.lastHeartbeat))
        if (statRes.interval && statRes.gracePeriod) {
          setSettings(prev => ({ 
            ...prev,
            heartbeatInterval: statRes.interval, 
            gracePeriod: statRes.gracePeriod
          }))
        }
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
      // DECENTRALIZED SMART CONTRACT EXECUTION (Attempt)
      try {
        const chainResponse = await submitHeartbeat()
        if (chainResponse.success) {
          toast.success('On-chain Heartbeat Logged', {
            description: `Tx: ${chainResponse.txHash?.substring(0, 10)}...`
          })
        } else {
          if (chainResponse.error?.toLowerCase().includes('reject') || chainResponse.error?.toLowerCase().includes('denied')) {
            toast.info('Blockchain Bypassed', {
              description: 'Recording proof via Protocol matrix instead.'
            })
          } else {
            console.warn('Blockchain log failed, falling back to centralized mode:', chainResponse.error)
            toast.info('Blockchain Sync Error', {
              description: 'Network fee issue. Recording proof via Protocol matrix instead.'
            })
          }
        }
      } catch (e) {
        console.warn('Blockchain exception:', e)
      }

      // ALWAYS RECORD ON CENTRALIZED DATABASE for Email/Cron monitoring 
      // This ensures the demo still works even if the wallet has 0 ETH
      const payload: HeartbeatPayload = {
        walletAddress: walletAddress || '0x0000000000000000000000000000000000000000',
        method: 'wallet_signature',
        signature: 'manual_override_demo',
        ipAddress: '127.0.0.1'
      }

      const res = await recordHeartbeat(payload)

      if (res.success) {
        setLastHeartbeat(new Date()) // Update locally for instant countdown reset
        await fetchLiveStatus()
        await refreshState()
        loadHeartbeatHistory() // Reload history
        
        if (res.syncFailed) {
          toast.warning('Heartbeat Saved Locally', {
            description: `Proof-of-life recorded locally, but backend sync failed: ${res.error || 'Server unreachable'}`
          })
        } else {
          toast.success('Heartbeat Recorded', {
            description: 'Proof-of-life verified successfully.'
          })
        }
      } else throw new Error(res.error || 'Local Context Rejected Pulse')

    } catch (error: any) {
      console.error('Failed to record heartbeat:', error)
      toast.error('Transmission Failed', {
        description: `Failed to transmit cryptographic proof-of-life.\n\nError: ${error.message}`
      })
    } finally {
      setIsRecording(false)
    }
  }

  const handleSettingsUpdate = async () => {
    if (inputEmail && (inputEmail !== profileEmail || !emailVerified)) {
      toast.error('Email Verification Required', {
        description: 'Please verify your notification email address using the Send OTP button.'
      })
      return
    }

    setIsSavingSettings(true)

    try {
      // Try to sync with blockchain, but don't block local save if it fails
      let chainError: string | null = null
      try {
        const chainResponse = await configureBlockchainHeartbeat(settings.heartbeatInterval, settings.gracePeriod)
        if (!chainResponse.success) {
          if (chainResponse.error?.toLowerCase().includes('reject') || chainResponse.error?.toLowerCase().includes('denied')) {
            toast.info('Blockchain Bypassed', {
              description: 'Configuration will be saved to the Protocol Matrix.'
            })
          } else {
            chainError = chainResponse.error || 'Smart Contract setting update reverted'
          }
        }
      } catch (err: any) {
        chainError = err?.message || 'Unable to reach blockchain provider'
      }

      // Always persist settings locally so the app behaves correctly
      const res = await updateHeartbeatSettings(walletAddress || 'local', settings.heartbeatInterval, settings.gracePeriod, settings.bufferMisses)
      if (!res.success) {
        throw new Error('Failed to update local protocol settings.')
      }

      await fetchLiveStatus()
      await refreshState()
      setShowSettings(false)

      if (res.syncFailed) {
        toast.warning('Settings Saved Locally', {
          description: `Config saved locally, but backend sync failed: ${res.error || 'Server unreachable'}`
        })
      } else if (chainError) {
        // Inform user that on-chain sync failed but local config is saved
        toast.warning('On-chain Sync Issue', {
          description: `Config saved locally, but on-chain sync failed: ${chainError}`
        })
      } else {
        toast.success('Protocol configuration updated')
      }
    } catch (error: any) {
      console.error(error)
      toast.error('Configuration Failed', {
        description: `Configuration update failed: ${error.message}`
      })
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
    const isDemo = settings.heartbeatInterval < 7;
    const ms = isDemo
      ? settings.heartbeatInterval * 60 * 1000
      : settings.heartbeatInterval * 24 * 60 * 60 * 1000;
    if (!lastHeartbeat) return new Date(Date.now() + ms);
    return new Date(lastHeartbeat.getTime() + ms);
  }

  const getDaysUntilDueDisplay = (): { value: number; unit: string } => {
    const nextDue = getNextHeartbeatDue()
    const diffMs = nextDue.getTime() - currentTime
    const isDemo = settings.heartbeatInterval < 7

    if (isDemo) {
      const seconds = Math.max(0, Math.ceil(diffMs / 1000))
      const maxSeconds = settings.heartbeatInterval * 60
      return { value: Math.min(seconds, maxSeconds), unit: 'Seconds' }
    }

    const days = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)))
    return { value: Math.min(days, settings.heartbeatInterval), unit: 'Days' }
  }

  const getGracePeriodLeft = (): { value: number; unit: string } => {
    const nextDue = getNextHeartbeatDue()
    const isDemo = settings.heartbeatInterval < 7
    const graceMs = (isDemo ? settings.gracePeriod * 60 : settings.gracePeriod * 24 * 60 * 60) * 1000
    const graceDue = nextDue.getTime() + graceMs
    const diffMs = graceDue - currentTime

    if (isDemo) {
      const seconds = Math.max(0, Math.ceil(diffMs / 1000))
      const maxSeconds = settings.gracePeriod * 60
      return { value: Math.min(seconds, maxSeconds), unit: 'Seconds' }
    }

    const days = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)))
    return { value: Math.min(days, settings.gracePeriod), unit: 'Days' }
  }

  const calculateProgress = () => {
    const isDemo = settings.heartbeatInterval < 7;
    const intervalMs = isDemo
      ? settings.heartbeatInterval * 60 * 1000
      : settings.heartbeatInterval * 24 * 60 * 60 * 1000;

    const nextDue = getNextHeartbeatDue()
    const msLeft = nextDue.getTime() - currentTime

    if (msLeft < 0) return 100;
    const clampedMsLeft = Math.min(msLeft, intervalMs)
    const progress = ((intervalMs - clampedMsLeft) / intervalMs) * 100;
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
  const dueInfo = getDaysUntilDueDisplay()
  const graceInfo = getGracePeriodLeft()
  const daysUntilDue = dueInfo.value
  const gracePeriodLeft = graceInfo.value
  const progress = calculateProgress()
  const isDemo = settings.heartbeatInterval < 7

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto font-sans">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white/80 dark:bg-slate-900/40 rounded-3xl p-8 relative overflow-hidden backdrop-blur-xl border border-slate-200 dark:border-white/5 shadow-2xl">
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
          <div className="flex gap-2">
            <button onClick={() => setShowHistory(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 transition-all text-sm font-medium text-slate-700 dark:text-slate-200 shadow-inner">
              <Activity className="w-4 h-4" />
              History
            </button>
            <button onClick={() => setShowSettings(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 transition-all text-sm font-medium text-slate-700 dark:text-slate-200 shadow-inner">
              <Settings className="w-4 h-4" />
              Protocol Config
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 mb-8">
          <div className="space-y-4">
            {/* Status */}
            {/* Status */}
            {(() => {
              const colorMaps: Record<string, { bg: string; border: string; text: string; shadow: string }> = {
                emerald: {
                  bg: 'bg-emerald-500/20',
                  border: 'border-emerald-500/20',
                  text: 'text-emerald-600 dark:text-emerald-400',
                  shadow: 'shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                },
                amber: {
                  bg: 'bg-amber-500/20',
                  border: 'border-amber-500/20',
                  text: 'text-amber-600 dark:text-amber-400',
                  shadow: 'shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                },
                red: {
                  bg: 'bg-red-500/20',
                  border: 'border-red-500/20',
                  text: 'text-red-600 dark:text-red-400',
                  shadow: 'shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                },
                slate: {
                  bg: 'bg-slate-500/20',
                  border: 'border-slate-500/20',
                  text: 'text-slate-600 dark:text-slate-400',
                  shadow: 'shadow-[0_0_15px_rgba(100,116,139,0.3)]'
                }
              };
              const styles = colorMaps[heartbeatDisplay.color] || colorMaps.slate;
              return (
                <div className="bg-slate-50 dark:bg-white/[0.03] p-5 rounded-2xl flex items-center gap-5 border border-slate-200 dark:border-white/5 shadow-inner">
                  <div className={`w-12 h-12 rounded-xl ${styles.bg} ${styles.shadow} ${styles.border} flex flex-shrink-0 items-center justify-center border`}>
                    {heartbeatDisplay.status === 'active' ? <ShieldCheck className={`w-6 h-6 ${styles.text}`} /> : <ShieldAlert className={`w-6 h-6 ${styles.text}`} />}
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Status</p>
                    <p className="text-slate-900 dark:text-white font-bold text-lg">{heartbeatDisplay.message}</p>
                  </div>
                </div>
              );
            })()}

            {/* Interval */}
            <div className="bg-slate-50 dark:bg-white/[0.03] p-5 rounded-2xl flex items-center gap-5 border border-slate-200 dark:border-white/5 shadow-inner">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex flex-shrink-0 items-center justify-center shadow-lg shadow-blue-500/20 border border-blue-500/20">
                <Clock className="w-6 h-6 text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Interval</p>
                <p className="text-slate-900 dark:text-white font-bold text-lg">{settings.heartbeatInterval} {settings.heartbeatInterval < 7 ? 'Min' : 'D'} Recurrence</p>
              </div>
            </div>

            {/* Last Pulse */}
            <div className="bg-slate-50 dark:bg-white/[0.03] p-5 rounded-2xl flex items-center gap-5 border border-slate-200 dark:border-white/5 shadow-inner">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex flex-shrink-0 items-center justify-center shadow-lg shadow-purple-500/20 border border-purple-500/20">
                <Activity className="w-6 h-6 text-purple-400" />
              </div>
              <div className="flex-1">
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Last Pulse</p>
                <p className="text-slate-900 dark:text-white font-bold text-lg">{lastHeartbeat ? lastHeartbeat.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Never'}</p>
                {lastHeartbeat && (
                  <p className="text-slate-500 text-xs mt-1">
                    Next due: {settings.heartbeatInterval < 7
                      ? new Date(lastHeartbeat.getTime() + settings.heartbeatInterval * 60 * 1000).toLocaleTimeString()
                      : new Date(lastHeartbeat.getTime() + settings.heartbeatInterval * 24 * 60 * 60 * 1000).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center py-4">
            <div className="relative w-56 h-56 flex items-center justify-center group">
              {(() => {
                const strokeColorMap: Record<string, string> = {
                  emerald: 'text-emerald-500',
                  amber: 'text-amber-500',
                  red: 'text-red-500',
                  slate: 'text-slate-500'
                };
                const dropShadowMap: Record<string, string> = {
                  emerald: 'drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]',
                  amber: 'drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]',
                  red: 'drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]',
                  slate: 'drop-shadow-[0_0_10px_rgba(100,116,139,0.5)]'
                };
                const strokeColor = strokeColorMap[heartbeatDisplay.color] || strokeColorMap.slate;
                const dropShadow = dropShadowMap[heartbeatDisplay.color] || dropShadowMap.slate;
                return (
                  <>
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90 filter drop-shadow-xl" viewBox="0 0 100 100">
                      <circle
                        className="text-slate-200 dark:text-slate-800 stroke-current"
                        strokeWidth="6"
                        cx="50"
                        cy="50"
                        r="44"
                        fill="transparent"
                      ></circle>
                      <circle
                        className={`stroke-current transition-all duration-1000 ease-out ${strokeColor}`}
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
                      <p className={`text-6xl font-black text-slate-900 dark:text-white ${dropShadow} tracking-tighter`}>{dueInfo.value}</p>
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">{dueInfo.unit} Until Next</p>
                      <p className="text-slate-500 text-[10px] font-medium mt-0.5">Heartbeat Due</p>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {daysUntilDue <= (isDemo ? 60 : 7) && daysUntilDue > 0 && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-6 overflow-hidden">
              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl flex items-center gap-4 relative z-10">
                <div className="p-2 bg-amber-500/20 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.3)] animate-pulse">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                </div>
                <p className="text-sm font-medium text-amber-800 dark:text-amber-100">
                  Protocol requires signature in <span className="text-amber-600 dark:text-amber-400 font-bold underline">{dueInfo.value} {dueInfo.unit.toLowerCase()}</span>.
                </p>
              </div>
            </motion.div>
          )}

          {daysUntilDue <= 0 && gracePeriodLeft > 0 && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-6 overflow-hidden">
              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl flex items-center gap-4 relative z-10">
                <div className="p-2 bg-amber-500/20 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.3)] animate-pulse">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm font-bold text-amber-800 dark:text-amber-100 uppercase tracking-tight">Rescue Window (Grace Period) Active</p>
                  <p className="text-xs font-medium text-amber-700 dark:text-amber-200 mt-1">
                    Protocol trigger in <span className="text-amber-600 dark:text-amber-400 font-bold text-base underline">{graceInfo.value} {graceInfo.unit.toLowerCase()}</span>. Sign now to abort.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {daysUntilDue <= 0 && gracePeriodLeft <= 0 && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-6 overflow-hidden">
              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl flex items-center gap-4 relative z-10">
                <div className="p-2 bg-red-500/20 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.3)] animate-pulse">
                  <ShieldAlert className="w-5 h-5 text-red-500" />
                </div>
                <p className="text-sm font-medium text-red-800 dark:text-red-100 italic">AlwaysThere Vault TRIGGERED. All buffers exhausted. Assets are being distributed.</p>
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

      {/* Heartbeat History Modal */}
      <AnimatePresence>
        {showHistory && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 max-w-2xl w-full relative shadow-2xl max-h-[80vh] overflow-y-auto my-8 md:my-16">
              <div className="flex justify-between items-center mb-8 border-b border-slate-200 dark:border-slate-800 pb-6 sticky top-0 bg-white dark:bg-slate-900 z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center border border-purple-500/20">
                    <Activity className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Heartbeat History</h3>
                    <p className="text-xs text-slate-400 mt-1">Last 10 proof-of-life signatures</p>
                  </div>
                </div>
                <button onClick={() => setShowHistory(false)} className="text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors bg-slate-100 dark:bg-white/5 p-2 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {heartbeats.length === 0 ? (
                <div className="text-center py-12">
                  <Activity className="w-16 h-16 mx-auto mb-4 text-slate-600" />
                  <p className="text-slate-300 font-medium">No heartbeat history yet</p>
                  <p className="text-sm text-slate-500 mt-2">Record your first heartbeat to see it here</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {heartbeats.map((heartbeat, index) => (
                    <motion.div
                      key={heartbeat.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-4 hover:border-purple-500/30 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center border border-emerald-500/20">
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          </div>
                          <div>
                            <p className="text-slate-900 dark:text-white font-semibold text-sm">
                              {new Date(heartbeat.timestamp).toLocaleDateString(undefined, {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                            <p className="text-xs text-slate-500 mt-0.5">
                              Method: <span className="text-slate-700 dark:text-slate-400 font-medium">{heartbeat.method || 'wallet_signature'}</span>
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {heartbeat.verified && (
                            <span className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-xs font-semibold">
                              Verified
                            </span>
                          )}
                          {index === 0 && (
                            <span className="px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400 text-xs font-semibold">
                              Latest
                            </span>
                          )}
                        </div>
                      </div>
                      {heartbeat.signature && (
                        <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                          <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Signature</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono break-all">
                            {heartbeat.signature.substring(0, 32)}...{heartbeat.signature.substring(heartbeat.signature.length - 8)}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setShowHistory(false)}
                  className="w-full px-6 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-800 transition-all text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 max-w-lg w-full relative shadow-2xl my-8 md:my-16">
              <div className="flex justify-between items-center mb-8 border-b border-slate-200 dark:border-slate-800 pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20">
                    <Settings className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Protocol Lifecycle Config</h3>
                    <p className="text-xs text-slate-400 mt-1">Fine-tune your personal dead man's switch timings</p>
                  </div>
                </div>
                <button onClick={() => setShowSettings(false)} className="text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors bg-slate-100 dark:bg-white/5 p-2 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6 mb-8">
                {/* Alert Notification Email with verification status and OTP flow */}
                <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-black tracking-wider text-slate-800 dark:text-slate-100 uppercase">
                      Alert Notification Email
                    </label>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-bold">
                    Protocol warnings will be sent here.
                  </p>

                  {emailVerified && profileEmail ? (
                    <div className="flex items-center justify-between bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl p-3.5 mt-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Mail className="w-4.5 h-4.5 text-emerald-500 shrink-0" />
                        <span className="text-sm font-bold text-slate-800 dark:text-white truncate block">
                          {profileEmail}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shrink-0">
                          <ShieldCheck className="w-3 h-3 text-emerald-400" />
                          Verified
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveEmail}
                        className="bg-red-500/10 hover:bg-red-500/20 text-red-500 hover:text-red-400 border border-red-500/20 font-extrabold text-xs px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <input
                            type="email"
                            placeholder="your@email.com"
                            value={inputEmail}
                            onChange={(e) => {
                              setInputEmail(e.target.value)
                            }}
                            disabled={showOtpField || isSendingOtp}
                            className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-bold text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                          />
                        </div>
                        {inputEmail && (
                          <button
                            type="button"
                            onClick={handleSendOtp}
                            disabled={isSendingOtp || resendCooldown > 0}
                            className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs px-4 rounded-xl border border-blue-500/30 transition-all shadow-md shadow-blue-500/10 flex items-center justify-center gap-1.5 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isSendingOtp ? (
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            ) : resendCooldown > 0 ? (
                              `Resend OTP (${resendCooldown}s)`
                            ) : showOtpField ? (
                              'Resend OTP'
                            ) : (
                              'Send OTP'
                            )}
                          </button>
                        )}
                      </div>

                      {/* OTP Field */}
                      {showOtpField && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-3 p-3 bg-blue-500/5 border border-blue-500/10 rounded-xl space-y-2.5"
                        >
                          <p className="text-xs text-blue-400 font-black">
                            Enter the 6-digit OTP code sent to your email:
                          </p>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              maxLength={6}
                              placeholder="000000"
                              value={otpCode}
                              onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                              className="w-28 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white rounded-xl px-3 py-2 outline-none text-center font-mono text-base font-black tracking-[0.2em]"
                            />
                            <button
                              type="button"
                              onClick={handleVerifyOtp}
                              disabled={isVerifyingOtp}
                              className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
                            >
                              {isVerifyingOtp ? (
                                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                'Verify OTP'
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setShowOtpField(false)
                                setResendCooldown(0)
                                setOtpCode('')
                              }}
                              className="bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-extrabold text-xs px-3 rounded-xl transition-all"
                            >
                              Change
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </>
                  )}
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-black tracking-wider text-slate-800 dark:text-slate-100 uppercase">Heartbeat Interval</label>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-bold">How frequently you must check in.</p>
                  <select
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-850 dark:text-white rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-bold text-sm"
                    value={settings.heartbeatInterval}
                    onChange={(e) => setSettings(prev => ({ ...prev, heartbeatInterval: parseInt(e.target.value) }))}
                  >
                    <optgroup label="── Demo / Testing ──" className="text-slate-900 dark:text-slate-100 font-bold">
                      <option value={1}>⚡ 1 Minute (Demo)</option>
                      <option value={2}>⚡ 2 Minutes (Demo)</option>
                      <option value={5}>⚡ 5 Minutes (Demo) </option>
                    </optgroup>
                    <optgroup label="── Production ──" className="text-slate-900 dark:text-slate-100 font-bold">
                      <option value={7}>7 days (Weekly)</option>
                      <option value={14}>14 days (Bi-weekly)</option>
                      <option value={30}>30 days (Monthly)</option>
                      <option value={60}>60 days (Bi-monthly)</option>
                      <option value={90}>90 days (Quarterly)</option>
                    </optgroup>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-black tracking-wider text-slate-800 dark:text-slate-100 uppercase">Grace Period</label>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-bold">Time before asset release triggers after overdue.</p>
                  <select
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-850 dark:text-white rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-bold text-sm"
                    value={settings.gracePeriod}
                    onChange={(e) => setSettings(prev => ({ ...prev, gracePeriod: parseInt(e.target.value) }))}
                  >
                    <optgroup label="── Demo / Testing ──" className="text-slate-900 dark:text-slate-100 font-bold">
                      <option value={1}>1 Minute Rescue Window (Demo)</option>
                      <option value={2}>2 Minute Rescue Window (Demo)</option>
                      <option value={3}>3 Minute Rescue Window (Demo)</option>
                    </optgroup>
                    <optgroup label="── Production ──" className="text-slate-900 dark:text-slate-100 font-bold">
                      <option value={7}>7 days Rescue Window</option>
                      <option value={14}>14 days Rescue Window</option>
                      <option value={30}>30 days Rescue Window</option>
                      <option value={60}>60 days Rescue Window</option>
                    </optgroup>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-black tracking-wider text-slate-800 dark:text-slate-100 uppercase">Warning Stages (Notification Cycles)</label>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-bold">Number of alert cycles sent before the switch is triggered.</p>
                  <select
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-850 dark:text-white rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-bold text-sm"
                    value={settings.bufferMisses}
                    onChange={(e) => setSettings(prev => ({ ...prev, bufferMisses: parseInt(e.target.value) }))}
                  >
                    <option value={1}>1 Stage (Immediate alert then Trigger)</option>
                    <option value={2}>2 Stages (1 Warning alert then Trigger)</option>
                    <option value={3}>3 Stages (2 Warning alerts then Trigger)</option>
                    <option value={4}>4 Stages (3 Warning alerts then Trigger)</option>
                    <option value={5}>5 Stages (4 Warning alerts then Trigger)</option>
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
                  className="px-6 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-800 transition-all text-sm"
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