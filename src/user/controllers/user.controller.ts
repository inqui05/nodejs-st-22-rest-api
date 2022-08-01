import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { AutoSuggestUserInfoDto } from '../dto/autoSuggestUserInfo.dto';
import { NewUserDto } from '../dto/new-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../services/user.service';

const WRONG_ID = 'There is not user with id=';
const USER_MUST_BE_UNIQUE = 'The user\'s login must be unique';

@Controller('v1/users')
export class UserController {
  constructor(private users: UserService) {}

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserDto> {
    const result = await this.users.getUserById(id);
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
  async createUser(@Body() userInfo: NewUserDto): Promise<UserDto> {
    const result = await this.users.createUser(userInfo);
    if (!result) {
      throw new HttpException(USER_MUST_BE_UNIQUE, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.ACCEPTED)
  async updateUser(@Param('id') id: string, @Body() userInfo: UpdateUserDto): Promise<UserDto> {
    const result = await this.users.updateUser(id, userInfo);
    if (!result) {
      throw new HttpException(USER_MUST_BE_UNIQUE, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeUserById(@Param('id') id: string): Promise<void> {
    const result = await this.users.removeUserById(id);
    if (!result) {
      throw new HttpException(`${WRONG_ID}${id}`, HttpStatus.NOT_FOUND);
    }
  }
}
