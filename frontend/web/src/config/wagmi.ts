import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base, hardhat, localhost } from 'wagmi/chains';

// Get configuration from environment
const chainId = process.env.NEXT_PUBLIC_CHAIN_ID ? parseInt(process.env.NEXT_PUBLIC_CHAIN_ID) : 1337;

export const config = getDefaultConfig({
  appName: 'Decentralized Digital Will Protocol',
  projectId: 'c40b8a3e790f9e1564f269df12345678', // Default public project ID for testing
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    ...(chainId === 1337 || chainId === 31337 ? [hardhat, localhost] : []),
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [hardhat.id]: http('http://127.0.0.1:8545'),
    [localhost.id]: http('http://127.0.0.1:8545'),
  },
  ssr: true, // If your dApp uses server side rendering (SSR)
});
