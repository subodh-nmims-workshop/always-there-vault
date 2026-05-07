import { pgTable, uuid, varchar, text, timestamp, boolean } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { users } from './users';
import { beneficiaries } from './beneficiaries';

export const timeCapsules = pgTable('time_capsules', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  beneficiaryId: uuid('beneficiary_id').notNull().references(() => beneficiaries.id, { onDelete: 'cascade' }),
  assetId: varchar('asset_id', { length: 255 }).notNull(), // Client-side asset ID or mapping
  customMessage: text('custom_message'),
  scheduledDate: timestamp('scheduled_date').notNull(),
  isDelivered: boolean('is_delivered').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type TimeCapsule = typeof timeCapsules.$inferSelect;
export type NewTimeCapsule = typeof timeCapsules.$inferInsert;
