import { Controller, Post, Body, Headers, RawBodyRequest, Req, Get, Query } from '@nestjs/common';
import { Request } from 'express';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  /**
   * Create checkout session
   * POST /stripe/create-checkout-session
   */
  @Post('create-checkout-session')
  async createCheckoutSession(@Body() body: {
    userId: string;
    planType: 'starter' | 'professional' | 'enterprise';
    mode: 'centralized' | 'decentralized';
    successUrl: string;
    cancelUrl: string;
  }) {
    return await this.stripeService.createCheckoutSession(body);
  }

  /**
   * Handle Stripe webhooks
   * POST /stripe/webhook
   */
  @Post('webhook')
  async handleWebhook(
    @Headers('stripe-signature') signature: string,
    @Req() request: RawBodyRequest<Request>,
  ) {
    const payload = request.rawBody;
    
    if (!payload) {
      throw new Error('No payload received');
    }

    await this.stripeService.handleWebhook(signature, payload);
    
    return { received: true };
  }

  /**
   * Create customer portal session
   * POST /stripe/create-portal-session
   */
  @Post('create-portal-session')
  async createPortalSession(@Body() body: {
    userId: string;
    returnUrl: string;
  }) {
    return await this.stripeService.createPortalSession(body.userId, body.returnUrl);
  }
}
