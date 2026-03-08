import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionStatus } from './subscription.schema';

@Injectable()
export class SubscriptionGuard implements CanActivate {
  constructor(private subscriptionService: SubscriptionService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.body.userId || request.params.userId || request.user?.id;

    if (!userId) {
      throw new ForbiddenException('User ID required');
    }

    try {
      const subscription = await this.subscriptionService.getSubscription(userId);

      if (subscription.status === SubscriptionStatus.EXPIRED) {
        throw new ForbiddenException(
          'Subscription expired. Please renew to access your data.',
        );
      }

      if (subscription.status === SubscriptionStatus.CANCELLED) {
        throw new ForbiddenException('Subscription cancelled.');
      }

      // Check trial expiry
      if (subscription.status === SubscriptionStatus.TRIAL) {
        const { isExpired } = await this.subscriptionService.checkTrialExpiry(userId);
        if (isExpired) {
          throw new ForbiddenException(
            'Free trial expired. Please subscribe to continue.',
          );
        }
      }

      return true;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      throw new ForbiddenException('Subscription check failed');
    }
  }
}

@Injectable()
export class AssetLimitGuard implements CanActivate {
  constructor(private subscriptionService: SubscriptionService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.body.userId || request.params.userId || request.user?.id;

    if (!userId) {
      throw new ForbiddenException('User ID required');
    }

    const limits = await this.subscriptionService.checkLimits(userId);

    if (!limits.canAddAsset) {
      throw new ForbiddenException(
        'Asset limit reached. Upgrade your plan to add more assets.',
      );
    }

    return true;
  }
}

@Injectable()
export class BeneficiaryLimitGuard implements CanActivate {
  constructor(private subscriptionService: SubscriptionService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.body.userId || request.params.userId || request.user?.id;

    if (!userId) {
      throw new ForbiddenException('User ID required');
    }

    const limits = await this.subscriptionService.checkLimits(userId);

    if (!limits.canAddBeneficiary) {
      throw new ForbiddenException(
        'Beneficiary limit reached. Upgrade your plan to add more beneficiaries.',
      );
    }

    return true;
  }
}

@Injectable()
export class StorageLimitGuard implements CanActivate {
  constructor(private subscriptionService: SubscriptionService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.body.userId || request.params.userId || request.user?.id;

    if (!userId) {
      throw new ForbiddenException('User ID required');
    }

    const limits = await this.subscriptionService.checkLimits(userId);

    if (!limits.canUploadFile) {
      throw new ForbiddenException(
        'Storage limit reached. Upgrade your plan for more storage.',
      );
    }

    return true;
  }
}
