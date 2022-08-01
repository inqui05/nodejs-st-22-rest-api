import { SequelizeModuleOptions } from "@nestjs/sequelize";
import { User } from "./user/models/user.model";

export const SEQUELIZE_OPTIONS: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  models: [User],
  autoLoadModels: true,
  synchronize: true,
};

export const ENV_PATH = '.env';
