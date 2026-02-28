import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RecordHeartbeatDto, HeartbeatDto, HeartbeatStatusDto } from './dto/heartbeat.dto';
import { HeartbeatLog, HeartbeatLogDocument } from './schemas/heartbeat.schema';

@Injectable()
export class HeartbeatService {
  constructor(
    @InjectModel(HeartbeatLog.name) private heartbeatModel: Model<HeartbeatLogDocument>,
  ) { }

  private readonly DEFAULT_INTERVAL_DAYS = 30;
  private readonly DEFAULT_GRACE_PERIOD_DAYS = 14;

  async recordHeartbeat(recordHeartbeatDto: RecordHeartbeatDto): Promise<HeartbeatLog> {
    const log = new this.heartbeatModel({
      userWallet: recordHeartbeatDto.walletAddress,
      lastPingTime: new Date(),
      method: recordHeartbeatDto.method,
    });
    return log.save();
  }

  async getHeartbeatStatus(walletAddress: string): Promise<HeartbeatStatusDto> {
    const logs = await this.heartbeatModel
      .find({ userWallet: walletAddress })
      .sort({ lastPingTime: -1 })
      .limit(1)
      .exec();

    if (!logs || logs.length === 0) {
      return {
        status: 'inactive',
        lastHeartbeat: null,
        nextHeartbeatDue: null,
        daysUntilDue: this.DEFAULT_INTERVAL_DAYS,
        isOverdue: false,
        gracePeriodRemaining: 0,
      };
    }

    const lastHeartbeat = logs[0];
    const now = new Date();
    const daysSinceLastHeartbeat = this.daysBetween(lastHeartbeat.lastPingTime, now);

    const nextHeartbeatDue = new Date(lastHeartbeat.lastPingTime);
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
      lastHeartbeat: lastHeartbeat.lastPingTime,
      nextHeartbeatDue,
      daysUntilDue: Math.max(0, daysUntilDue),
      isOverdue,
      gracePeriodRemaining,
    };
  }

  async getHeartbeatHistory(walletAddress: string): Promise<HeartbeatLog[]> {
    return this.heartbeatModel.find({ userWallet: walletAddress }).sort({ lastPingTime: -1 }).exec();
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
}
