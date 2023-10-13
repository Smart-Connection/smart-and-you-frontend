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
