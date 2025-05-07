import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString, IsBoolean } from 'class-validator';

export class UpdateEventRequestDTO {
    @ApiProperty({ description: '일정 제목', example: '회의 일정' })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiProperty({ description: '일정 시작 시간', example: '2025-05-02T10:00:00.000Z' })
    @IsOptional()
    @IsDateString()
    startTime?: Date;

    @ApiProperty({ description: '일정 종료 시간', example: '2025-05-02T11:00:00.000Z' })
    @IsOptional()
    @IsDateString()
    endTime?: Date;

    @ApiProperty({ description: '일정 장소', example: '회의실 1' })
    @IsOptional()
    @IsString()
    location?: string;

    @ApiProperty({ description: '하루 종일 일정 여부', example: true })
    @IsOptional()
    @IsBoolean()
    isAllDay?: boolean;
}
