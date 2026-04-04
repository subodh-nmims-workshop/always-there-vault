import { Injectable, Inject, Logger } from '@nestjs/common';
import { auditLogs } from '../../src/db/schema/audit';
import { eq, and, between, desc } from 'drizzle-orm';

export interface AuditLogItem {
    userId: string | null;
    action: string;
    resourceType: string;
    resourceId?: string | null;
    ipAddress?: string | null;
    userAgent?: string | null;
    details?: any;
    status: 'SUCCESS' | 'FAILED';
    error?: string;
}


import { UsersService } from '../users/users.service';

@Injectable()
export class AuditService {
    private readonly logger = new Logger(AuditService.name);
    
    constructor(
        @Inject('DRIZZLE_DB') private db: any,
        private readonly usersService: UsersService
    ) {}
    
    async log(data: AuditLogItem) {
        try {
            await this.db.insert(auditLogs).values({
                ...data,
                details: JSON.stringify(data.details || {}),
                createdAt: new Date()
            });
            
            // Alert on suspicious activities
            if (this.isSuspicious(data.action, data.details)) {
                await this.alertSecurityTeam(data);
            }
        } catch (error) {
            this.logger.error('Failed to save audit log', error);
        }
    }
    
    private isSuspicious(action: string, details: any): boolean {
        if (!details) return false;
        
        const suspiciousPatterns = [
            action === 'DECRYPT' && details.frequency > 100, // Too many decrypts
            action === 'LOGIN' && details.failedAttempts > 5, // Failed logins
            action === 'SHARE' && details.newUserLocation !== details.userLocation, // Unusual location
            action === 'DELETE' && details.bulk > 50, // Mass deletion
        ];
        
        return suspiciousPatterns.some(p => p === true);
    }

    private async alertSecurityTeam(data: AuditLogItem) {
        this.logger.warn(`SUSPICIOUS ACTIVITY DETECTED: ${data.action} by ${data.userId || 'anonymous'}`);
        
        // Auto-lock account if user is identified
        if (data.userId) {
            this.logger.warn(`AUTO-LOCKING ACCOUNT for User: ${data.userId}`);
            await this.usersService.lockAccount(data.userId);
        }
        
        // Integration with PagerDuty, Slack, or Email can be added here
    }
    
    // Get audit trail for compliance
    async getAuditTrail(userId: string, startDate: Date, endDate: Date) {
        return this.db.query.auditLogs.findMany({
            where: and(
                eq(auditLogs.userId, userId),
                between(auditLogs.createdAt, startDate, endDate)
            ),
            orderBy: [desc(auditLogs.createdAt)]
        });
    }

    // Migration helper for old signature
    async trackAction(
        userId: string | null,
        action: string,
        resourceType: string,
        resourceId?: string,
        details?: any,
        ip?: string,
        userAgent?: string
    ) {
        return this.log({
            userId,
            action,
            resourceType,
            resourceId: resourceId || null,
            details: details || {},
            ipAddress: ip || null,
            userAgent: userAgent || null,
            status: 'SUCCESS'
        });
    }
}
