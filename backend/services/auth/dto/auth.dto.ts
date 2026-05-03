import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class VerifySignatureDto {
    @ApiProperty({ description: 'The wallet address of the user' })
    @IsString()
    @IsNotEmpty()
    walletAddress: string;

    @ApiProperty({ description: 'The message that was signed' })
    @IsString()
    @IsNotEmpty()
    message: string;

    @ApiProperty({ description: 'The cryptographic signature' })
    @IsString()
    @IsNotEmpty()
    signature: string;
}

export class NonceResponseDto {
    @ApiProperty({ description: 'A server-generated nonce for the user to sign' })
    @IsString()
    nonce: string;
}
