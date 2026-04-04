import { Injectable, Inject, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UsersService } from '../users/users.service';
import { HeartbeatService } from './heartbeat.service';
import { BlockchainService } from '../blockchain/blockchain.service';
import { EmailService } from '../email/email.service';
import { BeneficiariesService } from '../beneficiaries/beneficiaries.service';
import { eq, sql } from 'drizzle-orm';
import { heartbeatConfigs } from '../../src/db/schema/heartbeat';

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
}

function buildHeartbeatAlertEmail(p: HeartbeatAlertEmailParams): string {
    const urgencyColor = p.isFinalWarning ? '#dc2626' : p.missCount === 1 ? '#f59e0b' : '#ea580c';
    const stageLabel = `Stage ${p.missCount} of ${p.maxBuffer}`;
    const progressPct = Math.round((p.missCount / p.maxBuffer) * 100);

    return `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; padding: 24px; border-radius: 12px;">
  <div style="background: ${urgencyColor}; color: white; padding: 20px 24px; border-radius: 8px 8px 0 0;">
    <h1 style="margin: 0; font-size: 22px;">
      ${p.isFinalWarning ? '🚨 Final Warning' : '⚠️ Heartbeat Alert'} — ${stageLabel}
    </h1>
  </div>

  <div style="background: white; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
    <p style="font-size: 16px;">Hi <strong>${p.name}</strong>,</p>
    <p>Your DeadMan Protocol heartbeat has been missed. ${p.isFinalWarning
        ? '<strong>This is your final warning before the protocol is triggered.</strong>'
        : 'Please sign a heartbeat transaction immediately to prevent asset distribution.'
    }</p>

    <!-- Status Summary -->
    <div style="background: #f3f4f6; border-radius: 8px; padding: 16px; margin: 20px 0;">
      <h3 style="margin: 0 0 12px 0; color: #374151;">📊 Heartbeat Status</h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 6px 0; color: #6b7280;">Wallet Address</td>
          <td style="padding: 6px 0; font-family: monospace; color: #111827; word-break: break-all;">${p.walletAddress}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #6b7280;">Status</td>
          <td style="padding: 6px 0; color: ${urgencyColor}; font-weight: bold;">OVERDUE — ${stageLabel}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #6b7280;">Last Heartbeat</td>
          <td style="padding: 6px 0; color: #111827;">${p.lastHeartbeat}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #6b7280;">Check Interval</td>
          <td style="padding: 6px 0; color: #111827;">${p.intervalDays} day(s)</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #6b7280;">Grace Period</td>
          <td style="padding: 6px 0; color: #111827;">${p.gracePeriodDays} day(s)</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #6b7280;">Missed Count</td>
          <td style="padding: 6px 0; color: ${urgencyColor}; font-weight: bold;">${p.missCount} / ${p.maxBuffer}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #6b7280;">Checked At</td>
          <td style="padding: 6px 0; color: #111827;">${p.checkedAt}</td>
        </tr>
      </table>
    </div>

    <!-- Progress Bar -->
    <div style="margin: 16px 0;">
      <p style="margin: 0 0 6px 0; font-size: 13px; color: #6b7280;">Buffer exhausted: ${progressPct}%</p>
      <div style="background: #e5e7eb; border-radius: 999px; height: 10px;">
        <div style="background: ${urgencyColor}; width: ${progressPct}%; height: 10px; border-radius: 999px;"></div>
      </div>
    </div>

    ${p.isFinalWarning ? `
    <div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 14px; margin: 20px 0; border-radius: 4px;">
      <p style="margin: 0; color: #991b1b; font-weight: bold;">
        🚨 If you do not submit a heartbeat immediately, the DeadMan Protocol will be triggered and your assets will be distributed to your beneficiaries.
      </p>
    </div>` : ''}

    <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard"
       style="display: inline-block; background: ${urgencyColor}; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: bold; margin: 16px 0;">
      ✅ Submit Heartbeat Now
    </a>

    <p style="color: #9ca3af; font-size: 12px; margin-top: 32px; border-top: 1px solid #e5e7eb; padding-top: 16px;">
      This is an automated alert from DeadMan Protocol. Do not reply to this email.<br/>
      If you believe this is an error, please contact support immediately.
    </p>
  </div>
</div>`;
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
                    const maxBuffer = config.bufferMisses || 3; // Default to 3 stages (Missed1, Missed2, Missed3)

                    if (currentMisses < maxBuffer) {
                        await this.db.update(heartbeatConfigs)
                            .set({ missedCount: sql`${heartbeatConfigs.missedCount} + 1` })
                            .where(eq(heartbeatConfigs.userId, user.id));
                        
                        const newMissCount = currentMisses + 1;
                        this.logger.warn(`User ${user.walletAddress} missed heartbeat. Stage: Missed${newMissCount} (${newMissCount}/${maxBuffer})`);

                        if (user.email) {
                            let subject = '';
                            const lastHeartbeat = config.lastHeartbeat
                                ? new Date(config.lastHeartbeat).toUTCString()
                                : 'Never';
                            const checkedAt = new Date().toUTCString();

                            if (newMissCount === 1) {
                                subject = '⚠️ First Notice: Heartbeat Missed';
                            } else if (newMissCount === 2) {
                                subject = '🚨 Second Notice: Final Warning';
                            } else {
                                subject = `⚠️ Heartbeat Missed - Stage ${newMissCount}/${maxBuffer}`;
                            }

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
                            });

                            await this.emailService.sendEmail({
                                to: user.email,
                                subject,
                                html: messageHtml
                            });
                        } else {
                            this.logger.warn(`⚠️ Cannot send alert — user ${user.walletAddress} has no email in DB`);
                        }

                        // Also notify nominees on final warning stage
                        // If in demo mode (interval < 7) or high-risk stage, notify nominees
                        const isDemo = config.intervalDays < 7;
                        if (newMissCount === maxBuffer || (isDemo && newMissCount === 1)) {
                            const nominees = await this.beneficiariesService.getAllBeneficiaries(user.walletAddress);
                            this.logger.log(`Final warning: notifying ${nominees.length} nominees for ${user.walletAddress}`);
                            for (const nominee of nominees) {
                                if (nominee.email) {
                                    await this.emailService.sendEmail({
                                        to: nominee.email,
                                        subject: '⚠️ Notice: Your benefactor\'s heartbeat is critically overdue',
                                        html: `
                                        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
                                          <h2 style="color:#dc2626;">⚠️ Critical Heartbeat Alert</h2>
                                          <p>Hi <strong>${nominee.name || 'Beneficiary'}</strong>,</p>
                                          <p>The heartbeat for <strong>${user.name || user.walletAddress}</strong> is critically overdue (Stage ${newMissCount}/${maxBuffer}).</p>
                                          <p>If no heartbeat is received, the DeadMan Protocol will be triggered and assets will be distributed to beneficiaries.</p>
                                          <p style="color:#6b7280;font-size:12px;">Checked at: ${new Date().toUTCString()}</p>
                                        </div>`
                                    });
                                } else {
                                    this.logger.warn(`Nominee ${nominee.name} has no email`);
                                }
                            }
                        }
                    } else {
                        // All buffers exhausted
                        this.logger.error(`Protocol Triggered for ${user.walletAddress}! Buffer completely exhausted after ${maxBuffer} misses.`);
                        try {
                            await this.blockchainService.triggerDeadman(user.walletAddress);
                            
                            // Notify user
                            if (user.email) {
                                await this.emailService.sendEmail({
                                    to: user.email,
                                    subject: '🚨 DeadMan Protocol Activated',
                                    html: `<p>DeadMan Protocol for ${user.walletAddress} has been activated as all heartbeat buffers were exhausted.</p><p>Assets and Key Shares will now be distributed according to your smart contract instructions.</p>`
                                });
                            }

                            // Notify all beneficiaries
                            const nominees = await this.beneficiariesService.getAllBeneficiaries(user.walletAddress);
                            this.logger.log(`Notifying ${nominees.length} beneficiaries for ${user.walletAddress}...`);
                            
                            for (const nominee of nominees) {
                                if (nominee.email) {
                                    await this.emailService.sendAssetReleaseNotification(
                                        nominee.email,
                                        nominee.name,
                                        user.name || 'The account owner',
                                        1 // Default to 1 asset for now (can be expanded)
                                    );
                                }
                            }
                        } catch (e) {
                            this.logger.error(`Blockchain Trigger/Notification Failed: ${e.message}`);
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
        });

        await this.emailService.sendEmail({
            to: user.email,
            subject: '🧪 [TEST] Heartbeat Alert Email Preview',
            html,
        });

        return { sent: true, preview: `Test email sent to ${user.email}` };
    }
}
