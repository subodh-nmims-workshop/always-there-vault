import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={`${inter.className} bg-slate-950 text-slate-50`}>
        <Providers>
          <div className="min-h-screen bg-slate-950 dark:bg-slate-950">
            {children}
          </div>
          <Toaster richColors position="top-right" />
        </Providers>
      </body>
    </html>
  )
}