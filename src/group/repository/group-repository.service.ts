import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';
import { IGroup } from '../interfaces/group.interface';
import { Group } from '../models/group.model';

@Injectable()
export class GroupRepository {

  constructor(@InjectModel(Group) private groupModel: typeof Group) {}

  async create(createGroupDto: CreateGroupDto): Promise<IGroup | null> {
    const isLoginUnique = await this.checkIsNameUnique(createGroupDto.name);
    return isLoginUnique ? this.groupModel.create(createGroupDto) : null;
  }

  async findAll(): Promise<IGroup[]> {
    return this.groupModel.findAll();
  }

  async findOne(id: string): Promise<IGroup | null> {
    return this.groupModel.findOne({ where: { id }});
  }

  async update(id: string, updateGroupDto: UpdateGroupDto): Promise<IGroup | null> {
    await this.groupModel.update(updateGroupDto, { where: { id } });
    return this.groupModel.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    this.groupModel.destroy({ where: { id } });
  }

  async checkIsNameUnique(name: string, id?: string): Promise<boolean> {
    const users = await this.groupModel.findAll({ where: { name }});

    return !users.length || (users.length === 1 && users[0].id === id) ?
      true :
      false;
  }
}
