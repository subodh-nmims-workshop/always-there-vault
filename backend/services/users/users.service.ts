import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) { }

    async createOrUpdateUser(walletAddress: string, email?: string, interval?: number, gracePeriod?: number): Promise<User> {
        const updateData: any = { lastActive: new Date() };
        if (email) updateData.email = email;
        if (interval !== undefined) updateData.heartbeatInterval = interval;
        if (gracePeriod !== undefined) updateData.gracePeriod = gracePeriod;

        return this.userModel.findOneAndUpdate(
            { walletAddress },
            { $set: updateData },
            { new: true, upsert: true } // Upsert creates the document if it doesn't exist
        ).exec();
    }

    async updateHeartbeatSettings(walletAddress: string, interval: number, gracePeriod: number): Promise<User> {
        const updateData = { heartbeatInterval: interval, gracePeriod: gracePeriod };

        return this.userModel.findOneAndUpdate(
            { walletAddress },
            { $set: updateData },
            { new: true, upsert: true }
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

    async checkAndIncrementStorage(walletAddress: string, additionalBytes: number): Promise<boolean> {
        const user = await this.userModel.findOne({ walletAddress }).exec();
        if (!user) {
            // If user doesn't exist, they are on FREE plan with 500MB
            const newUser = await this.createOrUpdateUser(walletAddress);
            if (additionalBytes > newUser.storageQuota) return false;
            await this.userModel.findOneAndUpdate(
                { walletAddress },
                { $inc: { storageUsed: additionalBytes } }
            ).exec();
            return true;
        }

        if (user.storageUsed + additionalBytes > user.storageQuota) {
            return false;
        }

        await this.userModel.findOneAndUpdate(
            { walletAddress },
            { $inc: { storageUsed: additionalBytes } }
        ).exec();
        return true;
    }

    async decrementStorage(walletAddress: string, bytes: number): Promise<void> {
        await this.userModel.findOneAndUpdate(
            { walletAddress },
            { $inc: { storageUsed: -bytes } }
        ).exec();
    }

    async incrementMissedHeartbeats(walletAddress: string): Promise<void> {
        await this.userModel.findOneAndUpdate(
            { walletAddress },
            { $inc: { missedHeartbeats: 1 } }
        ).exec();
    }

    async resetMissedHeartbeats(walletAddress: string): Promise<void> {
        await this.userModel.findOneAndUpdate(
            { walletAddress },
            { $set: { missedHeartbeats: 0 } }
        ).exec();
    }

    async getAllUsers(): Promise<User[]> {
        return this.userModel.find().exec();
    }
}
