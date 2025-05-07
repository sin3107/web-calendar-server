import { Injectable, Logger } from '@nestjs/common';
import { EventsRepository } from './events.repository';
import { EventEntity } from './entities/event.entity';
import { ConfigService } from '@nestjs/config';
import { GetEventRequestDTO } from './dtos/request/GetEvent.request.dto';
import { CreateEventRequestDTO } from './dtos/request/CreateEvent.request.dto';
import { UpdateEventRequestDTO } from './dtos/request/UpdateEvent.request.dto';
import { Errors } from 'common/errors/Errors';
import { HttpException } from '@nestjs/common';
import { CreateEventResponseDTO } from './dtos/response/CreateEvent.response.dto';
import { UpdateAndDeleteEventResponseDTO } from './dtos/response/UpdateAndDeleteEvent.response.dto';

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);

  constructor(
    private readonly eventRepository: EventsRepository,
  ) { }

  // 특정 기간 내 일정 조회
  async getEventsInRange(calendarId: number, dto: GetEventRequestDTO): Promise<EventEntity[]> {
    const { startDate, endDate } = dto;
    return this.eventRepository.findEventsInRange(calendarId, startDate, endDate);
  }

  // 단건 조회
  async getEventById(id: number): Promise<EventEntity> {
    const event = await this.eventRepository.findById(id);
    if (!event) {
      throw new HttpException(Errors.Event['EVENT_NOT_FOUND'], Errors.Event['EVENT_NOT_FOUND'].statusCode);
    }
    return event;
  }

  // 일정 추가
  async createEvent(dto: CreateEventRequestDTO): Promise<CreateEventResponseDTO> {
    if (dto.startTime > dto.endTime) {
      throw new HttpException(Errors.Event['INVALID_EVENT_TIME_RANGE'], Errors.Event['INVALID_EVENT_TIME_RANGE'].statusCode);
    }
    const event = {
      title: dto.title,
      startTime: dto.startTime,
      endTime: dto.endTime,
      location: dto.location,
      isAllDay: dto.isAllDay,
      calendar: { id: dto.calendarId },
    } as EventEntity;

    const savedEvent = await this.eventRepository.saveEvent(event);

    return {
      eventId: savedEvent.id,
      title: savedEvent.title,
      startTime: savedEvent.startTime,
      endTime: savedEvent.endTime,
      location: savedEvent.location,
      isAllDay: savedEvent.isAllDay,
    };

  }

  // 일정 수정
  async updateEvent(id: number, dto: UpdateEventRequestDTO): Promise<UpdateAndDeleteEventResponseDTO> {
    const existing = await this.eventRepository.findById(id);
    if (!existing) {
      throw new HttpException(Errors.Event['EVENT_NOT_FOUND'], Errors.Event['EVENT_NOT_FOUND'].statusCode);
    }
    if (dto.startTime && dto.endTime && dto.startTime > dto.endTime) {
      throw new HttpException(Errors.Event['INVALID_EVENT_TIME_RANGE'], Errors.Event['INVALID_EVENT_TIME_RANGE'].statusCode);
    }
    await this.eventRepository.updateEvent(id, dto);
    const updated = await this.eventRepository.findById(id);

    return {
      eventId: updated.id,
      status: 'updated',
    };
  }

  // 일정 삭제
  async deleteEvent(id: number): Promise<UpdateAndDeleteEventResponseDTO> {
    const existing = await this.eventRepository.findById(id);
    if (!existing) {
      throw new HttpException(Errors.Event['EVENT_NOT_FOUND'], Errors.Event['EVENT_NOT_FOUND'].statusCode);
    }
    await this.eventRepository.deleteEvent(id);
    return {
      eventId: existing.id,
      status: 'deleted',
    };

  }
}
