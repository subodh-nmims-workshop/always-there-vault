const secretsModule = require('secrets.js-grempe');
const crypto = require('crypto').webcrypto;

function customRNG(bits) {
  let str = null;
  while (str === null) {
    const bytesNeeded = Math.ceil(bits / 8);
    const randomBytes = crypto.getRandomValues(new Uint8Array(bytesNeeded));
    let binaryString = '';
    for (let i = 0; i < randomBytes.length; i++) {
      binaryString += randomBytes[i].toString(2).padStart(8, '0');
    }
    const candidate = binaryString.slice(-bits);
    if (candidate.indexOf('1') !== -1) {
      str = candidate;
    }
  }
  return str;
}

try {
  const secrets = secretsModule.default || secretsModule;
  console.log('Setting custom RNG...');
  secrets.setRNG(customRNG);
  console.log('Custom RNG set successfully!');
  
  const keyHex = '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';
  console.log('Splitting key...');
  const shares = secrets.share(keyHex, 5, 3);
  console.log('Shares generated:', shares);
  
  console.log('Combining shares...');
  const reconstructed = secrets.combine(shares.slice(0, 3));
  console.log('Reconstructed key:', reconstructed);
  console.log('Matches original:', reconstructed === keyHex);
} catch (e) {
  console.error('Error:', e);
}
