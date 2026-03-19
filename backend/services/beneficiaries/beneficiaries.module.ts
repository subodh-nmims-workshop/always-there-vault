import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { BeneficiariesController } from './beneficiaries.controller';
import { BeneficiariesService } from './beneficiaries.service';
import { Beneficiary, BeneficiarySchema } from './schemas/beneficiary.schema';

@Module({
  imports: [
    UsersModule,
  ],
  controllers: [BeneficiariesController],
  providers: [BeneficiariesService],
  exports: [BeneficiariesService],
})
export class BeneficiariesModule { }
