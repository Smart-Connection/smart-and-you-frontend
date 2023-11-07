<script setup lang="ts">
import * as yup from "yup";
import { useForm } from "vee-validate";
import { insertContract } from "~/services/ContractService";
import { Contract } from "~/types/entity/Contract";
import { fetchClients } from "~/services/ClientService";
import { getTypeList } from "~/helpers/contract";
import { PlusIcon } from "@heroicons/vue/24/solid";

// Data
const clientSearchText = ref("");
const breadcrumbs = [
  {
    label: "List des prestations",
    path: "/modules/client",
  },
  {
    label: "Création d'une prestation",
    path: "/modules/contract/create",
  },
];

// Form
const schema = yup.object().shape({
  type: yup.string().required("Le nom est requis"),
});

// Client list
const { execute: reloadClients, data: clients } = useAsyncData({
  promise: () =>
    fetchClients({
      search: clientSearchText.value,
      per_page: 5,
      page: 1,
    }),
});

// Composable
const router = useRouter();
const { handleSubmit, values } = useForm<Contract>({
  validationSchema: schema,
  initialValues: {
    type: "QVT",
  },
});

// Submit
const submit = handleSubmit(async () => {
  return save();
});
const { submit: save, saving } = useAsyncSubmit({
  submitApiCall: () => insertContract({ ...values, status: "OPEN" }),
  messages: { success: "Prestation correctement créée" },
  callbackSuccess: () => router.push("/modules/contract"),
});

// Search
const searchClient = (text: string) => {
  clientSearchText.value = text;
  reloadClients();
};
</script>
<template>
  <ui-page-header
    title="Création d'une prestation"
    :breadcrumbs="breadcrumbs"
  />
  <div class="grid grid-cols-1 md:grid-cols-2 gap-x-0 gap-y-4 md:gap-4">
    <ui-card title="Prestation">
      <ui-form-input-select
        name="type"
        label="Type de la prestation"
        :items="getTypeList"
        required
      />
    </ui-card>
    <ui-card title="Client" class="md:col-span-1 col-span-2">
      <ui-form-input-comboboxe
        name="client_id"
        item-key="id"
        item-label="name"
        label="Client"
        required
        :items="clients"
        @change="searchClient"
        placeholder="Chercher un client"
      />
    </ui-card>
  </div>

  <div class="flex items-center justify-end mt-4">
    <ui-button @click="submit" :loading="saving">
      <PlusIcon class="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
      Ajouter
    </ui-button>
  </div>
</template>
