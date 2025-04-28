import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class UserRegisterResponseDTO {
  @ApiProperty({
    description: '회원가입 성공 메시지',
    default: 'success',
    required: true,
  })
  @Exclude()
  message: string;
}