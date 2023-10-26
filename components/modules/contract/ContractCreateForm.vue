<script setup lang="ts">
import * as yup from "yup";
import { useForm } from "vee-validate";
import { createContract } from "~/services/ContractService";
import { Contract } from "~/types/entity/Contract";
import { getClients } from "~/services/ClientService";
import { getFormatList } from "~/helpers/contract";

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
  title: yup.string().required("Le nom est requis"),
});

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
const { handleSubmit, values } = useForm<Contract>({
  validationSchema: schema,
  initialValues: {
    format: "ON_LINE",
  },
});

// Submit
const submit = handleSubmit(async (values) => {
  return save();
});
const { submit: save, saving } = useAsyncSubmit({
  submitApiCall: () => createContract({ ...values, status: "OPEN" }),
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
      <ui-form-input-text
        name="title"
        type="text"
        label="Nom de la prestation"
        required
        placeholder="Préstation client"
      />
      <ui-form-input-text name="start_at" type="date" label="Début" required />
      <ui-form-input-text name="end_at" type="date" label="Fin" required />
      <ui-form-input-select
        name="format"
        label="Format"
        :items="getFormatList"
        required
      />
      <!--TODO: Add the type after -->
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
    </ui-card>
    <ui-card title="Information de contact" class="col-span-2">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4">
        <ui-form-input-text
          name="contact_email"
          type="text"
          label="Email de contact"
          required
          placeholder="jean.dupont@mail.com"
        />
        <ui-form-input-text
          name="contact_phone"
          type="text"
          label="Numéro de contact"
          required
          placeholder="0607070809"
        />
      </div>
    </ui-card>
  </div>

  <div class="flex items-center justify-end mt-4">
    <ui-button @click="submit" :loading="saving"> Ajouter </ui-button>
  </div>
</template>