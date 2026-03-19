import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { users, type User, type NewUser } from '../../src/db/schema/users';
import { eq, sql } from 'drizzle-orm';

@Injectable()
export class UsersService {
    constructor(
        @Inject('DRIZZLE_DB') private db: any,
    ) { }

    async createOrUpdateUser(walletAddress: string, email?: string): Promise<User> {
        const existingUser = await this.db.query.users.findFirst({
            where: eq(users.walletAddress, walletAddress),
        });

        if (existingUser) {
            const [updatedUser] = await this.db.update(users)
                .set({
                    email: email || existingUser.email,
                    updatedAt: new Date(),
                    // lastActive: new Date(), // If we have this field
                })
                .where(eq(users.walletAddress, walletAddress))
                .returning();
            return updatedUser;
        }

        const [newUser] = await this.db.insert(users)
            .values({
                walletAddress,
                email,
            } as NewUser)
            .returning();
        return newUser;
    }

    async findUserByWallet(walletAddress: string): Promise<User> {
        const user = await this.db.query.users.findFirst({
            where: eq(users.walletAddress, walletAddress),
        });
        if (!user) {
            throw new NotFoundException(`User with wallet ${walletAddress} not found`);
        }
        return user;
    }

    async checkAndIncrementStorage(walletAddress: string, additionalBytes: number): Promise<boolean> {
        const user = await this.findUserByWallet(walletAddress);
        
        if (user.storageUsed + additionalBytes > user.storageQuota) {
            return false;
        }

        await this.db.update(users)
            .set({ storageUsed: sql`${users.storageUsed} + ${additionalBytes}` })
            .where(eq(users.walletAddress, walletAddress));
        return true;
    }

    async decrementStorage(walletAddress: string, bytes: number): Promise<void> {
        await this.db.update(users)
            .set({ storageUsed: sql`${users.storageUsed} - ${bytes}` })
            .where(eq(users.walletAddress, walletAddress));
    }

    async getAllUsers(): Promise<User[]> {
        return this.db.query.users.findMany();
    }
}
