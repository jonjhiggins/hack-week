import { Controller, Param, Post } from '@nestjs/common';
import { TokenResponse } from './auth.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('token/:userId')
  async getTokenForUser(@Param() params): Promise<TokenResponse> {
    const userId = params.userId
    return this.authService.getTokenForUser(userId)
  }
}
