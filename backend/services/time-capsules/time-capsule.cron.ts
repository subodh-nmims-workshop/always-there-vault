import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TimeCapsulesService } from './time-capsules.service';
import { EmailService } from '../email/email.service';
import { TokenService } from '../auth/token.service';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../src/db/schema/relations';
import { Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';

@Injectable()
export class TimeCapsuleCronService {
  private readonly logger = new Logger(TimeCapsuleCronService.name);

  constructor(
    private readonly timeCapsulesService: TimeCapsulesService,
    private readonly emailService: EmailService,
    private readonly tokenService: TokenService,
    @Inject('DB_CONNECTION')
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
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
        const token = await this.tokenService.generateToken('CLAIM_ACCESS', beneficiary.id, sender.walletAddress, 7 * 24);
        const backendUrl = process.env.API_URL || 'http://localhost:3001';
        const claimUrl = `${backendUrl}/api/claim/${token}`;

        // Send Email
        const emailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: white; padding: 40px; border-radius: 12px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <span style="font-size: 40px;">🕰️</span>
              <h1 style="color: #38bdf8;">Time Capsule Received</h1>
            </div>
            
            <p>Hello <strong>${beneficiary.name}</strong>,</p>
            <p><strong>${sender.name || sender.walletAddress}</strong> scheduled a digital Time Capsule for you, and the delivery date has arrived!</p>
            
            ${capsule.customMessage ? `
              <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #38bdf8;">
                <p style="margin: 0; font-style: italic;">"${capsule.customMessage}"</p>
              </div>
            ` : ''}
            
            <div style="text-align: center; margin-top: 40px;">
              <a href="${claimUrl}" style="background: #38bdf8; color: #0f172a; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">Unlock Time Capsule</a>
            </div>
            
            <p style="margin-top: 40px; font-size: 12px; color: #64748b; text-align: center;">Secured by AlwaysThere Protocol</p>
          </div>
        `;

        await this.emailService.sendEmail({
          to: beneficiary.email,
          subject: `🕰️ You received a Time Capsule from ${sender.name || 'someone special'}`,
          html: emailHtml
        });

        // Mark as delivered
        await this.timeCapsulesService.markAsDelivered(capsule.id);
        this.logger.log(`Successfully delivered Time Capsule ${capsule.id} to ${beneficiary.email}`);
      }
    } catch (error) {
      this.logger.error('Failed to process scheduled deliveries', error);
    }
  }
}
