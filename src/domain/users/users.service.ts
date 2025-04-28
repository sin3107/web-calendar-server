import {
  HttpException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';


import { UsersRepository } from './users.repository';
import { Provider, User } from './entities/user.entity';
import { Errors } from 'common/errors/Errors';
import { UserRegisterRequestDTO } from 'domain/auth/dtos/request/UserRegister.request.dto';
import { UserRegisterResponseDTO } from 'domain/auth/dtos/response/UserRegister.response.dto';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly usersRepository: UsersRepository,
    // private readonly dataSource: DataSource
    private readonly configService: ConfigService
  ) { }

  async registerUser(requestDto: UserRegisterRequestDTO): Promise<UserRegisterResponseDTO> {
    const { email, password } = requestDto;

    const existing = await this.usersRepository.selectUserByEmail(email, Provider.Local);
    if (existing) {
      throw new HttpException(Errors.User['DUPLICATED_EMAIL'], Errors.User['DUPLICATED_EMAIL'].code);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.usersRepository.buildUserEntity({
      ...requestDto,
      password: hashedPassword,
    });

    await this.usersRepository.persistUser(newUser);

    return { message: 'success' };

  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.selectUserByEmail(email, Provider.Local);
    if (!user) {
      throw new HttpException(Errors.User['USER_NOT_FOUND'], Errors.User['USER_NOT_FOUND'].code);
    }
    return user;
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.usersRepository.selectUserById(id);
    if (!user) {
      throw new HttpException(Errors.User['USER_NOT_FOUND'], Errors.User['USER_NOT_FOUND'].code);
    }
    return user;
  }

  async getCurrentRefreshToken(refreshToken: string) {
    return await bcrypt.hash(refreshToken, 10);
  }

  async getCurrentRefreshTokenExp(): Promise<Date> {
    const currentDate = new Date();
    return new Date(
      currentDate.getTime() + parseInt(this.configService.get<string>('REFRESH_EXPIRE_TIME'))
    );
  }


}