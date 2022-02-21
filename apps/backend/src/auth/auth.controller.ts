import { Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('token/:id')
  async getTokenForUser(@Param() params) {
    const userId = params.id
    return this.authService.getTokenForUser(userId)
  }
}
