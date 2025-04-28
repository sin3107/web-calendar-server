import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserLoginRequestDTO } from 'domain/auth/dtos/request/UserLogin.request.dto';
import { Provider, User } from 'domain/users/entities/user.entity';
import { UsersService } from 'domain/users/users.service';
import { Errors } from 'common/errors/Errors';
import { ConfigService } from '@nestjs/config';
import { SocialRequest } from 'domain/auth/passport/payloads/social.request';
import { RefreshRequestDTO } from 'domain/auth/dtos/request/Refresh.request.dto';
import { PatchCertificationDTO } from 'domain/auth/dtos/request/PatchCertification.dto';
import { UsersRepository } from 'domain/users/users.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: UsersRepository,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly dataSource: DataSource
  ) { }

  async jwtLogin(email: UserLoginRequestDTO['email'], password: UserLoginRequestDTO['password']) {
    try {

      const user = await this.usersRepository.selectUserByEmail(email, Provider.Local);

      if (!user) {
        throw new HttpException(Errors.User['EMAIL_NOT_FOUND'], HttpStatus.NOT_FOUND);
      }

      const passwordValidated: boolean = await bcrypt.compare(password, user.password);

      if (!passwordValidated) {
        throw new HttpException(Errors.User['WRONG_PASSWORD'], HttpStatus.NOT_FOUND);
      }

      const accessToken = await this.createAccessToken(user);
      const refreshToken = await this.createRefreshToken(user.id);
      await this.saveRefreshtoken(user.id, refreshToken);

      const userInfo = await this.usersService.findUserById(user.id);

      return { accessToken, refreshToken, userInfo };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.response, 500);
    }
  }


  async snsLoginOrResist(req: SocialRequest) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    const {
      user: { email, provider },
    } = req;

    try {
      let user = await this.usersRepository.selectUserByEmail(email, provider)

      if (!user) {
        user = this.usersRepository.buildUserEntity({ email, provider });
        await queryRunner.manager.save(user);
      }

      // 토큰 생성
      const accessToken = await this.createAccessToken(user);
      const refreshToken = await this.createRefreshToken(user.id);
      await this.saveRefreshtoken(user.id, refreshToken, queryRunner);

      // 별도 프로필 정보 추가시 반환을 위해 다시 조회
      const userInfo = await this.usersService.findUserById(user.id);

      await queryRunner.commitTransaction();
      return { accessToken, refreshToken, userInfo };
    } catch (err) {
      console.log(err);
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        Errors.Auth['SOCIAL_SIGNUP_FAIL'],
        Errors.Auth['SOCIAL_SIGNUP_FAIL'].code
      );
    } finally {
      await queryRunner.release();
    }
  }

  createTokens(data: { email: string; id: number }): { accessToken: string; refreshToken: string } {
    const accessToken = this.jwtService.sign(data, {
      secret: this.configService.get<string>('SECRET_KEY'),
    });

    const refreshToken = this.jwtService.sign(data, {
      secret: this.configService.get<string>('SECRET_KEY'),
    });

    return { accessToken, refreshToken };
  }

  async createAccessToken(user: User): Promise<string> {
    const payload = {
      id: user.id,
      email: user.email,
    };
    return await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get<string>('ACCESS_EXPIRE_TIME'),
    });
  }

  async createRefreshToken(userId: number): Promise<string> {
    return this.jwtService.signAsync(
      { userId },
      {
        secret: this.configService.get<string>('REFRESH_SECRET_KEY'),
        expiresIn: this.configService.get<string>('REFRESH_EXPIRE_TIME'),
      }
    );
  }


  async getUserIfRefreshTokenMatches(userId: number, refreshToken) {
    const user = await this.usersService.findUserById(userId);
    if (!user.refreshToken) {
      throw new HttpException(
        Errors.User['REFRESH_TOKEN_NOT_FOUND'],
        Errors.User['REFRESH_TOKEN_NOT_FOUND'].code
      );
    }

    const isRefreshTokenMatching = await bcrypt.compare(refreshToken, user.refreshToken);

    if (!isRefreshTokenMatching) {
      throw new HttpException(
        Errors.User['REFRESH_TOKEN_NOT_MATCH'],
        Errors.User['REFRESH_TOKEN_NOT_MATCH'].code
      );
    }

    return user;
  }


  async refresh(dto: RefreshRequestDTO) {
    const { refreshToken } = dto;

    const decodeRefreshToken = this.jwtService.verify(refreshToken, {
      secret: this.configService.get<string>('REFRESH_SECRET_KEY'),
    });

    const userId = decodeRefreshToken.userId;
    const user = await this.getUserIfRefreshTokenMatches(userId, refreshToken);

    const accessToken = await this.createAccessToken(user);
    const newRefreshToken = await this.createRefreshToken(user.id);

    await this.saveRefreshtoken(user.id, newRefreshToken);

    return { accessToken, refreshToken: newRefreshToken };
  }


  async recertification(userId: number, dto: PatchCertificationDTO) {

    await this.usersService.findUserById(userId)

    try {
      await this.usersRepository.updateUser(userId, { ...dto });
    } catch (err) {
      console.log(err);
      throw new HttpException('recertification failed', 500);
    }
  }


async saveRefreshtoken(
  userId: number,
  refreshToken: string,
  queryRunner?: QueryRunner,
) {
  const currentRefreshToken = await bcrypt.hash(refreshToken, 10);
  const currentDate = new Date();
  const currentRefreshTokenExp = new Date(
    currentDate.getTime() + parseInt(this.configService.get<string>('REFRESH_EXPIRE_TIME'))
  );

  if (queryRunner) {
    await queryRunner.manager.update(User, userId, {
      refreshToken: currentRefreshToken,
      refreshExp: currentRefreshTokenExp,
    });
  } else {
    await this.usersRepository.updateUserRefresh(userId, {
      refreshToken: currentRefreshToken,
      refreshExp: currentRefreshTokenExp,
    });
  }
}

}