import { Body, Controller, Get, Param, Post, Session } from '@nestjs/common';
import type { CreateUserDto } from './user.dto';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService) { }

  @Get('/me')
  async me(@Session() session: AppSession) {
    if (!session.authToken) {
      throw new Error('Missing auth token')
    }
    const me = await this.userService.getCurrentUser(session.authToken)
    return me.data
  }

  @Post('/:userId')
  async createUser(@Param() params, @Body() createUserDto: CreateUserDto, @Session() session: AppSession) {
    if (!session.authToken) {
      const userId = params.userId
      await this.authService.getTokenForUserAndStore(userId, session)
    }

    return this.userService.createUser(createUserDto, session.authToken)
  }
}
