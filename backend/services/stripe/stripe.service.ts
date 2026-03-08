import { Injectable, BadRequestException } from '@nestjs/common';
import Stripe from 'stripe';
import { SubscriptionService } from '../subscription/subscription.service';
import { PlanType, ServiceMode } from '../subscription/subscription.schema';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    private subscriptionService: SubscriptionService,
  ) {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      console.warn('⚠️  STRIPE_SECRET_KEY not configured. Payment features will be disabled.');
      return;
    }

    this.stripe = new Stripe(stripeKey, {
      apiVersion: '2026-02-25.clover' as any,
    });
  }

  /**
   * Create Stripe checkout session for subscription
   */
  async createCheckoutSession(params: {
    userId: string;
    planType: 'starter' | 'professional' | 'enterprise';
    mode: 'centralized' | 'decentralized';
    successUrl: string;
    cancelUrl: string;
  }): Promise<{ sessionId: string; url: string }> {
    if (!this.stripe) {
      console.log('🏗️  Simulating payment initiation for user:', params.userId);
      // Return a simulated success URL that the frontend can handle to update the subscription
      const simulatedUrl = `${params.successUrl.replace('{CHECKOUT_SESSION_ID}', 'sim_123')}&simulated=true`;
      return {
        sessionId: 'sim_123',
        url: simulatedUrl
      };
    }

    // Get plan pricing
    const pricing = this.getPlanPricing(params.planType, params.mode);

    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `${params.planType.charAt(0).toUpperCase() + params.planType.slice(1)} Plan`,
                description: `DeadMan Protocol - ${params.mode === 'centralized' ? 'Centralized' : 'Decentralized'} Mode`,
              },
              unit_amount: pricing.monthly * 100, // Convert to cents
              recurring: {
                interval: 'month',
              },
            },
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: params.successUrl,
        cancel_url: params.cancelUrl,
        client_reference_id: params.userId,
        metadata: {
          userId: params.userId,
          planType: params.planType,
          mode: params.mode,
        },
      });

      return {
        sessionId: session.id,
        url: session.url,
      };
    } catch (error) {
      console.error('Stripe checkout session creation failed:', error);
      throw new BadRequestException('Failed to create checkout session');
    }
  }

  /**
   * Handle Stripe webhook events
   */
  async handleWebhook(signature: string, payload: Buffer): Promise<void> {
    if (!this.stripe) {
      throw new BadRequestException('Stripe is not configured');
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new BadRequestException('Stripe webhook secret not configured');
    }

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        webhookSecret,
      );
    } catch (error) {
      console.error('Webhook signature verification failed:', error);
      throw new BadRequestException('Invalid webhook signature');
    }

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        await this.handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      case 'customer.subscription.updated':
        await this.handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.deleted':
        await this.handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;

      case 'invoice.payment_succeeded':
        await this.handlePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;

      case 'invoice.payment_failed':
        await this.handlePaymentFailed(event.data.object as Stripe.Invoice);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  }

  /**
   * Handle successful checkout
   */
  private async handleCheckoutCompleted(session: Stripe.Checkout.Session) {
    const userId = session.metadata?.userId;
    const planType = session.metadata?.planType as PlanType;
    const mode = session.metadata?.mode as ServiceMode;

    if (!userId || !planType || !mode) {
      console.error('Missing metadata in checkout session');
      return;
    }

    try {
      // Update subscription in database
      await this.subscriptionService.upgradeSubscription(userId, planType, mode);

      console.log(`✅ Subscription activated for user ${userId}: ${planType} (${mode})`);

      // TODO: Send confirmation email
    } catch (error) {
      console.error('Failed to update subscription after checkout:', error);
    }
  }

  /**
   * Handle subscription update
   */
  private async handleSubscriptionUpdated(subscription: Stripe.Subscription) {
    const userId = subscription.metadata?.userId;
    if (!userId) return;

    console.log(`Subscription updated for user ${userId}`);
    // Handle subscription changes if needed
  }

  /**
   * Handle subscription deletion/cancellation
   */
  private async handleSubscriptionDeleted(subscription: Stripe.Subscription) {
    const userId = subscription.metadata?.userId;
    if (!userId) return;

    try {
      await this.subscriptionService.cancelSubscription(userId);
      console.log(`✅ Subscription cancelled for user ${userId}`);
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
    }
  }

  /**
   * Handle successful payment
   */
  private async handlePaymentSucceeded(invoice: Stripe.Invoice) {
    const userId = (invoice as any).subscription_details?.metadata?.userId;
    if (!userId) return;

    console.log(`Payment succeeded for user ${userId}: $${invoice.amount_paid / 100}`);
    // TODO: Send payment receipt email
  }

  /**
   * Handle failed payment
   */
  private async handlePaymentFailed(invoice: Stripe.Invoice) {
    const userId = (invoice as any).subscription_details?.metadata?.userId;
    if (!userId) return;

    console.log(`Payment failed for user ${userId}`);
    // TODO: Send payment failure notification
  }

  /**
   * Get plan pricing
   */
  private getPlanPricing(planType: string, mode: string): { monthly: number; yearly: number } {
    const pricing = {
      centralized: {
        starter: { monthly: 4.99, yearly: 49.99 },
        professional: { monthly: 9.99, yearly: 99.99 },
        enterprise: { monthly: 29.99, yearly: 299.99 },
      },
      decentralized: {
        starter: { monthly: 0, yearly: 0 }, // Free
        professional: { monthly: 0.01, yearly: 0.1 }, // Crypto: 0.01 ETH/month
        enterprise: { monthly: 0.05, yearly: 0.5 }, // Crypto: 0.05 ETH/month
      },
    };

    return pricing[mode]?.[planType] || { monthly: 0, yearly: 0 };
  }

  /**
   * Create customer portal session for managing subscription
   */
  async createPortalSession(userId: string, returnUrl: string): Promise<{ url: string }> {
    if (!this.stripe) {
      return { url: `${returnUrl}?simulated_portal=true` };
    }

    try {
      // Get or create Stripe customer
      const customer = await this.getOrCreateCustomer(userId);

      const session = await this.stripe.billingPortal.sessions.create({
        customer: customer.id,
        return_url: returnUrl,
      });

      return { url: session.url };
    } catch (error) {
      console.error('Failed to create portal session:', error);
      throw new BadRequestException('Failed to create portal session');
    }
  }

  /**
   * Get or create Stripe customer
   */
  private async getOrCreateCustomer(userId: string): Promise<Stripe.Customer> {
    // Search for existing customer
    const customers = await this.stripe.customers.list({
      limit: 1,
      email: `${userId}@deadmanprotocol.com`, // Use user email if available
    });

    if (customers.data.length > 0) {
      return customers.data[0];
    }

    // Create new customer
    return await this.stripe.customers.create({
      metadata: { userId },
    });
  }
}
