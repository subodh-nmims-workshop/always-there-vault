import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HeartbeatService } from './heartbeat.service';
import { RecordHeartbeatDto, HeartbeatDto, HeartbeatStatusDto } from './dto/heartbeat.dto';

@ApiTags('heartbeat')
@Controller('api/heartbeat')
export class HeartbeatController {
  constructor(private readonly heartbeatService: HeartbeatService) {}

  @Post()
  @ApiOperation({ summary: 'Record a proof-of-life heartbeat' })
  @ApiResponse({ status: 201, description: 'Heartbeat recorded successfully' })
  async recordHeartbeat(@Body() recordHeartbeatDto: RecordHeartbeatDto): Promise<HeartbeatDto> {
    return this.heartbeatService.recordHeartbeat(recordHeartbeatDto);
  }

  @Get('status/:walletAddress')
  @ApiOperation({ summary: 'Get heartbeat status for a user' })
  @ApiResponse({ status: 200, description: 'Heartbeat status retrieved successfully' })
  async getHeartbeatStatus(@Param('walletAddress') walletAddress: string): Promise<HeartbeatStatusDto> {
    return this.heartbeatService.getHeartbeatStatus(walletAddress);
  }

  @Get('history/:walletAddress')
  @ApiOperation({ summary: 'Get heartbeat history for a user' })
  @ApiResponse({ status: 200, description: 'Heartbeat history retrieved successfully' })
  async getHeartbeatHistory(@Param('walletAddress') walletAddress: string): Promise<HeartbeatDto[]> {
    return this.heartbeatService.getHeartbeatHistory(walletAddress);
  }

  @Get('check/:walletAddress')
  @ApiOperation({ summary: 'Check if user needs to record heartbeat' })
  @ApiResponse({ status: 200, description: 'Check result retrieved successfully' })
  async checkHeartbeatRequired(
    @Param('walletAddress') walletAddress: string,
  ): Promise<{ required: boolean; daysUntilDue: number }> {
    return this.heartbeatService.checkHeartbeatRequired(walletAddress);
  }
}
