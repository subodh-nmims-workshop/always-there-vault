import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RecordHeartbeatDto, HeartbeatDto, HeartbeatStatusDto, HeartbeatSettingsDto } from './dto/heartbeat.dto';
import { HeartbeatLog, HeartbeatLogDocument } from './schemas/heartbeat.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class HeartbeatService {
  constructor(
    @InjectModel(HeartbeatLog.name) private heartbeatModel: Model<HeartbeatLogDocument>,
    private usersService: UsersService,
  ) { }

  private readonly DEFAULT_INTERVAL_DAYS = 30;
  private readonly DEFAULT_GRACE_PERIOD_DAYS = 14;

  async recordHeartbeat(recordHeartbeatDto: RecordHeartbeatDto): Promise<HeartbeatLog> {
    const log = new this.heartbeatModel({
      userWallet: recordHeartbeatDto.walletAddress,
      lastPingTime: new Date(),
      method: recordHeartbeatDto.method,
    });
    // Reset missed heartbeats buffer on successful activity
    await this.usersService.resetMissedHeartbeats(recordHeartbeatDto.walletAddress);
    return log.save();
  }

  async getHeartbeatSettings(walletAddress: string): Promise<HeartbeatSettingsDto> {
    try {
      const user = await this.usersService.findUserByWallet(walletAddress);
      return {
        interval: user.heartbeatInterval || this.DEFAULT_INTERVAL_DAYS,
        gracePeriod: user.gracePeriod || this.DEFAULT_GRACE_PERIOD_DAYS,
      };
    } catch (e) {
      if (e instanceof NotFoundException) {
        return {
          interval: this.DEFAULT_INTERVAL_DAYS,
          gracePeriod: this.DEFAULT_GRACE_PERIOD_DAYS,
        };
      }
      throw e;
    }
  }

  async updateHeartbeatSettings(walletAddress: string, settingsDto: HeartbeatSettingsDto): Promise<HeartbeatSettingsDto> {
    const user = await this.usersService.updateHeartbeatSettings(
      walletAddress,
      settingsDto.interval,
      settingsDto.gracePeriod,
    );
    return {
      interval: user.heartbeatInterval,
      gracePeriod: user.gracePeriod,
    };
  }

  async getHeartbeatStatus(walletAddress: string): Promise<HeartbeatStatusDto> {
    const logs = await this.heartbeatModel
      .find({ userWallet: walletAddress })
      .sort({ lastPingTime: -1 })
      .limit(1)
      .exec();

    const settings = await this.getHeartbeatSettings(walletAddress);
    const intervalDays = settings.interval;
    const gracePeriodDays = settings.gracePeriod;

    if (!logs || logs.length === 0) {
      return {
        status: 'inactive',
        lastHeartbeat: null,
        nextHeartbeatDue: null,
        daysUntilDue: intervalDays,
        isOverdue: false,
        gracePeriodRemaining: 0,
        interval: intervalDays,
        gracePeriod: gracePeriodDays,
      };
    }

    const lastHeartbeat = logs[0];
    const now = new Date();
    const daysSinceLastHeartbeat = this.daysBetween(lastHeartbeat.lastPingTime, now);

    const nextHeartbeatDue = new Date(lastHeartbeat.lastPingTime);
    nextHeartbeatDue.setDate(nextHeartbeatDue.getDate() + intervalDays);

    const daysUntilDue = this.daysBetween(now, nextHeartbeatDue);
    const isOverdue = daysUntilDue < 0;
    const gracePeriodRemaining = isOverdue
      ? Math.max(0, gracePeriodDays + daysUntilDue)
      : gracePeriodDays;

    let status: 'active' | 'grace_period' | 'overdue' | 'inactive';
    if (daysSinceLastHeartbeat <= intervalDays) {
      status = 'active';
    } else if (daysSinceLastHeartbeat <= intervalDays + gracePeriodDays) {
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
      interval: intervalDays,
      gracePeriod: gracePeriodDays,
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
