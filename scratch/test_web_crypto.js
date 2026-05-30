const crypto = require('crypto').webcrypto;

async function test() {
  const keyBytes = crypto.getRandomValues(new Uint8Array(32));
  const key = await crypto.subtle.importKey(
    'raw',
    keyBytes,
    { name: 'AES-GCM' },
    false,
    ['encrypt', 'decrypt']
  );

  const data = new TextEncoder().encode('Hello World');
  const iv = crypto.getRandomValues(new Uint8Array(12));

  // Encrypt with data.buffer
  try {
    const enc1 = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, data.buffer);
    console.log('Encrypt with data.buffer success');
    const dec1 = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, enc1);
    console.log('Decrypt with data.buffer success:', new TextDecoder().decode(dec1));
  } catch (e) {
    console.error('Failed with data.buffer:', e);
  }

  // Encrypt with data
  try {
    const enc2 = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, data);
    console.log('Encrypt with data success');
    const dec2 = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, enc2);
    console.log('Decrypt with data success:', new TextDecoder().decode(dec2));
  } catch (e) {
    console.error('Failed with data:', e);
  }
}

test();
