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
import { EventRepeatRuleEntity } from './entities/event-repeat-rule.entity';
import { SelectEventListResponseDTO } from './dtos/response/SelectEventList.response.dto';
import { UpdateRepeatRuleRequestDTO } from './dtos/request/UpdateRepeatRule.request.dto';
import { UpdateRepeatRuleResponseDTO } from './dtos/response/UpdateRepeatRule.response.dto';

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);

  constructor(
    private readonly eventRepository: EventsRepository,
  ) { }

  // 특정 기간 내 일정 조회
  async getEventsInRange(calendarId: number, dto: GetEventRequestDTO): Promise<SelectEventListResponseDTO> {
    const { startDate, endDate } = dto;
    const events = await this.eventRepository.findEventsInRange(calendarId, startDate, endDate);

    return {
      events: events.map(e => ({
        id: e.id,
        title: e.title,
        startTime: e.startTime,
        endTime: e.endTime,
        location: e.location,
        isAllDay: e.isAllDay,
        isRepeat: !!e.repeatRule
      })),
      totalCount: events.length,
    };
  }

  // 단건 조회
  async getEventById(id: number): Promise<EventEntity> {
    const event = await this.eventRepository.findById(id);
    if (!event) {
      throw new HttpException(
        Errors.Event['EVENT_NOT_FOUND'],
        Errors.Event['EVENT_NOT_FOUND'].statusCode
      );
    }
    return event;
  }


  // 일정 추가
  async createEvent(dto: CreateEventRequestDTO): Promise<CreateEventResponseDTO> {
    if (dto.startTime > dto.endTime) {
      throw new HttpException(
        Errors.Event['INVALID_EVENT_TIME_RANGE'],
        Errors.Event['INVALID_EVENT_TIME_RANGE'].statusCode,
      );
    }
    const event = {
      calendar: { id: dto.calendarId },
      title: dto.title,
      startTime: dto.startTime,
      endTime: dto.endTime,
      location: dto.location,
      isAllDay: dto.isAllDay,
    } as EventEntity;

    let savedEvent: EventEntity;

    if (dto.repeatRule) {
      const repeatRule = new EventRepeatRuleEntity();
      repeatRule.repeatType = dto.repeatRule.repeatType;
      repeatRule.repeatInterval = dto.repeatRule.repeatInterval;
      repeatRule.repeatEndDate = dto.repeatRule.repeatEndDate;
      repeatRule.isForever = dto.repeatRule.isForever ?? false;
      repeatRule.repeatDaysOfWeek = dto.repeatRule.repeatDaysOfWeek;

      savedEvent = await this.eventRepository.saveEventWithRepeatRule(event, repeatRule);
    } else {
      savedEvent = await this.eventRepository.saveEvent(event);
    }

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
      throw new HttpException(
        Errors.Event['EVENT_NOT_FOUND'],
        Errors.Event['EVENT_NOT_FOUND'].statusCode
      );
    }
    if (dto.startTime && dto.endTime && dto.startTime > dto.endTime) {
      throw new HttpException(
        Errors.Event['INVALID_EVENT_TIME_RANGE'],
        Errors.Event['INVALID_EVENT_TIME_RANGE'].statusCode
      );
    }

    const updated = await this.eventRepository.updateEvent(id, dto);

    return {
      eventId: updated.id,
      status: 'updated',
    };
  }

  // 반복 일정 수정
  async updateRepeatRule(eventId: number, dto: UpdateRepeatRuleRequestDTO): Promise<UpdateRepeatRuleResponseDTO> {
    const event = await this.eventRepository.findById(eventId);

    if (!event) {
      throw new HttpException(
        Errors.Event['EVENT_NOT_FOUND'],
        Errors.Event['EVENT_NOT_FOUND'].statusCode,
      );
    }

    if (!event.repeatRule) {
      throw new HttpException(
        Errors.Event['REPEAT_RULE_NOT_FOUND'],
        Errors.Event['REPEAT_RULE_NOT_FOUND'].statusCode,
      );
    }

    const updatedRule = Object.assign(event.repeatRule, dto);
    const saved = await this.eventRepository.saveRepeatRule(updatedRule);

    return {
      repeatType: saved.repeatType,
      repeatInterval: saved.repeatInterval,
      repeatEndDate: saved.repeatEndDate,
      isForever: saved.isForever,
      repeatDaysOfWeek: saved.repeatDaysOfWeek,
    };
  }


  // 일정 삭제
  async deleteEvent(id: number): Promise<UpdateAndDeleteEventResponseDTO> {
    const existing = await this.eventRepository.findById(id);
    if (!existing) {
      throw new HttpException(
        Errors.Event['EVENT_NOT_FOUND'],
        Errors.Event['EVENT_NOT_FOUND'].statusCode
      );
    }
    await this.eventRepository.deleteEvent(id);
    return {
      eventId: existing.id,
      status: 'deleted',
    };

  }
}
