import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { buildEmailShell, statRow, infoBox, alertStrip, ctaButton } from './email-templates';

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
  private frontendUrl: string;

  constructor(private configService: ConfigService) {
    const host = this.configService.get<string>('SMTP_HOST') || this.configService.get<string>('EMAIL_HOST') || 'smtp.ethereal.email';
    const port = parseInt(this.configService.get<string>('SMTP_PORT') || this.configService.get<string>('EMAIL_PORT') || '587');
    const user = this.configService.get<string>('SMTP_USER') || this.configService.get<string>('EMAIL_USER');
    const pass = this.configService.get<string>('SMTP_PASS') || this.configService.get<string>('EMAIL_PASSWORD');
    const defaultSender = user && user.includes('brevo') ? 'subodhram3350@gmail.com' : user;
    this.fromEmail = this.configService.get<string>('SMTP_FROM') || `"AlwaysThere Vault" <${defaultSender}>`;
    this.frontendUrl = this.configService.get<string>('FRONTEND_URL') || 'http://localhost:7000';

    this.transporter = nodemailer.createTransport({
      host, port,
      secure: port === 465,
      auth: { user, pass },
      tls: { rejectUnauthorized: false }
    });
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    const resendKey = this.configService.get<string>('RESEND_API_KEY');
    if (resendKey && !resendKey.includes('your-resend') && !resendKey.includes('placeholder')) {
      try {
        const from = this.configService.get<string>('SMTP_FROM') || 'AlwaysThere Vault <onboarding@resend.dev>';
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from,
            to: options.to,
            subject: options.subject,
            html: options.html
          })
        });
        if (res.ok) {
          console.log('✅ Email sent via Resend API to:', options.to);
          return true;
        } else {
          const errText = await res.text();
          console.error('❌ Resend API error:', errText);
        }
      } catch (err) {
        console.error('❌ Resend dispatch failed:', err);
      }
    }

    const user = this.configService.get<string>('SMTP_USER') || this.configService.get<string>('EMAIL_USER');
    const pass = this.configService.get<string>('SMTP_PASS') || this.configService.get<string>('EMAIL_PASSWORD');
    const host = this.configService.get<string>('SMTP_HOST') || this.configService.get<string>('EMAIL_HOST');

    if (pass && (pass.startsWith('xsmtpkey') || pass.startsWith('xkeysib') || host?.includes('brevo'))) {
      try {
        const fromEmail = this.configService.get<string>('SMTP_FROM') || (user && user.includes('brevo') ? 'subodhram3350@gmail.com' : user) || 'ks5093654@gmail.com';
        let senderEmail = fromEmail;
        let senderName = 'AlwaysThere Vault';
        if (fromEmail.includes('<')) {
          const match = fromEmail.match(/(.*)<(.*)>/);
          if (match) {
            senderName = match[1].replace(/"/g, '').trim();
            senderEmail = match[2].trim();
          }
        }
        
        const res = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'api-key': pass,
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            sender: { name: senderName, email: senderEmail },
            to: [{ email: options.to }],
            subject: options.subject,
            htmlContent: options.html
          })
        });

        if (res.ok) {
          console.log('✅ Email sent via Brevo API to:', options.to);
          return true;
        } else {
          const errText = await res.text();
          console.error('❌ Brevo API error:', errText);
        }
      } catch (err) {
        console.error('❌ Brevo API dispatch failed:', err);
      }
    }

    const isUnconfigured = !user || user.includes('your-email') || user.includes('paste-your-16-digit') || user.includes('example');

    if (isUnconfigured) {
      if (process.env.NODE_ENV === 'production') {
        console.error('❌ CRITICAL ERROR: SMTP credentials (SMTP_USER / SMTP_PASS) are not configured or are placeholder values in Render environment variables! Real emails cannot be delivered.');
        return false;
      }
      try {
        const testAccount = await nodemailer.createTestAccount();
        const testTransporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email', port: 587, secure: false,
          auth: { user: testAccount.user, pass: testAccount.pass }
        });
        const info = await testTransporter.sendMail({
          from: `"AlwaysThere Vault" <${testAccount.user}>`,
          to: options.to, subject: options.subject, html: options.html,
        });
        console.log('📬 TEST EMAIL SENT — Preview:', nodemailer.getTestMessageUrl(info));
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
      console.log('✅ Email sent to:', options.to);
      return true;
    } catch (error) {
      console.error('Email service error:', error);
      return false;
    }
  }

  // ─────────────────────────────────────────
  //  WELCOME
  // ─────────────────────────────────────────
  async sendWelcomeEmail(email: string, name: string): Promise<boolean> {
    const body = `
      <p style="font-size:16px;color:#e2e8f0;margin:0 0 16px;">Welcome, <strong>${name}</strong>.</p>
      <p style="font-size:14px;color:#94a3b8;line-height:1.8;margin:0 0 24px;">
        Your AlwaysThere Vault is now active. You hold the most powerful tool for securing your digital legacy —
        a decentralized, encrypted, and automated inheritance protocol.
      </p>
      ${infoBox(`
        ${statRow('Trial Period', '30 Days Free', '#38bdf8')}
        ${statRow('Encryption', 'AES-256 End-to-End', '#22c55e')}
        ${statRow('Assets', 'Unlimited Uploads', '#a78bfa')}
        ${statRow('Beneficiaries', 'Up to 5 Nominees', '#f59e0b', true)}
      `)}
      ${alertStrip('#22c55e', '<strong>Next Steps:</strong> Upload your first asset, add your beneficiaries, and configure your heartbeat schedule to activate the protocol.')}
      ${ctaButton(`${this.frontendUrl}/dashboard`, 'Open Your Vault →', '#0ea5e9')}
    `;
    return this.sendEmail({
      to: email,
      subject: 'Your AlwaysThere Vault is Ready',
      html: buildEmailShell({
        accentColor: '#0ea5e9',
        accentGlow: 'rgba(14,165,233,0.25)',
        icon: '🔐',
        headline: 'Vault Activated',
        subline: 'Your Digital Legacy is Now Secured',
        body,
        footerNote: 'You are receiving this because you created an AlwaysThere account.',
      }),
      text: `Welcome ${name}! Your AlwaysThere Vault is active. Start by uploading your first asset.`,
    });
  }

  // ─────────────────────────────────────────
  //  EMAIL VERIFICATION OTP
  // ─────────────────────────────────────────
  async sendVerificationEmail(email: string, code: string): Promise<boolean> {
    const body = `
      <p style="font-size:14px;color:#94a3b8;line-height:1.8;margin:0 0 24px;">
        To protect your vault, please verify your email address. This address will receive
        all critical heartbeat alerts and inheritance execution notifications.
      </p>
      <div style="background:#060d1a;border:1px solid rgba(14,165,233,0.3);border-radius:12px;padding:28px;margin:24px 0;text-align:center;">
        <p style="margin:0 0 12px;font-size:11px;color:#64748b;letter-spacing:1.5px;text-transform:uppercase;">Your Verification Code</p>
        <div style="font-size:40px;font-weight:800;letter-spacing:12px;color:#ffffff;font-family:'Courier New',monospace;text-shadow:0 0 20px rgba(14,165,233,0.5);">${code}</div>
        <p style="margin:12px 0 0;font-size:12px;color:#475569;">Expires in <strong style="color:#f59e0b;">5 minutes</strong></p>
      </div>
      ${alertStrip('#f59e0b', 'If you did not request this code, please ignore this email. Your account remains secure.')}
    `;
    return this.sendEmail({
      to: email,
      subject: 'AlwaysThere Vault — Email Verification Code',
      html: buildEmailShell({
        accentColor: '#0ea5e9',
        accentGlow: 'rgba(14,165,233,0.2)',
        icon: '✉️',
        headline: 'Verify Your Email',
        subline: 'One-Time Verification Code',
        body,
        footerNote: 'This code expires in 5 minutes. Do not share it with anyone.',
      }),
      text: `Your AlwaysThere verification code is: ${code}. Expires in 5 minutes.`,
    });
  }

  async sendBeneficiaryVerificationEmail(email: string, name: string, code: string, ownerName: string): Promise<boolean> {
    const body = `
      <p style="font-size:14px;color:#94a3b8;line-height:1.8;margin:0 0 24px;">
        To activate your status as a nominee beneficiary in <strong>${ownerName}</strong>'s Digital Will Vault, please provide the verification code below to the vault owner, or enter it in your dashboard verification panel.
      </p>
      <div style="background:#060d1a;border:1px solid rgba(167,139,250,0.3);border-radius:12px;padding:28px;margin:24px 0;text-align:center;">
        <p style="margin:0 0 12px;font-size:11px;color:#64748b;letter-spacing:1.5px;text-transform:uppercase;">Beneficiary OTP Code</p>
        <div style="font-size:40px;font-weight:800;letter-spacing:12px;color:#ffffff;font-family:'Courier New',monospace;text-shadow:0 0 20px rgba(167,139,250,0.5);">${code}</div>
        <p style="margin:12px 0 0;font-size:12px;color:#475569;">Expires in <strong style="color:#f59e0b;">15 minutes</strong></p>
      </div>
      ${alertStrip('#f59e0b', 'If you did not request this, you can ignore this email. Your status is secured.')}
    `;
    return this.sendEmail({
      to: email,
      subject: `AlwaysThere Vault — Beneficiary Verification Code`,
      html: buildEmailShell({
        accentColor: '#a78bfa',
        accentGlow: 'rgba(167,139,250,0.2)',
        icon: '🔑',
        headline: 'Nominee Verification',
        subline: 'Verify Beneficiary Status',
        body,
        footerNote: 'This code expires in 15 minutes. Do not share it with unauthorized users.',
      }),
      text: `Your AlwaysThere beneficiary verification code is: ${code}. Expires in 15 minutes.`,
    });
  }

  // ─────────────────────────────────────────
  //  BENEFICIARY ADDED
  // ─────────────────────────────────────────
  async sendBeneficiaryAddedEmail(email: string, name: string, ownerName: string): Promise<boolean> {
    const body = `
      <p style="font-size:16px;color:#e2e8f0;margin:0 0 16px;">Hello, <strong>${name}</strong>.</p>
      <p style="font-size:14px;color:#94a3b8;line-height:1.8;margin:0 0 24px;">
        <strong style="color:#ffffff;">${ownerName}</strong> has designated you as a beneficiary
        in their AlwaysThere Vault — a secure, blockchain-backed digital inheritance protocol.
      </p>
      ${infoBox(`
        ${statRow('Designated By', ownerName, '#e2e8f0')}
        ${statRow('Status', 'Active Beneficiary', '#22c55e')}
        ${statRow('Action Required', 'None at this time', '#64748b', true)}
      `)}
      ${alertStrip('#a78bfa', 'You will receive an automatic notification if the vault owner\'s heartbeat goes undetected for the configured duration. At that point, you will be granted access to assets assigned specifically to you.')}
      ${ctaButton(`${this.frontendUrl}`, 'Learn About AlwaysThere →', '#a78bfa')}
    `;
    return this.sendEmail({
      to: email,
      subject: `${ownerName} has named you as a Vault Beneficiary`,
      html: buildEmailShell({
        accentColor: '#a78bfa',
        accentGlow: 'rgba(167,139,250,0.2)',
        icon: '🎖️',
        headline: 'You Are a Beneficiary',
        subline: 'Vault Inheritance Protocol — Active',
        body,
        footerNote: `You were designated as a beneficiary by ${ownerName}. No action required.`,
      }),
      text: `Hi ${name}, ${ownerName} has added you as a beneficiary in AlwaysThere Vault. You'll be notified if action is required.`,
    });
  }

  // ─────────────────────────────────────────
  //  HEARTBEAT REMINDER
  // ─────────────────────────────────────────
  async sendHeartbeatReminderEmail(email: string, name: string, daysOverdue: number): Promise<boolean> {
    const urgency = daysOverdue >= 5 ? '#ef4444' : '#f59e0b';
    const body = `
      <p style="font-size:16px;color:#e2e8f0;margin:0 0 16px;">Commander <strong>${name}</strong>,</p>
      <p style="font-size:14px;color:#94a3b8;line-height:1.8;margin:0 0 24px;">
        Your vault heartbeat is overdue by <strong style="color:${urgency};">${daysOverdue} day${daysOverdue !== 1 ? 's' : ''}</strong>.
        Submit a proof-of-life heartbeat immediately to prevent automatic asset distribution.
      </p>
      ${infoBox(`
        ${statRow('Days Overdue', `${daysOverdue} Day${daysOverdue !== 1 ? 's' : ''}`, urgency)}
        ${statRow('Risk Level', daysOverdue >= 5 ? 'CRITICAL' : 'WARNING', urgency)}
        ${statRow('Required Action', 'Submit Heartbeat Now', '#f8fafc', true)}
      `)}
      ${alertStrip(urgency, 'If you do not submit a heartbeat before the buffer is exhausted, your protocol will trigger automatically and distribute your designated assets to your nominees.')}
      ${ctaButton(`${this.frontendUrl}/dashboard`, 'Submit Heartbeat Now →', urgency)}
    `;
    return this.sendEmail({
      to: email,
      subject: `⚠️ Action Required — Heartbeat ${daysOverdue} Day${daysOverdue !== 1 ? 's' : ''} Overdue`,
      html: buildEmailShell({
        accentColor: urgency,
        accentGlow: `rgba(239,68,68,0.2)`,
        icon: '⏳',
        headline: 'Heartbeat Overdue',
        subline: 'Immediate Action Required',
        body,
        footerNote: 'Automated heartbeat monitoring alert from AlwaysThere Vault Protocol.',
      }),
      text: `Hi ${name}, your heartbeat is ${daysOverdue} days overdue. Submit your heartbeat now to prevent asset distribution.`,
    });
  }

  // ─────────────────────────────────────────
  //  PAYMENT SUCCESS
  // ─────────────────────────────────────────
  async sendPaymentSuccessEmail(email: string, name: string, plan: string, amount: number): Promise<boolean> {
    const body = `
      <p style="font-size:16px;color:#e2e8f0;margin:0 0 16px;">Thank you, <strong>${name}</strong>.</p>
      <p style="font-size:14px;color:#94a3b8;line-height:1.8;margin:0 0 24px;">
        Your payment has been processed successfully and your subscription is now active.
        Full vault access has been unlocked.
      </p>
      ${infoBox(`
        ${statRow('Plan', plan, '#22c55e')}
        ${statRow('Amount Charged', `$${amount.toFixed(2)}`, '#e2e8f0')}
        ${statRow('Billing Status', 'Paid & Active', '#22c55e')}
        ${statRow('Next Renewal', 'Auto-renews monthly', '#64748b', true)}
      `)}
      ${ctaButton(`${this.frontendUrl}/dashboard`, 'Go to Your Vault →', '#22c55e')}
    `;
    return this.sendEmail({
      to: email,
      subject: `Payment Confirmed — ${plan} Plan Activated`,
      html: buildEmailShell({
        accentColor: '#22c55e',
        accentGlow: 'rgba(34,197,94,0.2)',
        icon: '✅',
        headline: 'Payment Successful',
        subline: `${plan} Subscription — Active`,
        body,
        footerNote: 'Receipt available in your account dashboard. Contact support@alwaysthere.app for billing queries.',
      }),
      text: `Hi ${name}, your payment of $${amount.toFixed(2)} was successful. ${plan} subscription is now active.`,
    });
  }

  // ─────────────────────────────────────────
  //  ASSET RELEASE (Nominee)
  // ─────────────────────────────────────────
  async sendAssetReleaseNotification(email: string, name: string, ownerName: string, ownerAddress: string, assetCount: number, claimUrl: string): Promise<boolean> {
    const body = `
      <p style="font-size:16px;color:#e2e8f0;margin:0 0 16px;">Greetings, <strong>${name}</strong>.</p>
      <p style="font-size:14px;color:#94a3b8;line-height:1.8;margin:0 0 24px;">
        The AlwaysThere Vault belonging to <strong style="color:#ffffff;">${ownerName}</strong> has
        triggered the inheritance protocol. All heartbeat buffers were exhausted and smart contract
        instructions have been executed. Assets designated to you are now available.
      </p>
      ${infoBox(`
        ${statRow('Vault Owner', ownerName, '#e2e8f0')}
        ${statRow('Wallet', ownerAddress.slice(0, 10) + '...' + ownerAddress.slice(-8), '#38bdf8')}
        ${statRow('Assets Assigned to You', `${assetCount} Digital Asset${assetCount !== 1 ? 's' : ''}`, '#22c55e')}
        ${statRow('Claim Window', '7 Days from this email', '#f59e0b', true)}
      `)}
      ${alertStrip('#38bdf8', '<strong>Important:</strong> Your unique claim link below expires in 7 days. Click it to access your secure vault portal and download the assets designated to you.')}
      ${ctaButton(claimUrl, 'Claim Your Inheritance →', '#0ea5e9')}
      <p style="font-size:11px;color:#334155;text-align:center;margin:16px 0 0;word-break:break-all;">
        Secure link: <a href="${claimUrl}" style="color:#475569;">${claimUrl}</a>
      </p>
    `;
    return this.sendEmail({
      to: email,
      subject: `🔓 Vault Unlocked — ${assetCount} Asset${assetCount !== 1 ? 's' : ''} Assigned to You`,
      html: buildEmailShell({
        accentColor: '#38bdf8',
        accentGlow: 'rgba(56,189,248,0.25)',
        icon: '💎',
        headline: 'Vault Protocol Triggered',
        subline: `${assetCount} Digital Asset${assetCount !== 1 ? 's' : ''} Released to You`,
        body,
        footerNote: 'This is a one-time inheritance notification. Your claim link is unique and expires in 7 days.',
      }),
      text: `Hi ${name}, assets from ${ownerName} have been released to you. You have ${assetCount} asset(s). Claim here: ${claimUrl}`,
    });
  }

  // ─────────────────────────────────────────
  //  TRIAL EXPIRING
  // ─────────────────────────────────────────
  async sendTrialExpiringEmail(email: string, name: string, daysRemaining: number): Promise<boolean> {
    const body = `
      <p style="font-size:16px;color:#e2e8f0;margin:0 0 16px;">Hi <strong>${name}</strong>,</p>
      <p style="font-size:14px;color:#94a3b8;line-height:1.8;margin:0 0 24px;">
        Your free trial expires in <strong style="color:#f59e0b;">${daysRemaining} day${daysRemaining !== 1 ? 's' : ''}</strong>.
        Upgrade now to ensure your digital legacy remains protected without interruption.
      </p>
      ${infoBox(`
        ${statRow('Days Remaining', `${daysRemaining} Day${daysRemaining !== 1 ? 's' : ''}`, '#f59e0b')}
        ${statRow('Current Plan', 'Free Trial', '#64748b')}
        ${statRow('Action Required', 'Upgrade to continue', '#ef4444', true)}
      `)}
      ${alertStrip('#f59e0b', 'After your trial expires, you will not be able to add new assets. Existing assets and your heartbeat schedule will remain intact.')}
      ${ctaButton(`${this.frontendUrl}/pricing`, 'View Plans & Upgrade →', '#f59e0b')}
    `;
    return this.sendEmail({
      to: email,
      subject: `Your AlwaysThere Trial Ends in ${daysRemaining} Day${daysRemaining !== 1 ? 's' : ''}`,
      html: buildEmailShell({
        accentColor: '#f59e0b',
        accentGlow: 'rgba(245,158,11,0.2)',
        icon: '⏰',
        headline: 'Trial Ending Soon',
        subline: `${daysRemaining} Day${daysRemaining !== 1 ? 's' : ''} Remaining`,
        body,
        footerNote: 'You are receiving this because your trial period is nearing its end.',
      }),
      text: `Hi ${name}, your trial ends in ${daysRemaining} days. Upgrade to continue using all features.`,
    });
  }

  async diagnoseSmtp(toEmail: string) {
    const host = this.configService.get<string>('SMTP_HOST') || this.configService.get<string>('EMAIL_HOST') || 'smtp-relay.brevo.com';
    const port = parseInt(this.configService.get<string>('SMTP_PORT') || this.configService.get<string>('EMAIL_PORT') || '587');
    const user = this.configService.get<string>('SMTP_USER') || this.configService.get<string>('EMAIL_USER');
    const pass = this.configService.get<string>('SMTP_PASS') || this.configService.get<string>('EMAIL_PASSWORD');
    const resendKey = this.configService.get<string>('RESEND_API_KEY');

    const diagnostics: any = {
      timestamp: new Date().toISOString(),
      nodeEnv: process.env.NODE_ENV,
      config: {
        host,
        port,
        user,
        hasPass: !!pass,
        passLength: pass ? pass.length : 0,
        hasResendKey: !!resendKey,
        resendKeyLength: resendKey ? resendKey.length : 0,
        fromEmail: this.fromEmail,
      },
      smtpVerify: null,
      emailSent: null,
      error: null
    };

    if (pass && (pass.startsWith('xsmtpkey') || pass.startsWith('xkeysib') || host?.includes('brevo'))) {
      diagnostics.emailMode = 'Brevo API';
      try {
        const fromEmail = this.configService.get<string>('SMTP_FROM') || (user && user.includes('brevo') ? 'subodhram3350@gmail.com' : user) || 'ks5093654@gmail.com';
        let senderEmail = fromEmail;
        let senderName = 'AlwaysThere Vault';
        if (fromEmail.includes('<')) {
          const match = fromEmail.match(/(.*)<(.*)>/);
          if (match) {
            senderName = match[1].replace(/"/g, '').trim();
            senderEmail = match[2].trim();
          }
        }

        const res = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'api-key': pass,
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            sender: { name: senderName, email: senderEmail },
            to: [{ email: toEmail }],
            subject: 'AlwaysThere Vault SMTP Diagnostic Test (Brevo API)',
            htmlContent: '<b>Diagnostic Test from Brevo HTTP API</b>'
          })
        });

        diagnostics.brevoStatus = res.status;
        diagnostics.brevoStatusText = res.statusText;
        if (res.ok) {
          diagnostics.emailSent = 'Success';
          diagnostics.response = await res.json();
          return { success: true, diagnostics };
        } else {
          diagnostics.emailSent = 'Failed';
          diagnostics.error = await res.text();
          return { success: false, diagnostics };
        }
      } catch (err: any) {
        diagnostics.emailSent = 'Failed';
        diagnostics.error = err.message || err;
        return { success: false, diagnostics };
      }
    }

    if (resendKey && !resendKey.includes('your-resend') && !resendKey.includes('placeholder')) {
      diagnostics.emailMode = 'Resend API';
      try {
        const from = this.configService.get<string>('SMTP_FROM') || 'AlwaysThere Vault <onboarding@resend.dev>';
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from,
            to: toEmail,
            subject: 'AlwaysThere Vault SMTP Diagnostic Test (Resend)',
            html: '<b>Diagnostic Test from Resend API</b>'
          })
        });
        diagnostics.resendStatus = res.status;
        diagnostics.resendStatusText = res.statusText;
        if (res.ok) {
          diagnostics.emailSent = true;
          return { success: true, diagnostics };
        } else {
          diagnostics.resendError = await res.text();
          return { success: false, diagnostics };
        }
      } catch (err: any) {
        diagnostics.error = err.message || err;
        return { success: false, diagnostics };
      }
    }

    diagnostics.emailMode = 'Nodemailer SMTP';
    try {
      try {
        await this.transporter.verify();
        diagnostics.smtpVerify = 'Success';
      } catch (verifyErr: any) {
        diagnostics.smtpVerify = `Failed: ${verifyErr.message || verifyErr}`;
        throw verifyErr;
      }

      const info = await this.transporter.sendMail({
        from: this.fromEmail,
        to: toEmail,
        subject: 'AlwaysThere Vault SMTP Diagnostic Test (Nodemailer)',
        text: 'Nodemailer SMTP test email.',
        html: '<b>Diagnostic Test from Nodemailer SMTP</b>'
      });
      diagnostics.emailSent = 'Success';
      diagnostics.messageId = info.messageId;
      return { success: true, diagnostics };
    } catch (err: any) {
      diagnostics.emailSent = 'Failed';
      diagnostics.error = {
        message: err.message,
        code: err.code,
        command: err.command,
        response: err.response,
        stack: err.stack
      };
      return { success: false, diagnostics };
    }
  }
}
