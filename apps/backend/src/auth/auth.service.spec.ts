import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
      controllers: [AuthController],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get a valid response', async () => {
    const token = await service.getTokenForUser('sdfdas')
    expect(token).toBeDefined();
    expect(typeof token.id_token).toBe('string');
    expect(typeof token.expires_in).toBe('number');
    expect(typeof token.refresh_token).toBe('string');
  });
});
