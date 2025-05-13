import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsNumber, IsDateString } from 'class-validator';

export class UpdateRepeatRuleRequestDTO {
  @ApiProperty({ description: '반복 타입 (daily, weekly, monthly)', example: 'weekly' })
  @IsOptional()
  @IsString()
  repeatType?: string;

  @ApiProperty({ description: '반복 간격', example: 1 })
  @IsOptional()
  @IsNumber()
  repeatInterval?: number;

  @ApiProperty({ description: '반복 종료일', required: false, example: '2025-12-31T00:00:00Z' })
  @IsOptional()
  @IsDateString()
  repeatEndDate?: Date;

  @ApiProperty({ description: '무한 반복 여부', example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isForever?: boolean;

  @ApiProperty({ description: '반복 요일 목록', example: ['1', '3', '5'], required: false })
  @IsOptional()
  repeatDaysOfWeek?: string[];
}
