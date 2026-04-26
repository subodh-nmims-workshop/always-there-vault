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
import { SupportSection } from '@/components/support-section'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function HomePage() {
  const { address: wagmiAddress } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const { disconnect } = useDisconnect()

  const [hasMounted, setHasMounted] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  const [isConnecting, setIsConnecting] = useState(false)
  const [showWalletModal, setShowWalletModal] = useState(false)

  useEffect(() => {
    setHasMounted(true)
    const storedConnection = localStorage.getItem('dwp_wallet_connected')
    if (storedConnection === 'true') {
      setIsConnected(true)
      setAddress(localStorage.getItem('dwp_wallet_address') || '')
    }
  }, [])

  const handleConnect = () => setShowWalletModal(true)

  const handleWalletConnect = async (walletAddress: string) => {
    setIsConnecting(true)
    try {
      const apiEndpoint = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7001'
      const nonceRes = await fetch(`${apiEndpoint}/api/auth/nonce`)
      const nonceData = await nonceRes.json().catch(() => ({}));
      const message = nonceData?.nonce || "Welcome to LASTWISH. Please sign this message to authenticate."
      const signature = await signMessageAsync({ message })
      const verifyRes = await fetch(`${apiEndpoint}/api/auth/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress, message, signature })
      })
      const authData = await verifyRes.json().catch(() => ({}));
      if (authData?.token) {
        setIsConnected(true)
        localStorage.setItem('dwp_wallet_connected', 'true')
        localStorage.setItem('dwp_wallet_address', walletAddress)
        localStorage.setItem('dwp_token', authData.token)
        setAddress(walletAddress)
        setShowWalletModal(false)
      }
    } catch (error: any) {
      if (process.env.NODE_ENV === 'development') {
        setIsConnected(true)
        setAddress(walletAddress)
        localStorage.setItem('dwp_wallet_connected', 'true')
        localStorage.setItem('dwp_wallet_address', walletAddress)
        setShowWalletModal(false)
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

  if (!hasMounted) return <div className="min-h-screen bg-[#030712]" />

  if (isConnected) {
    return (
      <div className="min-h-screen bg-[#030712] text-slate-100 font-sans flex flex-col overflow-x-hidden relative">
        <nav className="sticky top-0 z-50 bg-[#030712]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-xl tracking-tight text-white uppercase">LastWish</span>
          </Link>
          <button onClick={handleDisconnect} className="px-5 py-2.5 rounded-xl bg-red-500/10 text-red-500 text-xs font-black border border-red-500/20 uppercase tracking-widest">Logout</button>
        </nav>
        <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:px-6 lg:px-8 space-y-8 mt-8 mb-24">
          <TrialBanner />
          <div className="flex flex-col sm:flex-row items-center justify-between bg-white/[0.02] border border-white/5 rounded-3xl p-8 shadow-2xl backdrop-blur-sm">
            <div className="flex items-center space-x-5">
              <div className="w-14 h-14 flex items-center justify-center bg-blue-600/20 rounded-2xl border border-blue-500/30">
                <KeyRound className="h-7 w-7 text-blue-500" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-white">Your Secure Vault</h1>
                <p className="text-xs font-mono text-slate-500 mt-1 uppercase tracking-tighter opacity-70">{address}</p>
              </div>
            </div>
            <ModeIndicator />
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-white/5 border border-white/10 p-1.5 rounded-2xl w-full grid grid-cols-2 md:grid-cols-7 gap-1">
              {['overview', 'assets', 'beneficiaries', 'heartbeat', 'subscription', 'status', 'settings'].map((tab) => (
                <TabsTrigger key={tab} value={tab} className="capitalize text-[10px] font-black tracking-widest data-[state=active]:bg-blue-600 transition-all">
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="overview"><OverviewDashboard onNavigate={setActiveTab} /></TabsContent>
            <TabsContent value="assets"><AssetCreationForm /></TabsContent>
            <TabsContent value="beneficiaries"><BeneficiariesDashboard onNavigate={setActiveTab} /></TabsContent>
            <TabsContent value="heartbeat"><HeartbeatMonitor /></TabsContent>
            <TabsContent value="subscription"><SubscriptionDashboard /></TabsContent>
            <TabsContent value="status"><StatusDashboard /></TabsContent>
            <TabsContent value="settings"><SettingsDashboard /></TabsContent>
          </Tabs>
        </main>
        <SharedFooter />
        <SupportSection />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full" />
      </div>

      <nav className="fixed top-0 w-full z-50 bg-[#030712]/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase text-white">LastWish</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link href="#how-it-works" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors">How it works</Link>
          <Link href="#security" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors">Security</Link>
          <Link href="/docs" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors">Tech Guide</Link>
          <Link href="#pricing" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors">Pricing</Link>
        </div>
        <button onClick={handleConnect} className="px-6 py-2.5 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">Connect Wallet</button>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-8 uppercase">
            <Zap className="w-3 h-3" /> Secure Your Family&apos;s Future
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8 uppercase">
            YOUR DIGITAL LEGACY, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 font-black">PROTECTED FOREVER.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed mb-12">
            Every year, ₹35,000 Crore lies unclaimed in banks because families lose access. 
            Store your Crypto, Wills, and Secrets here. We deliver them to your loved ones automatically.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={handleConnect} className="w-full sm:w-auto px-10 py-6 rounded-2xl bg-blue-600 text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-blue-500 transition-all shadow-2xl shadow-blue-600/30">
              Start Your Vault <ArrowRight className="w-6 h-6" />
            </button>
            <Link href="#how-it-works" className="w-full sm:w-auto px-10 py-6 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest hover:bg-white/10 transition-all uppercase">How it works</Link>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <ShieldCheck className="w-4 h-4" /> AES-256-GCM
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <Cloud className="w-4 h-4" /> Cloudflare R2
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <Network className="w-4 h-4" /> Polygon Network
            </div>
          </div>
        </div>
      </section>

      {/* 3 Step Working (Very Simple) */}
      <section id="how-it-works" className="py-32 px-6 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl font-black text-white uppercase tracking-tight mb-4 italic">SIMPLE. SECURE. <span className="text-blue-500">AUTOMATIC.</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-6">
              <div className="w-20 h-20 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto text-blue-500 border border-blue-500/20"><Lock className="w-10 h-10" /></div>
              <h3 className="text-2xl font-black text-white uppercase">1. Store</h3>
              <p className="text-slate-500 font-medium leading-relaxed">Upload your important files, passwords, or seed phrases to your private vault.</p>
            </div>
            <div className="space-y-6">
              <div className="w-20 h-20 bg-purple-600/10 rounded-full flex items-center justify-center mx-auto text-purple-500 border border-purple-500/20"><Heart className="w-10 h-10" /></div>
              <h3 className="text-2xl font-black text-white uppercase">2. Assign</h3>
              <p className="text-slate-500 font-medium leading-relaxed">Add your family members as nominees and set a timer (e.g. 30 days).</p>
            </div>
            <div className="space-y-6">
              <div className="w-20 h-20 bg-green-600/10 rounded-full flex items-center justify-center mx-auto text-green-500 border border-green-500/20"><Zap className="w-10 h-10" /></div>
              <h3 className="text-2xl font-black text-white uppercase">3. Deliver</h3>
              <p className="text-slate-500 font-medium leading-relaxed">If you go offline, the protocol automatically delivers the files to them.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Pillars (The Information) */}
      <section id="security" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl font-black text-white uppercase tracking-tight mb-4">TOTAL <span className="text-blue-500">PRIVACY</span></h2>
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
      <section className="py-32 px-6 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
           <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1">
                <h2 className="text-4xl font-black text-white uppercase mb-8 leading-tight tracking-tight italic">WHAT SHOULD YOU <br /><span className="text-blue-500">PROTECT?</span></h2>
                <div className="space-y-4">
                  <ChecklistItem text="Crypto Seed Phrases & Private Keys" />
                  <ChecklistItem text="Property Papers & Digital Wills" />
                  <ChecklistItem text="Business Master Passwords" />
                  <ChecklistItem text="Messages for Loved Ones" />
                </div>
              </div>
              <div className="flex-1 p-12 bg-blue-600/10 rounded-[3rem] border border-blue-500/20">
                <p className="text-4xl font-black text-white italic uppercase mb-6 leading-[1.1]">"Don&apos;t leave your life&apos;s work to chance. Leave it to code."</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600" />
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Protocol Founder</span>
                </div>
              </div>
           </div>
        </div>
      </section>

      {/* Simple FAQ */}
      <section id="faq" className="py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-white uppercase tracking-tight">COMMON <span className="text-blue-500">QUESTIONS</span></h2>
          </div>
          <div className="space-y-2">
            <FaqItem 
              question="Can LastWish see my private data?" 
              answer="Absolutely not. Your files are encrypted locally on your device using your wallet signature. We only store encrypted 'shards' that are impossible for us or anyone else to read without your key." 
            />
            <FaqItem 
              question="How will my nominees get access?" 
              answer="Once the protocol detects that your heartbeat timer has expired and the grace period ends, it automatically generates and sends a secure access link to your nominees." 
            />
            <FaqItem 
              question="Is LastWish free to use?" 
              answer="Yes! We offer a 'Forever Free' plan for basic asset protection. For larger storage (up to 1TB) and advanced features, you can upgrade to our professional plans anytime." 
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32 border-t border-white/5">
        <PricingPlans />
      </section>

      <SharedFooter />
      <WalletConnectModal isOpen={showWalletModal} onClose={() => setShowWalletModal(false)} onConnect={handleWalletConnect} isConnecting={isConnecting} />
    </div>
  )
}

function StatBox({ label, value }: any) {
  return (
    <div>
      <div className="text-3xl font-black text-white mb-2 tracking-tighter">{value}</div>
      <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{label}</div>
    </div>
  )
}

function PillarCard({ icon, title, desc, tags }: any) {
  return (
    <div className="p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:border-blue-500/30 transition-all group">
      <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 mb-8">{icon}</div>
      <h4 className="text-xl font-black text-white uppercase mb-4 tracking-tight">{title}</h4>
      <p className="text-sm text-slate-500 leading-relaxed font-medium mb-8">{desc}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag: string) => (
          <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[9px] font-black text-slate-400 uppercase tracking-widest">{tag}</span>
        ))}
      </div>
    </div>
  )
}

function ChecklistItem({ text }: any) {
  return (
    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-blue-500/20 transition-all">
      <CheckCircle2 className="w-5 h-5 text-blue-500" />
      <span className="text-xs font-black text-slate-200 uppercase tracking-widest">{text}</span>
    </div>
  )
}

function FaqItem({ question, answer }: any) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="border-b border-white/5 last:border-0">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-6 flex items-center justify-between text-left group">
        <span className="text-sm font-black uppercase text-white group-hover:text-blue-500 transition-colors">{question}</span>
        <ChevronRight className={`w-5 h-5 text-slate-500 transition-transform ${isOpen ? 'rotate-90 text-blue-500' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <p className="pb-6 text-sm text-slate-400 leading-relaxed font-medium">{answer}</p>
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