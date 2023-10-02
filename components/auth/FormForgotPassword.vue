<script lang="ts" setup>
import { forgot } from "@/services/AuthService";
import * as yup from "yup";
import { useForm } from "vee-validate";

// Form
const schema = yup.object({
  email: yup
    .string()
    .email("L'email n'est pas valide")
    .required("L'email est requis"),
});
const { handleSubmit } = useForm<{ email: string; password: string }>({
  validationSchema: schema,
});

// Data
const loading = ref<boolean>(false);

const submit = handleSubmit(async (values) => {
  loading.value = true;
  await forgot(values);
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
          label="Email"
          placeholder="Jean.dupont@mail.com"
          type="text"
          name="email"
        />

        <ui-button
          color="primary"
          type="submit"
          :loading="loading"
          block
          class="mt-10"
        >
          Récupérer mon compte
        </ui-button>
      </form>
    </div>
  </div>
</template>
