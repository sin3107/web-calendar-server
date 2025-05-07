import { ApiProperty } from '@nestjs/swagger';

export class EmailCheckResponseDTO {
  @ApiProperty({ 
    example: true, 
    description: '이메일 사용 가능 여부' 
  })
  result: boolean;
}