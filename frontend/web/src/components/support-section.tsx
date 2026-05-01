'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Globe, Copy, Wallet, CreditCard, RefreshCw, Shield, ChevronDown, Zap, Target, MessageSquare, ExternalLink, HelpCircle } from 'lucide-react'
import { ethers } from 'ethers'
import { toast } from 'sonner'

export function SupportSection() {
  const [isDonating, setIsDonating] = useState(false)
  const [usdAmount, setUsdAmount] = useState('125')
  const [cryptoAmount, setCryptoAmount] = useState('0.0416')
  const [activeTab, setActiveTab] = useState('crypto')
  const [selectedCurrency, setSelectedCurrency] = useState('ETH')
  const [selectedNetwork, setSelectedNetwork] = useState('Ethereum')
  const [donateBy, setDonateBy] = useState('wallet')
  const [frequency, setFrequency] = useState('once')

  const developerAddress = '0xFF38De9C8f7B6A4cf810EAcE53D3E8EA9Dac1178'

  const NETWORKS: Record<string, any> = {
    'Ethereum': { id: 1, symbol: 'ETH' },
    'Polygon': { id: 137, symbol: 'MATIC' },
    'Arbitrum': { id: 42161, symbol: 'ETH' },
    'BSC': { id: 56, symbol: 'BNB' }
  }

  const COINS = [
    { name: 'ETH', full: 'Ether', icon: '💎' },
    { name: 'MATIC', full: 'Polygon', icon: '🟣' },
    { name: 'USDC', full: 'USD Coin', icon: '💵' },
    { name: 'DOGE', full: 'Dogecoin', icon: '🐕' },
    { name: 'BTC', full: 'Bitcoin', icon: '₿' }
  ]

  useEffect(() => {
    const usd = parseFloat(usdAmount) || 0
    const prices: Record<string, number> = { 'ETH': 3000, 'MATIC': 0.75, 'BNB': 600, 'USDC': 1, 'USDT': 1, 'DOGE': 0.15, 'BTC': 65000 }
    setCryptoAmount((usd / (prices[selectedCurrency] || 1)).toFixed(selectedCurrency.includes('USD') ? 2 : 6))
  }, [usdAmount, selectedCurrency])

  const handleDonate = async () => {
    if (typeof window.ethereum === 'undefined') {
      toast.error('Oracle Link Missing', { description: 'Please install MetaMask to secure the protocol.' })
      return
    }

    try {
      setIsDonating(true)
      let provider = new ethers.BrowserProvider(window.ethereum as any)
      const targetNet = NETWORKS[selectedNetwork]

      let network = await provider.getNetwork()
      if (Number(network.chainId) !== targetNet.id) {
        toast.info(`Requesting Protocol Shift...`)
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${targetNet.id.toString(16)}` }]
          })
          provider = new ethers.BrowserProvider(window.ethereum as any)
        } catch (switchError: any) {
          if (switchError.code === 4001) throw new Error('User rejected network switch.')
          throw switchError
        }
      }

      const signer = await provider.getSigner()
      let tx;

      const isStable = selectedCurrency === 'USDC' || selectedCurrency === 'USDT'
      if (isStable) {
        const STABLECOINS: Record<string, Record<number, string>> = {
          'USDC': { 1: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 137: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359' },
          'USDT': { 1: '0xdAC17F958D2ee523a2206206994597C13D831ec7', 137: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F' }
        }
        const tokenAddress = STABLECOINS[selectedCurrency]?.[targetNet.id]
        if (!tokenAddress) throw new Error(`${selectedCurrency} mapping missing for ${selectedNetwork}`)

        const erc20Abi = ["function transfer(address to, uint256 amount) public returns (bool)", "function decimals() view returns (uint8)"]
        const contract = new ethers.Contract(tokenAddress, erc20Abi, signer)
        const decimals = await contract.decimals()
        tx = await contract.transfer(developerAddress, ethers.parseUnits(usdAmount, decimals))
      } else {
        tx = await signer.sendTransaction({
          to: developerAddress,
          value: ethers.parseEther(cryptoAmount)
        })
      }

      toast.promise(tx.wait(), {
        loading: 'Writing contribution to the immutable ledger...',
        success: 'Legacy Contribution Secured. ❤️',
        error: 'Chain validation failed.'
      })
      setIsDonating(false)
    } catch (error: any) {
      console.error("Donate Error Handshake:", error)
      setIsDonating(false)
      if (error.code === 4001 || error.code === 'ACTION_REJECTED') return
      const errorMsg = error.message?.toLowerCase() || ''
      const isInsufficient = errorMsg.includes('insufficient funds') || error.code === 'INSUFFICIENT_FUNDS' || (error.error?.code === -32603)
      if (isInsufficient) {
        toast.error('Insufficient Funds', { description: 'Your wallet balance is too low for this contribution + network gas fees.' })
      } else {
        toast.error('Protocol Handshake Failed', { description: error.reason || error.message || 'Transaction could not be completed.' })
      }
    }
  }

  return (
    <section className="bg-[#020408] min-h-screen py-16 md:py-24 relative overflow-hidden font-sans selection:bg-[#2b52ff]/30">
      <div className="absolute top-0 left-0 w-full h-[1000px] bg-gradient-to-b from-[#2b52ff]/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">

        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">Help keep AlwaysThere strong</h1>
          <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
            Your contribution will help millions of people secure their digital afterlife and stay safe online every day.
          </p>
        </div>

        <div className="flex justify-center border-b border-white/10 mb-8 max-w-2xl mx-auto">
          {['online', 'crypto', 'faq'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all relative ${activeTab === tab ? 'text-[#2b52ff]' : 'text-slate-500 hover:text-slate-300'}`}
            >
              DONATE {tab}
              {activeTab === tab && (
                <motion.div layoutId="t-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2b52ff]" />
              )}
            </button>
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-[#0a0c12] rounded-3xl border border-white/5 p-8 md:p-14 shadow-2xl relative overflow-hidden min-h-[600px]">
            <h2 className="text-xl font-bold mb-8 text-white">Your donation</h2>

            <AnimatePresence mode="wait">
              {activeTab === 'crypto' ? (
                <motion.div
                  key="crypto-panel"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-12"
                >
                  <div className="space-y-4">
                    <p className="text-[10px] font-black text-[#2b52ff] uppercase tracking-[0.3em]">DONATE BY</p>
                    <div className="flex bg-white/5 rounded-xl p-1.5 w-fit border border-white/5">
                      <button onClick={() => setDonateBy('wallet')} className={`flex items-center gap-3 px-6 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${donateBy === 'wallet' ? 'bg-[#2b52ff] text-white' : 'text-slate-500'}`}>
                        Wallet address
                      </button>
                      <button onClick={() => setDonateBy('btcpay')} className={`flex items-center gap-3 px-6 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${donateBy === 'btcpay' ? 'bg-[#2b52ff] text-white' : 'text-slate-500'}`}>
                        BTCPay
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-[10px] font-black text-[#2b52ff] uppercase tracking-[0.3em]">HOW OFTEN?</p>
                    <div className="flex bg-white/5 rounded-xl p-1.5 w-fit border border-white/5">
                      <button onClick={() => setFrequency('once')} className={`px-6 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${frequency === 'once' ? 'bg-[#2b52ff] text-white' : 'text-slate-500'}`}>Give once</button>
                      <button onClick={() => setFrequency('monthly')} className={`px-6 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${frequency === 'monthly' ? 'bg-[#2b52ff] text-white' : 'text-slate-500'}`}>Repeat monthly</button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-[10px] font-black text-[#2b52ff] uppercase tracking-[0.3em]">AMOUNT</p>
                    <div className="grid grid-cols-3 gap-3">
                      {['5', '25', '75', '125', '500', '1000'].map((val) => (
                        <button key={val} onClick={() => setUsdAmount(val)} className={`py-5 rounded-xl text-lg font-black transition-all border-2 ${usdAmount === val ? 'bg-[#2b52ff] text-white border-[#2b52ff]' : 'bg-white/5 text-white border-transparent hover:bg-white/10'}`}>
                          ${val}
                        </button>
                      ))}
                    </div>
                    <div className="relative group">
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-slate-600 group-focus-within:text-[#2b52ff]">$</span>
                      <input type="number" value={usdAmount} onChange={(e) => setUsdAmount(e.target.value)} className="w-full bg-white/5 border-2 border-white/5 rounded-2xl py-6 px-12 text-2xl font-black text-white outline-none focus:border-[#2b52ff] transition-all" />
                      <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-600 uppercase">USD</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-[#2b52ff]/5 border border-[#2b52ff]/10 rounded-2xl">
                      <span className="text-[10px] font-black text-slate-500 uppercase">ESTIMATED CONTRIBUTION</span>
                      <span className="text-sm font-black text-white">{cryptoAmount} <span className="text-[#2b52ff] uppercase">{selectedCurrency}</span></span>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-white/5 space-y-6">
                    <p className="text-[10px] font-black text-[#2b52ff] uppercase tracking-[0.3em]">STEP 1: SELECT YOUR ASSET</p>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {COINS.map((coin) => (
                         <button 
                           key={coin.name} 
                           onClick={() => setSelectedCurrency(coin.name)} 
                           className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${selectedCurrency === coin.name ? 'border-[#2b52ff] bg-[#2b52ff]/10 shadow-[0_0_15px_rgba(43,82,255,0.2)]' : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.05]'}`}
                         >
                           <span className="text-2xl mb-2 filter drop-shadow-md">{coin.icon}</span>
                           <span className={`text-xs font-black uppercase tracking-wider ${selectedCurrency === coin.name ? 'text-white' : 'text-slate-400'}`}>{coin.name}</span>
                         </button>
                      ))}
                    </div>
                    
                    <div className="p-4 bg-white/[0.02] rounded-xl border border-white/5 flex items-center justify-between">
                      <div className="overflow-hidden">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Direct Transfer Address</p>
                        <code className="text-[#2b52ff] font-mono text-xs sm:text-sm truncate block">{developerAddress}</code>
                      </div>
                      <button onClick={() => { navigator.clipboard.writeText(developerAddress); toast.success('Copied') }} className="p-3 hover:bg-white/10 rounded-lg bg-white/5 transition-all">
                        <Copy className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>
                  </div>

                  <button onClick={handleDonate} disabled={isDonating} className="w-full bg-[#2b52ff] hover:bg-[#1a3ecd] text-white py-8 rounded-[2rem] font-black text-xl uppercase tracking-[0.2em] shadow-2xl hover:shadow-[#2b52ff]/20 active:scale-[0.98] transition-all flex items-center justify-center gap-4">
                    {isDonating ? <RefreshCw className="w-8 h-8 animate-spin" /> : <>INITIATE PROTOCOL SUPPORT</>}
                  </button>
                </motion.div>
              ) : activeTab === 'online' ? (
                <motion.div
                  key="online-panel"
                  initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                  className="space-y-8 flex flex-col items-center justify-center py-10"
                >
                  <CreditCard className="w-20 h-20 text-[#00457C] mb-4" />
                  <h3 className="text-2xl font-black text-white">Fiat Legacy Bridge</h3>
                  <p className="text-slate-400 text-center text-sm max-w-xs leading-relaxed">
                    Securely contribute using PayPal, Visa, or Mastercard via our verified PayPal gateway.
                  </p>
                  <button
                    onClick={() => { navigator.clipboard.writeText('subodhram3350@gmail.com'); toast.success('PayPal Email Copied!', { description: 'Please paste it in PayPal to send the support.' }); window.open('https://www.paypal.com/myaccount/transfer/homepage', '_blank'); }}
                    className="w-full h-20 rounded-[2rem] bg-[#0079C1] text-white font-black uppercase tracking-[0.2em] text-sm hover:bg-[#00457C] transition-all shadow-xl mt-6 flex items-center justify-center gap-3 active:scale-95 border border-[#00457C]/50"
                  >
                    <Zap className="w-5 h-5 fill-current text-yellow-400" /> Pay ${usdAmount} via PayPal
                  </button>
                  <div className="flex gap-6 opacity-30 mt-10">
                    <span className="text-white font-black italic">PAYPAL</span>
                    <span className="text-white font-black italic">VISA</span>
                    <span className="text-white font-black italic">MASTERCARD</span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="faq-panel"
                  initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  {[
                    { q: "Is my donation tax-deductible?", a: "AlwaysThere operates as a public good protocol. Check with your local jurisdiction." },
                    { q: "How are funds used?", a: "100% used for node maintenance and zero-knowledge research." },
                    { q: "Can I donate anonymously?", a: "Yes, crypto contributions are pseudonymous by design." }
                  ].map((faq, i) => (
                    <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/5">
                      <h4 className="text-sm font-black text-white mb-2 uppercase flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-[#2b52ff]" /> {faq.q}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed font-medium">{faq.a}</p>
                    </div>
                  ))}
                  <div className="text-center pt-6">
                    <button onClick={() => window.open('https://docs.alwaysthere.io', '_blank')} className="text-[10px] font-black text-[#2b52ff] uppercase tracking-widest hover:underline flex items-center justify-center gap-2 mx-auto">
                      View Detailed Documentation <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-12 pt-8 border-t border-white/5 text-center">
              <p className="text-[9px] text-slate-600 font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-2">
                <Shield className="w-3 h-3 text-green-500" /> Secure • Decentralized • Anonymous
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
