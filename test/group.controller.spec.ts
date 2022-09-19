import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateGroupDtoStub } from './stubs/new-group.stub';
import { mockedGroup } from './mocks/mockedGroup.mock';
import { IGroup } from '../src/group/interfaces/group.interface';
import { InMemoryGroupRepository } from '../src/group/repository/in-memory-group-repository.service';
import { GroupService } from '../src/group/services/group.service';
import { GroupController } from '../src/group/controllers/group.controller';
import { HttpException, HttpStatus } from '@nestjs/common';
import { GROUP_NAME_MUST_BE_UNIQUE, WRONG_GROUP_ID } from '../src/common/vars/vars';
import { updateGroupDTO } from './stubs/updateGroupDto.stub';
import { AddUsersToGroupDto } from '../src/group/dto/add-users-to-group.dto';

describe('UserController', () => {
  let controller: GroupController;
  let service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule],
      controllers: [GroupController],
      providers: [
        {
          provide: GroupService,
          useClass: InMemoryGroupRepository,
        },
      ],
    }).compile();

    controller = module.get<GroupController>(GroupController);
    service = module.get<GroupService>(GroupService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return the group', async () => {
    service.findOne = jest.fn().mockResolvedValue(mockedGroup);

    const result: IGroup = await controller.findOne(mockedGroup.id);
    expect(service.findOne).toBeCalled();
    expect(result).toEqual(mockedGroup);
  });

  it('should return an exception if the groupId is wrong', async () => {
    let id = '117480d7-2077-4888-bf20-ca7a65f45896';
    service.findOne = jest.fn().mockResolvedValue(undefined);

    try {
      await controller.findOne(id);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe(`${WRONG_GROUP_ID}${id}`);
    }
  });

  it('should return all groups', async () => {
    let groups = [mockedGroup];
    service.findAll = jest.fn().mockResolvedValue(groups);

    const result: IGroup[] = await controller.findAll();
    expect(service.findAll).toBeCalled();
    expect(result).toEqual(groups);
  });

  it('should create the group', async () => {
    service.create = jest.fn().mockResolvedValue(mockedGroup);

    const result: IGroup = await controller.create(CreateGroupDtoStub);
    expect(service.create).toBeCalled();
    expect(result).toEqual(mockedGroup);
  });

  it('should return an exception if the name of new group isn\'t unique', async () => {
    service.create = jest.fn().mockResolvedValue(new HttpException(GROUP_NAME_MUST_BE_UNIQUE, HttpStatus.BAD_REQUEST));

    try {
      await controller.create(CreateGroupDtoStub);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe(GROUP_NAME_MUST_BE_UNIQUE);
    }
  });

  it('should update the group', async () => {
    service.findOne = jest.fn().mockResolvedValue(mockedGroup);
    service.update = jest.fn().mockResolvedValue(mockedGroup);

    const result: IGroup = await controller.update('017480d7-2077-4888-bf20-ca7a65f45896', updateGroupDTO);
    expect(service.update).toBeCalled();
    expect(result).toEqual(mockedGroup);
  });

  it("should return an exception if the group name isn't unique when try to update it", async () => {
    service.findOne = jest.fn().mockResolvedValue(mockedGroup);
    service.update = jest.fn().mockResolvedValue(null);

    try {
      await controller.update('017480d7-2077-4888-bf20-ca7a65f45896', updateGroupDTO);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe(GROUP_NAME_MUST_BE_UNIQUE);
    }
  });

  it("should return an exception if the groupId is wrong", async () => {
    try {
      await controller.update('017480d7-2077-4888-bf20-ca7a65f45896', updateGroupDTO);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe(WRONG_GROUP_ID);
    }
  });

  it('should delete the group', async () => {
    service.remove = jest.fn().mockResolvedValue(undefined);

    const result = await controller.remove('017480d7-2077-4888-bf20-ca7a65f45896');
    expect(service.remove).toBeCalled();
    expect(result).toBeUndefined();
  });

  it('should connected users with group', async () => {
    service.findOne = jest.fn().mockResolvedValue(mockedGroup);
    service.addUsersToGroup = jest.fn().mockResolvedValue(undefined);

    const result = await controller.addUsersToGroup(
      '017480d7-2077-4888-bf20-ca7a65f45896',
      { users: ['017480d7-2077-4888-bf20-ca7a65f45896'] } as AddUsersToGroupDto,
    );
    expect(service.addUsersToGroup).toBeCalled();
    expect(result).toBeUndefined();
  });

  it('should return an exception if group with this id doesn\'t exist', async () => {
    let id = '017480d7-2077-4888-bf20-ca7a65f45896';
    try {
      await controller.addUsersToGroup(
      id,
      { users: ['017480d7-2077-4888-bf20-ca7a65f45896'] } as AddUsersToGroupDto,
      );
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe(`${WRONG_GROUP_ID}${id}`);
    }
  });
});
