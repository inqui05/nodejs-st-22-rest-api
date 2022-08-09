import { Module } from '@nestjs/common';
import { GroupService } from './services/group.service';
import { GroupController } from './controllers/group.controller';
import { GroupRepository } from './repository/group-repository.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Group } from './models/group.model';
import { User } from 'src/user/models/user.model';
import { UserGroup } from 'src/user-group/models/user-group.model';

@Module({
  imports: [SequelizeModule.forFeature([Group, User, UserGroup])],
  controllers: [GroupController],
  providers: [GroupService, GroupRepository],
})
export class GroupModule {}
