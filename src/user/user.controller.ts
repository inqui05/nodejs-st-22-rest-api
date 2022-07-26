import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { AutoSuggestUserInfoDto } from './dto/autoSuggestUserInfo.dto';
import { NewUserDto } from './dto/new-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

const WRONG_ID = 'There is not user with id=';
const USER_MUST_BE_UNIQUE = 'The user\'s login must be unique';

@Controller('v1/users')
export class UserController {
  constructor(private users: UserService) {}

  @Get(':id')
  getUserById(@Param('id') id: string): UserDto {
    const result = this.users.getUserById(id);
    if (!result) {
      throw new HttpException(`${WRONG_ID}${id}`, HttpStatus.NOT_FOUND);
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
  @UsePipes(ValidationPipe)
  createUser(@Body() userInfo: NewUserDto): UserDto {
    const result = this.users.createUser(userInfo);
    if (!result) {
      throw new HttpException(USER_MUST_BE_UNIQUE, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.ACCEPTED)
  updateUser(@Param('id') id: string, @Body() userInfo: UpdateUserDto): UserDto {
    const result = this.users.updateUser(id, userInfo);
    if (!result) {
      throw new HttpException(USER_MUST_BE_UNIQUE, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeUserById(@Param('id') id: string): void {
    const result = this.users.removeUserById(id);
    if (!result) {
      throw new HttpException(`${WRONG_ID}${id}`, HttpStatus.NOT_FOUND);
    }
  }
}
