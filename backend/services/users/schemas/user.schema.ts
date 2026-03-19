import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true, unique: true, index: true })
    walletAddress: string;

    @Prop()
    email: string;

    @Prop()
    name: string;

    @Prop({ default: 30 }) // Default heartbeat interval in days
    heartbeatInterval: number;

    @Prop({ default: 14 }) // Default grace period in days
    gracePeriod: number;

    @Prop({ type: Date, default: Date.now })
    lastActive: Date;

    @Prop({ default: 0 })
    storageUsed: number; // in bytes

    @Prop({ default: 524288000 }) // 500MB in bytes
    storageQuota: number;

    @Prop({ default: 'FREE' })
    subscriptionPlan: string; // FREE, PREMIUM, PRO

    @Prop({ default: 'MONTHLY' })
    billingCycle: string; // MONTHLY, QUARTERLY, YEARLY

    @Prop({ default: 0 })
    missedHeartbeats: number; // current buffer count

    @Prop({ default: 1 })
    heartbeatBuffer: number; // max allowed missed heartbeats before trigger
}

export const UserSchema = SchemaFactory.createForClass(User);
