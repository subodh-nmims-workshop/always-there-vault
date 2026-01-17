/**
 * Beneficiary management system for asset distribution rules
 */

import { BeneficiaryRule, DigitalAsset, ValidationResult } from '../types';

export interface BeneficiaryManager {
  addBeneficiaryRule(rule: BeneficiaryRule): Promise<boolean>;
  updateBeneficiaryRule(ruleId: string, updates: Partial<BeneficiaryRule>): Promise<boolean>;
  getBeneficiaryRules(assetId: string): Promise<BeneficiaryRule[]>;
  validateBeneficiaryRule(rule: BeneficiaryRule): ValidationResult;
}

/**
 * In-memory beneficiary manager implementation
 */
export class InMemoryBeneficiaryManager implements BeneficiaryManager {
  private rules = new Map<string, BeneficiaryRule[]>();
  
  async addBeneficiaryRule(rule: BeneficiaryRule): Promise<boolean> {
    const validation = this.validateBeneficiaryRule(rule);
    if (!validation.isValid) {
      return false;
    }
    
    const existingRules = this.rules.get(rule.assetId) || [];
    existingRules.push(rule);
    this.rules.set(rule.assetId, existingRules);
    
    return true;
  }
  
  async updateBeneficiaryRule(ruleId: string, updates: Partial<BeneficiaryRule>): Promise<boolean> {
    // Find and update the rule
    for (const [assetId, rules] of this.rules.entries()) {
      const ruleIndex = rules.findIndex(r => r.beneficiaryId === ruleId);
      if (ruleIndex !== -1) {
        const existingRule = rules[ruleIndex];
        if (existingRule) {
          rules[ruleIndex] = { ...existingRule, ...updates } as BeneficiaryRule;
          this.rules.set(assetId, rules);
          return true;
        }
      }
    }
    return false;
  }
  
  async getBeneficiaryRules(assetId: string): Promise<BeneficiaryRule[]> {
    return this.rules.get(assetId) || [];
  }
  
  validateBeneficiaryRule(rule: BeneficiaryRule): ValidationResult {
    const errors: string[] = [];
    
    if (!rule.beneficiaryId || typeof rule.beneficiaryId !== 'string') {
      errors.push('Beneficiary ID must be a non-empty string');
    }
    
    if (!rule.assetId || typeof rule.assetId !== 'string') {
      errors.push('Asset ID must be a non-empty string');
    }
    
    if (typeof rule.releaseDelay !== 'number' || rule.releaseDelay < 0) {
      errors.push('Release delay must be a non-negative number');
    }
    
    if (!rule.walletAddress || typeof rule.walletAddress !== 'string') {
      errors.push('Wallet address must be a non-empty string');
    }
    
    if (!rule.contactInfo || !rule.contactInfo.name) {
      errors.push('Contact information with name is required');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}