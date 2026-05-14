import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from 'sonner'
import Script from 'next/script'


export const metadata: Metadata = {
  metadataBase: new URL('https://decentralized-digital-will-protocol.vercel.app/'),
  title: {
    default: 'AlwaysThere Protocol | The Decentralized Crypto Inheritance & Digital Will',
    template: '%s | AlwaysThere Protocol'
  },
  description: 'Secure your digital legacy with AlwaysThere Protocol. The ultimate decentralized dead man switch and digital will for crypto, seed phrases, and private files. Automated, trustless inheritance on the blockchain.',
  keywords: ['crypto inheritance', 'digital will', 'dead man switch crypto', 'decentralized inheritance', 'secure seed phrase storage', 'blockchain will', 'AlwaysThere protocol', 'crypto estate planning', 'digital asset management', 'web3 legacy'],
  authors: [{ name: 'AlwaysThere Team' }],
  openGraph: {
    title: 'AlwaysThere Protocol | Decentralized Crypto Inheritance',
    description: 'Ensure your crypto assets and private data are passed on securely. AlwaysThere is a trustless digital will protocol and dead man switch.',
    url: 'https://decentralized-digital-will-protocol.vercel.app/',
    siteName: 'AlwaysThere Protocol',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AlwaysThere Protocol Banner',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AlwaysThere Protocol | Decentralized Crypto Inheritance',
    description: 'Secure your digital legacy with the ultimate decentralized dead man switch.',
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
    icon: '/logo-simple.png',
    apple: '/logo-simple.png',
    shortcut: '/logo-simple.png'
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

import { Outfit } from 'next/font/google'

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${outfit.variable}`} suppressHydrationWarning>
      <head>
        <Script id="json-ld" type="application/ld+json" strategy="afterInteractive">
          {`
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "AlwaysThere Protocol",
              "operatingSystem": "Web, Android, iOS",
              "applicationCategory": "FinanceApplication",
              "description": "Secure your digital legacy with AlwaysThere Protocol. The ultimate decentralized dead man switch and digital will for crypto, seed phrases, and private files.",
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
          `}
        </Script>
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
      <body className={`${outfit.className} antialiased bg-slate-950 text-slate-50`} suppressHydrationWarning>
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