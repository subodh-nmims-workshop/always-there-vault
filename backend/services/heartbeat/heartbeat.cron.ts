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
    const glowColor = p.isFinalWarning ? 'rgba(239, 68, 68, 0.4)' : p.missCount === 1 ? 'rgba(234, 179, 8, 0.4)' : 'rgba(249, 115, 22, 0.4)';
    const stageLabel = `Stage ${p.missCount} of ${p.maxBuffer}`;
    const progressPct = Math.round((p.missCount / p.maxBuffer) * 100);

    return `
<div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; background: #0f172a; padding: 40px 20px; color: #f8fafc; line-height: 1.6;">
  
  <!-- Premium Card Container -->
  <div style="background: #1e293b; border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.1); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px ${glowColor}; overflow: hidden;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.8) 100%); border-bottom: 2px solid ${urgencyColor}; padding: 30px; text-align: center;">
      <div style="width: 60px; height: 60px; background: rgba(0,0,0,0.3); border-radius: 50%; border: 2px solid ${urgencyColor}; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; font-size: 28px; box-shadow: 0 0 20px ${glowColor};">
        ${p.isFinalWarning ? '💀' : '⏳'}
      </div>
      <h1 style="margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px; color: #ffffff;">
        ${p.isFinalWarning ? 'PROTOCOL TRIGGER IMMINENT' : 'HEARTBEAT OVERDUE'}
      </h1>
      <p style="margin: 10px 0 0 0; color: #94a3b8; font-size: 15px; font-weight: 500; text-transform: uppercase; letter-spacing: 2px;">
        ${stageLabel}
      </p>
    </div>

    <!-- Body -->
    <div style="padding: 35px 30px;">
      <p style="font-size: 18px; margin-top: 0; color: #e2e8f0;">Commander <strong>${p.name}</strong>,</p>
      <p style="color: #cbd5e1; font-size: 15px;">
        Your cryptographic heartbeat has been missed. ${p.isFinalWarning
        ? '<span style="color: #ef4444; font-weight: bold;">This is your absolute final warning.</span> If you do not check in, the AlwaysThere Vault will irreversibly distribute your assigned assets.'
        : 'Please sign a proof-of-life heartbeat transaction immediately to halt asset distribution sequences.'}
      </p>

      <!-- Status Dashboard -->
      <div style="background: #0f172a; border-radius: 12px; padding: 20px; margin: 30px 0; border: 1px solid #334155; position: relative;">
        <h3 style="margin: 0 0 16px 0; color: #f8fafc; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; display: flex; align-items: center;">
          <span style="display:inline-block; width:8px; height:8px; background:${urgencyColor}; border-radius:50%; margin-right:8px; box-shadow: 0 0 10px ${urgencyColor};"></span>
          System Telemetry
        </h3>
        
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 10px 0; color: #94a3b8; border-bottom: 1px solid #1e293b;">Wallet Address</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #1e293b; font-family: 'Courier New', Courier, monospace; color: #38bdf8; word-break: break-all; text-align: right;">${p.walletAddress}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #94a3b8; border-bottom: 1px solid #1e293b;">Last Heartbeat</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #1e293b; color: #f1f5f9; text-align: right;">${p.lastHeartbeat}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #94a3b8; border-bottom: 1px solid #1e293b;">Interval / Grace</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #1e293b; color: #f1f5f9; text-align: right;">${p.intervalDays}d / ${p.gracePeriodDays}d</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #94a3b8;">Missed Count</td>
            <td style="padding: 10px 0; color: ${urgencyColor}; font-weight: bold; text-align: right;">${p.missCount} / ${p.maxBuffer}</td>
          </tr>
        </table>
      </div>

      <!-- Cyber Progress Bar -->
      <div style="margin: 25px 0 35px 0;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span style="font-size: 12px; color: #94a3b8; text-transform: uppercase;">Time Buffer Exhaustion</span>
          <span style="font-size: 12px; font-weight: bold; color: ${urgencyColor};">${progressPct}%</span>
        </div>
        <div style="background: #0f172a; border-radius: 4px; height: 12px; border: 1px solid #334155; overflow: hidden; padding: 2px;">
          <div style="background: linear-gradient(90deg, ${urgencyColor}40, ${urgencyColor}); width: ${progressPct}%; height: 100%; border-radius: 2px; box-shadow: 0 0 10px ${urgencyColor};"></div>
        </div>
      </div>

      <!-- Action Button -->
      <div style="text-align: center;">
        <a href="${p.verificationUrl}"
           style="display: inline-block; background: linear-gradient(135deg, ${urgencyColor}, #991b1b); color: #ffffff; padding: 16px 36px; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 10px 20px rgba(0,0,0,0.3), 0 0 20px ${glowColor}; transition: all 0.3s ease;">
          Verify My Status
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background: #0f172a; padding: 20px; text-align: center; border-top: 1px solid #334155;">
      <p style="color: #64748b; font-size: 11px; margin: 0; text-transform: uppercase; letter-spacing: 1px;">
        Secured by AlwaysThere Vault<br/>
        End-to-End Encrypted Web3 Inheritance
      </p>
    </div>
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
                    // If currentMisses already covers the expected count, throttle
                    const expectedMisses = Math.max(0, unitsSinceLastHeartbeat - config.intervalDays);
                    if (currentMisses >= expectedMisses && currentMisses > 0) {
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

                        if (user.email) {
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

                            const sent = await this.emailService.sendEmail({
                                to: user.email,
                                subject,
                                html: messageHtml
                            });
                            this.logger.log(`📧 Heartbeat alert email (Stage ${newMissCount}) sent to owner ${user.email}: ${sent}`);
                        } else {
                            this.logger.warn(`⚠️ Cannot send alert — user ${user.walletAddress} has no email in DB`);
                        }

                        // Send Push Notification if token exists
                        if (user.expoPushToken) {
                            await this.notificationsService.sendHeartbeatReminder(user.expoPushToken, status.daysUntilDue);
                        }

                        // Notify nominees on EVERY miss in demo mode, only on final miss in production
                        if (newMissCount === maxBuffer || isDemo) {
                            const nominees = await this.beneficiariesService.getAllBeneficiaries(user.walletAddress);
                            this.logger.log(`Notifying ${nominees.length} nominees for ${user.walletAddress} (Stage ${newMissCount}/${maxBuffer}, demo=${isDemo})`);
                            for (const nominee of nominees) {
                                if (nominee.email) {
                                    const isFinalStage = newMissCount === maxBuffer;
                                    await this.emailService.sendEmail({
                                        to: nominee.email,
                                        subject: isFinalStage
                                            ? '🚨 URGENT: Vault Protocol Is About To Trigger'
                                            : `⚠️ Alert: Your benefactor's heartbeat is overdue (Stage ${newMissCount}/${maxBuffer})`,
                                        html: `
                                        <div style="font-family:'Inter',Arial,sans-serif;max-width:600px;margin:0 auto;background:#0f172a;padding:30px;color:#f8fafc;border-radius:12px;">
                                          <h2 style="color:${isFinalStage ? '#ef4444' : '#f97316'};margin-top:0;">${isFinalStage ? '🚨 Protocol Trigger Imminent' : '⚠️ Heartbeat Overdue Alert'}</h2>
                                          <p>Hi <strong>${nominee.name || 'Beneficiary'}</strong>,</p>
                                          <p>The AlwaysThere Vault heartbeat for <strong>${user.name || user.walletAddress}</strong> has been missed.</p>
                                          <div style="background:#1e293b;border-radius:8px;padding:16px;margin:20px 0;border-left:4px solid ${isFinalStage ? '#ef4444' : '#f97316'};">
                                            <p style="margin:0;font-size:14px;">Buffer Status: <strong style="color:${isFinalStage ? '#ef4444' : '#f97316'};">${newMissCount} of ${maxBuffer} missed</strong></p>
                                            ${isFinalStage ? '<p style="margin:8px 0 0 0;font-size:13px;color:#fca5a5;">If no heartbeat is received, assets will be distributed to you shortly.</p>' : '<p style="margin:8px 0 0 0;font-size:13px;color:#94a3b8;">The owner still has time to check in and abort the protocol.</p>'}
                                          </div>
                                          <p style="color:#64748b;font-size:11px;text-transform:uppercase;letter-spacing:1px;">AlwaysThere Vault — Secure Digital Legacy</p>
                                        </div>`
                                    });
                                    this.logger.log(`📧 Nominee alert sent to ${nominee.email} (Stage ${newMissCount}/${maxBuffer})`);
                                } else {
                                    this.logger.warn(`Nominee ${nominee.name} has no email`);
                                }
                            }
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
                            if (user.email) {
                                await this.emailService.sendEmail({
                                    to: user.email,
                                    subject: '🚨 AlwaysThere Vault Activated',
                                    html: `
<div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; background: #0f172a; padding: 40px 20px; color: #f8fafc; line-height: 1.6;">
  <!-- Premium Card -->
  <div style="background: #1e293b; border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.1); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(220, 38, 38, 0.2); overflow: hidden;">
    <div style="background: linear-gradient(135deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.8) 100%); border-bottom: 2px solid #ef4444; padding: 30px; text-align: center;">
      <div style="width: 60px; height: 60px; background: rgba(0,0,0,0.3); border-radius: 50%; border: 2px solid #ef4444; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; font-size: 28px; box-shadow: 0 0 20px rgba(239, 68, 68, 0.4);">🚨</div>
      <h1 style="margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px; color: #ffffff;">PROTOCOL ACTIVATED</h1>
    </div>
    <div style="padding: 35px 30px;">
      <p style="font-size: 16px; color: #cbd5e1;">All heartbeat time buffers for wallet <br/><strong style="color: #38bdf8; word-break: break-all;">${user.walletAddress}</strong><br/> have been completely exhausted.</p>
      <div style="background: rgba(239, 68, 68, 0.05); border-left: 4px solid #ef4444; padding: 16px; margin: 25px 0; border-radius: 4px;">
        <p style="margin: 0; color: #fecaca; font-size: 14.5px;">Assets and Cryptographic Key Shares are now being irreversibly distributed to your authorized beneficiaries according to your Smart Contract instructions.</p>
      </div>
    </div>
    <div style="background: #0f172a; padding: 20px; text-align: center; border-top: 1px solid #334155;">
      <p style="color: #64748b; font-size: 11px; margin: 0; text-transform: uppercase;">Your legacy has been secured.<br/>AlwaysThere Vault</p>
    </div>
  </div>
</div>`
                                });
                            }

                            // Notify all beneficiaries with claim access token
                            const nominees = await this.beneficiariesService.getAllBeneficiaries(user.walletAddress);
                            this.logger.log(`Notifying ${nominees.length} beneficiaries for ${user.walletAddress}...`);
                            
                            for (const nominee of nominees) {
                                try {
                                    if (nominee.email) {
                                        const token = await this.tokenService.generateToken('CLAIM_ACCESS', user.id, nominee.walletAddress, 7 * 24); // 7 days expiry
                                        const backendUrl = process.env.API_URL || process.env.RENDER_EXTERNAL_URL || `http://localhost:${process.env.PORT || 7001}`;
                                        const claimUrl = `${backendUrl}/api/claim/${token}`;
                                        
                                        await this.emailService.sendAssetReleaseNotification(
                                            nominee.email,
                                            nominee.name,
                                            user.name || 'The account owner',
                                            user.walletAddress,
                                            1,
                                            claimUrl
                                        );
                                        this.logger.log(`📧 Asset release email dispatched successfully to nominee: ${nominee.email}`);
                                    }
                                } catch (nomineeError) {
                                    this.logger.error(`Failed to dispatch notification/token for nominee ${nominee.email || nominee.id}: ${nomineeError.message}`);
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
