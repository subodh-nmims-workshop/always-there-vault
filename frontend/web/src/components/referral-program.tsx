'use client';

import React, { useState } from 'react';
import { Share2, Copy, Check, Twitter, Send, MessageSquare, Mail, Award, Users, Gift, Shield, Zap, Clock, Star, ChevronDown, ChevronUp, Lock, Infinity, HeartHandshake } from 'lucide-react';
import { toast } from 'sonner';

interface ReferralProgramProps {
  userAddress?: string;
}

const STEPS = [
  {
    num: '01',
    title: 'Copy Your Unique Link',
    desc: 'Every wallet gets a unique referral URL tied to your address. Copy it from the hub below.',
    icon: Copy,
  },
  {
    num: '02',
    title: 'Share with Friends & Family',
    desc: 'Send the link via WhatsApp, Twitter, Telegram, or email. Anyone can join — no crypto knowledge needed.',
    icon: Share2,
  },
  {
    num: '03',
    title: 'They Sign Up & Configure Vault',
    desc: 'Your friend connects their wallet and sets up at least one heartbeat monitor on AlwaysThere.',
    icon: HeartHandshake,
  },
  {
    num: '04',
    title: 'Both of You Get Rewarded',
    desc: 'Once they complete setup, you both automatically receive 1 Month of Premium — no manual claim needed.',
    icon: Gift,
  },
];

const BENEFITS = [
  {
    icon: Infinity,
    label: 'Unlimited Asset Uploads',
    desc: 'Remove all storage caps. Upload as many files, keys, and documents as you need.',
    tag: 'Premium',
    tagColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  },
  {
    icon: Users,
    label: 'Up to 10 Beneficiaries',
    desc: 'Free plan allows 2. Premium expands your nominee list to 10 people.',
    tag: 'Premium',
    tagColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  },
  {
    icon: Zap,
    label: 'Priority Heartbeat Alerts',
    desc: 'Get instant email + SMS alerts when your heartbeat is missed — no delays.',
    tag: 'Premium',
    tagColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  },
  {
    icon: Clock,
    label: 'Custom Trigger Intervals',
    desc: 'Set heartbeat intervals from 1 day to 365 days. Free plan is locked to 30 days.',
    tag: 'Premium',
    tagColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  },
  {
    icon: Shield,
    label: 'Encrypted Time Capsules',
    desc: 'Schedule encrypted messages to be delivered to beneficiaries at a future date.',
    tag: 'Premium',
    tagColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  },
  {
    icon: Star,
    label: 'Priority Support',
    desc: 'Skip the queue. Get direct email support with <4 hour response time.',
    tag: 'Premium',
    tagColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  },
];

const FAQS = [
  {
    q: 'When do I receive my free premium month?',
    a: 'Your reward is credited automatically within 24 hours after your referred friend completes vault setup (connects wallet + configures heartbeat). No manual action needed.',
  },
  {
    q: 'Is there a limit on how many people I can refer?',
    a: 'No limit. Refer 10 friends → get 10 free months. Refer 50 → get 50 months. Credits stack and extend your subscription.',
  },
  {
    q: 'Does my friend also get a free month?',
    a: 'Yes. The referral is mutual. When your friend signs up through your link and finishes setup, they also receive 1 free month of premium — in addition to any trial they already have.',
  },
  {
    q: 'What counts as "completing setup"?',
    a: 'Your friend must: (1) Connect a Web3 wallet, (2) Upload at least one asset, and (3) Configure and sign their first heartbeat. All three steps must be complete for the reward to trigger.',
  },
  {
    q: 'Do credits expire?',
    a: 'No. Premium credits earned through referrals never expire. They are applied sequentially after your current plan ends.',
  },
];

export function ReferralProgram({ userAddress = '0x0000000000000000000000000000000000000000' }: ReferralProgramProps) {
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const referralLink = typeof window !== 'undefined'
    ? `${window.location.origin}/join?ref=${userAddress.substring(0, 10)}`
    : `https://alwaystherevault.com/join?ref=${userAddress.substring(0, 10)}`;

  const shareText = `I just secured my digital estate using AlwaysThere Vault — the decentralized digital will protocol. Sign up with my link and we both get 1 Month of Premium free: ${referralLink} #Web3 #Crypto #Inheritance`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast.success('Referral link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy link.');
    }
  };

  return (
    <div className="space-y-10">

      {/* ── HERO ── */}
      <div className="relative rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-8 overflow-hidden">
        <div className="absolute -right-20 -top-20 size-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest">
              <Gift className="w-3.5 h-3.5" /> Referral Program — Live
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Invite Friends.<br />
              <span className="text-blue-600 dark:text-blue-400">Both Get Premium Free.</span>
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Share your unique link. When a friend signs up and completes vault setup, <strong className="text-slate-800 dark:text-white">you both get 1 free month of Premium</strong> — automatically, no claiming required.
            </p>
            <div className="flex items-center gap-4 pt-1">
              <div className="text-center">
                <p className="text-2xl font-black text-slate-900 dark:text-white">∞</p>
                <p className="text-[10px] text-slate-500 uppercase font-bold">No Limit</p>
              </div>
              <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
              <div className="text-center">
                <p className="text-2xl font-black text-blue-600 dark:text-blue-400">1 Mo</p>
                <p className="text-[10px] text-slate-500 uppercase font-bold">Per Referral</p>
              </div>
              <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
              <div className="text-center">
                <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">2x</p>
                <p className="text-[10px] text-slate-500 uppercase font-bold">Mutual Reward</p>
              </div>
            </div>
          </div>
          <div className="w-20 h-20 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20 shrink-0">
            <Award className="w-10 h-10 text-blue-500" />
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div>
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-5 px-1">How It Works</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((step) => (
            <div key={step.num} className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-slate-400 dark:text-slate-600 font-mono">{step.num}</span>
                <div className="size-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <step.icon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{step.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── REFERRAL LINK + STATS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Share Card */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-6">
          <h3 className="text-sm font-black uppercase tracking-wider text-slate-800 dark:text-white flex items-center gap-2">
            <Share2 className="w-4 h-4 text-slate-500" /> Your Referral Hub
          </h3>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
              Your Unique Link
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-grow bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-600 dark:text-slate-400 font-mono text-xs select-all truncate flex items-center">
                {referralLink}
              </div>
              <button
                onClick={copyToClipboard}
                className="px-5 py-3 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs uppercase tracking-widest rounded-xl transition-all shrink-0 flex items-center justify-center gap-2"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
              Share Directly
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Twitter / X', icon: Twitter, color: 'text-sky-500', fn: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank') },
                { label: 'Telegram', icon: Send, color: 'text-blue-500', fn: () => window.open(`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(shareText)}`, '_blank') },
                { label: 'WhatsApp', icon: MessageSquare, color: 'text-emerald-500', fn: () => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank') },
                { label: 'Email', icon: Mail, color: 'text-purple-500', fn: () => window.open(`mailto:?subject=${encodeURIComponent('Secure Your Digital Estate')}&body=${encodeURIComponent(shareText)}`, '_blank') },
              ].map(({ label, icon: Icon, color, fn }) => (
                <button key={label} onClick={fn} className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-2xl flex flex-col items-center gap-2 group transition-all">
                  <Icon className={`w-5 h-5 ${color} group-hover:scale-110 transition-transform`} />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Card — clearly marked as demo */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-5 flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-800 dark:text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-slate-500" /> Your Impact
            </h3>
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded">Preview</span>
          </div>

          <div className="space-y-4 divide-y divide-slate-100 dark:divide-slate-800 flex-1">
            <div className="flex items-center justify-between pb-3">
              <div>
                <p className="text-xs font-bold text-slate-600 dark:text-slate-300">Invites Sent</p>
                <p className="text-[10px] text-slate-400">Clicks on your referral URL</p>
              </div>
              <span className="text-2xl font-black text-slate-800 dark:text-white">—</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-xs font-bold text-slate-600 dark:text-slate-300">Completed Signups</p>
                <p className="text-[10px] text-slate-400">Heartbeat configured</p>
              </div>
              <span className="text-2xl font-black text-slate-800 dark:text-white">—</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-xs font-bold text-slate-600 dark:text-slate-300">Premium Months Earned</p>
                <p className="text-[10px] text-slate-400">Credited to your account</p>
              </div>
              <span className="text-base font-black text-emerald-500">— Mo</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <p className="text-[10px] text-slate-500 leading-relaxed">
              📊 Live referral tracking is coming soon. Your credits will be applied automatically once the system goes fully live.
            </p>
          </div>
        </div>
      </div>

      {/* ── WHAT YOU GET (PREMIUM BENEFITS) ── */}
      <div>
        <div className="flex items-center justify-between mb-5 px-1">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">What Premium Unlocks</h3>
          <span className="text-[10px] text-slate-400 font-medium">Earned per successful referral</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BENEFITS.map((b) => (
            <div key={b.label} className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex gap-4 items-start">
              <div className="size-9 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
                <b.icon className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{b.label}</h4>
                  <span className={`text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded border ${b.tagColor}`}>{b.tag}</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FAQ ── */}
      <div>
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-5 px-1">Frequently Asked Questions</h3>
        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
              >
                <span className="text-sm font-bold text-slate-900 dark:text-white pr-4">{faq.q}</span>
                {openFaq === i
                  ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                  : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── TERMS NOTE ── */}
      <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800">
        <Lock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Referral rewards are subject to abuse detection. Self-referrals, duplicate wallets, and bot signups are automatically rejected. Premium credits are non-transferable and cannot be converted to cash. AlwaysThere reserves the right to modify reward terms with 14 days notice.
        </p>
      </div>

    </div>
  );
}
