'use client';

import React, { useState } from 'react';
import { Share2, Copy, Check, Twitter, Send, MessageSquare, Mail, Award, Users, Gift, Shield } from 'lucide-react';
import { toast } from 'sonner';

interface ReferralProgramProps {
  userAddress?: string;
}

export function ReferralProgram({ userAddress = '0x0000000000000000000000000000000000000000' }: ReferralProgramProps) {
  const [copied, setCopied] = useState(false);
  
  const referralLink = typeof window !== 'undefined'
    ? `${window.location.origin}/join?ref=${userAddress.substring(0, 10)}`
    : `https://alwaystherevault.com/join?ref=${userAddress.substring(0, 10)}`;

  const shareText = `I just secured my digital estate and crypto legacy using AlwaysThere Vault—the definitive decentralized digital will protocol. Secure your seed phrases, private keys, and files today. Sign up using my link to get a free month of premium: ${referralLink} #Web3 #Crypto #Inheritance`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast.success('Referral link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy link.');
    }
  };

  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const shareTelegram = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const shareWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const shareEmail = () => {
    window.open(`mailto:?subject=${encodeURIComponent('Secure Your Digital Estate with AlwaysThere Vault')}&body=${encodeURIComponent(shareText)}`, '_blank');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero / Header Section */}
      <div className="relative p-8 rounded-[2rem] bg-gradient-to-br from-blue-600/[0.08] via-purple-500/[0.05] to-transparent border border-blue-500/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest">
              <Gift className="w-3.5 h-3.5" /> Viral Rewards Active
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Invite Friends. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Protect Legacies.</span>
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Share AlwaysThere Vault with fellow Web3 users, friends, or family. For every user who connects their wallet and configures a heartbeat monitor, both of you receive **1 Month of Premium features** free.
            </p>
          </div>
          <div className="w-20 h-20 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.2)] shrink-0">
            <Award className="w-10 h-10 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Referral Link & Sharing Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Share Card */}
        <div className="lg:col-span-2 p-8 rounded-3xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-6">
          <h3 className="text-lg font-black uppercase tracking-wider text-slate-800 dark:text-white flex items-center gap-2">
            <Share2 className="w-5 h-5 text-blue-500" /> Your Referral Hub
          </h3>
          
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block text-left">
              Personal Referral Link
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-grow bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-800 dark:text-slate-300 font-mono text-xs select-all truncate flex items-center">
                {referralLink}
              </div>
              <button
                onClick={copyToClipboard}
                className="px-6 py-3 bg-[#2b52ff] hover:bg-[#1a3ecd] text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-[0_0_15px_rgba(43,82,255,0.3)] shrink-0 flex items-center justify-center gap-2"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block text-left">
              Share Directly
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={shareTwitter}
                className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:border-blue-500/40 rounded-2xl flex flex-col items-center gap-2 group transition-all"
              >
                <Twitter className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-400">Twitter / X</span>
              </button>
              <button
                onClick={shareTelegram}
                className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:border-blue-500/40 rounded-2xl flex flex-col items-center gap-2 group transition-all"
              >
                <Send className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-400">Telegram</span>
              </button>
              <button
                onClick={shareWhatsApp}
                className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:border-blue-500/40 rounded-2xl flex flex-col items-center gap-2 group transition-all"
              >
                <MessageSquare className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-400">WhatsApp</span>
              </button>
              <button
                onClick={shareEmail}
                className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:border-blue-500/40 rounded-2xl flex flex-col items-center gap-2 group transition-all"
              >
                <Mail className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-400">Email</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <div className="p-8 rounded-3xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-6">
          <h3 className="text-lg font-black uppercase tracking-wider text-slate-800 dark:text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-500" /> Your Impact
          </h3>
          
          <div className="space-y-4 divide-y divide-slate-100 dark:divide-white/5">
            <div className="flex items-center justify-between pb-3">
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-slate-500">Invites Initiated</p>
                <p className="text-[10px] text-slate-400 font-medium">Clicks on your referral URL</p>
              </div>
              <span className="text-2xl font-black text-slate-800 dark:text-white">12</span>
            </div>
            
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-slate-500">Successful Registrations</p>
                <p className="text-[10px] text-slate-400 font-medium">Heartbeat configured</p>
              </div>
              <span className="text-2xl font-black text-[#2b52ff]">5</span>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-slate-500">Earned Premium Credit</p>
                <p className="text-[10px] text-slate-400 font-medium">Credited to your account</p>
              </div>
              <span className="text-base font-black text-emerald-500">5 Months</span>
            </div>
          </div>

          <div className="pt-2">
            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center gap-3">
              <Shield className="w-5 h-5 text-purple-400 shrink-0" />
              <p className="text-[10px] text-purple-600 dark:text-purple-400 font-bold leading-normal text-left">
                Your next free premium month activates on **August 1, 2026**.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
