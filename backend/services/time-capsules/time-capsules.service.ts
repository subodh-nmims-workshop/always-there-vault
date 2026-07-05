import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../src/db/schema/relations';
import { eq, and, lte } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TimeCapsulesService {
  constructor(
    @Inject('DRIZZLE_DB')
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async createTimeCapsule(userId: string, data: { beneficiaryId: string, assetId: string, customMessage: string, scheduledDate: string }) {
    // 1. Verify that the asset exists and belongs to the user
    const asset = await this.db.select()
      .from(schema.files)
      .where(
        and(
          eq(schema.files.id, data.assetId),
          eq(schema.files.userId, userId)
        )
      )
      .limit(1);

    if (asset.length === 0) {
      throw new NotFoundException('Asset not found or access denied');
    }

    // 2. Verify that the beneficiary exists and belongs to the user
    const beneficiary = await this.db.select()
      .from(schema.beneficiaries)
      .where(
        and(
          eq(schema.beneficiaries.id, data.beneficiaryId),
          eq(schema.beneficiaries.userId, userId)
        )
      )
      .limit(1);

    if (beneficiary.length === 0) {
      throw new NotFoundException('Beneficiary not found or access denied');
    }

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

  async getTimeCapsulesForUser(userId: string) {
    return this.db.select()
      .from(schema.timeCapsules)
      .where(eq(schema.timeCapsules.userId, userId));
  }

  async deleteTimeCapsulesByAsset(userId: string, assetId: string) {
    await this.db.delete(schema.timeCapsules)
      .where(
        and(
          eq(schema.timeCapsules.userId, userId),
          eq(schema.timeCapsules.assetId, assetId)
        )
      );
    return { success: true };
  }
}

