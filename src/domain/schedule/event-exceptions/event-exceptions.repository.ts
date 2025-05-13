import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventExceptionEntity } from './entites/event-exception.entity';

@Injectable()
export class EventExceptionsRepository {
  constructor(
    @InjectRepository(EventExceptionEntity)
    private readonly eventExceptionRepository: Repository<EventExceptionEntity>,

  ) { }

  async findById(id: number): Promise<EventExceptionEntity | null> {
    return this.eventExceptionRepository.findOne({
      where: { id }
    });
  }

  async saveEventException(exception: EventExceptionEntity): Promise<EventExceptionEntity> {
    return this.eventExceptionRepository.save(exception);
  }

  async deleteById(id: number): Promise<void> {
  await this.eventExceptionRepository.delete(id);
}


}