import {
    Injectable,
    Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Provider, User } from 'domain/users/entities/user.entity';
import { UpdateUserRefreshTokenRequestDTO } from './dtos/request/UpdateUserRefreshToken.request.dto';


@Injectable()
export class UsersRepository {
    private readonly logger = new Logger(UsersRepository.name);

    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) { }

    buildUserEntity(userData: Partial<User>): User {
        return this.usersRepository.create(userData);
    }

    async persistUser(user: User): Promise<User> {
        return await this.usersRepository.save(user);
    }

    async updateUserRefresh(id: number, requestDto: UpdateUserRefreshTokenRequestDTO) {
        const {refreshToken, refreshExp} = requestDto

        await this.usersRepository.update(id, {
            refreshToken,
            refreshExp,
        });
    }

    async updateUser(id: number, updateData: Partial<User>): Promise<void> {
        await this.usersRepository.update(id, updateData);
    }


    async selectUserByEmail(email: string, provider: Provider): Promise<User | null> {
        return this.usersRepository.findOne(
            {
                where: {
                    email,
                    provider: provider
                }
            }
        );
    }

    async selectUserById(id: number): Promise<User | null> {
        return this.usersRepository.findOne(
            {
                where: {
                    id
                }
            }
        );
    }


}