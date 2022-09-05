import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryUserRepository } from '../repository/in-memory-user-repository.service';
import { UserService } from '../services/user.service';
import { UserController } from './user.controller';

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
});
