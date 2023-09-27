import { Error, Pagination } from "~/types/api/Global";
import { User } from "~/types/entity/User";

export const listUser = () => {
  // Composables
  const alert = useState("alert");

  // Data
  const data = ref<Pagination<User> | null>();

  // Call api
  const execute = async (params: { page?: number; search?: string }) => {
    const { data: response, error }: { data: null; error: Error | null } =
      await useFetchApi({
        url: "/user",
        params: params,
      });

    data.value = response;

    if (error) {
      alert.value = {
        type: "error",
        message:
          "Il y a eu une erreur lors de la récupération des utilisateurs",
        status: true,
      };
    }
  };

  return { data, execute };
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
