import { ethers } from 'ethers';

// WebCrypto helper functions matching frontend exactly
const uint8ArrayToHex = (arr: Uint8Array): string => {
  return Array.from(arr)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

const hexToUint8Array = (hex: string): Uint8Array => {
  const cleanHex = hex.startsWith('0x') ? hex.slice(2) : hex;
  const numBytes = cleanHex.length / 2;
  const array = new Uint8Array(numBytes);
  for (let i = 0; i < numBytes; i++) {
    array[i] = parseInt(cleanHex.substr(i * 2, 2), 16);
  }
  return array;
};

async function getCryptoKey(keyHex: string): Promise<any> {
  const rawKey = hexToUint8Array(keyHex);
  return globalThis.crypto.subtle.importKey(
    'raw',
    rawKey,
    { name: 'AES-GCM' },
    false,
    ['encrypt', 'decrypt']
  );
}

async function encryptBinary(data: Uint8Array, keyHex: string): Promise<{ encryptedData: string, iv: string }> {
  const cryptoKey = await getCryptoKey(keyHex);
  const iv = globalThis.crypto.getRandomValues(new Uint8Array(12));
  const encryptedBuffer = await globalThis.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    cryptoKey,
    data
  );
  return {
    encryptedData: uint8ArrayToHex(new Uint8Array(encryptedBuffer)),
    iv: uint8ArrayToHex(iv)
  };
}

async function decryptBinary(encryptedDataHex: string, keyHex: string, ivHex: string): Promise<ArrayBuffer> {
  const cryptoKey = await getCryptoKey(keyHex);
  const iv = hexToUint8Array(ivHex);
  const encryptedData = hexToUint8Array(encryptedDataHex);
  return globalThis.crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    cryptoKey,
    encryptedData
  );
}

async function run() {
  const apiEndpoint = 'http://localhost:7001';
  
  // Hardhat Second Account (0x70997970C51812dc3A010C7d01b50e0d17dc79C8)
  const walletAddress = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';
  const privateKey = '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d';
  const wallet = new ethers.Wallet(privateKey);

  console.log('1. Fetching nonce...');
  const nonceRes = await fetch(`${apiEndpoint}/api/auth/nonce`);
  const { nonce } = await nonceRes.json();
  
  console.log('2. Signing nonce...');
  const signature = await wallet.signMessage(nonce);

  console.log('3. Authenticating / Logging in...');
  const loginRes = await fetch(`${apiEndpoint}/api/auth/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ walletAddress, message: nonce, signature })
  });
  const { token } = await loginRes.json();
  if (!token) throw new Error('Authentication failed');
  console.log('✅ Authenticated successfully.');

  // Prepare test file
  const originalText = 'Hello AlwaysThere Decentralized Will Protocol. This is a secure file content!';
  const fileData = new TextEncoder().encode(originalText);
  const keyHex = uint8ArrayToHex(globalThis.crypto.getRandomValues(new Uint8Array(32)));
  const keyId = 'key-uuid-for-testing-' + Date.now();

  console.log('4. Encrypting test file...');
  const { encryptedData, iv } = await encryptBinary(fileData, keyHex);
  console.log(`Ciphertext length: ${encryptedData.length}, IV: ${iv}`);

  // Create Form Data to upload the file to B2/local-simulated
  console.log('5. Uploading file...');
  const formData = new FormData();
  // We append it as a Blob containing the encrypted data HEX string, matching mode-service
  const blob = new Blob([encryptedData], { type: 'text/plain' });
  formData.append('file', blob, 'test-secret.enc');

  const uploadRes = await fetch(`${apiEndpoint}/api/assets/upload`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData as any
  });
  if (!uploadRes.ok) {
    const errorText = await uploadRes.text();
    throw new Error(`Upload failed: ${uploadRes.statusText} - ${errorText}`);
  }
  const uploadData = await uploadRes.json();
  console.log('✅ File uploaded successfully. Location:', uploadData.location);

  // Now create the metadata record (asset registration)
  console.log('6. Registering asset metadata...');
  const assetId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8);
    return v.toString(16);
  });
  const registerRes = await fetch(`${apiEndpoint}/api/assets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      id: assetId,
      name: 'test-secret.enc',
      type: 'photo', // treat as photo to test binary path
      keyId,
      iv,
      ipfsHash: uploadData.location, // location is stored in ipfsHash/location
      size: fileData.length,
      mimeType: 'image/png' // treat as image
    })
  });
  if (!registerRes.ok) {
    const errorText = await registerRes.text();
    throw new Error(`Registration failed: ${registerRes.statusText} - ${errorText}`);
  }
  console.log('✅ Asset metadata registered.');

  // Now test download
  console.log('7. Triggering self-healing download url retrieval...');
  const downloadRes = await fetch(`${apiEndpoint}/api/assets/${assetId}/download`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!downloadRes.ok) {
    throw new Error(`Download endpoint failed: ${downloadRes.statusText}`);
  }
  const { url } = await downloadRes.json();
  console.log('✅ Received download URL:', url);

  // Fetch the file from the download URL
  console.log('8. Fetching the encrypted payload from download URL...');
  const fileContentRes = await fetch(url);
  if (!fileContentRes.ok) {
    throw new Error(`Failed to fetch file from download URL: ${fileContentRes.statusText}`);
  }
  const fetchedEncryptedData = await fileContentRes.text();
  console.log('✅ Received payload length:', fetchedEncryptedData.length);

  // Decrypt
  console.log('9. Decrypting downloaded payload...');
  const decryptedBuffer = await decryptBinary(fetchedEncryptedData, keyHex, iv);
  const decryptedText = new TextDecoder().decode(decryptedBuffer);

  console.log(`Original:  "${originalText}"`);
  console.log(`Decrypted: "${decryptedText}"`);

  if (decryptedText === originalText) {
    console.log('\n🎉 SUCCESS: The end-to-end encryption/decryption pipeline is fully operational!');
  } else {
    console.log('\n❌ FAILURE: Decrypted text does not match original text!');
  }
}

run().catch(err => {
  console.error('\n❌ Test run failed with error:', err);
});
