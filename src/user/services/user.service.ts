import { Injectable } from '@nestjs/common';
import { AutoSuggestUserInfoDto } from '../dto/autoSuggestUserInfo.dto';
import { User } from '../models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { NewUserDto } from '../dto/new-user.dto';
import { UserDto } from '../dto/user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {

  constructor(@InjectModel(User) private userModel: typeof User) {}

  async getUsers(): Promise<User[]> {
    return await this.userModel.findAll({ where: { isDeleted: false }});
  }

  async getUserById(id: string): Promise<User | null> {
    return await this.userModel.findOne({where: { [Op.and]: [{ id }, { isDeleted: false }] }});
  }

  async createUser(newUserInfo: NewUserDto): Promise<UserDto> {
    return await this.userModel.create(newUserInfo);
  }

  async removeUserById(id: string): Promise<User | null> {
    const user = await this.userModel.findOne({ where: { id }});
    if (user) {
      user.update({ isDeleted: true })
    }
    return user;
  }

  async updateUser(id: string, newUserInfo: UpdateUserDto): Promise<UserDto | null> {
    const user = await this.userModel.findOne({ where: { id }});
    if (user) {
      user.update({ 
        login: newUserInfo.login,
        password: newUserInfo.password,
        age: newUserInfo.age,
       })
    }
    return user;
  }

  async getUsersWithParams(params: AutoSuggestUserInfoDto): Promise<UserDto[]> {
    return await this.userModel.findAll({ 
      where: { login: {[Op.iLike]: `%${params.loginSubstring}%` }},
      limit: params.limit
    });
  }
}
