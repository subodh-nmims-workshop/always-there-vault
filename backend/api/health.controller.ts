import { Controller, Get, Inject } from '@nestjs/common';
import { CacheService } from '../services/cache/cache.service';
import { sql } from 'drizzle-orm';

@Controller('health')
export class HealthController {
  constructor(
    @Inject('DRIZZLE_DB') private db: any,
    private cacheService: CacheService,
  ) {}

  @Get()
  async check() {
    let dbStatus = 'disconnected';
    try {
      await this.db.execute(sql`SELECT 1`);
      dbStatus = 'connected';
    } catch (e) {
      console.error('Health check DB error:', e.message);
    }

    const cacheStats = this.cacheService.getStats();

    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        api: 'running',
        database: dbStatus,
        cache: {
          status: 'running',
          size: cacheStats.size,
        },
      },
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'production',
    };
  }

  @Get('ping')
  ping() {
    return { message: 'pong', timestamp: Date.now() };
  }
}
