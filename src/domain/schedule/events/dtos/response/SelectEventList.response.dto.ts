import { ApiProperty } from '@nestjs/swagger';

class EventSummary {
  @ApiProperty({ example: 123, description: '일정 ID' })
  eventId: number;

  @ApiProperty({ example: '회의', description: '일정 제목' })
  title: string;

  @ApiProperty({ example: '2025-05-01T10:00:00Z', description: '시작 시간' })
  startTime: Date;

  @ApiProperty({ example: '2025-05-01T11:00:00Z', description: '종료 시간' })
  endTime: Date;
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
