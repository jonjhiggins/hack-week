import { Controller, Param, Get } from '@nestjs/common';
import axios from 'axios';

@Controller('auth')
export class AuthController {
  @Get('get-token-for-user/:id')
  async getToken(@Param() params): Promise<string> {
    const userId = params.id
    const baseUrl = process.env.FICTIONEERS_API_BASE_URL
    const url = `${baseUrl}/api/v1/auth/token`
    const request = axios(url, {
      method: 'POST',
      headers: {
        Authorization: process.env.FICTIONEERS_API_KEY,
      },
      data: {
        user_id: userId
      }
    })
    const { data } = await request
    return data.id_token
  }
}
