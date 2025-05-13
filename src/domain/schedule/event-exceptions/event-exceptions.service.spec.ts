import { Test, TestingModule } from '@nestjs/testing';
import { EventExceptionsService } from './event-exceptions.service';

describe('EventExceptionService', () => {
  let service: EventExceptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventExceptionsService],
    }).compile();

    service = module.get<EventExceptionsService>(EventExceptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
