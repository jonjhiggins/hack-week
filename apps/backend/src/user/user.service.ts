import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { lastValueFrom, map } from 'rxjs';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private httpService: HttpService) { }

  async createUser(createUserDto: CreateUserDto): Promise<string> {
    const url = `/api/v1/users`
    const config: AxiosRequestConfig = {
      headers: { Authorization: 'Bearer ' }
    }
    return lastValueFrom(
      this.httpService.post(url, createUserDto, config).pipe(
        map(res => res.data)
      )
    );
  }
}
