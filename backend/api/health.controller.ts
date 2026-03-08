import { Controller, Get } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { CacheService } from '../services/cache/cache.service';

@Controller('health')
export class HealthController {
  constructor(
    @InjectConnection() private connection: Connection,
    private cacheService: CacheService,
  ) {}

  @Get()
  async check() {
    const mongoStatus = this.connection.readyState === 1 ? 'connected' : 'disconnected';
    const cacheStats = this.cacheService.getStats();

    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        api: 'running',
        database: mongoStatus,
        cache: {
          status: 'running',
          size: cacheStats.size,
        },
      },
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
    };
  }

  @Get('ping')
  ping() {
    return { message: 'pong', timestamp: Date.now() };
  }
}
