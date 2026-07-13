'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
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
  Info,
  X,
  LogOut
} from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useAccount, useSignMessage, useDisconnect } from 'wagmi'
import { toast } from 'sonner'
import { ethers } from 'ethers'

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
import { ReferralProgram } from '@/components/referral-program'
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
  const [pendingMfaData, setPendingMfaData] = useState<{ mfaToken: string; walletAddress: string } | null>(null)
  const [mfaVerifyCode, setMfaVerifyCode] = useState('')
  const [isVerifyingMfa, setIsVerifyingMfa] = useState(false)
  const [mfaError, setMfaError] = useState<string | null>(null)
  const [waitlistEmail, setWaitlistEmail] = useState('')

  const handleJoinWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail.trim() || !waitlistEmail.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }
    toast.success('Success! You have been added to our private beta waitlist.');
    setWaitlistEmail('');
  }

  const closeMfaModal = () => {
    setPendingMfaData(null)
    setMfaVerifyCode('')
    setMfaError(null)
  }

  useEffect(() => {
    setHasMounted(true)
    
    // Check for expired session query parameter
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get('session') === 'expired') {
      toast.error('Session expired. Please reconnect your wallet.')
      // Clean up URL parameters
      window.history.replaceState({}, document.title, window.location.pathname)
    }

    const isDemo = localStorage.getItem('dwp_is_demo') === 'true'
    const storedConnection = localStorage.getItem('dwp_wallet_connected')
    if (isDemo) {
      setIsConnected(true)
      setIsDevOverride(true)
      setAddress('0xDemoSandbox77777777777777777777777777')
    } else if (storedConnection === 'true') {
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

  // Auto-show dev modal when in restricted mode (Disabled to avoid intrusive UI popups)
  useEffect(() => {
    const isDemo = localStorage.getItem('dwp_is_demo') === 'true'
    if (isConnected && !isDevOverride && !isDemo) {
      // Don't auto-show dev modal to avoid intrusive UI popups
    }
  }, [isConnected, isDevOverride])

  const handleConnect = () => setShowWalletModal(true)

  const handleStartDemo = async () => {
    setIsConnecting(true)
    try {
      let privateKey = localStorage.getItem('dwp_demo_private_key')
      if (!privateKey) {
        const wallet = ethers.Wallet.createRandom()
        privateKey = wallet.privateKey
        localStorage.setItem('dwp_demo_private_key', privateKey)
      }
      const wallet = new ethers.Wallet(privateKey)
      const walletAddress = wallet.address

      const apiEndpoint = process.env.NEXT_PUBLIC_API_URL || 'https://always-there-protocol-api.onrender.com' /* 'http://localhost:7001' */
      const nonceRes = await fetch(`${apiEndpoint}/api/auth/nonce`)
      
      if (!nonceRes.ok) {
        throw new Error('Failed to fetch authentication nonce')
      }

      const nonceData = await nonceRes.json()
      const message = nonceData?.nonce
      if (!message) {
        throw new Error('Empty authentication message')
      }

      const signature = await wallet.signMessage(message)

      const verifyRes = await fetch(`${apiEndpoint}/api/auth/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress, message, signature })
      })

      if (!verifyRes.ok) {
        throw new Error('Verification failed')
      }

      const authData = await verifyRes.json()
      
      if (authData?.token) {
        localStorage.setItem('dwp_is_demo', 'true')
        localStorage.setItem('dwp_wallet_address', authData.walletAddress || walletAddress)
        localStorage.setItem('dwp_wallet_connected', 'true')
        localStorage.setItem('dwp_token', authData.token)
        
        if (!localStorage.getItem('dwp_user_email')) {
          localStorage.setItem('dwp_user_email', 'nothingsubodh@gmail.com')
        }

        // Set a mock Professional subscription so all features are unlocked right away
        localStorage.setItem('dwp_subscription', JSON.stringify({
          id: 'demo-sub',
          userId: 'demo-user-id',
          planId: 'sovereign_pro',
          plan: 'sovereign_pro',
          planName: 'Web3 Pro (Demo Sandbox)',
          status: 'active',
          mode: 'decentralized',
          storageUsed: 0,
          storageLimit: 100 * 1024 * 1024 * 1024,
          trialEndsAt: null,
          subscriptionEndsAt: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }))

        setIsConnected(true)
        setIsDevOverride(true)
        setAddress(authData.walletAddress || walletAddress)
        toast.success('Sandbox Demo Mode Activated with Backend Sync!')
      } else {
        throw new Error('No authentication token received')
      }
    } catch (error: any) {
      console.warn('Demo backend sync failed:', error)
      // Fallback for offline demo
      localStorage.setItem('dwp_is_demo', 'true')
      localStorage.setItem('dwp_wallet_address', '0xDemoSandbox77777777777777777777777777')
      localStorage.setItem('dwp_wallet_connected', 'true')
      
      localStorage.setItem('dwp_subscription', JSON.stringify({
        id: 'demo-sub',
        userId: 'demo-user-id',
        planId: 'sovereign_pro',
        plan: 'sovereign_pro',
        planName: 'Web3 Pro (Demo Sandbox)',
        status: 'active',
        mode: 'decentralized',
        storageUsed: 0,
        storageLimit: 100 * 1024 * 1024 * 1024,
        trialEndsAt: null,
        subscriptionEndsAt: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }))

      setIsConnected(true)
      setIsDevOverride(true)
      setAddress('0xDemoSandbox77777777777777777777777777')
      toast.success('Sandbox Demo Mode Activated (Offline Fallback)')
    } finally {
      setIsConnecting(false)
    }
  }

  const handleWalletConnect = async (walletAddress: string, customPrivateKey?: string) => {
    setIsConnecting(true)
    try {
      const apiEndpoint = process.env.NEXT_PUBLIC_API_URL || 'https://always-there-protocol-api.onrender.com' /* 'http://localhost:7001' */
      const nonceRes = await fetch(`${apiEndpoint}/api/auth/nonce`)
      
      if (!nonceRes.ok) {
        throw new Error('Failed to fetch authentication nonce from server')
      }

      const nonceData = await nonceRes.json()
      const message = nonceData?.nonce
      
      if (!message) {
        throw new Error('Server returned an empty authentication message')
      }

      let signature;
      if (customPrivateKey) {
        const wallet = new ethers.Wallet(customPrivateKey)
        signature = await wallet.signMessage(message)
      } else {
        signature = await signMessageAsync({ message })
      }

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
      
      if (authData?.status === 'PENDING_MFA') {
        localStorage.removeItem('dwp_is_demo')
        localStorage.removeItem('dwp_demo_otp')
        localStorage.removeItem('dwp_alt_demo_otp')
        setPendingMfaData({ mfaToken: authData.mfaToken, walletAddress })
        setMfaVerifyCode('')
        setShowWalletModal(false)
        toast.info('Two-Factor Authentication required.')
      } else if (authData?.token) {
        setIsConnected(true)
        localStorage.removeItem('dwp_is_demo')
        localStorage.removeItem('dwp_demo_otp')
        localStorage.removeItem('dwp_alt_demo_otp')
        localStorage.setItem('dwp_wallet_connected', 'true')
        localStorage.setItem('dwp_wallet_address', authData.walletAddress || walletAddress)
        localStorage.setItem('dwp_token', authData.token)
        setAddress(authData.walletAddress || walletAddress)
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

  const handleMfaVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMfaError(null)
    if (!pendingMfaData) return
    if (!mfaVerifyCode.trim() || mfaVerifyCode.trim().length !== 6) {
      setMfaError('Please enter a valid 6-digit code.')
      toast.error('Please enter a valid 6-digit code.')
      return
    }

    setIsVerifyingMfa(true)
    try {
      const apiEndpoint = process.env.NEXT_PUBLIC_API_URL || 'https://always-there-protocol-api.onrender.com' /* 'http://localhost:7001' */
      const verifyRes = await fetch(`${apiEndpoint}/api/auth/mfa/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mfaToken: pendingMfaData.mfaToken, code: mfaVerifyCode.trim() })
      })

      if (!verifyRes.ok) {
        const errorData = await verifyRes.json().catch(() => null)
        const errMsg = errorData?.message || 'Verification failed. Please check the code.'
        const cleanMsg = errMsg.toLowerCase().includes('invalid') ? 'Incorrect OTP code. Please try again.' : errMsg
        throw new Error(cleanMsg)
      }

      const authData = await verifyRes.json()
      if (authData?.token) {
        setIsConnected(true)
        localStorage.setItem('dwp_wallet_connected', 'true')
        localStorage.setItem('dwp_wallet_address', authData.walletAddress || pendingMfaData.walletAddress)
        localStorage.setItem('dwp_token', authData.token)
        setAddress(authData.walletAddress || pendingMfaData.walletAddress)
        closeMfaModal()
        toast.success('MFA Verification Successful!')
      } else {
        throw new Error('No authentication token received after MFA.')
      }
    } catch (err: any) {
      setMfaError(err.message || 'MFA Verification failed.')
      toast.error(err.message || 'MFA Verification failed.')
    } finally {
      setIsVerifyingMfa(false)
    }
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    disconnect()
    localStorage.clear()
  }

  if (!hasMounted) return <div className="min-h-screen bg-slate-50 dark:bg-[#030712]" />

  const isDemoMode = hasMounted && (localStorage.getItem('dwp_is_demo') === 'true')

  if (isConnected && !isDevOverride && !isDemoMode) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-800 dark:text-slate-100 font-sans flex flex-col overflow-x-hidden relative transition-colors duration-300">
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#030712]/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 px-6 py-4 flex items-center justify-between transition-colors duration-300">
          <Link href="/" className="flex items-center gap-2 group">
            <Image src="/logo-simple.png" alt="AlwaysThere Logo" width={40} height={40} className="h-10 w-auto object-contain group-hover:scale-110 transition-transform duration-300" />
            <div className="flex flex-col text-left">
              <span className="text-xl font-black tracking-wider text-slate-900 dark:text-white leading-none">ALWAYS THERE</span>
              <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-none mt-1.5">SECURE YOUR DIGITAL LEGACY</span>
            </div>
          </Link>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button onClick={handleDisconnect} className="px-5 py-2.5 rounded-xl bg-red-500/10 text-red-500 text-xs font-black border border-red-500/20 uppercase tracking-widest hover:bg-red-500/20 transition-all">Logout</button>
          </div>
        </nav>
        <main className="flex-1 max-w-4xl mx-auto w-full p-4 sm:px-6 lg:px-8 space-y-8 mt-16 mb-24">
          
          <div className="relative p-1 rounded-[2.5rem] bg-gradient-to-br from-[#2b52ff]/20 via-purple-500/10 to-transparent overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 animate-pulse animate-duration-1000" />
            <div className="bg-white/95 dark:bg-[#0a0c12]/95 backdrop-blur-2xl rounded-[2.4rem] p-8 md:p-12 border border-slate-200 dark:border-white/5 relative z-10 space-y-8 shadow-2xl">
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-[#2b52ff]/10 rounded-2xl flex items-center justify-center mx-auto border border-[#2b52ff]/25 relative shadow-[0_0_30px_rgba(43,82,255,0.1)]">
                  <Lock className="w-8 h-8 text-[#2b52ff]" />
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-[#2b52ff] text-[10px] font-black uppercase tracking-widest">
                  Closed Private Beta
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-tight">
                  Join the Waitlist
                </h1>
                <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-base font-medium leading-relaxed">
                  We are conducting phased private trials to ensure absolute cryptographic soundness, zero-knowledge security, and smart contract safety. Enter your email to receive priority access to our mainnet launch.
                </p>
                <p className="text-xs text-slate-500 mt-2 font-mono">
                  Wallet Connected: <span className="text-slate-900 dark:text-white font-mono">{address.substring(0, 6)}...{address.substring(address.length - 4)}</span>
                </p>
              </div>

              {/* Waitlist Subscription Section */}
              <div className="max-w-md mx-auto p-6 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
                <form onSubmit={handleJoinWaitlist} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input 
                      type="email" 
                      placeholder="Enter your email address" 
                      value={waitlistEmail} 
                      onChange={(e) => setWaitlistEmail(e.target.value)} 
                      className="flex-grow bg-white dark:bg-slate-950 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#2b52ff]/50 transition-colors text-sm" 
                    />
                    <button 
                      type="submit" 
                      className="px-6 py-3 bg-[#2b52ff] hover:bg-[#1a3ecd] text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-[0_0_15px_rgba(43,82,255,0.3)] shrink-0"
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>

              {/* Sandbox Demo Launch Section */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-500/[0.03] to-[#2b52ff]/[0.03] border border-purple-500/10 dark:border-white/5 text-center space-y-6">
                <div className="space-y-2">
                  <h2 className="text-xl font-black text-slate-950 dark:text-white uppercase tracking-widest flex items-center justify-center gap-2">
                    <Cpu className="w-5 h-5 text-purple-500" /> Start Sandbox Demo
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm max-w-lg mx-auto">
                    Want to see how it works today? Launch a fully simulated local sandbox environment instantly to experience the digital inheritance and heartbeat features.
                  </p>
                </div>
                <div className="pt-2">
                  <button 
                    onClick={handleStartDemo}
                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#2b52ff] to-purple-600 hover:from-[#1a3ecd] hover:to-purple-700 text-white rounded-xl font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] flex items-center justify-center gap-2 mx-auto"
                  >
                    Launch Interactive Demo <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Admin/Developer Bypass Link */}
              <div className="text-center pt-4">
                <button 
                  onClick={() => setShowDevModal(true)}
                  className="text-xs text-slate-400 dark:text-slate-500 hover:text-[#2b52ff] hover:dark:text-white transition-colors underline underline-offset-4 uppercase tracking-widest font-black"
                >
                  Developer Override
                </button>
              </div>

            </div>
          </div>

          <AnimatePresence>
            {showDevModal && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-[#030712]/80 backdrop-blur-md overflow-y-auto">
                <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-[#2b52ff]/30 rounded-3xl p-8 max-w-md w-full shadow-[0_0_40px_rgba(43,82,255,0.1)] relative overflow-hidden my-8 md:my-16">
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

  if (isConnected && (isDevOverride || isDemoMode)) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-800 dark:text-slate-100 font-sans flex flex-col overflow-x-hidden relative transition-colors duration-300">
        {/* Premium Dashboard Background Glow */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#2b52ff]/10 blur-[150px] rounded-full mix-blend-screen" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[150px] rounded-full mix-blend-screen" />
        </div>

        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#030712]/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between transition-colors duration-300">
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <Image src="/logo-simple.png" alt="AlwaysThere Logo" width={40} height={40} className="h-8 sm:h-10 w-auto object-contain group-hover:scale-110 transition-transform duration-300" />
            <div className="flex flex-col text-left">
              <span className="text-sm sm:text-xl font-black tracking-wider text-slate-900 dark:text-white leading-none">ALWAYS THERE</span>
              <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-none mt-1.5 hidden sm:block">SECURE YOUR DIGITAL LEGACY</span>
            </div>
          </Link>
          <div className="flex items-center space-x-3 sm:space-x-6">
            <div className="hidden md:flex items-center gap-6 mr-4">
              <Link href="/docs" className="text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Documentation</Link>
              <Link href="/donate" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#2b52ff]/20 to-purple-500/20 border border-[#2b52ff]/30 text-xs font-black uppercase tracking-widest text-slate-800 dark:text-white hover:from-[#2b52ff]/40 hover:to-purple-500/40 transition-all shadow-[0_0_15px_rgba(43,82,255,0.2)]">
                <Heart className="w-4 h-4 text-pink-500" /> Support Us
              </Link>
            </div>
            <ThemeToggle />
            <ModeIndicator />
            <div className="h-8 w-px bg-slate-200 dark:bg-white/10 hidden md:block"></div>
            <button onClick={handleDisconnect} className="px-3 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-red-500/10 text-red-500 text-[10px] sm:text-xs font-black border border-red-500/20 uppercase tracking-widest hover:bg-red-500/20 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all flex items-center gap-1.5 shrink-0">
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </nav>
        
        <main className="flex-1 max-w-[1400px] mx-auto w-full p-3 sm:p-4 md:p-6 lg:p-8 space-y-6 sm:space-y-8 mt-4 sm:mt-8 mb-24 relative z-10">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 sm:space-y-8">
            <TabsList className="bg-slate-100/80 dark:bg-[#0f172a]/80 backdrop-blur-md border border-slate-200 dark:border-white/10 p-1.5 sm:p-2 rounded-xl sm:rounded-2xl w-full justify-start overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] shadow-2xl">
              <TabsTrigger value="overview" className="text-[10px] sm:text-xs font-black uppercase tracking-widest px-3 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl text-slate-600 dark:text-slate-400 data-[state=active]:bg-[#2b52ff] data-[state=active]:text-white data-[state=active]:shadow-[0_0_20px_rgba(43,82,255,0.4)] transition-all">Overview</TabsTrigger>
              <TabsTrigger value="assets" className="text-[10px] sm:text-xs font-black uppercase tracking-widest px-3 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl text-slate-600 dark:text-slate-400 data-[state=active]:bg-[#2b52ff] data-[state=active]:text-white transition-all">Digital Assets</TabsTrigger>
              <TabsTrigger value="beneficiaries" className="text-[10px] sm:text-xs font-black uppercase tracking-widest px-3 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl text-slate-600 dark:text-slate-400 data-[state=active]:bg-[#2b52ff] data-[state=active]:text-white transition-all">Beneficiaries</TabsTrigger>
              <TabsTrigger value="status" className="text-[10px] sm:text-xs font-black uppercase tracking-widest px-3 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl text-slate-600 dark:text-slate-400 data-[state=active]:bg-[#2b52ff] data-[state=active]:text-white transition-all">Protocol Status</TabsTrigger>
              <TabsTrigger value="heartbeat" className="text-[10px] sm:text-xs font-black uppercase tracking-widest px-3 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl text-slate-600 dark:text-slate-400 data-[state=active]:bg-[#2b52ff] data-[state=active]:text-white transition-all shadow-[0_0_15px_rgba(43,82,255,0.2)]">Heartbeat</TabsTrigger>
              <TabsTrigger value="subscription" className="text-[10px] sm:text-xs font-black uppercase tracking-widest px-3 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl text-slate-600 dark:text-slate-400 data-[state=active]:bg-[#2b52ff] data-[state=active]:text-white transition-all">Subscription</TabsTrigger>
              <TabsTrigger value="referral" className="text-[10px] sm:text-xs font-black uppercase tracking-widest px-3 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl text-slate-600 dark:text-slate-400 data-[state=active]:bg-[#2b52ff] data-[state=active]:text-white transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)]">Refer & Earn</TabsTrigger>
              <TabsTrigger value="settings" className="text-[10px] sm:text-xs font-black uppercase tracking-widest px-3 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl text-slate-600 dark:text-slate-400 data-[state=active]:bg-[#2b52ff] data-[state=active]:text-white transition-all">Settings</TabsTrigger>
            </TabsList>

            <div className="bg-white/80 dark:bg-[#030712]/50 backdrop-blur-3xl border border-slate-200 dark:border-white/5 rounded-2xl sm:rounded-[2rem] p-3 sm:p-6 shadow-2xl">
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
              <TabsContent value="referral" className="m-0">
                {activeTab === 'referral' && <ReferralProgram userAddress={address} />}
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
    <div className="min-h-screen bg-gradient-to-tr from-slate-50 via-white to-slate-100/50 dark:from-[#030712] dark:via-[#030712] dark:to-[#030712] text-slate-800 dark:text-slate-200 font-professional selection:bg-blue-500/30 overflow-x-hidden transition-colors duration-300">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/[0.08] dark:bg-blue-600/[0.04] blur-[150px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/[0.08] dark:bg-purple-500/[0.04] blur-[150px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
      </div>

      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-[#030712]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between transition-colors duration-300">
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <Image src="/logo-simple.png" alt="AlwaysThere Logo" width={40} height={40} className="h-8 sm:h-10 w-auto object-contain group-hover:scale-110 transition-transform duration-300" />
          <div className="flex flex-col text-left">
            <span className="text-sm sm:text-xl font-black tracking-wider text-slate-900 dark:text-white leading-none">ALWAYS THERE</span>
            <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-none mt-1.5 hidden sm:block">SECURE YOUR DIGITAL LEGACY</span>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/features" className="text-xs font-black uppercase tracking-[0.15em] text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">How it works</Link>
          <Link href="/security" className="text-xs font-black uppercase tracking-[0.15em] text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">Security</Link>
          <Link href="/docs" className="text-xs font-black uppercase tracking-[0.15em] text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">Tech Guide</Link>
          <Link href="/pricing" className="text-xs font-black uppercase tracking-[0.15em] text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">Pricing</Link>
          <Link href="/support" className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 hover:text-slate-900 dark:hover:text-white transition-all">Help</Link>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button onClick={handleConnect} className="px-4 sm:px-6 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-black text-xs font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
            <span className="hidden sm:inline">Connect Wallet</span>
            <span className="sm:hidden">Connect</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-28 sm:pt-40 md:pt-48 pb-20 sm:pb-32 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center flex flex-col items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-6 sm:mb-8">
            <Zap className="w-3 h-3" /> Secure Your Family&apos;s Future
          </motion.div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-professional font-extrabold text-slate-900 dark:text-white tracking-tighter leading-[1.1] sm:leading-[1.05] mb-6 sm:mb-8 max-w-4xl text-center">
            Always There <br />
            <span className="font-serif italic font-normal text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-400 pr-2">even when you&apos;re not.</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-455 dark:text-slate-400 text-base sm:text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed mb-8 sm:mb-12">
            Every year, billions in digital assets and accounts are lost forever because families can&apos;t access them.
            AlwaysThere Vault lets you store your crypto, seed phrases, and legacy files securely—delivering them to your loved ones automatically.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-lg sm:max-w-none mx-auto">
            <button onClick={handleConnect} className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 rounded-xl bg-blue-600 text-white text-xs sm:text-sm font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20">
              Connect Wallet <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <Link href="/features" className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-800 dark:text-white text-xs sm:text-sm font-black uppercase tracking-widest hover:dark:bg-white/10 transition-all text-center">
              How it works
            </Link>
          </div>

          <div className="mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-4 sm:gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">
              <ShieldCheck className="w-4 h-4 text-blue-500" /> AES-256-GCM
            </div>
            <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">
              <Cloud className="w-4 h-4 text-blue-500" /> Cloudflare R2
            </div>
            <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">
              <Network className="w-4 h-4 text-blue-500" /> Polygon Network
            </div>
          </div>

        </div>
      </section>

      {/* 3 Step Working (Very Simple) */}
      <section id="how-it-works" className="py-32 px-6 bg-gradient-to-b from-slate-100/40 via-slate-50/10 to-white dark:from-white/[0.01] dark:to-transparent border-y border-slate-200 dark:border-white/5 scroll-mt-24 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-5xl font-serif font-black text-slate-900 dark:text-white tracking-tight mb-4">Simple, secure, and fully automated.</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Protecting your legacy takes just three steps.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-6">
              <div className="w-20 h-20 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto text-blue-600 dark:text-blue-500 border border-blue-500/20"><Lock className="w-10 h-10" /></div>
              <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white">1. Add Your Assets</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">Upload your critical files, passwords, or crypto seed phrases to your private vault.</p>
            </div>
            <div className="space-y-6">
              <div className="w-20 h-20 bg-purple-600/10 rounded-full flex items-center justify-center mx-auto text-purple-600 dark:text-purple-500 border border-purple-500/20"><Heart className="w-10 h-10" /></div>
              <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white">2. Set Your Check-In</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">Assign your family members or beneficiaries as nominees and set your heartbeat frequency.</p>
            </div>
            <div className="space-y-6">
              <div className="w-20 h-20 bg-green-600/10 rounded-full flex items-center justify-center mx-auto text-green-600 dark:text-green-500 border border-green-500/20"><Zap className="w-10 h-10" /></div>
              <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white">3. Deliver Automatically</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">If you go offline for too long, the decentralized protocol automatically triggers and transfers access.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Pillars (The Information) */}
      <section id="security" className="py-32 px-6 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-5xl font-serif font-black text-slate-900 dark:text-white tracking-tight mb-4">Complete privacy, by design.</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Even we cannot see or access your stored keys or data.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PillarCard 
              icon={<ShieldCheck className="w-10 h-10" />}
              title="Zero-Knowledge Encryption"
              desc="Encryption happens entirely on your local device before uploading. Nobody except you and your nominees holds the key."
              tags={['100% Private', 'No Admins']}
            />
            <PillarCard 
              icon={<Network className="w-10 h-10" />}
              title="Eternal Decentralized Storage"
              desc="Files are encrypted and split across decentralized nodes, ensuring your legacy is resilient and permanently safe."
              tags={['IPFS / Arweave', 'Redundant']}
            />
            <PillarCard 
              icon={<Workflow className="w-10 h-10" />}
              title="Immutable Blockchain Code"
              desc="No human permission or company override is required. Smart contracts handle the transfer logic automatically."
              tags={['Smart Contracts', 'Self-Executing']}
            />
          </div>
        </div>
      </section>      {/* Checklist Section */}
      <section className="py-32 px-6 bg-slate-100/50 dark:bg-white/[0.02] border-y border-slate-200 dark:border-white/5 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
           <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1">
                <h2 className="text-3xl md:text-5xl font-serif font-black text-slate-900 dark:text-white tracking-tight mb-8">What should you protect?</h2>
                <div className="space-y-4">
                  <ChecklistItem text="Crypto Seed Phrases & Private Keys" />
                  <ChecklistItem text="Property Papers & Digital Wills" />
                  <ChecklistItem text="Business Master Passwords" />
                  <ChecklistItem text="Messages for Loved Ones" />
                </div>
              </div>
              <div className="flex-1 p-12 bg-blue-600/10 rounded-[3rem] border border-blue-500/20">
                <p className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white mb-6 leading-relaxed">"Don&apos;t leave your life&apos;s work to chance. Leave it to code."</p>
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
            <h2 className="text-3xl md:text-5xl font-serif font-black text-slate-900 dark:text-white tracking-tight">Frequently Asked Questions</h2>
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
      <article className="py-32 px-6 border-t border-slate-200 dark:border-white/5 relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50 dark:from-[#030712] dark:via-[#030712] dark:to-[#030712] transition-colors duration-300">
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
                In the rapidly evolving world of Web3, securing your digital assets is paramount. But what happens to your cryptocurrency and seed phrases if you lose access? <strong>AlwaysThere Vault</strong> solves the multi-billion dollar problem of lost digital wealth through an automated, trustless, and immutable crypto dead man switch. Every year, massive amounts of Bitcoin are permanently lost because physical wills fail to transfer self-custodial wealth securely. Our <strong>Web3 succession planning</strong> tools ensure that your <strong>decentralized digital assets recovery</strong> is handled by code, not intermediaries.
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

      {/* 2FA Login Verification Modal */}
      <AnimatePresence>
        {pendingMfaData && (
          <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl max-w-md w-full text-slate-100 shadow-2xl relative my-8 md:my-16"
            >
              <button 
                onClick={closeMfaModal}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="size-5" />
              </button>

              <form onSubmit={handleMfaVerifySubmit} className="space-y-6">
                <div className="text-center">
                  <div className="icon-container w-12 h-12 mx-auto bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center mb-3">
                    <Fingerprint className="size-6 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Two-Factor Authentication</h3>
                  <p className="text-xs text-slate-400 mt-1">Please enter the 6-digit verification code from your Authenticator App.</p>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest text-slate-500 font-bold block">
                    Verification Code
                  </label>
                  <input 
                    type="text"
                    maxLength={6}
                    placeholder="000000"
                    value={mfaVerifyCode}
                    onChange={(e) => {
                      setMfaVerifyCode(e.target.value)
                      if (mfaError) setMfaError(null)
                    }}
                    className={`w-full bg-slate-950 border ${mfaError ? 'border-red-500 bg-red-500/5' : 'border-slate-800'} rounded-xl px-4 py-3 text-center text-lg font-mono tracking-[0.5em] text-white focus:outline-none focus:border-blue-500`}
                    autoFocus
                  />
                  {mfaError ? (
                    <p className="text-xs text-red-400 font-bold text-center mt-2 flex items-center justify-center gap-1.5 bg-red-500/5 border border-red-500/10 py-2 rounded-xl">
                      <span className="text-red-500">⚠️</span> {mfaError}
                    </p>
                  ) : (
                    <p className="text-[10px] text-slate-500 text-center leading-normal">
                      Enter the code currently displayed in your Google Authenticator or Microsoft Authenticator app.
                    </p>
                  )}
                </div>

                <div className="flex gap-3">
                  <button 
                    type="button"
                    onClick={closeMfaModal}
                    className="flex-1 bg-transparent border border-slate-800 text-slate-400 hover:text-white text-xs uppercase tracking-widest py-3.5 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={isVerifyingMfa}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl shadow-lg transition-colors disabled:opacity-50"
                  >
                    Verify & Login
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
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