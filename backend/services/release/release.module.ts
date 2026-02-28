import { Module } from '@nestjs/common';
import { ReleaseController } from './release.controller';
import { ReleaseService } from './release.service';
import { AssetsModule } from '../assets/assets.module';
import { BlockchainModule } from '../blockchain/blockchain.module';
import { BeneficiariesModule } from '../beneficiaries/beneficiaries.module';

@Module({
    imports: [AssetsModule, BlockchainModule, BeneficiariesModule],
    controllers: [ReleaseController],
    providers: [ReleaseService],
    exports: [ReleaseService],
})
export class ReleaseModule { }
