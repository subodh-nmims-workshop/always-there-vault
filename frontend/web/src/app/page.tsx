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
  Network,
  LineChart
} from 'lucide-react'
import { AssetCreationForm } from '@/components/asset-creation-form'
import { HeartbeatMonitor } from '@/components/heartbeat-monitor'
import { OverviewDashboard } from '@/components/overview-dashboard'
import { BeneficiariesDashboard } from '@/components/beneficiaries-dashboard'
import { BeneficiaryManager } from '@/components/beneficiary-manager'
import { StatusDashboard } from '@/components/status-dashboard'
import { SubscriptionDashboard } from '@/components/subscription-dashboard'
import { WalletConnectModal } from '@/components/wallet-connect-modal'
import { ModeIndicator } from '@/components/mode-indicator'
import { TrialBanner } from '@/components/trial-banner'
import WebStorageService, { AppState } from '@/lib/storage'
import Link from 'next/link'
import { SharedFooter } from '@/components/shared-footer'

export default function HomePage() {
  const [isConnected, setIsConnected] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const savedTab = localStorage.getItem('dwp_active_tab')
    if (savedTab) setActiveTab(savedTab)
  }, [])

  const handleTabChange = (val: string) => {
    setActiveTab(val)
    localStorage.setItem('dwp_active_tab', val)
  }
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
      <div ref={containerRef} className="min-h-screen bg-[#080a0f] font-sans text-slate-100 selection:bg-[#1152d4]/30 flex flex-col overflow-x-hidden relative">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-[#080a0f]/80 backdrop-blur-xl border-b border-white/5 px-4 sm:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="text-[#1152d4] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Shield className="w-8 h-8" />
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:block">DeadMan Protocol</span>
          </Link>
          <div className="hidden md:flex gap-8 items-center absolute left-1/2 -translate-x-1/2">
            <Link href="/features" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Features</Link>
            <Link href="/docs" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Documentation</Link>
            <Link href="/security" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Security</Link>
          </div>
          <button
            onClick={handleConnect}
            disabled={isConnecting}
            className="bg-[#1152d4] hover:bg-[#1152d4]/80 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-[0_0_20px_rgba(17,82,212,0.4)] disabled:opacity-50 flex items-center"
          >
            {isConnecting ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : null}
            {isConnecting ? 'Connecting...' : 'Launch App'}
          </button>
        </nav>

        <main className="flex-1 flex flex-col relative">
          {/* Hero Section */}
          <section className="relative pt-24 pb-20 px-6 text-center overflow-hidden flex flex-col items-center justify-center min-h-[85vh]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-[#1152d4]/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={defaultTransition}
              className="max-w-4xl mx-auto space-y-8 relative z-10"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-sm mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
                <span className="text-xs font-semibold tracking-wide text-blue-100/80 uppercase">Secure • Decentralized • Trustless</span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tight text-slate-100">
                Your Digital Legacy,<br />
                <span className="bg-gradient-to-r from-[#1152d4] to-[#8b5cf6] bg-clip-text text-transparent">Protected Forever.</span>
              </h1>

              <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Decentralized asset inheritance secured by smart contracts and zero-knowledge encryption. Built for the future of finance.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                <button
                  onClick={handleConnect}
                  className="w-full sm:w-auto px-8 py-4 bg-[#1152d4] text-white rounded-full font-bold text-lg shadow-[0_0_20px_rgba(17,82,212,0.4)] hover:scale-105 hover:shadow-[0_0_30px_rgba(17,82,212,0.6)] transition-all"
                >
                  Access Protocol
                </button>
                <Link href="/features" className="w-full sm:w-auto px-8 py-4 bg-white/[0.03] border border-white/10 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-colors backdrop-blur-md flex justify-center">
                  Read Specifications
                </Link>
              </div>

              <div className="flex justify-center items-center gap-8 text-xs font-semibold tracking-wider text-slate-500 mt-12 uppercase">
                <span className="flex items-center"><Shield className="w-4 h-4 mr-2" /> AES-256-GCM</span>
                <span className="flex items-center"><Server className="w-4 h-4 mr-2" /> IPFS Storage</span>
                <span className="flex items-center"><LineChart className="w-4 h-4 mr-2" /> Polygon Network</span>
              </div>
            </motion.div>
          </section>

          {/* Feature Grid */}
          <section className="px-6 py-20 relative z-10 border-t border-white/5 bg-[#05070a]">
            <div className="flex flex-col gap-12 max-w-6xl mx-auto">
              <div className="flex flex-col gap-3 text-center md:text-left">
                <span className="text-[#1152d4] font-bold tracking-widest text-xs uppercase">Security Protocol</span>
                <h2 className="text-3xl md:text-5xl font-bold text-slate-100 tracking-tight">Battle-Tested Architecture</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="bg-white/[0.02] backdrop-blur-xl p-10 rounded-3xl flex flex-col gap-6 border border-white/5 hover:border-[#1152d4]/50 hover:bg-white/[0.04] transition-all group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#1152d4]/10 flex items-center justify-center text-[#1152d4] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(17,82,212,0.3)] transition-all">
                    <Lock className="w-7 h-7" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-slate-100">Zero Trust Architecture</h3>
                    <p className="text-slate-400 leading-relaxed">End-to-end encryption with zero-knowledge proofs ensuring privacy remains absolute. Servers never see plaintext.</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="bg-white/[0.02] backdrop-blur-xl p-10 rounded-3xl flex flex-col gap-6 border border-white/5 hover:border-[#8b5cf6]/50 hover:bg-white/[0.04] transition-all group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#8b5cf6]/10 flex items-center justify-center text-[#8b5cf6] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all">
                    <Key className="w-7 h-7" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-slate-100">Shamir Secret Sharing</h3>
                    <p className="text-slate-400 leading-relaxed">Distributed key security via advanced secret sharing protocols across decentralized nodes. No single point of failure.</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="bg-white/[0.02] backdrop-blur-xl p-10 rounded-3xl flex flex-col gap-6 border border-white/5 hover:border-[#10b981]/50 hover:bg-white/[0.04] transition-all group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#10b981]/10 flex items-center justify-center text-[#10b981] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all">
                    <Clock className="w-7 h-7" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-slate-100">Automated Execution</h3>
                    <p className="text-slate-400 leading-relaxed">Precision-engineered heartbeat smart contracts trigger asset transfer automatically upon verification of life decay.</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Social Proof */}
          <section className="px-6 py-24 relative overflow-hidden bg-[#080a0f]">
            <div className="max-w-5xl mx-auto rounded-[3rem] overflow-hidden bg-white/[0.02] border border-[#1152d4]/20 relative p-10 md:p-16 backdrop-blur-xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#1152d4]/20 blur-[100px] pointer-events-none -z-10"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8b5cf6]/10 blur-[100px] pointer-events-none -z-10"></div>

              <div className="max-w-2xl space-y-6 relative z-10">
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Secure Your Future Today</h2>
                <p className="text-xl text-slate-400 leading-relaxed">Join users who trust DeadMan Protocol to secure their digital legacy on-chain.</p>

                <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <button onClick={handleConnect} className="w-full sm:w-auto px-8 py-4 bg-white text-[#080a0f] rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center">
                    Connect Wallet <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>

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
    <div className="min-h-screen bg-[#050a1a] text-slate-50 selection:bg-[#2b52ff]/30 font-sans flex flex-col relative overflow-hidden">
      {/* Global Navigation */}
      <nav className="sticky top-0 z-50 bg-[#050a1a]/80 backdrop-blur-xl border-b border-white/5 px-4 sm:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="text-[#2b52ff] flex items-center justify-center group-hover:scale-110 transition-transform">
            <Shield className="w-8 h-8" />
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:block">DeadMan Protocol</span>
        </Link>
        <div className="hidden md:flex gap-8 items-center absolute left-1/2 -translate-x-1/2">
          <Link href="/features" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Features</Link>
          <Link href="/docs" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Documentation</Link>
          <Link href="/security" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Security</Link>
        </div>
        <button
          onClick={handleDisconnect}
          className="border border-red-500/30 text-red-400 hover:bg-red-500/10 px-5 py-2 rounded-full font-bold text-sm transition-all shadow-[0_0_15px_rgba(239,68,68,0.2)]"
        >
          Disconnect
        </button>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:px-6 lg:px-8 space-y-8 mt-8 mb-24">
        {/* Trial Banner */}
        <TrialBanner />

        {/* Header / Vault Info */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-white/[0.02] border border-white/5 rounded-2xl p-6 shadow-2xl backdrop-blur-sm relative z-50">
          <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-[#2b52ff]/10 blur-3xl rounded-full pointer-events-none"></div>
          <div className="flex items-center space-x-4 mb-4 sm:mb-0 relative z-10 w-full sm:w-auto">
            <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#2b52ff]/20 to-[#00d2ff]/20 rounded-xl border border-[#2b52ff]/30 shadow-[0_0_15px_rgba(43,82,255,0.2)]">
              <KeyRound className="h-6 w-6 text-[#2b52ff]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                Encrypted Vault Instance
              </h1>
              <div className="flex items-center text-xs font-medium text-blue-100/60 mt-1">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                Connected Account: <span className="font-mono text-white ml-2 bg-white/5 px-2 py-0.5 rounded border border-white/10">{address}</span>
              </div>
            </div>
          </div>

          {/* Mode Indicator */}
          <div className="relative">
            <ModeIndicator />
          </div>
        </div>

        {/* Dashboard Content */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="bg-white/[0.03] border border-white/10 p-1 rounded-xl w-full grid grid-cols-2 md:grid-cols-6 gap-1 shadow-lg backdrop-blur-md">
            {['overview', 'assets', 'beneficiaries', 'heartbeat', 'subscription', 'status'].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="capitalize data-[state=active]:bg-[#2b52ff] data-[state=active]:text-white text-slate-400 rounded-lg transition-all font-semibold"
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
                <OverviewDashboard onNavigate={setActiveTab} />
              </motion.div>
            )}
          </TabsContent>

          {/* Sub Views */}
          <TabsContent value="assets" className="mt-6">
            <AssetCreationForm />
          </TabsContent>

          <TabsContent value="beneficiaries" className="mt-6">
            <BeneficiariesDashboard onNavigate={setActiveTab} />
          </TabsContent>

          <TabsContent value="beneficiaries_manage" className="mt-6">
            <div className="mb-6 flex items-center bg-white/[0.02] border border-white/5 rounded-2xl p-4 shadow-xl">
              <button
                onClick={() => setActiveTab('beneficiaries')}
                className="text-slate-400 hover:text-white transition-colors flex items-center font-medium gap-2 px-4 py-2 hover:bg-white/5 rounded-xl"
              >
                ← Return to Beneficiaries Overview
              </button>
            </div>
            <BeneficiaryManager />
          </TabsContent>

          <TabsContent value="heartbeat" className="mt-6">
            <HeartbeatMonitor />
          </TabsContent>

          <TabsContent value="subscription" className="mt-6">
            <SubscriptionDashboard />
          </TabsContent>

          <TabsContent value="status" className="mt-6">
            <StatusDashboard />
          </TabsContent>
        </Tabs>
      </main>

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