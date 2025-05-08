import { Column, Entity, ManyToOne } from 'typeorm';
import { CommonEntity } from 'common/entities/common.entity';
import { EventEntity } from 'domain/schedule/events/entities/event.entity';

export type ExceptionType = 'skip' | 'modify';

@Entity({ name: 'event_exceptions' })
export class EventExceptionEntity extends CommonEntity {
  @ManyToOne(() => EventEntity, (event) => event.exceptions, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  event: EventEntity;

  @Column({ type: 'timestamptz' })
  exceptionDate: Date; // 예외 처리 대상 날짜

  @Column({ type: 'enum', enum: ['skip', 'modify'] })
  type: ExceptionType;

  @Column('jsonb', { nullable: true })
  modifiedEventData?: Record<string, any>; // 수정된 필드들 (title, startTime 등)
}
