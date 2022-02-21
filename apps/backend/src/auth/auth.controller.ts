import { Controller, Param, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Get('get-token-for-user/:id')
  async getTokenForUser(@Param() params) {
    const userId = params.id
    return this.authService.getTokenForUser(userId)
  }
}
