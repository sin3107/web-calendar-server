import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventExceptionEntity } from './entites/event-exception.entity';
import { EventEntity } from '../events/entities/event.entity';
import { CreateEventExceptionRequestDTO } from './dtos/request/CreateEventException.request.dto';

@Injectable()
export class EventExceptionsRepository {
  constructor(
    @InjectRepository(EventExceptionEntity)
    private readonly eventExceptionRepository: Repository<EventExceptionEntity>,

  ) { }

  async findByEventId(eventId: number): Promise<EventExceptionEntity[]> {
    return this.eventExceptionRepository.find({
      where: { event: { id: eventId } },
      order: { exceptionDate: 'ASC' },
    });
  }

  async findOneByEventIdAndExceptionId(eventId: number, exceptionId: number) {
    return this.eventExceptionRepository.findOne({
      where: {
        id: exceptionId,
        event: { id: eventId },
      },
      relations: ['event'],
    });
  }

  async findById(id: number): Promise<EventExceptionEntity | null> {
    return this.eventExceptionRepository.findOne({
      where: { id }
    });
  }

  async saveEventException(
    event: EventEntity,
    dto: CreateEventExceptionRequestDTO
  ): Promise<EventExceptionEntity> {
    const exception = this.eventExceptionRepository.create({
      event,
      exceptionDate: dto.exceptionDate,
      type: dto.type,
      modifiedEventData: dto.modifiedEventData,
    });

    return this.eventExceptionRepository.save(exception);
  }

  async updateEventException(
    exception: EventExceptionEntity,
  ): Promise<EventExceptionEntity> {
    return this.eventExceptionRepository.save(exception);
  }

  async deleteById(id: number): Promise<void> {
    await this.eventExceptionRepository.delete(id);
  }


}