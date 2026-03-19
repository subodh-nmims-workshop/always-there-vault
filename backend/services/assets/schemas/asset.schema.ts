import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AssetDocument = Asset & Document;

@Schema({ timestamps: true })
export class Asset {
    @Prop({ required: true, unique: true, index: true })
    assetId: string;

    @Prop({ required: true })
    type: string; // e.g., 'File', 'Crypto Wallet', 'Note'

    @Prop()
    cid: string; // IPFS Hash of the encrypted payload

    @Prop({ required: true, index: true })
    ownerWallet: string;

    @Prop({ type: Object })
    encryptedKeyShares: Record<string, string>; // Role -> Encrypted Share

    @Prop({ default: 0 })
    size: number; // in bytes

    @Prop([String])
    nomineeIds: string[]; // Array of assigned nominee IDs

    @Prop({ type: Object })
    releaseConditions: Record<string, any>; // Conditions like missed heartbeat

    @Prop()
    parentFolderId: string; // Supports hierarchical nested folder system

    @Prop({ default: 'active' })
    status: string; // e.g., 'active', 'released', 'revoked'
}

export const AssetSchema = SchemaFactory.createForClass(Asset);
