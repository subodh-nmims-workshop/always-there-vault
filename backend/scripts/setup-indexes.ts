/**
 * Database Index Setup Script
 * Run this to create optimized indexes for MongoDB collections
 */

import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://admin:password@127.0.0.1:27017/digital-will?authSource=admin';

async function setupIndexes() {
  console.log('🔧 Setting up database indexes...\n');

  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB\n');

    const db = client.db();

    // Users Collection Indexes
    console.log('📊 Creating indexes for users collection...');
    await db.collection('users').createIndex({ walletAddress: 1 }, { unique: true });
    await db.collection('users').createIndex({ email: 1 }, { sparse: true });
    await db.collection('users').createIndex({ createdAt: -1 });
    console.log('✅ Users indexes created\n');

    // Assets Collection Indexes
    console.log('📊 Creating indexes for assets collection...');
    await db.collection('assets').createIndex({ ownerWallet: 1 });
    await db.collection('assets').createIndex({ assetId: 1 }, { unique: true });
    await db.collection('assets').createIndex({ category: 1 });
    await db.collection('assets').createIndex({ createdAt: -1 });
    await db.collection('assets').createIndex({ ownerWallet: 1, category: 1 });
    await db.collection('assets').createIndex({ nomineeIds: 1 });
    console.log('✅ Assets indexes created\n');

    // Beneficiaries Collection Indexes
    console.log('📊 Creating indexes for beneficiaries collection...');
    await db.collection('beneficiaries').createIndex({ ownerWallet: 1 });
    await db.collection('beneficiaries').createIndex({ nomineeId: 1 }, { unique: true });
    await db.collection('beneficiaries').createIndex({ email: 1 });
    await db.collection('beneficiaries').createIndex({ walletAddress: 1 }, { sparse: true });
    console.log('✅ Beneficiaries indexes created\n');

    // Heartbeat Logs Collection Indexes
    console.log('📊 Creating indexes for heartbeat logs collection...');
    await db.collection('heartbeatlogs').createIndex({ userWallet: 1 });
    await db.collection('heartbeatlogs').createIndex({ lastPingTime: -1 });
    await db.collection('heartbeatlogs').createIndex({ userWallet: 1, lastPingTime: -1 });
    console.log('✅ Heartbeat logs indexes created\n');

    // Subscriptions Collection Indexes
    console.log('📊 Creating indexes for subscriptions collection...');
    await db.collection('subscriptions').createIndex({ userId: 1 }, { unique: true });
    await db.collection('subscriptions').createIndex({ status: 1 });
    await db.collection('subscriptions').createIndex({ trialEndsAt: 1 });
    await db.collection('subscriptions').createIndex({ currentPeriodEnd: 1 });
    await db.collection('subscriptions').createIndex({ stripeCustomerId: 1 }, { sparse: true });
    await db.collection('subscriptions').createIndex({ stripeSubscriptionId: 1 }, { sparse: true });
    console.log('✅ Subscriptions indexes created\n');

    // Release Logs Collection Indexes
    console.log('📊 Creating indexes for release logs collection...');
    await db.collection('releaselogs').createIndex({ ownerWallet: 1 });
    await db.collection('releaselogs').createIndex({ nomineeWallet: 1 });
    await db.collection('releaselogs').createIndex({ releaseTime: -1 });
    await db.collection('releaselogs').createIndex({ status: 1 });
    console.log('✅ Release logs indexes created\n');

    console.log('🎉 All indexes created successfully!');
    console.log('\n📊 Index Summary:');
    console.log('   - Users: 3 indexes');
    console.log('   - Assets: 6 indexes');
    console.log('   - Beneficiaries: 4 indexes');
    console.log('   - Heartbeat Logs: 3 indexes');
    console.log('   - Subscriptions: 6 indexes');
    console.log('   - Release Logs: 4 indexes');
    console.log('   Total: 26 indexes\n');

  } catch (error) {
    console.error('❌ Error setting up indexes:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('✅ Database connection closed');
  }
}

// Run the setup
setupIndexes()
  .then(() => {
    console.log('\n✨ Index setup complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Index setup failed:', error);
    process.exit(1);
  });
