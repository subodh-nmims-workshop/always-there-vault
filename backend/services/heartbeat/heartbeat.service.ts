import { Injectable } from '@nestjs/common';
import { RecordHeartbeatDto, HeartbeatDto, HeartbeatStatusDto } from './dto/heartbeat.dto';

@Injectable()
export class HeartbeatService {
  private heartbeats: Map<string, HeartbeatDto[]> = new Map();
  private readonly DEFAULT_INTERVAL_DAYS = 30;
  private readonly DEFAULT_GRACE_PERIOD_DAYS = 14;

  async recordHeartbeat(recordHeartbeatDto: RecordHeartbeatDto): Promise<HeartbeatDto> {
    const heartbeat: HeartbeatDto = {
      id: this.generateId(),
      walletAddress: recordHeartbeatDto.walletAddress,
      timestamp: new Date(),
      method: recordHeartbeatDto.method,
      signature: recordHeartbeatDto.signature,
      verified: true,
      ipAddress: recordHeartbeatDto.ipAddress,
    };

    const userHeartbeats = this.heartbeats.get(recordHeartbeatDto.walletAddress) || [];
    userHeartbeats.push(heartbeat);
    this.heartbeats.set(recordHeartbeatDto.walletAddress, userHeartbeats);

    return heartbeat;
  }

  async getHeartbeatStatus(walletAddress: string): Promise<HeartbeatStatusDto> {
    const userHeartbeats = this.heartbeats.get(walletAddress) || [];
    
    if (userHeartbeats.length === 0) {
      return {
        status: 'inactive',
        lastHeartbeat: null,
        nextHeartbeatDue: null,
        daysUntilDue: this.DEFAULT_INTERVAL_DAYS,
        isOverdue: false,
        gracePeriodRemaining: 0,
      };
    }

    const lastHeartbeat = userHeartbeats[userHeartbeats.length - 1];
    const now = new Date();
    const daysSinceLastHeartbeat = this.daysBetween(lastHeartbeat.timestamp, now);
    
    const nextHeartbeatDue = new Date(lastHeartbeat.timestamp);
    nextHeartbeatDue.setDate(nextHeartbeatDue.getDate() + this.DEFAULT_INTERVAL_DAYS);
    
    const daysUntilDue = this.daysBetween(now, nextHeartbeatDue);
    const isOverdue = daysUntilDue < 0;
    const gracePeriodRemaining = isOverdue 
      ? Math.max(0, this.DEFAULT_GRACE_PERIOD_DAYS + daysUntilDue)
      : this.DEFAULT_GRACE_PERIOD_DAYS;

    let status: 'active' | 'grace_period' | 'overdue' | 'inactive';
    if (daysSinceLastHeartbeat <= this.DEFAULT_INTERVAL_DAYS) {
      status = 'active';
    } else if (daysSinceLastHeartbeat <= this.DEFAULT_INTERVAL_DAYS + this.DEFAULT_GRACE_PERIOD_DAYS) {
      status = 'grace_period';
    } else {
      status = 'overdue';
    }

    return {
      status,
      lastHeartbeat: lastHeartbeat.timestamp,
      nextHeartbeatDue,
      daysUntilDue: Math.max(0, daysUntilDue),
      isOverdue,
      gracePeriodRemaining,
    };
  }

  async getHeartbeatHistory(walletAddress: string): Promise<HeartbeatDto[]> {
    return this.heartbeats.get(walletAddress) || [];
  }

  async checkHeartbeatRequired(walletAddress: string): Promise<{ required: boolean; daysUntilDue: number }> {
    const status = await this.getHeartbeatStatus(walletAddress);
    return {
      required: status.daysUntilDue <= 7 || status.isOverdue,
      daysUntilDue: status.daysUntilDue,
    };
  }

  private daysBetween(date1: Date, date2: Date): number {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round((date2.getTime() - date1.getTime()) / oneDay);
  }

  private generateId(): string {
    return `heartbeat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
