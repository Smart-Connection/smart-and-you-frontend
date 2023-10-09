import { Error, Pagination } from "~/types/api/Global";
import { Client, EditableClient } from "~/types/entity/Client";

export const listClient = (options?: { initCall: boolean }) => {
  // Composables
  const alert = useState("alert");

  // Data
  const data = ref<Pagination<Client> | null>();

  // Call api
  const execute = async (params?: {
    page?: number;
    per_page?: number;
    search?: string;
  }) => {
    const {
      data: response,
      error,
    }: { data: null | Pagination<Client>; error: Error | null } =
      await useFetchApi({
        url: "/client",
        params: params,
      });

    data.value = response;

    if (error) {
      alert.value = {
        type: "error",
        message: "Il y a eu une erreur lors de la récupération des clients",
        status: true,
      };
    }
  };

  return { data, execute };
};

export const getClient = () => {
  // Composables
  const alert = useState("alert");

  // Data
  const data = ref<Client | null>();
  const loading = ref<boolean>(false);

  // Call api
  const execute = async (id: string) => {
    loading.value = true;
    const {
      data: response,
      error,
    }: { data: Client | null; error: Error | null } = await useFetchApi({
      url: `/client/${id}`,
    });

    data.value = response;
    if (error) {
      alert.value = {
        type: "error",
        message: error.message,
        status: true,
      };
    }
    loading.value = true;
  };

  return { data, execute, loading };
};

export const createClient = async (form: EditableClient) => {
  // Composables
  const alert = useState("alert");

  // Call api
  const { data, error }: { data: Client | null; error: Error | null } =
    await useFetchApi({ url: "/client", method: "POST", body: form });
  if (error) {
    alert.value = {
      type: "error",
      message: error.message,
      status: true,
    };
  } else {
    alert.value = {
      type: "success",
      message: "Client créé",
      status: true,
    };
  }

  return { data, error };
};

export const editClient = async (id: string, form: EditableClient) => {
  // Composables
  const alert = useState("alert");

  // Call Api
  const { data, error }: { data: Client | null; error: Error | null } =
    await useFetchApi({
      url: `/client/${id}`,
      method: "PUT",
      body: form,
    });

  if (error) {
    alert.value = {
      type: "error",
      message: error.message,
      status: true,
    };
  } else {
    alert.value = {
      type: "success",
      message: "Client modifié",
      status: true,
    };
  }

  return { data, error };
};

export const deleteClient = async (id: string) => {
  // Composables
  const alert = useState("alert");

  // Call Api
  const { data, error }: { data: Client | null; error: Error | null } =
    await useFetchApi({
      url: `/client/${id}`,
      method: "DELETE",
    });

  if (error) {
    alert.value = {
      type: "error",
      message: error.message,
      status: true,
    };
  } else {
    alert.value = {
      type: "success",
      message: "Client supprimé",
      status: true,
    };
  }

  return { data, error };
};
