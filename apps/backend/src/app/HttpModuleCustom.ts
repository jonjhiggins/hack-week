import { HttpModule } from "@nestjs/axios"

const HttpModuleCustom = HttpModule.register({
  baseURL: process.env.FICTIONEERS_API_BASE_URL,
  headers: {
    Authorization: process.env.FICTIONEERS_API_KEY,
    Client: 'hack-week'
  },
})

export { HttpModuleCustom }
