import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryGroupRepository } from '../repository/in-memory-group-repository.service';
import { GroupService } from '../services/group.service';
import { GroupController } from './group.controller';

describe('UserController', () => {
  let controller: GroupController;
  let service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule],
      controllers: [GroupController],
      providers: [{
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
});
