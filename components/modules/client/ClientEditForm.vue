<script lang="ts" setup>
import * as yup from "yup";
import { useForm } from "vee-validate";
import { getClient, editClient, deleteClient } from "~/services/ClientService";
import { Client } from "~/types/entity/Client";

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

// Composables
const router = useRouter();
const route = useRoute();
const id: string = route.params.id as string;
const { handleSubmit, resetForm, values } = useForm<Client>({
  validationSchema: schema,
});

// Data
const { loading, data } = useAsyncData({
  promise: () => getClient(id),
  callback: () => {
    if (data) {
      resetForm({ values: data.value as Client });
    }
  },
});

// Breadcrumbs
const breadcrumbs = computed(() => [
  {
    label: "List des clients",
    path: "/modules/client",
  },
  {
    label: data.value?.name ?? "...",
    path: data.value?.id ? `/modules/client/edit/${data.value.id}` : "#",
  },
]);

// Submit
const submit = handleSubmit(async (values) => {
  return save();
});
const { submit: save, saving } = useAsyncSubmit({
  submitApiCall: () => editClient(id, values),
  messages: { success: "Client modifié avec succès" },
  callbackSuccess: () => router.push(`/modules/client/view/${id}`),
});

const { deleteFunction, deleting } = useAsyncDelete({
  delete: () => deleteClient(id),
  callback: () => router.push("/modules/client"),
  messages: {
    error: "Une erreur est arrivé lors de le suppression du client",
    success: "Client correctement supprimé",
  },
});
</script>
<template>
  <ui-page-header :title="data?.name ?? '...'" :breadcrumbs="breadcrumbs" />
  <ui-page-loader v-if="loading" />
  <div v-if="data && !loading" class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <ui-card title="Informations" class="col-span-2 md:col-span-1">
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
    </ui-card>
    <ui-card title="Adresse" class="col-span-2 md:col-span-1">
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
    </ui-card>

    <div class="flex items-center justify-end col-span-2">
      <ui-delete-modal
        @confirm="deleteFunction"
        title="Suppression d'un client"
        :loading="deleting"
        description="Si vous cliquez sur supprimer, ce client sera totalement supprimé et les utilisateurs n'auront plus d'entreprise associer"
      />
      <ui-button @click="submit" class="ml-2" :loading="saving">
        Modifier
      </ui-button>
    </div>
  </div>
</template>
