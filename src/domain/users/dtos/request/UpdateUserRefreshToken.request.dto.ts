import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateUserRefreshTokenRequestDTO {

  @IsString()
  @IsNotEmpty()
  refreshToken: string;

  @IsDate()
  @IsNotEmpty()
  refreshExp: Date;
}