import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
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
    return this.users.getUserById(id);
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
    return this.users.createUser(userInfo);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.ACCEPTED)
  updateUser(@Param('id') id: string, @Body() userInfo: UpdateUserDto): UserDto {
    return this.users.updateUser(id, userInfo);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeUserById(@Param('id') id: string): void {
    this.users.removeUserById(id);
  }
}
