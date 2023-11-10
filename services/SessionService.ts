import { Pagination } from "~/types/api/Global";
import { Contract } from "~/types/entity/Contract";
import { Session } from "~/types/entity/Sessions";

export const fetchSessions = async (params?: {
  populate?: string;
  page?: number;
  per_page?: number;
  start_at?: string;
  end_at?: string;
}): Promise<Session[]> => {
  return useFetchApi({
    url: "/sessions",
    params: params,
  });
};

export const insertSession = async (form: Session) => {
  return useFetchApi({ url: "/sessions", method: "POST", body: form });
};