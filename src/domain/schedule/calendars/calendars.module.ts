import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarEntity } from './entities/calendar.entity';
import { CalendarMemberEntity } from './entities/calendar-member.entity';
import { CalendarsRepository } from './calendars.repository';
import { CalendarsService } from './calendars.service';
import { CalendarsController } from './calendars.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CalendarEntity, CalendarMemberEntity])],
  providers: [CalendarsRepository, CalendarsService],
  controllers: [CalendarsController],
  exports: [CalendarsRepository],
})
export class CalendarsModule {}
