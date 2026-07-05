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
import { buildEmailShell, infoBox, statRow, alertStrip, ctaButton, escapeHtml } from '../email/email-templates';

interface HeartbeatAlertEmailParams {
    name: string;
    walletAddress: string;
    missCount: number;
    maxBuffer: number;
    intervalDays: number;
    gracePeriodDays: number;
    lastHeartbeat: string;
    checkedAt: string;
    isFinalWarning: boolean;
    verificationUrl: string;
}

function buildHeartbeatAlertEmail(p: HeartbeatAlertEmailParams): string {
    const urgencyColor = p.isFinalWarning ? '#ef4444' : p.missCount === 1 ? '#eab308' : '#f97316';
    const glowColor = p.isFinalWarning ? 'rgba(239,68,68,0.3)' : p.missCount === 1 ? 'rgba(234,179,8,0.3)' : 'rgba(249,115,22,0.3)';
    const progressPct = Math.round((p.missCount / p.maxBuffer) * 100);
    const escapedName = escapeHtml(p.name);
    const escapedWallet = escapeHtml(p.walletAddress);

    const body = `
      <p style="font-size:16px;color:#e2e8f0;margin:0 0 16px;">Commander <strong>${escapedName}</strong>,</p>
      <p style="font-size:14px;color:#94a3b8;line-height:1.8;margin:0 0 24px;">
        ${p.isFinalWarning
          ? `<strong style="color:${urgencyColor};">This is your final warning.</strong> If you do not verify your status immediately, the AlwaysThere Vault will irreversibly distribute your assigned assets to your nominees.`
          : 'Your cryptographic heartbeat signal has been missed. Submit a proof-of-life verification immediately to halt the asset distribution sequence.'}
      </p>
      ${infoBox(`
        ${statRow('Wallet', escapedWallet.slice(0,10)+'...'+escapedWallet.slice(-8), '#38bdf8')}
        ${statRow('Last Heartbeat', escapeHtml(p.lastHeartbeat), '#e2e8f0')}
        ${statRow('Interval / Grace', `${p.intervalDays}d / ${p.gracePeriodDays}d`, '#e2e8f0')}
        ${statRow('Buffer Exhausted', `${p.missCount} of ${p.maxBuffer} missed`, urgencyColor, true)}
      `)}
      <div style="margin:20px 0;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:6px;">
          <tr>
            <td style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:1px;">Buffer Exhaustion</td>
            <td align="right" style="font-size:12px;font-weight:700;color:${urgencyColor};">${progressPct}%</td>
          </tr>
        </table>
        <div style="background:#060d1a;border:1px solid rgba(255,255,255,0.06);border-radius:6px;height:10px;overflow:hidden;padding:2px;">
          <div style="background:linear-gradient(90deg,${urgencyColor}80,${urgencyColor});width:${progressPct}%;height:100%;border-radius:3px;box-shadow:0 0 8px ${urgencyColor};"></div>
        </div>
      </div>
      ${ctaButton(p.verificationUrl, p.isFinalWarning ? '🚨 Verify Status Immediately' : '✅ Confirm I\'m Active', urgencyColor)}
    `;

    return buildEmailShell({
        accentColor: urgencyColor,
        accentGlow: glowColor,
        icon: p.isFinalWarning ? '💀' : '⏳',
        headline: p.isFinalWarning ? 'Protocol Trigger Imminent' : 'Heartbeat Overdue',
        subline: `Stage ${p.missCount} of ${p.maxBuffer} — ${p.isFinalWarning ? 'Final Warning' : 'Action Required'}`,
        body,
        footerNote: 'Automated heartbeat monitoring from AlwaysThere Vault Protocol.',
    });
}



@Injectable()
export class HeartbeatCronService {
    private readonly logger = new Logger(HeartbeatCronService.name);

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

                this.logger.debug(`User ${user.walletAddress} | email: ${user.email || 'MISSING'} | status: ${status.status} | misses: ${config.missedCount}/${config.bufferMisses}`);

                if (status.status === 'overdue' || status.status === 'grace_period') {
                    const currentMisses = config.missedCount || 0;
                    const maxBuffer = config.bufferMisses || 3;
                    const isDemo = config.intervalDays < 7;

                    // Throttle: in demo mode (1 min interval), only send one alert per "interval unit" since last heartbeat
                    // Use lastHeartbeat as anchor, not updatedAt (updatedAt changes on every miss increment)
                    const lastHeartbeatTime = config.lastHeartbeat || config.createdAt;
                    const timeUnit = isDemo ? (1000 * 60) : (1000 * 60 * 60 * 24);
                    const now = new Date();
                    const unitsSinceLastHeartbeat = Math.floor((now.getTime() - lastHeartbeatTime.getTime()) / timeUnit);

                    // How many alerts should have been sent so far = units since last heartbeat - interval
                    // If currentMisses already covers the expected count, throttle (only applies to warnings, not the final trigger)
                    const expectedMisses = Math.max(0, unitsSinceLastHeartbeat - config.intervalDays);
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
                            let subject = '';
                            const lastHeartbeat = config.lastHeartbeat
                                ? new Date(config.lastHeartbeat).toUTCString()
                                : 'Never';
                            const checkedAt = new Date().toUTCString();

                            if (newMissCount === 1) {
                                subject = '⚠️ First Notice: Heartbeat Missed';
                            } else if (newMissCount === maxBuffer) {
                                subject = '🚨 FINAL WARNING: Protocol Trigger Imminent';
                            } else {
                                subject = `⚠️ Heartbeat Missed - Stage ${newMissCount}/${maxBuffer}`;
                            }

                            const token = await this.tokenService.generateToken('HEARTBEAT_VERIFY', user.id, user.walletAddress, 24);
                            const backendUrl = process.env.API_URL || process.env.RENDER_EXTERNAL_URL || `http://localhost:${process.env.PORT || 7001}`;
                            const verificationUrl = `${backendUrl}/api/heartbeat/verify?token=${token}`;

                            const messageHtml = buildHeartbeatAlertEmail({
                                name: user.name || 'User',
                                walletAddress: user.walletAddress,
                                missCount: newMissCount,
                                maxBuffer,
                                intervalDays: config.intervalDays,
                                gracePeriodDays: config.gracePeriodDays,
                                lastHeartbeat,
                                checkedAt,
                                isFinalWarning: newMissCount === maxBuffer,
                                verificationUrl,
                            });

                            for (const emailAddress of emailsToSend) {
                                const sent = await this.emailService.sendEmail({
                                    to: emailAddress,
                                    subject,
                                    html: messageHtml
                                });
                                this.logger.log(`📧 Heartbeat alert email (Stage ${newMissCount}) sent to ${emailAddress}: ${sent}`);
                            }
                        } else {
                            this.logger.warn(`⚠️ Cannot send alert — user ${user.walletAddress} has no verified emails in DB`);
                        }

                        // Send Push Notification if token exists
                        if (user.expoPushToken) {
                            await this.notificationsService.sendHeartbeatReminder(user.expoPushToken, status.daysUntilDue);
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
                                 const escapedName = escapeHtml(user.name || 'Vault Owner');
                                const escapedWallet = escapeHtml(user.walletAddress);
                                const activatedBody = `
                                  <p style="font-size:16px;color:#e2e8f0;margin:0 0 16px;">Commander <strong>${escapedName}</strong>,</p>
                                  <p style="font-size:14px;color:#94a3b8;line-height:1.8;margin:0 0 24px;">
                                    All heartbeat time buffers for your vault have been exhausted. The AlwaysThere Protocol has executed its smart contract instructions. Your designated digital assets are now being distributed to your nominated beneficiaries.
                                  </p>
                                  ${infoBox(`
                                    ${statRow('Wallet', escapedWallet.slice(0,10)+'...'+escapedWallet.slice(-8), '#38bdf8')}
                                    ${statRow('Protocol Status', 'TRIGGERED', '#ef4444')}
                                    ${statRow('Asset Distribution', 'In Progress', '#f59e0b', true)}
                                  `)}
                                  ${alertStrip('#ef4444', 'Your inheritance plan is now being executed. This action is irreversible. Your digital legacy has been secured.')}
                                `;
                                for (const emailAddress of activationEmails) {
                                    await this.emailService.sendEmail({
                                        to: emailAddress,
                                        subject: '🚨 AlwaysThere Vault Protocol Activated — Assets Being Distributed',
                                        html: buildEmailShell({
                                            accentColor: '#ef4444',
                                            accentGlow: 'rgba(239,68,68,0.3)',
                                            icon: '🚨',
                                            headline: 'Protocol Activated',
                                            subline: 'Your Digital Legacy Is Being Distributed',
                                            body: activatedBody,
                                            footerNote: 'This is an automated protocol execution notification.',
                                        }),
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

                                    const token = await this.tokenService.generateToken('CLAIM_ACCESS', user.id, nominee.walletAddress, 7 * 24);
                                    const claimUrl = `${backendUrl}/api/claim/${token}`;

                                    await this.emailService.sendAssetReleaseNotification(
                                        nominee.email,
                                        nominee.name,
                                        user.name || 'The account owner',
                                        user.walletAddress,
                                        theirFiles.length,
                                        claimUrl
                                    );
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

        const html = buildHeartbeatAlertEmail({
            name: user.name || 'User',
            walletAddress: user.walletAddress,
            missCount: 1,
            maxBuffer: config?.bufferMisses || 3,
            intervalDays: config?.intervalDays || 30,
            gracePeriodDays: config?.gracePeriodDays || 7,
            lastHeartbeat,
            checkedAt: new Date().toUTCString(),
            isFinalWarning: false,
            verificationUrl,
        });

        await this.emailService.sendEmail({
            to: user.email,
            subject: '🧪 [TEST] Heartbeat Alert Email Preview',
            html,
        });

        return { sent: true, preview: `Test email sent to ${user.email}` };
    }
}
