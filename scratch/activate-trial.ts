import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq } from 'drizzle-orm';
import * as dotenv from 'dotenv';
import { users } from './backend/src/db/schema/users';
import { subscriptions } from './backend/src/db/schema/subscriptions';

dotenv.config({ path: './backend/.env' });

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/deadman';
const client = postgres(connectionString);
const db = drizzle(client, { schema: { users, subscriptions } });

async function activateTrial(walletAddress: string) {
    console.log(`Searching for user with wallet: ${walletAddress}`);
    const user = await db.query.users.findFirst({
        where: eq(users.walletAddress, walletAddress)
    });

    if (!user) {
        console.error('User not found');
        process.exit(1);
    }

    console.log(`User found: ${user.id}. Activating Pro Trial...`);

    await db.insert(subscriptions).values({
        userId: user.id,
        planId: 'pro_trial',
        planName: 'Professional Trial',
        storageLimit: 10 * 1024 * 1024 * 1024, // 10GB
        billingCycle: 'MONTHLY',
        price: '0',
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        status: 'ACTIVE'
    }).onConflictDoUpdate({
        target: [subscriptions.userId],
        set: {
            planId: 'pro_trial',
            planName: 'Professional Trial',
            status: 'ACTIVE',
            updatedAt: new Date()
        }
    });

    console.log('✅ Professional Trial activated successfully!');
    process.exit(0);
}

activateTrial('0xFF38De9C8f7B6A4cf810EAcE53D3E8EA9Dac1178');
