import { ApiProperty } from '@nestjs/swagger';

export class CreateCalendarResponseDTO {
  @ApiProperty({ description: '생성된 캘린더의 고유 ID', example: 123 })
  id: number;

  @ApiProperty({ description: '캘린더 이름', example: '내 일정' })
  name: string;

  @ApiProperty({
    description: '캘린더 색상 ',
    example: '#FF5733',
    required: false,
  })
  color?: string;

  @ApiProperty({ description: '비공개 캘린더 여부', example: false })
  isPrivate: boolean;

  @ApiProperty({ description: '기본 캘린더 여부', example: true })
  isDefault: boolean;
}
