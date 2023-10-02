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

export const loadUser = async () => {
  // Composables
  const alert = useState("alert");
  const user = useState("user");
  const config = useRuntimeConfig();

  const { data, error }: { data: LoginResponse | null; error: Error | null } =
    await useFetchApi({
      url: "/me",
      method: "GET",
    });

  if (!error) {
    user.value = data;
  }
};
