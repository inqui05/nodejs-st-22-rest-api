import { Injectable } from '@nestjs/common';
import { AutoSuggestUserInfoDto } from '../dto/autoSuggestUserInfo.dto';
import { User } from '../models/user.model';
import { UserRepository } from '../repository/users-repository.service';
import { NewUserDto } from '../dto/new-user.dto';
import { UserDto } from '../dto/user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {

  constructor(private UserRepository: UserRepository) {}

  async getUsers(): Promise<User[]> {
    return this.UserRepository.getAll();
  }

  async getUserById(id: string): Promise<User | null> {
    return this.UserRepository.getOne(id);
  }

  async createUser(newUserInfo: NewUserDto): Promise<UserDto | null> {
    return this.UserRepository.create(newUserInfo);
  }

  async removeUserById(id: string): Promise<User | null> {
    return this.UserRepository.remove(id);
  }

  async updateUser(id: string, newUserInfo: UpdateUserDto): Promise<UserDto | null> {
    return this.UserRepository.update(id, newUserInfo);
  }

  async getUsersWithParams(params: AutoSuggestUserInfoDto): Promise<UserDto[]> {
    return this.UserRepository.getSome(params);
  }
}
