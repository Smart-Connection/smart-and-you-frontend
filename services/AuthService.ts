import type { LoginResponse, RegisterRequest } from "@/types/api/Auth";
import { Error } from "~/types/api/Global";

export const login = async (form: { email: string; password: string }) => {
  // Composables
  const config = useRuntimeConfig();
  const user = useState("user");
  const alert = useState("alert");
  const router = useRouter();
  const token = useCookie("token", {
    maxAge: parseInt(config.public.maxAuthCookieAge),
  });

  const { data, error }: { data: LoginResponse | null; error: Error | null } =
    await useFetchApi({
      url: "/auth/login",
      method: "POST",
      body: form,
    });

  if (error) {
    alert.value = {
      type: "error",
      message: "Email ou mot de passe incorrect",
      status: true,
    };
  } else if (data) {
    // Token
    token.value = data.authorization.token;

    // Set user in store
    user.value = data.user;

    // Redirect to home
    const { home } = useRouteList();
    router.push({ name: home?.name });
  }
};

export const register = async (form: RegisterRequest) => {
  // Composables
  const config = useRuntimeConfig();
  const user = useState("user");
  const alert = useState("alert");
  const router = useRouter();
  const token = useCookie("token", {
    maxAge: parseInt(config.public.maxAuthCookieAge),
  });

  const { data, error }: { data: LoginResponse | null; error: Error | null } =
    await useFetchApi({
      url: "/auth/register",
      method: "POST",
      body: form,
    });

  if (error) {
    alert.value = {
      type: "error",
      message: "Une erreur c'est produite",
      status: true,
    };
  } else if (data) {
    // Token
    token.value = data.authorization.token;

    // Set user in store
    user.value = data.user;

    // Redirect to home
    const { home } = useRouteList();
    router.push({ name: home?.name });
  }
};

export const loadUser = async () =>
  useFetchApi({
    url: "/me",
    method: "GET",
  });

export const forgot = async (form: { email: string }) => {
  // Composables
  const alert = useState("alert");

  const { data, error }: { data: LoginResponse | null; error: Error | null } =
    await useFetchApi({
      url: "/auth/forgot-password",
      method: "POST",
      body: form,
    });

  if (!error) {
    alert.value = {
      type: "success",
      message: "Un email de vérification à été envoyé",
      status: true,
    };
  } else {
    alert.value = {
      type: "error",
      message: error.message,
      status: true,
    };
  }
};

export const reset = async (form: { password: string; token: string }) => {
  // Composables
  const config = useRuntimeConfig();
  const alert = useState("alert");
  const router = useRouter();

  const { data, error }: { data: LoginResponse | null; error: Error | null } =
    await useFetchApi({
      url: "/auth/reset",
      method: "POST",
      body: form,
    });

  if (error) {
    alert.value = {
      type: "error",
      message: error,
      status: true,
    };
  } else {
    alert.value = {
      type: "success",
      message: "Mot de passe modifié avec succès",
      status: true,
    };
    router.push("/auth/login");
  }
};
