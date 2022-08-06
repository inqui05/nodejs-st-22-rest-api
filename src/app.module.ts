import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { User } from './user/models/user.model';
import { UserModule } from './user/user.module';

const sequelizeOption: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  models: [User],
  autoLoadModels: true,
  synchronize: true,
  define: { timestamps: false },
};

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    SequelizeModule.forRoot(sequelizeOption),
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
