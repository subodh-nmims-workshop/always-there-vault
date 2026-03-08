import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { AssetsService } from './assets.service';
import { Asset } from './schemas/asset.schema';

const mockAsset = {
    assetId: 'asset_123',
    name: 'Test File',
    type: 'document',
    ownerWallet: '0x123',
    status: 'active',
    save: jest.fn().mockResolvedValue(true),
};

class MockAssetModel {
    constructor(private data: any) { }
    save = jest.fn().mockResolvedValue(this.data);

    static find = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue([mockAsset]),
    });

    static findOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockAsset),
    });

    static findOneAndUpdate = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({ ...mockAsset, name: 'Updated Name' }),
    });

    static findOneAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(true),
    });
}

describe('AssetsService', () => {
    let service: AssetsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AssetsService,
                {
                    provide: getModelToken(Asset.name),
                    useValue: MockAssetModel,
                },
            ],
        }).compile();

        service = module.get<AssetsService>(AssetsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getAllAssets', () => {
        it('should return an array of assets for a wallet', async () => {
            const result = await service.getAllAssets('0x123');
            expect(result).toEqual([mockAsset]);
            expect(MockAssetModel.find).toHaveBeenCalledWith({ ownerWallet: '0x123' });
        });
    });

    describe('getAsset', () => {
        it('should return a single asset by id', async () => {
            const result = await service.getAsset('asset_123');
            expect(result).toEqual(mockAsset);
            expect(MockAssetModel.findOne).toHaveBeenCalledWith({ assetId: 'asset_123' });
        });
    });

    describe('createAsset', () => {
        it('should create and save a new asset', async () => {
            const dto = { name: 'Test File', type: 'document', ownerWallet: '0x123' };
            const result = await service.createAsset(dto);
            expect(result).toBeDefined();
        });
    });
});
