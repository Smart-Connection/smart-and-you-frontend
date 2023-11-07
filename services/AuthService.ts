import type { RegisterRequest } from "@/types/api/Auth";

export const login = async (form: { email: string; password: string }) => {
  return useFetchApi({
    url: "/auth/login",
    method: "POST",
    body: form,
  });
};

export const register = async (form: RegisterRequest) => {
  return useFetchApi({
    url: "/auth/register",
    method: "POST",
    body: form,
  });
};

export const loadUser = async () =>
  useFetchApi({
    url: "/me",
    method: "GET",
  });

export const forgot = async (form: { email: string }) => {
  return useFetchApi({
    url: "/auth/forgot-password",
    method: "POST",
    body: form,
  });
};

export const reset = async (form: { password: string; token: string }) => {
  return useFetchApi({
    url: "/auth/reset",
    method: "POST",
    body: form,
  });
};

export const logout = async () => {
  const token = useCookie("token");
  token.value = null
  return useFetchApi({
    url: "/auth/logout",
    method: "GET",
  });
};