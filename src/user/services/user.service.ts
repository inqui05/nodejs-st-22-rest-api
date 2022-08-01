import { Injectable } from '@nestjs/common';
import { AutoSuggestUserInfoDto } from '../dto/autoSuggestUserInfo.dto';
import { User } from '../models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { NewUserDto } from '../dto/new-user.dto';
import { UserDto } from '../dto/user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

const WRONG_ID = 'There is not user with id=';
const USER_MUST_BE_UNIQUE = 'The user\'s login must be unique';

@Injectable()
export class UserService {

  constructor(@InjectModel(User) private userModel: typeof User) {}

  async getUsers(): Promise<User[]> {
    return await this.userModel.findAll({ where: { isDeleted: false }});
  }

  async getUserById(id: string): Promise<User | null> {
    return await this.userModel.findOne({where: { [Op.and]: [{ id }, { isDeleted: false }] }});
  }

  async createUser(newUserInfo: NewUserDto): Promise<UserDto | null> {
    const isLoginUnique = await this.checkIsLoginUnique(newUserInfo.login);
    return isLoginUnique ? await this.userModel.create(newUserInfo) : null;
  }

  async removeUserById(id: string): Promise<User | null> {
    const user = await this.userModel.findOne({ where: { id }});
    if (user) {
      user.update({ isDeleted: true })
    }
    return user;
  }

  async updateUser(id: string, newUserInfo: UpdateUserDto): Promise<UserDto | string> {
    const user = await this.userModel.findOne({ where: { id }});
    const isLoginUnique = await this.checkIsLoginUnique(newUserInfo.login, id);

    if (user && isLoginUnique) {
      user.update({ 
        login: newUserInfo.login,
        password: newUserInfo.password,
        age: newUserInfo.age,
      });
      return user;
    } else if (!isLoginUnique) {
      return USER_MUST_BE_UNIQUE;
    } else {
      return `${WRONG_ID}${id}`
    }
  }

  async getUsersWithParams(params: AutoSuggestUserInfoDto): Promise<UserDto[]> {
    return await this.userModel.findAll({ 
      where: { login: {[Op.iLike]: `%${params.loginSubstring}%` }},
      limit: params.limit
    });
  }

  async checkIsLoginUnique(login: string, id?: string): Promise<boolean> {
    const users = await this.userModel.findAll({ where: { login }});

    return !users.length || (users.length === 1 && users[0].id === id) ?
      true :
      false;
  }
}
