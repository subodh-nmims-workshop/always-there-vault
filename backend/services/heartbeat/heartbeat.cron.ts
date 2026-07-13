import { Injectable, Inject, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UsersService } from '../users/users.service';
import { HeartbeatService } from './heartbeat.service';
import { BlockchainService } from '../blockchain/blockchain.service';
import { EmailService } from '../email/email.service';
import { BeneficiariesService } from '../beneficiaries/beneficiaries.service';
import { TokenService } from '../auth/token.service';
import { NotificationsService } from '../notifications/notifications.service';
import { eq, sql } from 'drizzle-orm';
import { heartbeatConfigs } from '../../src/db/schema/heartbeat';
import { files } from '../../src/db/schema/files';
import { users } from '../../src/db/schema/users';

@Injectable()
export class HeartbeatCronService {
    private readonly logger = new Logger(HeartbeatCronService.name);
    private isRunning = false;

    constructor(
        @Inject('DRIZZLE_DB') private db: any,
        private readonly usersService: UsersService,
        private readonly heartbeatService: HeartbeatService,
        private readonly blockchainService: BlockchainService,
        private readonly emailService: EmailService,
        private readonly beneficiariesService: BeneficiariesService,
        private readonly tokenService: TokenService,
        private readonly notificationsService: NotificationsService,
    ) { }

    @Cron(CronExpression.EVERY_MINUTE)
    async handleCron() {
        if (this.isRunning) {
            this.logger.warn('⚠️ Heartbeat Cron is already running. Skipping execution to prevent overlap.');
            return;
        }
        this.isRunning = true;
        this.logger.log('🚀 Starting Heartbeat Monitor check...');

        try {
            // Join users and heartbeatConfigs to fetch all details in 1 single database call
            const usersWithConfigs = await this.db.select({
                user: users,
                config: heartbeatConfigs
            })
            .from(users)
            .innerJoin(heartbeatConfigs, eq(users.id, heartbeatConfigs.userId));

            this.logger.log(`Scanning ${usersWithConfigs.length} users...`);

            for (const { user, config } of usersWithConfigs) {
                if (!config) continue;

                // Calculate heartbeat status inline to avoid N*2 redundant database lookups
                const lastCheck = config.lastHeartbeat || config.createdAt;
                const now = new Date();
                const timeUnit = 1000 * 60 * 60 * 24;
                
                const diff = Math.floor((now.getTime() - lastCheck.getTime()) / timeUnit);
                const interval = config.intervalDays;
                const grace = config.gracePeriodDays;

                let status: string;
                let daysUntilDue = 0;

                if (diff >= interval + grace) {
                    status = 'overdue';
                    daysUntilDue = interval + grace - diff;
                } else if (diff >= interval) {
                    status = 'grace_period';
                    daysUntilDue = interval + grace - diff;
                } else {
                    status = 'active';
                    daysUntilDue = interval - diff;
                }

                this.logger.debug(`User ${user.walletAddress} | email: ${user.email || 'MISSING'} | status: ${status} | misses: ${config.missedCount}/${config.bufferMisses}`);

                if (status === 'overdue' || status === 'grace_period') {
                    const currentMisses = config.missedCount || 0;
                    const maxBuffer = config.bufferMisses || 3;

                    // Throttle: only send one alert per day since last heartbeat
                    const lastHeartbeatTime = config.lastHeartbeat || config.createdAt;
                    const timeUnit = 1000 * 60 * 60 * 24;
                    const now = new Date();
                    const unitsSinceLastHeartbeat = Math.floor((now.getTime() - lastHeartbeatTime.getTime()) / timeUnit);

                    // How many alerts should have been sent so far
                    const expectedMisses = Math.max(0, unitsSinceLastHeartbeat - config.intervalDays + 1);
                    if (currentMisses < maxBuffer && currentMisses >= expectedMisses && currentMisses > 0) {
                        this.logger.debug(`Throttling alert for ${user.walletAddress}: misses(${currentMisses}) already covers expected(${expectedMisses}) for this time period.`);
                        continue;
                    }

                    if (currentMisses < maxBuffer) {
                        await this.db.update(heartbeatConfigs)
                            .set({ 
                                missedCount: sql`${heartbeatConfigs.missedCount} + 1`,
                                updatedAt: new Date()
                            })
                            .where(eq(heartbeatConfigs.userId, user.id));
                        
                        const newMissCount = currentMisses + 1;
                        this.logger.warn(`User ${user.walletAddress} missed heartbeat. Stage: Missed${newMissCount} (${newMissCount}/${maxBuffer})`);

                        const emailsToSend: string[] = [];
                        if (user.email && user.emailVerified) {
                            emailsToSend.push(user.email);
                        }
                        if (user.alternativeEmail && user.alternativeEmailVerified) {
                            emailsToSend.push(user.alternativeEmail);
                        }

                        if (emailsToSend.length > 0) {
                            const lastHeartbeat = config.lastHeartbeat
                                ? new Date(config.lastHeartbeat).toUTCString()
                                : 'Never';

                            const token = await this.tokenService.generateToken('HEARTBEAT_VERIFY', user.id, user.walletAddress, 24);
                            const backendUrl = process.env.API_URL || process.env.RENDER_EXTERNAL_URL || `http://localhost:${process.env.PORT || 7001}`;
                            const verificationUrl = `${backendUrl}/api/heartbeat/verify?token=${token}`;

                            const template = this.emailService.templates.heartbeatOverdueWarning({
                                stage: newMissCount === maxBuffer ? 'final' : newMissCount === 1 ? 'first' : 'intermediate',
                                stageLabel: `${newMissCount}/${maxBuffer}`,
                                elapsedSummary: `Your heartbeat is overdue.`,
                                progressPercent: (newMissCount / maxBuffer) * 100,
                                verificationUrl,
                                name: user.name || 'User',
                                walletAddress: user.walletAddress,
                                lastHeartbeat,
                                intervalDays: config.intervalDays,
                                gracePeriodDays: config.gracePeriodDays,
                                maxBuffer,
                                missCount: newMissCount,
                             });

                            for (const emailAddress of emailsToSend) {
                                const sent = await this.emailService.send({
                                    to: emailAddress,
                                    ...template
                                });
                                this.logger.log(`📧 Heartbeat alert email (Stage ${newMissCount}) sent to ${emailAddress}: ${sent}`);
                            }
                        } else {
                            this.logger.warn(`⚠️ Cannot send alert — user ${user.walletAddress} has no verified emails in DB`);
                        }

                        // Send Push Notification if token exists
                        if (user.expoPushToken) {
                            await this.notificationsService.sendHeartbeatReminder(user.expoPushToken, daysUntilDue);
                        }
                    } else {
                        // All buffers exhausted — protocol trigger
                        if (currentMisses > maxBuffer) {
                            continue; // Already triggered, skip
                        }

                        // Mark as triggered so it doesn't run again
                        await this.db.update(heartbeatConfigs)
                            .set({ missedCount: sql`${heartbeatConfigs.missedCount} + 1`, updatedAt: new Date() })
                            .where(eq(heartbeatConfigs.userId, user.id));

                        // All buffers exhausted
                        this.logger.error(`Protocol Triggered for ${user.walletAddress}! Buffer completely exhausted after ${maxBuffer} misses.`);
                        try {
                            try {
                                await this.blockchainService.triggerAlwaysThere(user.walletAddress);
                                this.logger.log(`✅ On-chain trigger transaction completed successfully for user: ${user.walletAddress}`);
                            } catch (blockchainError) {
                                this.logger.error(`⚠️ Smart contract trigger failed (expected in Demo/Simulation mode or if on-chain interval checks reject the call): ${blockchainError.message}`);
                            }
                            
                            // Notify user
                            const activationEmails: string[] = [];
                            if (user.email && user.emailVerified) {
                                activationEmails.push(user.email);
                            }
                            if (user.alternativeEmail && user.alternativeEmailVerified) {
                                activationEmails.push(user.alternativeEmail);
                            }
                            if (activationEmails.length > 0) {
                                const template = this.emailService.templates.protocolActivated({
                                    ownerName: user.name || 'Vault Owner',
                                    walletAddress: user.walletAddress,
                                });
                                for (const emailAddress of activationEmails) {
                                    await this.emailService.send({
                                        to: emailAddress,
                                        ...template
                                    });
                                }
                            }

                            // Notify each nominee with ONLY their assigned files
                            const nominees = await this.beneficiariesService.getAllBeneficiaries(user.walletAddress);
                            this.logger.log(`Notifying ${nominees.length} nominees for ${user.walletAddress} with personalized asset lists...`);

                            // Fetch all files belonging to this user
                            const userFiles = await this.db.query.files.findMany({
                                where: eq(files.userId, user.id),
                            });

                            // Group files by assignedBeneficiaryId
                            const filesByNominee = new Map<string, typeof userFiles>();
                            for (const file of userFiles) {
                                if (file.assignedBeneficiaryId) {
                                    const existing = filesByNominee.get(file.assignedBeneficiaryId) || [];
                                    existing.push(file);
                                    filesByNominee.set(file.assignedBeneficiaryId, existing);
                                }
                            }

                            const backendUrl = process.env.API_URL || process.env.RENDER_EXTERNAL_URL || `http://localhost:${process.env.PORT || 7001}`;

                            for (const nominee of nominees) {
                                try {
                                    if (!nominee.email) {
                                        this.logger.warn(`Nominee ${nominee.name || nominee.id} has no email, skipping.`);
                                        continue;
                                    }

                                    const theirFiles = filesByNominee.get(nominee.id) || [];
                                    if (theirFiles.length === 0) {
                                        this.logger.log(`Nominee ${nominee.email} has no files assigned — skipping asset release email.`);
                                        continue;
                                    }

                                    const targetAddress = (nominee.walletAddress && nominee.walletAddress !== '0x0000000000000000000000000000000000000000') ? nominee.walletAddress : nominee.id;
                                    const token = await this.tokenService.generateToken('CLAIM_ACCESS', user.id, targetAddress, 7 * 24);
                                    const frontendUrl = (process.env.FRONTEND_URL || 'http://localhost:7000').trim();
                                    const claimUrl = `${frontendUrl}/claim/${token}?owner=${user.walletAddress}`;

                                    const verifiedSenderEmail = user.emailVerified ? user.email : (user.alternativeEmailVerified ? user.alternativeEmail : null);
                                    const fromEmailHeader = verifiedSenderEmail 
                                      ? `"${user.name || 'AlwaysThere Vault Owner'}" <${verifiedSenderEmail}>` 
                                      : undefined;

                                    const template = this.emailService.templates.nomineeAssetRelease({
                                        nomineeName: nominee.name,
                                        ownerName: user.name || 'The account owner',
                                        ownerAddress: user.walletAddress,
                                        assetCount: theirFiles.length,
                                        claimUrl,
                                        fileList: theirFiles.map(f => f.name || 'Unnamed Asset'),
                                    });

                                    await this.emailService.send({
                                        to: nominee.email,
                                        ...template,
                                        from: fromEmailHeader
                                    });
                                    this.logger.log(`📧 Asset release email (${theirFiles.length} file(s)) dispatched to nominee: ${nominee.email}`);
                                } catch (nomineeError) {
                                    this.logger.error(`Failed to dispatch notification for nominee ${nominee.email || nominee.id}: ${nomineeError.message}`);
                                }
                            }
                        } catch (notificationError) {
                            this.logger.error(`Notification dispatch flow failed: ${notificationError.message}`);
                        }
                    }
                }
            }
        } catch (e) {
            this.logger.error(`Cron Error: ${e.message}`);
        } finally {
            this.isRunning = false;
        }
    }

    async sendTestHeartbeatEmail(walletAddress: string): Promise<{ sent: boolean; preview: string }> {
        const users = await this.usersService.getAllUsers();
        const user = users.find(u => u.walletAddress?.toLowerCase() === walletAddress?.toLowerCase());

        if (!user || !user.email) {
            return { sent: false, preview: 'User not found or no email configured.' };
        }

        const config = await this.db.query.heartbeatConfigs.findFirst({
            where: eq(heartbeatConfigs.userId, user.id),
        });

        const lastHeartbeat = config?.lastHeartbeat
            ? new Date(config.lastHeartbeat).toUTCString()
            : 'Never';

        const token = await this.tokenService.generateToken('HEARTBEAT_VERIFY', user.id, user.walletAddress, 24);
        const backendUrl = process.env.API_URL || process.env.RENDER_EXTERNAL_URL || `http://localhost:${process.env.PORT || 7001}`;
        const verificationUrl = `${backendUrl}/api/heartbeat/verify?token=${token}`;

        const template = this.emailService.templates.heartbeatOverdueWarning({
            stage: 'first',
            stageLabel: '1/3',
            elapsedSummary: 'Your heartbeat is overdue.',
            progressPercent: 33.33,
            verificationUrl,
            name: user.name || 'User',
            walletAddress: user.walletAddress,
            lastHeartbeat,
            intervalDays: config?.intervalDays || 30,
            gracePeriodDays: config?.gracePeriodDays || 7,
            maxBuffer: config?.bufferMisses || 3,
            missCount: 1,
        });

        await this.emailService.send({
            to: user.email,
            ...template,
            subject: '🧪 [TEST] Heartbeat Alert Email Preview',
        });

        return { sent: true, preview: `Test email sent to ${user.email}` };
    }
}
