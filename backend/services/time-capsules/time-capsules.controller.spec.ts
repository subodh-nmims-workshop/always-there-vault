import { Test, TestingModule } from '@nestjs/testing';
import { TimeCapsulesController } from './time-capsules.controller';
import { TimeCapsulesService } from './time-capsules.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

describe('TimeCapsulesController', () => {
  let controller: TimeCapsulesController;
  let mockTimeCapsulesService: any;

  beforeEach(async () => {
    mockTimeCapsulesService = {
      createTimeCapsule: jest.fn().mockResolvedValue({ id: '1' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeCapsulesController],
      providers: [
        {
          provide: TimeCapsulesService,
          useValue: mockTimeCapsulesService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<TimeCapsulesController>(TimeCapsulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
