import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) { }

    async createOrUpdateUser(walletAddress: string, email?: string, interval?: number): Promise<User> {
        const updateData: any = { lastActive: new Date() };
        if (email) updateData.email = email;
        if (interval) updateData.heartbeatInterval = interval;

        return this.userModel.findOneAndUpdate(
            { walletAddress },
            { $set: updateData },
            { new: true, upsert: true } // Upsert creates the document if it doesn't exist
        ).exec();
    }

    async findUserByWallet(walletAddress: string): Promise<User> {
        const user = await this.userModel.findOne({ walletAddress }).exec();
        if (!user) {
            throw new NotFoundException(`User with wallet ${walletAddress} not found`);
        }
        return user;
    }

    async updateLastActive(walletAddress: string): Promise<User> {
        return this.userModel.findOneAndUpdate(
            { walletAddress },
            { $set: { lastActive: new Date() } },
            { new: true }
        ).exec();
    }

    async getAllUsers(): Promise<User[]> {
        return this.userModel.find().exec();
    }
}
