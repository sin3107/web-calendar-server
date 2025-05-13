import { Module } from '@nestjs/common';
import { EventExceptionsController } from './event-exceptions.controller';
import { EventExceptionsService } from './event-exceptions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventExceptionEntity } from './entites/event-exception.entity';
import { EventExceptionsRepository } from './event-exceptions.repository';

@Module({
  imports: [TypeOrmModule.forFeature([EventExceptionEntity])],
  controllers: [EventExceptionsController],
  providers: [EventExceptionsService, EventExceptionsRepository],
  exports: [EventExceptionsService]
})
export class EventExceptionModule { }
