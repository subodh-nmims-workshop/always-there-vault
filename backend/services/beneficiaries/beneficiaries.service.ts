import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBeneficiaryDto, UpdateBeneficiaryDto, BeneficiaryDto } from './dto/beneficiary.dto';

@Injectable()
export class BeneficiariesService {
  private beneficiaries: Map<string, BeneficiaryDto> = new Map();

  async createBeneficiary(createBeneficiaryDto: CreateBeneficiaryDto): Promise<BeneficiaryDto> {
    const beneficiary: BeneficiaryDto = {
      id: this.generateId(),
      ...createBeneficiaryDto,
      createdAt: new Date(),
      updatedAt: new Date(),
      enabled: true,
    };

    this.beneficiaries.set(beneficiary.id, beneficiary);
    return beneficiary;
  }

  async getAllBeneficiaries(ownerAddress: string): Promise<BeneficiaryDto[]> {
    return Array.from(this.beneficiaries.values()).filter(
      (beneficiary) => beneficiary.ownerAddress === ownerAddress,
    );
  }

  async getBeneficiary(id: string): Promise<BeneficiaryDto> {
    const beneficiary = this.beneficiaries.get(id);
    if (!beneficiary) {
      throw new NotFoundException(`Beneficiary with ID ${id} not found`);
    }
    return beneficiary;
  }

  async updateBeneficiary(id: string, updateBeneficiaryDto: UpdateBeneficiaryDto): Promise<BeneficiaryDto> {
    const beneficiary = await this.getBeneficiary(id);
    const updatedBeneficiary = {
      ...beneficiary,
      ...updateBeneficiaryDto,
      updatedAt: new Date(),
    };
    this.beneficiaries.set(id, updatedBeneficiary);
    return updatedBeneficiary;
  }

  async deleteBeneficiary(id: string): Promise<void> {
    const beneficiary = await this.getBeneficiary(id);
    this.beneficiaries.delete(id);
  }

  private generateId(): string {
    return `beneficiary_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
