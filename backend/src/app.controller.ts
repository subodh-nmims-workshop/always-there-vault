import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('System')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'API root endpoint' })
  getRoot(): object {
    return {
      service: 'Digital Will Protocol API',
      version: '2.0.0',
      status: 'operational',
      documentation: '/api/docs',
      health: '/health',
    };
  }
}