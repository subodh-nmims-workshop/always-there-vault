import { Injectable, Inject, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { eq, and, gt } from 'drizzle-orm';
import { verificationTokens } from '../../src/db/schema/verificationTokens';
import * as crypto from 'crypto';

@Injectable()
export class TokenService {
  private readonly logger = new Logger(TokenService.name);

  constructor(@Inject('DRIZZLE_DB') private db: any) {}

  async generateToken(type: 'HEARTBEAT_VERIFY' | 'EMAIL_VERIFY' | 'CLAIM_ACCESS', userId: string, targetAddress?: string, expiresInHours = 24): Promise<string> {
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + expiresInHours);

    await this.db.insert(verificationTokens).values({
      token,
      type,
      userId,
      targetAddress,
      expiresAt,
    });

    return token;
  }

  async verifyToken(tokenString: string, type: 'HEARTBEAT_VERIFY' | 'EMAIL_VERIFY' | 'CLAIM_ACCESS'): Promise<any> {
    const records = await this.db.select().from(verificationTokens).where(
      and(
        eq(verificationTokens.token, tokenString),
        eq(verificationTokens.type, type),
        eq(verificationTokens.isUsed, false),
        gt(verificationTokens.expiresAt, new Date())
      )
    ).limit(1);

    if (!records || records.length === 0) {
      throw new BadRequestException('Invalid or expired token.');
    }

    const tokenRecord = records[0];

    // Mark as used
    await this.db.update(verificationTokens)
      .set({ isUsed: true })
      .where(eq(verificationTokens.id, tokenRecord.id));

    return tokenRecord;
  }
}
