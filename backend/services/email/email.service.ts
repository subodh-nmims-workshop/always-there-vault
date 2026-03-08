import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

@Injectable()
export class EmailService {
  private resendApiKey: string;
  private fromEmail: string;

  constructor(private configService: ConfigService) {
    this.resendApiKey = this.configService.get<string>('RESEND_API_KEY') || '';
    this.fromEmail = this.configService.get<string>('FROM_EMAIL') || 'noreply@deadmanprotocol.com';
    
    if (!this.resendApiKey) {
      console.warn('⚠️  RESEND_API_KEY not configured. Email features will be disabled.');
    }
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    if (!this.resendApiKey) {
      console.log('📧 Email would be sent (disabled):', options.subject);
      return false;
    }

    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: this.fromEmail,
          to: options.to,
          subject: options.subject,
          html: options.html,
          text: options.text,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('Failed to send email:', error);
        return false;
      }

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
      subject: 'Welcome to DeadMan Protocol',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1152d4;">Welcome to DeadMan Protocol! 🎉</h1>
          <p>Hi ${name},</p>
          <p>Thank you for joining DeadMan Protocol. Your digital legacy is now secure.</p>
          <h2>What's Next?</h2>
          <ul>
            <li>Upload your first digital asset</li>
            <li>Add beneficiaries</li>
            <li>Set up your heartbeat schedule</li>
            <li>Explore premium features</li>
          </ul>
          <p>You have 30 days of free trial to explore all features!</p>
          <a href="https://deadmanprotocol.com/dashboard" style="display: inline-block; background: #1152d4; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 20px 0;">
            Go to Dashboard
          </a>
          <p style="color: #666; font-size: 12px; margin-top: 40px;">
            If you have any questions, reply to this email or visit our support center.
          </p>
        </div>
      `,
      text: `Welcome to DeadMan Protocol! Hi ${name}, thank you for joining. Start by uploading your first asset and adding beneficiaries.`,
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
          <p><strong>${ownerName}</strong> has added you as a beneficiary in their DeadMan Protocol account.</p>
          <h2>What does this mean?</h2>
          <p>You will receive access to designated digital assets if the owner's heartbeat is not detected within the specified timeframe.</p>
          <h2>Important Information:</h2>
          <ul>
            <li>You don't need to do anything right now</li>
            <li>We'll notify you if action is required</li>
            <li>All assets are encrypted and secure</li>
            <li>You can create your own account anytime</li>
          </ul>
          <a href="https://deadmanprotocol.com" style="display: inline-block; background: #1152d4; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 20px 0;">
            Learn More
          </a>
        </div>
      `,
      text: `Hi ${name}, ${ownerName} has added you as a beneficiary in DeadMan Protocol. You'll be notified if action is required.`,
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
          <a href="https://deadmanprotocol.com/dashboard" style="display: inline-block; background: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 20px 0;">
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
          <a href="https://deadmanprotocol.com/subscription" style="display: inline-block; background: #1152d4; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 20px 0;">
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

  async sendAssetReleaseNotification(email: string, name: string, ownerName: string, assetCount: number): Promise<boolean> {
    return this.sendEmail({
      to: email,
      subject: 'Assets Released - Action Required',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1152d4;">Assets Released 🔓</h1>
          <p>Hi ${name},</p>
          <p>The heartbeat for <strong>${ownerName}</strong> has not been detected within the specified timeframe.</p>
          <p>As a designated beneficiary, you now have access to <strong>${assetCount} digital asset(s)</strong>.</p>
          <div style="background: #dbeafe; border-left: 4px solid #1152d4; padding: 16px; margin: 20px 0;">
            <p style="margin: 0; color: #1e40af;">
              <strong>Next Steps:</strong> Log in to your account to view and access the released assets.
            </p>
          </div>
          <a href="https://deadmanprotocol.com/beneficiary/assets" style="display: inline-block; background: #1152d4; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 20px 0;">
            Access Assets
          </a>
          <p style="color: #666; font-size: 12px; margin-top: 40px;">
            All assets are encrypted. You'll need the decryption keys provided by the owner.
          </p>
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
          <p>To continue using DeadMan Protocol and keep your digital legacy secure, please upgrade to a paid plan.</p>
          <h2>Why Upgrade?</h2>
          <ul>
            <li>Unlimited asset storage</li>
            <li>Advanced encryption</li>
            <li>Priority support</li>
            <li>Automatic heartbeat reminders</li>
          </ul>
          <a href="https://deadmanprotocol.com/pricing" style="display: inline-block; background: #1152d4; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 20px 0;">
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
