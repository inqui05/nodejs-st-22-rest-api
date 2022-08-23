import { Module } from '@nestjs/common';
import { GroupService } from './services/group.service';
import { GroupController } from './controllers/group.controller';
import { GroupRepository } from './repository/group-repository.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Group } from './models/group.model';
import { User } from 'src/user/models/user.model';
import { UserGroup } from 'src/group/models/user-group.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [SequelizeModule.forFeature([Group, User, UserGroup]), AuthModule],
  controllers: [GroupController],
  providers: [GroupService, GroupRepository],
})
export class GroupModule {}
