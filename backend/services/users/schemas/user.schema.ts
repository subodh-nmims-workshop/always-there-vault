import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true, unique: true, index: true })
    walletAddress: string;

    @Prop()
    email: string;

    @Prop({ default: 30 }) // Default heartbeat interval in days
    heartbeatInterval: number;

    @Prop({ default: 14 }) // Default grace period in days
    gracePeriod: number;

    @Prop({ type: Date, default: Date.now })
    lastActive: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
