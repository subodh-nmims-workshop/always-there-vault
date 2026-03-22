import { Controller, Get, Put, Body, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Put('storage-engine')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Switch storage engine preference between Cloud and Web3' })
    @ApiResponse({ status: 200, description: 'Storage engine switched successfully' })
    @ApiResponse({ status: 400, description: 'Storage engine switch failed/locked' })
    async switchStorageEngine(
        @Query('walletAddress') walletAddress: string,
        @Body('engine') engine: 'cloud' | 'web3'
    ) {
        return this.usersService.updateStorageEngine(walletAddress, engine);
    }

    @Get('profile')
    @ApiOperation({ summary: 'Get user profile and storage usage' })
    async getProfile(@Query('walletAddress') walletAddress: string) {
        return this.usersService.findUserByWallet(walletAddress);
    }
}
