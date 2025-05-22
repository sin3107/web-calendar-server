import { Column, Entity, OneToMany } from 'typeorm';
import { CommonEntity } from 'common/entities/common.entity';
import { CalendarMemberEntity } from './calendar-member.entity';

@Entity({ name: 'calendars' })
export class CalendarEntity extends CommonEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  color?: string;

  @Column({ default: false })
  isPrivate: boolean;

  @Column({ default: false })
  isDefault: boolean;

  @OneToMany(() => CalendarMemberEntity, (member) => member.calendar, {
    cascade: true,
  })
  members: CalendarMemberEntity[];
}
