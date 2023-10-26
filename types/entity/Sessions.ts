import { Client } from "./Client";
import { Contract } from "./Contract";
import { User } from "./User";

export interface Session {
  id: string;
  address: string;
  zipcode: string;
  city: string;
  contract_id: string;
  user_id: string;
  format: string;
  date: string;
  contact_email: string;
  contact_phone: string;
  created_at: string;
  updated_at: string;
  contract: Contract;
  consultant: User;
}
