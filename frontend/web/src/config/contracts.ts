// Smart Contract Configuration
export const CONTRACTS = {
  // Mumbai Testnet or Local Hardhat
  HEARTBEAT_TRACKER: process.env.NEXT_PUBLIC_HEARTBEAT_CONTRACT || '',
  DIGITAL_WILL: process.env.NEXT_PUBLIC_DIGITAL_WILL_CONTRACT || '',
  ASSET_MANAGER: process.env.NEXT_PUBLIC_ASSET_MANAGER_CONTRACT || '',

  // Network Config (Dynamic from .env.local)
  NETWORK: process.env.NEXT_PUBLIC_NETWORK || 'mumbai',
  CHAIN_ID: Number(process.env.NEXT_PUBLIC_CHAIN_ID || 80001),
  RPC_URL: process.env.NEXT_PUBLIC_RPC_URL || 'https://rpc-mumbai.maticvigil.com',

  // Block Explorer
  EXPLORER: 'https://mumbai.polygonscan.com'
}

// For Production (Mainnet)
export const MAINNET_CONTRACTS = {
  HEARTBEAT_TRACKER: '',
  DIGITAL_WILL: '',
  NETWORK: 'polygon',
  CHAIN_ID: 137,
  RPC_URL: 'https://polygon-rpc.com',
  EXPLORER: 'https://polygonscan.com'
}

// Get current config based on environment
export function getContractConfig() {
  const isProduction = process.env.NEXT_PUBLIC_NETWORK === 'mainnet'
  return isProduction ? MAINNET_CONTRACTS : CONTRACTS
}
