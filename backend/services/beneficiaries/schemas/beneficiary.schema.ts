import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BeneficiaryDocument = Beneficiary & Document;

@Schema({ timestamps: true })
export class Beneficiary {
    @Prop({ required: true, unique: true, index: true })
    nomineeId: string;

    @Prop({ required: true, index: true })
    ownerWallet: string; // User who designated this nominee

    @Prop()
    walletAddress: string;

    @Prop()
    email: string;

    @Prop()
    relation: string;

    @Prop({ default: 'standard' })
    accessLevel: string; // Folder-specific permissions override level
}

export const BeneficiarySchema = SchemaFactory.createForClass(Beneficiary);
