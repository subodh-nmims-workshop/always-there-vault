import { Controller, Get, Post, Put, Body, Query, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, ValidateIf } from 'class-validator';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

export class UpdateStorageEngineDto {
  @ApiProperty({ description: 'Storage engine preference', enum: ['cloud', 'web3'] })
  @IsString()
  engine: 'cloud' | 'web3';
}

export class UpdateProfileDto {
  @ApiProperty({ description: 'User email address', required: false })
  @IsOptional()
  @ValidateIf(o => o.email !== '')
  @IsEmail()
  email?: string;
}

export class VerifyEmailDto {
  @ApiProperty({ description: '6-digit OTP verification code' })
  @IsString()
  code: string;
}

export class LinkRecoveryAddressDto {
  @ApiProperty({ description: 'Recovery wallet address', required: false, nullable: true })
  @IsOptional()
  @IsString()
  recoveryAddress: string | null;
}

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
        @Body() body: UpdateStorageEngineDto
    ) {
        const userId = req.user.userId;
        return this.usersService.updateStorageEngine(userId, body.engine);
    }

    @Get('profile')
    @ApiOperation({ summary: 'Get user profile and storage usage' })
    async getProfile(@Req() req: any) {
        const walletAddress = req.user.walletAddress;
        return this.usersService.findUserByWallet(walletAddress);
    }

    @Post('profile')
    @ApiOperation({ summary: 'Create or update user profile' })
    async createProfile(@Req() req: any, @Body() body: UpdateProfileDto) {
        const walletAddress = req.user.walletAddress;
        return this.usersService.createOrUpdateUser(walletAddress, body.email);
    }

    @Post('verify-email')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Verify user email using 6-digit code' })
    async verifyEmail(
        @Req() req: any,
        @Body() body: VerifyEmailDto
    ) {
        const userId = req.user.userId;
        return this.usersService.verifyEmail(userId, body.code);
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
        @Body() body: LinkRecoveryAddressDto
    ) {
        const userId = req.user.userId;
        return this.usersService.updateRecoveryAddress(userId, body.recoveryAddress);
    }

    @Post('delete-email')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Delete/remove email verification status and email' })
    async deleteEmail(@Req() req: any) {
        const walletAddress = req.user.walletAddress;
        return this.usersService.deleteEmail(walletAddress);
    }
}
