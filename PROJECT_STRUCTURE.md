# Decentralized Digital Will / Dead-Man Protocol - Project Structure

## Overview
This project implements a trustless, automated, encrypted access-release system for digital assets.

## Core Principles
- Client-side encryption only
- Asset-level isolation
- Blockchain = logic, not storage
- Zero trust backend
- Fail-safe & compartmentalized

## Project Structure

```
/
├── frontend/                    # Frontend applications
│   ├── web/                    # React + Next.js web app
│   └── mobile/                 # React Native mobile app
├── backend/                    # Backend services (zero-trust)
│   ├── api/                   # NestJS API gateway
│   ├── services/              # Microservices
│   └── workers/               # Background workers
├── blockchain/                 # Smart contracts & blockchain
│   ├── contracts/             # Solidity contracts
│   ├── scripts/               # Deployment scripts
│   └── tests/                 # Contract tests
├── core/                      # Shared core libraries
│   ├── crypto/                # Encryption & key management
│   ├── types/                 # Shared TypeScript types
│   ├── utils/                 # Utility functions
│   └── validation/            # Data validation
├── storage/                   # Decentralized storage
│   ├── ipfs/                  # IPFS integration
│   ├── arweave/               # Arweave integration
│   └── interfaces/            # Storage abstractions
├── docs/                      # Documentation
├── scripts/                   # Build & deployment scripts
└── tests/                     # Integration tests
```

## Technology Stack

### Frontend
- **Web**: React + Next.js + TypeScript + TailwindCSS
- **Mobile**: React Native + Secure Enclave/Keystore
- **Wallet**: WalletConnect + MetaMask

### Backend (Zero Trust)
- **API**: Node.js + NestJS
- **Database**: PostgreSQL (metadata only)
- **Cache**: Redis
- **Crypto**: Optional Rust microservice

### Blockchain
- **Primary**: Polygon (MVP) → Ethereum (production)
- **Contracts**: Solidity
- **Multi-sig**: Gnosis Safe

### Storage
- **Primary**: IPFS
- **Backup**: Arweave
- **Large Data**: Filecoin

### Security
- **Encryption**: AES-256-GCM
- **Key Management**: Shamir Secret Sharing
- **Authentication**: SIWE (Sign-In With Ethereum)