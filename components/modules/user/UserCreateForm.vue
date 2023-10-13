<script setup lang="ts">
import * as yup from "yup";
import { useForm } from "vee-validate";
import { EditableUser } from "~/types/entity/User";
import { createUser } from "~/services/UserService";
import { getClients } from "~/services/ClientService";
import { getRoleList } from "~/helpers/role";

// Form
const schema = yup.object().shape({
  email: yup
    .string()
    .email("L'email n'est pas valide")
    .required("L'email est requis"),
  role: yup.string().required("Le rôle est requis"),
  client: yup.string(),
});

// Composable
const router = useRouter();
const { handleSubmit, values } = useForm<EditableUser>({
  validationSchema: schema,
  initialValues: {
    role: "USER",
  },
});

// Data
const clientSearchText = ref("");
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

// Client list
const { execute: reloadClients, data: clients } = useAsyncData({
  promise: () =>
    getClients({
      search: clientSearchText.value,
      per_page: 5,
    }),
});

// Submit
const submit = handleSubmit(() => {
  return save();
});
const { submit: save, saving } = useAsyncSubmit({
  submitApiCall: () => createUser(values),
  messages: { success: "Utilisateur correctement créé" },
  callbackSuccess: () => router.push("/modules/user"),
});

// Search
const searchClient = (text: string) => {
  clientSearchText.value = text;
  reloadClients();
};
</script>
<template>
  <ui-page-header
    title="Création d'un utilisateur"
    :breadcrumbs="breadcrumbs"
  />
  <ui-card title="Informations d'authentification">
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
      :items="clients"
      @change="searchClient"
      placeholder="Chercher un client"
    />
  </ui-card>
  <div class="flex items-center justify-end mt-4">
    <ui-button @click="submit" :loading="saving"> Ajouter </ui-button>
  </div>
</template>
