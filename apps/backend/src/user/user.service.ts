import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { lastValueFrom, map } from 'rxjs';
import { CreateUserDto } from './user.dto';
import type { MeResponse } from './user.interface';

@Injectable()
export class UserService {
  constructor(private httpService: HttpService) { }

  async getCurrentUser(authToken: string): Promise<MeResponse> {
    const url = 'api/v1/users/me'
    const config: AxiosRequestConfig = {
      headers: { Authorization: `Bearer ${authToken}` }
    }
    return lastValueFrom(
      this.httpService.get(url, config).pipe(
        map(res => res.data)
      )
    );
  }

  async createUser(createUserDto: CreateUserDto, authToken: string): Promise<string> {
    const url = `/api/v1/users`
    const config: AxiosRequestConfig = {
      headers: { Authorization: `Bearer ${authToken}` }
    }
    return lastValueFrom(
      this.httpService.post(url, createUserDto, config).pipe(
        map(res => res.data)
      )
    );
  }
}
