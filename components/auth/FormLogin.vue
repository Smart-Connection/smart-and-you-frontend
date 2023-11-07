<template>
  <div class="w-full sm:p-0 p-4 flex items-center flex-col">
    <div class="w-[200px] flex items-center justify-center rounded-md">
      <img src="@/assets/logo/logo-dark.png" />
    </div>
    <div
      class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12 mt-10 w-full sm:w-[480px]"
    >
      <form @submit.prevent="submit()">
        <ui-form-input-text
          label="Email"
          placeholder="Jean.dupont@mail.com"
          type="text"
          name="email"
        />
        <ui-form-input-text
          label="Mot de passe"
          placeholder="***********"
          type="password"
          name="password"
        />

        <div class="flex items-center justify-between mt-6">
          <div class="text-sm">
            <nuxt-link
              class="font-semibold text-indigo-600 hover:text-indigo-500"
              to="/auth/forgot-password"
            >
              Mot de passe oublié ?
            </nuxt-link>
          </div>
        </div>

        <ui-button
          color="primary"
          type="submit"
          :loading="saving"
          block
          class="mt-10"
        >
          Connexion
        </ui-button>
      </form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { login } from "@/services/AuthService";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { LoginResponse } from "~/types/api/Auth";

// Composables
const router = useRouter();
const config = useRuntimeConfig();
const token = useCookie("token", {
  maxAge: parseInt(config.public.maxAuthCookieAge),
});
const user = useState("user");

// Form
const schema = yup.object({
  email: yup
    .string()
    .email("L'email n'est pas valide")
    .required("L'email est requis"),
  password: yup.string().required("Le mot de passe est requis"),
});
const { handleSubmit, values } = useForm<{ email: string; password: string }>({
  validationSchema: schema,
});

// Data
const submit = handleSubmit(() => {
  return save();
});
const { submit: save, saving } = useAsyncSubmit({
  submitApiCall: () => login(values),
  callbackSuccess: (data: LoginResponse) => {
    token.value = data.authorization.token;
    user.value = data.user;
    const { home } = useRouteList();
    router.push({ name: home?.name });
  },
  noMessage: true,
});
</script>
