import { ApiProperty } from '@nestjs/swagger';

export class UpdateRepeatRuleResponseDTO {
  @ApiProperty({ description: '반복 타입', example: 'weekly' })
  repeatType: string;

  @ApiProperty({ description: '반복 간격', example: 1 })
  repeatInterval: number;

  @ApiProperty({ description: '반복 종료일', example: '2025-12-31T00:00:00Z'})
  repeatEndDate?: Date;

  @ApiProperty({ description: '무한 반복 여부', example: true })
  isForever: boolean;

  @ApiProperty({ description: '반복 요일 목록', example: ['1', '3', '5'] })
  repeatDaysOfWeek?: string[];
}
