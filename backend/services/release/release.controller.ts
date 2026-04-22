import { Controller, Post, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReleaseService } from './release.service';

@ApiTags('release')
@Controller('api/release')
export class ReleaseController {
    constructor(private readonly releaseService: ReleaseService) { }

    @Post(':assetId')
    @ApiOperation({ summary: 'Request release of an asset share (Requires triggered Last Wish switch)' })
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
