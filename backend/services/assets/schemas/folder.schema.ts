import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type FolderDocument = Folder & Document;

@Schema({ timestamps: true })
export class Folder {
    @Prop({ required: true })
    name: string;

    @Prop({ type: Types.ObjectId, ref: 'Folder', default: null })
    parentId: Types.ObjectId | null;

    @Prop({ required: true, index: true })
    ownerWallet: string;

    @Prop([{
        walletAddress: String,
        permission: { type: String, enum: ['READ', 'WRITE', 'ADMIN'], default: 'READ' }
    }])
    sharedWith: { walletAddress: string; permission: string }[];
}

export const FolderSchema = SchemaFactory.createForClass(Folder);
