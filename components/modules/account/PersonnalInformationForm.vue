<template>
  <ui-card title="Informations personnel">
    <template #content>
      <div class="grid grid-cols-2 gap-4">
        <ui-form-input-text
          name="firstname"
          type="text"
          label="Prénom"
          placeholder="Jean"
          required
        />
        <ui-form-input-text
          name="lastname"
          type="text"
          label="Nom"
          placeholder="Dupont"
          required
        />
      </div>
    </template>
    <template #bottomActions>
      <ui-button @click="submit()" :loading="loading">Modifier</ui-button>
    </template>
  </ui-card>
</template>
<script lang="ts" setup>
// Imports
import * as yup from "yup";
import { useForm } from "vee-validate";
import { User } from "~/types/entity/User";
import { updateUser } from "~/services/UserService";

// Data
const loading = ref<boolean>(false);

// Schema
const schema = yup.object({
  firstname: yup.string().required("Le prénom est requis"),
  lastname: yup.string().required("Le nom est requis"),
});

// Composables
const user = useState<User>("user");
const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    firstname: user.value.firstname,
    lastname: user.value.lastname,
  },
});

const submit = handleSubmit(async (values) => {
  loading.value = true;
  await updateUser(values);
  loading.value = false;
});
</script>
