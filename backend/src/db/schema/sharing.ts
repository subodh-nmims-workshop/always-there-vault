import { pgTable, uuid, varchar, timestamp, check, primaryKey } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { users } from './users';
import { folders } from './folders';
import { files } from './files';

export const sharedAccess = pgTable('shared_access', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  folderId: uuid('folder_id').references(() => folders.id, { onDelete: 'cascade' }),
  fileId: uuid('file_id').references(() => files.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  permission: varchar('permission', { length: 20 }).notNull().default('READ'), // READ, WRITE, ADMIN
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type SharedAccess = typeof sharedAccess.$inferSelect;
export type NewSharedAccess = typeof sharedAccess.$inferInsert;
