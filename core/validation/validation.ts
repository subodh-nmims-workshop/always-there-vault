/**
 * Input validation utilities for the Digital Will Protocol
 * Implements validation for heartbeat intervals, wallet addresses, and JSON configurations
 */

import { ValidationResult, UserConfig } from '../types';

/**
 * Validates heartbeat interval is within acceptable range (7-365 days)
 */
export function validateHeartbeatInterval(interval: number): ValidationResult {
  const errors: string[] = [];
  
  if (!Number.isInteger(interval)) {
    errors.push('Heartbeat interval must be an integer');
  }
  
  if (interval < 7) {
    errors.push('Heartbeat interval must be at least 7 days');
  }
  
  if (interval > 365) {
    errors.push('Heartbeat interval cannot exceed 365 days');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validates grace period is within acceptable range (30-180 days)
 */
export function validateGracePeriod(gracePeriod: number): ValidationResult {
  const errors: string[] = [];
  
  if (!Number.isInteger(gracePeriod)) {
    errors.push('Grace period must be an integer');
  }
  
  if (gracePeriod < 30) {
    errors.push('Grace period must be at least 30 days');
  }
  
  if (gracePeriod > 180) {
    errors.push('Grace period cannot exceed 180 days');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validates Ethereum wallet address format
 */
export function validateWalletAddress(address: string, network: 'ethereum' | 'polygon' = 'ethereum'): ValidationResult {
  const errors: string[] = [];
  
  if (!address || typeof address !== 'string') {
    errors.push('Wallet address must be a non-empty string');
    return { isValid: false, errors };
  }
  
  // Basic Ethereum address validation (0x followed by 40 hex characters)
  const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
  
  if (!ethAddressRegex.test(address)) {
    errors.push(`Invalid ${network} wallet address format`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validates JSON configuration against schema
 */
export function validateJSONConfiguration(config: any): ValidationResult {
  const errors: string[] = [];
  
  try {
    // Basic structure validation
    if (!config || typeof config !== 'object') {
      errors.push('Configuration must be a valid object');
      return { isValid: false, errors };
    }
    
    // Validate required fields for UserConfig
    if ('userId' in config && typeof config.userId !== 'string') {
      errors.push('userId must be a string');
    }
    
    if ('heartbeatInterval' in config) {
      const intervalValidation = validateHeartbeatInterval(config.heartbeatInterval);
      errors.push(...intervalValidation.errors);
    }
    
    if ('gracePeriod' in config) {
      const gracePeriodValidation = validateGracePeriod(config.gracePeriod);
      errors.push(...gracePeriodValidation.errors);
    }
    
  } catch (error) {
    errors.push(`JSON parsing error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validates complete user configuration
 */
export function validateUserConfig(config: UserConfig): ValidationResult {
  const errors: string[] = [];
  
  // Validate userId
  if (!config.userId || typeof config.userId !== 'string') {
    errors.push('User ID must be a non-empty string');
  }
  
  // Validate heartbeat interval
  const intervalValidation = validateHeartbeatInterval(config.heartbeatInterval);
  errors.push(...intervalValidation.errors);
  
  // Validate grace period
  const gracePeriodValidation = validateGracePeriod(config.gracePeriod);
  errors.push(...gracePeriodValidation.errors);
  
  // Validate status
  const validStatuses = ['active', 'grace_period', 'triggered', 'emergency_override'];
  if (!validStatuses.includes(config.status)) {
    errors.push('Invalid user status');
  }
  
  // Validate emergency contacts
  if (!Array.isArray(config.emergencyContacts)) {
    errors.push('Emergency contacts must be an array');
  } else {
    config.emergencyContacts.forEach((contact, index) => {
      if (!contact.name || typeof contact.name !== 'string') {
        errors.push(`Emergency contact ${index + 1} must have a valid name`);
      }
    });
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}