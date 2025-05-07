import { Column, Entity, OneToMany } from 'typeorm';
import { CommonEntity } from 'common/entities/common.entity';
import { CalendarMemberEntity } from './calendar-member.entity';

@Entity({
  name: "calendars"
})
export class CalendarEntity extends CommonEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  color?: string;

  @Column({ default: false })
  isPrivate: boolean;

  @OneToMany(() => CalendarMemberEntity, (member) => member.calendar)
  members: CalendarMemberEntity[];
}