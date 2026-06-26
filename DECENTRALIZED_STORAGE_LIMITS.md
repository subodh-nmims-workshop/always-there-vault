# 🌐 Decentralized Storage (Web3) Actual Limits

In the AlwaysThere Vault, the limits of decentralized storage (IPFS/Arweave) are based purely on technical constraints and security parameters.

## 📏 Actual Storage Limits (The Numbers)

| Parameter | Limit | Reason |
|:--- |:--- |:--- |
| **Max Single File Size** | **50 MB** | Backend JSON payload limit (50MB) + Browser memory stability. |
| **Primary Web3 Quota** | **5 GB** | **Web3.Storage** Free Tier integration. |
| **Fallback Web3 Quota** | **1 GB** | **Pinata** Backend Bridge fallback. |
| **Max Concurrent Uploads** | **3 Files** | Network congestion avoidance. |
| **IPFS Hash Generation** | **SHA-256** | Standard CID v1 format for permanent linking. |

---

## 🛠 Why the 50MB Limit? (Technical Breakdown)

You might wonder why we have a **50MB** limit when IPFS can store gigabytes of data. Here are the reasons:

1. **Memory Inflation:** When we encrypt a file in the browser, it is converted from a `Uint8Array` to a `Hex String`. The Hex string is **twice the size** of the original file.
   - *Example:* A 50MB file consumes **~100MB+** of space in the browser memory during processing.
2. **Backend Handshake:** Our backend currently supports a `50MB` JSON limit. Any file larger than this will result in a "Payload Too Large" error.
3. **Decryption Speed:** Downloading data from decentralized storage and decrypting it in the browser is computationally intensive. Files up to 50MB decrypt almost instantly (2-5 seconds).

---

## 🌍 Global Comparison

| Feature | AlwaysThere Vault | Standard IPFS Gateway | Arweave (Permaweb) |
|:--- |:--- |:--- |:--- |
| **Privacy** | **Encrypted (AES-256)** | Public by default | Public by default |
| **Access** | **Shamir Secret Sharing** | Single Hash | Single Hash |
| **Permanence** | **Multi-Node Pinning** | Garbage collected | Permanent (Paid) |
| **Limit** | **50MB / File** | No limit (but slow) | No limit (High Cost) |

## 💡 Future Roadmap for Larger Files
If you need to store **1GB+** videos or large backups, we plan to implement:
1. **Streaming Uploads:** Splitting the file into chunks and uploading them sequentially.
2. **Dedicated Pinning Service:** Deeper Pinata or Infura integrations for enterprise-grade storage.

---
*Note: These limits apply to the current stable version (v1.0.0).*
