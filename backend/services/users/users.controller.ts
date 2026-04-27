import { Controller, Get, Post, Put, Body, Query, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Put('storage-engine')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Switch storage engine preference between Cloud and Web3' })
    @ApiResponse({ status: 200, description: 'Storage engine switched successfully' })
    @ApiResponse({ status: 400, description: 'Storage engine switch failed/locked' })
    async switchStorageEngine(
        @Req() req: any,
        @Body('engine') engine: 'cloud' | 'web3'
    ) {
        const userId = req.user.userId;
        return this.usersService.updateStorageEngine(userId, engine);
    }

    @Get('profile')
    @ApiOperation({ summary: 'Get user profile and storage usage' })
    async getProfile(@Req() req: any) {
        const walletAddress = req.user.walletAddress;
        return this.usersService.findUserByWallet(walletAddress);
    }

    @Post('profile')
    @ApiOperation({ summary: 'Create or update user profile' })
    async createProfile(@Req() req: any, @Body('email') email?: string) {
        const walletAddress = req.user.walletAddress;
        return this.usersService.createOrUpdateUser(walletAddress, email);
    }
}
