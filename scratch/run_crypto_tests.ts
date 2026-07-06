import WebCryptoService from '../frontend/web/src/lib/crypto';

async function main() {
  console.log('Starting correct crypto tests...');
  const cryptoService = WebCryptoService.getInstance();

  const originalText = 'Hello World! This is a test image buffer simulated as a text.';
  const data = new TextEncoder().encode(originalText);

  // 1. Generate key
  const encryptionKey = cryptoService.generateEncryptionKey();
  console.log('Generated key:', encryptionKey);

  // 2. Encrypt binary
  const encResult = await cryptoService.encryptBinary(data, encryptionKey);
  console.log('Encryption successful. KeyId:', encResult.keyId);

  // 3. Split key
  const keyDist = await cryptoService.splitKey(encryptionKey, 5, 3);
  console.log('Split key into 5 shares. Threshold 3.');

  // 4. Reconstruct key
  const sharesToUse = keyDist.shares.slice(0, 3);
  const reconstructedKey = await cryptoService.reconstructKey(sharesToUse);
  console.log('Reconstructed key:', reconstructedKey);
  console.log('Reconstructed matches original:', reconstructedKey === encryptionKey ? 'YES' : 'NO');

  // 5. Decrypt binary
  const decryptedBuffer = await cryptoService.decryptBinary(
    encResult.encryptedData,
    reconstructedKey,
    encResult.iv
  );
  
  const decryptedText = new TextDecoder().decode(decryptedBuffer);
  console.log('Decrypted text:', decryptedText);
  console.log('Decrypted text matches original:', decryptedText === originalText ? 'YES' : 'NO');
}

main().catch(console.error);
