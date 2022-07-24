import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AutoSuggestUserInfoDto } from './dto/autoSuggestUserInfo.dto';
import { NewUserDto } from './dto/new-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';

const PHRASE = 'There is not user with id=';

@Injectable()
export class UserService {
  public users: UserDto[] = [];

  getUsers(): UserDto[] {
    return this.users.filter((user: UserDto): boolean => user.isDeleted === false);
  }

  getUserById(id: string): UserDto {
    const result = this.users.find((user: UserDto): boolean => user.id === id && user.isDeleted === false);
    if (!result) {
      throw new HttpException(`${PHRASE}${id}`, HttpStatus.NOT_FOUND);
    }
    return result;
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
    const checkLogin = this.users.filter((user: UserDto): boolean => user.login === userInfo.login);

    if (checkLogin.length) {
      throw new HttpException("The user's login must be unique", HttpStatus.BAD_REQUEST);
    } else {
      const newUser: UserDto = { ...userInfo, id: this.createId(), isDeleted: false };
      this.users.push(newUser);
      return newUser;
    }
  }

  updateUser(id: string, newInfo: UpdateUserDto): UserDto {
    const checkLogin = this.users.filter((user: UserDto): boolean => user.login === newInfo.login);
    if (checkLogin.length > 1 || (checkLogin.length && checkLogin[0].id !== id)) {
      throw new HttpException("The user's login must be unique", HttpStatus.BAD_REQUEST);
    }

    const userIndex = this.users.findIndex((user: UserDto): boolean => user.id === id);
    if (userIndex >= 0) {
      this.users[userIndex] = { ...this.users[userIndex], ...newInfo };
    } else {
      throw new HttpException(PHRASE + id, HttpStatus.NOT_FOUND);
    }

    return this.users[userIndex];
  }

  removeUserById(id: string): UserDto {
    const user = this.users.find((user: UserDto): boolean => user.id === id && !user.isDeleted);
    if (user) {
      user.isDeleted = true;
      return user;
    } else {
      throw new HttpException(`${PHRASE}${id}`, HttpStatus.NOT_FOUND);
    }
  }

  private createId(): string {
    return Math.random().toString(16).slice(2);
  }

  private trimArray(users: UserDto[], limit: number): UserDto[] {
    users.sort((a, b) => a.login.localeCompare(b.login));
    return users.length > 0 && users.length > limit ? users.slice(0, limit) : users;
  }
}
