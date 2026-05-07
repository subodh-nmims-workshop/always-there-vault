import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../src/db/schema';
import { eq, and, lte } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TimeCapsulesService {
  constructor(
    @Inject('DB_CONNECTION')
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async createTimeCapsule(userId: string, data: { beneficiaryId: string, assetId: string, customMessage: string, scheduledDate: string }) {
    const newCapsule = await this.db.insert(schema.timeCapsules).values({
      userId,
      beneficiaryId: data.beneficiaryId,
      assetId: data.assetId,
      customMessage: data.customMessage,
      scheduledDate: new Date(data.scheduledDate),
      isDelivered: false,
    }).returning();
    
    return newCapsule[0];
  }

  async getPendingDeliveries() {
    return this.db.select()
      .from(schema.timeCapsules)
      .where(
        and(
          eq(schema.timeCapsules.isDelivered, false),
          lte(schema.timeCapsules.scheduledDate, new Date())
        )
      );
  }

  async markAsDelivered(capsuleId: string) {
    await this.db.update(schema.timeCapsules)
      .set({ isDelivered: true, updatedAt: new Date() })
      .where(eq(schema.timeCapsules.id, capsuleId));
  }
}

