import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { HeartbeatService } from './heartbeat.service';
import { HeartbeatCronService } from './heartbeat.cron';
import { RecordHeartbeatDto, HeartbeatStatusDto, HeartbeatSettingsDto } from './dto/heartbeat.dto';
import { HeartbeatLog } from './schemas/heartbeat.schema';

@ApiTags('heartbeat')
@Controller('api/heartbeat')
export class HeartbeatController {
  constructor(
    private readonly heartbeatService: HeartbeatService,
    private readonly heartbeatCronService: HeartbeatCronService,
  ) { }

  @Post(':walletAddress')
  @ApiOperation({ summary: 'Record a proof-of-life heartbeat' })
  @ApiResponse({ status: 201, description: 'Heartbeat recorded successfully' })
  async recordHeartbeat(@Param('walletAddress') walletAddress: string, @Body('method') method?: string): Promise<any> {
    return this.heartbeatService.recordHeartbeat(walletAddress, method);
  }
  
  @Get('status/:walletAddress')
  @ApiOperation({ summary: 'Get heartbeat status for a user' })
  @ApiResponse({ status: 200, description: 'Heartbeat status retrieved successfully' })
  async getStatus(@Param('walletAddress') walletAddress: string): Promise<any> {
    return this.heartbeatService.getHeartbeatStatus(walletAddress);
  }
  
  @Get('settings/:walletAddress')
  @ApiOperation({ summary: 'Get user heartbeat settings' })
  @ApiResponse({ status: 200, description: 'Settings retrieved successfully' })
  async getSettings(@Param('walletAddress') walletAddress: string): Promise<any> {
    const status: any = await this.heartbeatService.getHeartbeatStatus(walletAddress);
    return {
      success: true,
      interval: status.interval || 30,
      gracePeriod: status.gracePeriod || 7,
      status: status.status
    };
  }
  
  @Put('settings/:walletAddress')
  @ApiOperation({ summary: 'Update user heartbeat settings' })
  @ApiBody({ type: HeartbeatSettingsDto })
  @ApiResponse({ status: 200, description: 'Settings updated successfully' })
  async updateSettings(
    @Param('walletAddress') walletAddress: string,
    @Body('interval') interval: number,
    @Body('gracePeriod') gracePeriod: number,
    @Body('bufferMisses') bufferMisses: number = 3
  ): Promise<any> {
    return this.heartbeatService.updateConfig(walletAddress, interval, gracePeriod, bufferMisses);
  }

  @Get('test-email/:walletAddress')
  @ApiOperation({ summary: 'Send a test heartbeat alert email to preview the template' })
  @ApiResponse({ status: 200, description: 'Test email sent' })
  async sendTestEmail(@Param('walletAddress') walletAddress: string): Promise<any> {
    return this.heartbeatCronService.sendTestHeartbeatEmail(walletAddress);
  }
}
