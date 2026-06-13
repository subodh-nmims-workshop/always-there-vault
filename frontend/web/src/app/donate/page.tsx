import { ThemeToggle } from '@/components/theme-toggle'
import { SupportSection } from '@/components/support-section'
import { SharedFooter } from '@/components/shared-footer'
import Link from 'next/link'
import { Shield, ArrowLeft } from 'lucide-react'

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#030712] text-slate-800 dark:text-slate-100 font-sans flex flex-col overflow-x-hidden relative">
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-[#030712]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <img src="/logo-simple.png" alt="AlwaysThere Logo" className="h-10 w-auto object-contain group-hover:scale-110 transition-transform duration-300" />
          <div className="flex flex-col text-left">
            <span className="text-xl font-black tracking-wider text-slate-900 dark:text-white leading-none">ALWAYS THERE</span>
            <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-none mt-1.5">SECURE YOUR DIGITAL LEGACY</span>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/investors" className="text-xs font-black uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Partners & Investors</Link>
          <Link href="/features" className="text-xs font-black uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">How it works</Link>
          <Link href="/security" className="text-xs font-black uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Security</Link>
          <Link href="/docs" className="text-xs font-black uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Tech Guide</Link>
          <Link href="/pricing" className="text-xs font-black uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Pricing</Link>
          <Link href="/donate" className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2b52ff]/10 border border-[#2b52ff]/20 text-[10px] font-black uppercase tracking-widest text-[#2b52ff] hover:bg-[#2b52ff]/20 hover:text-white transition-all">Support Us</Link>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="/">
          <button className="px-6 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-black text-xs font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">Back to Dashboard</button>
        </Link>
        </div>
      </nav>
      
      <main className="flex-1">
        <SupportSection />
      </main>
      
      <SharedFooter />
    </div>
  )
}
