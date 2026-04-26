import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  private fromEmail: string;

  constructor(private configService: ConfigService) {
    const host = this.configService.get<string>('SMTP_HOST') || 'smtp.ethereal.email';
    const port = parseInt(this.configService.get<string>('SMTP_PORT') || '587');
    const user = this.configService.get<string>('SMTP_USER');
    const pass = this.configService.get<string>('SMTP_PASS');
    this.fromEmail = this.configService.get<string>('SMTP_FROM') || `"Last Wish Protocol" <${user}>`;

    if (!user || user.includes('example')) {
      console.warn('⚠️  SMTP_USER or SMTP_PASS not configured. Using temporary Ethereal account logic.');
    }

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, 
      auth: {
        user,
        pass,
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    const user = this.configService.get<string>('SMTP_USER');
    
    // If no real email provided, use Ethereal for a REAL preview without credentials
    if (!user || user.includes('your-email') || user.includes('paste-your-16-digit')) {
       try {
         const testAccount = await nodemailer.createTestAccount();
         const testTransporter = nodemailer.createTransport({
           host: 'smtp.ethereal.email',
           port: 587,
           secure: false,
           auth: { user: testAccount.user, pass: testAccount.pass }
         });

         const info = await testTransporter.sendMail({
           from: `"Last Wish Protocol Test" <${user}>`,
           to: options.to,
           subject: options.subject,
           html: options.html,
         });

         console.log('📬 REAL TEST MAIL SENT!');
         console.log('🔗 VIEW PREVIEW HERE:', nodemailer.getTestMessageUrl(info));
         return true;
       } catch (err) {
         console.error('Test account creation failed:', err);
         return false;
       }
    }

    try {
      await this.transporter.sendMail({
        from: this.fromEmail,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
      });

      console.log('✅ Email sent successfully to:', options.to);
      return true;
    } catch (error) {
      console.error('Email service error:', error);
      return false;
    }
  }

  async sendWelcomeEmail(email: string, name: string): Promise<boolean> {
    return this.sendEmail({
      to: email,
      subject: 'Welcome to Last Wish Protocol',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1152d4;">Welcome to Last Wish Protocol! 🎉</h1>
          <p>Hi ${name},</p>
          <p>Thank you for joining Last Wish Protocol. Your digital legacy is now secure.</p>
          <h2>What's Next?</h2>
          <ul>
            <li>Upload your first digital asset</li>
            <li>Add beneficiaries</li>
            <li>Set up your heartbeat schedule</li>
            <li>Explore premium features</li>
          </ul>
          <p>You have 30 days of free trial to explore all features!</p>
          <a href="https://lastwishprotocol.com/dashboard" style="display: inline-block; background: #1152d4; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 20px 0;">
            Go to Dashboard
          </a>
          <p style="color: #666; font-size: 12px; margin-top: 40px;">
            If you have any questions, reply to this email or visit our support center.
          </p>
        </div>
      `,
      text: `Welcome to Last Wish Protocol! Hi ${name}, thank you for joining. Start by uploading your first asset and adding beneficiaries.`,
    });
  }

  async sendBeneficiaryAddedEmail(email: string, name: string, ownerName: string): Promise<boolean> {
    return this.sendEmail({
      to: email,
      subject: 'You have been added as a beneficiary',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1152d4;">You're a Beneficiary 🎁</h1>
          <p>Hi ${name},</p>
          <p><strong>${ownerName}</strong> has added you as a beneficiary in their Last Wish Protocol account.</p>
          <h2>What does this mean?</h2>
          <p>You will receive access to designated digital assets if the owner's heartbeat is not detected within the specified timeframe.</p>
          <h2>Important Information:</h2>
          <ul>
            <li>You don't need to do anything right now</li>
            <li>We'll notify you if action is required</li>
            <li>All assets are encrypted and secure</li>
            <li>You can create your own account anytime</li>
          </ul>
          <a href="https://lastwishprotocol.com" style="display: inline-block; background: #1152d4; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 20px 0;">
            Learn More
          </a>
        </div>
      `,
      text: `Hi ${name}, ${ownerName} has added you as a beneficiary in Last Wish Protocol. You'll be notified if action is required.`,
    });
  }

  async sendHeartbeatReminderEmail(email: string, name: string, daysOverdue: number): Promise<boolean> {
    return this.sendEmail({
      to: email,
      subject: `⚠️ Heartbeat Required - ${daysOverdue} days overdue`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #f59e0b;">⚠️ Heartbeat Required</h1>
          <p>Hi ${name},</p>
          <p>Your heartbeat is <strong>${daysOverdue} days overdue</strong>.</p>
          <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin: 20px 0;">
            <p style="margin: 0; color: #92400e;">
              <strong>Action Required:</strong> Please submit your heartbeat to prevent asset release to beneficiaries.
            </p>
          </div>
          <p>If you don't submit a heartbeat within the grace period, your designated assets will be released to your beneficiaries.</p>
          <a href="https://lastwishprotocol.com/dashboard" style="display: inline-block; background: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 20px 0;">
            Submit Heartbeat Now
          </a>
          <p style="color: #666; font-size: 12px; margin-top: 40px;">
            This is an automated reminder. If you're unable to access your account, please contact support immediately.
          </p>
        </div>
      `,
      text: `Hi ${name}, your heartbeat is ${daysOverdue} days overdue. Please submit your heartbeat to prevent asset release.`,
    });
  }

  async sendPaymentSuccessEmail(email: string, name: string, plan: string, amount: number): Promise<boolean> {
    return this.sendEmail({
      to: email,
      subject: 'Payment Successful - Subscription Activated',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #10b981;">✅ Payment Successful!</h1>
          <p>Hi ${name},</p>
          <p>Thank you for your payment. Your subscription has been activated.</p>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Subscription Details</h3>
            <p><strong>Plan:</strong> ${plan}</p>
            <p><strong>Amount:</strong> $${amount.toFixed(2)}</p>
            <p><strong>Status:</strong> Active</p>
          </div>
          <p>You now have access to all premium features!</p>
          <a href="https://lastwishprotocol.com/subscription" style="display: inline-block; background: #1152d4; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 20px 0;">
            View Subscription
          </a>
          <p style="color: #666; font-size: 12px; margin-top: 40px;">
            Receipt and invoice details are available in your account dashboard.
          </p>
        </div>
      `,
      text: `Hi ${name}, your payment of $${amount.toFixed(2)} was successful. Your ${plan} subscription is now active.`,
    });
  }

  async sendAssetReleaseNotification(email: string, name: string, ownerName: string, ownerAddress: string, assetCount: number): Promise<boolean> {
    return this.sendEmail({
      to: email,
      subject: 'Assets Released - Action Required',
      html: `
<div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; background: #0f172a; padding: 40px 20px; color: #f8fafc; line-height: 1.6;">
  
  <!-- Premium Card Container -->
  <div style="background: #1e293b; border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.1); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(56, 189, 248, 0.2); overflow: hidden;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.8) 100%); border-bottom: 2px solid #38bdf8; padding: 30px; text-align: center;">
      <div style="width: 60px; height: 60px; background: rgba(0,0,0,0.3); border-radius: 50%; border: 2px solid #38bdf8; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; font-size: 28px; box-shadow: 0 0 20px rgba(56, 189, 248, 0.4);">
        💎
      </div>
      <h1 style="margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px; color: #ffffff;">
        VAULT UNLOCKED
      </h1>
      <p style="margin: 10px 0 0 0; color: #38bdf8; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
        Assets Released Successfully
      </p>
    </div>

    <!-- Body -->
    <div style="padding: 35px 30px;">
      <p style="font-size: 18px; margin-top: 0; color: #e2e8f0;">Greetings <strong>${name}</strong>,</p>
      <p style="color: #cbd5e1; font-size: 15px;">
        The Last Wish Protocol heartbeat for Commander <strong>${ownerName}</strong> has ceased and the maximum time buffer has been exhausted. Protocol instructions have been executed securely via Smart Contract.
      </p>

      <div style="background: #0f172a; border-radius: 12px; padding: 25px; margin: 30px 0; border: 1px solid #334155; text-align: center;">
        <h3 style="margin: 0 0 10px 0; color: #94a3b8; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Inheritance Granted</h3>
        <p style="margin: 0; font-size: 28px; font-weight: bold; color: #38bdf8;">
          ${assetCount} <span style="font-size: 18px; color: #64748b;">Digital Asset(s)</span>
        </p>
      </div>

      <div style="background: rgba(56, 189, 248, 0.05); border-left: 4px solid #38bdf8; padding: 16px; margin: 25px 0; border-radius: 4px;">
        <p style="margin: 0; color: #e0f2fe; font-size: 14.5px;">
          <strong style="color: #38bdf8;">Authorization Required:</strong> You now hold cryptographic clearance. Access your secure dashboard to decipher and claim the allocated assets.
        </p>
      </div>

      <!-- Action Button -->
      <div style="text-align: center; margin-top: 35px;">
        <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/beneficiary/assets?owner=${ownerAddress}"
           style="display: inline-block; background: linear-gradient(135deg, #0ea5e9, #0284c7); color: #ffffff; padding: 16px 36px; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 10px 20px rgba(0,0,0,0.3), 0 0 20px rgba(56, 189, 248, 0.3); transition: all 0.3s ease;">
          Claim Digital Assets
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background: #0f172a; padding: 20px; text-align: center; border-top: 1px solid #334155;">
      <p style="color: #64748b; font-size: 11px; margin: 0; text-transform: uppercase; letter-spacing: 1px;">
        Secured by Last Wish Protocol<br/>
        End-to-End Encrypted Proof-of-Trust Distribution
      </p>
    </div>
  </div>
</div>
      `,
      text: `Hi ${name}, assets from ${ownerName} have been released. You have access to ${assetCount} digital asset(s). Log in to view them.`,
    });
  }

  async sendTrialExpiringEmail(email: string, name: string, daysRemaining: number): Promise<boolean> {
    return this.sendEmail({
      to: email,
      subject: `Trial Ending Soon - ${daysRemaining} days left`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #f59e0b;">⏰ Trial Ending Soon</h1>
          <p>Hi ${name},</p>
          <p>Your free trial will end in <strong>${daysRemaining} days</strong>.</p>
          <p>To continue using Last Wish Protocol and keep your digital legacy secure, please upgrade to a paid plan.</p>
          <h2>Why Upgrade?</h2>
          <ul>
            <li>Unlimited asset storage</li>
            <li>Advanced encryption</li>
            <li>Priority support</li>
            <li>Automatic heartbeat reminders</li>
          </ul>
          <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/pricing" style="display: inline-block; background: #1152d4; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 20px 0;">
            View Plans
          </a>
          <p style="color: #666; font-size: 12px; margin-top: 40px;">
            Your data will remain secure even after trial expiration, but you won't be able to add new assets.
          </p>
        </div>
      `,
      text: `Hi ${name}, your trial ends in ${daysRemaining} days. Upgrade to continue using all features.`,
    });
  }
}
