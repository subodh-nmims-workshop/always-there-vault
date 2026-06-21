import { Controller, Post, Body, Get, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { MFAService } from './mfa.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { VerifySignatureDto, NonceResponseDto } from './dto/auth.dto';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly mfaService: MFAService
    ) { }

    @Get('nonce')
    @ApiOperation({ summary: 'Get a secure random nonce to sign for authentication' })
    @ApiResponse({ status: 200, description: 'Nonce generated successfully' })
    getNonce(): NonceResponseDto {
        return { nonce: this.authService.generateNonce() };
    }

    @Post('verify')
    @ApiOperation({ summary: 'Verify MetaMask signature' })
    @ApiResponse({ status: 200, description: 'Signature verified successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async verifySignature(@Body() dto: VerifySignatureDto) {
        return this.authService.verifySignature(dto.walletAddress, dto.message, dto.signature);
    }

    @Post('mfa/enable')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Generate and enable TOTP MFA for authenticated user' })
    async enableMFA(@Req() req: any) {
        const userId = req.user.userId;
        return this.mfaService.enable2FA(userId);
    }

    @Post('mfa/disable')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Disable TOTP MFA for authenticated user' })
    async disableMFA(@Req() req: any) {
        const userId = req.user.userId;
        await this.mfaService.disable2FA(userId);
        return { success: true };
    }

    @Post('mfa/verify-setup')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Verify and finalize MFA setup' })
    async verifyMFASetup(@Req() req: any, @Body('code') code: string) {
        const userId = req.user.userId;
        const isValid = await this.mfaService.verify2FA(userId, code);
        if (!isValid) {
            await this.mfaService.disable2FA(userId);
            throw new BadRequestException('Invalid 2FA code. MFA setup aborted.');
        }
        return { success: true };
    }

    @Post('mfa/verify')
    @ApiOperation({ summary: 'Verify MFA code after signature' })
    @ApiResponse({ status: 200, description: 'MFA verified successfully' })
    @ApiResponse({ status: 401, description: 'MFA failed' })
    async verifyMFA(@Body() dto: { mfaToken: string; code: string }) {
        return this.authService.verifyMFA(dto.mfaToken, dto.code);
    }
}
