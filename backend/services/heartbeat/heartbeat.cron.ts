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
                    const maxBuffer = config.bufferMisses || 1;

                    if (currentMisses < maxBuffer) {
                        await this.db.update(heartbeatConfigs)
                            .set({ missedCount: sql`${heartbeatConfigs.missedCount} + 1` })
                            .where(eq(heartbeatConfigs.userId, user.id));
                        
                        this.logger.warn(`User ${user.walletAddress} missed heartbeat. Buffer: ${currentMisses + 1}/${maxBuffer}`);

                        if (user.email) {
                            await this.emailService.sendEmail({
                                to: user.email,
                                subject: `⚠️ Heartbeat Missed - Notice ${currentMisses + 1}/${maxBuffer}`,
                                html: `<h2>Action Required: Heartbeat Missed</h2><p>Notice ${currentMisses + 1} of ${maxBuffer}. Period remaining: ${status.daysUntilDue} days.</p>`
                            });
                        }
                    } else {
                        this.logger.error(`Protocol Triggered for ${user.walletAddress}! Buffer exhausted.`);
                        try {
                            await this.blockchainService.triggerDeadman(user.walletAddress);
                            if (user.email) {
                                await this.emailService.sendEmail({
                                    to: user.email,
                                    subject: '🚨 DeadMan Protocol Activated',
                                    html: `<p>DeadMan Protocol for ${user.walletAddress} has been activated as buffers were exhausted.</p>`
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
