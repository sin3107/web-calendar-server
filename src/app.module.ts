import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as Joi from 'joi';
import { PostgresConfigModule } from 'config/database/postgres/config.module';
import { PostgresConfigService } from 'config/database/postgres/config.service';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';

import { AuthModule } from 'domain/auth/auth.module';
import { UsersModule } from 'domain/users/users.module';
import { ScheduleModule } from 'domain/schedule/schedule.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod').default('dev'),
        PORT: Joi.number().default(3000),
        SECRET_KEY: Joi.string().required(),
        REFRESH_SECRET_KEY: Joi.string().required(),
        ACCESS_EXPIRE_TIME: Joi.string().required(),
        REFRESH_EXPIRE_TIME: Joi.string().required(),
        ADMIN_USER: Joi.string().required(),
        ADMIN_PASSWORD: Joi.string().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_HOST: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        AWS_ACCESS_KEY: Joi.string().required(),
        AWS_SECRET_KEY: Joi.string().required(),
        REGION: Joi.string().required(),
        BUCKET_NAME: Joi.string().required(),
        APP_NAME: Joi.string().required(),
        NAVER_CLIENT_ID: Joi.string().required(),
        NAVER_CLIENT_SECRET: Joi.string().required(),
        NAVER_CALLBACK_URL: Joi.string().required(),
        KAKAO_CLIENT_ID: Joi.string().required(),
        KAKAO_CLIENT_SECRET: Joi.string().required(),
        KAKAO_CALLBACK_URL: Joi.string().required(),
        HTTP_TIMEOUT: Joi.number().required(),
        HTTP_MAX_REDIRECTS: Joi.number().required(),
        SOCKET_SERVER: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [PostgresConfigModule],
      inject: [PostgresConfigService],
      useClass: PostgresConfigService,
    }),
    
    UsersModule,
    AuthModule,
    ScheduleModule
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}