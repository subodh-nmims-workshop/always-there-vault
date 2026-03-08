'use client'

import { motion } from 'framer-motion'
import { Shield, TrendingUp, Calendar, CreditCard, RefreshCw, XCircle, Zap, Users, HardDrive } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSubscription } from '@/contexts/SubscriptionContext'
import { ALL_PLANS } from '@/types/subscription'
import { useState } from 'react'
import { toast } from 'sonner'

export function SubscriptionDashboard() {
    const router = useRouter()
    const { subscription, switchMode, cancelSubscription } = useSubscription()
    const [switching, setSwitching] = useState(false)
    const defaultTransition = { duration: 0.5, ease: "easeOut" as const }

    if (!subscription) {
        return (
            <div className="flex items-center justify-center p-12 bg-white/[0.02] border border-white/5 rounded-3xl">
                <div className="text-center">
                    <h2 className="text-xl text-white mb-4 font-bold">No Subscription Found</h2>
                    <p className="text-slate-400 mb-6">Initialize your vault to see subscription status.</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-[#1152d4] hover:bg-[#1152d4]/80 text-white px-6 py-3 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(17,82,212,0.4)]"
                    >
                        Retry Loading
                    </button>
                </div>
            </div>
        )
    }

    const planDetails = ALL_PLANS[subscription.plan]
    const price = planDetails?.price || 0
    const features = planDetails?.features || []
    const limits = planDetails?.limits

    const handleSwitchMode = async () => {
        if (!subscription.canSwitchMode) return

        const newMode = subscription.mode === 'centralized' ? 'decentralized' : 'centralized'
        const confirmed = confirm(
            `Switch to ${newMode} mode? This will migrate your data node. \n\nNote: Mode switching maintains all your encrypted data while changing the underlying hosting architecture.`
        )

        if (!confirmed) return

        setSwitching(true)
        try {
            await switchMode(newMode)
            toast.success('Service mode updated!')
        } catch (error) {
            toast.error('Failed to switch mode')
        } finally {
            setSwitching(false)
        }
    }

    const handleCancelSubscription = async () => {
        const confirmed = confirm(
            'Are you sure you want to cancel? Your data will remain encrypted but new uploads will be disabled after the period ends.'
        )

        if (!confirmed) return

        try {
            await cancelSubscription()
            toast.success('Status updated to Cancelled.')
        } catch (error) {
            toast.error('Failed to update subscription')
        }
    }

    return (
        <div className="space-y-6">
            {/* Current Plan Card */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-3xl p-8 shadow-xl backdrop-blur-sm"
            >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">{subscription.mode === 'centralized' ? '🏢' : '⛓️'}</span>
                            <h2 className="text-3xl font-bold text-white capitalize">
                                {subscription.plan} Plan
                            </h2>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${subscription.status === 'active' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                subscription.status === 'trial' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                    'bg-red-500/10 text-red-400 border border-red-500/20'
                                }`}>
                                {subscription.status}
                            </span>
                        </div>
                        <p className="text-slate-400">
                            Service Architecture: <span className="text-white font-medium capitalize">{subscription.mode}</span>
                        </p>
                    </div>
                    <div className="text-left md:text-right">
                        <p className="text-4xl font-black text-white">${price}<span className="text-lg text-slate-500 font-normal">/mo</span></p>
                        <p className="text-sm text-slate-500">Billed monthly</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-white/5">
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Included Features</h3>
                        <ul className="grid grid-cols-1 gap-2">
                            {features.map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-slate-300 text-sm">
                                    <Shield className="w-4 h-4 text-[#1152d4]" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Service Controls</h3>
                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={handleSwitchMode}
                                disabled={switching || !subscription.canSwitchMode}
                                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2.5 rounded-xl transition-all text-sm font-bold disabled:opacity-50"
                            >
                                <RefreshCw className={`w-4 h-4 ${switching ? 'animate-spin' : ''}`} />
                                {switching ? 'Migrating Node...' : `Switch to ${subscription.mode === 'centralized' ? 'Decentralized' : 'Centralized'}`}
                            </button>
                            <button
                                onClick={() => router.push('/pricing')}
                                className="flex items-center gap-2 bg-[#1152d4] hover:bg-blue-600 text-white px-4 py-2.5 rounded-xl transition-all text-sm font-bold shadow-lg shadow-blue-900/20"
                            >
                                <Zap className="w-4 h-4" />
                                Upgrade Plan
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Usage Stats Section */}
            {limits && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <UsageCard
                        title="Stored Assets"
                        current={subscription.assetsCount || 0}
                        limit={limits.assets}
                        icon={<Zap className="w-5 h-5 text-blue-400" />}
                        color="from-blue-500 to-indigo-600"
                    />
                    <UsageCard
                        title="Beneficiaries"
                        current={subscription.beneficiariesCount || 0}
                        limit={limits.beneficiaries}
                        icon={<Users className="w-5 h-5 text-emerald-400" />}
                        color="from-emerald-500 to-teal-600"
                    />
                    <UsageCard
                        title="IPFS Storage"
                        current={subscription.storageUsedGB || 0}
                        limit={limits.storageGB}
                        unit="GB"
                        icon={<HardDrive className="w-5 h-5 text-purple-400" />}
                        color="from-purple-500 to-pink-600"
                    />
                </div>
            )}

            {/* Cancel Button */}
            {subscription.status !== 'cancelled' && (
                <div className="flex justify-center pt-4">
                    <button
                        onClick={handleCancelSubscription}
                        className="text-slate-500 hover:text-red-400 text-sm font-medium flex items-center gap-2 transition-colors px-4 py-2 hover:bg-red-400/5 rounded-lg border border-transparent hover:border-red-400/20"
                    >
                        <XCircle className="w-4 h-4" />
                        Cancel Future Renewals
                    </button>
                </div>
            )}
        </div>
    )
}

function UsageCard({ title, current, limit, unit = '', icon, color }: any) {
    const percentage = limit === Infinity ? 0 : Math.min(100, (current / limit) * 100)

    return (
        <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-6 hover:bg-white/[0.05] transition-all">
            <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-xl bg-white/[0.05]">
                    {icon}
                </div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter">{title}</span>
            </div>

            <div className="flex items-baseline gap-1 mb-2">
                <span className="text-3xl font-black text-white">{current}</span>
                <span className="text-slate-500 font-medium">/ {limit === Infinity ? '∞' : `${limit}${unit}`}</span>
            </div>

            {limit !== Infinity && (
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        className={`h-full bg-gradient-to-r ${color}`}
                    />
                </div>
            )}
        </div>
    )
}
