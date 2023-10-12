import { Pagination } from "~/types/api/Global";
import { Client } from "~/types/entity/Client";

export const getClients = async (params?: {
  search?: string;
  page?: number;
}): Promise<Pagination<Client[]>> => {
  return useFetchApi({
    url: "/client",
    params: params,
  });
};

export const getClient = async (id: string): Promise<Client> => {
  return useFetchApi<Client>({
    url: `/client/${id}`,
  });
};

export const editClient = async (id: string, form: Client) => {
  return useFetchApi({
    url: `/client/${id}`,
    method: "PUT",
    body: form,
  });
};

export const deleteClient = async (id: string) => {
  return useFetchApi({
    url: `/client/${id}`,
    method: "DELETE",
  });
};

export const createClient = async (form: Client) => {
  return useFetchApi({ url: "/client", method: "POST", body: form });
};
