'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Shield,
  Heart,
  Users,
  FileText,
  Key,
  Lock,
  Zap,
  Globe,
  CheckCircle,
  RefreshCw,
  Server,
  Activity,
  ArrowRight,
  Fingerprint,
  AlertOctagon,
  Clock,
  KeyRound,
  Network
} from 'lucide-react'
import { AssetCreationForm } from '@/components/asset-creation-form'
import { HeartbeatMonitor } from '@/components/heartbeat-monitor'
import { OverviewDashboard } from '@/components/overview-dashboard'
import { BeneficiariesDashboard } from '@/components/beneficiaries-dashboard'
import { StatusDashboard } from '@/components/status-dashboard'
import { WalletConnectModal } from '@/components/wallet-connect-modal'
import WebStorageService, { AppState } from '@/lib/storage'
import Link from 'next/link'
import { SharedFooter } from '@/components/shared-footer'

export default function HomePage() {
  const [isConnected, setIsConnected] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [address, setAddress] = useState('0x742d35Cc6634C0532925a3b8D4C2C4e0C8b83c8e')
  const [appState, setAppState] = useState<AppState | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isConnecting, setIsConnecting] = useState(false)
  const [showWalletModal, setShowWalletModal] = useState(false)

  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const storage = WebStorageService.getInstance()

  // --- Persistence Logic ---
  useEffect(() => {
    const checkConnection = () => {
      const storedConnection = localStorage.getItem('dwp_wallet_connected')
      if (storedConnection === 'true') {
        const storedAddress = localStorage.getItem('dwp_wallet_address')
        if (storedAddress) setAddress(storedAddress)
        setIsConnected(true)
      } else {
        setIsLoading(false)
      }
    }
    checkConnection()
  }, [])

  useEffect(() => {
    if (isConnected) {
      loadAppState()
      const interval = setInterval(loadAppState, 10000)
      return () => clearInterval(interval)
    }
  }, [isConnected])

  const loadAppState = async () => {
    try {
      const state = await storage.getAppState()
      setAppState(state)
    } catch (error) {
      console.error('Failed to load app state:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleConnect = () => {
    setShowWalletModal(true)
  }

  const handleWalletConnect = () => {
    setIsConnecting(true)
    setTimeout(() => {
      setIsConnected(true)
      localStorage.setItem('dwp_wallet_connected', 'true')
      localStorage.setItem('dwp_wallet_address', address)
      setIsConnecting(false)
      setShowWalletModal(false)
    }, 2000)
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    localStorage.removeItem('dwp_wallet_connected')
    localStorage.removeItem('dwp_wallet_address')
  }

  const getHeartbeatStatusInfo = () => {
    if (!appState) return { status: 'Unknown', color: 'gray', lastTime: 'Never' }

    const now = Date.now()
    const daysSinceLastHeartbeat = (now - appState.stats.lastHeartbeat) / (1000 * 60 * 60 * 24)

    if (daysSinceLastHeartbeat <= appState.settings.heartbeatInterval) {
      return { status: 'Active', color: 'green', lastTime: new Date(appState.stats.lastHeartbeat).toLocaleDateString() }
    } else if (daysSinceLastHeartbeat <= appState.settings.heartbeatInterval + appState.settings.gracePeriod) {
      return { status: 'Grace Period', color: 'yellow', lastTime: new Date(appState.stats.lastHeartbeat).toLocaleDateString() }
    } else {
      return { status: 'Overdue', color: 'red', lastTime: new Date(appState.stats.lastHeartbeat).toLocaleDateString() }
    }
  }

  const getSystemStatusInfo = () => {
    if (!appState) return { status: 'Unknown', color: 'gray' }

    switch (appState.stats.systemStatus) {
      case 'secure': return { status: 'Secure', color: 'green' }
      case 'warning': return { status: 'Warning', color: 'yellow' }
      case 'error': return { status: 'Error', color: 'red' }
      default: return { status: 'Unknown', color: 'gray' }
    }
  }

  const defaultTransition: any = { duration: 0.8, ease: "easeOut" }

  // Mock Activity Log for the Overview to make it look active and dense
  const mockActivities = [
    { type: 'heartbeat', title: 'Heartbeat Signature Verified', time: '2 hours ago', icon: <Heart className="w-4 h-4 text-green-400" /> },
    { type: 'asset', title: 'Encrypted Payload "Cold Wallet Seeds" synced to IPFS', time: '1 day ago', icon: <Server className="w-4 h-4 text-[#2b52ff]" /> },
    { type: 'security', title: 'Protocol Quorum Status: 5/5 Shards Healthy', time: '2 days ago', icon: <Shield className="w-4 h-4 text-purple-400" /> },
    { type: 'beneficiary', title: 'Added "Legal Counsel" to Beneficiary Matrix', time: '5 days ago', icon: <Users className="w-4 h-4 text-orange-400" /> },
  ]

  if (!isConnected) {
    return (
      <div ref={containerRef} className="min-h-screen bg-[#050a1a] font-sans selection:bg-[#2b52ff]/30 selection:text-white">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-[#050a1a]/80 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
            {/* Left side Links */}
            <div className="flex-1 flex items-center space-x-8">
              <Link href="/features" className="text-sm font-semibold text-blue-100/70 hover:text-white transition-colors">Features</Link>
              <Link href="/docs" className="text-sm font-semibold text-blue-100/70 hover:text-white transition-colors">Documentation</Link>
            </div>

            {/* Center Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center flex-col justify-center group relative cursor-pointer">
              <div className="absolute inset-0 bg-[#2b52ff]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Shield className="h-8 w-8 text-[#2b52ff] mb-1 relative z-10" />
              <span className="text-sm font-bold tracking-[0.2em] uppercase bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 relative z-10">
                Digital Will
              </span>
            </Link>

            {/* Right side Button */}
            <div className="flex-1 flex items-center justify-end space-x-6">
              <Link href="/security" className="hidden sm:block text-sm font-semibold text-blue-100/70 hover:text-white transition-colors">Security</Link>
              <button
                onClick={handleConnect}
                disabled={isConnecting}
                className="bg-[#2b52ff] hover:bg-white text-white hover:text-[#2b52ff] px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-[#2b52ff]/20 disabled:opacity-50"
              >
                {isConnecting ? (
                  <span className="flex items-center"><RefreshCw className="w-4 h-4 mr-2 animate-spin" />Connecting...</span>
                ) : 'Launch App'}
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="h-screen flex flex-col justify-center pt-20 pb-10 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0a1536] to-[#050a1a]"></div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-[#2b52ff]/10 rounded-full blur-[150px] pointer-events-none"
          />

          <div className="max-w-7xl mx-auto w-full relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...defaultTransition, delay: 0.1 }}
              className="mb-8"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-sm mb-6">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                <span className="text-xs font-semibold tracking-wide text-blue-100/80">Secure • Decentralized • Trustless</span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.1]">
                Your Digital Legacy, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2b52ff] to-[#a259ff]">Protected Forever.</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...defaultTransition, delay: 0.3 }}
              className="max-w-xl"
            >
              <p className="text-lg lg:text-xl text-blue-100/70 font-medium leading-relaxed mb-10">
                A robust, zero-trust system verifying automated transfers of your digital assets via cryptographic heartbeats.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={handleConnect}
                  className="w-full sm:w-auto bg-[#2b52ff] hover:bg-white text-white hover:text-[#2b52ff] px-8 py-4 rounded-xl font-bold tracking-wide transition-all shadow-lg shadow-[#2b52ff]/30 hover:shadow-xl hover:-translate-y-1 active:scale-95"
                >
                  Access Protocol
                </button>
                <Link href="/features" className="w-full sm:w-auto flex justify-center text-sm font-bold text-white bg-white/5 hover:bg-white/10 px-8 py-4 rounded-xl border border-white/10 transition-all">
                  Read Specifications
                </Link>
              </div>

              <div className="flex items-center gap-6 text-xs font-semibold tracking-wider text-blue-100/50 mt-10 uppercase">
                <span className="flex items-center"><Activity className="w-4 h-4 mr-2" /> AES-256-GCM</span>
                <span className="flex items-center"><Server className="w-4 h-4 mr-2" /> IPFS</span>
                <span className="flex items-center"><Zap className="w-4 h-4 mr-2" /> Polygon</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* The Core Problem Section */}
        <div className="relative z-20 py-24 bg-[#020510] border-t border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={defaultTransition}
              >
                <div className="inline-flex items-center gap-2 mb-6 text-sm font-semibold text-red-500 uppercase tracking-widest bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-full">
                  <AlertOctagon className="w-4 h-4" /> The Multi-Billion Dollar Problem
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                  Billions in Crypto Are Lost Forever <br />
                  <span className="text-white/40">When Owners Pass Away.</span>
                </h2>
                <p className="text-lg text-blue-100/60 leading-relaxed mb-8">
                  Hardware wallets, paper seed phrases, and complex DeFi positions are entirely dependent on you staying alive. If tragedy strikes with no succession plan, your decentralized wealth becomes permanently inaccessible to your family.
                </p>
                <div className="space-y-4">
                  {[
                    "Seed phrases hidden in safes are easily lost or stolen.",
                    "Custodial exchanges require lengthy, painful legal battles.",
                    "Loved ones lack the technical knowledge to recover assets."
                  ].map((issue, idx) => (
                    <div key={idx} className="flex items-center gap-4 bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_10px_red]"></div>
                      <span className="text-slate-300 font-medium">{issue}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={defaultTransition}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-red-500/10 to-[#2b52ff]/10 blur-3xl rounded-full"></div>
                <div className="bg-[#050a1a] border border-white/10 p-8 rounded-[2rem] relative z-10 shadow-2xl">
                  <div className="border-b border-white/10 pb-6 mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">The Legacy Dilemma</h3>
                    <p className="text-sm text-slate-400">Comparing traditional vs. decentralized inheritance.</p>
                  </div>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">Traditional Lawyers</span>
                      <span className="text-red-400 font-bold ml-4 text-right">Slow, Expensive, Public</span>
                    </div>
                    <div className="w-full bg-white/5 h-px"></div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">Hardware Wallets</span>
                      <span className="text-red-400 font-bold ml-4 text-right">Single Point of Failure</span>
                    </div>
                    <div className="w-full bg-white/5 h-px"></div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#2b52ff] font-bold">Digital Will Protocol</span>
                      <span className="text-green-400 font-bold ml-4 text-right">Trustless, Instant, Automated</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* How It Works Timeline Section */}
        <div className="relative z-20 py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-24 relative">
              <div className="absolute left-1/2 -top-10 -translate-x-1/2 w-[600px] h-[300px] bg-[#a259ff]/10 blur-[120px] rounded-full pointer-events-none"></div>
              <span className="text-[#a259ff] uppercase tracking-[0.2em] text-sm font-extrabold mb-4 block">The Mechanism</span>
              <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight">How DWP Secures Your Future.</h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 relative">
              {/* Connecting line for large screens */}
              <div className="hidden lg:block absolute top-[4.5rem] left-20 right-20 h-0.5 bg-gradient-to-r from-white/0 via-[#2b52ff]/50 to-white/0 z-0"></div>

              {[
                {
                  icon: <Lock />,
                  title: "1. Zero-Knowledge Encryption",
                  desc: "You paste your seed phrases locally. The AES-256 key is split via Shamir's Secret Sharing. We never see your data.",
                  color: "from-[#2b52ff] to-[#00d2ff]"
                },
                {
                  icon: <Clock />,
                  title: "2. The Heartbeat Contract",
                  desc: "A smart contract on Polygon holds the vault state. You prove you are alive by sending a free, gasless signature every X months.",
                  color: "from-[#a259ff] to-[#ff00a0]"
                },
                {
                  icon: <KeyRound />,
                  title: "3. Automated Execution",
                  desc: "If the countdown timer reaches zero without a heartbeat, the network unlocks the shards. Beneficiaries claim access cryptographically.",
                  color: "from-[#00ff87] to-[#60efff]"
                }
              ].map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2, duration: 0.6 }}
                  className="relative z-10 bg-[#050a1a] border border-white/5 p-8 rounded-[2rem] group hover:border-white/20 transition-all hover:bg-white/[0.02]"
                >
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} p-[1px] mb-8 mx-auto lg:mx-0 shadow-2xl`}>
                    <div className="w-full h-full bg-[#050a1a] rounded-2xl flex items-center justify-center text-white group-hover:bg-transparent transition-colors">
                      <div className="w-8 h-8">{step.icon}</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 text-center lg:text-left">{step.title}</h3>
                  <p className="text-blue-100/60 leading-relaxed text-center lg:text-left">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bento Grid Features */}
        <div className="relative z-20 py-24 pb-32 bg-[#020510]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <span className="text-[#2b52ff] uppercase tracking-[0.15em] text-xs font-extrabold mb-4 block">Core Infrastructure</span>
              <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight">Enterprise-Grade Security.</h2>
            </div>

            <div className="grid lg:grid-cols-12 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={defaultTransition}
                className="lg:col-span-8 bg-white/[0.02] border border-white/5 rounded-[2rem] p-10 hover:bg-white/[0.04] transition-colors overflow-hidden relative group"
              >
                <div className="w-12 h-12 bg-[#2b52ff]/20 rounded-xl flex items-center justify-center mb-6 border border-[#2b52ff]/30">
                  <Lock className="w-6 h-6 text-[#2b52ff]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Zero Trust Architecture</h3>
                <p className="text-blue-100/60 leading-relaxed mb-6 max-w-lg">
                  Your data is encrypted client-side. Our servers never touch your plaintext inputs. Verification happens natively via cryptographic primitives.
                </p>
                <ul className="space-y-3 text-sm text-blue-100/80 mb-8">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-[#2b52ff] mr-3" /> Client-side AES-256-GCM encryption</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-[#2b52ff] mr-3" /> No server access to private keys</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...defaultTransition, delay: 0.1 }}
                className="lg:col-span-4 bg-gradient-to-br from-[#0a1536] to-[#050a1a] border border-[#2b52ff]/20 rounded-[2rem] p-10 hover:border-[#2b52ff]/40 transition-colors shadow-2xl"
              >
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 border border-white/10">
                  <Fingerprint className="w-6 h-6 text-[#a259ff]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 tracking-tight">Shamir Secret Sharing</h3>
                <p className="text-blue-100/60 text-sm leading-relaxed mb-6">
                  Keys are split into 5 fragments across decentralized storage nodes, requiring a M-of-N threshold quorum to reassemble the payload.
                </p>
                <Link href="/security" className="text-xs font-bold text-white flex items-center hover:text-[#a259ff] transition-colors">
                  Security Model <ArrowRight className="w-3 h-3 ml-2" />
                </Link>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mt-6">
              {[
                { icon: <FileText />, title: "Creating Assets", desc: "Upload docs & keys to encrypt natively.", step: "01" },
                { icon: <Lock />, title: "Encrypt & Split", desc: "AES-256 secures it, Shamir's splits keys.", step: "02" },
                { icon: <Heart />, title: "Heartbeat", desc: "Periodic cryptographic proof-of-life ping.", step: "03" },
                { icon: <Zap />, title: "Auto-Release", desc: "Polygon contract fires on heartbeat decay.", step: "04" },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="bg-white/[0.01] border border-white/5 rounded-2xl p-6 text-center hover:bg-white/[0.03] transition-colors"
                >
                  <div className="text-2xl font-black text-[#2b52ff]/20 mb-2">{item.step}</div>
                  <div className="w-10 h-10 mx-auto text-[#2b52ff] mb-4 flex items-center justify-center bg-white/5 rounded-full">{item.icon}</div>
                  <h4 className="text-white font-bold mb-2">{item.title}</h4>
                  <p className="text-xs text-blue-100/50">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <SharedFooter />

        <WalletConnectModal
          isOpen={showWalletModal}
          onClose={() => setShowWalletModal(false)}
          onConnect={handleWalletConnect}
          isConnecting={isConnecting}
        />
      </div>
    )
  }

  // Dashboard Interface (Connected State)
  return (
    <div className="min-h-screen p-4 bg-[#050a1a] text-slate-50 selection:bg-[#2b52ff]/30 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-white/[0.02] border border-white/5 rounded-2xl p-6 shadow-2xl backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-[#2b52ff]/10 blur-3xl rounded-full pointer-events-none"></div>
          <div className="flex items-center space-x-4 mb-4 sm:mb-0 relative z-10">
            <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#2b52ff]/20 to-[#00d2ff]/20 rounded-xl border border-[#2b52ff]/30 shadow-[0_0_15px_rgba(43,82,255,0.2)]">
              <Shield className="h-6 w-6 text-[#2b52ff]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                Digital Will Protocol
              </h1>
              <div className="flex items-center text-xs font-medium text-blue-100/60 mt-1">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                Connected Vault: <span className="font-mono text-white ml-2 bg-white/5 px-2 py-0.5 rounded border border-white/10">{address}</span>
              </div>
            </div>
          </div>
          <button
            onClick={handleDisconnect}
            className="px-6 py-2.5 border border-white/10 hover:border-red-500/50 hover:text-red-400 rounded-xl text-sm font-semibold transition-all hover:bg-red-500/10 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] disabled:opacity-50 relative z-10"
          >
            Lock & Disconnect
          </button>
        </div>

        {/* Dashboard Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white/[0.03] border border-white/10 p-1 rounded-xl w-full grid grid-cols-2 md:grid-cols-5 gap-1">
            {['overview', 'assets', 'beneficiaries', 'heartbeat', 'status'].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="capitalize data-[state=active]:bg-[#2b52ff] data-[state=active]:text-white text-blue-100/60 rounded-lg transition-all"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-24 space-y-4">
                <RefreshCw className="h-8 w-8 text-[#2b52ff] animate-spin" />
                <span className="text-blue-100/60 font-medium">Decrypting Vault Telemetry...</span>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <OverviewDashboard />
              </motion.div>
            )}
          </TabsContent>

          {/* Sub Views */}
          <TabsContent value="assets" className="mt-6">
            <AssetCreationForm />
          </TabsContent>

          <TabsContent value="beneficiaries" className="mt-6">
            <BeneficiariesDashboard />
          </TabsContent>

          <TabsContent value="heartbeat" className="mt-6">
            <HeartbeatMonitor />
          </TabsContent>

          <TabsContent value="status" className="mt-6">
            <StatusDashboard />
          </TabsContent>
        </Tabs>
      </div>

      <WalletConnectModal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        onConnect={handleWalletConnect}
        isConnecting={isConnecting}
      />
    </div>
  )
}