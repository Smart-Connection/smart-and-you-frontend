<script lang="ts" setup>
import { forgot } from "@/services/AuthService";
import * as yup from "yup";
import { useForm } from "vee-validate";

// Composables
const alert = useState("alert");
const router = useRouter();

// Form
const schema = yup.object({
  email: yup
    .string()
    .email("L'email n'est pas valide")
    .required("L'email est requis"),
});
const { handleSubmit, values } = useForm<{ email: string }>({
  validationSchema: schema,
});

// Data
const submit = handleSubmit(() => {
  return save();
});
const { submit: save, saving } = useAsyncSubmit({
  submitApiCall: () => forgot(values),
  callbackSuccess: () => {
    alert.value = {
      type: "success",
      message: "Un email de vérification à été envoyé",
      status: true,
    };
    router.push("/auth/login");
  },
  noMessage: true,
});
</script>

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

        <ui-button
          color="primary"
          type="submit"
          :loading="saving"
          block
          class="mt-10"
        >
          Récupérer mon compte
        </ui-button>
      </form>
    </div>
  </div>
</template>
