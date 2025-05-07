import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { EventEntity } from './entities/event.entity';

@Injectable()
export class EventsRepository {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepo: Repository<EventEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async findEventsInRange(calendarId: number, startDate: Date, endDate: Date): Promise<EventEntity[]> {
    return this.eventRepo.createQueryBuilder('event')
      .leftJoinAndSelect('event.repeatRules', 'repeatRules')
      .leftJoinAndSelect('event.exceptions', 'exceptions')
      .where('event.calendar = :calendarId', { calendarId })
      .andWhere('(event.startTime <= :endDate AND event.endTime >= :startDate)', {
        startDate,
        endDate,
      })
      .andWhere('event.deletedAt IS NULL')
      .getMany();
  }

  async findById(id: number): Promise<EventEntity | null> {
    return this.eventRepo.findOne({
      where: { id },
      relations: ['repeatRules', 'exceptions', 'calendar'],
    });
  }

  async saveEvent(event: EventEntity): Promise<EventEntity> {
    return this.eventRepo.save(event);
  }

  async updateEvent(id: number, updatedEvent: Partial<EventEntity>): Promise<EventEntity> {
    await this.eventRepo.update(id, updatedEvent);
    return this.eventRepo.findOneBy({ id });
  }

  async deleteEvent(id: number): Promise<void> {
    await this.eventRepo.delete(id);
  }
}