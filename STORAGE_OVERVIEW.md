# 📦 AlwaysThere Protocol: Storage Overview

Digital Will Protocol (AlwaysThere) do tarah ke storage mechanism use karta hai taaki aapka data secure aur hamesha accessible rahe.

## 🚀 Storage Types

### 1. Cloud Vault (Managed)
- **Kyun:** Fast access aur instant preview ke liye.
- **Backend:** Centralized nodes (MongoDB + AES-256 encryption).
- **Security:** Data encrypted form me save hota hai, decryption sirf user ke wallet keys se hi possible hai.

### 2. Web3 Vault (Decentralized)
- **Kyun:** Immortality aur censorship resistance ke liye.
- **Backend:** IPFS (InterPlanetary File System).
- **Process:** Data ko shards me divide karke multiple nodes par distribute kiya jata hai.
- **Feature:** Ye "Premium Only" feature hai.

---

## 💎 Storage Tiers & Allocations

Jab naya user login karta hai, toh use **Free Tier** automatically assign hota hai.

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
- **Sync Logic:** Data pehle local IndexedDB me save hota hai, phir encrypted chunks backend/IPFS par sync hote hain.
- **Payload Limit:** Single file upload limit abhi **50MB** set ki gayi hai (Performance ke liye).

## 📊 Actual Reality

Actually me, 500MB ek normal user ke liye kaafi hota hai kyunki:
1. **Documents:** 1 PDF usually 1-2MB ka hota hai (200+ docs easily).
2. **Photos:** Optimized images 2-3MB ki hoti hain.
3. **Private Keys:** Kuch bytes me hoti hain.

Premium tier unke liye hai jo poora "Digital Identity Legacy" (Large Photo Albums, Private Videos, Business Secrets) save karna chahte hain.

---
*Protocol Version: v1.0.0-stable*
