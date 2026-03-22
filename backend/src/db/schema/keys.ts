import { pgTable, varchar, jsonb, timestamp } from 'drizzle-orm/pg-core';

export const keyDistributions = pgTable('key_distributions', {
  keyId: varchar('key_id', { length: 255 }).primaryKey(),
  shares: jsonb('shares').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type KeyDistribution = typeof keyDistributions.$inferSelect;
export type NewKeyDistribution = typeof keyDistributions.$inferInsert;
