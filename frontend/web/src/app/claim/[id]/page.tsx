'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function ClaimPortalContent({ token }: { token: string }) {
  const searchParams = useSearchParams();
  const ownerAddress = searchParams?.get('owner') || '';

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-lg w-full shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-purple-500/10 blur-3xl rounded-full"></div>
        
        <div className="text-center mb-8 relative z-10">
          <div className="w-16 h-16 bg-purple-500/10 border-2 border-purple-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4 transform rotate-3">
            <span className="text-3xl">🔐</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100">Will Access Portal</h1>
          <p className="text-slate-400 text-sm mt-2">
            You have been nominated as a beneficiary.
          </p>
        </div>
        
        <div className="bg-slate-950 rounded-xl p-5 mb-8 border border-slate-800/80">
          <h3 className="text-sm font-medium text-slate-300 mb-4">Verification Required:</h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs border border-emerald-500/30">✓</div>
              <span className="text-slate-300 text-sm">Email verification (completed)</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-500 flex items-center justify-center text-xs border border-slate-700"></div>
              <span className="text-slate-400 text-sm">Identity / Wallet Verification</span>
            </div>
          </div>
        </div>
        
        <div className="bg-amber-950/30 border border-amber-900/50 rounded-lg p-4 mb-8">
          <p className="text-xs text-amber-400/80 flex items-center gap-2">
            <span>⚠️</span> This secure link will expire in 7 days. Do not share it.
          </p>
        </div>
        
        <Link 
          href={`/beneficiary/assets?claimToken=${token}${ownerAddress ? `&owner=${ownerAddress}` : ''}`}
          className="block w-full text-center py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-purple-900/20"
        >
          Verify & Access Document
        </Link>
      </div>
    </div>
  );
}

export default function ClaimPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">Loading...</div>}>
      <ClaimPortalContent token={params.id} />
    </Suspense>
  );
}
