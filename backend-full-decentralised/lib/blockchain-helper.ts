/**
 * Blockchain Helper Library
 * Utility functions for blockchain interactions
 */

import { ethers } from 'ethers'

/**
 * Format blockchain timestamp to Date
 */
export function formatTimestamp(timestamp: bigint | number): Date {
  const ts = typeof timestamp === 'bigint' ? Number(timestamp) : timestamp
  return new Date(ts * 1000)
}

/**
 * Convert days to seconds
 */
export function daysToSeconds(days: number): number {
  return days * 24 * 60 * 60
}

/**
 * Convert seconds to days
 */
export function secondsToDays(seconds: number): number {
  return Math.floor(seconds / (24 * 60 * 60))
}

/**
 * Format MATIC amount
 */
export function formatMatic(wei: bigint | string): string {
  return ethers.formatEther(wei)
}

/**
 * Parse MATIC amount
 */
export function parseMatic(matic: string): bigint {
  return ethers.parseEther(matic)
}

/**
 * Shorten address for display
 */
export function shortenAddress(address: string, chars = 4): string {
  if (!address) return ''
  return `${address.substring(0, chars + 2)}...${address.substring(42 - chars)}`
}

/**
 * Check if address is valid
 */
export function isValidAddress(address: string): boolean {
  try {
    ethers.getAddress(address)
    return true
  } catch {
    return false
  }
}

/**
 * Get transaction explorer URL
 */
export function getTxUrl(txHash: string, chainId: number): string {
  const explorers: Record<number, string> = {
    80001: 'https://mumbai.polygonscan.com/tx',
    137: 'https://polygonscan.com/tx'
  }
  
  const baseUrl = explorers[chainId] || explorers[80001]
  return `${baseUrl}/${txHash}`
}

/**
 * Get address explorer URL
 */
export function getAddressUrl(address: string, chainId: number): string {
  const explorers: Record<number, string> = {
    80001: 'https://mumbai.polygonscan.com/address',
    137: 'https://polygonscan.com/address'
  }
  
  const baseUrl = explorers[chainId] || explorers[80001]
  return `${baseUrl}/${address}`
}

/**
 * Wait for transaction with retries
 */
export async function waitForTransaction(
  provider: ethers.Provider,
  txHash: string,
  confirmations = 1,
  timeout = 120000
): Promise<ethers.TransactionReceipt | null> {
  const startTime = Date.now()
  
  while (Date.now() - startTime < timeout) {
    try {
      const receipt = await provider.getTransactionReceipt(txHash)
      
      if (receipt && receipt.confirmations >= confirmations) {
        return receipt
      }
      
      await new Promise(resolve => setTimeout(resolve, 2000))
    } catch (error) {
      console.error('Error waiting for transaction:', error)
      await new Promise(resolve => setTimeout(resolve, 5000))
    }
  }
  
  throw new Error('Transaction timeout')
}

/**
 * Estimate gas with buffer
 */
export async function estimateGasWithBuffer(
  contract: ethers.Contract,
  method: string,
  args: any[],
  bufferPercent = 20
): Promise<bigint> {
  const estimated = await contract[method].estimateGas(...args)
  const buffer = (estimated * BigInt(bufferPercent)) / BigInt(100)
  return estimated + buffer
}

/**
 * Get current gas price
 */
export async function getCurrentGasPrice(provider: ethers.Provider): Promise<bigint> {
  const feeData = await provider.getFeeData()
  return feeData.gasPrice || BigInt(0)
}

/**
 * Calculate transaction cost
 */
export async function calculateTxCost(
  provider: ethers.Provider,
  gasLimit: bigint
): Promise<string> {
  const gasPrice = await getCurrentGasPrice(provider)
  const cost = gasLimit * gasPrice
  return formatMatic(cost)
}

/**
 * Check if wallet has enough balance
 */
export async function hasEnoughBalance(
  provider: ethers.Provider,
  address: string,
  requiredAmount: bigint
): Promise<boolean> {
  const balance = await provider.getBalance(address)
  return balance >= requiredAmount
}

/**
 * Get network name from chain ID
 */
export function getNetworkName(chainId: number): string {
  const networks: Record<number, string> = {
    1: 'Ethereum Mainnet',
    137: 'Polygon Mainnet',
    80001: 'Mumbai Testnet',
    31337: 'Hardhat Local'
  }
  
  return networks[chainId] || 'Unknown Network'
}

/**
 * Parse contract error
 */
export function parseContractError(error: any): string {
  if (error.reason) return error.reason
  if (error.message) {
    // Extract revert reason
    const match = error.message.match(/reason="([^"]+)"/)
    if (match) return match[1]
    
    // Extract error message
    const errorMatch = error.message.match(/Error: (.+)/)
    if (errorMatch) return errorMatch[1]
    
    return error.message
  }
  
  return 'Unknown error occurred'
}

/**
 * Retry function with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 1000
): Promise<T> {
  let lastError: any
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error
      
      if (i < maxRetries - 1) {
        const delay = baseDelay * Math.pow(2, i)
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
  }
  
  throw lastError
}
