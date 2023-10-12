import { Error, Pagination } from "~/types/api/Global";
import { EditableUser, User } from "~/types/entity/User";

export const getUsers = async (params?: {
  search?: string;
  page?: number;
}): Promise<Pagination<User[]>> => {
  return useFetchApi({
    url: "/user",
    params: params,
  });
};

export const deleteUser = async (id: string) => {
  return useFetchApi({
    url: `/user/${id}`,
    method: "DELETE",
  });
};

// =================================================== Me user
export const getMe = async (): Promise<User> => {
  return useFetchApi({
    url: "/me",
  });
};

// TODO:

export const getUser = () => {
  // Composables
  const alert = useState("alert");

  // Data
  const data = ref<User | null>();
  const loading = ref<boolean>(false);

  // Call api
  const execute = async (id: string) => {
    loading.value = true;
    const {
      data: response,
      error,
    }: { data: User | null; error: Error | null } = await useFetchApi({
      url: `/user/${id}`,
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

export const createUser = async (form: EditableUser) => {
  // Composables
  const alert = useState("alert");

  // Call api
  const { data, error }: { data: User | null; error: Error | null } =
    await useFetchApi({ url: "/user", method: "POST", body: form });
  if (error) {
    alert.value = {
      type: "error",
      message: error.message,
      status: true,
    };
  } else {
    alert.value = {
      type: "success",
      message: "Utilisateur créé",
      status: true,
    };
  }

  return { data, error };
};

export const editUser = async (id: string, form: EditableUser) => {
  // Composables
  const alert = useState("alert");

  // Call Api
  const { data, error }: { data: User | null; error: Error | null } =
    await useFetchApi({
      url: `/user/${id}`,
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
      message: "Utilisateur modifié",
      status: true,
    };
  }

  return { data, error };
};

export const updateUser = async (form: {
  firstname: string;
  lastname: string;
}) => {
  // Composables
  const alert = useState("alert");
  const user = useState("user");

  // Api
  const { data, error }: { data: User | null; error: Error | null } =
    await useFetchApi({
      url: "/me",
      method: "PUT",
      body: form,
    });

  if (error) {
    alert.value = {
      type: "error",
      message: "Email ou mot de passe incorrect",
      status: true,
    };
  } else if (data) {
    // Set user in store
    user.value = data;

    // Alert
    alert.value = {
      type: "success",
      message: "Information personnel mis à jour",
      status: true,
    };
  }
};

export const resendEmail = async (id: string) => {
  // Composables
  const alert = useState("alert");

  const { error, data } = await useFetchApi({
    url: `/user/resend-email/${id}`,
  });

  if (error) {
    alert.value = {
      type: "error",
      message: "Une erreur c'est produite",
      status: true,
    };
  } else if (data) {
    // Alert
    alert.value = {
      type: "success",
      message: "Email renvoyé avec succès",
      status: true,
    };
  }
};

export const updatePassword = async (form: {
  password: string;
  new_password: string;
}) => {
  // Composables
  const alert = useState("alert");

  // Api
  const {
    data,
    error,
  }: { data: { message: string } | null; error: Error | null } =
    await useFetchApi({
      url: "/me/update-password",
      method: "PUT",
      body: form,
    });

  if (error) {
    alert.value = {
      type: "error",
      message: "Mot de passe incorrect",
      status: true,
    };
  } else if (data) {
    // Alert
    alert.value = {
      type: "success",
      message: "Mot de passe mis à jour",
      status: true,
    };
  }
};
