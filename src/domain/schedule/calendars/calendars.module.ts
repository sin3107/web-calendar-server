import { Module } from '@nestjs/common';
import { CalendarsController } from './calendars.controller';
import { CalendarsService } from './calendars.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarEntity } from './entities/calendar.entity';
import { CalendarMemberEntity } from './entities/calendar-member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CalendarEntity, CalendarMemberEntity])],
  controllers: [CalendarsController],
  providers: [CalendarsService],
  exports: [CalendarsService]
})
export class CalendarsModule {}
