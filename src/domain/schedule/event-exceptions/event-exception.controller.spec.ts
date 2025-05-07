import { Test, TestingModule } from '@nestjs/testing';
import { EventExceptionController } from './event-exception.controller';

describe('EventExceptionController', () => {
  let controller: EventExceptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventExceptionController],
    }).compile();

    controller = module.get<EventExceptionController>(EventExceptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
