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

    @Post('verify-email')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Verify user email using 6-digit code' })
    async verifyEmail(
        @Req() req: any,
        @Body('code') code: string
    ) {
        const userId = req.user.userId;
        return this.usersService.verifyEmail(userId, code);
    }

    @Post('resend-verification')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Resend email verification code' })
    async resendVerification(@Req() req: any) {
        const userId = req.user.userId;
        return this.usersService.resendVerificationCode(userId);
    }

    @Post('recovery-key')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Link a recovery address to the user account' })
    async linkRecoveryAddress(
        @Req() req: any,
        @Body('recoveryAddress') recoveryAddress: string | null
    ) {
        const userId = req.user.userId;
        return this.usersService.updateRecoveryAddress(userId, recoveryAddress);
    }

    @Post('delete-email')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Delete/remove email verification status and email' })
    async deleteEmail(@Req() req: any) {
        const walletAddress = req.user.walletAddress;
        return this.usersService.deleteEmail(walletAddress);
    }
}
