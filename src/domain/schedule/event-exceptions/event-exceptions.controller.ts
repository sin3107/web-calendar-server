import {
    Controller,
    Post,
    Param,
    Body,
    HttpStatus,
    Patch,
    Delete,
    Get,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateEventExceptionRequestDTO } from './dtos/request/CreateEventException.request.dto';
import { SuccessResponse } from 'common/decorators/SuccessResponse.decorator';
import { ErrorResponse } from 'common/decorators/ErrorResponse.decorator';
import { EventExceptionsService } from './event-exceptions.service';
import { EventExceptionSuccessDefine } from './responseDefines/eventExceptionsSuccess';
import { Errors } from 'common/errors/Errors';
import { CreateEventExceptionResponseDTO } from './dtos/response/CreateEventException.response.dto';
import { UpdateEventExceptionRequestDTO } from './dtos/request/UpdateEventException.request.dto';
import { UpdateEventExceptionResponseDTO } from './dtos/response/UpdateEventException.response.dto.ts';
import { DeleteEventExceptionResponseDTO } from './dtos/response/DeleteEventException.response.dto';
import { SelectEventExceptionsResponseDTO } from './dtos/response/SelectEventExceptions.response.dto';
import { EventExceptionEntity } from './entites/event-exception.entity';

@ApiTags('Event Exceptions')
@Controller('events/:id/exceptions')
export class EventExceptionsController {
    constructor(private readonly eventExceptionsService: EventExceptionsService) { }

    @Get('')
    @ApiOperation({ summary: '예외 일정 목록 조회' })
    @SuccessResponse(HttpStatus.OK, [EventExceptionSuccessDefine['EventException-S004']])
    @ErrorResponse(HttpStatus.NOT_FOUND, [
        Errors.Event['EVENT_NOT_FOUND'],
    ])
    @ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, [
        Errors.Common['INTERNAL_SERVER_ERROR'],
    ])
    async getExceptions(
        @Param('id') eventId: number,
    ): Promise<SelectEventExceptionsResponseDTO> {
        return this.eventExceptionsService.getExceptions(eventId);
    }

    @Get(':exceptionId')
    @ApiOperation({ summary: '예외 일정 단건 조회' })
    async getException(
        @Param('id') id: number,
        @Param('exceptionId') exceptionId: number,
    ): Promise<EventExceptionEntity> {
        return this.eventExceptionsService.getExceptionById(id, exceptionId);
    }

    @Post()
    @ApiOperation({ summary: '예외 일정 등록' })
    @SuccessResponse(HttpStatus.CREATED, [EventExceptionSuccessDefine['EventException-S001']])
    @ErrorResponse(HttpStatus.NOT_FOUND, [
        Errors.Event['EVENT_NOT_FOUND'],
    ])
    @ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, [Errors.Common['INTERNAL_SERVER_ERROR']])

    async addEventException(
        @Param('id') id: number,
        @Body() dto: CreateEventExceptionRequestDTO,
    ): Promise<CreateEventExceptionResponseDTO> {
        return this.eventExceptionsService.addException(id, dto);
    }

    @Patch(':exceptionId')
    @ApiOperation({ summary: '예외 일정 수정' })
    @SuccessResponse(HttpStatus.OK, [EventExceptionSuccessDefine['EventException-S002']])
    @ErrorResponse(HttpStatus.NOT_FOUND, [
        Errors.Event['EVENT_NOT_FOUND'],
        Errors.EventException['EXCEPTION_NOT_FOUND'],
    ])
    @ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, [
        Errors.Common['INTERNAL_SERVER_ERROR'],
    ])
    async updateException(
        @Param('id') id: number,
        @Param('exceptionId') exceptionId: number,
        @Body() dto: UpdateEventExceptionRequestDTO,
    ): Promise<UpdateEventExceptionResponseDTO> {
        return this.eventExceptionsService.updateException(id, exceptionId, dto);
    }

    @Delete(':exceptionId')
    @ApiOperation({ summary: '예외 일정 삭제' })
    @SuccessResponse(HttpStatus.NO_CONTENT, [EventExceptionSuccessDefine['EventException-S003']])
    @ErrorResponse(HttpStatus.NOT_FOUND, [
        Errors.Event['EVENT_NOT_FOUND'],
        Errors.EventException['EXCEPTION_NOT_FOUND'],
    ])
    @ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, [
        Errors.Common['INTERNAL_SERVER_ERROR'],
    ])
    async deleteException(
        @Param('id') id: number,
        @Param('exceptionId') exceptionId: number,
    ): Promise<DeleteEventExceptionResponseDTO> {
        return this.eventExceptionsService.deleteException(id, exceptionId);
    }

}
