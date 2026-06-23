'use client'

import React from 'react'
import { Shield } from 'lucide-react'
import Link from 'next/link'
import { PricingPlans } from '@/components/pricing-plans'
export default function PricingPage() {
    return (
        <div className="w-full font-sans dark:text-slate-100 selection:bg-[#1152d4]/30 relative bg-transparent text-slate-800">
            
            

            <main className="flex-1">
                {/* We use the original PricingPlans component which contains the mode toggle and plans */}
                <div className="relative">
                    <div className="absolute inset-x-0 -top-20 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />
                    <PricingPlans />
                </div>
            </main>

            

            {/* Background Glows */}
            <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none -z-10" />
            <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none -z-10" />
        </div>
    )
}
