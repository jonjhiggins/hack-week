import { HttpService } from '@nestjs/axios';
import { Module, OnModuleInit } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
})

export class UserModule { }
