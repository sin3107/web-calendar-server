import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsDateString } from 'class-validator';

export class UpdateEventExceptionRequestDTO {
  @ApiProperty({ example: '2025-06-01T10:00:00Z', required: false })
  @IsOptional()
  @IsDateString()
  exceptionDate?: Date;

  @ApiProperty({ example: 'modify', enum: ['skip', 'modify'], required: false })
  @IsOptional()
  @IsEnum(['skip', 'modify'])
  type?: 'skip' | 'modify';

  @ApiProperty({
    required: false,
    example: {
      title: '수정된 제목',
      startTime: '2025-06-01T10:00:00Z',
      endTime: '2025-06-01T11:00:00Z',
    },
  })
  @IsOptional()
  modifiedEventData?: {
    title?: string;
    startTime?: Date;
    endTime?: Date;
    location?: string;
    isAllDay?: boolean;
  };
}
