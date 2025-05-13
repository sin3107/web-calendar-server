import { CommonEntity } from "common/entities/common.entity";
import { EventExceptionEntity } from "domain/schedule/event-exceptions/entites/event-exception.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { EventEntity } from "./event.entity";

@Entity({
  name: "event_repeat_rules"
})
export class EventRepeatRuleEntity extends CommonEntity {
  @OneToOne(() => EventEntity, (event) => event.repeatRule)
  @JoinColumn()
  event: EventEntity;

  @Column({ type: 'varchar', length: 255 })
  repeatType: string;  // 매일, 매주, 매월 등

  @Column({ type: 'int', nullable: true })
  repeatInterval: number;  // 반복 간격 (예: 매 2일, 매 3주 등)

  @Column({ type: 'date', nullable: true })
  repeatEndDate: Date;  // 반복 종료일

  @Column({ type: 'boolean', default: false })
  isForever: boolean;  // 무한 반복 여부

  @Column({ type: 'jsonb', nullable: true })
  repeatDaysOfWeek: string[];  // 특정 요일에 반복하는 경우 (예: [1, 3, 5] = 월, 수, 금)

  @Column({ type: 'jsonb', nullable: true })
  exceptions: EventExceptionEntity[];  // 특정 예외일 (예: 특정 날짜에 반복하지 않음)
}