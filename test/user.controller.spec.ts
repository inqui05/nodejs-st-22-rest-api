import { HttpException, HttpStatus } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../src/user/controllers/user.controller';
import { AutoSuggestUserInfoDto } from '../src/user/dto/autoSuggestUserInfo.dto';
import { IUser } from '../src/user/interfaces/user.interface';
import { InMemoryUserRepository } from '../src/user/repository/in-memory-user-repository.service';
import { UserService } from '../src/user/services/user.service';
import { USER_MUST_BE_UNIQUE, WRONG_ID } from '../src/common/vars/vars';
import { mockedAdmin, mockedUser } from './mocks/mockedUser.mock';
import { createUserDTO } from './stubs/createUserDto.stub';
import { updateUserDTO } from './stubs/updateUserDto.stub';


describe('UserController', () => {
  let controller: UserController;
  let service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule],
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useClass: InMemoryUserRepository,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return the user', async () => {
    service.getUserById = jest.fn().mockResolvedValue(mockedUser);

    const result: IUser = await controller.getUserById(mockedUser.id);
    expect(service.getUserById).toBeCalled();
    expect(result).toEqual(mockedUser);
  });

  it('should return all users', async () => {
    let users = [mockedUser, mockedAdmin];
    service.getUsers = jest.fn().mockResolvedValue(users);

    const result: IUser[] = await controller.getAutoSuggestUsers({} as AutoSuggestUserInfoDto);
    expect(service.getUsers).toBeCalled();
    expect(result).toEqual(users);
  });

  it('should call getUsersWithParams method when request has params', async () => {
    let users = [mockedUser, mockedAdmin];
    let params = {loginSubstring: 'Admin', limit: 5};

    service.getUsersWithParams = jest.fn().mockResolvedValue(users);

    await controller.getAutoSuggestUsers(params);
    expect(service.getUsersWithParams).toBeCalled();
  });

  it('should create the user', async () => {
    service.createUser = jest.fn().mockResolvedValue(mockedUser);

    const result: IUser = await controller.createUser(createUserDTO);
    expect(service.createUser).toBeCalled();
    expect(result).toEqual(mockedUser);
  });

  it('should return an exception if the login of new user isn\'t unique', async () => {
    service.createUser = jest.fn().mockResolvedValue(new HttpException(USER_MUST_BE_UNIQUE, HttpStatus.BAD_REQUEST));

    try {
      await controller.createUser(createUserDTO);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe(USER_MUST_BE_UNIQUE);
    }
  });

  it('should update the user', async () => {
    service.updateUser = jest.fn().mockResolvedValue(mockedUser);

    const result: IUser = await controller.updateUser(
      '017480d7-2077-4888-bf20-ca7a65f45896', updateUserDTO
    );
    expect(service.updateUser).toBeCalled();
    expect(result).toEqual(mockedUser);
  });

  it('should return an exception if the login isn\'t unique when try to update the user', async () => {
    service.updateUser = jest.fn().mockResolvedValue(
      new HttpException(USER_MUST_BE_UNIQUE, HttpStatus.BAD_REQUEST)
    );

    try {
      await controller.updateUser(
      '017480d7-2077-4888-bf20-ca7a65f45896', updateUserDTO
    );
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe(USER_MUST_BE_UNIQUE);
    }
  });

  it('should delete the user', async () => {
    service.removeUserById = jest.fn().mockResolvedValue(undefined);

    const result = await controller.removeUserById('017480d7-2077-4888-bf20-ca7a65f45896');
    expect(result).toBeUndefined();
  });

  it('should return an exception if the userId is wrong', async () => {
    let id = '017480d7-2077-4888-bf20-ca7a65f45596';
    service.removeUserById = jest.fn().mockResolvedValue(undefined);

    try {
      await controller.removeUserById(id);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe(`${WRONG_ID}${id}`);
    }
  });
});
