import { HttpModule } from "@nestjs/axios"

if (!process.env.FICTIONEERS_API_BASE_URL) {
  throw new Error('Missing FICTIONEERS_API_BASE_URL')
}

if (!process.env.FICTIONEERS_API_KEY) {
  throw new Error('Missing FICTIONEERS_API_KEY')
}

const HttpModuleUser = HttpModule.register({
  baseURL: process.env.FICTIONEERS_API_BASE_URL,
  headers: {
    Client: 'hack-week'
  },
})

export { HttpModuleUser }
