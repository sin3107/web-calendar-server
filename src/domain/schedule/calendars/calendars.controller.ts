import { Body, Controller, Get, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'common/decorators/user.decorator';
import { JwtAuthGuard } from 'domain/auth/passport/guards/local.guard';
import { CalendarsService } from './calendars.service';
import { CreateCalendarRequestDTO } from './dtos/request/CreateCalendar.request.dto';
import { SuccessResponse } from 'common/decorators/SuccessResponse.decorator';
import { ErrorResponse } from 'common/decorators/ErrorResponse.decorator';
import { Errors } from 'common/errors/Errors';
import { CalendarsSuccessDefine } from './responseDefines/calendarsSuccess';
import { CreateCalendarResponseDTO } from './dtos/response/CreateCalendar.response.dto';
import { SelectCalendarListResponseDTO } from './dtos/response/SelectCalendarList.response.dto';
import { CalendarDetailResponseDTO } from './dtos/response/SelectCalendarDetail.response.dto';
import { CalendarMembersResponseDTO } from './dtos/response/SelectCalendarMembers.response.dto';

@ApiTags('Calendars')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('calendars')
export class CalendarsController {
    constructor(private readonly calendarsService: CalendarsService) { }

    @Post()
    @ApiOperation({ summary: '캘린더 생성' })
    @SuccessResponse(HttpStatus.CREATED, [CalendarsSuccessDefine['Calendar-S001']])
    @ErrorResponse(HttpStatus.BAD_REQUEST, [Errors.Calendar['INVALID_CALENDAR_DATA']])
    @ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, [Errors.Common['INTERNAL_SERVER_ERROR']])
    async createCalendar(
        @CurrentUser() user,
        @Body() dto: CreateCalendarRequestDTO,
    ): Promise<CreateCalendarResponseDTO> {
        return await this.calendarsService.createCalendar(user.id, dto);
    }

    @Get()
    @ApiOperation({ summary: '내 캘린더 목록 조회' })
    @SuccessResponse(HttpStatus.OK, [CalendarsSuccessDefine['Calendar-S002']])
    @ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, [Errors.Common['INTERNAL_SERVER_ERROR']])
    async getMyCalendars(@CurrentUser() user): Promise<SelectCalendarListResponseDTO> {
        return await this.calendarsService.getMyCalendars(user.id);
    }

    @Get(':id')
    @ApiOperation({ summary: '단일 캘린더 조회' })
    @SuccessResponse(HttpStatus.OK, [CalendarsSuccessDefine['Calendar-S003']])
    @ErrorResponse(HttpStatus.NOT_FOUND, [Errors.Calendar['CALENDAR_NOT_FOUND']])
    @ErrorResponse(HttpStatus.FORBIDDEN, [Errors.Calendar['CALENDAR_ACCESS_DENIED']])
    @ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, [Errors.Common['INTERNAL_SERVER_ERROR']])
    async getCalendarById(
        @CurrentUser() user,
        @Param('id') calendarId: number,
    ): Promise<CalendarDetailResponseDTO> {
        return this.calendarsService.getCalendarById(calendarId, user.id);
    }

    @Get('default')
    @ApiOperation({ summary: '기본 캘린더 조회' })
    @SuccessResponse(HttpStatus.OK, [CalendarsSuccessDefine['Calendar-S004']])
    @ErrorResponse(HttpStatus.NOT_FOUND, [Errors.Calendar['NO_DEFAULT_CALENDAR']])
    @ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, [Errors.Common['INTERNAL_SERVER_ERROR']])
    async getDefaultCalendar(
        @CurrentUser() user,
    ): Promise<CalendarDetailResponseDTO> {
        return this.calendarsService.getDefaultCalendar(user.id);
    }

    @Get(':id/members')
    @ApiOperation({ summary: '캘린더 멤버 목록 조회' })
    @SuccessResponse(HttpStatus.OK, [CalendarsSuccessDefine['Calendar-S005']])
    @ErrorResponse(HttpStatus.NOT_FOUND, [Errors.Calendar['CALENDAR_NOT_FOUND']])
    @ErrorResponse(HttpStatus.FORBIDDEN, [Errors.Calendar['CALENDAR_ACCESS_DENIED']])
    @ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, [Errors.Common['INTERNAL_SERVER_ERROR']])
    async getCalendarMembers(
        @CurrentUser() user,
        @Param('id') calendarId: number,
    ): Promise<CalendarMembersResponseDTO> {
        return this.calendarsService.getCalendarMembers(calendarId, user.id);
    }

}
