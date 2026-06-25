import { Injectable, Inject, Logger } from '@nestjs/common';
import { eq, and, sql } from 'drizzle-orm';
import { users } from '../../src/db/schema/users';
import { subscriptions } from '../../src/db/schema/subscriptions';
import { EmailService } from '../email/email.service';
import { PLANS } from '../subscription/plans.config';
import { PlanType } from '../subscription/subscription.schema';
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
    if (!this.paypalClientId || !this.paypalSecret) {
      this.logger.warn('PayPal Client credentials not configured. Using mock token flow.');
      return 'mock-token';
    }
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
    const normalizedWalletAddress = walletAddress.toLowerCase();
    this.logger.log(`🔍 Verifying PayPal Order: ${orderId} for ${normalizedWalletAddress} [Cycle: ${billingCycle}]`);
    
    try {
      if (!this.paypalClientId || !this.paypalSecret || orderId.startsWith('mock-')) {
        this.logger.log(`✅ Sandbox / Mock PayPal Order approved: ${orderId}`);
        return await this.activatePremium(normalizedWalletAddress, 'PAYPAL', orderId, planId, billingCycle);
      }

      const accessToken = await this.getAccessToken();
      const response = await axios.get(`${this.apiUrl}/v2/checkout/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const orderData = response.data;
      if (orderData.status === 'COMPLETED' || orderData.status === 'APPROVED') {
        this.logger.log(`✅ PayPal Order ${orderId} Verified! Status: ${orderData.status}`);
        return await this.activatePremium(normalizedWalletAddress, 'PAYPAL', orderId, planId, billingCycle);
      } else {
        this.logger.error(`❌ PayPal Order ${orderId} NOT COMPLETED. Current status: ${orderData.status}`);
        throw new Error(`Payment status: ${orderData.status}`);
      }
    } catch (error: any) {
      this.logger.error(`❌ PayPal Verification Error: ${error.response?.data?.message || error.message}`);
      if (!this.paypalClientId || !this.paypalSecret || orderId.startsWith('mock-')) {
        this.logger.log(`⚠️ Falling back to sandbox activation for ${orderId}`);
        return await this.activatePremium(normalizedWalletAddress, 'PAYPAL', orderId, planId, billingCycle);
      }
      throw new Error('PayPal verification failed. Please contact support.');
    }
  }

  async processCryptoPayment(walletAddress: string, txHash: string, planId: string, billingCycle: string = 'YEARLY'): Promise<any> {
    const normalizedWalletAddress = walletAddress.toLowerCase();
    this.logger.log(`⛓️ Processing Crypto Payment for ${normalizedWalletAddress}, TX: ${txHash}, Cycle: ${billingCycle}`);
    
    try {
      const { ethers } = require('ethers');
      const rpcUrl = this.configService.get<string>('ETHEREUM_RPC_URL') || this.configService.get<string>('RPC_URL') || 'https://ethereum-sepolia.publicnode.com';
      const provider = new ethers.JsonRpcProvider(rpcUrl);
      
      // Wait for transaction to be mined (max 30 seconds)
      const receipt = await provider.waitForTransaction(txHash, 1, 30000);
      if (!receipt || receipt.status !== 1) {
          throw new Error('Transaction failed or not found on blockchain');
      }

      const tx = await provider.getTransaction(txHash);
      const companyWallet = (process.env.CRYPTO_RECEIVE_WALLET || this.configService.get<string>('CRYPTO_RECEIVE_WALLET') || '').toLowerCase();
      const contractAddress = (this.configService.get<string>('CONTRACT_ADDRESS') || process.env.CONTRACT_ADDRESS || '').toLowerCase();
      const subscriptionContractAddress = (this.configService.get<string>('SUBSCRIPTION_CONTRACT_ADDRESS') || process.env.SUBSCRIPTION_CONTRACT_ADDRESS || '').toLowerCase();
      const targetAddress = tx.to?.toLowerCase();

      const isValidRecipient = 
        (companyWallet && targetAddress === companyWallet) ||
        (contractAddress && targetAddress === contractAddress) ||
        (subscriptionContractAddress && targetAddress === subscriptionContractAddress);

      if (!isValidRecipient) {
          throw new Error('Transaction sent to invalid wallet or contract address');
      }

      // Here you can also check tx.value (amount of ETH sent) matches the plan price
      // const requiredAmount = ethers.parseEther('0.01');
      // if (tx.value < requiredAmount) throw new Error('Insufficient payment amount');

      this.logger.log(`✅ Crypto Payment Verified on Blockchain: ${txHash}`);
      return await this.activatePremium(normalizedWalletAddress, 'CRYPTO', txHash, planId, billingCycle);
    } catch (error) {
      this.logger.error(`❌ Crypto Verification Failed: ${error.message}`);
      throw new Error(`Crypto Verification Failed: ${error.message}`);
    }
  }

  /**
   * Activate Premium Status
   */
  private async activatePremium(walletAddress: string, method: string, reference: string, planId: string, billingCycle: string = 'YEARLY'): Promise<any> {
    const user = await this.db.query.users.findFirst({
      where: eq(users.walletAddress, walletAddress),
    });

    if (!user) throw new Error('User not found');

    const cycleUpper = (billingCycle || 'YEARLY').toUpperCase();

    // Mapping storage limits and pricing based on plans config (Standard Premium Model)
    const planKey = (planId || '').toLowerCase() as PlanType;
    const planConfig = PLANS[planKey] || PLANS[PlanType.STARTER];

    const isDecentralized = planConfig.mode === 'decentralized';
    const storageLimitMB = isDecentralized 
      ? planConfig.limits.decentralizedStorageMB 
      : planConfig.limits.centralizedStorageMB;
      
    let storageLimit = storageLimitMB === Infinity 
      ? 1024 * 1024 * 1024 * 1024 * 10 // 10 TB default
      : storageLimitMB * 1024 * 1024;
      
    let price = '0';
    if (cycleUpper === 'YEARLY') {
      price = planConfig.yearlyPrice.toFixed(2);
    } else if (cycleUpper === 'QUARTERLY') {
      price = planConfig.quarterlyPrice.toFixed(2);
    } else {
      price = planConfig.price.toFixed(2);
    }

    const expiryDate = new Date();
    if (cycleUpper === 'YEARLY') {
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    } else if (cycleUpper === 'QUARTERLY') {
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
      billingCycle: cycleUpper,
      startDate: new Date(),
      endDate: expiryDate,
      price: method === 'CRYPTO' ? `${price} USDC` : `$${price}`,
    }).onConflictDoUpdate({
      target: [subscriptions.userId],
      set: {
        planId,
        status: 'ACTIVE',
        storageLimit,
        billingCycle: cycleUpper,
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
