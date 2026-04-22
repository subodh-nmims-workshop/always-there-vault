import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('System')
@Controller()
export class AppController {
  @Get('health')
  @ApiOperation({ summary: 'Health check endpoint' })
  getHealth(): object {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'Last Wish Protocol Backend'
    };
  }

  @Get('api/health')
  @ApiOperation({ summary: 'API Health check endpoint' })
  getApiHealth(): object {
    return this.getHealth();
  }

  @Get()
  @ApiOperation({ summary: 'API root endpoint' })
  getRoot(): object {
    return {
      service: 'Digital Will Protocol API',
      version: '2.0.0',
      status: 'operational',
      documentation: '/api/docs',
      health: '/api/health',
    };
  }
}
