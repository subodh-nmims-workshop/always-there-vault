import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssetsController } from './assets.controller';
import { AssetsService } from './assets.service';
import { IpfsService } from './ipfs.service';
import { UsersModule } from '../users/users.module';
import { CryptoModule } from '../crypto/crypto.module';
import { HeartbeatModule } from '../heartbeat/heartbeat.module';
import { MalwareScannerService } from './malware-scanner.service';
import { Folder, FolderSchema } from './schemas/folder.schema';
import { Asset, AssetSchema } from './schemas/asset.schema';

import { B2Service } from './b2.service';

@Module({
  imports: [
    UsersModule,
    CryptoModule,
    HeartbeatModule,
  ],
  controllers: [AssetsController],
  providers: [AssetsService, IpfsService, MalwareScannerService, B2Service],
  exports: [AssetsService, MalwareScannerService, B2Service],
})
export class AssetsModule { }
