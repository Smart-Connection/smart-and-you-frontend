import type { User } from "../entity/User";

export interface LoginResponse {
  authorization: {
    token: string;
    type: string;
  };
  user: User;
}

export interface RegisterRequest {
  firstname: string;
  lastname: string;
  password: string;
  account_creation_token: string;
}
