import { Module } from '@nestjs/common';
import { EventExceptionController } from './event-exception.controller';
import { EventExceptionService } from './event-exception.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventExceptionEntity } from './entites/event-exception.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventExceptionEntity])],
  controllers: [EventExceptionController],
  providers: [EventExceptionService],
    exports: [EventExceptionService]
})
export class EventExceptionModule {}
