import { pgTable, uuid, varchar, bigint, boolean, timestamp, jsonb, text } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { users } from './users';
import { folders } from './folders';
import { beneficiaries } from './beneficiaries';

export const files = pgTable('files', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  name: varchar('name', { length: 255 }).notNull(),
  size: bigint('size', { mode: 'number' }).notNull(),
  mimeType: varchar('mime_type', { length: 100 }),

  // Storage info
  cid: varchar('cid', { length: 255 }), // IPFS CID
  location: varchar('location', { length: 255 }), // Local path or IPFS CID
  isIpfs: boolean('is_ipfs').notNull().default(false),
  encrypted: boolean('encrypted').notNull().default(true),
  encryptionKeyId: varchar('encryption_key_id', { length: 255 }),
  
  // Advanced Encryption (Envelope Encryption)
  encryptedFEK: text('encrypted_fek'),
  fekIv: varchar('fek_iv', { length: 255 }),
  fekAuthTag: varchar('fek_auth_tag', { length: 255 }),
  fileIv: varchar('file_iv', { length: 255 }),
  fileAuthTag: varchar('file_auth_tag', { length: 255 }),
  
  encryptedData: text('encrypted_data'), // For small assets / notes

  // Metadata
  metadata: jsonb('metadata').default({}),

  // Relations
  folderId: uuid('folder_id').references(() => folders.id, { onDelete: 'set null' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),

  // Inheritance assignment — which nominee receives this specific file on protocol trigger
  assignedBeneficiaryId: uuid('assigned_beneficiary_id').references(() => beneficiaries.id, { onDelete: 'set null' }),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type File = typeof files.$inferSelect;
export type NewFile = typeof files.$inferInsert;
