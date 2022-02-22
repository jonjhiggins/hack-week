interface AppSession {
  authToken?: string
  userId?: string
}

interface FictioneersApiValidationError {
  loc: string[]
  msg: string
  type: string
}

interface FictioneersApiError {
  data: unknown
  error: {
    detail?: string
    content?: FictioneersApiValidationError[]
  }
  meta: unknown
}



