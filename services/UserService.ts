import { Error, Pagination } from "~/types/api/Global";
import { EditableUser, User } from "~/types/entity/User";

export const getUsers = async (params?: {
  search?: string;
  page?: number;
  per_page?: number;
  role?: string;
}): Promise<Pagination<User[]>> => {
  return useFetchApi({
    url: "/user",
    params: params,
  });
};

export const getUser = (id: string): Promise<User> => {
  return useFetchApi({
    url: `/user/${id}`,
  });
};

export const createUser = async (form: EditableUser) => {
  return useFetchApi({ url: "/user", method: "POST", body: form });
};

export const editUser = async (id: string, form: EditableUser) => {
  return useFetchApi({
    url: `/user/${id}`,
    method: "PUT",
    body: form,
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
    url: `/user/resend-email/${id}`,
  });

  alert.value = {
    type: "success",
    message: "Email d'invitation renvoyé",
    status: true,
  };
};
