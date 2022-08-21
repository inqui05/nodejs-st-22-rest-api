import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CheckTokenGuard } from 'src/auth/guards/check-token.guard';
import { AutoSuggestUserInfoDto } from '../dto/autoSuggestUserInfo.dto';
import { NewUserDto } from '../dto/new-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDto } from '../interfaces/user.interface';
import { UserService } from '../services/user.service';

const WRONG_ID = 'There is not user with id=';
const USER_MUST_BE_UNIQUE = 'The user\'s login must be unique';

@Controller('v1/users')
export class UserController {
  constructor(private users: UserService) {}

  @UseGuards(CheckTokenGuard)
  @Get(':id')
  async getUserById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Promise<UserDto> {
    const result = await this.users.getUserById(id);
    if (!result) {
      throw new HttpException(`${WRONG_ID}${id}`, HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @UseGuards(CheckTokenGuard)
  @Get()
  getAutoSuggestUsers(@Query() params: AutoSuggestUserInfoDto) {
    if (Object.keys(params).length == 0) {
      return this.users.getUsers();
    }

    return this.users.getUsersWithParams(params);
  }

  @UseGuards(CheckTokenGuard)
  @Post()
  async createUser(@Body() userInfo: NewUserDto): Promise<UserDto> {
    const result = await this.users.createUser(userInfo);
    if (!result) {
      throw new HttpException(USER_MUST_BE_UNIQUE, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @UseGuards(CheckTokenGuard)
  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async updateUser(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body() userInfo: UpdateUserDto): Promise<UserDto> {
    const result = await this.users.updateUser(id, userInfo);
    if (!result) {
      throw new HttpException(USER_MUST_BE_UNIQUE, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @UseGuards(CheckTokenGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeUserById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Promise<void> {
    await this.getUserById(id);
    this.users.removeUserById(id);
  }
}
