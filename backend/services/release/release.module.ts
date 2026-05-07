import { Module } from '@nestjs/common';
import { ReleaseController, ClaimController } from './release.controller';
import { ReleaseService } from './release.service';
import { AssetsModule } from '../assets/assets.module';
import { BlockchainModule } from '../blockchain/blockchain.module';
import { BeneficiariesModule } from '../beneficiaries/beneficiaries.module';

import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [AssetsModule, BlockchainModule, BeneficiariesModule, AuthModule],
    controllers: [ReleaseController, ClaimController],
    providers: [ReleaseService],
    exports: [ReleaseService],
})
export class ReleaseModule { }
