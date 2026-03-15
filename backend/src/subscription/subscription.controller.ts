import { Controller, Get, Post, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get('check/:walletAddress')
  async checkAccess(@Param('walletAddress') walletAddress: string) {
    try {
      const canUse = await this.subscriptionService.canUseService(walletAddress);
      const storageLimit = await this.subscriptionService.getStorageLimit(walletAddress);

      return {
        success: true,
        canUseService: canUse,
        storageLimitMB: storageLimit,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to check subscription access',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('details/:walletAddress')
  async getDetails(@Param('walletAddress') walletAddress: string) {
    try {
      const subscription = await this.subscriptionService.getSubscriptionDetails(walletAddress);
      const trial = await this.subscriptionService.getTrialDetails(walletAddress);

      return {
        success: true,
        subscription,
        trial,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to get subscription details',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('storage/check')
  async checkStorageQuota(
    @Body() body: { walletAddress: string; currentUsageMB: number }
  ) {
    try {
      const { walletAddress, currentUsageMB } = body;
      const quota = await this.subscriptionService.checkStorageQuota(
        walletAddress,
        currentUsageMB
      );

      return {
        success: true,
        ...quota,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to check storage quota',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('storage/update')
  async updateStorageUsage(
    @Body() body: { walletAddress: string; usedMB: number }
  ) {
    try {
      const { walletAddress, usedMB } = body;
      const updated = await this.subscriptionService.updateStorageUsage(
        walletAddress,
        usedMB
      );

      if (!updated) {
        throw new HttpException(
          'Failed to update storage usage',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }

      return {
        success: true,
        message: 'Storage usage updated successfully',
      };
    } catch (error) {
      throw new HttpException(
        'Failed to update storage usage',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('trial/:walletAddress')
  async getTrialStatus(@Param('walletAddress') walletAddress: string) {
    try {
      const trial = await this.subscriptionService.getTrialDetails(walletAddress);

      return {
        success: true,
        trial,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to get trial status',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
