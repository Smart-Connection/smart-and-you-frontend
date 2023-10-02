<script lang="ts" setup>
import { reset } from "@/services/AuthService";
import * as yup from "yup";
import { useForm } from "vee-validate";

// Form
const schema = yup.object({
  password: yup.string().required("Le mot de passe est requis"),
  confirm: yup
    .string()
    .oneOf([yup.ref("password")], "Les mots de passe doivent correspondre")
    .required("Le mot de passe est requis"),
});
const { handleSubmit } = useForm<{
  password: string;
  confirm: string;
}>({
  validationSchema: schema,
});

// Composables
const alert = useState("alert");
const route = useRoute();

// Data
const loading = ref<boolean>(false);

const submit = handleSubmit(async (values) => {
  loading.value = true;
  if (route.query.token) {
    await reset({
      password: values.password,
      token: route.query.token as string,
    });
  } else {
    alert.value = {
      type: "error",
      message: "Token non valide",
      status: true,
    };
  }

  loading.value = false;
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
          label="Mot de passe"
          placeholder="***********"
          type="password"
          name="password"
        />
        <ui-form-input-text
          label="Confirmation du mot de passe"
          placeholder="***********"
          type="password"
          name="confirm"
        />

        <ui-button
          color="primary"
          type="submit"
          :loading="loading"
          block
          class="mt-10"
        >
          Modifier mon mot de passe
        </ui-button>
      </form>
    </div>
  </div>
</template>
