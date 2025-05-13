import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { EventEntity } from './entities/event.entity';
import { EventRepeatRuleEntity } from './entities/event-repeat-rule.entity';
import { generateRecurringEvents } from 'common/utils/repeatExpansion';

@Injectable()
export class EventsRepository {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,

    @InjectRepository(EventRepeatRuleEntity)
    private readonly repeatRuleRepository: Repository<EventRepeatRuleEntity>,

    private readonly dataSource: DataSource,
  ) {}

  async findEventsInRange(calendarId: number, startDate: Date, endDate: Date): Promise<EventEntity[]> {
    const baseEvents = await this.eventRepository.createQueryBuilder('event')
      .leftJoinAndSelect('event.repeatRule', 'repeatRule')
      .leftJoinAndSelect('event.exceptions', 'exceptions')
      .where('event.calendar = :calendarId', { calendarId })
      .andWhere('(event.startTime <= :endDate AND event.endTime >= :startDate)', {
        startDate,
        endDate,
      })
      .andWhere('event.deletedAt IS NULL')
      .getMany();

      const expandedEvents: EventEntity[] = [];

      for (const event of baseEvents) {
        if (event.repeatRule) {
          expandedEvents.push(...generateRecurringEvents(event, event.repeatRule, startDate, endDate));
        } else {
          expandedEvents.push(event);
        }
      }
  
      return expandedEvents;
  }

  async findById(id: number): Promise<EventEntity | null> {
    return this.eventRepository.findOne({
      where: { id },
      relations: ['repeatRule', 'exceptions', 'calendar'],
    });
  }

  async saveEvent(event: EventEntity): Promise<EventEntity> {
    return this.eventRepository.save(event);
  }

  async saveRepeatRule(rule: EventRepeatRuleEntity): Promise<EventRepeatRuleEntity> {
    return this.repeatRuleRepository.save(rule);
  }

  async saveEventWithRepeatRule(event: EventEntity, rule: EventRepeatRuleEntity): Promise<EventEntity> {
    return await this.dataSource.transaction(async manager => {
      const savedEvent = await manager.save(EventEntity, event);
      rule.event = savedEvent;
      await manager.save(EventRepeatRuleEntity, rule);
      return savedEvent;
    });
  }

  async updateEvent(id: number, updatedEvent: Partial<EventEntity>): Promise<EventEntity> {
    await this.eventRepository.update(id, updatedEvent);
    return this.eventRepository.findOneBy({ id });
  }

  async deleteEvent(id: number): Promise<void> {
    await this.eventRepository.delete(id);
  }
}