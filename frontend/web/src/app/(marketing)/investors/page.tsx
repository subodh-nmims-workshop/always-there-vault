'use client'

import { motion } from 'framer-motion'
import { Shield, TrendingUp, Code, Zap, Globe, ChevronRight, CheckCircle2, Building, Gem } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function InvestorsPage() {
  return (
    <div className="w-full dark:text-slate-900 dark:text-white overflow-hidden selection:bg-[#2b52ff]/30 bg-transparent text-slate-800 dark:text-slate-100">
      
      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#2b52ff]/10 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[50%] bg-purple-600/10 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02]" />
      </div>

      {/* NAVBAR */}
      

      {/* HERO SECTION */}
      <div className="relative pt-40 pb-20 px-6 z-10 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2b52ff]/10 border border-[#2b52ff]/20 text-[#2b52ff] text-xs font-black uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-[#2b52ff] animate-pulse" />
            Strategic Partnerships & Investment
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-tight text-slate-900 dark:text-slate-900 dark:text-white">
            Securing the Future of <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2b52ff] to-purple-500">
              Digital Wealth.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Billions of dollars in digital assets are lost forever when owners pass away. AlwaysThere is building the ultimate decentralized digital will protocol to solve the internet's biggest generational wealth transfer problem.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="mailto:subodhram3350@gmail.com?subject=Investor Inquiry - AlwaysThere">
              <Button className="h-14 px-8 bg-[#2b52ff] hover:bg-[#1a3ecd] text-slate-900 dark:text-slate-900 dark:text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-[0_0_30px_rgba(43,82,255,0.3)]">
                Invest in AlwaysThere <TrendingUp className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="mailto:subodhram3350@gmail.com?subject=Developer Application - AlwaysThere">
              <Button variant="outline" className="h-14 px-8 bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-900 dark:text-slate-900 dark:text-slate-900 dark:text-white rounded-2xl font-black text-sm uppercase tracking-widest">
                Join the Dev Team <Code className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* THE PROBLEM & SOLUTION */}
      <section className="py-24 px-6 border-y border-slate-200 dark:border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.01] relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
              <Globe className="w-6 h-6 text-red-500" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-slate-900 dark:text-white">The $100 Billion Problem</h2>
            <p className="text-slate-700 dark:text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
              Currently, over 20% of all Bitcoin and cryptocurrency is considered "lost forever", heavily due to owners passing away without passing down seed phrases or private keys. Traditional legal wills are completely incompatible with Web3 assets and decentralized finance.
            </p>
          </div>
          <div className="space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-[#2b52ff]/10 flex items-center justify-center border border-[#2b52ff]/20">
              <Shield className="w-6 h-6 text-[#2b52ff]" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-slate-900 dark:text-white">The AlwaysThere Solution</h2>
            <p className="text-slate-700 dark:text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
              A trustless, smart-contract-driven "Dead Man's Switch". Users lock their encrypted assets and data in our protocol. Using an automated heartbeat ping system, if a user goes offline for a designated period, the protocol automatically decrypts and transfers assets to their designated beneficiaries—zero middlemen required.
            </p>
          </div>
        </div>
      </section>

      {/* WHO IS IT FOR */}
      <section className="py-24 px-6 relative z-10 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-slate-900 dark:text-white">Target Market</h2>
          <p className="text-slate-600 dark:text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto">Our protocol serves a rapidly expanding demographic of digital natives.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Gem className="w-6 h-6 text-blue-400" />,
              title: "Crypto Holders & Traders",
              desc: "Individuals holding significant wealth in decentralized wallets seeking a fail-safe way to pass wealth to family.",
              color: "blue"
            },
            {
              icon: <Building className="w-6 h-6 text-purple-400" />,
              title: "Legal & Estate Firms",
              desc: "B2B integration for modern law firms needing a secure, provable way to manage digital assets for their clients.",
              color: "purple"
            },
            {
              icon: <Zap className="w-6 h-6 text-emerald-400" />,
              title: "Privacy Advocates",
              desc: "Users who want their digital footprint, passwords, and private files transferred securely without government or corporate surveillance.",
              color: "emerald"
            }
          ].map((item, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-slate-200 dark:border-white/5 hover:border-slate-400 dark:hover:border-slate-200 dark:border-white/10 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center border border-slate-200 dark:border-slate-200 dark:border-white/10 mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-900 dark:text-white">{item.title}</h3>
              <p className="text-slate-700 dark:text-slate-600 dark:text-slate-400 leading-relaxed text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INVESTOR & DEVELOPER PITCH */}
      <section className="py-24 px-6 relative z-10 bg-gradient-to-b from-transparent to-[#2b52ff]/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Investor Card */}
          <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-[#0f121d] dark:to-[#0a0c12] border border-slate-200 dark:border-slate-200 dark:border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#2b52ff]/10 rounded-full blur-[80px] -mr-32 -mt-32 group-hover:bg-[#2b52ff]/20 transition-all duration-500" />
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 text-xs font-black uppercase tracking-widest">
                For Investors
              </div>
              <h3 className="text-3xl font-black text-slate-900 dark:text-slate-900 dark:text-white">Fund the Next Unicorn</h3>
              <p className="text-slate-700 dark:text-slate-600 dark:text-slate-400">
                The global digital asset management market is projected to reach $1.5 Trillion by 2030. We are currently raising our Seed Round to finalize smart contract audits, scale infrastructure, and aggressively acquire users.
              </p>
              <ul className="space-y-3 pt-4">
                {['High-margin SaaS subscription model', 'First-mover advantage in decentralized estate planning', 'Scalable B2B APIs for enterprise integration'].map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                    <span className="text-sm text-slate-700 dark:text-slate-750 dark:text-slate-300 font-medium">{text}</span>
                  </li>
                ))}
              </ul>
              <Link href="mailto:subodhram3350@gmail.com?subject=Investor Pitch Request" className="inline-block pt-6">
                <Button className="bg-slate-900 text-slate-900 dark:text-slate-900 dark:text-white dark:bg-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200 rounded-xl font-bold gap-2">
                  Request Pitch Deck <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Developer Card */}
          <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-[#120f1d] dark:to-[#0a0c12] border border-slate-200 dark:border-slate-200 dark:border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] -mr-32 -mt-32 group-hover:bg-purple-600/20 transition-all duration-500" />
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-400 text-xs font-black uppercase tracking-widest">
                For Developers
              </div>
              <h3 className="text-3xl font-black text-slate-900 dark:text-slate-900 dark:text-white">Build with the Best</h3>
              <p className="text-slate-700 dark:text-slate-600 dark:text-slate-400">
                We are looking for elite Web3 and Full-Stack engineers who are passionate about cryptography, Account Abstraction (ERC-4337), and solving complex decentralization problems.
              </p>
              <ul className="space-y-3 pt-4">
                {['Work on cutting-edge MPC (Multi-Party Computation)', 'Remote-first, highly technical culture', 'Equity and Token allocations for founding engineers'].map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-500 shrink-0" />
                    <span className="text-sm text-slate-700 dark:text-slate-750 dark:text-slate-300 font-medium">{text}</span>
                  </li>
                ))}
              </ul>
              <Link href="mailto:subodhram3350@gmail.com?subject=Developer Application" className="inline-block pt-6">
                <Button className="bg-purple-600 hover:bg-purple-500 text-slate-900 dark:text-slate-900 dark:text-white rounded-xl font-bold gap-2">
                  View Open Roles <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-slate-200 dark:border-slate-200 dark:border-white/5 text-center relative z-10 bg-slate-50 dark:bg-[#0a0c12]">
        <p className="text-slate-500 dark:text-slate-600 text-sm font-medium">© 2026 AlwaysThere Protocol. Currently in closed Beta.</p>
      </footer>
    </div>
  )
}
