import { Suspense } from 'react';
import Link from 'next/link';

function HeartbeatSuccessContent() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full"></div>
        
        <div className="w-20 h-20 bg-blue-500/10 border-2 border-blue-500/30 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
          <span className="text-4xl">🛡️</span>
        </div>
        
        <h1 className="text-2xl font-bold text-slate-100 mb-2">Heartbeat Verified!</h1>
        <p className="text-slate-400 mb-6">
          Your proof-of-life heartbeat has been securely recorded.
        </p>
        
        <div className="bg-slate-950 rounded-xl p-4 mb-8 border border-slate-800">
          <p className="text-sm text-slate-300">
            Your will execution has been postponed. The countdown has been reset.
          </p>
        </div>
        
        <Link 
          href="/dashboard"
          className="block w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-900/20"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default function HeartbeatSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">Loading...</div>}>
      <HeartbeatSuccessContent />
    </Suspense>
  );
}
