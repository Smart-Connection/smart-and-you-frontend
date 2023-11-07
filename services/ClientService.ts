import { Pagination } from "~/types/api/Global";
import { Client } from "~/types/entity/Client";

export const fetchClients = async (params?: {
  search?: string;
  page?: number;
  per_page?: number;
  populate?: string;
}): Promise<Pagination<Client[]>> => {
  return useFetchApi({
    url: "/clients",
    params: params,
  });
};

export const fetchClient = async (options: {
  id: string,
  params?: {
    populate?: string,
  }
}): Promise<Client> => {
  return useFetchApi<Client>({
    url: `/clients/${options.id}`,
    params: options.params
  });
};

export const insertClient = async (form: Client) => {
  return useFetchApi({ url: "/clients", method: "POST", body: form });
};

export const updateClient = async (id: string, form: Client) => {
  return useFetchApi({
    url: `/clients/${id}`,
    method: "PUT",
    body: form,
  });
};

export const deleteClient = async (id: string) => {
  return useFetchApi({
    url: `/clients/${id}`,
    method: "DELETE",
  });
};
