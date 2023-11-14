<script setup lang="ts">
import { PlusIcon } from "@heroicons/vue/24/solid";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { EditableUser } from "~/types/entity/User";
import { insertUser } from "~/services/UserService";
import { fetchClients } from "~/services/ClientService";
import { getRoleList } from "~/helpers/role";
import { Client } from "~/types/entity/Client";

// Form
const schema = yup.object().shape({
  email: yup
    .string()
    .email("L'email n'est pas valide")
    .required("L'email est requis"),
  role: yup.string().required("Le rôle est requis"),
  client: yup.string().when("role", {
    is: (role: string) => role === "CONSULTANT" || role === "SUPER_ADMIN",
    then: () => yup.string().required("Le client est requise"),
  }),
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
    fetchClients({
      search: clientSearchText.value,
      page: 1,
      per_page: 5,
    }),
});

// Submit
const submit = handleSubmit(() => {
  return save();
});
const { submit: save, saving } = useAsyncSubmit({
  submitApiCall: () => insertUser(values),
  messages: { success: "Utilisateur correctement créé" },
  callbackSuccess: () => router.push("/modules/user"),
});

// Search
const searchClient = (text: string) => {
  clientSearchText.value = text;
  reloadClients();
};

// Computed
const formatClients = computed(() => {
  if (clients.value) {
    return clients.value.data.map((client: Client) => {
      return {
        value: client.id,
        label: client.name,
      };
    });
  } else {
    return [];
  }
});
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
      v-if="values.role !== 'CONSULTANT' && values.role !== 'SUPER_ADMIN'"
      name="client"
      label="Client"
      required
      :items="formatClients"
      @change="searchClient"
      placeholder="Chercher un client"
    />
  </ui-card>
  <div class="flex items-center justify-end mt-4">
    <ui-button @click="submit" :loading="saving">
      <PlusIcon class="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
      Ajouter
    </ui-button>
  </div>
</template>
