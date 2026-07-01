import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { TimeCapsulesService } from './time-capsules.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('time-capsules')
@ApiBearerAuth()
@Controller('api/time-capsules')
export class TimeCapsulesController {
  constructor(private readonly timeCapsulesService: TimeCapsulesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new time capsule schedule' })
  async createCapsule(@Req() req, @Body() data: { beneficiaryId: string, assetId: string, customMessage: string, scheduledDate: string }) {
    return this.timeCapsulesService.createTimeCapsule(req.user.id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all time capsule schedules for the current user' })
  async getCapsules(@Req() req) {
    return this.timeCapsulesService.getTimeCapsulesForUser(req.user.id);
  }
}

