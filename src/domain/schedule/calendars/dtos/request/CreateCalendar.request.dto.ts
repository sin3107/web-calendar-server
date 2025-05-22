import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateCalendarRequestDTO {
  @ApiProperty({ example: '개인 일정', description: '캘린더 명' })
  @IsString()
  name: string;

  @ApiProperty({ example: '#000000', description: '색상', required: false })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiProperty({ example: false, description: '비공개 여부', required: false })
  @IsOptional()
  @IsBoolean()
  isPrivate?: boolean;

  @ApiProperty({ example: true, description: '기본 캘린더 여부', required: false })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}
