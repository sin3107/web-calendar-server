import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateUserRefreshTokenRequestDto {

  @IsString()
  @IsNotEmpty()
  refreshToken: string;

  @IsDate()
  @IsNotEmpty()
  refreshExp: Date;
}