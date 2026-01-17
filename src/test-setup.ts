/**
 * Test setup configuration for Jest and fast-check
 */

import fc from 'fast-check';

// Configure fast-check for property-based testing
beforeAll(() => {
  // Set global configuration for property-based tests
  const config: any = {
    numRuns: 100, // Minimum 100 iterations per property test as specified in design
    verbose: process.env.NODE_ENV === 'test' ? 1 : 0,
  };
  
  if (process.env.FC_SEED) {
    config.seed = parseInt(process.env.FC_SEED);
  }
  
  fc.configureGlobal(config);
});

// Global test timeout for property-based tests
jest.setTimeout(30000);

// Mock console methods in test environment to reduce noise
if (process.env.NODE_ENV === 'test') {
  global.console = {
    ...console,
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  };
}