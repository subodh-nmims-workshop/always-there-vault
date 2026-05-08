import { Test, TestingModule } from '@nestjs/testing';
import { TimeCapsulesController } from './time-capsules.controller';

describe('TimeCapsulesController', () => {
  let controller: TimeCapsulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeCapsulesController],
    }).compile();

    controller = module.get<TimeCapsulesController>(TimeCapsulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
