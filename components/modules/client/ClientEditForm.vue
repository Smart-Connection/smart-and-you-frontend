<script lang="ts" setup>
import * as yup from "yup";
import { useForm } from "vee-validate";
import { getClient, editClient, deleteClient } from "~/services/ClientService";
import { EditableClient } from "~/types/entity/Client";

// Form
const schema = yup.object().shape({
  name: yup.string().required("Le nom est requis"),
  siret: yup
    .string()
    .matches(/^[0-9]+$/, "Le siret ne dois contenir uniquement des chiffres")
    .min(14, "Le numéro de siret doit avoir 14 chiffre")
    .required("Le siret est requis"),
  address: yup.string().required("l'adresse est requise"),
  zipcode: yup.string().required("Le champs code postal est requis"),
  city: yup.string().required("Le champs ville est requis"),
  country: yup.string().required("le champs ville est requis"),
});

// Composable
const router = useRouter();
const route = useRoute();
const { data: client, loading: userLoading, execute } = getClient();
const { handleSubmit, resetForm } = useForm<EditableClient>({
  validationSchema: schema,
});

// Data
const loading = ref<boolean>(false);
const pageLoading = ref<boolean>(true);

// Init
if (route.params.id) {
  await execute(route.params.id as string);
  if (client.value) {
    resetForm({ values: client.value });
  } else {
    router.push("/modules/client");
  }
}

// Breadcrumbs
const breadcrumbs = computed(() => [
  {
    label: "List des clients",
    path: "/modules/client",
  },
  {
    label: client.value?.name ?? "...",
    path: client.value?.id
      ? `/modules/client/${client.value.id}`
      : "/modules/client/create",
  },
]);

// Functions
const submit = handleSubmit(async (values) => {
  loading.value = true;
  if (client.value) {
    const { error } = await editClient(client.value.id, values);
    if (!error) router.push("/modules/client");
  }
  loading.value = false;
});

const deleteModal = async () => {
  if (client.value) {
    const { error } = await deleteClient(client.value.id);
    if (!error) router.push("/modules/client");
  }
};
</script>
<template>
  <ui-page-header title="Création d'un client" :breadcrumbs="breadcrumbs" />
  <p v-if="!pageLoading">Charge</p>
  <div v-if="client" class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <ui-card title="Informations" class="col-span-2 md:col-span-1">
      <template #content>
        <ui-form-input-text
          name="name"
          type="text"
          label="Nom"
          required
          placeholder="Mon entreprise"
        />
        <ui-form-input-text
          name="siret"
          type="text"
          label="Siret"
          required
          placeholder="12345678901234"
        />
      </template>
    </ui-card>
    <ui-card title="Adresse" class="col-span-2 md:col-span-1">
      <template #content>
        <ui-form-input-text
          name="address"
          type="text"
          label="Adresse"
          required
          placeholder="1 avenue du louvre"
        />
        <ui-form-input-text
          name="zipcode"
          type="text"
          label="Code postal"
          required
          placeholder="75001"
        />
        <ui-form-input-text
          name="city"
          type="text"
          label="Ville"
          required
          placeholder="Paris"
        />
        <ui-form-input-text
          name="country"
          type="text"
          label="Pays"
          required
          placeholder="France"
        />
      </template>
    </ui-card>

    <div class="flex items-center justify-end col-span-2">
      <ui-delete-modal
        @confirm="deleteModal"
        title="Suppression d'un client"
        description="Si vous cliquez sur supprimer, ce client sera totalement supprimé et les utilisateurs n'auront plus d'entreprise associer"
      />
      <ui-button @click="submit" class="ml-2" :loading="loading">
        Modifier
      </ui-button>
    </div>
  </div>
</template>
