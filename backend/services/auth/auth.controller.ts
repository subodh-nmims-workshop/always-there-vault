import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { VerifySignatureDto, NonceResponseDto } from './dto/auth.dto';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

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
}
