import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsDateString, IsOptional, IsBoolean, IsNumber, ValidateNested } from 'class-validator';

class RepeatRuleDTO {
  @ApiProperty({ example: 'daily' })
  @IsString()
  repeatType: string;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  repeatInterval?: number;

  @ApiProperty({ example: '2025-12-31T00:00:00Z', required: false })
  @IsOptional()
  @IsDateString()
  repeatEndDate?: Date;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isForever?: boolean;

  @ApiProperty({ example: ['1', '3', '5'], required: false })
  @IsOptional()
  repeatDaysOfWeek?: string[];
}

export class CreateEventRequestDTO {

  @ApiProperty({ description: '캘린더 ID', example: 1 })
  @IsNumber()
  calendarId: number;

  @ApiProperty({ description: '이벤트 제목', example: '회의 일정' })
  @IsString()
  title: string;

  @ApiProperty({ description: '이벤트 시작 시간', example: '2025-05-02T10:00:00.000Z' })
  @IsDateString()
  startTime: Date;

  @ApiProperty({ description: '이벤트 종료 시간', example: '2025-05-02T11:00:00.000Z' })
  @IsDateString()
  endTime: Date;

  @ApiProperty({ description: '이벤트 장소', example: '회의실 1' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ description: '종일 이벤트 여부', example: true })
  @IsBoolean()
  isAllDay: boolean;

  @ApiProperty({ description: '반복 규칙', required: false, type: () => RepeatRuleDTO })
  @IsOptional()
  @ValidateNested()
  @Type(() => RepeatRuleDTO)
  repeatRule?: RepeatRuleDTO;
}
