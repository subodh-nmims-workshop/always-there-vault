import { Injectable } from '@nestjs/common';
import { PLANS, PlanConfig } from './plans.config';

@Injectable()
export class PricingService {
  private readonly IPFS_BASE_COST_PER_GB = 0.05; // Base storage cost on IPFS
  private readonly IPFS_BANDWIDTH_COST_PER_GB = 0.01; // Data transfer cost
  private readonly OPERATIONAL_OVERHEAD = 0.2; // 20% server/maintenance overhead
  private readonly MIN_PROFIT_MARGIN = 0.3; // 30% profit margin

  calculateBreakdown(planId: string, billingCycle: 'month' | 'year' = 'month') {
    const plan = PLANS[planId];
    if (!plan) throw new Error('Invalid plan selection');

    const totalStorageGB = plan.limits.decentralizedStorageMB / 1024;
    
    // IPFS Infrastructure Costs
    const storageCost = totalStorageGB * this.IPFS_BASE_COST_PER_GB;
    const bandwidthCost = totalStorageGB * this.IPFS_BANDWIDTH_COST_PER_GB;
    const infraCost = storageCost + bandwidthCost;
    
    // Operational Overhead
    const operationalCost = infraCost * this.OPERATIONAL_OVERHEAD;
    const totalInternalCost = infraCost + operationalCost;

    // Pricing
    const basePrice = plan.price;
    const displayPrice = billingCycle === 'year' ? basePrice * 10 * 0.8 : basePrice; // 20% annual discount
    
    const profit = displayPrice - totalInternalCost;

    return {
      planName: plan.name,
      storage: `${totalStorageGB} GB`,
      breakdown: {
        infrastructure: infraCost.toFixed(2),
        maintenance: operationalCost.toFixed(2),
        protocolFee: profit.toFixed(2),
      },
      total: displayPrice.toFixed(2),
      currency: 'USD',
      billingCycle
    };
  }

  getAvailablePlans() {
    return Object.keys(PLANS).map(key => ({
      id: key,
      ...PLANS[key],
      breakdown: this.calculateBreakdown(key)
    }));
  }
}
