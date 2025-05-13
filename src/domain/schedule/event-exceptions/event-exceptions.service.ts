import { HttpException, Injectable } from '@nestjs/common';
import { EventExceptionEntity } from './entites/event-exception.entity';
import { CreateEventExceptionRequestDTO } from './dtos/request/CreateEventException.request.dto';
import { Errors } from 'common/errors/Errors';
import { EventExceptionsRepository } from './event-exceptions.repository';
import { EventsRepository } from '../events/events.repository';
import { UpdateEventExceptionRequestDTO } from './dtos/request/UpdateEventException.request.dto';
import { CreateEventExceptionResponseDTO } from './dtos/response/CreateEventException.response.dto';
import { UpdateEventExceptionResponseDTO } from './dtos/response/UpdateEventException.response.dto.ts';
import { DeleteEventExceptionResponseDTO } from './dtos/response/DeleteEventException.response.dto';

@Injectable()
export class EventExceptionsService {
  constructor(
    private readonly eventExceptionsRepository: EventExceptionsRepository,
    private readonly eventsRepository: EventsRepository
  ) { }

  async addException(id: number, dto: CreateEventExceptionRequestDTO): Promise<CreateEventExceptionResponseDTO> {
    const event = await this.eventsRepository.findById(id);

    if (!event) {
      throw new HttpException(
        Errors.Event['EVENT_NOT_FOUND'],
        Errors.Event['EVENT_NOT_FOUND'].statusCode
      );
    }

    const exception = new EventExceptionEntity()
    exception.event = event
    exception.exceptionDate = dto.exceptionDate
    exception.type = dto.type
    exception.modifiedEventData = dto.modifiedEventData

    return await this.eventExceptionsRepository.saveEventException(exception);
  }

  async updateException(id: number, exceptionId: number, dto: UpdateEventExceptionRequestDTO): Promise<UpdateEventExceptionResponseDTO> {
    const event = await this.eventsRepository.findById(id);
    if (!event) {
      throw new HttpException(
        Errors.Event['EVENT_NOT_FOUND'],
        Errors.Event['EVENT_NOT_FOUND'].statusCode
      );
    }

    const exception = await this.eventExceptionsRepository.findById(exceptionId);
    if (!exception) {
      throw new HttpException(
        Errors.EventException['EXCEPTION_NOT_FOUND'],
        Errors.EventException['EXCEPTION_NOT_FOUND'].statusCode
      );
    }

    exception.exceptionDate = dto.exceptionDate ?? exception.exceptionDate;
    exception.type = dto.type ?? exception.type;
    exception.modifiedEventData = dto.modifiedEventData ?? exception.modifiedEventData;

    const updated = await this.eventExceptionsRepository.saveEventException(exception);

    return {
      id: updated.id,
      exceptionDate: updated.exceptionDate,
      type: updated.type,
    };
  }

  async deleteException(id: number, exceptionId: number): Promise<DeleteEventExceptionResponseDTO> {
    const event = await this.eventsRepository.findById(id);
    if (!event) {
      throw new HttpException(
        Errors.Event['EVENT_NOT_FOUND'],
        Errors.Event['EVENT_NOT_FOUND'].statusCode,
      );
    }

    const exception = await this.eventExceptionsRepository.findById(exceptionId);
    if (!exception) {
      throw new HttpException(
        Errors.EventException['EXCEPTION_NOT_FOUND'],
        Errors.EventException['EXCEPTION_NOT_FOUND'].statusCode,
      );
    }

    await this.eventExceptionsRepository.deleteById(exceptionId);

    return {
      exceptionId,
      status: 'deleted'
    }
  }

}
