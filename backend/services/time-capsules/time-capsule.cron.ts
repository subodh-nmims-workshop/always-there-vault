import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TimeCapsulesService } from './time-capsules.service';
import { EmailService } from '../email/email.service';
import { TokenService } from '../auth/token.service';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../src/db/schema/relations';
import { Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { buildEmailShell, ctaButton, escapeHtml } from '../email/email-templates';

@Injectable()
export class TimeCapsuleCronService {
  private readonly logger = new Logger(TimeCapsuleCronService.name);

  constructor(
    private readonly timeCapsulesService: TimeCapsulesService,
    private readonly emailService: EmailService,
    private readonly tokenService: TokenService,
    @Inject('DRIZZLE_DB')
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleScheduledDeliveries() {
    this.logger.log('Checking for pending Time Capsule deliveries...');
    
    try {
      const pendingDeliveries = await this.timeCapsulesService.getPendingDeliveries();
      
      if (pendingDeliveries.length === 0) {
        this.logger.log('No pending Time Capsules found.');
        return;
      }

      this.logger.log(`Found ${pendingDeliveries.length} Time Capsules to deliver.`);

      for (const capsule of pendingDeliveries) {
        try {
          // Fetch beneficiary details
          const beneficiaries = await this.db.select().from(schema.beneficiaries).where(eq(schema.beneficiaries.id, capsule.beneficiaryId));
          const beneficiary = beneficiaries[0];
          
          // Fetch sender (user) details
          const users = await this.db.select().from(schema.users).where(eq(schema.users.id, capsule.userId));
          const sender = users[0];

          if (!beneficiary || !beneficiary.email || !sender) {
            this.logger.warn(`Missing beneficiary/sender info for capsule ${capsule.id}`);
            continue;
          }

          // Generate a 7-day token for them to access this specific asset
          const targetAddress = (beneficiary.walletAddress && beneficiary.walletAddress !== '0x0000000000000000000000000000000000000000') ? beneficiary.walletAddress : beneficiary.id;
          const token = await this.tokenService.generateToken('CLAIM_ACCESS', sender.id, targetAddress, 7 * 24);
          const frontendUrl = (process.env.FRONTEND_URL || 'http://localhost:7000').trim();
          const claimUrl = `${frontendUrl}/claim/${token}?owner=${sender.walletAddress}`;

          // Send Email
          const escapedBeneName = escapeHtml(beneficiary.name);
          const escapedSenderName = escapeHtml(sender.name || sender.walletAddress);
          const escapedMessage = capsule.customMessage ? escapeHtml(capsule.customMessage) : '';

          const body = `
            <p style="font-size:16px;color:#e2e8f0;margin:0 0 16px;">Hello <strong>${escapedBeneName}</strong>,</p>
            <p style="font-size:14px;color:#94a3b8;line-height:1.8;margin:0 0 24px;">
              <strong style="color:#ffffff;">${escapedSenderName}</strong> scheduled a digital Time Capsule for you, and the delivery date has arrived!
            </p>
            ${escapedMessage ? `
              <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #38bdf8;">
                <p style="margin: 0; font-style: italic; color: #e2e8f0;">"${escapedMessage}"</p>
              </div>
            ` : ''}
            ${ctaButton(claimUrl, 'Unlock Time Capsule →', '#38bdf8')}
          `;

          const emailHtml = buildEmailShell({
            accentColor: '#38bdf8',
            accentGlow: 'rgba(56,189,248,0.2)',
            icon: '🕰️',
            headline: 'Time Capsule Unlocked',
            subline: 'Scheduled Delivery Arrived',
            body,
            footerNote: 'Secured by AlwaysThere Vault Protocol.',
          });

          const verifiedSenderEmail = sender.emailVerified ? sender.email : (sender.alternativeEmailVerified ? sender.alternativeEmail : null);
          const fromEmailHeader = verifiedSenderEmail 
            ? `"${sender.name || 'AlwaysThere Vault Owner'}" <${verifiedSenderEmail}>` 
            : undefined;

          await this.emailService.sendEmail({
            to: beneficiary.email,
            subject: `🕰️ You received a Time Capsule from ${sender.name || 'someone special'}`,
            html: emailHtml,
            from: fromEmailHeader
          });

          // Mark as delivered
          await this.timeCapsulesService.markAsDelivered(capsule.id);
          this.logger.log(`Successfully delivered Time Capsule ${capsule.id} to ${beneficiary.email}`);
        } catch (capsuleError) {
          this.logger.error(`Failed to deliver Time Capsule ${capsule.id}: ${capsuleError.message}`);
        }
      }
    } catch (error) {
      this.logger.error('Failed to process scheduled deliveries', error);
    }
  }
}
