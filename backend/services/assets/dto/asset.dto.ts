import { IsString, IsArray, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum AssetStatus {
  ACTIVE = 'active',
  RELEASED = 'released',
  REVOKED = 'revoked',
}

export class CreateAssetDto {
  @ApiProperty({ description: 'Asset name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Asset type (crypto_keys, document, etc.)' })
  @IsString()
  type: string;

  @ApiProperty({ description: 'Owner wallet address' })
  @IsString()
  ownerAddress: string;

  @ApiProperty({ description: 'IPFS hash of encrypted data' })
  @IsString()
  ipfsHash: string;

  @ApiProperty({ description: 'Encryption key ID' })
  @IsString()
  keyId: string;

  @ApiProperty({ description: 'Beneficiary wallet addresses', type: [String] })
  @IsArray()
  @IsString({ each: true })
  beneficiaries: string[];

  @ApiProperty({ description: 'Asset size in bytes', required: false })
  @IsOptional()
  @IsNumber()
  size?: number;

  @ApiProperty({ description: 'MIME type', required: false })
  @IsOptional()
  @IsString()
  mimeType?: string;
}

export class UpdateAssetDto {
  @ApiProperty({ description: 'Asset name', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Beneficiary wallet addresses', required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  beneficiaries?: string[];

  @ApiProperty({ description: 'Asset status', required: false, enum: AssetStatus })
  @IsOptional()
  @IsEnum(AssetStatus)
  status?: AssetStatus;
}

export class AssetMetadataDto {
  @ApiProperty({ description: 'Asset ID' })
  id: string;

  @ApiProperty({ description: 'Asset name' })
  name: string;

  @ApiProperty({ description: 'Asset type' })
  type: string;

  @ApiProperty({ description: 'Owner wallet address' })
  ownerAddress: string;

  @ApiProperty({ description: 'IPFS hash of encrypted data' })
  ipfsHash: string;

  @ApiProperty({ description: 'Encryption key ID' })
  keyId: string;

  @ApiProperty({ description: 'Beneficiary wallet addresses', type: [String] })
  beneficiaries: string[];

  @ApiProperty({ description: 'Asset size in bytes', required: false })
  size?: number;

  @ApiProperty({ description: 'MIME type', required: false })
  mimeType?: string;

  @ApiProperty({ description: 'Asset status', enum: AssetStatus })
  status: string;

  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  updatedAt: Date;
}
