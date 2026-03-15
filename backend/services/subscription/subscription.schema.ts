import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SubscriptionDocument = Subscription & Document;

export enum ServiceMode {
  CENTRALIZED = 'centralized',
  DECENTRALIZED = 'decentralized',
}

export enum PlanType {
  // Centralized
  STARTER = 'starter',
  PROFESSIONAL = 'professional',
  ENTERPRISE = 'enterprise',
  // Decentralized
  FREEDOM = 'freedom',
  SOVEREIGN = 'sovereign',
  IMMORTAL = 'immortal',
}

export enum SubscriptionStatus {
  TRIAL = 'trial',
  ACTIVE = 'active',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled',
  PAST_DUE = 'past_due',
}

@Schema({ timestamps: true })
export class Subscription {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ type: String, enum: ServiceMode, required: true })
  mode: ServiceMode;

  @Prop({ type: String, enum: PlanType, required: true })
  plan: PlanType;

  @Prop({ type: String, enum: SubscriptionStatus, default: SubscriptionStatus.TRIAL })
  status: SubscriptionStatus;

  @Prop({ type: Date })
  trialEndsAt: Date;

  @Prop({ type: Date })
  currentPeriodStart: Date;

  @Prop({ type: Date })
  currentPeriodEnd: Date;

  @Prop({ type: Boolean, default: true })
  canSwitchMode: boolean;

  @Prop()
  stripeCustomerId: string;

  @Prop()
  stripeSubscriptionId: string;

  @Prop({ type: Number, default: 0 })
  assetsCount: number;

  @Prop({ type: Number, default: 0 })
  beneficiariesCount: number;

  @Prop({ type: Number, default: 0 })
  centralizedStorageUsedMB: number;

  @Prop({ type: Number, default: 0 })
  decentralizedStorageUsedMB: number;

  @Prop({ type: Object })
  limits: {
    assets: number;
    beneficiaries: number;
    centralizedStorageMB: number;
    decentralizedStorageMB: number;
  };

  @Prop({ type: [String], default: [] })
  features: string[];

  @Prop({ type: Number })
  price: number;

  @Prop({ type: String, default: 'usd' })
  currency: string;

  @Prop({ type: String, default: 'month' })
  interval: string;

  @Prop({ type: Boolean, default: false })
  autoRenew: boolean;

  @Prop({ type: Date })
  cancelledAt: Date;

  @Prop({ type: String })
  cancellationReason: string;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
