import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { AutoSuggestUserInfoDto } from './dto/autoSuggestUserInfo.dto';
import { NewUserDto } from './dto/new-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

const PHRASE = 'There is not user with id=';

@Controller('v1/user')
export class UserController {
  constructor(private users: UserService) {}

  @Get(':id')
  getUserById(@Param('id') id: string): UserDto {
    const result = this.users.getUserById(id);
    if (!result) {
      throw new HttpException(`${PHRASE}${id}`, HttpStatus.NOT_FOUND)
    }
    return result;
  }

  @Get()
  getAutoSuggestUsers(@Query() params: AutoSuggestUserInfoDto) {
    if (Object.keys(params).length == 0) {
      return this.users.getUsers();
    }

    return this.users.getUsersWithParams(params);
  }

  @Post()
  createUser(@Body() userInfo: NewUserDto): UserDto {
    return this.users.createUser(userInfo);
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  updateUser(@Param('id') id: string, @Body() userInfo: UpdateUserDto): UserDto {
    const result = this.users.updateUser(id, userInfo);
    if(!result) {
      throw new HttpException(`${PHRASE}${id}`, HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeUserById(@Param('id') id: string): void {
    const result = this.users.removeUserById(id);
    if (!result) {
      throw new HttpException(`${PHRASE}${id}`, HttpStatus.NOT_FOUND);
    }
  }
}
