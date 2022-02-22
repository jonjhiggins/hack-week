import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { HttpModuleUser } from './HttpModuleUser'

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
      imports: [HttpModuleUser]
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should return valid response', async () => {
      const response = await service.createUser({
        published_timeline_id: 'BQyAKcJvnCnEL0Vomv50',
        timezone: 'Europe/London'
      })
      console.log(response)
      expect(response).toBeDefined()
    })
  })


});
