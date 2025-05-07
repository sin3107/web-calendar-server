import { ApiProperty } from '@nestjs/swagger';

export class CreateEventResponseDTO {
  @ApiProperty({ description: '생성 일정의 ID', example: 123 })
  eventId: number;

  @ApiProperty({ description: '일정 제목', example: '팀 모임' })
  title: string;

  @ApiProperty({ description: '일정 시작 시간', example: '2025-05-15T09:00:00Z' })
  startTime: Date;

  @ApiProperty({ description: '일정 종료 시간', example: '2025-05-15T10:00:00Z' })
  endTime: Date;

  @ApiProperty({ description: '일정 장소', example: '1팀', required: false })
  location?: string;

  @ApiProperty({ description: '하루 종일 일정 여부', example: false })
  isAllDay: boolean;
}
