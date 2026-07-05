import { Controller, Post, Body, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('api/payment')
export class PaymentController {
  private readonly logger = new Logger(PaymentController.name);

  constructor(private readonly paymentService: PaymentService) {}

  @Post('process')
  async processPayment(@Body() body: { walletAddress: string; method: 'PAYPAL' | 'CRYPTO'; planId: string; billingCycle?: string; reference: string; chainId?: number }) {
    const { walletAddress, method, planId, billingCycle = 'YEARLY', reference, chainId } = body;

    this.logger.log(`Incoming ${method} payment request for ${walletAddress} [${planId} - ${billingCycle}] (Chain: ${chainId})`);

    try {
      if (method === 'PAYPAL') {
        // 'reference' is the PayPal Order ID
        return await this.paymentService.processPayPalPayment(walletAddress, reference, planId, billingCycle);
      } else {
        // 'reference' is the Crypto TX Hash
        return await this.paymentService.processCryptoPayment(walletAddress, reference, planId, billingCycle, chainId);
      }
    } catch (error) {
      this.logger.error(`Payment processing failed: ${error.message}`);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
