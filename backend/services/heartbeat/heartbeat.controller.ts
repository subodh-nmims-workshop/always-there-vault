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
import { RecordHeartbeatDto, HeartbeatStatusDto, HeartbeatSettingsDto } from './dto/heartbeat.dto';
import { HeartbeatLog } from './schemas/heartbeat.schema';

@ApiTags('heartbeat')
@Controller('api/heartbeat')
export class HeartbeatController {
  constructor(private readonly heartbeatService: HeartbeatService) { }

  @Post()
  @ApiOperation({ summary: 'Record a proof-of-life heartbeat' })
  @ApiResponse({ status: 201, description: 'Heartbeat recorded successfully' })
  async recordHeartbeat(@Body() recordHeartbeatDto: RecordHeartbeatDto): Promise<HeartbeatLog> {
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
  async getHeartbeatHistory(@Param('walletAddress') walletAddress: string): Promise<HeartbeatLog[]> {
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

  @Get('settings/:walletAddress')
  @ApiOperation({ summary: 'Get user heartbeat settings' })
  @ApiResponse({ status: 200, description: 'Settings retrieved successfully' })
  async getHeartbeatSettings(@Param('walletAddress') walletAddress: string): Promise<HeartbeatSettingsDto> {
    return this.heartbeatService.getHeartbeatSettings(walletAddress);
  }

  @Put('settings/:walletAddress')
  @ApiOperation({ summary: 'Update user heartbeat settings' })
  @ApiBody({ type: HeartbeatSettingsDto })
  @ApiResponse({ status: 200, description: 'Settings updated successfully' })
  async updateHeartbeatSettings(
    @Param('walletAddress') walletAddress: string,
    @Body() settingsDto: HeartbeatSettingsDto,
  ): Promise<HeartbeatSettingsDto> {
    return this.heartbeatService.updateHeartbeatSettings(walletAddress, settingsDto);
  }
}
