import { pgTable, uuid, varchar, bigint, timestamp, jsonb, boolean, text, index } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  walletAddress: varchar('wallet_address', { length: 42 }).notNull().unique(),
  email: varchar('email', { length: 255 }).unique(),
  name: varchar('name', { length: 100 }),
  
  // Storage quota (500MB default = 524288000 bytes)
  storageQuota: bigint('storage_quota', { mode: 'number' }).notNull().default(524288000),
  storageUsed: bigint('storage_used', { mode: 'number' }).notNull().default(0),
  
  // Storage Engine (Default to Web3 for better decentralization)
  storageEngine: varchar('storage_engine', { length: 20 }).notNull().default('web3'),
  isMigrating: boolean('is_migrating').notNull().default(false),
  isLocked: boolean('is_locked').notNull().default(false),
  
  // Security
  mfaSecret: varchar('mfa_secret', { length: 255 }),
  mfaEnabled: boolean('mfa_enabled').notNull().default(false),
  
  // Advanced Security (2FA + Encryption At Rest)
  twoFactorSecret: text('two_factor_secret'),
  twoFactorEnabled: boolean('two_factor_enabled').default(false),
  recoveryCodes: text('recovery_codes'), // Encrypted JSON array
  
  encryptedEmail: text('encrypted_email'),
  encryptedWallet: text('encrypted_wallet'),
  recoveryAddress: varchar('recovery_address', { length: 42 }).unique(),

  // Notifications
  expoPushToken: varchar('expo_push_token', { length: 255 }),

  // Email Verification
  emailVerified: boolean('email_verified').default(false).notNull(),
  pendingEmail: varchar('pending_email', { length: 255 }),
  emailVerificationToken: varchar('email_verification_token', { length: 255 }),
  emailVerificationTokenExpiresAt: timestamp('email_verification_token_expires_at'),

  // Alternative Email Verification
  alternativeEmail: varchar('alternative_email', { length: 255 }),
  alternativeEmailVerified: boolean('alternative_email_verified').default(false).notNull(),
  alternativePendingEmail: varchar('alternative_pending_email', { length: 255 }),
  alternativeEmailVerificationToken: varchar('alternative_email_verification_token', { length: 255 }),
  alternativeEmailVerificationTokenExpiresAt: timestamp('alternative_email_verification_token_expires_at'),

  // Preferences
  preferences: jsonb('preferences').default({}),
  
  lastActive: timestamp('last_active').defaultNow().notNull(),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => {
  return {
    walletIdx: index('idx_users_wallet').on(sql`LOWER(${table.walletAddress})`),
  };
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
