# Decentralized Digital Will / Dead-Man Protocol

## 🎯 One-Line Definition
A decentralized, non-custodial system that encrypts your digital life and automatically releases only what you choose, only to whom you choose, only when you are no longer active.

## 🏗️ Architecture Overview

```
User (Web/Mobile)
    ↓ Client-Side Encryption
    ↓ Decentralized Storage (IPFS / Arweave)
    ↓ Smart Contract (Rules + Time)
    ↓ Key Release Engine (SSS + Multi-Sig)
    ↓ Beneficiaries
```

## 🔑 Core Principles

1. **Client-side encryption only** – server never sees raw data
2. **Asset-level isolation** – every file/audio/key has its own rules
3. **Blockchain = logic, not storage** – smart contracts handle automation
4. **Zero trust backend** – backend can't decrypt anything
5. **Fail-safe & compartmentalized** – military-grade thinking

## 📁 Project Structure

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

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Redis 6+
- MetaMask or compatible wallet

### Installation

1. **Clone and install dependencies**
```bash
git clone <repository>
cd decentralized-digital-will-protocol
npm install
```

2. **Set up environment**
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Start development servers**
```bash
# Backend API
cd backend/api
npm run dev

# Frontend Web App
cd frontend/web
npm run dev

# Blockchain (local)
cd blockchain
npx hardhat node
```

## 🔐 Security Model

### What We Protect Against
- ✅ Server breach
- ✅ Insider attack
- ✅ Cloud shutdown
- ✅ Legal freeze
- ✅ Single point of failure

### What We Don't Protect Against
- ❌ User giving keys willingly
- ❌ Physical coercion (advanced add-ons needed)

## 📊 Data Flow

### Asset Creation
```
1. User selects file/audio/letter
2. Frontend encrypts data (AES-256-GCM)
3. Upload encrypted blob to IPFS
4. Receive CID (Content Identifier)
5. CID + rules saved on blockchain
6. Key split using Shamir Secret Sharing (5 shares, 3 required)
7. Shares distributed to: Smart Contract, User Device, Trusted Contact, DAO Oracle, Hardware Wallet
```

### Asset Release
```
1. Trigger fires (missed heartbeat)
2. Contract validates inactivity
3. Required key shares combine (3 of 5)
4. Beneficiary decrypts asset
```

## 🎛️ Supported Asset Types

- **Crypto Keys** - Private keys, seed phrases, hardware wallet recovery
- **Audio Messages** - Voice messages, spoken instructions
- **Photos & Videos** - Family photos, important documents, evidence
- **Letters & Notes** - Written messages, instructions, personal notes
- **Documents** - Legal documents, contracts, certificates
- **Business Secrets** - API keys, business plans, trade secrets
- **Intelligence Data** - Whistleblower evidence, sensitive information
- **Military Evidence** - Classified documents, evidence files

## 💓 Heartbeat System

### Methods
- **Wallet Signature** - EIP-712 signed message
- **App Login** - Mobile/web app authentication
- **Biometric** - Fingerprint/Face ID verification
- **Hardware Wallet** - Hardware device confirmation

### Logic
- Each heartbeat resets timer
- Missed heartbeats start grace period
- After grace period: system triggers
- Assets released according to individual rules

## 👥 Beneficiary Rules (Granular Control)

| Asset | Beneficiary | When |
|-------|-------------|------|
| Audio | Person A | Immediate |
| Photos | Family | +7 days |
| Docs | Brother | +30 days |
| Business | Partner | +14 days |

**No asset leakage. No mixing.**

## 🔧 Technology Stack

### Frontend
- **Web**: React + Next.js + TypeScript + TailwindCSS
- **Mobile**: React Native + Secure Enclave/Keystore
- **Wallet**: WalletConnect + MetaMask + RainbowKit

### Backend (Zero Trust)
- **API**: Node.js + NestJS + TypeScript
- **Database**: PostgreSQL (metadata only)
- **Cache**: Redis
- **Queues**: Bull/BullMQ

### Blockchain
- **Primary**: Polygon (MVP) → Ethereum (production)
- **Contracts**: Solidity + OpenZeppelin
- **Multi-sig**: Gnosis Safe

### Storage
- **Primary**: IPFS (fast, distributed)
- **Backup**: Arweave (permanent)
- **Large Data**: Filecoin (cost-effective)

### Security
- **Encryption**: AES-256-GCM + ECC
- **Key Management**: Shamir Secret Sharing (5 shares, 3 threshold)
- **Authentication**: SIWE (Sign-In With Ethereum)

## 🌐 Decentralization

| Component | Decentralization |
|-----------|------------------|
| Rules | Smart contracts |
| Storage | IPFS / Arweave |
| Keys | Split, no single owner |
| Execution | Automated |
| Backend | Optional |

**No single party can:**
- Stop execution
- Read data
- Modify rules

## 🚦 Development Roadmap

### MVP (Phase 1)
- [x] Core encryption system
- [x] Shamir Secret Sharing
- [x] Basic smart contracts
- [ ] Web frontend
- [ ] IPFS integration
- [ ] Time-based triggers

### Production (Phase 2)
- [ ] Mobile app
- [ ] DAO oracles
- [ ] Legal attachments
- [ ] Advanced notifications
- [ ] Multi-chain support

### Advanced (Phase 3)
- [ ] Zero-knowledge proofs
- [ ] Military/journalist safe mode
- [ ] Hardware security modules
- [ ] Quantum-resistant encryption

## 📚 Documentation

- [API Documentation](./api/README.md)
- [Smart Contract Documentation](./blockchain/README.md)
- [Frontend Documentation](./frontend/README.md)
- [Security Audit](./security/AUDIT.md)
- [Deployment Guide](./deployment/README.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This is experimental software. Use at your own risk. Always test with small amounts first.

---

**This is not just a product. This is digital inheritance infrastructure for the internet age.**