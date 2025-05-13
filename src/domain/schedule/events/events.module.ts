import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsRepository } from './events.repository';
import { EventEntity } from './entities/event.entity';
import { EventRepeatRuleEntity } from './entities/event-repeat-rule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity, EventRepeatRuleEntity]),],
  controllers: [EventsController],
  providers: [EventsService, EventsRepository],
  exports: [EventsService]
})
export class EventsModule { }
