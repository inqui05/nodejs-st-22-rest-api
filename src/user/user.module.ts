import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserRepository } from './repository/users-repository.service';
import { Group } from 'src/group/models/group.model';
import { UserGroup } from 'src/group/models/user-group.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [SequelizeModule.forFeature([User, Group, UserGroup]), AuthModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
