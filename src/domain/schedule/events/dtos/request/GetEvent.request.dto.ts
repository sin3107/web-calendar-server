import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class GetEventRequestDTO {
  @ApiProperty({ description: '시작 날짜', example: '2025-05-01T00:00:00.000Z' })
  @IsDateString()
  startDate: Date;

  @ApiProperty({ description: '종료 날짜', example: '2025-05-31T23:59:59.000Z' })
  @IsDateString()
  endDate: Date;
}
