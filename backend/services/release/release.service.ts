import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { AssetsService } from '../assets/assets.service';
import { BlockchainService } from '../blockchain/blockchain.service';
import { BeneficiariesService } from '../beneficiaries/beneficiaries.service';

@Injectable()
export class ReleaseService {
    constructor(
        private readonly assetsService: AssetsService,
        private readonly blockchainService: BlockchainService,
        private readonly beneficiariesService: BeneficiariesService,
    ) { }

    async requestAssetRelease(assetId: string, requestorWallet: string) {
        const asset: any = await (this.assetsService as any).getAsset(assetId);
        if (!asset) {
            throw new NotFoundException('Asset not found');
        }

        const isTriggered = await this.blockchainService.isLastWishTriggered(asset.ownerWallet);
        if (!isTriggered) {
            throw new UnauthorizedException('Last Wish switch has not been triggered for this owner yet.');
        }

        // Check if requestor is an authorized beneficiary for this specific asset
        const beneficiaries = await this.beneficiariesService.getAllBeneficiaries(asset.ownerWallet);
        const requestor = beneficiaries.find(b => b.walletAddress.toLowerCase() === requestorWallet.toLowerCase());

        if (!requestor || !asset.nomineeIds.includes((requestor as any).id)) {
            throw new UnauthorizedException('You are not an authorized beneficiary for this asset.');
        }

        // Release the IPFS CID and the key share designated for them
        return {
            assetId: asset.assetId,
            type: asset.type,
            ipfsCid: asset.cid,
            encryptedKeyShares: asset.encryptedKeyShares,
            releasedAt: new Date()
        };
    }
}
