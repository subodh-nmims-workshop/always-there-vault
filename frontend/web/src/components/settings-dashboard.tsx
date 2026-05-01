'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
    Globe, 
    Shield, 
    Wallet, 
    Zap, 
    Fingerprint, 
    Lock, 
    ShieldCheck, 
    AlertOctagon, 
    Crown, 
    User, 
    ExternalLink, 
    Copy, 
    Check, 
    LogOut,
    Eye,
    Key,
    Database,
    HelpCircle,
    Bell,
    Clock,
    Users,
    Activity,
    Settings,
    FileText,
    Share2,
    Cpu,
    Trash2,
    ChevronRight,
    RefreshCw,
    MessageSquare,
    Send,
    Terminal
} from 'lucide-react'
import { translations, Language, getLanguage, setLanguage, subscribeI18n } from '@/utils/i18n'
import WebStorageService, { AppState } from '@/lib/storage'
import { UpgradeModal } from '@/components/upgrade-modal'
import { toast } from 'sonner'

import { useSubscription } from '@/contexts/SubscriptionContext'

export function SettingsDashboard() {
  const [lang, setLang] = useState<Language>('en')
  const [t, setT] = useState<any>(translations.en)
  const [appState, setAppState] = useState<AppState | null>(null)
  const [walletAddress, setWalletAddress] = useState('')
  const [copied, setCopied] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  const { subscription } = useSubscription()
  const storage = WebStorageService.getInstance()

  useEffect(() => {
    const currentLang = getLanguage()
    setLang(currentLang)
    setT(translations[currentLang] || translations.en)

    const addr = localStorage.getItem('dwp_wallet_address') || '0x0000000000000000000000000000000000000000'
    setWalletAddress(addr)

    const loadState = async () => {
        const state = await storage.getAppState()
        setAppState(state)
    }

    loadState()

    const unsubscribe = subscribeI18n(() => {
      const newLang = getLanguage()
      setLang(newLang)
      setT(translations[newLang] || translations.en)
    })
    
    return unsubscribe
}, [])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const updateSetting = async (key: keyof AppState['settings'], value: any) => {
    setIsUpdating(true)
    storage.saveSettings({ [key]: value })
    const newState = await storage.getAppState()
    setAppState(newState)
    setTimeout(() => setIsUpdating(false), 500)
  }

  const heartbeatDaysLeft = useMemo(() => {
    if (!appState) return 0
    const last = appState.stats.lastHeartbeat || Date.now()
    const interval = appState.settings.heartbeatInterval || 7
    const nextDue = last + (interval * 24 * 60 * 60 * 1000)
    const diff = nextDue - Date.now()
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
  }, [appState])

  const handleUpgrade = async (method: 'PAYPAL' | 'CRYPTO') => {
    setIsProcessingPayment(true)
    toast.info(`Processing ${method} payment...`)
    
    try {
        // Simulate API call to backend
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/payment/process', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                walletAddress,
                method,
                planId: 'premium',
                reference: method === 'PAYPAL' ? 'PAY-67890' : '0xabc123...'
            })
        })

        if (response.ok) {
            toast.success("Payment Successful! Premium Features Unlocked.")
            setShowUpgradeModal(false)
            // Reload state
            const newState = await storage.getAppState()
            setAppState(newState)
            window.location.reload()
        } else {
            throw new Error("Payment failed")
        }
    } catch (e) {
        toast.error("Payment failed. Please try again.")
    } finally {
        setIsProcessingPayment(false)
    }
  }

  const totalUsedBytes = useMemo(() => {
      if (!appState) return 0
      return appState.assets.reduce((acc, asset) => acc + (asset.size || 0), 0)
  }, [appState])

  const isPremium = subscription?.plan === 'professional'
  const quotaBytes = isPremium ? 5 * 1024 * 1024 * 1024 : 0.5 * 1024 * 1024 * 1024
  const quotaGB = isPremium ? 5 : 0.5
  const usagePercent = Math.min((totalUsedBytes / quotaBytes) * 100, 100)
  const isTrial = subscription?.status === 'trial'

  if (!appState) return <div className="p-8 text-center text-slate-500 font-mono">INITIALIZING KERNEL...</div>

  return (
    <div className="max-w-5xl mx-auto space-y-12 p-4 pb-24">
      {/* -- PAGE HEADER -- */}
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-white tracking-tighter flex items-center gap-3">
            <Settings className="size-8 text-blue-500" />
            PROTOCOL SETTINGS
        </h1>
        <p className="text-slate-500 font-medium">Configure global parameters for the AlwaysThere decentralized digital will protocol.</p>
      </div>

      {/* -- SECTION: ACCOUNT -- */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-white/5 pb-2">
            <User className="size-5 text-slate-400" />
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Account</h2>
        </div>
        
        <Card className="bg-slate-900/50 border-slate-800 shadow-xl overflow-hidden">
            <CardContent className="p-6">
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 w-full">
                    <div className="flex items-center gap-6">
                        <div className="size-16 shrink-0 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-500 p-0.5">
                            <div className="size-full bg-slate-950 rounded-[14px] flex items-center justify-center text-blue-400 font-black">
                                {walletAddress.substring(2, 4).toUpperCase()}
                            </div>
                        </div>
                        <div className="space-y-1 text-left">
                            <div className="flex items-center justify-start gap-2">
                                <span className="text-white font-mono font-bold break-all">{walletAddress}</span>
                                <button onClick={copyToClipboard} className="text-slate-500 hover:text-white transition-colors shrink-0">
                                    {copied ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
                                </button>
                            </div>
                            <div className="flex flex-wrap items-center justify-start gap-3">
                                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-md">
                                    <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter">Ethereum Mainnet</span>
                                </div>
                                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter">Protocol Version v1.0.0</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 mt-4 xl:mt-0 w-full xl:w-auto">
                        <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 text-xs font-bold gap-2 whitespace-nowrap flex-1 sm:flex-none">
                            <Key className="size-3" /> Export Key
                        </Button>
                        <Button variant="outline" className="bg-red-500/10 border-red-500/20 hover:bg-red-500/20 text-red-400 text-xs font-bold gap-2 whitespace-nowrap flex-1 sm:flex-none">
                            <LogOut className="size-3" /> Disconnect
                        </Button>
                        {!isPremium && (
                            <Button 
                                onClick={() => setShowUpgradeModal(true)}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-[10px] uppercase h-10 rounded-xl shadow-lg shadow-blue-500/20 whitespace-nowrap flex-1 sm:flex-none"
                            >
                                <Crown className="size-3 mr-2" /> Upgrade to Premium
                            </Button>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
      </section>

      {/* -- SECTION: SUBSCRIPTION -- */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-white/5 pb-2">
            <Database className="size-5 text-indigo-400" />
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Subscription Status</h2>
        </div>
        
        <Card className="bg-slate-900/40 border-slate-800">
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-black text-white">{quotaGB.toFixed(2)} GB Total Quota</span>
                            <span className={`px-2 py-0.5 rounded border text-[8px] font-black uppercase tracking-widest ${isPremium ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : isTrial ? 'bg-orange-500/10 border-orange-500/20 text-orange-400' : 'bg-slate-500/10 border-slate-500/20 text-slate-400'}`}>
                                {isPremium ? 'Premium Active' : isTrial ? 'Trial Active' : 'Free Tier'}
                            </span>
                        </div>
                        <p className="text-xs text-slate-500">
                            {subscription?.subscriptionEndsAt 
                                ? `Expiring on: **${new Date(subscription.subscriptionEndsAt).toLocaleDateString()}**` 
                                : 'No expiry set'} (Automatic Fail-Safe Enabled)
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="text-xl font-black text-white">{usagePercent.toFixed(2)}%</div>
                        <div className="text-[10px] font-bold text-slate-600 uppercase">Usage</div>
                    </div>
                </div>
                <div className="mt-4 w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                        className={`h-full shadow-[0_0_10px_rgba(59,130,246,0.5)] ${usagePercent > 90 ? 'bg-red-500' : usagePercent > 75 ? 'bg-orange-500' : 'bg-blue-500'}`} 
                        style={{ width: `${Math.max(usagePercent, 0.5)}%` }}
                    />
                </div>
                <div className="mt-2 text-right">
                    <span className="text-[10px] text-slate-500 font-mono">{(totalUsedBytes / (1024 * 1024)).toFixed(2)} MB / {quotaGB * 1024} MB</span>
                </div>
            </CardContent>
        </Card>
      </section>

      {/* -- SECTION: AlwaysThere CORE -- */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-white/5 pb-4">
          <Shield className="w-5 h-5 text-[#2b52ff]" />
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">AlwaysThere Core</h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/[0.02] border-white/10 backdrop-blur-xl">
                <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                        <Clock className="size-4 text-blue-400" />
                        Heartbeat Parameters
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Heartbeat Interval</label>
                                <span className="text-blue-400 font-mono font-bold text-sm">{appState.settings.heartbeatInterval} Days</span>
                            </div>
                            <input 
                                type="range" min="1" max="90" 
                                value={appState.settings.heartbeatInterval}
                                onChange={(e) => updateSetting('heartbeatInterval', parseInt(e.target.value))}
                                className="w-full h-1.5 bg-slate-800 rounded-full appearance-none cursor-pointer accent-blue-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Grace Period</label>
                                <span className="text-orange-400 font-mono font-bold text-sm">{appState.settings.gracePeriod} Days</span>
                            </div>
                            <input 
                                type="range" min="1" max="60" 
                                value={appState.settings.gracePeriod}
                                onChange={(e) => updateSetting('gracePeriod', parseInt(e.target.value))}
                                className="w-full h-1.5 bg-slate-800 rounded-full appearance-none cursor-pointer accent-orange-500"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border-blue-500/20 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Zap className="size-24 -mr-8 -mt-8 text-blue-400" />
                </div>
                <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                        <Activity className="size-4 text-blue-400" />
                        Live Status
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 relative z-10">
                    <div className="flex items-center justify-between p-4 bg-slate-950/40 rounded-2xl border border-white/5">
                        <div className="space-y-1">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Protocol Integrity</span>
                            <div className="text-xl font-black text-white">{heartbeatDaysLeft} Days Remaining</div>
                            <p className="text-[10px] text-slate-500 font-medium">Until beneficiary execution trigger</p>
                        </div>
                        <Button className="bg-blue-600 hover:bg-blue-500 text-white font-black text-xs px-4 h-10 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                            SEND PULSE
                        </Button>
                    </div>
                    <div className="flex justify-between px-2">
                        <div className="text-center">
                            <div className="text-xs font-mono font-bold text-slate-400">APR 19, 2026</div>
                            <div className="text-[8px] font-black text-slate-600 uppercase tracking-tighter">Last Heartbeat</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xs font-mono font-bold text-slate-400">APR 26, 2026</div>
                            <div className="text-[8px] font-black text-slate-600 uppercase tracking-tighter">Next Due</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
      </section>

      {/* -- SECTION: BENEFICIARIES -- */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-white/5 pb-2">
            <Users className="size-5 text-emerald-400" />
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Beneficiary Registry</h2>
        </div>

        <Card className="bg-white/[0.02] border-white/10">
            <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h3 className="text-white font-bold">Distribution Summary</h3>
                        <p className="text-xs text-slate-500">Currently mapping {appState.stats.totalBeneficiaries} unique addresses.</p>
                    </div>
                    <Button variant="ghost" className="text-blue-400 hover:text-blue-300 font-bold text-xs gap-1">
                        Manage Registry <ChevronRight className="size-3" />
                    </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {appState.beneficiaries.slice(0, 3).map((ben, idx) => (
                        <div key={idx} className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center gap-3">
                            <div className="size-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-xs font-bold">
                                {idx + 1}
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <div className="text-white text-xs font-bold truncate">{ben.name}</div>
                                <div className="text-[10px] text-slate-500 font-mono truncate">{ben.walletAddress}</div>
                            </div>
                        </div>
                    ))}
                    {appState.beneficiaries.length === 0 && (
                        <div className="md:col-span-3 p-8 text-center text-slate-600 font-mono text-xs border-2 border-dashed border-white/5 rounded-2xl">
                            NO BENEFICIARIES MAPPED IN THIS VAULT
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
      </section>

      {/* -- SECTION: SECURITY -- */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-white/5 pb-2">
            <ShieldCheck className="size-5 text-orange-400" />
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Security & Trust</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/[0.02] border-white/10">
                <CardContent className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <div className="text-sm font-bold text-white flex items-center gap-2">
                                <Clock className="size-3.5 text-slate-500" />
                                Execution Time Lock
                            </div>
                            <p className="text-[10px] text-slate-500 uppercase font-black">Delay before assets release</p>
                        </div>
                        <select 
                            value={appState.settings.timeLock}
                            onChange={(e) => updateSetting('timeLock', parseInt(e.target.value))}
                            className="bg-slate-950 border border-white/10 rounded-lg text-xs font-bold text-white px-3 py-1.5 outline-none"
                        >
                            <option value={0}>Instant</option>
                            <option value={24}>24 Hours</option>
                            <option value={48}>48 Hours</option>
                            <option value={168}>7 Days</option>
                        </select>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <div className="text-sm font-bold text-white flex items-center gap-2">
                                <Share2 className="size-3.5 text-slate-500" />
                                Multi-Sig Distribution
                            </div>
                            <p className="text-[10px] text-slate-500 uppercase font-black">Required shares for decryption</p>
                        </div>
                        <select 
                            value={appState.settings.multiSig}
                            onChange={(e) => updateSetting('multiSig', e.target.value)}
                            className="bg-slate-950 border border-white/10 rounded-lg text-xs font-bold text-white px-3 py-1.5 outline-none"
                        >
                            <option value="off">Disabled</option>
                            <option value="2of3">2 of 3 Shards</option>
                            <option value="3of5">3 of 5 Shards</option>
                        </select>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-white/[0.02] border-white/10">
                <CardContent className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <div className="text-sm font-bold text-white flex items-center gap-2">
                                <Fingerprint className="size-3.5 text-slate-500" />
                                Biometric Verification
                            </div>
                        </div>
                        <div className="w-10 h-5 bg-slate-800 rounded-full p-1 cursor-not-allowed opacity-50">
                            <div className="size-3 bg-slate-600 rounded-full" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <div className="text-sm font-bold text-white flex items-center gap-2">
                                <Lock className="size-3.5 text-slate-500" />
                                Session Timeout
                            </div>
                        </div>
                        <select 
                            value={appState.settings.sessionTimeout}
                            onChange={(e) => updateSetting('sessionTimeout', parseInt(e.target.value))}
                            className="bg-slate-950 border border-white/10 rounded-lg text-xs font-bold text-white px-3 py-1.5 outline-none"
                        >
                            <option value={15}>15 Mins</option>
                            <option value={30}>30 Mins</option>
                            <option value={60}>1 Hour</option>
                        </select>
                    </div>
                </CardContent>
            </Card>
        </div>
      </section>

      {/* -- SECTION: NOTIFICATIONS -- */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-white/5 pb-2">
            <Bell className="size-5 text-purple-400" />
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Notifications</h2>
        </div>

        <Card className="bg-white/[0.02] border-white/10">
            <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <MessageSquare className="size-3" /> Email Alerts (Verification Required)
                            </label>
                            <div className="flex gap-2">
                                <input 
                                    type="email" 
                                    placeholder="Enter backup email"
                                    value={appState.settings.emailNotification}
                                    onChange={(e) => updateSetting('emailNotification', e.target.value)}
                                    className="flex-1 bg-slate-950 border border-white/5 rounded-xl px-4 py-2 text-sm font-medium text-white outline-none focus:border-blue-500/50 transition-colors"
                                />
                                <Button className="bg-white/5 hover:bg-white/10 text-[10px] font-black px-4 h-10 rounded-xl">VERIFY</Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <Send className="size-3" /> Telegram Bot
                            </label>
                            <Button variant="outline" className="w-full bg-slate-950 border-white/5 text-blue-400 text-xs font-bold gap-2 rounded-xl py-5">
                                CONNECT TO AlwaysThere_BOT
                            </Button>
                        </div>
                    </div>

                    <div className="bg-purple-600/5 rounded-2xl p-6 border border-purple-500/10 space-y-4">
                        <h4 className="text-xs font-black text-purple-300 uppercase tracking-widest flex items-center gap-2">
                            <Zap className="size-3" /> Web3 Push (EPNS)
                        </h4>
                        <p className="text-[10px] text-purple-200/60 leading-relaxed">
                            Receive wallet-to-wallet notifications for critical heartbeat warnings and execution alerts via the EPNS protocol.
                        </p>
                        <Button className="w-full bg-purple-600 hover:bg-purple-500 text-white font-black text-xs rounded-xl py-5">
                            ENABLE PUSH CHANNEL
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
      </section>

      {/* -- SECTION: STORAGE -- */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-white/5 pb-2">
            <Database className="size-5 text-indigo-400" />
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Decentralized Storage</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
                onClick={() => updateSetting('storageProvider', 'ipfs')}
                className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex gap-4 ${appState.settings.storageProvider === 'ipfs' ? 'bg-blue-600/10 border-blue-600 shadow-[0_0_30px_rgba(37,99,235,0.1)]' : 'bg-white/[0.02] border-white/5 hover:border-white/20'}`}
            >
                <div className={`size-12 rounded-2xl flex items-center justify-center ${appState.settings.storageProvider === 'ipfs' ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-500'}`}>
                    <Globe className="size-6" />
                </div>
                <div className="flex-1 space-y-1">
                    <h3 className="text-white font-black text-sm">IPFS / Filecoin</h3>
                    <p className="text-[10px] text-slate-500 leading-tight">Distributed content-addressed storage. Fast & resilient.</p>
                    {appState.settings.storageProvider === 'ipfs' && (
                        <div className="text-[8px] font-black text-blue-400 uppercase tracking-widest mt-2">ACTIVE PRIMARY</div>
                    )}
                </div>
            </div>

            <div 
                onClick={() => updateSetting('storageProvider', 'arweave')}
                className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex gap-4 ${appState.settings.storageProvider === 'arweave' ? 'bg-amber-600/10 border-amber-600 shadow-[0_0_30px_rgba(217,119,6,0.1)]' : 'bg-white/[0.02] border-white/5 hover:border-white/20'}`}
            >
                <div className={`size-12 rounded-2xl flex items-center justify-center ${appState.settings.storageProvider === 'arweave' ? 'bg-amber-500 text-white' : 'bg-slate-800 text-slate-500'}`}>
                    <Database className="size-6" />
                </div>
                <div className="flex-1 space-y-1">
                    <h3 className="text-white font-black text-sm">Arweave (Permanent)</h3>
                    <p className="text-[10px] text-slate-500 leading-tight">Pay once, store forever. Immutable blockchain storage.</p>
                    {appState.settings.storageProvider === 'arweave' && (
                        <div className="text-[8px] font-black text-amber-400 uppercase tracking-widest mt-2">ACTIVE PRIMARY</div>
                    )}
                </div>
            </div>
        </div>
      </section>

      {/* -- SECTION: ADVANCED -- */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-white/5 pb-2">
            <Cpu className="size-5 text-slate-400" />
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Advanced Engine</h2>
        </div>

        <Card className="bg-white/[0.02] border-white/10">
            <CardContent className="p-6 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <div className="text-xs font-bold text-white uppercase tracking-tighter">Gas Settings</div>
                                <p className="text-[10px] text-slate-500">Auto-calculated execution costs</p>
                            </div>
                            <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-lg border border-white/5">
                                <button 
                                    onClick={() => updateSetting('gasPrice', 'auto')}
                                    className={`px-3 py-1 rounded-md text-[10px] font-black uppercase transition-colors ${appState.settings.gasPrice === 'auto' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                                >
                                    AUTO
                                </button>
                                <button 
                                    onClick={() => updateSetting('gasPrice', 50)}
                                    className={`px-3 py-1 rounded-md text-[10px] font-black uppercase transition-colors ${appState.settings.gasPrice !== 'auto' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                                >
                                    MANUAL
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <div className="text-xs font-bold text-white uppercase tracking-tighter">Testnet Mode</div>
                                <p className="text-[10px] text-slate-500">Enable Sepolia / Mumbai support</p>
                            </div>
                            <div 
                                className={`w-10 h-5 rounded-full p-1 cursor-pointer transition-colors ${appState.settings.testnetMode ? 'bg-blue-600' : 'bg-slate-800'}`}
                                onClick={() => updateSetting('testnetMode', !appState.settings.testnetMode)}
                            >
                                <div className={`size-3 bg-white rounded-full transition-transform ${appState.settings.testnetMode ? 'translate-x-5' : 'translate-x-0'}`} />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Button className="w-full bg-slate-950 border border-blue-500/20 hover:border-blue-500/40 text-blue-400 text-xs font-bold gap-3 rounded-2xl py-6 group">
                            <Terminal className="size-4 group-hover:scale-110 transition-transform" />
                            SIMULATE EXECUTION (DRY RUN)
                        </Button>
                        <div className="grid grid-cols-2 gap-3">
                            <Button variant="outline" className="bg-white/5 border-white/5 hover:bg-white/10 text-[10px] font-black tracking-widest rounded-xl py-5">
                                VIEW AUDIT LOG
                            </Button>
                            <Button variant="outline" className="bg-white/5 border-white/5 hover:bg-white/10 text-[10px] font-black tracking-widest rounded-xl py-5">
                                JSON CONFIG
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
      </section>

      {/* -- SECTION: DANGER ZONE -- */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-red-500/20 pb-2">
            <AlertOctagon className="size-5 text-red-500" />
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-red-400/60">Danger Zone</h2>
        </div>

        <Card className="bg-red-500/[0.02] border-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.05)]">
            <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-1 text-center md:text-left">
                        <h3 className="text-red-400 font-black text-base uppercase">Revoke Protocol Instance</h3>
                        <p className="text-xs text-red-400/40 font-medium">This will permanently delete all encrypted shards and stop the switch switch. This action is irreversible.</p>
                    </div>
                    <Button variant="destructive" className="bg-red-600 hover:bg-red-500 text-white font-black text-xs px-8 h-12 rounded-2xl shadow-lg shadow-red-600/20 uppercase tracking-widest">
                        DELETE WILL
                    </Button>
                </div>
            </CardContent>
        </Card>
      </section>

      {/* -- STICKY SAVE STATUS -- */}
      <AnimatePresence>
          {isUpdating && (
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 z-50 border border-blue-400/30"
              >
                  <RefreshCw className="size-4 animate-spin" />
                  <span className="text-xs font-black uppercase tracking-widest">Syncing Kernel Config...</span>
              </motion.div>
          )}
      </AnimatePresence>

      <UpgradeModal 
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        onUpgrade={handleUpgrade}
      />
    </div>
  )
}
