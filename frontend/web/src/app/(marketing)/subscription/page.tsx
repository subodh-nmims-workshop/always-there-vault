'use client'

import { motion } from 'framer-motion'
import { Shield, TrendingUp, Calendar, CreditCard, RefreshCw, XCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SharedFooter } from '@/components/shared-footer'
import { useSubscription } from '@/contexts/SubscriptionContext'
import { ALL_PLANS } from '@/types/subscription'
import { useState } from 'react'
import { toast } from 'sonner'
import { ConfirmModal } from '@/components/confirm-modal'

export default function SubscriptionPage() {
    const router = useRouter()
    const { subscription, switchMode, cancelSubscription } = useSubscription()
    const [switching, setSwitching] = useState(false)
    const [confirmCancelOpen, setConfirmCancelOpen] = useState(false)
    const [confirmSwitchOpen, setConfirmSwitchOpen] = useState(false)
    const defaultTransition = { duration: 0.5, ease: "easeOut" as const }

    if (!subscription) {
        return (
            <div className="min-h-screen bg-white dark:bg-[#0a0c10] flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl text-slate-900 dark:text-white mb-4 font-bold">No subscription found</h2>
                    <Link 
                        href="/pricing"
                        className="bg-[#1152d4] hover:bg-[#1152d4]/80 text-white px-6 py-3 rounded-full font-bold transition-all"
                    >
                        View Plans
                    </Link>
                </div>
            </div>
        )
    }

    // Get plan details from ALL_PLANS
    const planDetails = ALL_PLANS[subscription.plan]
    const price = planDetails?.price || 0
    const features = planDetails?.features || []
    const limits = planDetails?.limits

    const handleSwitchMode = async () => {
        setConfirmSwitchOpen(false)
        const newMode = subscription.mode === 'centralized' ? 'decentralized' : 'centralized'
        setSwitching(true)
        try {
            await switchMode(newMode)
            toast.success('Mode switched successfully!')
        } catch (error) {
            toast.error('Failed to switch mode')
        } finally {
            setSwitching(false)
        }
    }

    const handleCancelSubscription = async () => {
        setConfirmCancelOpen(false)
        try {
            await cancelSubscription()
            toast.success('Subscription cancelled. You can still access your data until the end of the period.')
        } catch (error) {
            toast.error('Failed to cancel subscription')
        }
    }

    const daysRemaining = subscription.trialEndsAt 
        ? Math.max(0, Math.ceil((subscription.trialEndsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
        : 0

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0c10] font-sans text-slate-800 dark:text-slate-100 selection:bg-[#1152d4]/30 flex flex-col overflow-x-hidden relative">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-white/85 dark:bg-[#0a0c10]/85 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 px-4 sm:px-8 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="text-[#1152d4] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Shield className="w-8 h-8" />
                    </div>
                    <span className="font-bold text-xl tracking-tight hidden sm:block text-slate-900 dark:text-white">AlwaysThere</span>
                </Link>
                <Link href="/" className="bg-[#1152d4] hover:bg-[#1152d4]/80 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-[0_0_20px_rgba(17,82,212,0.4)]">
                    Dashboard
                </Link>
            </nav>

            <main className="flex-1 flex flex-col items-center px-4 py-16 max-w-6xl mx-auto w-full relative z-10">

                {/* Header */}
                <div className="text-center mb-12">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={defaultTransition} 
                        className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-slate-900 dark:text-white"
                    >
                        Subscription Management
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ ...defaultTransition, delay: 0.1 }} 
                        className="text-slate-400 text-lg"
                    >
                        Manage your plan, usage, and billing
                    </motion.p>
                </div>

                {/* Current Plan Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...defaultTransition, delay: 0.2 }}
                    className="w-full bg-gradient-to-br from-slate-50 dark:from-white/5 to-slate-100/50 dark:to-white/[0.02] border border-slate-200 dark:border-white/10 rounded-3xl p-8 mb-8 shadow-lg"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                                {subscription.mode === 'centralized' ? '🏢' : '⛓️'} {subscription.plan} Plan
                            </h2>
                            <p className="text-slate-400">
                                Status:{' '}
                                <span
                                    className={`font-semibold ${
                                        subscription.status === 'active'
                                            ? 'text-green-400'
                                            : subscription.status === 'trial'
                                            ? 'text-blue-400'
                                            : 'text-red-400'
                                    }`}
                                >
                                    {subscription.status.toUpperCase()}
                                </span>
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-4xl font-bold text-slate-900 dark:text-white">${price}</p>
                            <p className="text-slate-400">per month</p>
                        </div>
                    </div>

                    {subscription.status === 'active' && subscription.subscriptionEndsAt && (
                        <div className="flex items-center gap-2 text-slate-400 mb-4">
                            <Calendar className="w-4 h-4" />
                            <span>Next billing: {new Date(subscription.subscriptionEndsAt).toLocaleDateString()}</span>
                        </div>
                    )}

                    {subscription.status === 'trial' && subscription.trialEndsAt && (
                        <div className="flex items-center gap-2 text-yellow-400 mb-4">
                            <Calendar className="w-4 h-4" />
                            <span>Trial ends in {daysRemaining} days ({new Date(subscription.trialEndsAt).toLocaleDateString()})</span>
                        </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Features:</h3>
                            <ul className="space-y-1">
                                {features.map((feature, idx) => (
                                    <li key={idx} className="text-slate-700 dark:text-slate-300 text-sm">
                                        ✓ {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Mode:</h3>
                            <p className="text-slate-700 dark:text-slate-300 mb-4">
                                {subscription.mode === 'centralized'
                                    ? '🏢 Centralized - Managed service'
                                    : '⛓️ Decentralized - Self-sovereign'}
                            </p>
                            {subscription.canSwitchMode && (
                                <button
                                    onClick={() => setConfirmSwitchOpen(true)}
                                    disabled={switching}
                                    className="flex items-center gap-2 bg-purple-650 hover:bg-purple-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-all"
                                >
                                    <RefreshCw className={`w-4 h-4 ${switching ? 'animate-spin' : ''}`} />
                                    {switching ? 'Switching...' : 'Switch Mode ($9.99)'}
                                </button>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Usage Stats */}
                {limits && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ...defaultTransition, delay: 0.3 }}
                        className="w-full bg-gradient-to-br from-slate-50 dark:from-white/5 to-slate-100/50 dark:to-white/[0.02] border border-slate-200 dark:border-white/10 rounded-3xl p-8 mb-8 shadow-lg"
                    >
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                            <TrendingUp className="w-6 h-6" />
                            Usage Statistics
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div>
                                <p className="text-slate-605 dark:text-slate-400 mb-2">Assets</p>
                                <p className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                                    0 / {limits.assets === Infinity ? '∞' : limits.assets}
                                </p>
                                <div className="h-2 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                                        style={{ width: '10%' }}
                                    />
                                </div>
                            </div>
                            <div>
                                <p className="text-slate-605 dark:text-slate-400 mb-2">Beneficiaries</p>
                                <p className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                                    0 / {limits.beneficiaries === Infinity ? '∞' : limits.beneficiaries}
                                </p>
                                <div className="h-2 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                                        style={{ width: '10%' }}
                                    />
                                </div>
                            </div>
                            <div>
                                <p className="text-slate-650 dark:text-slate-400 mb-2">Storage</p>
                                <p className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                                    0 / {limits.storage}
                                </p>
                                <div className="h-2 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-orange-500 to-red-500"
                                        style={{ width: '10%' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...defaultTransition, delay: 0.4 }}
                    className="w-full bg-gradient-to-br from-slate-50 dark:from-white/5 to-slate-100/50 dark:to-white/[0.02] border border-slate-200 dark:border-white/10 rounded-3xl p-8 shadow-lg"
                >
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                        <CreditCard className="w-6 h-6" />
                        Actions
                    </h2>
                    <div className="space-y-4">
                        <button
                            onClick={() => router.push('/pricing')}
                            className="w-full bg-[#1152d4] hover:bg-blue-650 text-white px-6 py-3 rounded-xl transition-all font-semibold"
                        >
                            Upgrade Plan
                        </button>

                        {subscription.status === 'active' && (
                            <button
                                onClick={() => setConfirmCancelOpen(true)}
                                className="w-full bg-red-600/10 hover:bg-red-600/20 border border-red-500/30 text-red-400 px-6 py-3 rounded-xl transition-all font-semibold flex items-center justify-center gap-2"
                            >
                                <XCircle className="w-5 h-5" />
                                Cancel Subscription
                            </button>
                        )}

                        {subscription.status === 'trial' && (
                            <button
                                onClick={() => router.push('/pricing')}
                                className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition-all font-semibold"
                            >
                                Subscribe Now
                            </button>
                        )}
                    </div>
                </motion.div>

            </main>

            {/* Switch Mode Custom Confirm Modal */}
            <ConfirmModal
                isOpen={confirmSwitchOpen}
                onClose={() => setConfirmSwitchOpen(false)}
                onConfirm={handleSwitchMode}
                title="Migrate Storage Mode?"
                description={`Are you sure you want to switch to ${subscription.mode === 'centralized' ? 'decentralized' : 'centralized'} mode? This will migrate your data. Migration fee: $9.99.`}
                confirmText="Migrate Node"
                cancelText="Keep Current"
                variant="info"
            />

            {/* Cancel Subscription Custom Confirm Modal */}
            <ConfirmModal
                isOpen={confirmCancelOpen}
                onClose={() => setConfirmCancelOpen(false)}
                onConfirm={handleCancelSubscription}
                title="Cancel Renewal Plans?"
                description="Are you sure you want to cancel? Your data will be locked at the end of the billing period."
                confirmText="Cancel Renewal"
                cancelText="Keep Active"
                variant="danger"
                requiresVerification={true}
                verificationText="cancel renewal"
            />

            <SharedFooter />
        </div>
    )
}
