import { ApiProperty } from '@nestjs/swagger';
import { ExceptionType } from 'domain/schedule/event-exceptions/entites/event-exception.entity';

export class EventExceptionSummary {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '2025-05-10T10:00:00.000Z' })
  exceptionDate: Date;

  @ApiProperty({ example: 'skip' })
  type: ExceptionType;

  @ApiProperty({
    description: '수정된 필드 정보 (type이 modify인 경우)',
    example: {
      title: '변경된 제목',
      startTime: '2025-05-10T11:00:00.000Z',
    },
    nullable: true,
  })
  modifiedEventData?: Record<string, any>;
}

export class SelectEventExceptionsResponseDTO {
  @ApiProperty({ type: [EventExceptionSummary] })
  exceptions: EventExceptionSummary[];

  @ApiProperty({ example: 2 })
  totalCount: number;
}
