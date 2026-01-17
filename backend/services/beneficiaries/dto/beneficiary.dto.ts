import { IsString, IsEmail, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBeneficiaryDto {
  @ApiProperty({ description: 'Beneficiary name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Beneficiary email' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Beneficiary wallet address' })
  @IsString()
  walletAddress: string;

  @ApiProperty({ description: 'Owner wallet address' })
  @IsString()
  ownerAddress: string;

  @ApiProperty({ description: 'Relationship to owner', required: false })
  @IsOptional()
  @IsString()
  relationship?: string;
}

export class UpdateBeneficiaryDto {
  @ApiProperty({ description: 'Beneficiary name', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Beneficiary email', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'Beneficiary wallet address', required: false })
  @IsOptional()
  @IsString()
  walletAddress?: string;

  @ApiProperty({ description: 'Relationship to owner', required: false })
  @IsOptional()
  @IsString()
  relationship?: string;

  @ApiProperty({ description: 'Enable/disable beneficiary', required: false })
  @IsOptional()
  @IsBoolean()
  enabled?: boolean;
}

export class BeneficiaryDto {
  @ApiProperty({ description: 'Beneficiary ID' })
  id: string;

  @ApiProperty({ description: 'Beneficiary name' })
  name: string;

  @ApiProperty({ description: 'Beneficiary email' })
  email: string;

  @ApiProperty({ description: 'Beneficiary wallet address' })
  walletAddress: string;

  @ApiProperty({ description: 'Owner wallet address' })
  ownerAddress: string;

  @ApiProperty({ description: 'Relationship to owner', required: false })
  relationship?: string;

  @ApiProperty({ description: 'Whether beneficiary is enabled' })
  enabled: boolean;

  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  updatedAt: Date;
}
