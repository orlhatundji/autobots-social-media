import { Test, TestingModule } from '@nestjs/testing';
import { AutobotSchedulerService } from './autobot-scheduler.service';

describe('AutobotSchedulerService', () => {
  let service: AutobotSchedulerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutobotSchedulerService],
    }).compile();

    service = module.get<AutobotSchedulerService>(AutobotSchedulerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
