import { Entity, ManyToOne, Column } from 'typeorm';
import { CommonEntity } from 'common/entities/common.entity';
import { CalendarEntity } from './calendar.entity';

@Entity({
  name: "calendar_menbers"
})
export class CalendarMemberEntity extends CommonEntity {
  @ManyToOne(() => CalendarEntity, (calendar) => calendar.members, { onDelete: 'CASCADE' })
  calendar: CalendarEntity;

  @Column()
  userId: number;

  @Column({ default: 'owner' }) // 예: owner, editor, viewer
  role: string;
}