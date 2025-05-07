import { BadRequestException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { EnumToArray } from 'common/utils/enumNumberToArray';
import { HttpErrorNameEnum } from './HttpErrorNameEnum';

export class HttpExceptionErrorResponseDto {

  @ApiProperty({
    description: '에러코드가 넘어옵니다. 널값일 수 있습니다!!!',
    nullable: true,
  })
  @Expose()
  statusCode: number;

  @ApiProperty({ example: 'BadRequestException' })
  error: string;

  @ApiProperty({
    description: '에러메시지',
  })
  @Expose()
  message: string;

  @ApiProperty({
    description: '에러코드가 넘어옵니다. 널값일 수 있습니다!!!',
    nullable: true,
  })
  @Expose()
  code?: string;



  constructor(statusCode: number, error: string, message: string, code?: string) {
    this.statusCode = statusCode;
    this.error = error;
    this.message = message;
    this.code = code;
  }

}