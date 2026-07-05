'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Shield, TrendingUp, Calendar, CreditCard, RefreshCw, XCircle, Zap, Users, HardDrive, FileText as ReceiptIcon, Printer, X, Download, QrCode } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSubscription } from '@/contexts/SubscriptionContext'
import { ALL_PLANS } from '@/types/subscription'
import { useState, useEffect } from 'react'
import QRCode from 'qrcode'
import { toast } from 'sonner'
import { ConfirmModal } from '@/components/confirm-modal'
import { LOGO_BASE64 } from '@/utils/logo-base64'

// Receipt Detail Modal Component
interface ReceiptModalProps {
    isOpen: boolean
    onClose: () => void
    invoice: any
}

function ReceiptModal({ isOpen, onClose, invoice }: ReceiptModalProps) {
    const [qrDataUrl, setQrDataUrl] = useState<string>('')
    const [verificationUrl, setVerificationUrl] = useState<string>('')
    const [originUrl, setOriginUrl] = useState<string>('')
    const { subscription } = useSubscription()

    useEffect(() => {
        const fetchOrigin = async () => {
            try {
                let origin = typeof window !== 'undefined' ? window.location.origin : 'https://will.alwaysthere.io'
                if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
                    const res = await fetch('/api/origin')
                    if (res.ok) {
                        const data = await res.json()
                        if (data.origin) {
                            origin = data.origin
                        }
                    }
                }
                setOriginUrl(origin)
            } catch (err) {
                console.error('Failed to fetch origin:', err)
            }
        }
        fetchOrigin()
    }, [])

    useEffect(() => {
        if (!invoice || !originUrl) return

        const generateQr = async () => {
            try {
                const url = `${originUrl}/receipt?id=${invoice.id}&date=${encodeURIComponent(invoice.date)}&amount=${encodeURIComponent(invoice.amount)}&method=${encodeURIComponent(invoice.method)}&status=${encodeURIComponent(invoice.status)}&ref=${encodeURIComponent(invoice.reference)}&address=${encodeURIComponent(invoice.details?.address || '')}&plan=${encodeURIComponent(subscription?.plan || 'starter')}`

                setVerificationUrl(url)

                const dataUrl = await QRCode.toDataURL(url, {
                    width: 150,
                    margin: 1,
                    color: {
                        dark: '#1e293b', // slate-800
                        light: '#ffffff'
                    }
                })
                setQrDataUrl(dataUrl)
            } catch (err) {
                console.error('Failed to generate QR code:', err)
            }
        }

        generateQr()
    }, [invoice, originUrl])

    if (!isOpen || !invoice) return null

    const handlePrint = () => {
        if (typeof window !== 'undefined') {
            window.print()
        }
    }

    const handleDownload = () => {
        const element = document.getElementById('printable-receipt-content')
        if (!element) return

        toast.info('Generating PDF receipt...')

        const opt = {
            margin:       [8, 10, 8, 10], // top, left, bottom, right in mm
            filename:     `AlwaysThere-Receipt-${invoice.id}.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true, logging: false },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        const runHtml2Pdf = () => {
            // @ts-ignore
            window.html2pdf().from(element).set(opt).save().then(() => {
                toast.success('Receipt PDF downloaded successfully!');
            }).catch((err: any) => {
                console.error('PDF generation error:', err);
                toast.error('Failed to generate PDF. Please try printing to PDF instead.');
            });
        }

        // @ts-ignore
        if (window.html2pdf) {
            runHtml2Pdf();
        } else {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
            script.integrity = 'sha512-GsLlZN/3F2ErC5IfS5QtgpiJtWd67OghLxopWZvywHpQ43uzihUsV1RV5spW4QFDmSu58hyyUkey+j1NqW0RsQ==';
            script.crossOrigin = 'anonymous';
            script.referrerPolicy = 'no-referrer';
            script.onload = runHtml2Pdf;
            document.body.appendChild(script);
        }
    }

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[120] overflow-y-auto flex justify-center items-start p-4 sm:p-6 md:p-10 print:p-0 print:absolute print:inset-0 print:bg-white print:z-[200] print:block print:overflow-visible">
                {/* Backdrop overlay */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-950/70 backdrop-blur-md print:hidden"
                />
                
                {/* Modal Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: 12 }}
                    className="relative w-full max-w-2xl my-8 overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 shadow-2xl p-6 md:p-8 text-slate-800 dark:text-slate-100 print:shadow-none print:border-none print:w-full print:max-w-none print:p-0 print:my-0 print:mx-0 print:bg-white print:text-black print:dark:text-black print:static print:scale-100"
                >
                    {/* Print CSS to isolate ONLY the receipt content */}
                    <style dangerouslySetInnerHTML={{__html: `
                        @media print {
                            @page {
                                size: A4 portrait;
                                margin: 8mm 10mm !important;
                            }
                            body {
                                background: white !important;
                                color: black !important;
                                margin: 0 !important;
                                padding: 0 !important;
                            }
                            header, footer, nav, aside, [role="navigation"] {
                                display: none !important;
                            }
                            body * {
                                visibility: hidden;
                            }
                            #printable-receipt-content, #printable-receipt-content * {
                                visibility: visible;
                                -webkit-print-color-adjust: exact !important;
                                print-color-adjust: exact !important;
                            }
                            #printable-receipt-content {
                                display: block !important;
                                position: relative !important;
                                width: 100% !important;
                                max-width: 100% !important;
                                background: white !important;
                                color: black !important;
                                margin: 0 !important;
                                padding: 0 !important;
                                border: none !important;
                                box-shadow: none !important;
                                page-break-inside: avoid;
                                break-inside: avoid;
                            }
                            .dark {
                                background: white !important;
                                color: black !important;
                            }
                        }
                    `}} />

                    {/* Close Button (Hidden on Print) */}
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/5 text-slate-400 hover:text-slate-800 dark:hover:text-white dark:hover:bg-white/10 transition-colors z-10 print:hidden"
                    >
                        <X size={16} />
                    </button>

                    {/* INVOICE CONTENT (Targeted for Print/Download) */}
                    <div id="printable-receipt-content" className="print:text-black dark:print:text-black text-slate-800 bg-white p-6 rounded-3xl animate-in fade-in zoom-in-95 duration-200">
                        
                        {/* Header Banner (Soft Light Blue Background) */}
                        <div className="bg-[#ebf3ff] p-6 rounded-2xl -mx-6 -mt-6 mb-6 text-slate-800 border-b border-blue-100/50 print:bg-[#ebf3ff] print:p-4 print:mb-4">
                            <div className="flex flex-row justify-between items-start gap-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2.5">
                                        <img src={LOGO_BASE64} alt="AlwaysThere Logo" className="h-9 w-auto object-contain" />
                                        <span className="text-lg font-black text-slate-900 tracking-tight">AlwaysThere</span>
                                    </div>
                                    <div className="text-[10px] text-slate-500 leading-relaxed font-semibold print:text-[9px] print:leading-normal">
                                        AlwaysThere Vault Inc.<br />
                                        Decentralized Smart Will Storage & Recovery Node<br />
                                        will.alwaystherevault.com | support@alwaystherevault.com
                                    </div>
                                </div>
                                <div className="text-right font-medium text-slate-700 space-y-1 text-xs print:text-[10px]">
                                    <p><span className="text-slate-400 font-bold uppercase tracking-wider text-[9px] print:text-[8px]">Receipt:</span> <span className="font-mono font-bold text-slate-900">{invoice.id}</span></p>
                                    <p><span className="text-slate-400 font-bold uppercase tracking-wider text-[9px] print:text-[8px]">Date:</span> <span className="font-bold text-slate-900">{invoice.date}</span></p>
                                    <p><span className="text-slate-400 font-bold uppercase tracking-wider text-[9px] print:text-[8px]">Status:</span> <span className="inline-flex px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">{invoice.status}</span></p>
                                </div>
                            </div>
                        </div>

                        {/* Summary Header block */}
                        <div className="px-1">
                            <h2 className="text-sm font-black text-indigo-700 uppercase tracking-widest print:text-xs">Summary</h2>
                            <div className="border-t-2 border-orange-300/80 my-3 print:my-2" />
                        </div>

                        {/* Double Columns: Shipping Address vs Billing Address styled columns */}
                        <div className="grid grid-cols-2 gap-6 mb-4 text-xs px-1 print:gap-4 print:mb-3 print:text-[10px]">
                            <div>
                                <h3 className="font-bold text-indigo-600 uppercase tracking-wider mb-2">Vault Registry Node</h3>
                                <div className="text-slate-600 space-y-1 leading-relaxed">
                                    <p className="font-bold text-slate-800">AlwaysThere Registry Node 1</p>
                                    <p>Smart Contract: <span className="font-mono text-[10px] bg-slate-100 px-1 py-0.5 rounded print:text-[9px]">{invoice.reference}</span></p>
                                    <p>Arweave Web3 Gateway (Agility-001)</p>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-indigo-600 uppercase tracking-wider mb-2">Subscriber Details</h3>
                                <div className="text-slate-600 space-y-1 leading-relaxed font-sans">
                                    <p className="font-bold text-slate-800">Wallet Account Billed</p>
                                    <p className="font-mono text-[10px] break-all bg-slate-50 p-2 rounded border border-slate-150 print:text-[9px] print:p-1.5">
                                        {invoice.details?.address}
                                    </p>
                                    <p>License Status: <span className="font-semibold text-emerald-600">Authenticated Vault</span></p>
                                </div>
                            </div>
                        </div>
                        <div className="border-t-2 border-orange-300/80 my-3 mx-1 print:my-2" />

                        {/* Table - Items */}
                        <div className="border border-slate-200 rounded-2xl overflow-hidden mb-6 text-xs mx-1 print:mb-4 print:text-[10px]">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-indigo-600 text-white font-bold">
                                        <th className="p-3 print:p-2">Product Service</th>
                                        <th className="p-3 print:p-2 text-center">Quantity</th>
                                        <th className="p-3 print:p-2 text-right">Unit Price</th>
                                        <th className="p-3 print:p-2 text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(invoice.details?.items || []).map((item: any, idx: number) => (
                                        <tr key={idx} className={`${idx % 2 === 0 ? 'bg-slate-50/70' : 'bg-white'} text-slate-800 border-b border-slate-200/50`}>
                                            <td className="p-3 print:p-2">
                                                <p className="font-bold text-slate-900">{item.name}</p>
                                                <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed print:text-[9px]">{item.description}</p>
                                            </td>
                                            <td className="p-3 print:p-2 text-center font-semibold text-slate-600">{item.quantity}</td>
                                            <td className="p-3 print:p-2 text-right font-semibold text-slate-700">{item.unitPrice}</td>
                                            <td className="p-3 print:p-2 text-right font-bold text-slate-900">{item.total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Totals Section */}
                        <div className="flex flex-col items-end gap-1.5 text-xs mb-8 pr-2 print:mb-4 print:gap-1 print:text-[10px]">
                            <div className="flex justify-between w-52 text-slate-500">
                                <span>Sub-Total:</span>
                                <span className="font-bold text-slate-800">{invoice.details?.subtotal}</span>
                            </div>
                            <div className="flex justify-between w-52 text-slate-500">
                                <span>Vault Setup Fee:</span>
                                <span className="font-bold text-slate-800">$0.00</span>
                            </div>
                            <div className="flex justify-between w-52 text-slate-500">
                                <span>Promotion Discount:</span>
                                <span className="font-bold text-emerald-600">-$0.00</span>
                            </div>
                            <div className="flex justify-between w-52 text-sm font-black border-t border-slate-200 pt-2 text-slate-900 print:text-xs">
                                <span>Total Payable:</span>
                                <span>{invoice.details?.total}</span>
                            </div>
                        </div>

                        {/* Bottom Payment Verification & QR Box */}
                        <div className="border border-slate-200 rounded-2xl p-5 mb-5 text-xs bg-slate-50/50 print:p-4 print:mb-4 print:text-[10px]">
                            <h3 className="font-bold text-xs text-indigo-700 uppercase tracking-widest mb-3 flex items-center gap-1.5 print:text-[9px]">
                                <span>💳</span> Payment Verification Details
                            </h3>
                            <div className="flex flex-row justify-between items-center gap-4">
                                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-slate-600 w-full md:w-auto print:gap-x-4 print:gap-y-1">
                                    <div>
                                        <span className="text-slate-400 font-medium font-semibold">Payment Gateway:</span>
                                    </div>
                                    <div className="font-bold text-slate-800">
                                        {invoice.details?.paymentGateway || (invoice.method === 'Crypto' ? 'Metamask Web3 Vault Escrow' : invoice.method === 'PayPal' ? 'PayPal Secure Portal' : 'System Setup (No Cost)')}
                                    </div>
                                    
                                    <div>
                                        <span className="text-slate-400 font-medium">Currency Method:</span>
                                    </div>
                                    <div className="font-semibold text-slate-800">
                                        {invoice.details?.currencyMethod || (invoice.method === 'Crypto' ? 'USDC (Polygon Network)' : invoice.method === 'PayPal' ? 'USD ($)' : 'Trial License')}
                                    </div>

                                    <div>
                                        <span className="text-slate-400 font-medium">Amount Received:</span>
                                    </div>
                                    <div className="font-bold text-slate-900">
                                        {invoice.amount}
                                    </div>

                                    <div>
                                        <span className="text-slate-400 font-medium font-semibold">Transaction ID:</span>
                                    </div>
                                    <div className="font-mono text-[10px] break-all max-w-[200px] sm:max-w-xs md:max-w-none text-slate-800 print:text-[9px]">
                                        {invoice.reference}
                                    </div>
                                </div>

                                <div className="flex flex-col items-center gap-1.5 p-2 bg-white border border-slate-200 rounded-xl shadow-sm print:p-1.5 flex-shrink-0">
                                    {qrDataUrl ? (
                                        <img 
                                            src={qrDataUrl} 
                                            alt="Verify On-Chain QR" 
                                            className="w-24 h-24 object-contain print:w-20 print:h-20" 
                                        />
                                    ) : (
                                        <div className="w-24 h-24 bg-slate-100 animate-pulse rounded print:w-20 print:h-20" />
                                    )}
                                    <span className="text-[8px] text-slate-400 font-mono tracking-tight">Verify On-Chain</span>
                                </div>
                            </div>
                        </div>

                        {/* Footer links & Trademark */}
                        <div className="border-t border-slate-200 pt-6 text-center text-[10px] text-slate-400 space-y-2 print:pt-4 print:space-y-1">
                            <div className="flex justify-center gap-4 text-indigo-600 font-bold print:gap-3">
                                <a href="#" className="hover:underline">Privacy Policy</a>
                                <span>|</span>
                                <a href="#" className="hover:underline">Terms & Conditions</a>
                                <span>|</span>
                                <a href="#" className="hover:underline">Contact Support</a>
                            </div>
                            <p className="font-semibold">© AlwaysThere Vault Inc. - All Rights Reserved</p>
                        </div>

                        {/* Bottom Orange Accent Bar */}
                        <div className="h-2 bg-orange-400 -mx-6 -mb-6 mt-6 rounded-b-3xl print:mt-4" />
                    </div>

                    {/* Action buttons (Hidden on Print) */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-8 print:hidden">
                        <button
                            onClick={handleDownload}
                            className="flex-1 flex items-center justify-center gap-2 h-11 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-white font-bold rounded-xl text-sm transition-all border border-slate-200 dark:border-white/5"
                        >
                            <Download size={16} />
                            Download PDF
                        </button>
                        <button
                            onClick={handlePrint}
                            className="flex-1 flex items-center justify-center gap-2 h-11 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-white font-bold rounded-xl text-sm transition-all border border-slate-200 dark:border-white/5"
                        >
                            <Printer size={16} />
                            Print Receipt
                        </button>
                        <button
                            onClick={onClose}
                            className="flex-1 h-11 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-blue-500/25 hover:scale-[1.01] active:scale-[0.99] duration-150"
                        >
                            Done
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}

export function SubscriptionDashboard() {
    const router = useRouter()
    const { subscription, isLoading, switchMode, cancelSubscription, refresh } = useSubscription()
    const [switching, setSwitching] = useState(false)
    const [confirmCancelOpen, setConfirmCancelOpen] = useState(false)
    const [confirmSwitchOpen, setConfirmSwitchOpen] = useState(false)
    const [activeReceipt, setActiveReceipt] = useState<any | null>(null)
    const defaultTransition = { duration: 0.5, ease: "easeOut" as const }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-16">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-[#1152d4]/30 border-t-[#1152d4] rounded-full animate-spin" />
                    <p className="text-slate-500 text-sm font-medium">Loading your subscription...</p>
                </div>
            </div>
        )
    }

    if (!subscription) {
        return (
            <div className="flex items-center justify-center p-12 bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-3xl">
                <div className="text-center">
                    <h2 className="text-xl text-slate-900 dark:text-white mb-4 font-bold">No Subscription Found</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-6">Initialize your vault to see subscription status.</p>
                    <button
                        onClick={refresh}
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
        setConfirmSwitchOpen(false)
        const newMode = subscription.mode === 'centralized' ? 'decentralized' : 'centralized'
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
        setConfirmCancelOpen(false)
        try {
            await cancelSubscription()
            toast.success('Status updated to Cancelled.')
        } catch (error) {
            toast.error('Failed to update subscription')
        }
    }

    const getBillingHistory = () => {
        const history = []
        const quotaSize = Math.round((subscription.storageLimit || 524288000) / (1024 * 1024))
        const quotaString = quotaSize >= 1024 ? `${(quotaSize / 1024).toFixed(1)} GB quota` : `${quotaSize} MB quota`
        
        // If current plan is premium (not free tiers), show renewal/billing entry
        if (subscription.plan !== 'starter' && subscription.plan !== 'freedom_starter') {
            const planName = planDetails?.name || subscription.planName || subscription.plan
            const isDecentralized = subscription.mode === 'decentralized'
            const method = isDecentralized ? 'Crypto' : 'PayPal'
            const paymentRef = subscription.id || 'TX-8920481239'
            const displayPrice = isDecentralized ? `${price} USDC` : `$${price}.00`
            const billingDate = subscription.createdAt ? new Date(subscription.createdAt) : new Date()
            
            history.push({
                id: `REC-${billingDate.getFullYear()}-002-PREM-S`,
                date: billingDate.toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                }),
                description: `${planName} Plan Activation`,
                amount: displayPrice,
                method: method,
                status: subscription.status === 'active' ? 'Paid' : 'Success',
                reference: paymentRef,
                details: {
                    address: subscription.userId,
                    item: `${planName} Vault Subscription`,
                    items: [
                        {
                            name: `${planName} Vault Subscription`,
                            description: 'Decentralized secure heartbeat fail-safe digital will storage & beneficiary allocation.',
                            quantity: '1 month',
                            unitPrice: displayPrice,
                            total: displayPrice
                        },
                        {
                            name: 'Arweave Web3 Storage Escrow',
                            description: 'On-chain lifetime data preservation payload fee.',
                            quantity: quotaString,
                            unitPrice: '$0.00',
                            total: '$0.00'
                        }
                    ],
                    subtotal: displayPrice,
                    tax: '$0.00',
                    total: displayPrice,
                    paymentGateway: isDecentralized ? 'MetaMask Web3 Escrow' : 'PayPal Secure Gateway',
                    currencyMethod: isDecentralized ? 'Polygon USDC' : 'USD Fiat'
                }
            })
        }
        
        // Setup base entry
        const setupDate = subscription.createdAt ? new Date(subscription.createdAt) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        history.push({
            id: 'REC-2026-001-STEM-S',
            date: setupDate.toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            }),
            description: 'AlwaysThere Vault Initialization & Free Storage Tier',
            amount: '$0.00',
            method: 'System',
            status: 'Completed',
            reference: 'SYSTEM-SETUP-INITIAL',
            details: {
                address: subscription.userId,
                item: 'AlwaysThere Vault Setup (Free Tier)',
                items: [
                    {
                        name: 'AlwaysThere Vault Setup (Free Tier)',
                        description: 'Decentralized secure heartbeat fail-safe digital will storage & beneficiary allocation.',
                        quantity: 'Lifetime',
                        unitPrice: '$0.00',
                        total: '$0.00'
                    },
                    {
                        name: 'Arweave Web3 Storage Escrow',
                        description: 'On-chain lifetime data preservation payload fee.',
                        quantity: '500 MB quota',
                        unitPrice: '$0.00',
                        total: '$0.00'
                    }
                ],
                subtotal: '$0.00',
                tax: '$0.00',
                total: '$0.00',
                paymentGateway: 'System Setup (No Cost)',
                currencyMethod: 'Trial License'
            }
        })
        
        return history
    }

    return (
        <>
            <div className="space-y-6 print:hidden">
                {/* Current Plan Card */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-white/5 dark:to-white/[0.02] border border-slate-200 dark:border-white/10 rounded-3xl p-8 shadow-xl backdrop-blur-sm"
            >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">{subscription.mode === 'centralized' ? '🏢' : '⛓️'}</span>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white capitalize">
                                {planDetails?.name || subscription.planName || subscription.plan}
                            </h2>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${subscription.status === 'active' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                subscription.status === 'trial' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                    'bg-red-500/10 text-red-400 border border-red-500/20'
                                }`}>
                                {subscription.status === 'active' ? 'Active' : subscription.status === 'trial' ? 'Trial' : subscription.status}
                            </span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400">
                            Service Architecture: <span className="text-slate-800 dark:text-white font-medium capitalize">{subscription.mode}</span>
                        </p>
                    </div>
                    <div className="text-left md:text-right">
                        <p className="text-4xl font-black text-slate-900 dark:text-white">${price}<span className="text-lg text-slate-500 font-normal">/mo</span></p>
                        <p className="text-sm text-slate-500">Billed monthly</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-slate-200 dark:border-white/5">
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Included Features</h3>
                        <ul className="grid grid-cols-1 gap-2">
                            {features.map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-sm">
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
                                onClick={() => setConfirmSwitchOpen(true)}
                                disabled={switching || !subscription.canSwitchMode}
                                className="flex items-center gap-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white px-4 py-2.5 rounded-xl transition-all text-sm font-bold disabled:opacity-50"
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <UsageCard
                        title="Secure Storage"
                        subtitle="Upload as many files as fit in your quota"
                        current={Number(((subscription.storageUsed || 0) / (1024 * 1024)).toFixed(2))}
                        limit={Math.round((subscription.storageLimit || 524288000) / (1024 * 1024))}
                        unit=" MB"
                        limitLabel={`${Math.round((subscription.storageLimit || 524288000) / (1024 * 1024))} MB — unlimited files`}
                        icon={<HardDrive className="w-5 h-5 text-purple-400" />}
                        color="from-purple-500 to-pink-600"
                    />
                    <UsageCard
                        title="Beneficiaries"
                        subtitle="People who receive your digital legacy"
                        current={subscription.beneficiariesCount || 0}
                        limit={limits.beneficiaries}
                        limitLabel={limits.beneficiaries === -1 ? 'Unlimited beneficiaries' : `Up to ${limits.beneficiaries} ${limits.beneficiaries === 1 ? 'person' : 'people'}`}
                        icon={<Users className="w-5 h-5 text-emerald-400" />}
                        color="from-emerald-500 to-teal-600"
                    />
                </div>
            )}

            {/* Billing & Payment History */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-3xl p-6 shadow-xl"
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-xl bg-slate-200/50 dark:bg-white/[0.05]">
                        <ReceiptIcon className="w-5 h-5 text-[#1152d4]" />
                    </div>
                    <div>
                        <h3 className="text-lg font-black text-slate-900 dark:text-white">Billing & Payment History</h3>
                        <p className="text-xs text-slate-500">View transaction history and access premium receipts</p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-white/5 text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-wider">
                                <th className="pb-3 pr-4">Invoice ID</th>
                                <th className="pb-3 px-4">Date</th>
                                <th className="pb-3 px-4">Description</th>
                                <th className="pb-3 px-4">Amount</th>
                                <th className="pb-3 px-4">Method</th>
                                <th className="pb-3 px-4">Status</th>
                                <th className="pb-3 pl-4 text-right">Receipt</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-white/5 text-xs text-slate-700 dark:text-slate-350">
                            {getBillingHistory().map((invoice) => (
                                <tr key={invoice.id} className="hover:bg-slate-100/50 dark:hover:bg-white/[0.01] transition-colors">
                                    <td className="py-3.5 pr-4 font-mono font-medium">{invoice.id}</td>
                                    <td className="py-3.5 px-4">{invoice.date}</td>
                                    <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-white">{invoice.description}</td>
                                    <td className="py-3.5 px-4 font-bold">{invoice.amount}</td>
                                    <td className="py-3.5 px-4">{invoice.method}</td>
                                    <td className="py-3.5 px-4">
                                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                            invoice.status === 'Paid' || invoice.status === 'Completed' || invoice.status === 'Success'
                                                ? 'bg-green-500/10 text-green-500 dark:text-green-400 border border-green-500/10'
                                                : 'bg-slate-500/10 text-slate-400'
                                        }`}>
                                            {invoice.status}
                                        </span>
                                    </td>
                                    <td className="py-3.5 pl-4 text-right">
                                        <button
                                            onClick={() => setActiveReceipt(invoice)}
                                            className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-[#1152d4] dark:text-blue-400 px-3 py-1.5 rounded-lg text-[11px] font-bold border border-slate-200 dark:border-white/5 transition-all"
                                        >
                                            <Printer size={12} />
                                            View Receipt
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Cancel Button */}
            {subscription.status !== 'cancelled' && (
                <div className="flex justify-center pt-4">
                    <button
                        onClick={() => setConfirmCancelOpen(true)}
                        className="text-slate-500 hover:text-red-400 text-sm font-medium flex items-center gap-2 transition-colors px-4 py-2 hover:bg-red-400/5 rounded-lg border border-transparent hover:border-red-400/20"
                    >
                        <XCircle className="w-4 h-4" />
                        Cancel Future Renewals
                    </button>
                </div>
            )}

            {/* Switch Mode Custom Confirm Modal */}
            <ConfirmModal
                isOpen={confirmSwitchOpen}
                onClose={() => setConfirmSwitchOpen(false)}
                onConfirm={handleSwitchMode}
                title="Migrate Storage Mode?"
                description={`Are you sure you want to switch to ${subscription.mode === 'centralized' ? 'decentralized' : 'centralized'} mode? This will update your vault settings. Mode switching maintains all of your encrypted files while updating the underlying hosting structure.`}
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
                description="Are you sure you want to cancel? Your data will remain encrypted but new uploads will be disabled after the period ends."
                confirmText="Cancel Renewal"
                cancelText="Keep Active"
                variant="danger"
                requiresVerification={true}
                verificationText="cancel renewal"
            />

            </div>

            {/* Receipt Modal Popup */}
            <ReceiptModal
                isOpen={activeReceipt !== null}
                onClose={() => setActiveReceipt(null)}
                invoice={activeReceipt}
            />
        </>
    )
}

function UsageCard({ title, subtitle, current, limit, unit = '', limitLabel, icon, color }: any) {
    const isUnlimited = limit === -1 || limit == null
    const percentage = isUnlimited ? 0 : Math.min(100, (current / limit) * 100)
    const isNearLimit = percentage >= 80
    const isFull = percentage >= 100

    return (
        <div className="bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 rounded-3xl p-6 hover:bg-slate-100 dark:hover:bg-white/[0.05] transition-all">
            <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-xl bg-slate-200/50 dark:bg-white/[0.05]">
                    {icon}
                </div>
                <div className="text-right">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter block">{title}</span>
                    {subtitle && <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-0.5 max-w-[120px]">{subtitle}</span>}
                </div>
            </div>

            <div className="flex items-baseline gap-1 mb-1">
                <span className={`text-3xl font-black ${isFull ? 'text-red-500' : isNearLimit ? 'text-amber-500' : 'text-slate-900 dark:text-white'}`}>{current}</span>
                <span className="text-slate-500 font-medium">/ {isUnlimited ? '∞' : `${limit}${unit}`}</span>
            </div>

            {limitLabel && (
                <p className="text-[10px] text-slate-400 dark:text-slate-500 mb-3">{limitLabel}</p>
            )}

            {!isUnlimited && (
                <div className="h-1.5 w-full bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        className={`h-full bg-gradient-to-r ${isFull ? 'from-red-500 to-red-600' : isNearLimit ? 'from-amber-500 to-orange-500' : color}`}
                    />
                </div>
            )}
        </div>
    )
}
