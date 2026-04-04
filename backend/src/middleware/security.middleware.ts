import { Injectable, NestMiddleware } from '@nestjs/common';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import * as crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class SecurityMiddleware {
    
    // Rate Limiting per IP
    static rateLimiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
        message: 'Too many requests from this IP',
        standardHeaders: true,
        legacyHeaders: false,
    });
    
    // Stricter rate limit for sensitive endpoints
    static strictRateLimiter = rateLimit({
        windowMs: 60 * 60 * 1000, // 1 hour
        max: 10, // 10 attempts per hour
        message: 'Too many attempts. Try again later.',
    });
    
    // Helmet security headers
    static helmetConfig = helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                scriptSrc: ["'self'"],
                imgSrc: ["'self'", "data:", "https:"],
                connectSrc: ["'self'", "https://api.pinata.cloud"],
            },
        },
        hsts: {
            maxAge: 31536000,
            includeSubDomains: true,
            preload: true,
        },
        frameguard: { action: 'deny' },
        noSniff: true,
        xssFilter: true,
    });
    
    // Request ID and Logging
    static requestLogger(req: any, res: any, next: NextFunction) {
        req.requestId = crypto.randomUUID();
        req.startTime = Date.now();
        
        res.setHeader('X-Request-ID', req.requestId);
        
        next();
    }
    
    // IP Whitelist (optional)
    static ipWhitelist(allowedIPs: string[]) {
        return (req: any, res: any, next: NextFunction) => {
            const clientIp = req.ip || req.connection.remoteAddress;
            
            if (allowedIPs.length && !allowedIPs.includes(clientIp)) {
                return res.status(403).json({ error: 'Access denied' });
            }
            next();
        };
    }
}
