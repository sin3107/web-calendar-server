import { ApiProperty } from '@nestjs/swagger';

class CalendarMember {
  @ApiProperty({ description: '사용자 ID', example: 10 })
  userId: number;

  @ApiProperty({ description: '사용자 이름', example: '홍길동' })
  username: string;

  @ApiProperty({ description: '캘린더 내 역할', example: 'viewer' })
  role: 'owner' | 'editor' | 'viewer';
}

export class CalendarMembersResponseDTO {
  @ApiProperty({ description: '총 멤버 수', example: 3 })
  totalCount: number;

  @ApiProperty({ type: [CalendarMember], description: '멤버 목록' })
  members: CalendarMember[];
}
