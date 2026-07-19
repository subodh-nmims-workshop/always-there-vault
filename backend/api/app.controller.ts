import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../services/auth/jwt-auth.guard';
import { UsersService } from '../services/users/users.service';
import { AssetsService } from '../services/assets/assets.service';
import { BeneficiariesService } from '../services/beneficiaries/beneficiaries.service';
import { HeartbeatService } from '../services/heartbeat/heartbeat.service';

@ApiTags('System')
@Controller()
export class AppController {
  constructor(
    private readonly usersService: UsersService,
    private readonly assetsService: AssetsService,
    private readonly beneficiariesService: BeneficiariesService,
    private readonly heartbeatService: HeartbeatService,
  ) {}

  @Get('health')
  @ApiOperation({ summary: 'Health check endpoint' })
  getHealth(): object {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'AlwaysThere Vault Backend'
    };
  }

  @Get('api/health')
  @ApiOperation({ summary: 'API Health check endpoint' })
  getApiHealth(): object {
    return this.getHealth();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('api/users/sync')
  @ApiOperation({ summary: 'Consolidated dashboard synchronization' })
  @ApiResponse({ status: 200, description: 'All dashboard resources retrieved successfully' })
  async syncUser(@Req() req: any): Promise<object> {
    const walletAddress = req.user.walletAddress;
    const [beneficiaries, assets, heartbeat, profile, folders] = await Promise.all([
      this.beneficiariesService.getAllBeneficiaries(walletAddress).catch(() => []),
      this.assetsService.getAllAssets(walletAddress).catch(() => []),
      this.heartbeatService.getHeartbeatStatus(walletAddress).catch(() => null),
      this.usersService.findUserByWallet(walletAddress).catch(() => null),
      this.assetsService.getAllFolders(walletAddress).catch(() => []),
    ]);

    return {
      beneficiaries,
      assets,
      heartbeat,
      profile,
      folders,
    };
  }

  @Get()
  @ApiOperation({ summary: 'API root endpoint' })
  getRoot(): object {
    return {
      service: 'AlwaysThere Vault API',
      version: '2.0.0',
      status: 'operational',
      documentation: '/api/docs',
      health: '/api/health',
      sync: '/api/users/sync',
    };
  }
}
