import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

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

  @ApiProperty({ description: '하루 종일 이벤트 여부', example: true })
  @IsBoolean()
  isAllDay: boolean;
}
