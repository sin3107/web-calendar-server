import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsIn, IsOptional, IsObject } from 'class-validator';

export class CreateEventExceptionRequestDTO {
  @ApiProperty({ description: '예외 처리할 날짜', example: '2025-06-01T00:00:00Z' })
  @IsDateString()
  exceptionDate: Date;

  @ApiProperty({ description: '예외 타입', example: 'skip', enum: ['skip', 'modify'] })
  @IsIn(['skip', 'modify'])
  type: 'skip' | 'modify';

  @ApiProperty({
    description: '수정된 이벤트 정보',
    required: false,
    example: {
      title: '수정된 제목',
      startTime: '2025-06-01T10:00:00Z',
      endTime: '2025-06-01T11:00:00Z',
    },
  })
  @IsOptional()
  @IsObject()
  modifiedEventData?: {
    title?: string;
    startTime?: Date;
    endTime?: Date;
    location?: string;
    isAllDay?: boolean;
  };
}
