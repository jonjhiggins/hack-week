import { Body, Controller, Param, Post, Session } from '@nestjs/common';
import type { CreateUserDto } from './user.dto';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService) { }

  @Post('/:id')
  async createUser(@Param() params, @Body() createUserDto: CreateUserDto, @Session() session: AppSession) {
    if (!session.authToken) {
      const userId = params.id
      await this.authService.getTokenForUserAndStore(userId, session)
    }

    return this.userService.createUser(createUserDto, session.authToken)
  }
}
