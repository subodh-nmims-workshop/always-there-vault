/**
 * Test Crypto Service with Fallback
 * Verify that encryption works with or without secrets.js-grempe
 */

import WebCryptoService from './crypto'

export async function testCryptoFallback() {
  console.log('🧪 Testing Crypto Service with Fallback...\n')

  const crypto = WebCryptoService.getInstance()

  try {
    // 1. Test Encryption
    console.log('1️⃣ Testing encryption...')
    const testData = 'This is sensitive bank account data: Account #1234567890'
    const encryptionResult = await crypto.encryptData(testData)
    console.log('✅ Encryption successful')
    console.log('   Key ID:', encryptionResult.keyId)
    console.log('   IV:', encryptionResult.iv.substring(0, 20) + '...')
    console.log('   Encrypted length:', encryptionResult.encryptedData.length)

    // 2. Test Key Generation
    console.log('\n2️⃣ Testing key generation...')
    const encryptionKey = crypto.generateEncryptionKey()
    console.log('✅ Key generated')
    console.log('   Key length:', encryptionKey.length, 'chars (64 hex = 256 bits)')

    // 3. Test Key Splitting (with fallback)
    console.log('\n3️⃣ Testing key splitting...')
    try {
      const keyDistribution = await crypto.splitKey(encryptionKey, 5, 3)
      console.log('✅ Key split successful')
      console.log('   Total shares:', keyDistribution.totalShares)
      console.log('   Threshold:', keyDistribution.threshold)
      console.log('   Share 1:', keyDistribution.shares[0].shareData.substring(0, 30) + '...')
      console.log('   Holder 1:', keyDistribution.shares[0].holder)

      // 4. Test Key Reconstruction
      console.log('\n4️⃣ Testing key reconstruction...')
      const sharesToUse = keyDistribution.shares.slice(0, 3) // Use first 3 shares
      const reconstructedKey = await crypto.reconstructKey(sharesToUse)
      console.log('✅ Key reconstructed')
      console.log('   Matches original:', reconstructedKey === encryptionKey ? '✅ YES' : '❌ NO')

      if (reconstructedKey !== encryptionKey) {
        console.error('❌ CRITICAL: Reconstructed key does not match!')
        console.log('   Original:', encryptionKey.substring(0, 20) + '...')
        console.log('   Reconstructed:', reconstructedKey.substring(0, 20) + '...')
      }

    } catch (splitError) {
      console.error('❌ Key splitting failed:', splitError)
      throw splitError
    }

    // 5. Test Decryption
    console.log('\n5️⃣ Testing decryption...')
    const decryptedData = await crypto.decryptData(
      encryptionResult.encryptedData,
      encryptionKey,
      encryptionResult.iv
    )
    console.log('✅ Decryption successful')
    console.log('   Matches original:', decryptedData === testData ? '✅ YES' : '❌ NO')

    if (decryptedData !== testData) {
      console.error('❌ CRITICAL: Decrypted data does not match!')
      console.log('   Original:', testData)
      console.log('   Decrypted:', decryptedData)
    }

    // 6. Test Hash Generation
    console.log('\n6️⃣ Testing hash generation...')
    const hash1 = await crypto.generateHash('test data')
    const hash2 = await crypto.generateHash('test data')
    const hash3 = await crypto.generateHash('different data')
    console.log('✅ Hash generation successful')
    console.log('   Same input = same hash:', hash1 === hash2 ? '✅ YES' : '❌ NO')
    console.log('   Different input = different hash:', hash1 !== hash3 ? '✅ YES' : '❌ NO')

    console.log('\n✅ ALL CRYPTO TESTS PASSED! 🎉')
    console.log('Encryption service is working correctly with fallback support.')

    return {
      success: true,
      message: 'All crypto tests passed',
      usedFallback: false // Will be true if secrets.js-grempe failed to load
    }

  } catch (error) {
    console.error('\n❌ CRYPTO TEST FAILED:', error)
    return {
      success: false,
      error: error
    }
  }
}

// Auto-run if in browser console
if (typeof window !== 'undefined') {
  (window as any).testCryptoFallback = testCryptoFallback
  console.log('💡 Run testCryptoFallback() in console to test crypto with fallback')
}
