'use client'

import { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'
import { AppProvider } from '@/contexts/AppContext'
import { SubscriptionProvider } from '@/contexts/SubscriptionContext'
import { ErrorBoundary } from '@/components/ErrorBoundary'

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
  return (
    <ErrorBoundary>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider theme={darkTheme()}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
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