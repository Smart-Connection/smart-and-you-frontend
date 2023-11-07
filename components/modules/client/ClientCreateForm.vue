<script setup lang="ts">
import { PlusIcon } from "@heroicons/vue/24/solid";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { Client } from "~/types/entity/Client";
import { insertClient } from "~/services/ClientService";

// Data
const breadcrumbs = [
  {
    label: "List des clients",
    path: "/modules/client",
  },
  {
    label: "Création d'un client",
    path: "/modules/user/create",
  },
];

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
const { handleSubmit, values } = useForm<Client>({
  validationSchema: schema,
});

const submit = handleSubmit(async (values) => {
  return save();
});
const { submit: save, saving } = useAsyncSubmit({
  submitApiCall: () => insertClient(values),
  messages: { success: "Client correctement créé" },
  callbackSuccess: () => router.push("/modules/client"),
});
</script>
<template>
  <ui-page-header title="Création d'un client" :breadcrumbs="breadcrumbs" />
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <ui-card title="Informations">
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
    <ui-card title="Adresse">
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
  </div>

  <div class="flex items-center justify-end mt-4">
    <ui-button @click="submit" :loading="saving">
      <PlusIcon class="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
      Ajouter
    </ui-button>
  </div>
</template>
