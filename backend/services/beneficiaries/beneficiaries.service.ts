import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { eq, and, sql } from 'drizzle-orm';
import { beneficiaries, type Beneficiary, type NewBeneficiary } from '../../src/db/schema/beneficiaries';
import { files } from '../../src/db/schema/files';
import { UsersService } from '../users/users.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class BeneficiariesService {
  private verificationCodes = new Map<string, string>();

  constructor(
    @Inject('DRIZZLE_DB') private db: any,
    private usersService: UsersService,
    private emailService: EmailService,
  ) { }

  async createBeneficiary(createData: any): Promise<Beneficiary> {
    const user = await this.usersService.findUserByWallet(createData.ownerAddress);
    const lowerWalletAddress = createData.walletAddress ? createData.walletAddress.toLowerCase().trim() : '';
    const lowerEmail = createData.email ? createData.email.toLowerCase().trim() : '';

    if (lowerEmail) {
      const existingEmail = await this.db.query.beneficiaries.findFirst({
        where: and(
          eq(beneficiaries.userId, user.id),
          eq(sql`lower(${beneficiaries.email})`, lowerEmail)
        )
      });
      if (existingEmail) {
        throw new BadRequestException('A beneficiary with this email address is already added.');
      }
    }

    if (lowerWalletAddress) {
      const existingWallet = await this.db.query.beneficiaries.findFirst({
        where: and(
          eq(beneficiaries.userId, user.id),
          eq(beneficiaries.walletAddress, lowerWalletAddress)
        )
      });
      if (existingWallet) {
        throw new BadRequestException('A beneficiary with this wallet address is already added.');
      }
    }

    const [beneficiary] = await this.db.insert(beneficiaries).values({
      userId: user.id,
      walletAddress: lowerWalletAddress,
      email: createData.email,
      name: createData.name,
      sharePercentage: createData.sharePercentage || 0,
      relationship: createData.relationship,
    } as NewBeneficiary).returning();

    // Notify beneficiary via email
    if (beneficiary.email && !beneficiary.email.startsWith('pgp-') && !beneficiary.email.includes('+pgp@')) {
      const verifiedSenderEmail = user.emailVerified ? user.email : (user.alternativeEmailVerified ? user.alternativeEmail : null);
      const fromEmailHeader = verifiedSenderEmail 
        ? `"${user.name || 'AlwaysThere Vault Owner'}" <${verifiedSenderEmail}>` 
        : undefined;

      this.emailService.sendBeneficiaryAddedEmail(
        beneficiary.email,
        beneficiary.name,
        user.name || 'A user',
        fromEmailHeader
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
    const data = { ...updateData };
    if (data.walletAddress) {
      data.walletAddress = data.walletAddress.toLowerCase();
    }
    const [updated] = await this.db.update(beneficiaries)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(beneficiaries.id, id))
      .returning();
    if (!updated) throw new NotFoundException('Beneficiary not found');
    return updated;
  }

  async deleteBeneficiary(id: string): Promise<void> {
    // 1. Clean up associated inheritance mappings in files table
    await this.db.update(files)
      .set({ assignedBeneficiaryId: null })
      .where(eq(files.assignedBeneficiaryId, id));

    // 2. Delete beneficiary
    await this.db.delete(beneficiaries).where(eq(beneficiaries.id, id));
    this.verificationCodes.delete(id);
  }

  async sendVerificationCode(id: string): Promise<{ success: boolean }> {
    const beneficiary = await this.getBeneficiary(id);
    if (!beneficiary.email) {
      throw new BadRequestException('Beneficiary email is required for verification.');
    }

    if (beneficiary.email.startsWith('pgp-') || beneficiary.email.includes('+pgp@')) {
      return { success: true };
    }

    const user = await this.usersService.findUserById(beneficiary.userId);

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    this.verificationCodes.set(id, code);

    // Send email asynchronously
    const verifiedSenderEmail = user?.emailVerified ? user.email : (user?.alternativeEmailVerified ? user.alternativeEmail : null);
    const fromEmailHeader = verifiedSenderEmail 
      ? `"${user?.name || 'AlwaysThere Vault Owner'}" <${verifiedSenderEmail}>` 
      : undefined;

    this.emailService.sendBeneficiaryVerificationEmail(
      beneficiary.email,
      beneficiary.name || 'Nominee',
      code,
      user?.name || 'A user',
      fromEmailHeader
    ).catch(err => console.error('Failed to send beneficiary verification email:', err));

    return { success: true };
  }

  async verifyBeneficiary(id: string, code: string): Promise<Beneficiary> {
    const beneficiary = await this.getBeneficiary(id);
    const isPgp = beneficiary.email && (beneficiary.email.startsWith('pgp-') || beneficiary.email.includes('+pgp@'));

    if (!isPgp) {
      const storedCode = this.verificationCodes.get(id);
      if (!storedCode || storedCode !== code.trim()) {
        throw new BadRequestException('Invalid or expired verification code.');
      }
    }

    const [updated] = await this.db.update(beneficiaries)
      .set({
        isVerified: true,
        updatedAt: new Date(),
      })
      .where(eq(beneficiaries.id, id))
      .returning();

    if (!updated) throw new NotFoundException('Beneficiary not found');
    this.verificationCodes.delete(id);
    return updated;
  }

  async findOwnersForBeneficiary(beneficiaryWallet: string): Promise<any[]> {
    const lowerWalletAddress = beneficiaryWallet ? beneficiaryWallet.toLowerCase() : '';
    const results = await this.db.query.beneficiaries.findMany({
      where: eq(beneficiaries.walletAddress, lowerWalletAddress),
    });

    const ownerDetails = await Promise.all(
      results.map(async (b) => {
        const owner = await this.usersService.findUserById(b.userId);
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
