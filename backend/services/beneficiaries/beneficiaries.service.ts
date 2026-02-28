import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBeneficiaryDto, UpdateBeneficiaryDto, BeneficiaryDto } from './dto/beneficiary.dto';
import { Beneficiary, BeneficiaryDocument } from './schemas/beneficiary.schema';

@Injectable()
export class BeneficiariesService {
  constructor(
    @InjectModel(Beneficiary.name) private beneficiaryModel: Model<BeneficiaryDocument>,
  ) { }

  async createBeneficiary(createBeneficiaryDto: any): Promise<Beneficiary> {
    const newBeneficiary = new this.beneficiaryModel({
      nomineeId: this.generateId(),
      ...createBeneficiaryDto,
    });
    return newBeneficiary.save();
  }

  async getAllBeneficiaries(ownerWallet: string): Promise<Beneficiary[]> {
    return this.beneficiaryModel.find({ ownerWallet }).exec();
  }

  async getBeneficiary(nomineeId: string): Promise<Beneficiary> {
    const beneficiary = await this.beneficiaryModel.findOne({ nomineeId }).exec();
    if (!beneficiary) {
      throw new NotFoundException(`Beneficiary with ID ${nomineeId} not found`);
    }
    return beneficiary;
  }

  async updateBeneficiary(nomineeId: string, updateData: any): Promise<Beneficiary> {
    const updated = await this.beneficiaryModel.findOneAndUpdate(
      { nomineeId },
      { $set: updateData },
      { new: true }
    ).exec();
    if (!updated) throw new NotFoundException('Beneficiary not found');
    return updated;
  }

  async deleteBeneficiary(nomineeId: string): Promise<void> {
    await this.beneficiaryModel.findOneAndDelete({ nomineeId }).exec();
  }

  private generateId(): string {
    return `beneficiary_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
