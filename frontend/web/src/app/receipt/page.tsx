'use client'

import { useEffect, useState, Suspense } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { LOGO_BASE64 } from '@/utils/logo-base64'
import { Download, Printer } from 'lucide-react'

function ReceiptContent() {
    const searchParams = useSearchParams()
    const id = searchParams?.get('id') || 'REC-2026-001-STEM-S'
    const date = searchParams?.get('date') || new Date().toLocaleDateString()
    const amount = searchParams?.get('amount') || '$0.00'
    const method = searchParams?.get('method') || 'System'
    const status = searchParams?.get('status') || 'Completed'
    const reference = searchParams?.get('ref') || 'SYSTEM-SETUP-INITIAL'
    const address = searchParams?.get('address') || '0x0000000000000000000000000000000000000000'
    const plan = searchParams?.get('plan') || 'starter'

    const handlePrint = () => {
        if (typeof window !== 'undefined') {
            window.print()
        }
    }

    const handleDownload = () => {
        if (typeof window === 'undefined') return
        const element = document.getElementById('printable-receipt-content')
        if (!element) return

        // Dynamic import of html2pdf.js
        const script = document.createElement('script')
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'
        script.onload = () => {
            const html2pdf = (window as any).html2pdf
            if (html2pdf) {
                const opt = {
                    margin: [10, 10, 10, 10],
                    filename: `AlwaysThere-Receipt-${id}.pdf`,
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2, useCORS: true },
                    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
                }
                html2pdf().from(element).set(opt).save()
            }
        }
        document.body.appendChild(script)
    }

    const items = id === 'REC-2026-001-STEM-S' || plan === 'starter' || plan === 'freedom_starter' ? [
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
    ] : [
        {
            name: `${plan.charAt(0).toUpperCase() + plan.slice(1)} Vault Subscription`,
            description: 'Decentralized secure heartbeat fail-safe digital will storage & beneficiary allocation.',
            quantity: '1 month',
            unitPrice: amount,
            total: amount
        },
        {
            name: 'Arweave Web3 Storage Escrow',
            description: 'On-chain lifetime data preservation payload fee.',
            quantity: '10 GB quota',
            unitPrice: '$0.00',
            total: '$0.00'
        }
    ]

    const paymentGateway = method === 'Crypto' ? 'Metamask Web3 Vault Escrow' : method === 'PayPal' ? 'PayPal Secure Portal' : 'System Setup (No Cost)'
    const currencyMethod = method === 'Crypto' ? 'USDC (Polygon Network)' : method === 'PayPal' ? 'USD ($)' : 'Trial License'

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 print:bg-white print:p-0">
            {/* Action buttons (Hidden on Print) */}
            <div className="flex gap-3 mb-6 w-full max-w-2xl justify-end print:hidden">
                <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition-all border border-slate-700 shadow"
                >
                    <Download size={14} />
                    Download PDF
                </button>
                <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition-all border border-slate-700 shadow"
                >
                    <Printer size={14} />
                    Print Receipt
                </button>
            </div>

            {/* INVOICE CONTENT */}
            <div 
                id="printable-receipt-content" 
                className="bg-white text-slate-800 p-4 sm:p-8 rounded-3xl w-full max-w-2xl shadow-2xl print:shadow-none print:rounded-none print:p-0"
            >
                {/* Header Banner */}
                <div className="bg-[#ebf3ff] p-4 sm:p-6 rounded-2xl -mx-1 sm:-mx-2 -mt-1 sm:-mt-2 mb-6 text-slate-800 border-b border-blue-100/50 print:bg-[#ebf3ff] print:p-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2.5">
                                <Image src={LOGO_BASE64} alt="AlwaysThere Logo" width={36} height={36} className="h-9 w-auto object-contain" unoptimized />
                                <span className="text-lg font-black text-slate-900 tracking-tight">AlwaysThere</span>
                            </div>
                            <div className="text-[10px] text-slate-500 leading-relaxed font-semibold print:text-[9px]">
                                AlwaysThere Vault Inc.<br />
                                Decentralized Smart Will Storage & Recovery Node<br />
                                will.alwaystherevault.com | support@alwaystherevault.com
                            </div>
                        </div>
                        <div className="text-left sm:text-right font-medium text-slate-700 space-y-1 text-xs print:text-[10px] print:text-right">
                            <p><span className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Receipt:</span> <span className="font-mono font-bold text-slate-900">{id}</span></p>
                            <p><span className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Date:</span> <span className="font-bold text-slate-900">{date}</span></p>
                            <p><span className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Status:</span> <span className="inline-flex px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">{status}</span></p>
                        </div>
                    </div>
                </div>

                {/* Summary Section */}
                <div className="px-1">
                    <h2 className="text-sm font-black text-indigo-700 uppercase tracking-widest">Summary</h2>
                    <div className="border-t-2 border-orange-300/80 my-3" />
                </div>

                {/* Addresses */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4 text-xs px-1 print:grid-cols-2 print:gap-4 print:text-[10px]">
                    <div>
                        <h3 className="font-bold text-indigo-600 uppercase tracking-wider mb-2">Vault Registry Node</h3>
                        <div className="text-slate-600 space-y-1 leading-relaxed">
                            <p className="font-bold text-slate-800">AlwaysThere Registry Node 1</p>
                            <p>Smart Contract: <span className="font-mono text-[10px] bg-slate-100 px-1 py-0.5 rounded">{reference}</span></p>
                            <p>Arweave Web3 Gateway (Agility-001)</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-indigo-600 uppercase tracking-wider mb-2">Subscriber Details</h3>
                        <div className="text-slate-600 space-y-1 leading-relaxed">
                            <p className="font-bold text-slate-800">Wallet Account Billed</p>
                            <p className="font-mono text-[10px] break-all bg-slate-50 p-2 rounded border border-slate-150">
                                {address}
                            </p>
                            <p>License Status: <span className="font-semibold text-emerald-600">Authenticated Vault</span></p>
                        </div>
                    </div>
                </div>
                <div className="border-t-2 border-orange-300/80 my-3 mx-1" />

                {/* Items Table */}
                <div className="overflow-x-auto border border-slate-200 rounded-2xl mb-6 mx-1">
                    <table className="w-full text-left border-collapse min-w-[500px] sm:min-w-0">
                        <thead>
                            <tr className="bg-indigo-600 text-white font-bold text-xs print:text-[10px]">
                                <th className="p-3">Product Service</th>
                                <th className="p-3 text-center">Quantity</th>
                                <th className="p-3 text-right">Unit Price</th>
                                <th className="p-3 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, idx) => (
                                <tr key={idx} className={`${idx % 2 === 0 ? 'bg-slate-50/70' : 'bg-white'} text-slate-800 border-b border-slate-200/50 text-xs print:text-[10px]`}>
                                    <td className="p-3">
                                        <p className="font-bold text-slate-900">{item.name}</p>
                                        <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{item.description}</p>
                                    </td>
                                    <td className="p-3 text-center font-semibold text-slate-600">{item.quantity}</td>
                                    <td className="p-3 text-right font-semibold text-slate-700">{item.unitPrice}</td>
                                    <td className="p-3 text-right font-bold text-slate-900">{item.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Totals */}
                <div className="flex flex-col items-end gap-1.5 text-xs mb-8 pr-2 print:text-[10px]">
                    <div className="flex justify-between w-52 text-slate-500">
                        <span>Sub-Total:</span>
                        <span className="font-bold text-slate-800">{amount}</span>
                    </div>
                    <div className="flex justify-between w-52 text-slate-500">
                        <span>Vault Setup Fee:</span>
                        <span className="font-bold text-slate-800">$0.00</span>
                    </div>
                    <div className="flex justify-between w-52 text-slate-500">
                        <span>Promotion Discount:</span>
                        <span className="font-bold text-emerald-600">-$0.00</span>
                    </div>
                    <div className="flex justify-between w-52 text-sm font-black border-t border-slate-200 pt-2 text-slate-900">
                        <span>Total Payable:</span>
                        <span>{amount}</span>
                    </div>
                </div>

                {/* Payment Verification Box */}
                <div className="border border-slate-200 rounded-2xl p-5 mb-5 text-xs bg-slate-50/50 print:p-4">
                    <h3 className="font-bold text-xs text-indigo-700 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                        <span>💳</span> Payment Verification Details
                    </h3>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-slate-600 w-full">
                        <div>
                            <span className="text-slate-400 font-medium font-semibold">Payment Gateway:</span>
                        </div>
                        <div className="font-bold text-slate-800">
                            {paymentGateway}
                        </div>
                        
                        <div>
                            <span className="text-slate-400 font-medium">Currency Method:</span>
                        </div>
                        <div className="font-semibold text-slate-800">
                            {currencyMethod}
                        </div>

                        <div>
                            <span className="text-slate-400 font-medium">Amount Received:</span>
                        </div>
                        <div className="font-bold text-slate-900">
                            {amount}
                        </div>

                        <div>
                            <span className="text-slate-400 font-medium font-semibold">Transaction ID:</span>
                        </div>
                        <div className="font-mono text-[10px] break-all text-slate-800">
                            {reference}
                        </div>
                    </div>
                </div>

                {/* Footer links */}
                <div className="border-t border-slate-200 pt-6 text-center text-[10px] text-slate-400 space-y-2 print:pt-4">
                    <div className="flex justify-center gap-4 text-indigo-600 font-bold">
                        <a href="#" className="hover:underline">Privacy Policy</a>
                        <span>|</span>
                        <a href="#" className="hover:underline">Terms & Conditions</a>
                        <span>|</span>
                        <a href="#" className="hover:underline">Contact Support</a>
                    </div>
                    <p className="font-semibold">© AlwaysThere Vault Inc. - All Rights Reserved</p>
                </div>

                {/* Bottom Orange Accent Bar */}
                <div className="h-2 bg-orange-400 -mx-8 -mb-8 mt-6 rounded-b-3xl" />
            </div>
        </div>
    )
}

export default function ReceiptPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-400">Loading receipt...</div>}>
            <ReceiptContent />
        </Suspense>
    )
}
