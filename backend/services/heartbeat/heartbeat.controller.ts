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
import { UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('heartbeat')
@Controller('api/heartbeat')
export class HeartbeatController {
  constructor(
    private readonly heartbeatService: HeartbeatService,
    private readonly heartbeatCronService: HeartbeatCronService,
  ) { }

  @Get('public-status/:wallet')
  @ApiOperation({ summary: 'Get heartbeat status for any user (Public)' })
  @ApiResponse({ status: 200, description: 'Heartbeat status retrieved successfully' })
  async getPublicStatus(@Param('wallet') wallet: string): Promise<any> {
    return this.heartbeatService.getHeartbeatStatus(wallet);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Record a proof-of-life heartbeat' })
  @ApiResponse({ status: 201, description: 'Heartbeat recorded successfully' })
  async recordHeartbeat(@Req() req: any, @Body('method') method?: string): Promise<any> {
    const walletAddress = req.user.walletAddress;
    return this.heartbeatService.recordHeartbeat(walletAddress, method);
  }
  
  @Get('status')
  @ApiOperation({ summary: 'Get heartbeat status for a user' })
  @ApiResponse({ status: 200, description: 'Heartbeat status retrieved successfully' })
  async getStatus(@Req() req: any): Promise<any> {
    const walletAddress = req.user.walletAddress;
    return this.heartbeatService.getHeartbeatStatus(walletAddress);
  }
  
  @Get('settings')
  @ApiOperation({ summary: 'Get user heartbeat settings' })
  @ApiResponse({ status: 200, description: 'Settings retrieved successfully' })
  async getSettings(@Req() req: any): Promise<any> {
    const walletAddress = req.user.walletAddress;
    const status: any = await this.heartbeatService.getHeartbeatStatus(walletAddress);
    return {
      success: true,
      interval: status.interval || 30,
      gracePeriod: status.gracePeriod || 7,
      status: status.status
    };
  }
  
  @Put('settings')
  @ApiOperation({ summary: 'Update user heartbeat settings' })
  @ApiBody({ type: HeartbeatSettingsDto })
  @ApiResponse({ status: 200, description: 'Settings updated successfully' })
  async updateSettings(
    @Req() req: any,
    @Body('interval') interval: number,
    @Body('gracePeriod') gracePeriod: number,
    @Body('bufferMisses') bufferMisses: number = 3
  ): Promise<any> {
    const walletAddress = req.user.walletAddress;
    return this.heartbeatService.updateConfig(walletAddress, interval, gracePeriod, bufferMisses);
  }

  @Get('test-email')
  @ApiOperation({ summary: 'Send a test heartbeat alert email to preview the template' })
  @ApiResponse({ status: 200, description: 'Test email sent' })
  async sendTestEmail(@Req() req: any): Promise<any> {
    const walletAddress = req.user.walletAddress;
    return this.heartbeatCronService.sendTestHeartbeatEmail(walletAddress);
  }
}
