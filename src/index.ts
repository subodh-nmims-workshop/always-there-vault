/**
 * Main entry point for the Decentralized AlwaysThere Vault
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
 * AlwaysThere Vault main class
 */
export class DigitalWillVault {
  private version = '1.0.0';

  constructor() {
    console.log(`AlwaysThere Vault v${this.version} initialized`);
  }

  getVersion(): string {
    return this.version;
  }
}