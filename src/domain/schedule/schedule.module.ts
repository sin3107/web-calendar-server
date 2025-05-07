import { Module } from '@nestjs/common';
import { CalendarsModule } from './calendars/calendars.module';
import { EventsModule } from './events/events.module';
import { EventExceptionModule } from './event-exceptions/event-exception.module';

@Module({
  imports: [CalendarsModule, EventsModule, EventExceptionModule]
})
export class ScheduleModule {}
