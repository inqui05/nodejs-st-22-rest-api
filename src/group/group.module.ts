import { Module } from '@nestjs/common';
import { GroupService } from './services/group.service';
import { GroupController } from './controllers/group.controller';
import { GroupRepository } from './repository/group-repository.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Group } from './models/group.model';

@Module({
  imports: [SequelizeModule.forFeature([Group])],
  controllers: [GroupController],
  providers: [GroupService, GroupRepository],
})
export class GroupModule {}
