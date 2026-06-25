import { Test, TestingModule } from '@nestjs/testing';
import { TimeCapsulesService } from './time-capsules.service';

describe('TimeCapsulesService', () => {
  let service: TimeCapsulesService;
  let mockDb: any;

  beforeEach(async () => {
    mockDb = {
      insert: jest.fn().mockReturnThis(),
      values: jest.fn().mockReturnThis(),
      returning: jest.fn().mockResolvedValue([{ id: '1' }]),
      select: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      where: jest.fn().mockResolvedValue([]),
      update: jest.fn().mockReturnThis(),
      set: jest.fn().mockReturnThis(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TimeCapsulesService,
        {
          provide: 'DRIZZLE_DB',
          useValue: mockDb,
        },
      ],
    }).compile();

    service = module.get<TimeCapsulesService>(TimeCapsulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
