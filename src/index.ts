/**
 * Main entry point for the Decentralized AlwaysThere Protocol
 */

export * from './types';
export * from './utils/validation';
export * from './utils/pretty-printer';
export * from './crypto/encryption';
export * from './crypto/shamir';
export * from './storage/interface';
export * from './heartbeat/tracker';
export * from './beneficiary/manager';

/**
 * AlwaysThere Protocol main class
 */
export class DigitalWillProtocol {
  private version = '1.0.0';

  constructor() {
    console.log(`AlwaysThere Protocol v${this.version} initialized`);
  }

  getVersion(): string {
    return this.version;
  }
}