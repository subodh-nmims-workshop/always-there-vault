import { Injectable, Inject, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UsersService } from '../users/users.service';
import { HeartbeatService } from './heartbeat.service';
import { BlockchainService } from '../blockchain/blockchain.service';
import { EmailService } from '../email/email.service';
import { eq, sql } from 'drizzle-orm';
import { heartbeatConfigs } from '../../src/db/schema/heartbeat';

@Injectable()
export class HeartbeatCronService {
    private readonly logger = new Logger(HeartbeatCronService.name);

    constructor(
        @Inject('DRIZZLE_DB') private db: any,
        private readonly usersService: UsersService,
        private readonly heartbeatService: HeartbeatService,
        private readonly blockchainService: BlockchainService,
        private readonly emailService: EmailService,
    ) { }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async handleCron() {
        this.logger.log('🚀 Starting daily Heartbeat Monitor check...');

        try {
            const users = await this.usersService.getAllUsers();
            this.logger.log(`Scanning ${users.length} users...`);

            for (const user of users) {
                const status = await this.heartbeatService.getHeartbeatStatus(user.walletAddress);
                
                // Get config
                const config = await this.db.query.heartbeatConfigs.findFirst({
                    where: eq(heartbeatConfigs.userId, user.id),
                });

                if (!config) continue;

                if (status.status === 'overdue') {
                    const currentMisses = config.missedCount || 0;
                    const maxBuffer = config.bufferMisses || 3; // Default to 3 stages (Missed1, Missed2, Missed3)

                    if (currentMisses < maxBuffer) {
                        await this.db.update(heartbeatConfigs)
                            .set({ missedCount: sql`${heartbeatConfigs.missedCount} + 1` })
                            .where(eq(heartbeatConfigs.userId, user.id));
                        
                        const newMissCount = currentMisses + 1;
                        this.logger.warn(`User ${user.walletAddress} missed heartbeat. Stage: Missed${newMissCount} (${newMissCount}/${maxBuffer})`);

                        if (user.email) {
                            let subject = '';
                            let messageHtml = '';

                            if (newMissCount === 1) {
                                subject = '⚠️ First Notice: Heartbeat Missed';
                                messageHtml = `<h2>First Notice: Heartbeat Missed</h2><p>You have missed your scheduled heartbeat. Please log in with your wallet to sign a heartbeat transaction to prevent your will from triggering.</p>`;
                            } else if (newMissCount === 2) {
                                subject = '🚨 Second Notice: Final Warning';
                                messageHtml = `<h2>Final Warning: Action Required Immediately</h2><p>This is your second missed heartbeat. If you do not sign a heartbeat soon, the DeadMan Protocol will initiate the Grace Period and your assets will be distributed.</p>`;
                            } else {
                                subject = `⚠️ Heartbeat Missed - Stage ${newMissCount}`;
                                messageHtml = `<h2>Action Required: Heartbeat Missed</h2><p>Notice ${newMissCount} of ${maxBuffer}. Please authenticate immediately.</p>`;
                            }

                            await this.emailService.sendEmail({
                                to: user.email,
                                subject,
                                html: messageHtml
                            });
                        }
                    } else {
                        // All buffers exhausted
                        this.logger.error(`Protocol Triggered for ${user.walletAddress}! Buffer completely exhausted after ${maxBuffer} misses.`);
                        try {
                            await this.blockchainService.triggerDeadman(user.walletAddress);
                            if (user.email) {
                                await this.emailService.sendEmail({
                                    to: user.email,
                                    subject: '🚨 DeadMan Protocol Activated',
                                    html: `<p>DeadMan Protocol for ${user.walletAddress} has been activated as all heartbeat buffers were exhausted.</p><p>Assets and Key Shares will now be distributed according to your smart contract instructions.</p>`
                                });
                            }
                        } catch (e) {
                            this.logger.error(`Blockchain Trigger Failed: ${e.message}`);
                        }
                    }
                }
            }
        } catch (e) {
            this.logger.error(`Cron Error: ${e.message}`);
        }
    }
}
