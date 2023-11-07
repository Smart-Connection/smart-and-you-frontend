import { Pagination } from "~/types/api/Global";
import { Contract } from "~/types/entity/Contract";

export const fetchContracts = async (params?: {
  search?: string;
  page?: number;
  per_page?: number;
  status?: "OPEN" | "CLOSE";
  populate?: string,
}): Promise<Pagination<Contract[]>> => {
  return useFetchApi({
    url: "/contracts",
    params: params,
  });
};

export const fetchContract = async (options: {
  id: string,
  params?: {
    populate?: string,
  }
}): Promise<Contract> => {
  return useFetchApi<Contract>({
    url: `/contracts/${options.id}`,
    params: options.params
  });
};

export const insertContract = async (form: Contract) => {
  return useFetchApi({ url: "/contracts", method: "POST", body: form });
};

export const updateContract = async (form: Contract, id: string) => {
  return useFetchApi({ url: `/contract/${id}`, method: "PUT", body: form });
};

export const deleteContract = async (id: string) => {
  return useFetchApi({ url: `/contracts/${id}`, method: "DELETE" });
};