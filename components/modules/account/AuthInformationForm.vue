<template>
  <ui-card title="Informations de connexion">
    <template #content>
      <div class="grid grid-cols-2 gap-x-4">
        <ui-form-input-text
          name="email"
          type="text"
          label="Email"
          placeholder="jean.dupont@mail.com"
          disabled
          class="col-span-2"
        />
        <ui-form-input-text
          name="password"
          type="password"
          label="Mot de passe"
          placeholder="*********"
          autocomplete="off"
        />
        <ui-form-input-text
          name="new_password"
          type="password"
          label="Nouveau mot de passe"
          placeholder="*********"
          autocomplete="off"
        />
      </div>
    </template>
    <template #bottomActions>
      <ui-button @click="submit()">Modifier</ui-button>
    </template>
  </ui-card>
</template>
<script lang="ts" setup>
// Imports
import * as yup from "yup";
import { useForm } from "vee-validate";
import { User } from "~/types/entity/User";
import { updatePassword } from "~/services/UserService";

// Data
const loading = ref<boolean>(false);

// Schema
const schema = yup.object({
  email: yup.string().required("L'email"),
  password: yup.string(),
  new_password: yup.string().min(6, "Le mot de passe toi contenir 6 caracètre"),
});

// Composables
const user = useState<User>("user");
const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    email: user.value.email,
    password: "",
    new_password: "",
  },
});

const submit = handleSubmit(async (values) => {
  loading.value = true;
  await updatePassword({
    password: values.password,
    new_password: values.new_password,
  });
  loading.value = false;
});
</script>
