import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { eq, and } from 'drizzle-orm';
import { beneficiaries, type Beneficiary, type NewBeneficiary } from '../../src/db/schema/beneficiaries';
import { UsersService } from '../users/users.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class BeneficiariesService {
  constructor(
    @Inject('DRIZZLE_DB') private db: any,
    private usersService: UsersService,
    private emailService: EmailService,
  ) { }

  async createBeneficiary(createData: any): Promise<Beneficiary> {
    const user = await this.usersService.findUserByWallet(createData.ownerAddress);
    const [beneficiary] = await this.db.insert(beneficiaries).values({
      userId: user.id,
      walletAddress: createData.walletAddress,
      email: createData.email,
      name: createData.name,
      sharePercentage: createData.sharePercentage || 0,
      relationship: createData.relationship,
    } as NewBeneficiary).returning();

    // Notify beneficiary via email
    if (beneficiary.email) {
      this.emailService.sendBeneficiaryAddedEmail(
        beneficiary.email,
        beneficiary.name,
        user.name || 'A user'
      ).catch(err => console.error('Failed to send beneficiary email:', err));
    }

    return beneficiary;
  }

  async getAllBeneficiaries(ownerWallet: string): Promise<Beneficiary[]> {
    const user = await this.usersService.findUserByWallet(ownerWallet);
    return this.db.query.beneficiaries.findMany({
      where: eq(beneficiaries.userId, user.id),
    });
  }

  async getBeneficiary(id: string): Promise<Beneficiary> {
    const beneficiary = await this.db.query.beneficiaries.findFirst({
      where: eq(beneficiaries.id, id),
    });
    if (!beneficiary) {
      throw new NotFoundException(`Beneficiary with ID ${id} not found`);
    }
    return beneficiary;
  }

  async updateBeneficiary(id: string, updateData: any): Promise<Beneficiary> {
    const [updated] = await this.db.update(beneficiaries)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(beneficiaries.id, id))
      .returning();
    if (!updated) throw new NotFoundException('Beneficiary not found');
    return updated;
  }

  async deleteBeneficiary(id: string): Promise<void> {
    await this.db.delete(beneficiaries).where(eq(beneficiaries.id, id));
  }

  async findOwnersForBeneficiary(beneficiaryWallet: string): Promise<any[]> {
    const results = await this.db.query.beneficiaries.findMany({
      where: eq(beneficiaries.walletAddress, beneficiaryWallet),
    });

    const ownerDetails = await Promise.all(
      results.map(async (b) => {
        const owner = await this.db.query.users.findFirst({
          where: eq(beneficiaries.userId, b.userId),
        });
        return {
          ownerName: owner?.name || 'Unknown Owner',
          ownerAddress: owner?.walletAddress,
          beneficiaryId: b.id,
          sharePercentage: b.sharePercentage,
        };
      })
    );

    return ownerDetails;
  }
}
