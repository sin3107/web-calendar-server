import { Module } from '@nestjs/common';
import { CalendarsModule } from './calendars/calendars.module';
import { EventsModule } from './events/events.module';
import { EventExceptionModule } from './event-exceptions/event-exceptions.module';

@Module({
  imports: [CalendarsModule, EventsModule, EventExceptionModule]
})
export class ScheduleModule {}
