'use client'

import { ReactNode, useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import { AppProvider } from '@/contexts/AppContext'
import { SubscriptionProvider } from '@/contexts/SubscriptionContext'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { setupFetchInterceptor } from '@/lib/fetch-interceptor'

// RainbowKit & Wagmi
import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from '@/config/wagmi'

const queryClient = new QueryClient()

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  useEffect(() => {
    // Setup global fetch interceptor for JWT expiry and rate limiting
    setupFetchInterceptor()

    // Increase MaxListeners to prevent MetaMask/extensions memory leak warnings
    try {
      const EventEmitter = require('events').EventEmitter;
      if (EventEmitter) {
        EventEmitter.defaultMaxListeners = 25;
      }
    } catch (e) {
      // Ignore if events module is not polyfilled
    }

    if (typeof window !== 'undefined' && (window as any).ethereum) {
      try {
        const provider = (window as any).ethereum;
        if (typeof provider.setMaxListeners === 'function') {
          provider.setMaxListeners(25);
        }
      } catch (e) {
        // Ignore
      }
    }
  }, []);

  return (
    <ErrorBoundary>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider theme={darkTheme()}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem={true}
              disableTransitionOnChange
            >
              <SubscriptionProvider>
                <AppProvider>
                  {children}
                </AppProvider>
              </SubscriptionProvider>
            </ThemeProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ErrorBoundary>
  )
}