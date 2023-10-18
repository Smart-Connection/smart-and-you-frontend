import { Pagination } from "~/types/api/Global";
import { Contract } from "~/types/entity/Contract";

export const getContracts = async (params?: {
  search?: string;
  page?: number;
  per_page?: number;
  status?: "OPEN" | "CLOSE";
}): Promise<Pagination<Contract[]>> => {
  return useFetchApi({
    url: "/contract",
    params: params,
  });
};

export const getContract = async (id: string): Promise<Contract> => {
  return useFetchApi<Contract>({
    url: `/contract/${id}`,
  });
};

export const createContract = async (form: Contract) => {
  return useFetchApi({ url: "/contract", method: "POST", body: form });
};

export const updateContract = async (form: Contract, id: string) => {
  return useFetchApi({ url: `/contract/${id}`, method: "PUT", body: form });
};

export const deleteContract = async (id: string) => {
  return useFetchApi({ url: `/contract/${id}`, method: "DELETE" });
};

// =================================================== Consultant

export const addConsultant = async (form: {
  user_id: string;
  contract_id: string;
}) => {
  return useFetchApi({
    url: "/contract/consultant",
    method: "POST",
    body: form,
  });
};

export const removeConsultant = async (
  form: { user_id: string },
  id: string
) => {
  return useFetchApi({
    url: `/contract/consultant/${id}`,
    method: "DELETE",
    body: form,
  });
};
