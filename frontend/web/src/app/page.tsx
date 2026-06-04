'use client'

import React, { useState, useEffect } from 'react'
import { 
  Shield, 
  Lock, 
  Users, 
  Zap, 
  ArrowRight, 
  Database, 
  Heart, 
  Globe, 
  ChevronRight,
  ShieldCheck,
  Timer,
  Cpu,
  RefreshCw,
  Server,
  KeyRound,
  LineChart,
  BookOpen,
  Mail,
  Smartphone,
  HardDrive,
  Target,
  FileSearch,
  Scale,
  Award,
  Fingerprint,
  Layers,
  Network,
  HelpCircle,
  Cloud,
  CheckCircle2,
  AlertTriangle,
  History,
  Info
} from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useAccount, useSignMessage, useDisconnect } from 'wagmi'
import { toast } from 'sonner'

// Components
import { PricingPlans } from '@/components/pricing-plans'
import { SharedFooter } from '@/components/shared-footer'
import { WalletConnectModal } from '@/components/wallet-connect-modal'
import { AssetCreationForm } from '@/components/asset-creation-form'
import { HeartbeatMonitor } from '@/components/heartbeat-monitor'
import { OverviewDashboard } from '@/components/overview-dashboard'
import { BeneficiariesDashboard } from '@/components/beneficiaries-dashboard'
import { BeneficiaryManager } from '@/components/beneficiary-manager'
import { StatusDashboard } from '@/components/status-dashboard'
import { SubscriptionDashboard } from '@/components/subscription-dashboard'
import { ModeIndicator } from '@/components/mode-indicator'
import { TrialBanner } from '@/components/trial-banner'
import { SettingsDashboard } from '@/components/settings-dashboard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ThemeToggle } from '@/components/theme-toggle'

export default function HomePage() {
  const { address: wagmiAddress } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const { disconnect } = useDisconnect()

  const [hasMounted, setHasMounted] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  const [isConnecting, setIsConnecting] = useState(false)
  const [isDevOverride, setIsDevOverride] = useState(false)
  const [showDevModal, setShowDevModal] = useState(false)
  const [devPasscode, setDevPasscode] = useState('')
  const [showWalletModal, setShowWalletModal] = useState(false)

  useEffect(() => {
    setHasMounted(true)
    const storedConnection = localStorage.getItem('dwp_wallet_connected')
    if (storedConnection === 'true') {
      setIsConnected(true)
      setAddress(localStorage.getItem('dwp_wallet_address') || '')
    }
    
    // Check if dev override is active and not expired (5 hours)
    const devExpiry = localStorage.getItem('dwp_dev_override_expiry')
    if (devExpiry && parseInt(devExpiry) > Date.now()) {
      setIsDevOverride(true)
    } else {
      localStorage.removeItem('dwp_dev_override_expiry')
    }
  }, [])

  // Auto-show dev modal when in restricted mode
  useEffect(() => {
    if (isConnected && !isDevOverride) {
      setShowDevModal(true)
    }
  }, [isConnected, isDevOverride])

  const handleConnect = () => setShowWalletModal(true)

  const handleWalletConnect = async (walletAddress: string) => {
    setIsConnecting(true)
    try {
      const apiEndpoint = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7001'
      const nonceRes = await fetch(`${apiEndpoint}/api/auth/nonce`)
      
      if (!nonceRes.ok) {
        throw new Error('Failed to fetch authentication nonce from server')
      }

      const nonceData = await nonceRes.json()
      const message = nonceData?.nonce
      
      if (!message) {
        throw new Error('Server returned an empty authentication message')
      }

      const signature = await signMessageAsync({ message })
      const verifyRes = await fetch(`${apiEndpoint}/api/auth/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress, message, signature })
      })

      if (!verifyRes.ok) {
        const errorData = await verifyRes.json().catch(() => (null))
        let errMsg = 'Identity verification failed';
        if (errorData && errorData.message) {
            errMsg = typeof errorData.message === 'string' ? errorData.message : JSON.stringify(errorData.message);
        } else if (errorData && errorData.error) {
            errMsg = errorData.error;
        }
        throw new Error(errMsg)
      }

      const authData = await verifyRes.json()
      
      if (authData?.token) {
        setIsConnected(true)
        localStorage.setItem('dwp_wallet_connected', 'true')
        localStorage.setItem('dwp_wallet_address', walletAddress)
        localStorage.setItem('dwp_token', authData.token)
        setAddress(walletAddress)
        setShowWalletModal(false)
        toast.success('Authentication successful!')
      } else {
        throw new Error('No authentication token received')
      }
    } catch (error: any) {
      console.warn('Login error:', error)
      toast.error(error.message || 'Login failed')
      
      if (process.env.NODE_ENV === 'development') {
        // Fallback for local dev if backend is down
        setIsConnected(true)
        setAddress(walletAddress)
        localStorage.setItem('dwp_wallet_connected', 'true')
        localStorage.setItem('dwp_wallet_address', walletAddress)
        setShowWalletModal(false)
        toast.info('Development mode: Bypass authentication')
      }
    } finally {
      setIsConnecting(false)
    }
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    disconnect()
    localStorage.clear()
  }

  if (!hasMounted) return <div className="min-h-screen bg-slate-50 dark:bg-[#030712]" />

  if (isConnected && !isDevOverride) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-800 dark:text-slate-100 font-sans flex flex-col overflow-x-hidden relative transition-colors duration-300">
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#030712]/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 px-6 py-4 flex items-center justify-between transition-colors duration-300">
          <Link href="/" className="flex items-center gap-2 group">
            <img src="/logo-simple.png" alt="AlwaysThere Logo" className="h-10 w-auto object-contain group-hover:scale-110 transition-transform duration-300" />
            <div className="flex flex-col text-left">
              <span className="text-xl font-black tracking-wider text-slate-900 dark:text-white leading-none">ALWAYS THERE</span>
              <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-none mt-1.5">SECURE YOUR DIGITAL LEGACY</span>
            </div>
          </Link>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/donate" className="px-5 py-2.5 rounded-xl bg-[#2b52ff]/10 text-[#2b52ff] text-xs font-black border border-[#2b52ff]/20 uppercase tracking-widest hover:bg-[#2b52ff]/20 transition-all">Support Us</Link>
            <button onClick={handleDisconnect} className="px-5 py-2.5 rounded-xl bg-red-500/10 text-red-500 text-xs font-black border border-red-500/20 uppercase tracking-widest hover:bg-red-500/20 transition-all">Logout</button>
          </div>
        </nav>
        <main className="flex-1 max-w-4xl mx-auto w-full p-4 sm:px-6 lg:px-8 space-y-8 mt-16 mb-24">
          
          <div className="relative p-1 rounded-[2.5rem] bg-gradient-to-br from-[#2b52ff]/30 via-purple-500/20 to-transparent overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 animate-pulse" />
            <div className="bg-white/95 dark:bg-[#0a0c12]/95 backdrop-blur-2xl rounded-[2.4rem] p-8 md:p-14 border border-slate-200 dark:border-white/5 relative z-10 text-center space-y-8 shadow-2xl">
              
              <div className="w-24 h-24 bg-red-500/10 rounded-3xl flex items-center justify-center mx-auto border border-red-200 dark:border-red-500/20 relative shadow-[0_0_50px_rgba(239,68,68,0.15)] dark:shadow-[0_0_50px_rgba(239,68,68,0.2)]">
                <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full animate-pulse" />
                <Lock className="w-12 h-12 text-red-500" />
              </div>

              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-500/10 text-orange-600 dark:text-orange-400 text-[10px] font-black uppercase tracking-widest mb-4">
                  <AlertTriangle className="w-4 h-4" /> System Under Development
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-tight">
                  MAINNET ACCESS <span className="text-red-500">RESTRICTED</span>
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mt-4 text-lg font-medium">
                  Wallet Connected: <span className="text-slate-950 dark:text-white font-mono">{address.substring(0, 6)}...{address.substring(address.length - 4)}</span>
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-[#2b52ff]/5 border border-[#2b52ff]/20 dark:border-[#2b52ff]/30 text-left space-y-6">
                <h2 className="text-xl font-black text-slate-950 dark:text-white uppercase tracking-widest flex items-center gap-3">
                  <Target className="w-6 h-6 text-[#2b52ff]" /> Why Are We In Stealth?
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  AlwaysThere is engineering the world's most secure, unstoppable digital will protocol. We are currently finalizing our smart contract infrastructure, Zero-Knowledge encryption layer, and undergoing rigorous security audits to ensure 100% protection of user assets.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-white/10">
                  <div>
                     <h3 className="text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">The Market</h3>
                     <p className="text-lg font-black text-slate-900 dark:text-white">$1.5 Trillion</p>
                     <p className="text-xs text-slate-400 dark:text-slate-500">Projected Digital Estate Market</p>
                  </div>
                  <div>
                     <h3 className="text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Current Status</h3>
                     <p className="text-lg font-black text-yellow-600 dark:text-yellow-500">Seed Round Open</p>
                     <p className="text-xs text-slate-400 dark:text-slate-500">Seeking Strategic Partners</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="mailto:subodhram3350@gmail.com?subject=Investor Access Request - AlwaysThere">
                  <button className="w-full sm:w-auto px-8 py-4 bg-[#2b52ff] hover:bg-[#1a3ecd] text-white rounded-xl font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(43,82,255,0.4)] flex items-center justify-center gap-2">
                    Request Investor Access <ChevronRight className="w-5 h-5" />
                  </button>
                </Link>
                <button 
                  onClick={() => setShowDevModal(true)}
                  className="w-full sm:w-auto px-8 py-4 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-400 rounded-xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                >
                  <Cpu className="w-5 h-5" /> Dev Override
                </button>
              </div>

            </div>
          </div>

          <AnimatePresence>
            {showDevModal && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030712]/80 backdrop-blur-md">
                <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-[#2b52ff]/30 rounded-3xl p-8 max-w-md w-full shadow-[0_0_40px_rgba(43,82,255,0.1)] relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2b52ff] to-purple-500" />
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#2b52ff]/10 flex items-center justify-center border border-[#2b52ff]/20">
                      <Cpu className="w-6 h-6 text-[#2b52ff]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Dev Override</h3>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">Authentication Required</p>
                    </div>
                  </div>
                  <input 
                    type="password" 
                    placeholder="Enter Passcode..." 
                    value={devPasscode} 
                    onChange={(e) => setDevPasscode(e.target.value)} 
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                         if (devPasscode === 'alwaysthere' || devPasscode === 'subodh123') { 
                           setIsDevOverride(true); 
                           localStorage.setItem('dwp_dev_override_expiry', (Date.now() + 5 * 60 * 60 * 1000).toString());
                           setShowDevModal(false); 
                           setDevPasscode(''); 
                           toast.success('Admin Bypass Enabled'); 
                         } else { toast.error('Invalid passcode'); }
                      }
                    }} 
                    className="w-full bg-slate-50 dark:bg-[#030712] border border-slate-200 dark:border-white/10 rounded-xl px-5 py-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#2b52ff]/50 mb-6 font-mono transition-colors tracking-widest" 
                    autoFocus 
                  />
                  <div className="flex justify-end gap-3">
                    <button onClick={() => { setShowDevModal(false); setDevPasscode(''); }} className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-800 dark:text-white font-black text-xs uppercase tracking-widest transition-all">Cancel</button>
                    <button onClick={() => {
                       if (devPasscode === 'alwaysthere' || devPasscode === 'subodh123') { 
                         setIsDevOverride(true); 
                         localStorage.setItem('dwp_dev_override_expiry', (Date.now() + 5 * 60 * 60 * 1000).toString());
                         setShowDevModal(false); 
                         setDevPasscode(''); 
                         toast.success('Admin Bypass Enabled'); 
                       } else { toast.error('Invalid passcode'); }
                    }} className="px-5 py-3 rounded-xl bg-[#2b52ff] hover:bg-[#1a3ecd] text-white font-black text-xs uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(43,82,255,0.4)]">Verify</button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
        <SharedFooter />
      </div>
    )
  }

  if (isConnected && isDevOverride) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-800 dark:text-slate-100 font-sans flex flex-col overflow-x-hidden relative transition-colors duration-300">
        {/* Premium Dashboard Background Glow */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#2b52ff]/10 blur-[150px] rounded-full mix-blend-screen" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[150px] rounded-full mix-blend-screen" />
        </div>

        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#030712]/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 px-6 py-4 flex items-center justify-between transition-colors duration-300">
          <Link href="/" className="flex items-center gap-2 group">
            <img src="/logo-simple.png" alt="AlwaysThere Logo" className="h-10 w-auto object-contain group-hover:scale-110 transition-transform duration-300" />
            <div className="flex flex-col text-left">
              <span className="text-xl font-black tracking-wider text-slate-900 dark:text-white leading-none">ALWAYS THERE</span>
              <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-none mt-1.5">SECURE YOUR DIGITAL LEGACY</span>
            </div>
          </Link>
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center gap-6 mr-4">
              <Link href="/docs" className="text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Documentation</Link>
              <Link href="/donate" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#2b52ff]/20 to-purple-500/20 border border-[#2b52ff]/30 text-xs font-black uppercase tracking-widest text-slate-800 dark:text-white hover:from-[#2b52ff]/40 hover:to-purple-500/40 transition-all shadow-[0_0_15px_rgba(43,82,255,0.2)]">
                <Heart className="w-4 h-4 text-pink-500" /> Support Us
              </Link>
            </div>
            <ThemeToggle />
            <ModeIndicator />
            <div className="h-8 w-px bg-slate-200 dark:bg-white/10 hidden md:block"></div>
            <button onClick={handleDisconnect} className="px-5 py-2.5 rounded-xl bg-red-500/10 text-red-500 text-xs font-black border border-red-500/20 uppercase tracking-widest hover:bg-red-500/20 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all">
              Logout
            </button>
          </div>
        </nav>
        
        <main className="flex-1 max-w-[1400px] mx-auto w-full p-4 sm:px-6 lg:px-8 space-y-8 mt-8 mb-24 relative z-10">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="bg-slate-100/80 dark:bg-[#0f172a]/80 backdrop-blur-md border border-slate-200 dark:border-white/10 p-2 rounded-2xl w-full justify-start overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] shadow-2xl">
              <TabsTrigger value="overview" className="text-xs font-black uppercase tracking-widest px-6 py-3 rounded-xl text-slate-600 dark:text-slate-400 data-[state=active]:bg-[#2b52ff] data-[state=active]:text-white data-[state=active]:shadow-[0_0_20px_rgba(43,82,255,0.4)] transition-all">Overview</TabsTrigger>
              <TabsTrigger value="assets" className="text-xs font-black uppercase tracking-widest px-6 py-3 rounded-xl text-slate-600 dark:text-slate-400 data-[state=active]:bg-[#2b52ff] data-[state=active]:text-white transition-all">Digital Assets</TabsTrigger>
              <TabsTrigger value="beneficiaries" className="text-xs font-black uppercase tracking-widest px-6 py-3 rounded-xl text-slate-600 dark:text-slate-400 data-[state=active]:bg-[#2b52ff] data-[state=active]:text-white transition-all">Beneficiaries</TabsTrigger>
              <TabsTrigger value="status" className="text-xs font-black uppercase tracking-widest px-6 py-3 rounded-xl text-slate-600 dark:text-slate-400 data-[state=active]:bg-[#2b52ff] data-[state=active]:text-white transition-all">Protocol Status</TabsTrigger>
              <TabsTrigger value="heartbeat" className="text-xs font-black uppercase tracking-widest px-6 py-3 rounded-xl text-slate-600 dark:text-slate-400 data-[state=active]:bg-[#2b52ff] data-[state=active]:text-white transition-all shadow-[0_0_15px_rgba(43,82,255,0.2)]">Heartbeat</TabsTrigger>
              <TabsTrigger value="subscription" className="text-xs font-black uppercase tracking-widest px-6 py-3 rounded-xl text-slate-600 dark:text-slate-400 data-[state=active]:bg-[#2b52ff] data-[state=active]:text-white transition-all">Subscription</TabsTrigger>
              <TabsTrigger value="settings" className="text-xs font-black uppercase tracking-widest px-6 py-3 rounded-xl text-slate-600 dark:text-slate-400 data-[state=active]:bg-[#2b52ff] data-[state=active]:text-white transition-all">Settings</TabsTrigger>
            </TabsList>

            <div className="bg-white/80 dark:bg-[#030712]/50 backdrop-blur-3xl border border-slate-200 dark:border-white/5 rounded-[2rem] p-6 shadow-2xl">
              <TabsContent value="overview" className="m-0">
                {activeTab === 'overview' && <OverviewDashboard onNavigate={setActiveTab} />}
              </TabsContent>
              <TabsContent value="assets" className="m-0">
                {activeTab === 'assets' && <AssetCreationForm />}
              </TabsContent>
              <TabsContent value="beneficiaries" className="m-0">
                {activeTab === 'beneficiaries' && <BeneficiaryManager />}
              </TabsContent>
              <TabsContent value="status" className="m-0">
                {activeTab === 'status' && <StatusDashboard />}
              </TabsContent>
              <TabsContent value="heartbeat" className="m-0">
                {activeTab === 'heartbeat' && <HeartbeatMonitor />}
              </TabsContent>
              <TabsContent value="subscription" className="m-0">
                {activeTab === 'subscription' && <SubscriptionDashboard />}
              </TabsContent>
              <TabsContent value="settings" className="m-0">
                {activeTab === 'settings' && <SettingsDashboard />}
              </TabsContent>
            </div>
          </Tabs>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-800 dark:text-slate-200 font-professional selection:bg-blue-500/30 overflow-x-hidden transition-colors duration-300">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-blue-600/5 dark:bg-blue-600/5 blur-[120px] rounded-full" />
      </div>

      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-[#030712]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 px-6 py-4 flex items-center justify-between transition-colors duration-300">
        <Link href="/" className="flex items-center gap-2 group">
          <img src="/logo-simple.png" alt="AlwaysThere Logo" className="h-10 w-auto object-contain group-hover:scale-110 transition-transform duration-300" />
          <div className="flex flex-col text-left">
            <span className="text-xl font-black tracking-wider text-slate-900 dark:text-white leading-none">ALWAYS THERE</span>
            <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-none mt-1.5">SECURE YOUR DIGITAL LEGACY</span>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/investors" className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black uppercase tracking-widest text-[#2b52ff] hover:bg-blue-500/20 hover:text-slate-900 dark:hover:text-white transition-all shadow-[0_0_15px_rgba(43,82,255,0.3)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Partners & Investors
          </Link>
          <Link href="/#how-it-works" className="text-xs font-black uppercase tracking-[0.15em] text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">How it works</Link>
          <Link href="/#security" className="text-xs font-black uppercase tracking-[0.15em] text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">Security</Link>
          <Link href="/docs" className="text-xs font-black uppercase tracking-[0.15em] text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">Tech Guide</Link>
          <Link href="/pricing" className="text-xs font-black uppercase tracking-[0.15em] text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">Pricing</Link>
          <Link href="/donate" className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2b52ff]/10 border border-[#2b52ff]/20 text-[10px] font-black uppercase tracking-widest text-[#2b52ff] hover:bg-[#2b52ff]/20 hover:text-slate-900 dark:hover:text-white transition-all">Support Us</Link>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button onClick={handleConnect} className="px-6 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-black text-xs font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">Connect Wallet</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-8 uppercase">
            <Zap className="w-3 h-3" /> Secure Your Family&apos;s Future
          </motion.div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9] mb-8 uppercase">
            YOUR DIGITAL LEGACY, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-500 font-black">PROTECTED FOREVER.</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed mb-12">
            Every year, ₹35,000 Crore lies unclaimed in banks because families lose access. 
            Store your Crypto, Wills, and Secrets here. We deliver them to your loved ones automatically.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={handleConnect} className="w-full sm:w-auto px-10 py-6 rounded-2xl bg-blue-600 text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-blue-500 transition-all shadow-2xl shadow-blue-600/30">
              Start Your Vault <ArrowRight className="w-6 h-6" />
            </button>
            <Link href="/#how-it-works" className="w-full sm:w-auto px-10 py-6 rounded-2xl bg-slate-200 hover:bg-slate-300 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-800 dark:text-white font-black uppercase tracking-widest hover:dark:bg-white/10 transition-all uppercase">How it works</Link>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">
              <ShieldCheck className="w-4 h-4" /> AES-256-GCM
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">
              <Cloud className="w-4 h-4" /> Cloudflare R2
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">
              <Network className="w-4 h-4" /> Polygon Network
            </div>
          </div>
        </div>
      </section>

      {/* 3 Step Working (Very Simple) */}
      <section id="how-it-works" className="py-32 px-6 bg-slate-100/50 dark:bg-white/[0.01] border-y border-slate-200 dark:border-white/5 scroll-mt-24 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4 italic">SIMPLE. SECURE. <span className="text-blue-600">AUTOMATIC.</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-6">
              <div className="w-20 h-20 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto text-blue-600 dark:text-blue-500 border border-blue-500/20"><Lock className="w-10 h-10" /></div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase">1. Store</h3>
              <p className="text-slate-600 dark:text-slate-500 font-medium leading-relaxed">Upload your important files, passwords, or seed phrases to your private vault.</p>
            </div>
            <div className="space-y-6">
              <div className="w-20 h-20 bg-purple-600/10 rounded-full flex items-center justify-center mx-auto text-purple-600 dark:text-purple-500 border border-purple-500/20"><Heart className="w-10 h-10" /></div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase">2. Assign</h3>
              <p className="text-slate-600 dark:text-slate-500 font-medium leading-relaxed">Add your family members as nominees and set a timer (e.g. 30 days).</p>
            </div>
            <div className="space-y-6">
              <div className="w-20 h-20 bg-green-600/10 rounded-full flex items-center justify-center mx-auto text-green-600 dark:text-green-500 border border-green-500/20"><Zap className="w-10 h-10" /></div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase">3. Deliver</h3>
              <p className="text-slate-600 dark:text-slate-500 font-medium leading-relaxed">If you go offline, the protocol automatically delivers the files to them.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Pillars (The Information) */}
      <section id="security" className="py-32 px-6 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">TOTAL <span className="text-blue-500">PRIVACY</span></h2>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.4em]">Even we can&apos;t see your data</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PillarCard 
              icon={<ShieldCheck className="w-10 h-10" />}
              title="Zero-Knowledge"
              desc="Simple: Encryption happens on your device. We cannot see your data, only you and your nominees have the key to unlock your legacy."
              tags={['100% Private', 'No Admins']}
            />
            <PillarCard 
              icon={<Network className="w-10 h-10" />}
              title="Eternal Storage"
              desc="Files hazaro servers par divided hain. Ye kabhi delete nahi ho sakti, 100 saal baad bhi aapka data safe rahega."
              tags={['Arweave', 'Cloudflare R2']}
            />
            <PillarCard 
              icon={<Workflow className="w-10 h-10" />}
              title="Immutable Code"
              desc="Release hone ke liye kisi insaan ki permission nahi chahiye. Pura logic smart contract handle karta hai automatically."
              tags={['Autonomous', 'Smart Logic']}
            />
          </div>
        </div>
      </section>

      {/* Checklist Section */}
      <section className="py-32 px-6 bg-slate-100/50 dark:bg-white/[0.02] border-y border-slate-200 dark:border-white/5 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
           <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase mb-8 leading-tight tracking-tight italic">WHAT SHOULD YOU <br /><span className="text-blue-500">PROTECT?</span></h2>
                <div className="space-y-4">
                  <ChecklistItem text="Crypto Seed Phrases & Private Keys" />
                  <ChecklistItem text="Property Papers & Digital Wills" />
                  <ChecklistItem text="Business Master Passwords" />
                  <ChecklistItem text="Messages for Loved Ones" />
                </div>
              </div>
              <div className="flex-1 p-12 bg-blue-600/10 rounded-[3rem] border border-blue-500/20">
                <p className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white italic uppercase mb-6 leading-[1.1]">"Don&apos;t leave your life&apos;s work to chance. Leave it to code."</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600" />
                  <span className="text-[10px] font-black text-blue-600 dark:text-blue-500 uppercase tracking-widest">Protocol Founder</span>
                </div>
              </div>
           </div>
        </div>
      </section>

      {/* Simple FAQ */}
      <section id="faq" className="py-32 px-6 scroll-mt-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">COMMON <span className="text-blue-500">QUESTIONS</span></h2>
          </div>
          <div className="space-y-2">
            <FaqItem 
              question="Can AlwaysThere see my private data?" 
              answer="Absolutely not. Your files are encrypted locally on your device using your wallet signature. We only store encrypted 'shards' that are impossible for us or anyone else to read without your key." 
            />
            <FaqItem 
              question="How will my nominees get access?" 
              answer="Once the protocol detects that your heartbeat timer has expired and the grace period ends, it automatically generates and sends a secure access link to your nominees." 
            />
            <FaqItem 
              question="Is AlwaysThere free to use?" 
              answer="Yes! We offer a 'Forever Free' plan for basic asset protection. For larger storage (up to 1TB) and advanced features, you can upgrade to our professional plans anytime." 
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32 border-t border-slate-200 dark:border-white/5 scroll-mt-24 transition-colors duration-300">
        <PricingPlans />
      </section>

      {/* SEO Content Section */}
      {/* SEO & Knowledge Base Section - Premium Design */}
      <article className="py-32 px-6 border-t border-slate-200 dark:border-white/5 relative overflow-hidden bg-slate-50 dark:bg-[#030712] transition-colors duration-300">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/5 dark:bg-[#2b52ff]/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6">
              <BookOpen className="w-4 h-4" /> Protocol Deep Dive
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-6">The Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500">Digital Inheritance</span></h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">Understanding the core mechanics of decentralized estate planning and self-custodial asset recovery.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 rounded-[2.5rem] bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:bg-slate-100/50 hover:dark:bg-white/[0.04] hover:border-blue-500/20 dark:hover:border-blue-500/20 transition-all duration-500 group shadow-sm dark:shadow-none">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-8 border border-blue-500/20 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">The Crypto Dead Man Switch</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                In the rapidly evolving world of Web3, securing your digital assets is paramount. But what happens to your cryptocurrency and seed phrases if you lose access? <strong>AlwaysThere Protocol</strong> solves the multi-billion dollar problem of lost digital wealth through an automated, trustless, and immutable crypto dead man switch. Every year, massive amounts of Bitcoin are permanently lost because physical wills fail to transfer self-custodial wealth securely. Our <strong>Web3 succession planning</strong> tools ensure that your <strong>decentralized digital assets recovery</strong> is handled by code, not intermediaries.
              </p>
            </div>

            <div className="p-10 rounded-[2.5rem] bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:bg-slate-100/50 hover:dark:bg-white/[0.04] hover:border-purple-500/20 dark:hover:border-purple-500/20 transition-all duration-500 group shadow-sm dark:shadow-none">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-8 border border-purple-500/20 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(168,85,247,0.1)]">
                <Lock className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Zero-Knowledge Digital Will</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                Built on advanced smart contracts and Zero-Knowledge encryption, our decentralized inheritance protocol ensures your private keys and digital estate are never exposed to the public or even the developers. Encryption happens entirely on your local device using AES-256-GCM. Whether you need to <strong>inherit Bitcoin securely</strong> or manage a complex <strong>blockchain estate</strong> across Ethereum and Polygon, your access instructions are secured eternally. AlwaysThere is the definitive solution for <strong>crypto legacy management</strong> in the 21st century.
              </p>
            </div>
          </div>
          
          <div className="mt-16 text-center pt-8 border-t border-slate-200 dark:border-white/5">
            <p className="text-[10px] text-slate-500 dark:text-slate-600 font-black uppercase tracking-[0.2em]">
              Keywords: Crypto Inheritance, Digital Will, Dead Man Switch Crypto, Decentralized Estate Planning, Secure Seed Phrase Storage, Web3 Succession, Inherit Bitcoin Securely, Blockchain Wills.
            </p>
          </div>
        </div>
      </article>

      <SharedFooter />
      <WalletConnectModal isOpen={showWalletModal} onClose={() => setShowWalletModal(false)} onConnect={handleWalletConnect} isConnecting={isConnecting} />
    </div>
  )
}

function StatBox({ label, value }: any) {
  return (
    <div>
      <div className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter">{value}</div>
      <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</div>
    </div>
  )
}

function PillarCard({ icon, title, desc, tags }: any) {
  return (
    <div className="p-10 rounded-[2.5rem] bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-all group shadow-sm dark:shadow-none">
      <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-600 dark:text-blue-500 mb-8">{icon}</div>
      <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase mb-4 tracking-tight">{title}</h4>
      <p className="text-sm text-slate-600 dark:text-slate-500 leading-relaxed font-medium mb-8">{desc}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag: string) => (
          <span key={tag} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">{tag}</span>
        ))}
      </div>
    </div>
  )
}

function ChecklistItem({ text }: any) {
  return (
    <div className="flex items-center gap-3 p-4 bg-white dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/5 hover:border-blue-500/20 transition-all shadow-sm dark:shadow-none">
      <CheckCircle2 className="w-5 h-5 text-blue-500" />
      <span className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest">{text}</span>
    </div>
  )
}

function FaqItem({ question, answer }: any) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="border-b border-slate-200 dark:border-white/5 last:border-0">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-6 flex items-center justify-between text-left group">
        <span className="text-sm font-black uppercase text-slate-800 dark:text-white group-hover:text-blue-500 transition-colors">{question}</span>
        <ChevronRight className={`w-5 h-5 text-slate-400 dark:text-slate-500 transition-transform ${isOpen ? 'rotate-90 text-blue-500' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <p className="pb-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Workflow({ className }: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/></svg>
  )
}