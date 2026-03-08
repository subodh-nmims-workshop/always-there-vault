import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DecentralizedStorageService } from './services/decentralized-storage.service';
import { IPFSService } from './services/ipfs.service';
import { ArweaveService } from './services/arweave.service';
import { EncryptionService } from './services/encryption.service';
import { LocalStorageService } from './services/local-storage.service';
import { S3StorageService } from './services/s3-storage.service';
import { StorageQuotaService } from './services/storage-quota.service';
import { StorageController } from './storage.controller';
import { User } from '../auth/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [StorageController],
  providers: [
    DecentralizedStorageService,
    IPFSService,
    ArweaveService,
    EncryptionService,
    LocalStorageService,
    S3StorageService,
    StorageQuotaService,
  ],
  exports: [
    DecentralizedStorageService,
    EncryptionService,
    LocalStorageService,
    StorageQuotaService,
  ],
})
export class StorageModule {}