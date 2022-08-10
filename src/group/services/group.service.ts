import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';
import { IGroup } from '../interfaces/group.interface';
import { GroupRepository } from '../repository/group-repository.service';

@Injectable()
export class GroupService {
  constructor(private readonly groupRepository: GroupRepository) {}

  async create(createGroupDto: CreateGroupDto): Promise<IGroup | null> {
    return this.groupRepository.create(createGroupDto);
  }

  async findAll(): Promise<IGroup[]> {
    return this.groupRepository.findAll();
  }

  async findOne(id: string): Promise<IGroup | null> {
    return this.groupRepository.findOne(id);
  }

  async update(id: string, updateGroupDto: UpdateGroupDto): Promise<IGroup | null> {
    return this.groupRepository.update(id, updateGroupDto);
  }

  async remove(id: string): Promise<void> {
    this.groupRepository.remove(id);
  }

  async addUsersToGroup(id: string, usersIds: string[]): Promise<void> {
    this.groupRepository.addUsersToGroup(id, usersIds);
  }
}
