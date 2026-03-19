import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssetsController } from './assets.controller';
import { AssetsService } from './assets.service';
import { IpfsService } from './ipfs.service';
import { UsersModule } from '../users/users.module';
import { Folder, FolderSchema } from './schemas/folder.schema';
import { Asset, AssetSchema } from './schemas/asset.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Asset.name, schema: AssetSchema },
      { name: Folder.name, schema: FolderSchema },
    ]),
    UsersModule,
  ],
  controllers: [AssetsController],
  providers: [AssetsService, IpfsService],
  exports: [AssetsService],
})
export class AssetsModule { }
