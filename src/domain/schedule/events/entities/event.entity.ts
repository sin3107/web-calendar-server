import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CommonEntity } from 'common/entities/common.entity';
import { CalendarEntity } from 'domain/schedule/calendars/entities/calendar.entity';
import { EventExceptionEntity } from 'domain/schedule/event-exceptions/entites/event-exception.entity';
import { EventRepeatRuleEntity } from './event-repeat-rule.entity';

@Entity({
  name: "events"
})
export class EventEntity extends CommonEntity {
  @ManyToOne(() => CalendarEntity, { onDelete: 'CASCADE' })
  calendar: CalendarEntity;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'timestamptz' })
  startTime: Date;

  @Column({ type: 'timestamptz' })
  endTime: Date;

  @Column({ nullable: true })
  location?: string;

  @Column({ default: false })
  isAllDay: boolean;

  // 반복 규칙과의 관계 (1:N)
  @OneToMany(() => EventRepeatRuleEntity, (repeatRule) => repeatRule.event, {
    cascade: true,
  })
  repeatRules: EventRepeatRuleEntity[];

  @OneToMany(() => EventExceptionEntity, (exception) => exception.event)
  exceptions: EventExceptionEntity[];
}
