const secrets = require('/home/nothing/Desktop/Nmims/DeadMan Protocol/frontend/web/node_modules/secrets.js-grempe');
const crypto = require('crypto');

function generateEncryptionKey() {
  const keyBytes = crypto.randomBytes(32);
  return keyBytes.toString('hex');
}

function xorHex(hex1, hex2) {
  const arr1 = Buffer.from(hex1, 'hex');
  const arr2 = Buffer.from(hex2, 'hex');
  const result = Buffer.alloc(arr1.length);
  for (let i = 0; i < arr1.length; i++) {
    result[i] = arr1[i] ^ arr2[i];
  }
  return result.toString('hex');
}

function fallbackSplitKey(keyHex, totalShares) {
  const shares = [];
  for (let i = 0; i < totalShares - 1; i++) {
    shares.push(generateEncryptionKey());
  }
  let lastShare = keyHex;
  for (const share of shares) {
    lastShare = xorHex(lastShare, share);
  }
  shares.push(lastShare);
  return shares;
}

const keyHex = generateEncryptionKey();
console.log('Original Key (Hex):', keyHex, 'Length:', keyHex.length);

const xorShares = fallbackSplitKey(keyHex, 5);
console.log('XOR Shares generated.');

try {
  const combined = secrets.combine(xorShares.slice(0, 3));
  console.log('Combined XOR shares using secrets.combine:', combined, 'Length:', combined.length);
} catch (e) {
  console.error('Error combining XOR shares with secrets.combine:', e);
}
