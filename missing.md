# Missing Features - Last Wish Protocol

Comparison of architecture diagrams vs actual implementation.

---

## 1. Database Layer

### Redis / Cache + Sessions — MISSING
- Diagrams show Redis as a core data layer component (Cache + Sessions)
- `backend/services/cache/` folder exists but zero Redis code found anywhere
- No `ioredis`, `redis`, or `@nestjs/cache-manager` in dependencies
- Sessions are not Redis-backed; cache service is likely a stub

### PostgreSQL Primary + Replica — MISSING
- Architecture diagram shows "PostgreSQL 15 Primary + Replica"
- Only a single PostgreSQL instance is configured
- No read replica, no replication config anywhere

---

## 2. Infrastructure Layer

### n8n Automation — MISSING
- Diagrams explicitly show n8n as an "Event Trigger" / "Proposed Trigger" for automated notifications
- No n8n container in `docker-compose.yml`
- No n8n workflow files anywhere in the project
- Currently replaced by a basic daily cron job (`heartbeat.cron.ts`)

### SSL/TLS — NOT CONFIGURED
- Nginx config has SSL block commented out
- `docker-compose.yml` maps port 443 but no certificates exist
- Production deployment requires manual SSL setup

### Grafana Dashboard — PARTIAL
- `monitoring/grafana-dashboard.json` file exists
- But Grafana is not in `docker-compose.yml` — it won't start automatically
- Prometheus config references `mongodb:27017` but the actual DB is PostgreSQL

---

## 3. Payment Layer

### PayPal Integration — MISSING
- Architecture diagram (image 1) explicitly shows "PayPal & Stripe Integration" with PayPal logo
- Only Stripe is implemented (`backend/services/stripe/`)
- Zero PayPal code anywhere in the project

### Revenue Splitting — PARTIAL
- `SubscriptionManager.sol` does implement 50/50 split on-chain
- But the NestJS Stripe service has no revenue splitting logic

---

## 4. Storage / IPFS

### Pinata API Integration — MISSING
- Diagrams show "IPFS (Web3.Storage/Pinata)" as the decentralized storage layer
- Frontend `ipfs-client.ts` uses only public IPFS gateways (no auth, no pinning)
- Backend `ipfs.service.ts` has no Pinata API key usage
- Files uploaded to public IPFS are NOT pinned — they will be garbage collected
- `PINATA_API_KEY` / `PINATA_SECRET` not in any `.env.example`

### Web3.Storage — MISSING
- Mentioned in diagrams as an alternative to Pinata
- Not implemented anywhere

---

## 5. Heartbeat System

### Cron Every 6 Hours — MISMATCH
- Data flow diagram shows "Cron Job Check Every 6hr"
- Actual implementation runs `@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)` — once per day only

### Full State Machine (Missed1 → Missed2 → Missed3 → GracePeriod → Transfer) — PARTIAL
- Heartbeat state machine diagram shows multi-stage missed states (Missed1, Missed2, Missed3)
- Current implementation only tracks a single `missedCount` counter
- No distinct state transitions between Missed1/Missed2/Missed3 stages
- `bufferMisses` field exists in schema but the cron logic is simplified

---

## 6. Mobile App

### Expo Mobile App — EXISTS BUT NOT INTEGRATED
- `frontend/mobile/` folder exists with screens and services
- Mobile app is NOT in `docker-compose.yml`
- No shared API contract / type definitions between mobile and backend
- Biometric auth service exists but unclear if wired to actual heartbeat check-in flow

### Push Notifications — MISSING
- README claims push notifications are implemented
- No Expo Push Token registration, no `expo-notifications` server-side sending found in backend

---

## 7. Blockchain / Smart Contracts

### ERC20/ERC721 Token Asset Transfer — PARTIAL
- `DigitalWill.sol` (in `/contracts`) has `registerTokenAsset` and `executeTokenAssets`
- But `executeTokenAssets` is never called from the backend trigger flow
- No `approve()` flow guidance for users to pre-authorize the contract

### WalletConnect — MISSING
- Architecture shows "MetaMask Login" but also implies broader wallet support
- Frontend only supports MetaMask (`window.ethereum`)
- No WalletConnect / RainbowKit / wagmi integration

### Polygon Mainnet Deployment — NOT DONE
- Config references Mumbai testnet (chain 80001)
- Mainnet contract addresses are empty strings in `contracts.ts`
- No deployed contract addresses in any `.env.example`

---

## 8. Auth

### Session Management — MISSING
- Architecture shows "JWT, Session, MetaMask Login"
- Only JWT is implemented
- No server-side session store (would need Redis — also missing)

---

## 9. Monitoring / Observability

### Sentry Integration — STUB ONLY
- `logger.service.ts` has `sendToSentry()` method but it only `console.log`s
- Actual `@sentry/node` SDK is not installed or initialized
- Error tracking is effectively disabled

### Backend Metrics Endpoint — UNVERIFIED
- `prometheus.yml` scrapes `backend:7001/metrics`
- No `@willsoto/nestjs-prometheus` or equivalent found in backend dependencies
- `/metrics` endpoint may not exist

---

## 10. Encryption

### Shamir Secret Sharing — SIMPLIFIED / NOT PRODUCTION-READY
- Implementation exists in `src/crypto/shamir.ts` and `core/crypto/key-management.ts`
- Code comments explicitly say "simplified XOR-based, NOT cryptographically secure"
- Comments say "use a proper library like secrets.js in production"
- This is a critical security gap for the core value proposition

---

## Summary Table

| Feature | Diagram Says | Reality |
|---|---|---|
| Redis Cache/Sessions | Core component | Not implemented |
| PostgreSQL Replica | Primary + Replica | Single instance only |
| n8n Automation | Event trigger layer | Not implemented |
| PayPal Payments | PayPal + Stripe | Stripe only |
| Pinata/Web3.Storage | Pinned IPFS storage | Public gateways, no pinning |
| Cron frequency | Every 6 hours | Once per day |
| Heartbeat state machine | Multi-stage (Missed1/2/3) | Single counter |
| Push notifications | Mobile feature | Not wired to backend |
| WalletConnect | Wallet support | MetaMask only |
| Mainnet deployment | Polygon Mainnet | Testnet only, empty addresses |
| Sentry error tracking | Error monitoring | Console.log stub |
| Shamir Secret Sharing | Cryptographic key split | XOR stub, not secure |
| SSL/TLS | HTTPS | Commented out |
| Grafana | Monitoring dashboard | Config exists, not in compose |
| ERC20/721 auto-transfer | On trigger execution | registerTokenAsset only, execute not wired |
