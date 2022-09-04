import { Controller, Get, Post, Body, Param, Delete, HttpStatus, HttpException, Put, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { GroupService } from '../services/group.service';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';
import { IGroup } from '../interfaces/group.interface';
import { AddUsersToGroupDto } from '../dto/add-users-to-group.dto';
import { CheckTokenGuard } from '../../auth/guards/check-token.guard';

const WRONG_ID = 'There is not the group with id=';
const GROUP_NAME_MUST_BE_UNIQUE = 'The name of the group must be unique';

@UseGuards(CheckTokenGuard)
@Controller('v1/groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  async create(@Body() createGroupDto: CreateGroupDto): Promise<IGroup | null> {
    const result = await this.groupService.create(createGroupDto);
    if (!result) {
      throw new HttpException(GROUP_NAME_MUST_BE_UNIQUE, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @Get()
  async findAll(): Promise<IGroup[]> {
    return await this.groupService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IGroup | null> {
    const result = await this.groupService.findOne(id);
    if (!result) {
      throw new HttpException(`${WRONG_ID}${id}`, HttpStatus.NOT_FOUND);
    }
    return result;
  }

  @Put(':id')
  async update(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body() updateGroupDto: UpdateGroupDto): Promise<IGroup | null> {
    const groupExist = await this.groupService.findOne(id);
    if (!groupExist) {
      throw new HttpException(WRONG_ID, HttpStatus.NOT_FOUND);
    }

    const result = await this.groupService.update(id, updateGroupDto);
    if (!result) {
      throw new HttpException(GROUP_NAME_MUST_BE_UNIQUE, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Promise<void> {
    await this.groupService.findOne(id);
    this.groupService.remove(id);
  }

  @Post(':id')
  async addUsersToGroup(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() usersIds: AddUsersToGroupDto
    ): Promise<void> {
      const result = await this.groupService.findOne(id);
      if (!result) {
        throw new HttpException(`${WRONG_ID}${id}`, HttpStatus.NOT_FOUND);
      }
      this.groupService.addUsersToGroup(id, usersIds.users);
  }
}
