import { Client } from "./Client";
import { Session } from "./Sessions";

export interface Contract {
  id: string;
  type: string;
  status: "OPEN" | "CLOSE";
  client: Client;
  sessions: Session[];
}
