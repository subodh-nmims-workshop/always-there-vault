import { Controller, Post, Get, Param, Body, Res, Query, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TokenService } from '../auth/token.service';
import { ReleaseService } from './release.service';
import { eq } from 'drizzle-orm';
import { users } from '../../src/db/schema/users';
import * as jwt from 'jsonwebtoken';

@ApiTags('release')
@Controller('api/release')
export class ReleaseController {
    constructor(private readonly releaseService: ReleaseService) { }

    @Post(':assetId')
    @ApiOperation({ summary: 'Request release of an asset share (Requires triggered Always There switch)' })
    @ApiResponse({ status: 200, description: 'Asset release data returned successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized or not triggered' })
    @ApiResponse({ status: 404, description: 'Asset not found' })
    async requestRelease(
        @Param('assetId') assetId: string,
        @Body('requestorWallet') requestorWallet: string
    ) {
        return this.releaseService.requestAssetRelease(assetId, requestorWallet);
    }
}

@ApiTags('claim')
@Controller('api/claim')
export class ClaimController {
    constructor(
        private readonly tokenService: TokenService,
        @Inject('DRIZZLE_DB') private db: any
    ) { }

    @Get(':token')
    @ApiOperation({ summary: 'Verify claim access via email token' })
    @ApiResponse({ status: 200, description: 'Claim verified' })
    async verifyClaim(@Param('token') token: string, @Res() res: any): Promise<any> {
        try {
            // Verify and mark as used (single-use enforcement)
            const record = await this.tokenService.verifyToken(token, 'CLAIM_ACCESS', true);
            
            // Find owner user details to get their wallet address
            const owner = await this.db.query.users.findFirst({
                where: eq(users.id, record.userId)
            });
            const ownerAddress = owner?.walletAddress || '';
            const frontendUrl = (process.env.FRONTEND_URL || 'http://localhost:7000').trim();
            
            // Generate a short-lived (1 hour) claim session token to allow the beneficiary to fetch assets securely
            const claimSessionToken = jwt.sign(
                { type: 'CLAIM_SESSION', userId: record.userId, targetAddress: record.targetAddress, originalToken: token },
                process.env.JWT_SECRET || 'secret',
                { expiresIn: '1h' }
            );

            // Redirect to frontend claim portal with the claim session token and owner details
            return res.redirect(`${frontendUrl}/claim/${claimSessionToken}?owner=${ownerAddress}`);
        } catch (e) {
            console.error('VerifyClaim Error:', e);
            const frontendUrl = (process.env.FRONTEND_URL || 'http://localhost:7000').trim();
            return res.redirect(`${frontendUrl}/?error=invalid_claim_token`);
        }
    }
}
