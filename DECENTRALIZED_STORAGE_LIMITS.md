# 🌐 Decentralized Storage (Web3) Actual Limits

AlwaysThere Protocol me decentralized storage (IPFS/Arweave) ki limits purely technical constraints aur security parameters par based hain.

## 📏 Actual Storage Limits (The Numbers)

| Parameter | Limit | Reason |
|:--- |:--- |:--- |
| **Max Single File Size** | **50 MB** | Backend JSON payload limit (50MB) + Browser memory stability. |
| **Primary Web3 Quota** | **5 GB** | **Web3.Storage** Free Tier integration. |
| **Fallback Web3 Quota** | **1 GB** | **Pinata** Backend Bridge fallback. |
| **Max Concurrent Uploads** | **3 Files** | Network congestion avoid. |
| **IPFS Hash Generation** | **SHA-256** | Standard CID v1 format for permanent linking. |

---

## 🛠 Why 50MB Limit? (Technical Breakdown)

Aap soch rahe honge ki IPFS toh GBs me data store kar sakta hai, toh humne **50MB** kyun rakha hai?

1. **Memory Inflation:** Jab hum browser me file ko encrypt karte hain, toh wo `Uint8Array` se `Hex String` me convert hoti hai. Hex string original file size se **2x badi** hoti hai. 
   - *Example:* 50MB ki file browser memory me **~100MB+** space leti hai process hote waqt.
2. **Backend Handshake:** Hamara backend abhi `50MB` JSON limit support karta hai. Isse badi files "Payload Too Large" error degi.
3. **Decryption Speed:** Decentralized storage se data download karke browser me decrypt karna computationally heavy hai. 50MB tak ki files instant (2-5 seconds) decrypt hoti hain.

---

## 🌍 Global Comparison

| Feature | AlwaysThere Protocol | Standard IPFS Gateway | Arweave (Permaweb) |
|:--- |:--- |:--- |:--- |
| **Privacy** | **Encrypted (AES-256)** | Public by default | Public by default |
| **Access** | **Shamir Secret Sharing** | Single Hash | Single Hash |
| **Permanence** | **Multi-Node Pinning** | Garbage collected | Permanent (Paid) |
| **Limit** | **50MB / File** | No limit (but slow) | No limit (High Cost) |

## 💡 Future Roadmap for Larger Files
Agar aapko **1GB+** ki videos ya large backups store karne hain, toh hum future me:
1. **Streaming Uploads:** File ko chunks me divide karke upload karenge.
2. **Dedicated Pinning Service:** Pinata ya Infura integration for enterprise-grade storage.

---
*Note: Ye limits current stable version (v1.0.0) ke liye hain.*
