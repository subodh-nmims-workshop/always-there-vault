import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from 'sonner'
import Script from 'next/script'
import { GoogleTagManager } from '../components/GoogleTagManager'
import { headers } from 'next/headers'


export const metadata: Metadata = {
  metadataBase: new URL('https://alwaystherevault.com/'),
  title: {
    default: "AlwaysThere — Even when you're not",
    template: "%s | AlwaysThere"
  },
  description: "AlwaysThere — Even when you're not. Secure your digital legacy with the ultimate decentralized dead man switch and digital will for crypto, seed phrases, and private files. Automated, trustless inheritance on the blockchain.",
  keywords: ['crypto inheritance', 'digital will', 'dead man switch crypto', 'decentralized inheritance', 'secure seed phrase storage', 'blockchain will', 'AlwaysThere Vault', 'crypto estate planning', 'digital asset management', 'web3 legacy'],
  authors: [{ name: 'AlwaysThere Team' }],
  openGraph: {
    title: "AlwaysThere — Even when you're not",
    description: "Ensure your crypto assets and private data are passed on securely. AlwaysThere is a trustless digital will and dead man switch.",
    url: 'https://alwaystherevault.com/',
    siteName: 'AlwaysThere',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AlwaysThere Banner',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "AlwaysThere — Even when you're not",
    description: "Secure your digital legacy with the ultimate decentralized dead man switch.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo-simple.png?v=2',
    apple: '/logo-simple.png?v=2',
    shortcut: '/logo-simple.png?v=2'
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const nonce = headers().get('x-nonce') || undefined

  return (
    <html lang="en" className="font-outfit font-plus-jakarta" suppressHydrationWarning>
      <head>
        <meta name="csp-nonce" content={nonce} />
        <script id="json-ld" type="application/ld+json" nonce={nonce} dangerouslySetInnerHTML={{ __html: `
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "AlwaysThere Vault",
              "operatingSystem": "Web, Android, iOS",
              "applicationCategory": "FinanceApplication",
              "description": "Secure your digital legacy with AlwaysThere Vault. The ultimate decentralized dead man switch and digital will for crypto, seed phrases, and private files.",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5.0",
                "ratingCount": "1250"
              }
            }
          ` }} />
        <script id="extension-error-handler" nonce={nonce} dangerouslySetInnerHTML={{ __html: `
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
          ` }} />
      </head>
      <body className="font-outfit antialiased bg-background text-foreground transition-colors duration-300" suppressHydrationWarning>
        <GoogleTagManager nonce={nonce} />
        <Providers>
          <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            {children}
          </div>
          <Toaster 
            richColors 
            position="top-right" 
            theme="dark"
            toastOptions={{
              style: {
                background: 'rgba(8, 10, 20, 0.85)',
                backdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: '#f8fafc',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '500',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
                padding: '16px 20px',
                fontFamily: 'var(--font-outfit), sans-serif',
              },
              classNames: {
                toast: 'group !bg-slate-950/85 !border-white/10 !backdrop-blur-xl !rounded-2xl !p-5 !shadow-2xl',
                title: '!text-slate-100 !font-bold !text-[15px] !tracking-tight !font-outfit',
                description: '!text-slate-400 !text-xs !leading-relaxed !mt-1.5 !font-outfit',
                actionButton: '!bg-gradient-to-r !from-blue-600 !to-cyan-600 hover:!from-blue-500 hover:!to-cyan-500 !text-white !font-bold !rounded-xl !px-4 !py-2 !transition-all !duration-200 !shadow-lg !shadow-blue-500/25 !border-0 !cursor-pointer !font-outfit hover:!scale-105 active:!scale-95',
                cancelButton: '!bg-slate-800 hover:!bg-slate-700 !text-slate-300 !font-semibold !rounded-xl !px-4 !py-2 !transition-all !duration-200 !font-outfit',
                closeButton: '!bg-slate-900/80 hover:!bg-slate-800 !text-slate-400 hover:!text-slate-200 !transition-colors',
                success: '!border-emerald-500/30 !bg-gradient-to-r !from-emerald-950/20 !to-slate-950/20',
                error: '!border-rose-500/30 !bg-gradient-to-r !from-rose-950/20 !to-slate-950/20',
                warning: '!border-amber-500/30 !bg-gradient-to-r !from-amber-950/20 !to-slate-950/20',
                info: '!border-blue-500/30 !bg-gradient-to-r !from-blue-950/20 !to-slate-950/20',
              }
            }}
          />
        </Providers>
      </body>
    </html>
  )
}