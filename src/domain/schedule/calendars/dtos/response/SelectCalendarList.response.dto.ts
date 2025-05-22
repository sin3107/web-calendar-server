import { ApiProperty } from '@nestjs/swagger';

class CalendarSummary {
  @ApiProperty({ description: '캘린더 ID', example: 1 })
  id: number;

  @ApiProperty({ description: '캘린더 이름', example: '내 일정' })
  name: string;

  @ApiProperty({ description: '캘린더 색상 (HEX)', example: '#4287f5' })
  color?: string;

  @ApiProperty({ description: '비공개 여부', example: false })
  isPrivate: boolean;

  @ApiProperty({ description: '기본 캘린더 여부', example: true })
  isDefault: boolean;

  @ApiProperty({ description: '사용자의 권한 (owner, editor, viewer)', example: 'owner' })
  role: 'owner' | 'editor' | 'viewer';
}

export class SelectCalendarListResponseDTO {
  @ApiProperty({ description: '총 개수', example: 2 })
  totalCount: number;

  @ApiProperty({ type: [CalendarSummary], description: '캘린더 목록' })
  calendars: CalendarSummary[];
}
