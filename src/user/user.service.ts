import { Injectable } from '@nestjs/common';
import { AutoSuggestUserInfoDto } from './dto/autoSuggestUserInfo.dto';
import { NewUserDto } from './dto/new-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  public users: UserDto[] = [];

  getUsers(): UserDto[] {
    return this.users.filter((user: UserDto): boolean => user.isDeleted === false);
  }

  getUserById(id: string): UserDto | undefined {
    return this.users.find((user: UserDto): boolean => user.id === id && user.isDeleted === false);
  }

  getUsersWithParams(params: AutoSuggestUserInfoDto): UserDto[] {
    if (params.loginSubstring) {
      const users = this.users.filter((user: UserDto) => {
        if (params.loginSubstring) {
          return user.login.includes(params.loginSubstring) && user.isDeleted === false;
        }
      });

      return this.trimArray(users, params.limit);
    }

    const users = this.getUsers();
    return this.trimArray(users, params.limit);
  }

  createUser(userInfo: NewUserDto): UserDto {
    const newUser: UserDto = { ...userInfo, id: this.createId(), isDeleted: false };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: string, newInfo: UpdateUserDto): UserDto | undefined {
    const userIndex = this.users.findIndex((user: UserDto): boolean => user.id === id);
    if (userIndex >= 0) {
      this.users[userIndex] = { ...this.users[userIndex], ...newInfo };
    } else {
      return undefined;
    }

    return this.users[userIndex];
  }

  removeUserById(id: string): UserDto | undefined {
    const user = this.users.find((user: UserDto): boolean => user.id === id && !user.isDeleted);
    if (user) {
      user.isDeleted = true;
    }
    return user;
  }

  private createId(): string {
    return Math.random().toString(16).slice(2);
  }

  private trimArray(users: UserDto[], limit: number): UserDto[] {
    users.sort((a, b) => a.login.localeCompare(b.login));
    return users.length > 0 && users.length > limit ? users.slice(0, limit) : users;
  }
}
