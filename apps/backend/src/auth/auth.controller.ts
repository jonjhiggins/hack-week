import { Controller, Get, Param, Post, Session } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('token/:id')
  async getTokenForUser(@Param() params, @Session() session: AppSession) {
    const userId = params.id
    const tokenResponse = await this.authService.getTokenForUser(userId)
    this.authService.storeTokenInSession(session, tokenResponse.id_token)
    return 'Token created and stored'
  }
}
