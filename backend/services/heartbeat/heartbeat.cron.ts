import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UsersService } from '../users/users.service';
import { HeartbeatService } from './heartbeat.service';
import { BlockchainService } from '../blockchain/blockchain.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class HeartbeatCronService {
    private readonly logger = new Logger(HeartbeatCronService.name);

    constructor(
        private readonly usersService: UsersService,
        private readonly heartbeatService: HeartbeatService,
        private readonly blockchainService: BlockchainService,
        private readonly emailService: EmailService,
    ) { }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT) // Runs exactly at Midnight everyday UTC
    async handleCron() {
        this.logger.log('🚀 Starting daily Heartbeat Monitor check...');

        try {
            const users = await this.usersService.getAllUsers();
            this.logger.log(`Scanning ${users.length} users...`);

            for (const user of users) {
                const status = await this.heartbeatService.getHeartbeatStatus(user.walletAddress);

                if (status.status === 'overdue') {
                    const currentMisses = user.missedHeartbeats || 0;
                    const maxBuffer = user.heartbeatBuffer || 1;

                    if (currentMisses < maxBuffer) {
                        await this.usersService.incrementMissedHeartbeats(user.walletAddress);
                        this.logger.warn(`User ${user.walletAddress} MISSED heartbeat. Buffer used: ${currentMisses + 1}/${maxBuffer}`);

                        if (user.email) {
                            await this.emailService.sendEmail({
                                to: user.email,
                                subject: `⚠️ Heartbeat Missed - Notice ${currentMisses + 1}/${maxBuffer}`,
                                html: `
                                    <div style="font-family: Arial; color: #333;">
                                        <h2 style="color: #f59e0b;">Action Required: Heartbeat Missed</h2>
                                        <p>Hello,</p>
                                        <p>We noticed you haven't checked in for your DeadMan Protocol. This is <b>notice ${currentMisses + 1} of ${maxBuffer}</b>.</p>
                                        <p>You have <b>${status.daysUntilDue}</b> days remaining in your current grace period cycle.</p>
                                        <p>Please log in to your dashboard to reset your heartbeat and secure your vault.</p>
                                    </div>
                                `
                            });
                        }
                    } else {
                        this.logger.error(`User ${user.walletAddress} has exhausted all buffer heartbeats. Final trigger!`);
                        try {
                            await this.blockchainService.triggerDeadman(user.walletAddress);
                            this.logger.log(`Successfully triggered on-chain deadman protocol for ${user.walletAddress}`);

                            if (user.email) {
                                await this.emailService.sendEmail({
                                    to: user.email,
                                    subject: '🚨 DeadMan Protocol Triggered - Final Notice',
                                    html: `
                                        <div style="font-family: Arial; color: #333;">
                                            <h1 style="color: #dc2626;">Protocol Activation Notice</h1>
                                            <p>Hello,</p>
                                            <p>Since no heartbeat has been detected and all buffers have been exhausted for <b>${user.walletAddress}</b>, the DeadMan Protocol has been activated.</p>
                                            <p>Your designated beneficiaries are being notified of their access to the encrypted shards.</p>
                                        </div>
                                    `
                                });
                            }
                        } catch (e) {
                            this.logger.error(`Failed to trigger on-chain deadman for ${user.walletAddress}: ${e.message}`);
                        }
                    }
                } else if (status.status === 'grace_period' || (status.status === 'active' && status.daysUntilDue <= 3)) {
                    this.logger.warn(`User ${user.walletAddress} heartbeat is decaying. ${status.daysUntilDue} days left!`);
                    if (user.email) {
                        const daysRemaining = status.isOverdue ? Math.abs(status.daysUntilDue) : status.daysUntilDue;
                        await this.emailService.sendHeartbeatReminderEmail(
                            user.email,
                            user.name || 'User',
                            daysRemaining
                        );
                    }
                }
            }
            this.logger.log('✅ Heartbeat monitoring cycle completed successfully.');
        } catch (e) {
            this.logger.error(`❌ Error during Heartbeat Cron execution: ${e.message}`);
        }
    }
}
