import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    Logger,
    HttpStatus,
    Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiQuery } from '@nestjs/swagger';
import { EventsService } from './events.service';
import { GetEventRequestDTO } from './dtos/request/GetEvent.request.dto';
import { SuccessResponse } from 'common/decorators/SuccessResponse.decorator';
import { ErrorResponse } from 'common/decorators/ErrorResponse.decorator';
import { EventsSuccessDefine } from './responseDefines/eventsSuccess';
import { Errors } from 'common/errors/Errors';
import { CreateEventRequestDTO } from './dtos/request/CreateEvent.request.dto';
import { UpdateEventRequestDTO } from './dtos/request/UpdateEvent.request.dto';
import { UpdateAndDeleteEventResponseDTO } from './dtos/response/UpdateAndDeleteEvent.response.dto';
import { CreateEventResponseDTO } from './dtos/response/CreateEvent.response.dto';
import { SelectEventListResponseDTO } from './dtos/response/SelectEventList.response.dto';
import { UpdateRepeatRuleRequestDTO } from './dtos/request/UpdateRepeatRule.request.dto';


@ApiTags('Events')
@Controller('events')
export class EventsController {
    private readonly logger = new Logger(EventsController.name);

    constructor(
        private readonly eventsService: EventsService,
    ) { }

    @Get(':calendarId')
    @ApiOperation({ summary: '기간 내 일정 조회' })
    @ApiQuery({ name: 'startDate', required: true, type: String })
    @ApiQuery({ name: 'endDate', required: true, type: String })
    @SuccessResponse(HttpStatus.OK, [EventsSuccessDefine['Event-S003']])
    @ErrorResponse(HttpStatus.NOT_FOUND, [
        Errors.Event['EVENT_NOT_FOUND'],
    ])
    @ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, [
        Errors.Common['INTERNAL_SERVER_ERROR'],
    ])
    async getEventsInRange(
        @Param('calendarId') calendarId: number,
        @Query() dto: GetEventRequestDTO,
    ): Promise<SelectEventListResponseDTO> {
        return this.eventsService.getEventsInRange(calendarId, dto);
    }

    @Post()
    @ApiOperation({ summary: '일정 등록' })
    @SuccessResponse(HttpStatus.CREATED, [EventsSuccessDefine['Event-S001']])
    @ErrorResponse(HttpStatus.BAD_REQUEST, [
        Errors.Event['INVALID_EVENT_TIME_RANGE'],
    ])
    @ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, [
        Errors.Common['INTERNAL_SERVER_ERROR'],
    ])
    async createEvent(@Body() dto: CreateEventRequestDTO): Promise<CreateEventResponseDTO> {
        return this.eventsService.createEvent(dto);
    }

    @Put(':id')
    @ApiOperation({ summary: '일정 수정' })
    @SuccessResponse(HttpStatus.OK, [EventsSuccessDefine['Event-S002']])
    @ErrorResponse(HttpStatus.NOT_FOUND, [
        Errors.Event['EVENT_NOT_FOUND']
    ])
    @ErrorResponse(HttpStatus.BAD_REQUEST, [
        Errors.Event['INVALID_EVENT_TIME_RANGE']
    ])
    @ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, [
        Errors.Common['INTERNAL_SERVER_ERROR']
    ])
    async updateEvent(
        @Param('id') id: number,
        @Body() dto: UpdateEventRequestDTO,
    ): Promise<UpdateAndDeleteEventResponseDTO> {
        return this.eventsService.updateEvent(id, dto);
    }

    @Put(':id/repeat-rule')
    @ApiOperation({ summary: '반복 규칙 수정' })
    @SuccessResponse(HttpStatus.OK, [EventsSuccessDefine['Event-S004']]) // 필요 시 추가
    @ErrorResponse(HttpStatus.NOT_FOUND, [
        Errors.Event['EVENT_NOT_FOUND'],
        Errors.Event['REPEAT_RULE_NOT_FOUND']
    ])
    @ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, [
        Errors.Common['INTERNAL_SERVER_ERROR']
    ])
    async updateRepeatRule(
        @Param('id') id: number,
        @Body() dto: UpdateRepeatRuleRequestDTO,
    ) {
        return this.eventsService.updateRepeatRule(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: '일정 삭제' })
    @SuccessResponse(HttpStatus.NO_CONTENT, [EventsSuccessDefine['Event-S002']])
    @ErrorResponse(HttpStatus.NOT_FOUND, [
        Errors.Event['EVENT_NOT_FOUND'],
    ])
    @ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, [
        Errors.Common['INTERNAL_SERVER_ERROR'],
    ])
    async deleteEvent(@Param('id') id: number): Promise<void> {
        await this.eventsService.deleteEvent(id);
    }

}
