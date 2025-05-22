import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CalendarEntity } from './entities/calendar.entity';
import { CalendarMemberEntity } from './entities/calendar-member.entity';
import { CreateCalendarRequestDTO } from './dtos/request/CreateCalendar.request.dto';

@Injectable()
export class CalendarsRepository {
    constructor(
        @InjectRepository(CalendarEntity)
        private readonly calendarRepository: Repository<CalendarEntity>,

        @InjectRepository(CalendarMemberEntity)
        private readonly memberRepository: Repository<CalendarMemberEntity>,

        private readonly dataSource: DataSource
    ) { }

    async createWithOwner(userId: number, dto: CreateCalendarRequestDTO): Promise<CalendarEntity> {
        return await this.dataSource.transaction(async (manager) => {
            const calendar = manager.create(CalendarEntity, {
                name: dto.name,
                color: dto.color,
                isPrivate: dto.isPrivate ?? false,
                isDefault: dto.isDefault ?? false,
            });

            const savedCalendar = await manager.save(calendar);

            const member = manager.create(CalendarMemberEntity, {
                calendar: savedCalendar,
                user: { id: userId },
                role: 'owner',
            });

            await manager.save(member);

            return savedCalendar;
        });
    }

    async findCalendarsByUserId(userId: number): Promise<CalendarEntity[]> {
        return this.calendarRepository
            .createQueryBuilder('calendar')
            .leftJoinAndSelect('calendar.members', 'member')
            .where('member.user.id = :userId', { userId })
            .getMany();
    }

    async findByIdWithMembers(calendarId: number): Promise<CalendarEntity | null> {
        return this.calendarRepository.findOne({
            where: { id: calendarId },
            relations: ['members', 'members.user'],
        });
    }

    async findDefaultCalendarByUserId(userId: number): Promise<CalendarEntity | null> {
        return this.calendarRepository
            .createQueryBuilder('calendar')
            .leftJoinAndSelect('calendar.members', 'member')
            .where('calendar.isDefault = true')
            .andWhere('member.userId = :userId', { userId })
            .getOne();
    }

}
