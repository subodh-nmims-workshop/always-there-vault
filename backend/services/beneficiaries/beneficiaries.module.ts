import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { EmailModule } from '../email/email.module';
import { BeneficiariesController } from './beneficiaries.controller';
import { BeneficiariesService } from './beneficiaries.service';
import { Beneficiary, BeneficiarySchema } from './schemas/beneficiary.schema';

@Module({
  imports: [
    UsersModule,
    EmailModule,
  ],
  controllers: [BeneficiariesController],
  providers: [BeneficiariesService],
  exports: [BeneficiariesService],
})
export class BeneficiariesModule { }
