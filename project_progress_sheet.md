# Project Progress Sheet & Module Isolation Map

> [!IMPORTANT]
> **To Future Agents:** This document is the Single Source of Truth (SSoT) for the status of the DeadMan Protocol (Digital Will) application. DO NOT modify any module marked **[STATUS: COMPLETED & LOCKED]** unless explicitly requested by the user. Do not introduce regressions in existing completed modules when working on new tasks.

---

## 🗺️ Module Division & Current Status

### Module 1: Core Database Schema & Migrations
- **Description:** PostgreSQL Drizzle schema definitions, migrations, relationships, and database connectivity.
- **Related Files:**
  - `backend/src/db/schema/` (folders, files, users, beneficiaries, capsules, etc.)
  - `backend/src/db/db.module.ts`
- **Key Features:**
  - Category persistence (`type` column in `folders`).
  - Cascade deletes and key constraints.
- **Status:** **[STATUS: COMPLETED & LOCKED]**
- **Verification:** Runs migration clean and compiles successfully.

---

### Module 2: Authentication & Session Management
- **Description:** Web3 wallet signature-based authentication, JWT token generation, session verification guard, and endpoint authorization.
- **Related Files:**
  - `backend/services/users/` (auth guards, token services)
  - `frontend/web/src/contexts/AppContext.tsx`
- **Status:** **[STATUS: COMPLETED & LOCKED]**
- **Verification:** User login, token persistence in localStorage, and JWT authorization headers work correctly.

---

### Module 3: Local-First Storage Engine (IndexedDB)
- **Description:** Client-side IndexedDB configuration via `WebStorageService` for offline capability.
- **Related Files:**
  - `frontend/web/src/lib/storage.ts`
- **Key Features:**
  - Silent database write capability to prevent event loops.
  - Local CRUD for assets, folders, beneficiaries, heartbeats, and settings.
- **Status:** **[STATUS: COMPLETED & LOCKED]**
- **Verification:** Local database operations perform smoothly without triggering loops.

---

### Module 4: Data Synchronization Protocol
- **Description:** Two-way reconciliation protocol syncing IndexedDB state with PostgreSQL database.
- **Related Files:**
  - `frontend/web/src/hooks/useSyncData.ts`
- **Key Features:**
  - Multi-entity sync (Beneficiaries, Folders, Assets, Heartbeats, Settings).
  - Sync comparisons pre-calculate target states to avoid infinite loops.
  - Dispatches singular `dwp-state-synced` event to avoid layout/state thrashing.
- **Status:** **[STATUS: COMPLETED & LOCKED]**
- **Verification:** Runs in the background every 30 seconds; successfully updates folders and files in real-time.

---

### Module 5: Decentralized Storage & Encryption Pipeline
- **Description:** Local file encryption/decryption using client keys and IPFS upload to web3.storage.
- **Related Files:**
  - `frontend/web/src/lib/encryption.ts`
  - `frontend/web/src/components/asset-creation-form.tsx` (upload/download logic)
  - `frontend/web/src/lib/ipfs-client.ts`
  - `frontend/web/src/app/beneficiary/assets/page.tsx`
- **Status:** **[STATUS: COMPLETED & LOCKED]**
- **Verification:** Custom files are encrypted and uploaded to IPFS (via Web3.Storage/Pinata bridge fallback), and securely decrypted by will owners and claimants via direct IPFS gateway or cloud fallback. Decryption troubleshooting details are surfaced directly in the UI.

---

### Module 6: Smart Contract Bridge & Blockchain Service
- **Description:** Smart contract integration, Web3 RPC connectivity, contract events, and state queries.
- **Related Files:**
  - `backend/services/blockchain/blockchain.service.ts`
  - `contracts/` (Heartbeat, DigitalWill, AssetManager, etc.)
- **Status:** **[STATUS: IN PROGRESS]**
- **Verification:** Compiles and deploys to local Hardhat node.

---

### Module 7: Heartbeat & Alert Notification Pipeline
- **Description:** Periodic heartbeat checks, cron job manager, grace period thresholds, and SMTP/Resend email notifications.
- **Related Files:**
  - `backend/services/heartbeat/`
  - `backend/services/email/`
- **Status:** **[STATUS: IN PROGRESS]**
- **Verification:** Heartbeat checks trigger emails correctly during testing.

---

### Module 8: Nominee Claims & Key Inheritance
- **Description:** Claims validation via secure access tokens, nominee dashboard, and key release pipeline.
- **Related Files:**
  - `backend/services/assets/assets.controller.ts` (ClaimAssetsController)
  - `frontend/web/src/app/claim/`
- **Status:** **[STATUS: IN PROGRESS]**
- **Verification:** Beneficiaries can access claimed assets using a valid claim token.

---

### Module 9: UI Navigation & Category Routing
- **Description:** Layout, sidebar filters, breadcrumbs, search, and folder nesting navigation.
- **Related Files:**
  - `frontend/web/src/components/asset-creation-form.tsx`
- **Key Features:**
  - Instantaneous local-first folder traversal (no network delay).
  - Clean state reset (`setCurrentFolderId(null)`) on tab/category switch.
- **Status:** **[STATUS: COMPLETED & LOCKED]**
- **Verification:** High-performance local-first navigation without visual flickering.

---

### Module 10: Payment & Subscription Gateway
- **Description:** Integration with PayPal and Crypto payment gateways, subscription plan enforcement, and feature gate controls.
- **Related Files:**
  - `frontend/web/src/app/subscription/`
  - `backend/services/payments/`
- **Status:** **[STATUS: IN PROGRESS]**
- **Verification:** Bypasses or processes payments based on environment config.

---

## 📋 Rules for Future Agent Sessions
1. **Refer to this progress sheet** before doing anything else.
2. **Lock down Completed Modules:** If a task requires editing a file belonging to a completed module (labeled **[STATUS: COMPLETED & LOCKED]**), make sure the modifications DO NOT alter its logic or cause regressions.
3. **Keep this sheet updated:** After completing or changing the status of any module, update this progress sheet accordingly and commit the changes to Git.
