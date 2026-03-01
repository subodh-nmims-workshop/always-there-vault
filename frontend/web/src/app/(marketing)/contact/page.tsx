'use client'

import { motion } from 'framer-motion'
import {
    Shield,
    MessageSquare,
    Mail,
    MessageCircle
} from 'lucide-react'
import Link from 'next/link'
import { SharedFooter } from '@/components/shared-footer'

export default function ContactPage() {
    const defaultTransition = { duration: 0.5, ease: "easeOut" as const }

    return (
        <div className="min-h-screen bg-[#0a0c10] font-sans text-slate-100 selection:bg-[#1152d4]/30 flex flex-col overflow-x-hidden relative">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-[#0a0c10]/80 backdrop-blur-xl border-b border-white/5 px-4 sm:px-8 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="text-[#1152d4] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Shield className="w-8 h-8" />
                    </div>
                    <span className="font-bold text-xl tracking-tight hidden sm:block">DeadMan Protocol</span>
                </Link>
                <div className="hidden md:flex gap-8 items-center absolute left-1/2 -translate-x-1/2">
                    <Link href="/features" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Features</Link>
                    <Link href="/docs" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Documentation</Link>
                    <Link href="/contact" className="text-white transition-colors text-sm font-medium">Contact</Link>
                </div>
                <Link href="/" className="bg-[#1152d4] hover:bg-[#1152d4]/80 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-[0_0_20px_rgba(17,82,212,0.4)]">
                    Launch App
                </Link>
            </nav>

            <main className="flex-1 flex flex-col items-center px-4 py-20 max-w-4xl mx-auto w-full relative z-10">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={defaultTransition} className="inline-flex items-center justify-center p-4 rounded-full bg-white/[0.03] border border-white/10 mb-6">
                        <MessageSquare className="w-8 h-8 text-[#1152d4]" />
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...defaultTransition, delay: 0.1 }} className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white">
                        Get in <span className="text-[#1152d4]">Touch</span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...defaultTransition, delay: 0.2 }} className="text-slate-400 max-w-lg mx-auto text-lg leading-relaxed">
                        Need help integrating the protocol? Have questions about our security model? Reach out to the core contributors.
                    </motion.p>
                </div>

                {/* Contact Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-24">

                    <motion.a href="mailto:security@deadman.xyz" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...defaultTransition, delay: 0.3 }} className="bg-white/[0.02] hover:bg-white/[0.05] backdrop-blur-md rounded-2xl p-8 border border-white/10 flex items-center gap-6 group transition-all">
                        <div className="w-12 h-12 rounded-xl bg-[#1152d4]/10 border border-[#1152d4]/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <Mail className="text-[#1152d4] w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-1 text-white">Email Us</h3>
                            <p className="text-slate-400">security@deadman.xyz</p>
                        </div>
                    </motion.a>

                    <motion.a href="https://discord.gg/deadmanprotocol" target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...defaultTransition, delay: 0.4 }} className="bg-white/[0.02] hover:bg-white/[0.05] backdrop-blur-md rounded-2xl p-8 border border-white/10 flex items-center gap-6 group transition-all">
                        <div className="w-12 h-12 rounded-xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <MessageCircle className="text-[#8b5cf6] w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-1 text-white">Discord</h3>
                            <p className="text-slate-400">Join the Developer DAO</p>
                        </div>
                    </motion.a>

                </div>

            </main>

            <SharedFooter />
        </div>
    )
}
