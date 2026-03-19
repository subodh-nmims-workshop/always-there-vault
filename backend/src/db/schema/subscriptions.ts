import { pgTable, uuid, varchar, bigint, decimal, boolean, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { users } from './users';

export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  userId: uuid('user_id').notNull().unique().references(() => users.id, { onDelete: 'cascade' }),
  
  planId: varchar('plan_id', { length: 50 }).notNull(), // free, premium_10, pro_100
  planName: varchar('plan_name', { length: 50 }).notNull(),
  storageLimit: bigint('storage_limit', { mode: 'number' }).notNull(),
  
  billingCycle: varchar('billing_cycle', { length: 20 }), // MONTHLY, QUARTERLY, YEARLY
  price: decimal('price', { precision: 10, scale: 2 }),
  currency: varchar('currency', { length: 3 }).default('USD'),
  
  stripeCustomerId: varchar('stripe_customer_id', { length: 255 }),
  stripeSubscriptionId: varchar('stripe_subscription_id', { length: 255 }),
  
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date'),
  autoRenew: boolean('auto_renew').notNull().default(true),
  status: varchar('status', { length: 20 }).notNull().default('ACTIVE'), // ACTIVE, EXPIRED, CANCELLED
  
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Subscription = typeof subscriptions.$inferSelect;
export type NewSubscription = typeof subscriptions.$inferInsert;
