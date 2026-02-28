import { ApiProperty } from '@nestjs/swagger';

export class VerifySignatureDto {
    @ApiProperty({ description: 'The wallet address of the user' })
    walletAddress: string;

    @ApiProperty({ description: 'The message that was signed' })
    message: string;

    @ApiProperty({ description: 'The cryptographic signature' })
    signature: string;
}

export class NonceResponseDto {
    @ApiProperty({ description: 'A server-generated nonce for the user to sign' })
    nonce: string;
}
