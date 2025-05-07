import { ApiProperty } from '@nestjs/swagger';

export class UpdateAndDeleteEventResponseDTO {
  @ApiProperty({ description: '일정 ID', example: 123 })
  eventId: number;

  @ApiProperty({ description: '처리된 상태', example: 'updated' })
  status: 'updated' | 'deleted';
}
