require('dotenv').config();
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { User } from './user/models/user.model';
import { Group } from './group/models/group.model';
import { UserModule } from './user/user.module';
import { GroupModule } from './group/group.module';
import { UserGroup } from './group/models/user-group.model';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { ErrorsInterceptor } from './common/interceptors/error.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';

const sequelizeOption: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  models: [User, Group, UserGroup],
  autoLoadModels: true,
  synchronize: true,
  define: { timestamps: false },
};

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    SequelizeModule.forRoot(sequelizeOption),
    UserModule,
    GroupModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
