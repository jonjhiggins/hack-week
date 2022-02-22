import { HttpService } from '@nestjs/axios';
import { Global, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import axios, { AxiosError } from 'axios';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModuleCustom } from './HttpModuleCustom';

@Global()
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env', '.env.local'] }), AuthModule, UserModule, HttpModuleCustom],
  controllers: [AppController],
  providers: [AppService],
  exports: [HttpModuleCustom]
})

export class AppModule implements OnModuleInit {
  constructor(private httpModule: HttpService) {
  }

  onModuleInit() {
    // Error handling
    // this.httpModule.axiosRef.interceptors.request.use(config => { console.log(config); return config });
    this.httpModule.axiosRef.interceptors.response.use(response => response, (err: Error | AxiosError) => {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<FictioneersApiError>

        if (axiosError.response.data && axiosError.response.data.error && axiosError.response.data.error.content) {
          //console.log(`Location: ${axiosError.response.data.error?.content?.loc.join('\n')}`)
          const { content } = axiosError.response.data.error
          if (content.length) {
            content.map(c => {
              console.log(`Location: ${JSON.stringify(c.loc)}`)
              console.log(`Type: ${c.type}`)
              console.log(`Msg: ${c.msg}`)
            })
          }
        }
        if (axiosError.response.data && axiosError.response.data.error && axiosError.response.data.error.detail) {
          console.error(axiosError.response.data.error.detail)
        }
      }
      return Promise.reject(err);
    });
  }

}
