import { ApiProperty } from '@nestjs/swagger';

export class UpdateEventExceptionResponseDTO {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '2025-05-20T10:00:00Z' })
  exceptionDate: Date;

  @ApiProperty({ example: 'modify' })
  type: 'skip' | 'modify';
}
