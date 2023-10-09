import { Client } from "./Client";

export interface User {
  id: string;
  account_creation_token: string;
  email: string;
  email_verified_at: string;
  firstname: string;
  lastname: string;
  role: "SUPER_ADMIN" | "ADMIN" | "USER";
  client_id: string;
  client: Client;
  updated_at: string;
  created_at: string;
}

export interface EditableUser {
  email?: string;
  firstname?: string;
  lastname?: string;
  client_id?: string;
  role?: "SUPER_ADMIN" | "ADMIN" | "USER";
}
