import { Client } from "./Client";
import { User } from "./User";

export interface Contract {
  id: string;
  type: string;
  start_at: string;
  end_at: string;
  client_id: string;
  format: "FACE_TO_FACE" | "ON_LINE";
  address: string;
  zipcode: string;
  city: string;
  status: "OPEN" | "CLOSE";
  contact_email: string;
  contact_phone: string;
  comment: string;
  created_at: string;
  updated_at: string;
  client: Client;
  consultants: User[];
}
