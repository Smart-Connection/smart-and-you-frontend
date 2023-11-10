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

export const fetchSession = async (options: {
  id: string;
  params?: {
    populate?: string
  }
}): Promise<Session> => {
  return useFetchApi({
    url: `/sessions/${options.id}`,
    params: options.params,
  });
};

export const insertSession = async (form: Session) => {
  return useFetchApi({ url: "/sessions", method: "POST", body: form });
};

export const deleteSession = async (id: string) => {
  return useFetchApi({ url: `/sessions/${id}`, method: "DELETE" });
};