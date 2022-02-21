import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { TokenResponse } from './auth.interface'

@Injectable()
export class AuthService {
  constructor(private httpService: HttpService) { }

  async getTokenForUser(userId: string): Promise<TokenResponse> {
    const url = `/api/v1/auth/token`
    const data = { user_id: userId }
    return lastValueFrom(
      this.httpService.post(url, data).pipe(
        map(res => res.data)
      )
    );

  }
}
