import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssetsController } from './assets.controller';
import { AssetsService } from './assets.service';
import { IpfsService } from './ipfs.service';
import { UsersModule } from '../users/users.module';
import { CryptoModule } from '../crypto/crypto.module';
import { MalwareScannerService } from './malware-scanner.service';
import { Folder, FolderSchema } from './schemas/folder.schema';
import { Asset, AssetSchema } from './schemas/asset.schema';

@Module({
  imports: [
    UsersModule,
    CryptoModule,
  ],
  controllers: [AssetsController],
  providers: [AssetsService, IpfsService, MalwareScannerService],
  exports: [AssetsService, MalwareScannerService],
})
export class AssetsModule { }
