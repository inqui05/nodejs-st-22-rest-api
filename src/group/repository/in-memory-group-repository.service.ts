import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { IGroup } from '../interfaces/group.interface';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';
import { IUsersGroup } from '../interfaces/users-group.interface copy';

@Injectable()
export class InMemoryGroupRepository {
  private groups: IGroup[] = [];
  private UserGroups: IUsersGroup[] = [];

  async create(createGroupDto: CreateGroupDto): Promise<IGroup | null> {
    const isNameUnique = this.checkIsNameUnique(createGroupDto.name);
    let newGroup: IGroup | null = null;
    if (isNameUnique) {
      newGroup = { ...createGroupDto, id: uuidv4()};
      this.groups.push(newGroup);
    }

    return Promise.resolve(newGroup);
  }

  async findAll(): Promise<IGroup[]> {
    return Promise.resolve(this.groups);
  }

  async findOne(id: string): Promise<IGroup | undefined> {
    return Promise.resolve(this.groups.find((group: IGroup): boolean => group.id === id));
  }

  async update(id: string, updateGroupDto: UpdateGroupDto): Promise<IGroup | null> {
    const index = this.groups.findIndex((group) => group.id === id);
    let updatedGroup: IGroup | null = null;
    if (index >= 0) {
      updatedGroup = { ...updateGroupDto, id };
      this.groups[index] = updatedGroup;
    }

    return Promise.resolve(updatedGroup);
  }

  async remove(id: string): Promise<void> {
    const index = this.groups.findIndex((group) => group.id === id);
    if (index >= 0) {
      this.groups.splice(index, 1);
    }
  }

  async addUsersToGroup(id: string, usersIds: string[]): Promise<void> {
    usersIds.forEach((userId) => {
      this.UserGroups.push({ id: uuidv4(), user_id: userId, group_id: id })
    });
  }

  private checkIsNameUnique(name: string, id?: string): boolean {
    const groups = this.groups.filter((group: IGroup): boolean => group.name === name);

    return !groups.length || (groups.length === 1 && groups[0].id === id) ?
      true :
      false;
  }
}
