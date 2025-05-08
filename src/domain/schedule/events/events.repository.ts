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
    private readonly eventRepo: Repository<EventEntity>,

    @InjectRepository(EventRepeatRuleEntity)
    private readonly repeatRuleRepo: Repository<EventRepeatRuleEntity>,

    private readonly dataSource: DataSource,
  ) {}

  async findEventsInRange(calendarId: number, startDate: Date, endDate: Date): Promise<EventEntity[]> {
    const baseEvents = await this.eventRepo.createQueryBuilder('event')
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
    return this.eventRepo.findOne({
      where: { id },
      relations: ['repeatRule', 'exceptions', 'calendar'],
    });
  }

  async saveEvent(event: EventEntity): Promise<EventEntity> {
    return this.eventRepo.save(event);
  }

  async saveRepeatRule(rule: EventRepeatRuleEntity): Promise<EventRepeatRuleEntity> {
    return this.repeatRuleRepo.save(rule);
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
    await this.eventRepo.update(id, updatedEvent);
    return this.eventRepo.findOneBy({ id });
  }

  async deleteEvent(id: number): Promise<void> {
    await this.eventRepo.delete(id);
  }
}