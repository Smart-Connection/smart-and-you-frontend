import type { LoginResponse } from "@/types/api/Auth";
import { useStorage } from "@vueuse/core";
import { Error } from "~/types/api/Global";

export const login = async (form: { email: string; password: string }) => {
  // Composables
  const token = useState("token");
  const user = useState("user");
  const alert = useState("alert");
  const router = useRouter();

  const { data, error }: { data: LoginResponse; error: Error | null } =
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
  } else {
    useStorage("token", data.authorization.token);
    token.value = data.authorization.token;
    user.value = data.user;
    router.push("/");
  }
};
