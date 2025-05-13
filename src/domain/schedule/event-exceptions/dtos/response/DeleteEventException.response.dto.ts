import { ApiProperty } from '@nestjs/swagger';

export class DeleteEventExceptionResponseDTO {
  @ApiProperty({ example: 123 })
  exceptionId: number;

  @ApiProperty({ description: '처리된 상태', example: 'deleted' })
  status: 'deleted';
}
