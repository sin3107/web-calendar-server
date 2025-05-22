import { Column, Entity, ManyToOne } from 'typeorm';
import { CommonEntity } from 'common/entities/common.entity';
import { CalendarEntity } from './calendar.entity';
import { UserEntity } from 'domain/users/entities/user.entity';

@Entity({ name: 'calendar_members' }) // ✅ 오탈자 수정
export class CalendarMemberEntity extends CommonEntity {
  @ManyToOne(() => CalendarEntity, (calendar) => calendar.members, {
    onDelete: 'CASCADE',
  })
  calendar: CalendarEntity;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  user: UserEntity;

  @Column({ default: 'owner' }) // owner, editor, viewer
  role: 'owner' | 'editor' | 'viewer';
}
