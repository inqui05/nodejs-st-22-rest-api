import { Injectable } from '@nestjs/common';
import { AutoSuggestUserInfoDto } from '../dto/autoSuggestUserInfo.dto';
import { User } from '../models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { NewUserDto } from '../dto/new-user.dto';
import { UserDto } from '../dto/user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserRepository {

  constructor(@InjectModel(User) private userModel: typeof User) {}

  async getAll(): Promise<User[]> {
    return this.userModel.findAll({ where: { isDeleted: false }});
  }

  async getOne(id: string): Promise<User | null> {
    return this.userModel.findOne({ where: { [Op.and]: [{ id }, { isDeleted: false }] } });
  }

  async getSome(params: AutoSuggestUserInfoDto): Promise<UserDto[]> {
    return this.userModel.findAll({
      where: { login: {[Op.iLike]: `%${params.loginSubstring}%` }},
      limit: params.limit
    });
  }

  async create(newUserInfo: NewUserDto): Promise<UserDto | null> {
    const isLoginUnique = await this.checkIsLoginUnique(newUserInfo.login);
    return isLoginUnique ? await this.userModel.create(newUserInfo) : null;
  }

  async remove(id: string): Promise<User | null> {
    await this.userModel.update({ isDeleted: true }, { where: { id } });
    return this.userModel.findOne({ where: { id } });
  }

  async update(id: string, newUserInfo: UpdateUserDto): Promise<UserDto | null> {
    await this.userModel.update(newUserInfo, { where: { id } });
    return this.userModel.findOne({ where: { id } });
  }

  async checkIsLoginUnique(login: string, id?: string): Promise<boolean> {
    const users = await this.userModel.findAll({ where: { login }});

    return !users.length || (users.length === 1 && users[0].id === id) ?
      true :
      false;
  }
}
