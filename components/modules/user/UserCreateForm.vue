<script setup lang="ts">
import * as yup from "yup";
import { useForm } from "vee-validate";
import { EditableUser } from "~/types/entity/User";
import { createUser } from "~/services/UserService";
import { listClient } from "~/services/ClientService";
import { getRoleList } from "~/helpers/role";

// Data
const loading = ref<boolean>(false);
const breadcrumbs = [
  {
    label: "List des utilisateurs",
    path: "/modules/user",
  },
  {
    label: "Création d'un utilisateur",
    path: "/modules/user/create",
  },
];

// Form
const schema = yup.object().shape({
  email: yup
    .string()
    .email("L'email n'est pas valide")
    .required("L'email est requis"),
  role: yup.string().required("Le rôle est requis"),
  client: yup.string().required("Le client est requis"),
});

// Composable
const { data, execute } = listClient();
const router = useRouter();
const { handleSubmit, resetForm } = useForm<EditableUser>({
  validationSchema: schema,
  initialValues: {
    role: "USER",
  },
});

const submit = handleSubmit(async (values) => {
  loading.value = true;
  const { error } = await createUser(values);
  if (!error) router.push("/modules/user");
  loading.value = false;
});
</script>
<template>
  <ui-page-header
    title="Création d'un utilisateur"
    :breadcrumbs="breadcrumbs"
  />
  <ui-card title="Informations d'authentification">
    <template #content>
      <ui-form-input-text
        name="email"
        type="text"
        label="Email"
        required
        placeholder="jean.dupont@mail.com"
      />
      <ui-form-input-select
        name="role"
        label="Rôle"
        :items="getRoleList()"
        required
      />
      <ui-form-input-comboboxe
        name="client"
        item-key="id"
        item-label="name"
        label="Client"
        required
        :items="data"
        @change="execute({ search: $event, per_page: 5 })"
        placeholder="Chercher un client"
      />
    </template>
  </ui-card>
  <div class="flex items-center justify-end mt-4">
    <ui-button @click="submit" :loading="loading"> Ajouter </ui-button>
  </div>
</template>
