import { pgTable, uuid, varchar, timestamp, boolean, pgEnum } from 'drizzle-orm/pg-core';
import { users } from './users';

export const tokenTypeEnum = pgEnum('token_type', ['HEARTBEAT_VERIFY', 'EMAIL_VERIFY', 'CLAIM_ACCESS']);

export const verificationTokens = pgTable('verification_tokens', {
  id: uuid('id').defaultRandom().primaryKey(),
  token: varchar('token', { length: 255 }).notNull().unique(),
  type: tokenTypeEnum('type').notNull(),
  userId: uuid('user_id').references(() => users.id),
  targetAddress: varchar('target_address', { length: 255 }), // Can be wallet address of the owner or beneficiary
  expiresAt: timestamp('expires_at').notNull(),
  isUsed: boolean('is_used').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
