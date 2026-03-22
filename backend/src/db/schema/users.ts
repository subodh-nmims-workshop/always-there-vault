import { pgTable, uuid, varchar, bigint, timestamp, jsonb, boolean } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  walletAddress: varchar('wallet_address', { length: 42 }).notNull().unique(),
  email: varchar('email', { length: 255 }).unique(),
  name: varchar('name', { length: 100 }),
  
  // Storage quota (500MB default = 524288000 bytes)
  storageQuota: bigint('storage_quota', { mode: 'number' }).notNull().default(524288000),
  storageUsed: bigint('storage_used', { mode: 'number' }).notNull().default(0),
  
  // Storage Engine
  storageEngine: varchar('storage_engine', { length: 20 }).notNull().default('cloud'),
  isMigrating: boolean('is_migrating').notNull().default(false),
  
  // Preferences
  preferences: jsonb('preferences').default({}),
  
  lastActive: timestamp('last_active').defaultNow().notNull(),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
