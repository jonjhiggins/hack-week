import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';
import { AppModule } from '../app/app.module';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
      imports: [AppModule, AuthModule]
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
    // Need to mock server
    xit('should return valid response', async () => {
      const response = await service.createUser({
        published_timeline_id: 'BQyAKcJvnCnEL0Vomv50',
        timezone: 'Europe/London'
      }, '5')
      console.log(response)
      expect(response).toBeDefined()
    })
  })


});
