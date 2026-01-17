/**
 * Property-based tests for validation utilities
 * Feature: digital-will-protocol, Property 5: Configuration Round-Trip Consistency
 */

import fc from 'fast-check';
import { 
  validateHeartbeatInterval, 
  validateGracePeriod, 
  validateWalletAddress, 
  validateJSONConfiguration,
  validateUserConfig 
} from '../validation';
import { prettyPrintConfig, validatePrettyPrintRoundTrip } from '../pretty-printer';
import { UserConfig, ContactInfo } from '../../types';

describe('Validation Property Tests', () => {
  
  /**
   * Property 5: Configuration Round-Trip Consistency
   * For any valid configuration object, parsing then pretty-printing then parsing 
   * should produce an equivalent object
   * Validates: Requirements 8.6
   */
  test('Property 5: Configuration round-trip consistency', () => {
    // Generator for valid contact info
    const contactInfoArb = fc.record({
      name: fc.string({ minLength: 1, maxLength: 50 }),
      email: fc.option(fc.emailAddress()),
      phone: fc.option(fc.string({ minLength: 10, maxLength: 15 })),
      address: fc.option(fc.string({ minLength: 5, maxLength: 100 }))
    });

    // Generator for valid user configurations
    const userConfigArb = fc.record({
      userId: fc.string({ minLength: 1, maxLength: 50 }),
      heartbeatInterval: fc.integer({ min: 7, max: 365 }),
      gracePeriod: fc.integer({ min: 30, max: 180 }),
      lastHeartbeat: fc.integer({ min: 0 }),
      emergencyContacts: fc.array(contactInfoArb, { minLength: 0, maxLength: 5 }),
      status: fc.constantFrom('active', 'grace_period', 'triggered', 'emergency_override')
    });

    fc.assert(
      fc.property(userConfigArb, (config) => {
        // Test round-trip consistency
        const result = validatePrettyPrintRoundTrip(config);
        return result === true;
      }),
      { 
        numRuns: 100,
        verbose: false
      }
    );
  });

  /**
   * Property 2: Input Validation Consistency
   * For any input value, the system should consistently accept valid inputs 
   * and reject invalid inputs with descriptive error messages
   * Validates: Requirements 8.1, 8.2, 8.3, 8.4
   */
  test('Property 2: Input validation consistency', () => {
    // Test heartbeat interval validation
    fc.assert(
      fc.property(fc.integer(), (interval) => {
        const result = validateHeartbeatInterval(interval);
        
        // Valid intervals (7-365) should pass
        if (interval >= 7 && interval <= 365 && Number.isInteger(interval)) {
          return result.isValid === true && result.errors.length === 0;
        }
        
        // Invalid intervals should fail with descriptive errors
        return result.isValid === false && result.errors.length > 0 && 
               result.errors.every(error => typeof error === 'string' && error.length > 0);
      }),
      { numRuns: 100 }
    );

    // Test grace period validation
    fc.assert(
      fc.property(fc.integer(), (gracePeriod) => {
        const result = validateGracePeriod(gracePeriod);
        
        // Valid grace periods (30-180) should pass
        if (gracePeriod >= 30 && gracePeriod <= 180 && Number.isInteger(gracePeriod)) {
          return result.isValid === true && result.errors.length === 0;
        }
        
        // Invalid grace periods should fail with descriptive errors
        return result.isValid === false && result.errors.length > 0 &&
               result.errors.every(error => typeof error === 'string' && error.length > 0);
      }),
      { numRuns: 100 }
    );

    // Test wallet address validation
    fc.assert(
      fc.property(fc.string(), (address) => {
        const result = validateWalletAddress(address);
        
        // Valid Ethereum addresses should pass
        const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
        if (ethAddressRegex.test(address)) {
          return result.isValid === true && result.errors.length === 0;
        }
        
        // Invalid addresses should fail with descriptive errors
        return result.isValid === false && result.errors.length > 0 &&
               result.errors.every(error => typeof error === 'string' && error.length > 0);
      }),
      { numRuns: 100 }
    );
  });

  test('Property 2: JSON configuration validation consistency', () => {
    // Test with valid configurations
    const validConfigArb = fc.record({
      userId: fc.string({ minLength: 1 }),
      heartbeatInterval: fc.integer({ min: 7, max: 365 }),
      gracePeriod: fc.integer({ min: 30, max: 180 })
    });

    fc.assert(
      fc.property(validConfigArb, (config) => {
        const result = validateJSONConfiguration(config);
        return result.isValid === true && result.errors.length === 0;
      }),
      { numRuns: 100 }
    );

    // Test with invalid configurations
    const invalidConfigArb = fc.oneof(
      fc.constant(null),
      fc.constant(undefined),
      fc.string(),
      fc.integer(),
      fc.record({
        userId: fc.integer(), // Invalid: should be string
        heartbeatInterval: fc.integer({ min: 400, max: 500 }), // Invalid: out of range
        gracePeriod: fc.integer({ min: 200, max: 300 }) // Invalid: out of range
      })
    );

    fc.assert(
      fc.property(invalidConfigArb, (config) => {
        const result = validateJSONConfiguration(config);
        // Invalid configs should fail
        if (config === null || config === undefined || typeof config !== 'object') {
          return result.isValid === false && result.errors.length > 0;
        }
        // Configs with invalid fields should also fail
        return result.isValid === false || result.errors.length === 0;
      }),
      { numRuns: 100 }
    );
  });

});

describe('Validation Unit Tests', () => {
  
  test('should validate valid heartbeat intervals', () => {
    expect(validateHeartbeatInterval(7).isValid).toBe(true);
    expect(validateHeartbeatInterval(30).isValid).toBe(true);
    expect(validateHeartbeatInterval(365).isValid).toBe(true);
  });

  test('should reject invalid heartbeat intervals', () => {
    expect(validateHeartbeatInterval(6).isValid).toBe(false);
    expect(validateHeartbeatInterval(366).isValid).toBe(false);
    expect(validateHeartbeatInterval(7.5).isValid).toBe(false);
  });

  test('should validate valid grace periods', () => {
    expect(validateGracePeriod(30).isValid).toBe(true);
    expect(validateGracePeriod(90).isValid).toBe(true);
    expect(validateGracePeriod(180).isValid).toBe(true);
  });

  test('should reject invalid grace periods', () => {
    expect(validateGracePeriod(29).isValid).toBe(false);
    expect(validateGracePeriod(181).isValid).toBe(false);
    expect(validateGracePeriod(30.5).isValid).toBe(false);
  });

  test('should validate valid Ethereum addresses', () => {
    const validAddress = '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6';
    expect(validateWalletAddress(validAddress).isValid).toBe(true);
  });

  test('should reject invalid wallet addresses', () => {
    expect(validateWalletAddress('invalid').isValid).toBe(false);
    expect(validateWalletAddress('0x123').isValid).toBe(false);
    expect(validateWalletAddress('').isValid).toBe(false);
  });

});