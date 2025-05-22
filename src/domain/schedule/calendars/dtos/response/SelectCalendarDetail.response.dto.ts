import { ApiProperty } from '@nestjs/swagger';

export class CalendarDetailResponseDTO {
  @ApiProperty({ description: '캘린더 ID', example: 1 })
  id: number;

  @ApiProperty({ description: '캘린더 이름', example: '팀 일정' })
  name: string;

  @ApiProperty({ description: '캘린더 색상 (HEX)', example: '#00FFAA' })
  color?: string;

  @ApiProperty({ description: '비공개 여부', example: true })
  isPrivate: boolean;

  @ApiProperty({ description: '기본 캘린더 여부', example: false })
  isDefault: boolean;

  @ApiProperty({ description: '현재 사용자의 권한', example: 'editor' })
  role: 'owner' | 'editor' | 'viewer';
}
