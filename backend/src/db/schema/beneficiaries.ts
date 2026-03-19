import { pgTable, uuid, varchar, integer, boolean, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { users } from './users';

export const beneficiaries = pgTable('beneficiaries', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  
  walletAddress: varchar('wallet_address', { length: 42 }).notNull(),
  email: varchar('email', { length: 255 }),
  name: varchar('name', { length: 100 }),
  
  sharePercentage: integer('share_percentage').notNull(), // 1-100
  relationship: varchar('relationship', { length: 50 }),
  
  isVerified: boolean('is_verified').notNull().default(false),
  isActive: boolean('is_active').notNull().default(true),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Beneficiary = typeof beneficiaries.$inferSelect;
export type NewBeneficiary = typeof beneficiaries.$inferInsert;
