import { IsString, IsOptional, IsEnum, IsNumber, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum HeartbeatMethod {
  WALLET_SIGNATURE = 'wallet_signature',
  BIOMETRIC = 'biometric',
  TWO_FACTOR = 'two_factor',
  MANUAL = 'manual',
}

export class RecordHeartbeatDto {
  @ApiProperty({ description: 'User wallet address' })
  @IsString()
  walletAddress: string;

  @ApiProperty({ description: 'Heartbeat method', enum: HeartbeatMethod })
  @IsEnum(HeartbeatMethod)
  method: HeartbeatMethod;

  @ApiProperty({ description: 'Cryptographic signature', required: false })
  @IsOptional()
  @IsString()
  signature?: string;

  @ApiProperty({ description: 'IP address', required: false })
  @IsOptional()
  @IsString()
  ipAddress?: string;
}

export class HeartbeatDto {
  @ApiProperty({ description: 'Heartbeat ID' })
  id: string;

  @ApiProperty({ description: 'User wallet address' })
  walletAddress: string;

  @ApiProperty({ description: 'Heartbeat timestamp' })
  timestamp: Date;

  @ApiProperty({ description: 'Heartbeat method', enum: HeartbeatMethod })
  method: HeartbeatMethod;

  @ApiProperty({ description: 'Cryptographic signature', required: false })
  signature?: string;

  @ApiProperty({ description: 'Whether signature was verified' })
  verified: boolean;

  @ApiProperty({ description: 'IP address', required: false })
  ipAddress?: string;
}

export class HeartbeatSettingsDto {
  @ApiProperty({ description: 'Heartbeat interval in days', minimum: 1, maximum: 365 })
  @IsNumber()
  @Min(1)
  @Max(365)
  interval: number;

  @ApiProperty({ description: 'Grace period in days', minimum: 1, maximum: 90 })
  @IsNumber()
  @Min(1)
  @Max(90)
  gracePeriod: number;

  @ApiProperty({ description: 'Number of warnings / buffer misses before trigger', minimum: 1, maximum: 5, default: 3, required: false })
  @IsNumber()
  @Min(1)
  @Max(5)
  @IsOptional()
  bufferMisses?: number;
}

export class HeartbeatStatusDto {
  @ApiProperty({ description: 'Current heartbeat status' })
  status: 'active' | 'grace_period' | 'overdue' | 'inactive';

  @ApiProperty({ description: 'Last heartbeat timestamp', required: false })
  lastHeartbeat: Date | null;

  @ApiProperty({ description: 'Next heartbeat due date', required: false })
  nextHeartbeatDue: Date | null;

  @ApiProperty({ description: 'Days until next heartbeat is due' })
  daysUntilDue: number;

  @ApiProperty({ description: 'Whether heartbeat is overdue' })
  isOverdue: boolean;

  @ApiProperty({ description: 'Days remaining in grace period' })
  gracePeriodRemaining: number;

  @ApiProperty({ description: 'Configured interval in days' })
  interval: number;

  @ApiProperty({ description: 'Configured grace period in days' })
  gracePeriod: number;
}
