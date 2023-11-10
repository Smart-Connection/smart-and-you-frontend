<script lang="ts" setup>
import * as yup from "yup";
import { useForm } from "vee-validate";
import { getRoleList } from "~/helpers/role";
import { fetchUser, updateUser } from "~/services/UserService";
import { User } from "~/types/entity/User";
import { fetchClients } from "~/services/ClientService";
import { PencilIcon } from "@heroicons/vue/24/solid";
import { Client } from "~/types/entity/Client";

// Form
const schema = yup.object().shape({
  email: yup
    .string()
    .email("L'email n'est pas valide")
    .required("L'email est requis"),
  role: yup.string().required("Le rôle est requis"),
  firstname: yup.string().required("Le prénom est requis"),
  lastname: yup.string().required("Le nom est requis"),
  client_id: yup.string(),
});

// Composable
const router = useRouter();
const route = useRoute();
const id = route.params.id as string;
const { handleSubmit, resetForm, values } = useForm<User>({
  validationSchema: schema,
});

// Data
const clientSearchText = ref("");
const authUser = useState<User>("user");

// User data
const { loading, data } = useAsyncData({
  promise: () => fetchUser({ id, params: { populate: "client" } }),
  callback: () => {
    if (data) {
      resetForm({ values: data.value as User });
    }
  },
});

// Client list
const { execute: reloadClients, data: clients } = useAsyncData({
  promise: () =>
    fetchClients({
      search: clientSearchText.value,
      page: 1,
      per_page: 5,
    }),
});

// Breadcrumbs
const breadcrumbs = computed(() => [
  {
    label: "List des utilisateurs",
    path: "/modules/user",
  },
  {
    label: data.value?.firstname
      ? `${data.value?.firstname} ${data.value?.lastname}`
      : "Utilisateur",
    path: data.value?.id ? `/modules/user/edit/${data.value.id}` : "#",
  },
]);

// Computed
const disabled = computed(() => {
  if (authUser.value.role === "SUPER_ADMIN") return false;
  else if (
    authUser.value.role === "ADMIN" &&
    data.value?.role !== "SUPER_ADMIN"
  )
    return false;
  return true;
});

// Submit
const submit = handleSubmit(() => {
  return save();
});
const { submit: save, saving } = useAsyncSubmit({
  submitApiCall: () => updateUser(id, values),
  messages: { success: "Utilisateur correctement modifié" },
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
    :title="`${
      data?.firstname ? `${data?.firstname} ${data?.lastname}` : 'Utilisateur'
    }`"
    :breadcrumbs="breadcrumbs"
  />
  <ui-page-loader v-if="loading" />
  <div v-if="data && !loading" class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <ui-card
      title="Informations personnel"
      v-if="data.firstname"
      class="col-span-2 md:col-span-1"
    >
      <ui-form-input-text
        name="firstname"
        type="text"
        placeholder="Jean"
        label="Prénom"
        required
        :disabled="disabled"
      />
      <ui-form-input-text
        name="lastname"
        type="text"
        placeholder="Dupont"
        label="Nom"
        required
        :disabled="disabled"
      />
    </ui-card>
    <ui-card
      title="Informations d'authentification"
      :class="!data.firstname ? ' md:col-span-2' : 'col-span-2 md:col-span-1'"
    >
      <ui-form-input-text
        name="email"
        type="text"
        label="Email"
        required
        placeholder="jean.dupont@mail.com"
        :disabled="disabled"
      />
      <ui-form-input-select
        name="role"
        label="Rôle"
        :items="getRoleList(disabled)"
        required
        :disabled="disabled"
      />
      <ui-form-input-comboboxe
        v-if="authUser.role === 'SUPER_ADMIN'"
        name="client_id"
        label="Client"
        :items="formatClients"
        :default="data.client"
        @change="searchClient"
        placeholder="Chercher un client"
      />
    </ui-card>
    <div class="flex items-center justify-end col-span-2">
      <ui-button v-if="!disabled" @click="submit" :loading="saving">
        <PencilIcon class="-ml-0.5 mr-1.5 h-4 w-4" aria-hidden="true" />
        Modifier
      </ui-button>
    </div>
  </div>
</template>
