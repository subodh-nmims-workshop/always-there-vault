import { Controller, Post, Get, Param, Body, Res, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TokenService } from '../auth/token.service';
import { ReleaseService } from './release.service';

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
    constructor(private readonly tokenService: TokenService) { }

    @Get(':token')
    @ApiOperation({ summary: 'Verify claim access via email token' })
    @ApiResponse({ status: 200, description: 'Claim verified' })
    async verifyClaim(@Param('token') token: string, @Res() res: any): Promise<any> {
        try {
            const record = await this.tokenService.verifyToken(token, 'CLAIM_ACCESS');
            // Redirect to frontend claim portal with the token
            // The frontend claim portal will use the token/record to fetch will/assets
            return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/claim/${token}`);
        } catch (e) {
            return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/?error=invalid_claim_token`);
        }
    }
}
