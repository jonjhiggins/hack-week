import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import type { CreateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService) { }

  @Get('/me/:authToken')
  async me(@Param() params) {
    const me = await this.userService.getCurrentUser(params.authToken)
    return me.data
  }

  @Post('/:authToken')
  async createUser(@Param() params, @Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto, params.authToken)
  }
}
