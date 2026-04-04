import { pgTable, uuid, varchar, timestamp, text } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { users } from './users';

export const userKeys = pgTable('user_keys', {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    encryptedDEK: text('encrypted_dek').notNull(),
    iv: varchar('iv', { length: 255 }).notNull(),
    authTag: varchar('auth_tag', { length: 255 }).notNull(),
    salt: varchar('salt', { length: 255 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type UserKey = typeof userKeys.$inferSelect;
export type NewUserKey = typeof userKeys.$inferInsert;
