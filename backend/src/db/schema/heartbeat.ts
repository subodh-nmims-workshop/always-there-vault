import { pgTable, uuid, integer, boolean, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { users } from './users';

export const heartbeatConfigs = pgTable('heartbeat_configs', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid('user_id').notNull().unique().references(() => users.id, { onDelete: 'cascade' }),
  
  intervalDays: integer('interval_days').notNull(), // 7,30,90,180,365
  gracePeriodDays: integer('grace_period_days').notNull(), // 1-30
  bufferMisses: integer('buffer_misses').notNull(), // 1-5
  
  lastHeartbeat: timestamp('last_heartbeat'),
  missedCount: integer('missed_count').notNull().default(0),
  isActive: boolean('is_active').notNull().default(true),
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type HeartbeatConfig = typeof heartbeatConfigs.$inferSelect;
export type NewHeartbeatConfig = typeof heartbeatConfigs.$inferInsert;
