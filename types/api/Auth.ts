import type { User } from '../entity/User'

export interface LoginResponse {
  authorization: {
    token: string
    type: string
  }
  user: User
}
