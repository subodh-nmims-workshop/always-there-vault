/**
 * Heartbeat tracking system for proof-of-life verification
 */

import { Heartbeat, UserConfig, UserStatus } from '../types';

export interface HeartbeatTracker {
  submitHeartbeat(heartbeat: Heartbeat): Promise<boolean>;
  getLastHeartbeat(userId: string): Promise<number>;
  checkInactivityStatus(userId: string): Promise<UserStatus>;
  resetTimer(userId: string): Promise<void>;
}

/**
 * In-memory heartbeat tracker implementation
 * Production systems should use persistent storage
 */
export class InMemoryHeartbeatTracker implements HeartbeatTracker {
  private heartbeats = new Map<string, number>();
  private userConfigs = new Map<string, UserConfig>();
  
  async submitHeartbeat(heartbeat: Heartbeat): Promise<boolean> {
    // Validate heartbeat signature (simplified)
    if (!this.validateHeartbeatSignature(heartbeat)) {
      return false;
    }
    
    // Update last heartbeat timestamp
    this.heartbeats.set(heartbeat.userId, heartbeat.timestamp);
    
    // Reset user status to active if they were in grace period
    const config = this.userConfigs.get(heartbeat.userId);
    if (config && config.status === 'grace_period') {
      config.status = 'active';
      config.lastHeartbeat = heartbeat.timestamp;
      this.userConfigs.set(heartbeat.userId, config);
    }
    
    return true;
  }
  
  async getLastHeartbeat(userId: string): Promise<number> {
    return this.heartbeats.get(userId) || 0;
  }
  
  async checkInactivityStatus(userId: string): Promise<UserStatus> {
    const config = this.userConfigs.get(userId);
    if (!config) {
      return 'active'; // Default status
    }
    
    const lastHeartbeat = this.heartbeats.get(userId) || 0;
    const now = Date.now();
    const daysSinceHeartbeat = (now - lastHeartbeat) / (1000 * 60 * 60 * 24);
    
    if (daysSinceHeartbeat > config.heartbeatInterval + config.gracePeriod) {
      return 'triggered';
    } else if (daysSinceHeartbeat > config.heartbeatInterval) {
      return 'grace_period';
    }
    
    return 'active';
  }
  
  async resetTimer(userId: string): Promise<void> {
    this.heartbeats.set(userId, Date.now());
  }
  
  private validateHeartbeatSignature(heartbeat: Heartbeat): boolean {
    // Simplified signature validation
    // Production systems should implement proper cryptographic verification
    return heartbeat.signature.length > 0 && heartbeat.timestamp > 0;
  }
  
  // Helper method for testing
  setUserConfig(config: UserConfig): void {
    this.userConfigs.set(config.userId, config);
  }
}