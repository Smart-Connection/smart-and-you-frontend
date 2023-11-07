import { Error, Pagination } from "~/types/api/Global";
import { EditableUser, User } from "~/types/entity/User";

export const fetchUsers = async (params?: {
  search?: string;
  page?: number;
  per_page?: number;
  role?: string;
  populate?: string;
}): Promise<Pagination<User[]>> => {
  return useFetchApi({
    url: "/users",
    params: params,
  });
};

export const fetchUser = (options: {
  id: string,
  params?: {
    populate?: string,
  }
}): Promise<User> => {
  return useFetchApi({
    url: `/users/${options.id}`,
    params: options.params
  });
};

export const insertUser = async (form: EditableUser) => {
  return useFetchApi({ url: "/users", method: "POST", body: form });
};

export const updateUser = async (id: string, form: EditableUser) => {
  return useFetchApi({
    url: `/users/${id}`,
    method: "PUT",
    body: form,
  });
};

export const deleteUser = async (id: string) => {
  return useFetchApi({
    url: `/users/${id}`,
    method: "DELETE",
  });
};

// =================================================== Me user
export const getMe = async (): Promise<User> => {
  return useFetchApi({
    url: "/me",
  });
};

export const updateMe = async (form: {
  firstname: string;
  lastname: string;
}) => {
  return useFetchApi({
    url: "/me",
    method: "PUT",
    body: form,
  });
};

export const updatePassword = async (form: {
  password: string;
  new_password: string;
}) => {
  return useFetchApi({
    url: "/me/update-password",
    method: "PUT",
    body: form,
  });
};

// =================================================== User email

export const resendEmail = async (id: string) => {
  const alert = useState("alert");

  await useFetchApi({
    url: `/users/resend-email/${id}`,
  });

  alert.value = {
    type: "success",
    message: "Email d'invitation renvoyé",
    status: true,
  };
};
