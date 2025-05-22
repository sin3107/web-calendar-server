import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CalendarEntity } from './entities/calendar.entity';
import { CalendarsRepository } from './calendars.repository';
import { CreateCalendarRequestDTO } from './dtos/request/CreateCalendar.request.dto';
import { SelectCalendarListResponseDTO } from './dtos/response/SelectCalendarList.response.dto';
import { Errors } from 'common/errors/Errors';
import { CalendarDetailResponseDTO } from './dtos/response/SelectCalendarDetail.response.dto';
import { CalendarMembersResponseDTO } from './dtos/response/SelectCalendarMembers.response.dto';

@Injectable()
export class CalendarsService {
    constructor(
        @InjectRepository(CalendarsRepository)
        private readonly calendarsRepository: CalendarsRepository,
    ) { }

    async createCalendar(userId: number, dto: CreateCalendarRequestDTO): Promise<CalendarEntity> {
        return await this.calendarsRepository.createWithOwner(userId, dto);
    }

    async getMyCalendars(userId: number): Promise<SelectCalendarListResponseDTO> {
        const calendars = await this.calendarsRepository.findCalendarsByUserId(userId);

        return {
            totalCount: calendars.length,
            calendars: calendars.map((calendar) => {
                const member = calendar.members.find((m) => m.user.id === userId);
                return {
                    id: calendar.id,
                    name: calendar.name,
                    color: calendar.color,
                    isPrivate: calendar.isPrivate,
                    isDefault: calendar.isDefault,
                    role: member?.role ?? 'viewer',
                };
            }),
        };
    }

    async getCalendarById(calendarId: number, userId: number): Promise<CalendarDetailResponseDTO> {
        const calendar = await this.calendarsRepository.findByIdWithMembers(calendarId);

        if (!calendar) {
            throw new HttpException(
                Errors.Calendar['CALENDAR_NOT_FOUND'],
                Errors.Calendar['CALENDAR_NOT_FOUND'].statusCode,
            );
        }

        const membership = calendar.members.find((m) => m.user.id === userId);
        if (!membership) {
            throw new HttpException(
                Errors.Calendar['CALENDAR_ACCESS_DENIED'],
                Errors.Calendar['CALENDAR_ACCESS_DENIED'].statusCode,
            );
        }

        return {
            id: calendar.id,
            name: calendar.name,
            color: calendar.color,
            isPrivate: calendar.isPrivate,
            isDefault: calendar.isDefault,
            role: membership.role,
        };
    }

    async getDefaultCalendar(userId: number): Promise<CalendarDetailResponseDTO> {
        const calendar = await this.calendarsRepository.findDefaultCalendarByUserId(userId);

        if (!calendar) {
            throw new HttpException(
                Errors.Calendar['NO_DEFAULT_CALENDAR'],
                Errors.Calendar['NO_DEFAULT_CALENDAR'].statusCode,
            );
        }

        const membership = calendar.members.find((m) => m.user.id === userId);

        return {
            id: calendar.id,
            name: calendar.name,
            color: calendar.color,
            isPrivate: calendar.isPrivate,
            isDefault: calendar.isDefault,
            role: membership?.role ?? 'viewer',
        };
    }

    async getCalendarMembers(calendarId: number, userId: number): Promise<CalendarMembersResponseDTO> {
        const calendar = await this.calendarsRepository.findByIdWithMembers(calendarId);

        if (!calendar) {
            throw new HttpException(
                Errors.Calendar['CALENDAR_NOT_FOUND'],
                Errors.Calendar['CALENDAR_NOT_FOUND'].statusCode,
            );
        }

        const requestingUser = calendar.members.find((m) => m.user.id === userId);
        if (!requestingUser) {
            throw new HttpException(
                Errors.Calendar['CALENDAR_ACCESS_DENIED'],
                Errors.Calendar['CALENDAR_ACCESS_DENIED'].statusCode,
            );
        }

        return {
            totalCount: calendar.members.length,
            members: calendar.members.map((member) => ({
                userId: member.user.id,
                username: member.user.name,
                role: member.role,
            })),
        };
    }


}
