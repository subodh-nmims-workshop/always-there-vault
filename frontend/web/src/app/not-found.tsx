'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Shield } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#020817] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg"
      >
        {/* Glowing icon */}
        <div className="relative inline-flex mb-8">
          <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-2xl scale-150" />
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-blue-600/30 to-cyan-600/20 border border-blue-500/20 flex items-center justify-center">
            <Shield className="w-10 h-10 text-blue-400" />
          </div>
        </div>

        <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-4">
          404
        </h1>
        <h2 className="text-2xl font-bold text-white mb-3">Vault Not Found</h2>
        <p className="text-slate-400 mb-8 leading-relaxed">
          This page doesn&apos;t exist or has been moved. Your digital legacy is still safe — we just can&apos;t find this particular route.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:opacity-90 transition-opacity"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-700 text-slate-300 font-semibold hover:border-slate-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  )
}
