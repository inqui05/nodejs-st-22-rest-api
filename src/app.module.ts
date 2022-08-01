import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ENV_PATH, SEQUELIZE_OPTIONS } from './vars.variable';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ENV_PATH }),
    SequelizeModule.forRoot(SEQUELIZE_OPTIONS),
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
