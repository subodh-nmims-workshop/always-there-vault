import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuditService } from '../services/audit/audit.service';
import { UsersService } from '../services/users/users.service';

@Injectable()
export class HoneypotMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HONEYPOT');
  private readonly trapPaths = [
    '/wp-admin',
    '/wp-login.php',
    '/.env',
    '/config.php',
    '/admin/phpmyadmin',
    '/shell',
    '/backdoor',
    '/backup.sql',
    '/id_rsa'
  ];

  constructor(
      private readonly auditService: AuditService,
      private readonly usersService: UsersService
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const path = req.path.toLowerCase();
    const ip = req.ip || req.header('x-forwarded-for') || 'unknown';

    if (this.trapPaths.some(trap => path.includes(trap))) {
      this.logger.warn(`🛑 HONEYPOT TRAP TRIGGERED: ${ip} accessed ${path}`);
      
      // Log as a severe security event
      await this.auditService.trackAction('SYSTEM', 'HONEYPOT_TRIGGER', 'SECURITY', null, {
        ip,
        path,
        userAgent: req.header('user-agent'),
      });

      // We could potentially block the IP here or just return a ghost response
      // For now, we return a 404 but with a slow delay to waste the bot's time
      setTimeout(() => {
        res.status(404).send('Not Found');
      }, 5000);
      return;
    }

    next();
  }
}
