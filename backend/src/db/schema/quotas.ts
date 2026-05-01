import { pgTable, uuid, varchar, bigint, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { users } from './users';

export const userStorageQuotas = pgTable('user_storage_quotas', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  storageType: varchar('storage_type', { length: 20 }).notNull(), // 'cloud' (Centralized) or 'web3' (Decentralized)
  allocatedBytes: bigint('allocated_bytes', { mode: 'number' }).notNull().default(524288000), // 500 MB default
  usedBytes: bigint('used_bytes', { mode: 'number' }).notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type UserStorageQuota = typeof userStorageQuotas.$inferSelect;
export type NewUserStorageQuota = typeof userStorageQuotas.$inferInsert;
