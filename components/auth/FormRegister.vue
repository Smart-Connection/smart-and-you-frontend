<script lang="ts" setup>
import { register } from "@/services/AuthService";
import * as yup from "yup";
import { useForm } from "vee-validate";

// Form
const schema = yup.object({
  firstname: yup.string().required("Le prénom est requis"),
  lastname: yup.string().required("Le nom est requis"),
  password: yup.string().required("Le mot de passe est requis"),
  confirm: yup
    .string()
    .oneOf([yup.ref("password")], "Les mots de passe doivent correspondre")
    .required("Le mot de passe est requis"),
});
const { handleSubmit } = useForm<{
  firstname: string;
  lastname: string;
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
  console.log(route.query);
  if (route.query.token) {
    await register({
      firstname: values.firstname,
      lastname: values.lastname,
      password: values.password,
      account_creation_token: route.query.token as string,
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
          label="Prénom"
          placeholder="Jean"
          type="text"
          name="firstname"
        />
        <ui-form-input-text
          label="Nom"
          placeholder="Dupont"
          type="text"
          name="lastname"
        />
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
          Inscription
        </ui-button>
      </form>
    </div>
  </div>
</template>
