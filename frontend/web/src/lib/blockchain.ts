/**
 * Blockchain Integration - Direct Smart Contract Interaction
 * NO BACKEND NEEDED!
 */

import { ethers } from 'ethers'
import { getContractConfig } from '@/config/contracts'

declare global {
  interface Window {
    ethereum?: any;
  }
}

// Contract ABIs (simplified - add full ABI from compiled contracts)
const HEARTBEAT_ABI = [
  'function submitHeartbeat() external',
  'function configureHeartbeat(uint256 _interval, uint256 _gracePeriod) external',
  'function getUserHeartbeat(address user) external view returns (uint256 lastHeartbeat, uint256 heartbeatInterval, uint256 gracePeriod, bool isActive)',
  'function isInGracePeriod(address user) external view returns (bool)',
  'function isInactive(address user) external view returns (bool)',
  'event HeartbeatSubmitted(address indexed user, uint256 timestamp)'
]

const DIGITAL_WILL_ABI = [
  'function registerWill(uint256 _interval) external',
  'function ping() external',
  'function setNominee(address _nominee, bool _status) external',
  'function setOnChainPayload(string calldata _payload) external',
  'function checkAndTrigger(address _owner) external',
  'function isTriggered(address _owner) external view returns (bool)',
  'function claimPayload(address _owner) external returns (string memory)',
  'function registerTokenAsset(address _token,uint8 _tokenType,uint256 _amountOrId,address _beneficiary) external',
  'function executeTokenAssets(address _owner) external',
  'event HeartbeatLogged(address indexed owner, uint256 timestamp)',
  'event AlwaysThereTriggered(address indexed owner, uint256 timestamp)',
  'event TokenAssetRegistered(address indexed owner,address indexed token,address indexed beneficiary,uint8 tokenType,uint256 amountOrId,uint256 timestamp)',
  'event TokenAssetExecuted(address indexed owner,address indexed token,address indexed beneficiary,uint8 tokenType,uint256 amountOrId,uint256 timestamp)'
]

/**
 * Get Web3 Provider (MetaMask, WalletConnect, etc.)
 */
export async function getProvider() {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('No Web3 wallet found. Please install MetaMask.')
  }

  const provider = new ethers.BrowserProvider(window.ethereum)
  return provider
}

/**
 * Get Read-Only Provider (for queries without wallet)
 */
export function getReadOnlyProvider() {
  const config = getContractConfig()
  return new ethers.JsonRpcProvider(config.RPC_URL)
}

/**
 * Submit Heartbeat (Write Operation)
 */
export async function submitHeartbeat() {
  try {
    const provider = await getProvider()
    const signer = await provider.getSigner()
    const config = getContractConfig()

    const contract = new ethers.Contract(
      config.HEARTBEAT_TRACKER,
      HEARTBEAT_ABI,
      signer
    )

    const tx = await contract.submitHeartbeat()
    const receipt = await tx.wait()

    return {
      success: true,
      txHash: receipt.hash,
      blockNumber: receipt.blockNumber
    }
  } catch (error: any) {
    console.error('Failed to submit heartbeat:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Configure Heartbeat Settings (Write Operation)
 */
export async function configureHeartbeat(intervalDays: number, gracePeriodDays: number) {
  try {
    const provider = await getProvider()
    const signer = await provider.getSigner()
    const config = getContractConfig()

    const contract = new ethers.Contract(
      config.HEARTBEAT_TRACKER,
      HEARTBEAT_ABI,
      signer
    )

    // Convert days to seconds
    const intervalSeconds = intervalDays * 24 * 60 * 60
    const gracePeriodSeconds = gracePeriodDays * 24 * 60 * 60

    const tx = await contract.configureHeartbeat(intervalSeconds, gracePeriodSeconds)
    const receipt = await tx.wait()

    return {
      success: true,
      txHash: receipt.hash
    }
  } catch (error: any) {
    console.error('Failed to configure heartbeat:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Get Heartbeat Status (Read Operation - FREE)
 */
export async function getHeartbeatStatus(address: string) {
  try {
    const provider = getReadOnlyProvider()
    const config = getContractConfig()

    const contract = new ethers.Contract(
      config.HEARTBEAT_TRACKER,
      HEARTBEAT_ABI,
      provider
    )

    const heartbeat = await contract.getUserHeartbeat(address)
    const isInGrace = await contract.isInGracePeriod(address)
    const isInactive = await contract.isInactive(address)

    return {
      success: true,
      lastHeartbeat: Number(heartbeat.lastHeartbeat) * 1000, // Convert to ms
      interval: Number(heartbeat.heartbeatInterval),
      gracePeriod: Number(heartbeat.gracePeriod),
      isActive: heartbeat.isActive,
      isInGracePeriod: isInGrace,
      isInactive: isInactive
    }
  } catch (error: any) {
    console.error('Failed to get heartbeat status:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Register Digital Will (Write Operation)
 */
export async function registerWill(intervalDays: number) {
  try {
    const provider = await getProvider()
    const signer = await provider.getSigner()
    const config = getContractConfig()

    const contract = new ethers.Contract(
      config.DIGITAL_WILL,
      DIGITAL_WILL_ABI,
      signer
    )

    const intervalSeconds = intervalDays * 24 * 60 * 60
    const tx = await contract.registerWill(intervalSeconds)
    const receipt = await tx.wait()

    return {
      success: true,
      txHash: receipt.hash
    }
  } catch (error: any) {
    console.error('Failed to register will:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Add Beneficiary (Write Operation)
 */
export async function addBeneficiary(beneficiaryAddress: string) {
  try {
    const provider = await getProvider()
    const signer = await provider.getSigner()
    const config = getContractConfig()

    const contract = new ethers.Contract(
      config.DIGITAL_WILL,
      DIGITAL_WILL_ABI,
      signer
    )

    const tx = await contract.setNominee(beneficiaryAddress, true)
    const receipt = await tx.wait()

    return {
      success: true,
      txHash: receipt.hash
    }
  } catch (error: any) {
    console.error('Failed to add beneficiary:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Register an on-chain token asset (ERC20 / ERC721) to be transferred on trigger.
 */
export async function registerTokenAsset(
  tokenAddress: string,
  tokenType: 'erc20' | 'erc721',
  amountOrId: string,
  beneficiaryAddress: string
) {
  try {
    const provider = await getProvider()
    const signer = await provider.getSigner()
    const config = getContractConfig()

    const contract = new ethers.Contract(
      config.DIGITAL_WILL,
      DIGITAL_WILL_ABI,
      signer
    )

    const tokenTypeCode = tokenType === 'erc20' ? 0 : 1
    const parsedAmountOrId = ethers.toBigInt(amountOrId)

    const tx = await contract.registerTokenAsset(
      tokenAddress,
      tokenTypeCode,
      parsedAmountOrId,
      beneficiaryAddress
    )
    const receipt = await tx.wait()

    return {
      success: true,
      txHash: receipt.hash
    }
  } catch (error: any) {
    console.error('Failed to register token asset:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Store Encrypted Payload On-Chain (Write Operation)
 */
export async function storeEncryptedPayload(ipfsCID: string) {
  try {
    const provider = await getProvider()
    const signer = await provider.getSigner()
    const config = getContractConfig()

    const contract = new ethers.Contract(
      config.DIGITAL_WILL,
      DIGITAL_WILL_ABI,
      signer
    )

    const tx = await contract.setOnChainPayload(ipfsCID)
    const receipt = await tx.wait()

    return {
      success: true,
      txHash: receipt.hash
    }
  } catch (error: any) {
    console.error('Failed to store payload:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Check if Will is Triggered (Read Operation - FREE)
 */
export async function isWillTriggered(address: string) {
  try {
    const provider = getReadOnlyProvider()
    const config = getContractConfig()

    const contract = new ethers.Contract(
      config.DIGITAL_WILL,
      DIGITAL_WILL_ABI,
      provider
    )

    const triggered = await contract.isTriggered(address)

    return {
      success: true,
      isTriggered: triggered
    }
  } catch (error: any) {
    console.error('Failed to check trigger status:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Connect Wallet
 */
export async function connectWallet() {
  try {
    if (!window.ethereum) {
      throw new Error('Please install MetaMask')
    }

    const provider = await getProvider()
    const accounts = await provider.send('eth_requestAccounts', [])
    const signer = await provider.getSigner()
    const address = await signer.getAddress()

    // Check if on correct network
    const network = await provider.getNetwork()
    const currentChainId = Number(network.chainId)
    const config = getContractConfig()
    const targetChainId = config.CHAIN_ID || 1337
    
    console.log(`[Blockchain] Current Chain: ${currentChainId}, Target Chain: ${targetChainId}`)

    if (currentChainId !== targetChainId) {
      const chainIdHex = `0x${targetChainId.toString(16)}`
      try {
        console.log(`[Blockchain] Attempting to switch to ${targetChainId}...`)
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: chainIdHex }]
        })
      } catch (switchError: any) {
        console.warn(`[Blockchain] Switch failed (code: ${switchError.code}), attempting to add network:`, switchError)
        // 4902 = chain not added, -32603/-32600 = invalid request (also means not added on some wallets)
        if (switchError.code === 4902 || switchError.code === -32603 || switchError.code === -32600) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: chainIdHex,
                chainName: 'Hardhat Local',
                rpcUrls: ['http://127.0.0.1:8545'],
                nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 }
              }
            ]
          })
          // After adding, explicitly switch to it
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: chainIdHex }]
          })
        } else {
          throw switchError
        }
      }
    }

    // Re-fetch address after potential network switch
    const freshProvider = new ethers.BrowserProvider(window.ethereum)
    const freshSigner = await freshProvider.getSigner()
    const freshAddress = await freshSigner.getAddress()
    const finalNetwork = await freshProvider.getNetwork()

    return {
      success: true,
      address: freshAddress,
      chainId: Number(finalNetwork.chainId)
    }
  } catch (error: any) {
    console.error('Failed to connect wallet:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Listen to Heartbeat Events
 */
export function listenToHeartbeatEvents(callback: (event: any) => void) {
  const provider = getReadOnlyProvider()
  const config = getContractConfig()

  const contract = new ethers.Contract(
    config.HEARTBEAT_TRACKER,
    HEARTBEAT_ABI,
    provider
  )

  contract.on('HeartbeatSubmitted', (user: any, timestamp: any, event: any) => {
    callback({
      user,
      timestamp: Number(timestamp) * 1000,
      txHash: event.log.transactionHash
    })
  })

  // Return cleanup function
  return () => {
    contract.removeAllListeners('HeartbeatSubmitted')
  }
}
