export interface User {
  id: number;
  account_creation_token: string;
  email: string;
  email_verified_at: string;
  firstname: string;
  lastname: string;
  role: "SUPER_ADMIN" | "ADMIN" | "USER";
  updated_at: string;
  created_at: string;
}

export interface EditableUser {
  email?: string;
  firstname?: string;
  lastname?: string;
  role?: "SUPER_ADMIN" | "ADMIN" | "USER";
}
