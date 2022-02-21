import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HttpModuleCustom } from './HttpModuleCustom';

@Module({
  imports: [HttpModuleCustom],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
