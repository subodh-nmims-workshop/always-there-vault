# Always There Protocol: Project Architecture

This document contains the complete architectural breakdown of the Always There Protocol.

## System Architecture Diagram

```mermaid
graph TD
    subgraph "Frontend Layer (User Interface)"
        Web["<b>Next.js Web App</b><br/>(Port 7000)<br/><i>Dashboard & Settings</i>"]
        Mobile["<b>Expo Mobile App</b><br/>(iOS/Android)<br/><i>Biometrics & Monitor</i>"]
    end

    subgraph "Backend Layer (NestJS API - Port 7001)"
        API["<b>REST API Gateway</b><br/><i>Entry Point</i>"]
        Auth["<b>Auth Service</b><br/><i>JWT / Sessions</i>"]
        Heartbeat["<b>Heartbeat Service</b><br/><i>Proof-of-Life Logic</i>"]
        Asset["<b>Asset Service</b><br/><i>AES-256 GCM Encryption</i>"]
        Beneficiary["<b>Beneficiary Service</b><br/><i>Nominee Mgmt</i>"]
        Payment["<b>Payment Service</b><br/><i>Stripe Integration</i>"]
    end

    subgraph "Data & Storage"
        DB[("<b>SQLite/PostgreSQL</b><br/><i>User Metadata</i>")]
        IPFS["<b>IPFS (Pinata/Infura)</b><br/><i>Encrypted Files</i>"]
    end

    subgraph "Blockchain Layer"
        Contracts["<b>Smart Contracts</b><br/><i>Solidity Logic</i>"]
        Blockchain["<b>Layer 1/2 Chain</b><br/><i>Immutable State</i>"]
    end

    subgraph "Infrastucture & Automation"
        Docker["<b>Docker Compose</b><br/><i>Service Orchestration</i>"]
        Nginx["<b>Nginx Proxy</b><br/><i>Route Traffic</i>"]
        n8n["<b>n8n Workflows</b><br/><i>Automated Notifications</i>"]
    end

    %% Named Connections
    Web -- "REST Requests & Server Actions" --> API
    Mobile -- "REST API Calls (Axios)" --> API
    
    API -- "Validate JWT Tokens" --> Auth
    API -- "Update/Check Heartbeat" --> Heartbeat
    API -- "Encrypt Sensitive Data" --> Asset
    API -- "Manage Nominee Access" --> Beneficiary
    API -- "Process Subscriptions" --> Payment

    Heartbeat -- "Write lastHeartbeat Timestamp" --> DB
    Asset -- "Upload Encrypted JSON" --> IPFS
    Asset -- "Save File Metadata" --> DB
    
    API -- "Contract Calls (Ethers.js)" --> Contracts
    Contracts -- "Trigger Digital Will" --> Blockchain

    Payment -- "Initialize Payment Intent" --> Stripe["Stripe External API"]
    
    Docker -- "Manage Containers" --> API
    Docker -- "Manage Containers" --> Web
    Nginx -- "Reverse Proxy Routing" --> Web
    Nginx -- "Reverse Proxy Routing" --> API
    
    n8n -. "External Alerts (Telegram/Email)" .-> API
```

## Component Details

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Frontend (Web)** | Next.js, Tailwind CSS | Primary dashboard for users to manage their "will". |
| **Frontend (Mobile)** | Expo, React Native | Secure on-the-go monitoring and biometric check-ins. |
| **Backend API** | NestJS, TypeScript | Central logic hub for security and orchestration. |
| **Heartbeat** | Node-cron / Logic | Monitors user activity to ensure they are "alive". |
| **Vault (Asset)** | IPFS + AES-256 | Stores encrypted data in a decentralized manner. |
| **Blockchain** | Solidity, Hardhat | Handles immutable execution of the digital will. |
| **Infrastructure** | Docker, Nginx, n8n | Ensures scalability, security, and automation. |

---
*Created for: Always There Protocol Dev Team*
