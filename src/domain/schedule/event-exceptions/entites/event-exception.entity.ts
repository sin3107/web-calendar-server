import { Column, Entity, ManyToOne } from 'typeorm';
import { CommonEntity } from 'common/entities/common.entity';
import { EventEntity } from 'domain/schedule/events/entities/event.entity';

@Entity({
  name: "event_exceptions"
})
export class EventExceptionEntity extends CommonEntity {
  @ManyToOne(() => EventEntity, (event) => event.exceptions, { onDelete: 'CASCADE' })
  event: Event;

  @Column({ type: 'timestamptz' })
  originalDate: Date; // 반복 이벤트 중 예외 처리 대상 날짜

  @Column({ type: 'enum', enum: ['skip', 'modify'] })
  type: 'skip' | 'modify';

  @Column('jsonb', { nullable: true })
  modifiedEventData?: Record<string, any>; // 수정된 단일 이벤트 정보
}