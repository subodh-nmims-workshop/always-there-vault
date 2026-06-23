'use client'

import { motion } from 'framer-motion'
import { Shield, MessageSquare, Mail, MessageCircle } from 'lucide-react'
import Link from 'next/link'
export default function ContactPage() {
    const dt = { duration: 0.5, ease: "easeOut" as const }
    return (
        <div className="w-full font-sans dark:text-slate-100 selection:bg-[#1152d4]/30 relative bg-transparent text-slate-800">
            
            <main className="flex-1 flex flex-col items-center px-4 py-20 max-w-4xl mx-auto w-full relative z-10">
                <div className="text-center mb-16">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={dt} className="inline-flex items-center justify-center p-4 rounded-full bg-slate-100 dark:bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-slate-200 dark:border-white/10 mb-6">
                        <MessageSquare className="w-8 h-8 text-[#1152d4]" suppressHydrationWarning />
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...dt, delay: 0.1 }} className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-slate-900 dark:text-slate-900 dark:text-white">Get in <span className="text-[#1152d4]">Touch</span></motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...dt, delay: 0.2 }} className="text-slate-600 dark:text-slate-600 dark:text-slate-400 max-w-lg mx-auto text-lg leading-relaxed">Need help integrating the protocol? Have questions about our security model? Reach out to the core contributors.</motion.p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-24">
                    <motion.a href="mailto:security@alwaysthere.xyz" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...dt, delay: 0.3 }} className="bg-slate-50 dark:bg-slate-50 dark:bg-white/[0.02] hover:bg-slate-100 dark:hover:bg-white/[0.05] rounded-2xl p-8 border border-slate-200 dark:border-slate-200 dark:border-white/10 flex items-center gap-6 group transition-all">
                        <div className="w-12 h-12 rounded-xl bg-[#1152d4]/10 border border-[#1152d4]/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"><Mail className="text-[#1152d4] w-6 h-6" suppressHydrationWarning /></div>
                        <div><h3 className="text-xl font-bold mb-1 text-slate-900 dark:text-slate-900 dark:text-white">Email Us</h3><p className="text-slate-500 dark:text-slate-600 dark:text-slate-400">security@alwaysthere.xyz</p></div>
                    </motion.a>
                    <motion.a href="https://discord.gg/alwaysthereprotocol" target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...dt, delay: 0.4 }} className="bg-slate-50 dark:bg-slate-50 dark:bg-white/[0.02] hover:bg-slate-100 dark:hover:bg-white/[0.05] rounded-2xl p-8 border border-slate-200 dark:border-slate-200 dark:border-white/10 flex items-center gap-6 group transition-all">
                        <div className="w-12 h-12 rounded-xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"><MessageCircle className="text-[#8b5cf6] w-6 h-6" suppressHydrationWarning /></div>
                        <div><h3 className="text-xl font-bold mb-1 text-slate-900 dark:text-slate-900 dark:text-white">Discord</h3><p className="text-slate-500 dark:text-slate-600 dark:text-slate-400">Join the Developer DAO</p></div>
                    </motion.a>
                </div>
                <div className="grid md:grid-cols-2 gap-12 w-full mb-24">
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-slate-50 dark:bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-slate-200 dark:border-white/5 rounded-3xl p-8">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-900 dark:text-slate-900 dark:text-white mb-6">Send a Message</h3>
                        <form className="space-y-4">
                            <div><label className="block text-sm font-medium text-slate-600 dark:text-slate-600 dark:text-slate-400 mb-1">Name / Pseudonym</label><input type="text" suppressHydrationWarning className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-slate-900 dark:text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#1152d4] transition-colors" placeholder="Satoshi Nakamoto" /></div>
                            <div><label className="block text-sm font-medium text-slate-600 dark:text-slate-600 dark:text-slate-400 mb-1">Email <span className="text-red-500">*</span></label><input type="email" suppressHydrationWarning required className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-slate-900 dark:text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#1152d4] transition-colors" placeholder="satoshi@protonmail.com" /></div>
                            <div><label className="block text-sm font-medium text-slate-600 dark:text-slate-600 dark:text-slate-400 mb-1">Inquiry Type</label><select className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-slate-900 dark:text-slate-900 dark:text-white focus:outline-none focus:border-[#1152d4] transition-colors appearance-none"><option>Partnership</option><option>Institutional Demo</option><option>Press</option><option>Security Report / Bug Bounty</option></select></div>
                            <div><label className="block text-sm font-medium text-slate-600 dark:text-slate-600 dark:text-slate-400 mb-1">Message</label><textarea rows={4} className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-slate-900 dark:text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#1152d4] transition-colors resize-none" placeholder="How can we help?"></textarea></div>
                            <button type="submit" className="w-full bg-[#1152d4] hover:bg-[#1152d4]/90 text-slate-900 dark:text-slate-900 dark:text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-[#1152d4]/20 mt-4">Submit Request</button>
                        </form>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <div className="bg-slate-50 dark:bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-slate-200 dark:border-white/5 rounded-3xl p-8 h-full flex flex-col justify-center">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-900 dark:text-slate-900 dark:text-white mb-6">DAO Hubs</h3>
                            <p className="text-slate-600 dark:text-slate-600 dark:text-slate-400 leading-relaxed mb-8">AlwaysThere operates as a decentralized autonomous organization. We do not have a single physical headquarters, but our core contributors operate out of several crypto-friendly hubs.</p>
                            <div className="space-y-6">
                                {[{color:'bg-emerald-500',city:'Zug, Switzerland (Crypto Valley)',role:'Legal & Regulatory Foundation'},{color:'bg-[#1152d4]',city:'Singapore',role:'APAC Operations & Relayer Hub'},{color:'bg-[#8b5cf6]',city:'Dubai, UAE',role:'Institutional Partnerships'}].map((hub,i) => (
                                    <div key={i} className="flex gap-4"><div className={`w-1.5 h-1.5 rounded-full ${hub.color} mt-2 shrink-0`}></div><div><h4 className="font-bold text-slate-900 dark:text-slate-900 dark:text-white">{hub.city}</h4><p className="text-sm text-slate-500">{hub.role}</p></div></div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>
            
        </div>
    )
}
