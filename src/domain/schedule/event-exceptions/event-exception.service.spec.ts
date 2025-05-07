import { Test, TestingModule } from '@nestjs/testing';
import { EventExceptionService } from './event-exception.service';

describe('EventExceptionService', () => {
  let service: EventExceptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventExceptionService],
    }).compile();

    service = module.get<EventExceptionService>(EventExceptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
