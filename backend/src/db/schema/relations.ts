import { relations } from 'drizzle-orm';
import { users } from './users';
import { folders } from './folders';
import { files } from './files';
import { sharedAccess } from './sharing';
import { heartbeatConfigs } from './heartbeat';
import { beneficiaries } from './beneficiaries';
import { subscriptions } from './subscriptions';
import { userKeys } from './userKeys';
import { userStorageQuotas } from './quotas';

// Users relations
export const usersRelations = relations(users, ({ many, one }) => ({
  folders: many(folders),
  files: many(files),
  sharedAccess: many(sharedAccess),
  heartbeatConfig: one(heartbeatConfigs),
  beneficiaries: many(beneficiaries),
  subscription: one(subscriptions),
  userKeys: many(userKeys),
  quotas: many(userStorageQuotas),
}));

// Folders relations
export const foldersRelations = relations(folders, ({ one, many }) => ({
  user: one(users, {
    fields: [folders.userId],
    references: [users.id],
  }),
  parent: one(folders, {
    fields: [folders.parentId],
    references: [folders.id],
    relationName: 'parentFolder',
  }),
  children: many(folders, {
    relationName: 'parentFolder',
  }),
  files: many(files),
  sharedWith: many(sharedAccess),
}));

// Files relations
export const filesRelations = relations(files, ({ one, many }) => ({
  user: one(users, {
    fields: [files.userId],
    references: [users.id],
  }),
  folder: one(folders, {
    fields: [files.folderId],
    references: [folders.id],
  }),
  sharedWith: many(sharedAccess),
}));

// Shared access relations
export const sharedAccessRelations = relations(sharedAccess, ({ one }) => ({
  user: one(users, {
    fields: [sharedAccess.userId],
    references: [users.id],
  }),
  folder: one(folders, {
    fields: [sharedAccess.folderId],
    references: [folders.id],
  }),
  file: one(files, {
    fields: [sharedAccess.fileId],
    references: [files.id],
  }),
}));

// Heartbeat config relations
export const heartbeatConfigsRelations = relations(heartbeatConfigs, ({ one }) => ({
  user: one(users, {
    fields: [heartbeatConfigs.userId],
    references: [users.id],
  }),
}));

// Beneficiaries relations
export const beneficiariesRelations = relations(beneficiaries, ({ one }) => ({
  user: one(users, {
    fields: [beneficiaries.userId],
    references: [users.id],
  }),
}));

// Subscriptions relations
export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(users, {
    fields: [subscriptions.userId],
    references: [users.id],
  }),
}));

// UserKeys relations
export const userKeysRelations = relations(userKeys, ({ one }) => ({
  user: one(users, {
    fields: [userKeys.userId],
    references: [users.id],
  }),
}));

// UserStorageQuotas relations
export const userStorageQuotasRelations = relations(userStorageQuotas, ({ one }) => ({
  user: one(users, {
    fields: [userStorageQuotas.userId],
    references: [users.id],
  }),
}));

// Export all schemas
export * from './users';
export * from './folders';
export * from './files';
export * from './sharing';
export * from './heartbeat';
export * from './beneficiaries';
export * from './subscriptions';
export * from './keys';
export * from './audit';
export * from './userKeys';
export * from './quotas';
