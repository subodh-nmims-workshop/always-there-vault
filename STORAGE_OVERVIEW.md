# 📦 AlwaysThere Vault: Storage Overview

AlwaysThere Vault (AlwaysThere) uses two types of storage mechanisms to keep your data secure and always accessible.

## 🚀 Storage Types

### 1. Cloud Vault (Managed)
- **Why:** For fast access and instant previews.
- **Backend:** Centralized nodes (PostgreSQL + AES-256 encryption).
- **Security:** Data is stored in encrypted form; decryption is only possible using the user's wallet keys.

### 2. Web3 Vault (Decentralized)
- **Why:** For permanence and censorship resistance.
- **Backend:** IPFS (InterPlanetary File System) / Arweave.
- **Process:** Data is split into shards and distributed across multiple nodes.
- **Feature:** This is a "Premium Only" feature.

---

## 💎 Storage Tiers & Allocations

When a new user logs in, they are automatically assigned the **Free Tier**.

| Feature | Free Tier (Standard) | Premium Tier (Guardian) |
|:--- |:--- |:--- |
| **Initial Quota** | **500 MB** | **5 GB (5120 MB)** |
| **Storage Engine** | Cloud Vault Only | Cloud + Web3.Storage (IPFS) |
| **Primary Provider** | Centralized Node | Web3.Storage (5GB Free Tier) |
| **Backup Provider** | N/A | Pinata (1GB Fallback) |
| **Encryption** | AES-256 Single Layer | AES-256 + Shamir Sharding |

---

## 🛠 Technical Details

- **Encryption Method:** AES-256-GCM (Browser-level encryption).
- **Sync Logic:** Data is first saved to the local IndexedDB, then encrypted chunks are synchronized to the backend/IPFS.
- **Payload Limit:** The single-file upload limit is currently set to **50MB** (for performance optimization).

## 📊 Practical Reality

In practice, 500MB is more than sufficient for an average user because:
1. **Documents:** 1 PDF is usually 1-2MB (allowing 200+ docs easily).
2. **Photos:** Optimized images are 2-3MB each.
3. **Private Keys:** These consume only a few bytes.

The Premium tier is designed for those who want to preserve their entire "Digital Identity Legacy" (large photo albums, private videos, and business secrets).

---
*Vault Version: v1.0.0-stable*
