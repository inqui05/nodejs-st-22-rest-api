import { v4 as uuidv4 } from 'uuid';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AutoSuggestUserInfoDto } from '../dto/autoSuggestUserInfo.dto';
import { User } from '../models/user.model';
import { NewUserDto } from '../dto/new-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class InMemoryUserRepository {
  private users: IUser[] = [];

  getAll(): IUser[] {
    return this.users;
  }

  getOne(id: string): IUser | undefined {
    return this.users.find((user: User): boolean => user.id === id && user.isDeleted === false);
  }

  getSome(params: AutoSuggestUserInfoDto): IUser[] {
    if (params.loginSubstring) {
      const users = this.users.filter((user: IUser) => {
        if (params.loginSubstring) {
          return user.login.includes(params.loginSubstring) && user.isDeleted === false;
        }
      });

      return this.trimArray(users, params.limit);
    }

    const users = this.getAll();
    return this.trimArray(users, params.limit);
  }

  create(userInfo: NewUserDto): IUser | null {
    const isUniqueLogin = this.checkIsLoginUnique(userInfo.login);
    if (!isUniqueLogin) {
      throw new HttpException(`You can not use this login. Please choose another one.`, HttpStatus.NOT_FOUND);
    }

    const newUser: IUser = { ...userInfo, id: uuidv4(), isDeleted: false, groups: [] };
    this.users.push(newUser);
    return newUser;
  }

  async remove(id: string): Promise<void> {
    const user = this.users.find((user: IUser): boolean => user.id === id && !user.isDeleted);
    if (user) {
      user.isDeleted = true;
    }
  }

  update(id: string, newInfo: UpdateUserDto): IUser | null {
    const isUniqueLogin = this.checkIsLoginUnique(newInfo.login, id);
    if (!isUniqueLogin) {
      throw new HttpException(`You can not use this login. Please choose another one.`, HttpStatus.NOT_FOUND);
    }

    const userIndex = this.users.findIndex((user: IUser): boolean => user.id === id && !user.isDeleted);
    if (userIndex >= 0 && !this.users[userIndex].isDeleted) {
      this.users[userIndex] = { ...this.users[userIndex], ...newInfo };
    } else {
      throw new HttpException(`There is not user with id=${id}`, HttpStatus.NOT_FOUND);
    }

    return this.users[userIndex];
  }

  private checkIsLoginUnique(login: string, id?: string): boolean {
    const users =  this.users.filter((user: IUser): boolean => user.login === login && !user.isDeleted);

    return !users.length || (users.length === 1 && users[0].id === id) ?
      true :
      false;
  }

  private trimArray(users: IUser[], limit: number): IUser[] {
    users.sort((a, b) => a.login.localeCompare(b.login));
    return users.length > 0 && users.length > limit ? users.slice(0, limit) : users;
  }
}
