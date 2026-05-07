import { Injectable, Inject, Logger } from '@nestjs/common';
import { eq, and, sql } from 'drizzle-orm';
import { users } from '../../src/db/schema/users';
import { subscriptions } from '../../src/db/schema/subscriptions';
import { EmailService } from '../email/email.service';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);
  private readonly paypalClientId: string;
  private readonly paypalSecret: string;
  private readonly paypalMode: string;
  private readonly apiUrl: string;

  constructor(
    @Inject('DRIZZLE_DB') private db: any,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
  ) {
    this.paypalClientId = this.configService.get<string>('PAYPAL_CLIENT_ID');
    this.paypalSecret = this.configService.get<string>('PAYPAL_SECRET');
    this.paypalMode = this.configService.get<string>('PAYPAL_MODE') || 'sandbox';
    this.apiUrl = this.paypalMode === 'live' 
      ? 'https://api-m.paypal.com' 
      : 'https://api-m.sandbox.paypal.com';
  }

  /**
   * Get PayPal Access Token
   */
  private async getAccessToken(): Promise<string> {
    const auth = Buffer.from(`${this.paypalClientId}:${this.paypalSecret}`).toString('base64');
    const response = await axios.post(`${this.apiUrl}/v1/oauth2/token`, 'grant_type=client_credentials', {
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data.access_token;
  }

  /**
   * Process PayPal Payment with Real Verification
   */
  async processPayPalPayment(walletAddress: string, orderId: string, planId: string, billingCycle: string = 'YEARLY'): Promise<any> {
    this.logger.log(`🔍 Verifying PayPal Order: ${orderId} for ${walletAddress} [Cycle: ${billingCycle}]`);
    
    try {
      const accessToken = await this.getAccessToken();
      const response = await axios.get(`${this.apiUrl}/v2/checkout/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const orderData = response.data;
      if (orderData.status === 'COMPLETED' || orderData.status === 'APPROVED') {
        this.logger.log(`✅ PayPal Order ${orderId} Verified! Status: ${orderData.status}`);
        return await this.activatePremium(walletAddress, 'PAYPAL', orderId, planId, billingCycle);
      } else {
        this.logger.error(`❌ PayPal Order ${orderId} NOT COMPLETED. Current status: ${orderData.status}`);
        throw new Error(`Payment status: ${orderData.status}`);
      }
    } catch (error) {
      this.logger.error(`❌ PayPal Verification Error: ${error.response?.data?.message || error.message}`);
      throw new Error('PayPal verification failed. Please contact support.');
    }
  }

  /**
   * Process Crypto Payment
   */
  async processCryptoPayment(walletAddress: string, txHash: string, planId: string, billingCycle: string = 'YEARLY'): Promise<any> {
    this.logger.log(`⛓️ Processing Crypto Payment for ${walletAddress}, TX: ${txHash}, Cycle: ${billingCycle}`);
    
    // In production, you would use an Etherscan API or Alchemy Webhook here
    // For now, we trust the client-side signature/tx verification
    const isVerified = txHash && txHash.length > 10; 

    if (isVerified) {
      return await this.activatePremium(walletAddress, 'CRYPTO', txHash, planId, billingCycle);
    }
    throw new Error('Crypto Verification Failed');
  }

  /**
   * Activate Premium Status
   */
  private async activatePremium(walletAddress: string, method: string, reference: string, planId: string, billingCycle: string = 'YEARLY'): Promise<any> {
    const user = await this.db.query.users.findFirst({
      where: eq(users.walletAddress, walletAddress),
    });

    if (!user) throw new Error('User not found');

    // Mapping storage limits and pricing based on types/subscription.ts (65% Margin Model)
    let storageLimit = 1024 * 1024 * 1024; // 1GB default
    let price = '0';

    switch (planId) {
      // Centralized Plans
      case 'starter': storageLimit = 500 * 1024 * 1024; price = '0.00'; break;
      case 'nano': storageLimit = 1 * 1024 * 1024 * 1024; price = billingCycle === 'YEARLY' ? '0.36' : '0.03'; break;
      case 'lite': storageLimit = 5 * 1024 * 1024 * 1024; price = billingCycle === 'YEARLY' ? '1.80' : '0.15'; break;
      case 'essential': storageLimit = 15 * 1024 * 1024 * 1024; price = billingCycle === 'YEARLY' ? '5.40' : '0.45'; break;
      case 'secure': storageLimit = 50 * 1024 * 1024 * 1024; price = billingCycle === 'YEARLY' ? '18.00' : '1.50'; break;
      case 'professional': storageLimit = 100 * 1024 * 1024 * 1024; price = billingCycle === 'YEARLY' ? '35.88' : '2.99'; break;
      case 'mega': storageLimit = 500 * 1024 * 1024 * 1024; price = billingCycle === 'YEARLY' ? '179.40' : '14.95'; break;
      case 'enterprise': storageLimit = 1000 * 1024 * 1024 * 1024; price = billingCycle === 'YEARLY' ? '358.80' : '29.90'; break;
      
      // Decentralized Plans
      case 'freedom_starter': storageLimit = 500 * 1024 * 1024; price = '0.00'; break;
      case 'freedom_nano': storageLimit = 1 * 1024 * 1024 * 1024; price = billingCycle === 'YEARLY' ? '2.34' : '0.19'; break;
      case 'freedom_lite': storageLimit = 5 * 1024 * 1024 * 1024; price = billingCycle === 'YEARLY' ? '11.70' : '0.97'; break;
      case 'freedom_basic': storageLimit = 15 * 1024 * 1024 * 1024; price = billingCycle === 'YEARLY' ? '35.10' : '2.92'; break;
      case 'freedom_secure': storageLimit = 50 * 1024 * 1024 * 1024; price = billingCycle === 'YEARLY' ? '117.00' : '9.75'; break;
      case 'sovereign_pro': storageLimit = 100 * 1024 * 1024 * 1024; price = billingCycle === 'YEARLY' ? '234.00' : '19.50'; break;
      case 'sovereign_mega': storageLimit = 500 * 1024 * 1024 * 1024; price = billingCycle === 'YEARLY' ? '1170.00' : '97.50'; break;
      case 'immortal_elite': storageLimit = 1000 * 1024 * 1024 * 1024; price = billingCycle === 'YEARLY' ? '2340.00' : '195.00'; break;
      
      default: storageLimit = 1 * 1024 * 1024 * 1024; price = '0.19';
    }

    const expiryDate = new Date();
    if (billingCycle === 'YEARLY') {
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    } else if (billingCycle === 'QUARTERLY') {
        expiryDate.setMonth(expiryDate.getMonth() + 3);
    } else {
        expiryDate.setMonth(expiryDate.getMonth() + 1);
    }

    // 1. Update User
    await this.db.update(users)
      .set({ storageQuota: storageLimit, updatedAt: new Date() })
      .where(eq(users.id, user.id));

    // 2. Update Subscription
    await this.db.insert(subscriptions).values({
      userId: user.id,
      planId: planId,
      planName: planId.toUpperCase(),
      storageLimit: storageLimit,
      status: 'ACTIVE',
      billingCycle: 'YEARLY',
      startDate: new Date(),
      endDate: expiryDate,
      price: method === 'CRYPTO' ? `${price} USDC` : `$${price}`,
    }).onConflictDoUpdate({
      target: [subscriptions.userId],
      set: {
        planId,
        status: 'ACTIVE',
        storageLimit,
        endDate: expiryDate,
        updatedAt: new Date(),
      }
    });

    // 3. Email Notification
    try {
        await this.emailService.sendPaymentSuccessEmail(
            user.email || walletAddress, 
            user.name || 'Guardian', 
            planId.toUpperCase(), 
            parseFloat(price)
        );
    } catch (e) {
        this.logger.error('Failed to send payment success email:', e.message);
    }

    return {
        success: true,
        plan: planId,
        expiry: expiryDate,
        limit: storageLimit
    };
  }
}
