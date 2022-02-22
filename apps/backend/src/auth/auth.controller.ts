import { Controller, Get, Param, Post, Session } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('session')
  sessionOutput(@Session() session: AppSession) {
    return `${session.userId} \n ${session.authToken}`
  }

  @Post('token/:id')
  async getTokenForUser(@Param() params, @Session() session: AppSession) {
    const userId = params.id
    await this.authService.getTokenForUserAndStore(userId, session)
  }
}
