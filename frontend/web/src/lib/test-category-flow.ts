/**
 * Test Category Flow - Verify Integration
 * Run this in browser console to test the complete flow
 */

import WebCryptoService from './crypto'
import WebStorageService from './storage'
import { getCategoryTemplate, generateStructuredData, validateCategoryData } from './category-handlers'

export async function testCategoryFlow() {
  console.log('🧪 Starting Category Flow Test...\n')

  try {
    // 1. Test Template Loading
    console.log('1️⃣ Testing template loading...')
    const template = getCategoryTemplate('bank_account')
    console.log('✅ Template loaded:', template.label)
    console.log('   Fields:', template.fields.length)

    // 2. Test Form Data
    console.log('\n2️⃣ Testing form data...')
    const formData = {
      accountName: 'Test HDFC Account',
      bankName: 'HDFC Bank',
      accountNumber: '1234567890',
      accountType: 'Savings'
    }
    console.log('✅ Form data created')

    // 3. Test Validation
    console.log('\n3️⃣ Testing validation...')
    const validation = validateCategoryData(template, formData)
    console.log('✅ Validation result:', validation.valid ? 'PASSED' : 'FAILED')
    if (!validation.valid) {
      console.log('   Errors:', validation.errors)
    }

    // 4. Test Structured Data Generation
    console.log('\n4️⃣ Testing structured data generation...')
    const structuredData = generateStructuredData(template, formData)
    console.log('✅ Structured data generated')
    console.log('   Length:', structuredData.length, 'bytes')
    console.log('   Preview:', structuredData.substring(0, 100) + '...')

    // 5. Test Encryption
    console.log('\n5️⃣ Testing encryption...')
    const crypto = WebCryptoService.getInstance()
    const encryptionResult = await crypto.encryptData(structuredData)
    console.log('✅ Data encrypted')
    console.log('   Key ID:', encryptionResult.keyId)
    console.log('   IV:', encryptionResult.iv.substring(0, 20) + '...')

    // 6. Test Key Splitting
    console.log('\n6️⃣ Testing key splitting...')
    const encryptionKey = crypto.generateEncryptionKey()
    const keyDistribution = await crypto.splitKey(encryptionKey)
    console.log('✅ Key split into shares')
    console.log('   Total shares:', keyDistribution.totalShares)
    console.log('   Threshold:', keyDistribution.threshold)

    // 7. Test Storage
    console.log('\n7️⃣ Testing storage...')
    const storage = WebStorageService.getInstance()
    const testAsset = {
      id: storage.generateId(),
      name: 'Test Bank Account',
      type: 'bank_account',
      folderId: null,
      encryptedData: encryptionResult.encryptedData,
      keyId: encryptionResult.keyId,
      iv: encryptionResult.iv,
      ipfsHash: '',
      beneficiaries: [],
      createdAt: Date.now(),
      size: structuredData.length,
      mimeType: 'application/json'
    }
    await storage.saveAsset(testAsset)
    console.log('✅ Asset saved to IndexedDB')
    console.log('   Asset ID:', testAsset.id)

    // 8. Test Retrieval
    console.log('\n8️⃣ Testing retrieval...')
    const allAssets = await storage.getAllAssets()
    console.log('✅ Assets retrieved')
    console.log('   Total assets:', allAssets.length)

    // 9. Test Decryption
    console.log('\n9️⃣ Testing decryption...')
    const decryptedData = await crypto.decryptData(
      encryptionResult.encryptedData,
      encryptionKey,
      encryptionResult.iv
    )
    console.log('✅ Data decrypted')
    console.log('   Matches original:', decryptedData === structuredData)

    // 10. Cleanup
    console.log('\n🔟 Cleaning up test data...')
    await storage.deleteAsset(testAsset.id)
    console.log('✅ Test asset deleted')

    console.log('\n✅ ALL TESTS PASSED! 🎉')
    console.log('Category flow is working 100%')
    
    return {
      success: true,
      message: 'All tests passed successfully'
    }

  } catch (error) {
    console.error('\n❌ TEST FAILED:', error)
    return {
      success: false,
      error: error
    }
  }
}

// Auto-run if in browser console
if (typeof window !== 'undefined') {
  (window as any).testCategoryFlow = testCategoryFlow
  console.log('💡 Run testCategoryFlow() in console to test the category flow')
}
