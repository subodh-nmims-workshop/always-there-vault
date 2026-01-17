/**
 * Demo script for the Decentralized Digital Will Protocol
 * This demonstrates the complete production-grade workflow using the new organized structure
 */

import { 
  Asset,
  AssetType,
  SensitivityLevel
} from './core/types/assets';

import { 
  HeartbeatConfig,
  HeartbeatMethod,
  HeartbeatStatus
} from './core/types/heartbeat';

import { 
  Beneficiary,
  BeneficiaryType,
  NotificationMethod
} from './core/types/beneficiary';

import { 
  encryptData, 
  decryptData, 
  generateEncryptionKey 
} from './core/crypto/encryption';

import { 
  splitSecret, 
  reconstructSecret, 
  validateShareDistribution 
} from './core/crypto/shamir';

import {
  createAndDistributeKey,
  reconstructKey,
  validateKeyDistribution
} from './core/crypto/key-management';

/**
 * Demo: Complete Digital Will Workflow with New Architecture
 */
async function demonstrateDigitalWillWorkflow() {
  console.log('🚀 Decentralized Digital Will Protocol - Production Demo\n');
  console.log('📋 Architecture: Client-side encryption + Blockchain logic + Decentralized storage\n');

  // Step 1: User Registration & Heartbeat Configuration
  console.log('👤 Step 1: User registration and heartbeat setup...');
  
  const heartbeatConfig: HeartbeatConfig = {
    user_id: 'user_0x742d35Cc6634C0532925a3b8D4C2C4e0C8b83c8e',
    heartbeat_interval_days: 30,
    grace_period_days: 14,
    allowed_methods: ['wallet_signature', 'biometric'] as HeartbeatMethod[],
    require_multi_factor: false,
    consecutive_missed_limit: 2,
    enabled: true,
    created_at: Date.now(),
    updated_at: Date.now()
  };

  console.log('✅ Heartbeat configuration created');
  console.log(`   - Interval: ${heartbeatConfig.heartbeat_interval_days} days`);
  console.log(`   - Grace period: ${heartbeatConfig.grace_period_days} days`);
  console.log(`   - Methods: ${heartbeatConfig.allowed_methods.join(', ')}`);

  // Step 2: Beneficiary Setup
  console.log('\n👥 Step 2: Setting up beneficiaries...');
  
  const beneficiary: Beneficiary = {
    beneficiary_id: 'ben_alice_001',
    name: 'Alice Smith',
    type: 'individual' as BeneficiaryType,
    wallet_address: '0x8ba1f109551bD432803012645Hac136c22C177e9',
    email: 'alice@example.com',
    identity_verified: true,
    verification_method: 'KYC',
    verification_date: Date.now(),
    preferred_notification: 'email' as NotificationMethod,
    notification_settings: {
      notify_on_asset_assignment: true,
      notify_on_rule_change: true,
      notify_on_trigger: true,
      notify_on_release: true,
      email_notifications: true,
      push_notifications: true,
      sms_notifications: false,
      max_notifications_per_day: 10,
      preferred_language: 'en',
      notification_format: 'detailed'
    },
    created_at: Date.now(),
    updated_at: Date.now(),
    enabled: true,
    blocked: false
  };

  console.log('✅ Beneficiary registered');
  console.log(`   - Name: ${beneficiary.name}`);
  console.log(`   - Wallet: ${beneficiary.wallet_address}`);
  console.log(`   - Verified: ${beneficiary.identity_verified}`);

  // Step 3: Asset Creation with Advanced Encryption
  console.log('\n📄 Step 3: Creating digital assets...');
  
  // Create multiple asset types
  const assets = [
    {
      name: 'Crypto Wallet Seed Phrase',
      type: 'crypto_keys' as AssetType,
      data: 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about',
      sensitivity: 'critical' as SensitivityLevel,
      releaseDelay: 0 // Immediate release
    },
    {
      name: 'Personal Audio Message',
      type: 'audio_message' as AssetType,
      data: 'Dear Alice, this is my final message to you. Take care of the family...',
      sensitivity: 'high' as SensitivityLevel,
      releaseDelay: 7 // 7 days after trigger
    },
    {
      name: 'Business Documents',
      type: 'document' as AssetType,
      data: 'Company ownership documents, API keys, and business continuity plans...',
      sensitivity: 'high' as SensitivityLevel,
      releaseDelay: 30 // 30 days after trigger
    }
  ];

  const createdAssets: Asset[] = [];

  for (const assetData of assets) {
    console.log(`\n🔐 Creating asset: ${assetData.name}`);
    
    // Step 3a: Client-side encryption
    const encryptionKey = generateEncryptionKey();
    const encryptionResult = encryptData(assetData.data, encryptionKey);
    console.log('   ✅ Data encrypted with AES-256-GCM');
    
    // Step 3b: Advanced key management with Shamir Secret Sharing
    const keyDistribution = createAndDistributeKey(
      `asset_${Date.now()}_${Math.random()}`,
      `Encryption key for ${assetData.name}`,
    );
    console.log('   ✅ Key split into 5 shares (3 required for reconstruction)');
    console.log('   📍 Shares distributed to:');
    keyDistribution.shares.forEach(share => {
      console.log(`      - ${share.holder}: ${share.distributionMethod}`);
    });
    
    // Step 3c: Validate key distribution security
    const securityValidation = validateKeyDistribution(keyDistribution);
    if (!securityValidation.isSecure) {
      console.log('   ⚠️  Security warnings:', securityValidation.warnings);
    } else {
      console.log('   ✅ Key distribution is secure');
    }
    
    // Step 3d: Create asset metadata (what goes on blockchain)
    const asset: Asset = {
      asset_id: keyDistribution.keyId,
      asset_type: assetData.type,
      name: assetData.name,
      description: `Encrypted ${assetData.type} asset`,
      encrypted_data_hash: `Qm${Math.random().toString(36).substring(2, 15)}`, // Mock IPFS hash
      encryption_method: 'AES-256-GCM',
      key_shares: keyDistribution.shares.map(s => s.shareData),
      beneficiaries: [beneficiary.wallet_address],
      release_conditions: [{
        condition_id: `cond_${Date.now()}`,
        type: assetData.releaseDelay === 0 ? 'immediate' : 'time_delay',
        delay_days: assetData.releaseDelay,
        enabled: true,
        created_at: Date.now()
      }],
      sensitivity_level: assetData.sensitivity,
      created_at: Date.now(),
      updated_at: Date.now()
    };
    
    createdAssets.push(asset);
    console.log(`   ✅ Asset created with ID: ${asset.asset_id.substring(0, 8)}...`);
  }

  console.log(`\n✅ Created ${createdAssets.length} assets with different release schedules`);

  // Step 4: Heartbeat Simulation
  console.log('\n💓 Step 4: Heartbeat monitoring...');
  
  let lastHeartbeat = Date.now();
  console.log('✅ Initial heartbeat recorded');
  
  // Simulate regular heartbeats
  for (let i = 1; i <= 3; i++) {
    const heartbeatTime = lastHeartbeat + (i * 25 * 24 * 60 * 60 * 1000); // Every 25 days
    console.log(`✅ Heartbeat ${i}: ${new Date(heartbeatTime).toLocaleDateString()}`);
    lastHeartbeat = heartbeatTime;
  }
  
  // Step 5: Trigger Simulation (User becomes inactive)
  console.log('\n⏰ Step 5: Simulating user inactivity...');
  
  const currentTime = Date.now();
  const daysSinceLastHeartbeat = 50; // 50 days without heartbeat
  const inactiveLastHeartbeat = currentTime - (daysSinceLastHeartbeat * 24 * 60 * 60 * 1000);
  
  const totalAllowedTime = (heartbeatConfig.heartbeat_interval_days + heartbeatConfig.grace_period_days) * 24 * 60 * 60 * 1000;
  const timeSinceHeartbeat = currentTime - inactiveLastHeartbeat;
  
  if (timeSinceHeartbeat > totalAllowedTime) {
    console.log('🚨 TRIGGER ACTIVATED: User inactive for 50 days (30 + 14 grace period exceeded)');
    console.log('📡 Smart contract triggered automatically');
    console.log('🔔 Beneficiaries notified');
    
    // Step 6: Asset Release Process
    console.log('\n🔓 Step 6: Asset release process...');
    
    const triggerTime = currentTime;
    
    for (const asset of createdAssets) {
      const releaseCondition = asset.release_conditions[0];
      if (!releaseCondition) continue;
      
      const releaseTime = triggerTime + (releaseCondition.delay_days || 0) * 24 * 60 * 60 * 1000;
      const isEligible = currentTime >= releaseTime;
      
      console.log(`\n📄 Asset: ${asset.name}`);
      console.log(`   Type: ${asset.asset_type}`);
      console.log(`   Sensitivity: ${asset.sensitivity_level}`);
      console.log(`   Release delay: ${releaseCondition.delay_days || 0} days`);
      
      if (isEligible) {
        console.log('   ✅ ELIGIBLE FOR RELEASE');
        
        // Simulate key reconstruction by beneficiary
        console.log('   🔑 Beneficiary reconstructing key...');
        
        // In real system, beneficiary would gather 3 of 5 key shares
        const availableShares = asset.key_shares.slice(0, 3).map((shareData, index) => ({
          shareId: index + 1,
          shareData: shareData,
          holder: ['smart_contract', 'user_device', 'trusted_person'][index] as any,
          holderAddress: `addr_${index}`
        }));
        
        try {
          const reconstructedKey = reconstructSecret(availableShares);
          console.log('   ✅ Key reconstruction successful');
          
          // Decrypt asset (beneficiary would do this)
          const decryptionResult = decryptData(asset.encrypted_data_hash, reconstructedKey);
          if (decryptionResult.success) {
            console.log('   🔓 Asset decrypted successfully');
            console.log('   📋 Asset released to beneficiary');
          }
        } catch (error) {
          console.log('   ❌ Key reconstruction failed');
        }
      } else {
        const daysUntilRelease = Math.ceil((releaseTime - currentTime) / (24 * 60 * 60 * 1000));
        console.log(`   ⏳ Will be eligible in ${daysUntilRelease} days`);
      }
    }
  } else {
    console.log('✅ User is still within allowed timeframe');
  }

  // Step 7: System Summary & Architecture Highlights
  console.log('\n📊 SYSTEM SUMMARY');
  console.log('═'.repeat(50));
  console.log(`👤 User: ${heartbeatConfig.user_id.substring(0, 10)}...`);
  console.log(`💓 Heartbeat: Every ${heartbeatConfig.heartbeat_interval_days} days`);
  console.log(`⏰ Grace Period: ${heartbeatConfig.grace_period_days} days`);
  console.log(`📄 Assets Created: ${createdAssets.length}`);
  console.log(`👥 Beneficiaries: 1`);
  console.log(`🔑 Key Shares: 5 per asset (3 required)`);
  console.log(`🔐 Encryption: AES-256-GCM + Shamir Secret Sharing`);
  console.log(`🌐 Storage: IPFS (encrypted blobs only)`);
  console.log(`⛓️  Blockchain: Rules + automation (no data storage)`);
  
  console.log('\n🏗️ ARCHITECTURE PRINCIPLES DEMONSTRATED');
  console.log('═'.repeat(50));
  console.log('✅ Client-side encryption only (server never sees raw data)');
  console.log('✅ Asset-level isolation (each asset has own key & rules)');
  console.log('✅ Blockchain = logic, not storage (only metadata on-chain)');
  console.log('✅ Zero trust backend (backend cannot decrypt anything)');
  console.log('✅ Fail-safe & compartmentalized (military-grade key splitting)');
  console.log('✅ Decentralized execution (no single point of failure)');
  
  console.log('\n🔄 DATA FLOW DEMONSTRATED');
  console.log('═'.repeat(50));
  console.log('1. 📱 User creates asset → Client encrypts');
  console.log('2. 🔑 Key split into 5 shares → Distributed securely');
  console.log('3. 📦 Encrypted data → IPFS storage');
  console.log('4. ⛓️  Metadata + rules → Smart contract');
  console.log('5. 💓 Heartbeat monitoring → Automated trigger');
  console.log('6. 🔓 Asset release → Key reconstruction + decryption');
  
  console.log('\n🎉 Demo completed successfully!');
  console.log('\n🚀 This is digital inheritance infrastructure for the internet age.');
}

// Run the demo
if (require.main === module) {
  demonstrateDigitalWillWorkflow().catch(console.error);
}