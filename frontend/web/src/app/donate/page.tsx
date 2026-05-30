import { SupportSection } from '@/components/support-section'
import { SharedFooter } from '@/components/shared-footer'
import Link from 'next/link'
import { Shield, ArrowLeft } from 'lucide-react'

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#030712] text-slate-800 dark:text-slate-100 font-sans flex flex-col overflow-x-hidden relative">
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-[#030712]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <Shield className="h-8 w-8 text-blue-500" />
          <span className="font-black text-xl tracking-tight text-slate-900 dark:text-white uppercase">AlwaysThere</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/investors" className="text-xs font-black uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Partners & Investors</Link>
          <Link href="/#how-it-works" className="text-xs font-black uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">How it works</Link>
          <Link href="/#security" className="text-xs font-black uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Security</Link>
          <Link href="/docs" className="text-xs font-black uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Tech Guide</Link>
          <Link href="/pricing" className="text-xs font-black uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Pricing</Link>
          <Link href="/donate" className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2b52ff]/10 border border-[#2b52ff]/20 text-[10px] font-black uppercase tracking-widest text-[#2b52ff] hover:bg-[#2b52ff]/20 hover:text-white transition-all">Support Us</Link>
        </div>
        <Link href="/">
          <button className="px-6 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-black text-xs font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">Back to Dashboard</button>
        </Link>
      </nav>
      
      <main className="flex-1">
        <SupportSection />
      </main>
      
      <SharedFooter />
    </div>
  )
}
