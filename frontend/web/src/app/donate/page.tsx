import { SupportSection } from '@/components/support-section'
import { SharedFooter } from '@/components/shared-footer'
import Link from 'next/link'
import { Shield, ArrowLeft } from 'lucide-react'

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans flex flex-col overflow-x-hidden relative">
      <nav className="sticky top-0 z-50 bg-[#030712]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <Shield className="h-8 w-8 text-blue-500" />
          <span className="font-black text-xl tracking-tight text-white uppercase">AlwaysThere</span>
        </Link>
        <Link href="/" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.03] text-slate-400 text-xs font-black border border-white/5 uppercase tracking-widest hover:bg-white/[0.08] hover:text-white transition-all">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
      </nav>
      
      <main className="flex-1">
        <SupportSection />
      </main>
      
      <SharedFooter />
    </div>
  )
}
