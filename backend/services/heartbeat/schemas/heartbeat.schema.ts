import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HeartbeatLogDocument = HeartbeatLog & Document;

@Schema({ timestamps: true })
export class HeartbeatLog {
    @Prop({ required: true, index: true })
    userWallet: string;

    @Prop({ required: true, type: Date })
    lastPingTime: Date;

    @Prop({ required: true })
    method: string; // e.g., 'Transaction', 'Login', 'Manual Ping'
}

export const HeartbeatLogSchema = SchemaFactory.createForClass(HeartbeatLog);
