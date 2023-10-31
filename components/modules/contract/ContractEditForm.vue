<script setup lang="ts">
import * as yup from "yup";
import { useForm } from "vee-validate";
import { updateContract, fetchContract } from "~/services/ContractService";
import { Contract } from "~/types/entity/Contract";
import { getClients } from "~/services/ClientService";
import { getTypeList, getStatusList } from "~/helpers/contract";

// Form
const schema = yup.object().shape({
  type: yup.string().required("Le type est requis"),
  status: yup.string().required("Le status est requis"),
  client_id: yup.string().required("Le client est requis"),
});
const { handleSubmit, resetForm, values } = useForm<Contract>({
  validationSchema: schema,
});

// Data
const route = useRoute();
const id = route.params.id as string;
const clientSearchText = ref("");

// Contract
const { data: contract, loading } = useAsyncData({
  promise: () => fetchContract({ id, params: { populate: "client" } }),
  callback: () => {
    if (contract) {
      resetForm({ values: contract.value as Contract });
    }
  },
});

// Bredcrumbs
const breadcrumbs = computed(() => [
  {
    label: "List des prestations",
    path: "/modules/contract",
  },
  {
    label: contract.value ? contract.value.type : "...",
    path: contract.value ? `/modules/contract/edit/${contract.value.id}` : "#",
  },
]);

// Client list
const { execute: reloadClients, data: clients } = useAsyncData({
  promise: () =>
    getClients({
      search: clientSearchText.value,
      per_page: 5,
    }),
});

// Composable
const router = useRouter();

// Submit
const submit = handleSubmit(async () => {
  console.log(values);
  return save();
});
const { submit: save, saving } = useAsyncSubmit({
  submitApiCall: () => updateContract({ ...values }, id),
  messages: { success: "Prestation correctement modifié" },
  callbackSuccess: () => {
    router.push(`/modules/contract/view/${id}`);
  },
});

// Search
const searchClient = (text: string) => {
  clientSearchText.value = text;
  reloadClients();
};
</script>
<template>
  <ui-page-header
    :title="contract ? contract.type : '...'"
    :breadcrumbs="breadcrumbs"
  />
  <ui-page-loader v-if="loading" />
  <div
    v-if="contract && !loading"
    class="grid grid-cols-1 md:grid-cols-2 gap-x-0 gap-y-4 md:gap-4"
  >
    <ui-card title="Prestation">
      <ui-form-input-select
        name="type"
        label="Type de la prestation"
        :items="getTypeList"
        required
      />
      <ui-form-input-select
        name="status"
        label="Status"
        :items="getStatusList"
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
        :default="contract.client"
        @change="searchClient"
        placeholder="Chercher un client"
      />
    </ui-card>
  </div>

  <div class="flex items-center justify-end mt-4">
    <ui-button @click="submit" :loading="saving"> Modifier </ui-button>
  </div>
</template>
