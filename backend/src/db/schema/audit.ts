import { pgTable, uuid, varchar, text, jsonb, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { users } from './users';

export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  action: varchar('action', { length: 100 }).notNull(),
  resourceType: varchar('resource_type', { length: 50 }).notNull(), // 'FILE', 'FOLDER', 'USER', etc.
  resourceId: varchar('resource_id', { length: 255 }),
  details: jsonb('details').default({}),
  ipAddress: varchar('ip_address', { length: 50 }),
  userAgent: text('user_agent'),
  status: varchar('status', { length: 20 }).default('SUCCESS'),
  error: text('error'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type AuditLog = typeof auditLogs.$inferSelect;
export type NewAuditLog = typeof auditLogs.$inferInsert;
