import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UsersService } from '../users/users.service';
import { HeartbeatService } from './heartbeat.service';
import { BlockchainService } from '../blockchain/blockchain.service';

@Injectable()
export class HeartbeatCronService {
    private readonly logger = new Logger(HeartbeatCronService.name);

    constructor(
        private readonly usersService: UsersService,
        private readonly heartbeatService: HeartbeatService,
        private readonly blockchainService: BlockchainService,
    ) { }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT) // Runs exactly at Midnight everyday UTC
    async handleCron() {
        this.logger.log('Starting daily Heartbeat Monitor check...');

        try {
            const users = await this.usersService.getAllUsers();
            const now = new Date();

            for (const user of users) {
                // Fallback to 30 days if not set
                const intervalDays = user.heartbeatInterval || 30;

                const diffMs = now.getTime() - new Date(user.lastActive).getTime();
                const diffDays = diffMs / (1000 * 60 * 60 * 24);

                if (diffDays > intervalDays) {
                    this.logger.warn(`User ${user.walletAddress} has MISSED heartbeat (${Math.floor(diffDays)} days inactive). Triggering deadman switch...`);
                    try {
                        await this.blockchainService.triggerDeadman(user.walletAddress);
                        this.logger.log(`Successfully triggered on-chain deadman protocol for ${user.walletAddress}`);
                    } catch (e) {
                        this.logger.error(`Failed to trigger on-chain deadman for ${user.walletAddress}: ${e.message}`);
                    }
                }
            }
            this.logger.log('Heartbeat monitoring cycle completed successfully.');
        } catch (e) {
            this.logger.error(`Error during Heartbeat Cron execution: ${e.message}`);
        }
    }
}
