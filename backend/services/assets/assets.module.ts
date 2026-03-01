import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AssetsController } from './assets.controller';
import { AssetsService } from './assets.service';
import { IpfsService } from './ipfs.service';
import { Asset, AssetSchema } from './schemas/asset.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Asset.name, schema: AssetSchema }])],
  controllers: [AssetsController],
  providers: [AssetsService, IpfsService],
  exports: [AssetsService],
})
export class AssetsModule { }
