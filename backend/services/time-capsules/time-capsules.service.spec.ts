import { Test, TestingModule } from '@nestjs/testing';
import { TimeCapsulesService } from './time-capsules.service';

describe('TimeCapsulesService', () => {
  let service: TimeCapsulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimeCapsulesService],
    }).compile();

    service = module.get<TimeCapsulesService>(TimeCapsulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
