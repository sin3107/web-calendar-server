import { ApiProperty } from '@nestjs/swagger';

class EventSummary {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '팀 회의' })
  title: string;

  @ApiProperty({ example: '2025-05-15T09:00:00Z' })
  startTime: Date;

  @ApiProperty({ example: '2025-05-15T10:00:00Z' })
  endTime: Date;

  @ApiProperty({ example: '서울 회의실 A', nullable: true })
  location?: string;

  @ApiProperty({ example: false })
  isAllDay: boolean;

  @ApiProperty({ example: true, description: '반복 일정 여부' })
  isRepeat: boolean;
}

export class SelectEventListResponseDTO {
  @ApiProperty({
    description: '조회된 일정 목록',
    type: [EventSummary],
  })
  events: EventSummary[];

  @ApiProperty({
    description: '총 조회 수',
    example: 3,
  })
  totalCount: number;
}
