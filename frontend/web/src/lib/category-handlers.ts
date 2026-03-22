/**
 * Category-Specific Handlers for Digital Will Assets
 * 800 Billion Project - Professional Implementation
 * 
 * Har category ke liye dedicated functions with smart templates
 */

import { Shield, Coins, Key, Eye, FileText, Image as ImageIcon, Building2 } from 'lucide-react'

export type AssetCategory = 
  | 'bank_account' 
  | 'self_custody_crypto' 
  | 'exchange_account' 
  | 'crypto_keys' 
  | 'business_secret' 
  | 'document' 
  | 'photo'
  | 'video'

export interface CategoryTemplate {
  id: AssetCategory
  label: string
  icon: any
  color: string
  bgColor: string
  fields: CategoryField[]
  placeholder: string
  instructions: string
  examples: string[]
}

export interface CategoryField {
  name: string
  label: string
  type: 'text' | 'textarea' | 'password' | 'number' | 'file' | 'select'
  placeholder: string
  required: boolean
  encrypted: boolean
  options?: string[]
  helpText?: string
}

/**
 * Bank / Finance Category Handler
 */
export const BANK_FINANCE_TEMPLATE: CategoryTemplate = {
  id: 'bank_account',
  label: 'Bank / Finance',
  icon: Shield,
  color: 'text-emerald-400',
  bgColor: 'bg-emerald-500/10',
  placeholder: 'e.g., HDFC Savings Account, SBI Fixed Deposit',
  instructions: 'Store your bank account details, credit cards, and financial information securely.',
  examples: [
    'Bank Account (Savings/Current)',
    'Credit/Debit Card Details',
    'Fixed Deposits & Investments',
    'Insurance Policies',
    'Loan Account Details'
  ],
  fields: [
    {
      name: 'accountName',
      label: 'Account Name',
      type: 'text',
      placeholder: 'e.g., HDFC Savings Account',
      required: true,
      encrypted: false
    },
    {
      name: 'bankName',
      label: 'Bank/Institution Name',
      type: 'text',
      placeholder: 'e.g., HDFC Bank, SBI, ICICI',
      required: true,
      encrypted: false
    },
    {
      name: 'accountNumber',
      label: 'Account Number',
      type: 'password',
      placeholder: 'Enter account number',
      required: true,
      encrypted: true,
      helpText: 'This will be encrypted and only accessible to beneficiaries'
    },
    {
      name: 'ifscCode',
      label: 'IFSC/SWIFT Code',
      type: 'text',
      placeholder: 'e.g., HDFC0001234',
      required: false,
      encrypted: false
    },
    {
      name: 'accountType',
      label: 'Account Type',
      type: 'select',
      placeholder: 'Select type',
      required: true,
      encrypted: false,
      options: ['Savings', 'Current', 'Fixed Deposit', 'Credit Card', 'Debit Card', 'Investment', 'Insurance', 'Loan']
    },
    {
      name: 'loginCredentials',
      label: 'Online Banking Credentials',
      type: 'textarea',
      placeholder: 'Username, Password, Security Questions (optional)',
      required: false,
      encrypted: true,
      helpText: 'Store login details for online/mobile banking'
    },
    {
      name: 'additionalInfo',
      label: 'Additional Information',
      type: 'textarea',
      placeholder: 'Branch address, customer ID, nominee details, etc.',
      required: false,
      encrypted: false
    }
  ]
}

/**
 * Self-Custody Crypto Wallet Handler
 */
export const CRYPTO_WALLET_TEMPLATE: CategoryTemplate = {
  id: 'self_custody_crypto',
  label: 'Crypto Wallets',
  icon: Coins,
  color: 'text-amber-400',
  bgColor: 'bg-amber-500/10',
  placeholder: 'e.g., MetaMask Wallet, Ledger Hardware Wallet',
  instructions: 'Store your self-custody crypto wallet details, seed phrases, and private keys.',
  examples: [
    'MetaMask/Trust Wallet',
    'Hardware Wallet (Ledger/Trezor)',
    'Paper Wallet',
    'Multi-sig Wallet',
    'Cold Storage Wallet'
  ],
  fields: [
    {
      name: 'walletName',
      label: 'Wallet Name',
      type: 'text',
      placeholder: 'e.g., My MetaMask Wallet',
      required: true,
      encrypted: false
    },
    {
      name: 'walletType',
      label: 'Wallet Type',
      type: 'select',
      placeholder: 'Select wallet type',
      required: true,
      encrypted: false,
      options: ['MetaMask', 'Trust Wallet', 'Ledger', 'Trezor', 'Paper Wallet', 'Multi-sig', 'Other']
    },
    {
      name: 'walletAddress',
      label: 'Public Wallet Address',
      type: 'text',
      placeholder: '0x...',
      required: false,
      encrypted: false,
      helpText: 'Public address (not encrypted)'
    },
    {
      name: 'seedPhrase',
      label: 'Seed Phrase / Recovery Phrase',
      type: 'textarea',
      placeholder: '12 or 24 word seed phrase',
      required: true,
      encrypted: true,
      helpText: '⚠️ CRITICAL: This will be encrypted with military-grade encryption'
    },
    {
      name: 'privateKey',
      label: 'Private Key (Optional)',
      type: 'password',
      placeholder: 'Private key if applicable',
      required: false,
      encrypted: true
    },
    {
      name: 'pinPassword',
      label: 'PIN/Password',
      type: 'password',
      placeholder: 'Wallet PIN or password',
      required: false,
      encrypted: true
    },
    {
      name: 'networks',
      label: 'Networks/Chains',
      type: 'text',
      placeholder: 'e.g., Ethereum, BSC, Polygon',
      required: false,
      encrypted: false
    },
    {
      name: 'estimatedValue',
      label: 'Estimated Value (USD)',
      type: 'number',
      placeholder: '0',
      required: false,
      encrypted: false
    },
    {
      name: 'additionalInfo',
      label: 'Additional Notes',
      type: 'textarea',
      placeholder: 'Token holdings, NFTs, special instructions',
      required: false,
      encrypted: false
    }
  ]
}

/**
 * Exchange Account Handler
 */
export const EXCHANGE_ACCOUNT_TEMPLATE: CategoryTemplate = {
  id: 'exchange_account',
  label: 'Exchange Accounts',
  icon: Building2,
  color: 'text-cyan-400',
  bgColor: 'bg-cyan-500/10',
  placeholder: 'e.g., Binance Account, Coinbase Pro',
  instructions: 'Store your cryptocurrency exchange account credentials and API keys.',
  examples: [
    'Binance/Coinbase Account',
    'WazirX/CoinDCX',
    'Kraken/Gemini',
    'Local Exchange Accounts'
  ],
  fields: [
    {
      name: 'exchangeName',
      label: 'Exchange Name',
      type: 'select',
      placeholder: 'Select exchange',
      required: true,
      encrypted: false,
      options: ['Binance', 'Coinbase', 'WazirX', 'CoinDCX', 'Kraken', 'Gemini', 'KuCoin', 'Other']
    },
    {
      name: 'accountEmail',
      label: 'Account Email',
      type: 'text',
      placeholder: 'your@email.com',
      required: true,
      encrypted: false
    },
    {
      name: 'password',
      label: 'Account Password',
      type: 'password',
      placeholder: 'Login password',
      required: true,
      encrypted: true
    },
    {
      name: 'twoFactorAuth',
      label: '2FA Backup Codes',
      type: 'textarea',
      placeholder: 'Backup codes for 2FA recovery',
      required: false,
      encrypted: true,
      helpText: 'Store your 2FA backup codes or recovery key'
    },
    {
      name: 'apiKey',
      label: 'API Key (Optional)',
      type: 'password',
      placeholder: 'API Key',
      required: false,
      encrypted: true
    },
    {
      name: 'apiSecret',
      label: 'API Secret (Optional)',
      type: 'password',
      placeholder: 'API Secret',
      required: false,
      encrypted: true
    },
    {
      name: 'kycDetails',
      label: 'KYC/Verification Details',
      type: 'textarea',
      placeholder: 'Document numbers, verification level',
      required: false,
      encrypted: false
    },
    {
      name: 'estimatedBalance',
      label: 'Estimated Balance (USD)',
      type: 'number',
      placeholder: '0',
      required: false,
      encrypted: false
    },
    {
      name: 'additionalInfo',
      label: 'Additional Notes',
      type: 'textarea',
      placeholder: 'Withdrawal limits, special instructions',
      required: false,
      encrypted: false
    }
  ]
}

/**
 * Raw Crypto Keys Handler
 */
export const RAW_KEYS_TEMPLATE: CategoryTemplate = {
  id: 'crypto_keys',
  label: 'Raw Keys',
  icon: Key,
  color: 'text-purple-400',
  bgColor: 'bg-purple-500/10',
  placeholder: 'e.g., Bitcoin Private Key, Ethereum Key',
  instructions: 'Store raw private keys, seed phrases, or recovery codes.',
  examples: [
    'Bitcoin Private Key',
    'Ethereum Private Key',
    'Recovery Seed Phrases',
    'Master Keys',
    'Encryption Keys'
  ],
  fields: [
    {
      name: 'keyName',
      label: 'Key Name/Label',
      type: 'text',
      placeholder: 'e.g., Bitcoin Main Wallet Key',
      required: true,
      encrypted: false
    },
    {
      name: 'keyType',
      label: 'Key Type',
      type: 'select',
      placeholder: 'Select type',
      required: true,
      encrypted: false,
      options: ['Private Key', 'Seed Phrase', 'Recovery Code', 'Master Key', 'Encryption Key', 'Other']
    },
    {
      name: 'keyValue',
      label: 'Key Value',
      type: 'textarea',
      placeholder: 'Enter the private key, seed phrase, or recovery code',
      required: true,
      encrypted: true,
      helpText: '⚠️ ULTRA SENSITIVE: Triple-encrypted with Shamir Secret Sharing'
    },
    {
      name: 'associatedAddress',
      label: 'Associated Address/Account',
      type: 'text',
      placeholder: 'Public address or account identifier',
      required: false,
      encrypted: false
    },
    {
      name: 'blockchain',
      label: 'Blockchain/Network',
      type: 'text',
      placeholder: 'e.g., Bitcoin, Ethereum, Solana',
      required: false,
      encrypted: false
    },
    {
      name: 'derivationPath',
      label: 'Derivation Path (if applicable)',
      type: 'text',
      placeholder: "e.g., m/44'/60'/0'/0",
      required: false,
      encrypted: false
    },
    {
      name: 'additionalInfo',
      label: 'Additional Security Notes',
      type: 'textarea',
      placeholder: 'Usage instructions, warnings, related accounts',
      required: false,
      encrypted: false
    }
  ]
}

/**
 * Business Secrets Handler
 */
export const BUSINESS_SECRETS_TEMPLATE: CategoryTemplate = {
  id: 'business_secret',
  label: 'Secrets',
  icon: Eye,
  color: 'text-slate-400',
  bgColor: 'bg-slate-500/10',
  placeholder: 'e.g., AWS API Keys, Database Passwords',
  instructions: 'Store business secrets, API keys, passwords, and confidential information.',
  examples: [
    'API Keys & Tokens',
    'Database Credentials',
    'Server Access Keys',
    'OAuth Secrets',
    'Encryption Keys'
  ],
  fields: [
    {
      name: 'secretName',
      label: 'Secret Name',
      type: 'text',
      placeholder: 'e.g., AWS Production API Key',
      required: true,
      encrypted: false
    },
    {
      name: 'secretType',
      label: 'Secret Type',
      type: 'select',
      placeholder: 'Select type',
      required: true,
      encrypted: false,
      options: ['API Key', 'Password', 'Token', 'Certificate', 'SSH Key', 'Database Credentials', 'OAuth Secret', 'Other']
    },
    {
      name: 'secretValue',
      label: 'Secret Value',
      type: 'textarea',
      placeholder: 'Enter the secret value',
      required: true,
      encrypted: true,
      helpText: 'Encrypted with AES-256-GCM'
    },
    {
      name: 'service',
      label: 'Service/Platform',
      type: 'text',
      placeholder: 'e.g., AWS, Google Cloud, GitHub',
      required: false,
      encrypted: false
    },
    {
      name: 'username',
      label: 'Username/Account ID',
      type: 'text',
      placeholder: 'Associated username or account',
      required: false,
      encrypted: false
    },
    {
      name: 'expiryDate',
      label: 'Expiry Date (if applicable)',
      type: 'text',
      placeholder: 'YYYY-MM-DD',
      required: false,
      encrypted: false
    },
    {
      name: 'permissions',
      label: 'Permissions/Scope',
      type: 'textarea',
      placeholder: 'What this secret can access',
      required: false,
      encrypted: false
    },
    {
      name: 'rotationInstructions',
      label: 'Rotation Instructions',
      type: 'textarea',
      placeholder: 'How to rotate/regenerate this secret',
      required: false,
      encrypted: false
    }
  ]
}

/**
 * Documents Handler
 */
export const DOCUMENTS_TEMPLATE: CategoryTemplate = {
  id: 'document',
  label: 'Documents',
  icon: FileText,
  color: 'text-blue-400',
  bgColor: 'bg-blue-500/10',
  placeholder: 'e.g., Passport, Property Papers, Will',
  instructions: 'Store important documents, certificates, and legal papers.',
  examples: [
    'Identity Documents (Passport, Aadhaar)',
    'Property Papers',
    'Legal Documents',
    'Certificates',
    'Contracts'
  ],
  fields: [
    {
      name: 'documentName',
      label: 'Document Name',
      type: 'text',
      placeholder: 'e.g., Passport Copy',
      required: true,
      encrypted: false
    },
    {
      name: 'documentType',
      label: 'Document Type',
      type: 'select',
      placeholder: 'Select type',
      required: true,
      encrypted: false,
      options: ['Identity Document', 'Property Papers', 'Legal Document', 'Certificate', 'Contract', 'Will/Testament', 'Insurance', 'Other']
    },
    {
      name: 'documentNumber',
      label: 'Document Number/ID',
      type: 'text',
      placeholder: 'e.g., Passport number, Registration number',
      required: false,
      encrypted: false
    },
    {
      name: 'issueDate',
      label: 'Issue Date',
      type: 'text',
      placeholder: 'YYYY-MM-DD',
      required: false,
      encrypted: false
    },
    {
      name: 'expiryDate',
      label: 'Expiry Date',
      type: 'text',
      placeholder: 'YYYY-MM-DD',
      required: false,
      encrypted: false
    },
    {
      name: 'issuingAuthority',
      label: 'Issuing Authority',
      type: 'text',
      placeholder: 'e.g., Government of India, Court',
      required: false,
      encrypted: false
    },
    {
      name: 'additionalInfo',
      label: 'Additional Information',
      type: 'textarea',
      placeholder: 'Location, related documents, special notes',
      required: false,
      encrypted: false
    }
  ]
}

/**
 * Photos/Media Handler
 */
export const PHOTOS_TEMPLATE: CategoryTemplate = {
  id: 'photo',
  label: 'Photos & Media',
  icon: ImageIcon,
  color: 'text-orange-400',
  bgColor: 'bg-orange-500/10',
  placeholder: 'e.g., Family Photos, Important Screenshots',
  instructions: 'Store photos, videos, and media files securely.',
  examples: [
    'Family Photos',
    'Important Screenshots',
    'Video Messages',
    'Scanned Documents',
    'Evidence Photos'
  ],
  fields: [
    {
      name: 'mediaName',
      label: 'Media Name',
      type: 'text',
      placeholder: 'e.g., Family Vacation 2024',
      required: true,
      encrypted: false
    },
    {
      name: 'mediaType',
      label: 'Media Type',
      type: 'select',
      placeholder: 'Select type',
      required: true,
      encrypted: false,
      options: ['Photo', 'Video', 'Screenshot', 'Scanned Document', 'Audio', 'Other']
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      placeholder: 'Describe the content and context',
      required: false,
      encrypted: false
    },
    {
      name: 'date',
      label: 'Date Taken/Created',
      type: 'text',
      placeholder: 'YYYY-MM-DD',
      required: false,
      encrypted: false
    },
    {
      name: 'location',
      label: 'Location',
      type: 'text',
      placeholder: 'Where was this taken/created',
      required: false,
      encrypted: false
    },
    {
      name: 'peopleInvolved',
      label: 'People Involved',
      type: 'text',
      placeholder: 'Names of people in photo/video',
      required: false,
      encrypted: false
    }
  ]
}

/**
 * Get template by category ID
 */
export function getCategoryTemplate(categoryId: AssetCategory): CategoryTemplate {
  const templates: Record<AssetCategory, CategoryTemplate> = {
    bank_account: BANK_FINANCE_TEMPLATE,
    self_custody_crypto: CRYPTO_WALLET_TEMPLATE,
    exchange_account: EXCHANGE_ACCOUNT_TEMPLATE,
    crypto_keys: RAW_KEYS_TEMPLATE,
    business_secret: BUSINESS_SECRETS_TEMPLATE,
    document: DOCUMENTS_TEMPLATE,
    photo: PHOTOS_TEMPLATE,
    video: PHOTOS_TEMPLATE // Reuse photos template for videos
  }
  
  const template = templates[categoryId]
  
  if (!template) {
    console.error('❌ Template not found for category:', categoryId)
    throw new Error(`Template not found for category: ${categoryId}`)
  }
  
  return template
}

/**
 * Generate structured data from form fields
 */
export function generateStructuredData(template: CategoryTemplate, formData: Record<string, any>): string {
  let output = `=== ${template.label.toUpperCase()} ===\n\n`
  
  template.fields.forEach(field => {
    const value = formData[field.name]
    if (value) {
      const encryptedLabel = field.encrypted ? '🔒 ' : ''
      output += `${encryptedLabel}${field.label}:\n${value}\n\n`
    }
  })
  
  output += `\n--- Generated by LASTWISH ---\n`
  output += `Timestamp: ${new Date().toISOString()}\n`
  
  return output
}

/**
 * Validate category-specific data
 */
export function validateCategoryData(template: CategoryTemplate, formData: Record<string, any>): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  
  template.fields.forEach(field => {
    if (field.required && !formData[field.name]) {
      errors.push(`${field.label} is required`)
    }
  })
  
  return {
    valid: errors.length === 0,
    errors
  }
}
