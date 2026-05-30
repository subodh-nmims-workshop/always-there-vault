import { testCryptoFallback } from '../frontend/web/src/lib/test-crypto-fallback';

async function main() {
  console.log('Starting crypto fallback tests...');
  const result = await testCryptoFallback();
  console.log('Result:', result);
}

main().catch(console.error);
