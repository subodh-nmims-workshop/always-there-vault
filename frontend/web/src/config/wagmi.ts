import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base, hardhat, localhost } from 'wagmi/chains';

// Get configuration from environment
const chainId = process.env.NEXT_PUBLIC_CHAIN_ID ? parseInt(process.env.NEXT_PUBLIC_CHAIN_ID) : 1337;

// Order chains so that the active chain (from NEXT_PUBLIC_CHAIN_ID) is first.
// This prevents RainbowKit / Wagmi from defaulting to Ethereum Mainnet and querying eth.merkle.io on start.
const getChains = () => {
  if (chainId === 1337 || chainId === 31337) {
    return [hardhat, localhost, polygon, mainnet];
  }
  return [polygon, mainnet];
};

export const config = getDefaultConfig({
  appName: 'AlwaysThere Protocol',
  appDescription: 'The Decentralized Digital Will & Crypto Inheritance Protocol',
  appUrl: typeof window !== 'undefined'
    ? window.location.origin
    : (process.env.NODE_ENV === 'production'
        ? 'https://alwaystherevault.com'
        : 'https://decentralized-digital-will-protocol.vercel.app/'),
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'e7875350328349fa6042b28db34e698e',
  chains: getChains() as any,
  transports: {
    [mainnet.id]: http('https://cloudflare-eth.com'), // Use cloudflare public RPC for mainnet to avoid CORS issues
    [polygon.id]: http(process.env.NEXT_PUBLIC_RPC_URL || 'https://polygon-rpc.com'),
    [hardhat.id]: http('http://127.0.0.1:8545'),
    [localhost.id]: http('http://127.0.0.1:8545'),
  },
  ssr: true, // If your dApp uses server side rendering (SSR)
});
