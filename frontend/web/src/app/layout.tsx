import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from 'sonner'
import Script from 'next/script'


export const metadata: Metadata = {
  title: 'Decentralized Digital Will Protocol',
  description: 'A decentralized, non-custodial system that encrypts your digital life and automatically releases only what you choose, only to whom you choose, only when you are no longer active.',
  keywords: ['blockchain', 'digital will', 'inheritance', 'crypto', 'decentralized'],
  authors: [{ name: 'Digital Will Protocol Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <Script id="extension-error-handler" strategy="beforeInteractive">
          {`
            // Suppress browser extension errors
            if (typeof chrome !== 'undefined' && chrome.runtime) {
              const originalSendMessage = chrome.runtime.sendMessage;
              chrome.runtime.sendMessage = function(...args) {
                try {
                  if (args.length === 0 || typeof args[0] !== 'string') {
                    console.warn('Browser extension attempted invalid sendMessage call');
                    return Promise.resolve();
                  }
                  return originalSendMessage.apply(this, args);
                } catch (e) {
                  console.warn('Browser extension error suppressed:', e);
                  return Promise.resolve();
                }
              };
            }
          `}
        </Script>
      </head>
      <body className="font-sans bg-slate-950 text-slate-50">
        <Providers>
          <div className="min-h-screen bg-slate-950 dark:bg-slate-950">
            {children}
          </div>
          <Toaster 
            richColors 
            position="top-right" 
            theme="dark"
            toastOptions={{
              style: {
                background: 'rgba(15, 23, 42, 0.8)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(30, 58, 95, 0.3)',
                color: '#f1f5f9',
                borderRadius: '16px',
                fontSize: '14px',
                fontWeight: '600'
              }
            }}
          />
        </Providers>
      </body>
    </html>
  )
}