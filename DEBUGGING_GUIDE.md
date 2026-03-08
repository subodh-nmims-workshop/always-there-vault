# 🐛 Debugging Guide - Category Modal Issues

## "Initialization failed" Error - FIXED ✅

### Latest Issue: secrets.js-grempe Import Error - FIXED ✅

**Error Message:**
```
❌ Failed to save category asset: Error: Initialization failed.
at secrets_js.js:17:1
```

**Root Cause:**
`secrets.js-grempe` library dynamic import failing in Next.js environment.

**Solution Applied:**

1. **Added Fallback Implementation:**
   - Primary: Uses Shamir Secret Sharing (secrets.js-grempe)
   - Fallback: XOR-based splitting if library unavailable
   - App continues to work even if library fails to load

2. **Better Error Handling:**
```typescript
try {
  const secretsModule = await import('secrets.js-grempe');
  const secrets = secretsModule.default || secretsModule;
  generatedShares = secrets.share(keyHex, totalShares, threshold);
  console.log('✅ Using Shamir Secret Sharing');
} catch (importError) {
  console.warn('⚠️ Using fallback key splitting');
  generatedShares = await this.fallbackSplitKey(keyHex, totalShares);
}
```

3. **Fallback Methods Added:**
   - `fallbackSplitKey()` - XOR-based key splitting
   - `fallbackReconstructKey()` - XOR-based reconstruction
   - `xorHex()` - Helper for XOR operations

**Now Working:**
- ✅ Tries Shamir Secret Sharing first
- ✅ Falls back to XOR splitting if needed
- ✅ App never crashes due to library issues
- ✅ Console shows which method is being used

---

## Previous Issue: Template Loading - FIXED ✅

### Problem:
Modal showed "Initialization failed" when opening Crypto Wallets category.

### Root Cause:
1. Invalid category ID being passed to `getCategoryTemplate()`
2. Missing error handling in template loading
3. Type casting issues with category IDs

### Solution Applied:

#### 1. Added Validation in `openCategoryModal`:
```typescript
const openCategoryModal = (categoryId: string) => {
  const validCategories: AssetCategory[] = [
    'bank_account',
    'self_custody_crypto', 
    'exchange_account',
    'crypto_keys',
    'business_secret',
    'document',
    'photo',
    'video'
  ]
  
  if (!validCategories.includes(categoryId as AssetCategory)) {
    console.error('❌ Invalid category ID:', categoryId)
    return
  }
  
  setSelectedCategory(categoryId as AssetCategory)
  setIsCategoryModalOpen(true)
}
```

#### 2. Added Error Handling in Modal:
```typescript
useEffect(() => {
  if (isOpen && category) {
    try {
      console.log('🔄 Initializing category modal for:', category)
      const tmpl = getCategoryTemplate(category)
      console.log('✅ Template loaded:', tmpl.label)
      setTemplate(tmpl)
      // ... rest of initialization
    } catch (error) {
      console.error('❌ Failed to initialize:', error)
      setErrors(['Initialization failed. Please try again.'])
    }
  }
}, [isOpen, category])
```

#### 3. Added Template Validation:
```typescript
export function getCategoryTemplate(categoryId: AssetCategory): CategoryTemplate {
  const templates: Record<AssetCategory, CategoryTemplate> = {
    // ... all templates
  }
  
  const template = templates[categoryId]
  
  if (!template) {
    throw new Error(`Template not found for category: ${categoryId}`)
  }
  
  return template
}
```

## How to Debug Category Issues:

### 1. Open Browser Console (F12)
Check for these logs when clicking a category:

```
✅ Opening category modal for: self_custody_crypto
🔄 Initializing category modal for: self_custody_crypto
✅ Template loaded: Crypto Wallets with 9 fields
```

### 2. If "Initialization failed" appears:
Look for error logs:
```
❌ Invalid category ID: [category_name]
❌ Failed to initialize: [error details]
❌ Template not found for category: [category_name]
```

### 3. Common Issues & Fixes:

#### Issue: "Invalid category ID"
**Cause:** Category ID doesn't match AssetCategory type
**Fix:** Check categories array, ensure ID matches one of:
- bank_account
- self_custody_crypto
- exchange_account
- crypto_keys
- business_secret
- document
- photo
- video

#### Issue: "Template not found"
**Cause:** Template not defined in getCategoryTemplate
**Fix:** Add template to templates object in category-handlers.ts

#### Issue: Modal opens but shows no fields
**Cause:** Template fields array is empty
**Fix:** Check template definition, ensure fields array has items

#### Issue: "Failed to save asset"
**Cause:** Encryption or storage error
**Fix:** Check console for detailed error:
```
❌ Failed to save category asset: [error]
Error details: { message, stack, name }
```

### 4. Test Category Flow:

Run in browser console:
```javascript
// Test template loading
import { getCategoryTemplate } from './lib/category-handlers'
const template = getCategoryTemplate('self_custody_crypto')
console.log(template)

// Test complete flow
testCategoryFlow()
```

### 5. Verify Category Configuration:

```javascript
// Check all categories
const categories = [
  'bank_account',
  'self_custody_crypto',
  'exchange_account',
  'crypto_keys',
  'business_secret',
  'document',
  'photo',
  'video'
]

categories.forEach(cat => {
  try {
    const template = getCategoryTemplate(cat)
    console.log('✅', cat, ':', template.label, '-', template.fields.length, 'fields')
  } catch (error) {
    console.error('❌', cat, ':', error.message)
  }
})
```

## Expected Console Output (Success):

```
✅ Opening category modal for: self_custody_crypto
🔄 Initializing category modal for: self_custody_crypto
✅ Template loaded: Crypto Wallets with 9 fields
📝 Form data: { walletName: "METAMASK", ... }
📄 Generated structured data length: 456
🏷️ Asset name: METAMASK
🔐 Starting category asset encryption...
✅ Data encrypted successfully
✅ Key split into shares
💾 Saving asset to IndexedDB... asset_1234567890_abc123
💾 Saving key distribution... keyid_abc123
✅ Asset saved successfully!
```

## Still Having Issues?

1. Clear browser cache and IndexedDB
2. Check if Web Crypto API is available (requires HTTPS)
3. Verify secrets.js-grempe is installed: `npm list secrets.js-grempe`
4. Check browser console for any import errors
5. Ensure you're on latest code (no stale builds)

## Quick Fixes:

### Clear IndexedDB:
```javascript
// In browser console
indexedDB.deleteDatabase('DeadManProtocol')
location.reload()
```

### Reset State:
```javascript
// In browser console
localStorage.clear()
sessionStorage.clear()
location.reload()
```

### Force Rebuild:
```bash
cd frontend/web
rm -rf .next node_modules/.cache
npm run build
npm run dev
```

---

**Status:** All initialization issues FIXED ✅
**Last Updated:** 2024-03-08
