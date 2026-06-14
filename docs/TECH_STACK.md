# AlwaysThere Protocol: Technology Stack & Architecture

This document outlines the complete technology stack used across the Frontend, Backend, Database, Blockchain, and Third-Party Service layers of the AlwaysThere Protocol.

---

## 1. Frontend Web App
Built using the latest React ecosystem technologies, prioritizing user experience, modern layout styling, and crypto-wallet integration.

*   **Framework**: **Next.js (React)** — Page routing, server-side rendering support, and static optimizations.
*   **Language**: **TypeScript** — Ensures strict typing, compile-time checks, and robust autocomplete support.
*   **Styling & UI**:
    *   **Tailwind CSS**: Utility-first CSS classes for rapid, responsive UI designs.
    *   **Shadcn UI & Radix Primitives**: Polished, accessible UI components (dialogs, cards, inputs).
    *   **Framer Motion**: Smooth entry/exit page animations and micro-interactions.
    *   **Lucide React**: Vector icons library.
*   **Web3 & Wallet Integration**:
    *   **Wagmi & Viem**: State management hooks and lightweight client utility library for Ethereum/Polygon interactions.
    *   **RainbowKit / ConnectKit**: Modal interfaces for connecting hardware, browser, and mobile wallets.
*   **Payments**:
    *   **@paypal/react-paypal-js**: Native SDK for rendering PayPal smart checkout buttons.

---

## 2. Backend API Server
A high-performance, modular API backend that serves as the controller orchestrating database updates, file sharding, payment verifications, and email dispatch.

*   **Framework**: **NestJS (Node.js)** — Standardized, enterprise-ready TypeScript framework utilizing controllers, services, and modules.
*   **Language**: **TypeScript** — Native typescript compile and build process.
*   **Database ORM**: **Drizzle ORM** — Modern SQL query builder and schema management utility. Automatically synchronizes schema migrations on startup using the `start:prod` script.
*   **Security & Optimization**:
    *   **Helmet**: Secures express HTTP headers.
    *   **HPP (HTTP Parameter Pollution)**: Prevents security exploits.
    *   **Express Rate Limit**: Protects APIs against brute-force/DDoS requests.
    *   **CORS**: Strict domain origin validation for security.
*   **Communications & APIs**:
    *   **Nodemailer**: Connects directly to Gmail SMTP for notification emails.
    *   **Axios**: Native HTTP request handler for validating Sentry logs, PayPal orders, and Pinata storage APIs.

---

## 3. Databases & Cache
Dynamic storage split between relational user records and secondary analytical audit logging.

*   **Primary Relational Database**: **PostgreSQL** (Hosted on Neon in cloud, or Docker locally) — Stores critical relational structures:
    *   `users`: Wallet addresses, active storage usage, timestamps.
    *   `subscriptions`: Active tiers, payment cycles, prices, expiry dates.
    *   `nominees`: Beneficiary mapping, names, and contact details.
    *   `wills`: Encrypted digital will file references, metadata, and state.
*   **Secondary Document Database**: **MongoDB** (Dockerized locally) — Utilized for unstructured logs, system heartbeats, and audit trails.

---

## 4. Blockchain & Decentralized Protocol (Web3)
On-chain execution engines that guarantee trustless, decentralized storage checks and crypto payments.

*   **Smart Contracts**: **Solidity** — Smart contracts handling subscriptions and custodian logic.
*   **Development & Compilation**: **Hardhat** — Test suite, compilation, and local network blockchain simulation.
*   **Node RPC Providers**: **Alchemy / Infura** — Handles API requests to interact with Polygon and Sepolia Testnet nodes.
*   **Client Interface**: **Ethers.js (v6)** — Utilized by the backend to verify crypto transaction hashes, check recipient wallets, and validate block status.

---

## 5. Storage Layer (Hybrid Centralized + IPFS)
Ensures file resilience through hybrid redundancy options:

*   **IPFS / Decentralized**: **Pinata IPFS Gateway** — Pins encrypted user digital wills securely to the peer-to-peer IPFS network.
*   **Filecoin/Arweave (Alternative)**: **Web3.Storage** — Stores files permanently on Filecoin/Arweave blockchain miners.
*   **Centralized Backup**: **Backblaze B2 (S3-Compatible)** — Acts as a high-speed, secure, private backup vault.

---

## 6. Monitoring & Logging
*   **Sentry**: Live application exception and performance telemetry tracing.
