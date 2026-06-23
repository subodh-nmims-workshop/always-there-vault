import { useState } from 'react';
import { EncryptionUtils, EncryptedPackage, ShareDistribution } from '../utils/encryption';
import { useAccount, useWalletClient } from 'wagmi';

interface EncryptAndStoreResult {
  ipfsHash: string;
  shamirShares: ShareDistribution;
}

export function useEncryptionAndStorage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();

  /**
   * Orchestrates the entire Zero-Trust pipeline:
   * 1. Generates AES symmetric key.
   * 2. Encrypts the raw document locally.
   * 3. Splits the symmetric key via Shamir's Secret Sharing into 5 parts.
   * 4. Uploads ONLY the AES ciphertext to IPFS via Backend Proxy (Pinata API).
   * 5. Returns the IPFS Hash + the 5 Key Shares to distribute (to Smart Contract / Emails).
   */
  const processSecureWill = async (rawDocument: string): Promise<EncryptAndStoreResult | null> => {
    setIsProcessing(true);
    setError(null);

    try {
      const isDemo = localStorage.getItem('dwp_is_demo') === 'true';
      if (!isDemo && (!address || !walletClient)) {
        throw new Error('Wallet must be connected to process secure transactions.');
      }

      // 1 & 2: Encrypt Payload
      console.log('🔒 1. Client-side encrypting document with AES-256-GCM...');
      const { encrypted, symmetricKeyHex } = await EncryptionUtils.encryptDocument(rawDocument);

      // 3: Key Split
      console.log('🗝️ 2. Splitting symmetric key using Shamir Secret Sharing (3-of-5)...');
      const shamirShares = await EncryptionUtils.splitKey(symmetricKeyHex, 5, 3);
      
      // We must not log the shares or original key anywhere in production!
      // The symmetricKeyHex is now "forgotten".

      // 4: Send Encrypted Blob to Backend (which pins it to IPFS via Pinata)
      console.log('☁️ 3. Uploading encrypted ciphertext payload to decentralized IPFS...');
      
      let cid = 'QmdemoSandboxMockedIPFSHash777777777777777777777777777';
      
      if (!isDemo) {
        const formData = new FormData();
        // We wrap the JSON representation of EncryptedPackage into a Blob
        const blob = new Blob([JSON.stringify(encrypted)], { type: 'application/json' });
        formData.append('file', blob, 'encrypted-will-payload.json');

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://always-there-protocol-api.onrender.com' /* 'http://localhost:7001' */}/ipfs/upload`, {
          method: 'POST',
          // Optional: Add Auth Header containing JWT or Wallet Signature 
          // headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`IPFS Upload Failed: ${response.statusText}`);
        }

        const data = await response.json();
        cid = data.cid;
      }
      
      console.log('✅ 4. IPFS Upload Success! CID:', cid);

      setIsProcessing(false);
      return {
        ipfsHash: cid,
        shamirShares
      };

    } catch (err: any) {
      console.error('Encryption Pipeline Error:', err);
      setError(err.message || 'Unknown error occurred in encryption pipeline');
      setIsProcessing(false);
      return null;
    }
  };

  return {
    processSecureWill,
    isProcessing,
    error,
  };
}
