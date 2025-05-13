import { ApiProperty } from '@nestjs/swagger';

export class CreateEventExceptionResponseDTO {
  @ApiProperty({ example: 123, description: '예외 일정 ID' })
  id: number;

  @ApiProperty({ example: '2025-05-20T10:00:00Z' })
  exceptionDate: Date;

  @ApiProperty({ example: 'skip' })
  type: 'skip' | 'modify';
}
