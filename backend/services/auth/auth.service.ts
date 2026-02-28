import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ethers } from 'ethers';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) { }

    generateNonce(): string {
        // Generate a secure, recognizable sign-in message
        return `Welcome to DeadMan Protocol.\n\nSign this message to prove ownership of this wallet and authorize your session.\n\nNonce: ${Math.floor(Math.random() * 1000000).toString()}\nTimestamp: ${Date.now()}`;
    }

    async verifySignature(walletAddress: string, message: string, signature: string): Promise<{ authenticated: boolean }> {
        try {
            const recoveredAddress = ethers.verifyMessage(message, signature);
            if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
                throw new UnauthorizedException('Invalid signature. Wallet address mismatch.');
            }

            // Register or update the user in DB on successful authentication
            await this.usersService.createOrUpdateUser(walletAddress);

            return { authenticated: true };
        } catch (e) {
            throw new UnauthorizedException('Authentication failed. Signature cannot be verified.');
        }
    }
}
