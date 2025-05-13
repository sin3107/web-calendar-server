import { Test, TestingModule } from '@nestjs/testing';
import { EventExceptionsController } from './event-exceptions.controller';

describe('EventExceptionController', () => {
  let controller: EventExceptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventExceptionsController],
    }).compile();

    controller = module.get<EventExceptionsController>(EventExceptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
