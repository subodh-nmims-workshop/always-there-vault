'use client'

import { ThemeToggle } from '@/components/theme-toggle'

import React from 'react'
import {
  Shield,
  Lock,
  BookOpen,
  Zap,
  ArrowLeft,
  Database,
  Heart,
  Globe,
  ShieldCheck,
  Timer,
  Cpu,
  Server,
  KeyRound,
  FileText,
  Workflow,
  Key,
  Layers
} from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { SharedFooter } from '@/components/shared-footer'

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#030712] text-slate-800 dark:text-slate-200 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-[#030712]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <img src="/logo-simple.png" alt="AlwaysThere Logo" className="h-10 w-auto object-contain group-hover:scale-110 transition-transform duration-300" />
          <div className="flex flex-col text-left">
            <span className="text-xl font-black tracking-wider text-slate-900 dark:text-white leading-none">ALWAYS THERE</span>
            <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-none mt-1.5">SECURE YOUR DIGITAL LEGACY</span>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/investors" className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black uppercase tracking-widest text-[#2b52ff] hover:bg-blue-500/20 hover:text-white transition-all shadow-[0_0_15px_rgba(43,82,255,0.3)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Partners & Investors
          </Link>
          <Link href="/features" className="text-xs font-black uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">How it works</Link>
          <Link href="/security" className="text-xs font-black uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Security</Link>
          <Link href="/docs" className="text-xs font-black uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Tech Guide</Link>
          <Link href="/pricing" className="text-xs font-black uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Pricing</Link>
          <Link href="/donate" className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2b52ff]/10 border border-[#2b52ff]/20 text-[10px] font-black uppercase tracking-widest text-[#2b52ff] hover:bg-[#2b52ff]/20 hover:text-white transition-all">Support Us</Link>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="/">
          <button className="px-6 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-black text-xs font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">Go to App</button>
        </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        {/* Header */}
        <div className="mb-20">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">
            Technical Specification v2.4
          </motion.div>
          <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight">The <span className="text-blue-500">Infrastructure</span> of Legacy</h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium">
            Deep-dive into the security, architecture, and logic that powers the AlwaysThere Protocol.
            Designed for durability, anonymity, and zero-trust execution.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-32">

          {/* Section 1: Core Architecture */}
          <section id="architecture" className="scroll-mt-24">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-blue-600/10 rounded-2xl border border-blue-500/20 text-blue-500 shadow-2xl shadow-blue-600/20">
                <Cpu className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">01. Hybrid Storage Engine</h2>
            </div>
            <div className="bg-slate-50 dark:bg-white/[0.02] rounded-[2.5rem] p-10 border border-slate-200 dark:border-white/5 space-y-8">
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium text-lg">
                AlwaysThere utilizes a <span className="text-white font-bold italic">Dual-Layer Storage Architecture</span> to balance instant accessibility with eternal persistence.
              </p>

              <div className="space-y-6">
                <div className="flex gap-6 p-6 bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/5">
                  <div className="p-4 bg-blue-600/20 rounded-xl flex items-center justify-center shrink-0">
                    <Layers className="text-blue-400 w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-black text-white mb-2 uppercase text-sm tracking-widest">Layer 1: Performance (Cloudflare R2)</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Highly available object storage used for active documents. Cloudflare R2 provides S3-compatible endpoints with zero egress fees, ensuring you can manage your assets daily without cost overhead.</p>
                  </div>
                </div>

                <div className="flex gap-6 p-6 bg-purple-600/10 rounded-2xl border border-purple-500/10">
                  <div className="p-4 bg-purple-600/20 rounded-xl flex items-center justify-center shrink-0">
                    <Database className="text-purple-400 w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-black text-purple-400 mb-2 uppercase text-sm tracking-widest">Layer 2: Immortality (Arweave)</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">For permanent wills and critical backups, data is synced to the Arweave Permaweb. Once mined, this data cannot be deleted or censored, surviving for 100+ years.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Security Workflow */}
          <section id="security" className="scroll-mt-24">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-green-600/10 rounded-2xl border border-green-500/20 text-green-500">
                <Workflow className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">02. Encryption Workflow</h2>
            </div>
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DocFeatureCard title="Client-Side" desc="Encryption happens entirely in your browser using the Web Crypto API." />
                <DocFeatureCard title="Non-Custodial" desc="Your wallet key is the only chabi. We have zero knowledge of your contents." />
                <DocFeatureCard title="Quantum Ready" desc="Using AES-256-GCM with authenticated tags for integrity verification." />
              </div>

              <div className="p-8 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl">
                <h4 className="font-black text-slate-900 dark:text-white mb-4 uppercase text-xs tracking-[0.3em]">The Data Journey:</h4>
                <div className="space-y-4">
                  <JourneyStep step="A" label="File Selection" desc="User selects sensitive document in the dashboard." />
                  <JourneyStep step="B" label="Key Derivation" desc="Wallet signs a message to derive a 256-bit unique symmetric key." />
                  <JourneyStep step="C" label="Local Cipher" desc="File is converted to a Blob and encrypted locally." />
                  <JourneyStep step="D" label="Secure Transit" desc="Encrypted cipher is uploaded via TLS 1.3 to sharded storage nodes." />
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Heartbeat & Nominee Logic */}
          <section id="heartbeat" className="scroll-mt-24">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-red-600/10 rounded-2xl border border-red-500/20 text-red-500 shadow-2xl shadow-red-600/10">
                <Timer className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">03. The Heartbeat Logic</h2>
            </div>
            <div className="bg-slate-900 dark:bg-[#0f172a] rounded-[3rem] p-12 border border-blue-500/20">
              <p className="text-slate-300 font-bold mb-10 text-xl italic">"Autonomous execution is the ultimate trust."</p>
              <div className="space-y-10">
                <LogicBlock title="Threshold Trigger" desc="The user defines a 'Survival Window' (e.g. 90 days). If no heartbeat signature is logged within this window, the protocol enters 'Grace Mode'." />
                <LogicBlock title="Grace Notification" desc="During Grace Mode (7 days), the protocol initiates automated alerts via Email, SMS, and Nominee Ping. If the user clears the alert, the timer resets." />
                <LogicBlock title="Asset Liquidation" desc="If the Grace Period expires without user intervention, the smart contract unlocks the Nominee Keys. Nominees can then download and decrypt the assigned assets." />
              </div>
            </div>
          </section>

          {/* Section 4: Privacy Policy */}
          <section id="privacy" className="scroll-mt-24">
            <div className="text-center p-16 bg-white/5 rounded-[3rem] border border-white/10">
              <Shield className="w-16 h-16 text-blue-500 mx-auto mb-6" />
              <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase mb-4">PRIVACY BY DESIGN</h3>
              <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
                We do not collect names, phone numbers, or emails by default. Your identity is your Wallet Address.
                We maintain zero logs of your file contents. Your legacy is yours alone.
              </p>
            </div>
          </section>

        </div>
      </main>

      <SharedFooter />
    </div>
  )
}

function DocFeatureCard({ title, desc }: any) {
  return (
    <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/5">
      <h4 className="font-black text-slate-900 dark:text-white uppercase text-xs mb-2 tracking-widest">{title}</h4>
      <p className="text-xs text-slate-600 dark:text-slate-500 leading-relaxed font-medium">{desc}</p>
    </div>
  )
}

function JourneyStep({ step, label, desc }: any) {
  return (
    <div className="flex items-center gap-4">
      <span className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-[10px] font-black text-white">{step}</span>
      <div className="flex flex-col">
        <span className="text-[10px] font-black text-slate-800 dark:text-white uppercase tracking-widest">{label}</span>
        <span className="text-[10px] text-slate-500 uppercase tracking-tighter">{desc}</span>
      </div>
    </div>
  )
}

function LogicBlock({ title, desc }: any) {
  return (
    <div className="border-l-2 border-blue-500 pl-8 space-y-2">
      <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-tight">{title}</h4>
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{desc}</p>
    </div>
  )
}
