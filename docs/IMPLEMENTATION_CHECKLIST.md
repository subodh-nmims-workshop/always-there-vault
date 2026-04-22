# Payment Implementation Checklist

To fully operationalize both Fiat and Crypto payments in production, you will need the following accounts and configurations:

## 1. Fiat (Credit/Debit Card) Requirements
- [x] **Code Implementation**: `StripeService` fully integrated with `EmailService`.
- [ ] **Stripe Business Account**: Register at [stripe.com](https://stripe.com). You must complete identity verification to receive payouts to your bank account.
- [ ] **Live API Keys**: 
    - `STRIPE_SECRET_KEY` (sk_live_...)
    - `STRIPE_PUBLIC_KEY` (pk_live_...)
- [ ] **Live Webhook Secret**: `STRIPE_WEBHOOK_SECRET` (whsec_...) from the Stripe dashboard.
- [ ] **SSL (HTTPS)**: Stripe requires an SSL certificate (standard for any production site) to send webhooks to your `/stripe/webhook` endpoint.

## 2. Crypto (Smart Contract) Requirements
- [x] **Code Implementation**: `BlockchainService` with ethers.js logic finalized.
- [ ] **Blockchain Node Provider**: Accounts on [Alchemy](https://www.alchemy.com/) or [Infura](https://www.infura.io/) for high-reliability RPC URLs.
- [ ] **Admin Wallet**: A hardware wallet or a secure hot wallet for the `ADMIN_PRIVATE_KEY`. This wallet will own the protocols and receive the fees.
- [ ] **Native Gas Tokens**: At least 0.05 - 0.1 ETH/MATIC/BNB in your deployer wallet to cover gas for contract deployment.
- [ ] **Contract Verification**: An account on [Etherscan](https://etherscan.io/) or [Polygonscan](https://polygonscan.com/) to get an API key for contract verification.

## 3. Environment Variable List (.env)
Ensure your `backend/.env` contains exactly these:
```env
# FIAT
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# CRYPTO
POLYGON_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/your-key
ADMIN_PRIVATE_KEY=0x... (Private Key)
CONTRACT_ADDRESS=0x... (Deployed Address)

# SUPPORTED STABLECOINS (Example: USDC on Polygon)
USDC_TOKEN_ADDRESS=0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174
```

## 4. Production Domain & Hosting
- [ ] **Frontend Domain**: (e.g., app.lastwishprotocol.com)
- [ ] **Backend API Domain**: (e.g., api.lastwishprotocol.com) - Used in Stripe Webhook settings.
- [ ] **Database (Managed)**: A production-ready database like Neon (Postgres) or MongoDB Atlas.

## 5. Third-Party Integrations
- [x] **Email Provider**: `EmailService` with high-premium templates ready.
- [ ] **Email SMTP details**: (or Postmark/SendGrid) update in `.env`.
- [ ] **IPFS Gateway Account**: (e.g., Pinata) to handle encrypted file storage.

---
**Status Update (2024-04-22)**: Backend logic is 100% complete. Only external account setup and mainnet deployment are pending.
