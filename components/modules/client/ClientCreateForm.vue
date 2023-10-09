<script setup lang="ts">
import * as yup from "yup";
import { useForm } from "vee-validate";
import { EditableClient } from "~/types/entity/Client";
import { createClient } from "~/services/ClientService";

// Data
const loading = ref<boolean>(false);
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
const { handleSubmit, resetForm } = useForm<EditableClient>({
  validationSchema: schema,
});

const submit = handleSubmit(async (values) => {
  loading.value = true;
  const { error } = await createClient(values);
  if (!error) router.push("/modules/client");
  loading.value = false;
});
</script>
<template>
  <ui-page-header title="Création d'un client" :breadcrumbs="breadcrumbs" />
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <ui-card title="Informations">
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
    <ui-card title="Adresse">
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
  </div>

  <div class="flex items-center justify-end mt-4">
    <ui-button @click="submit" :loading="loading"> Ajouter </ui-button>
  </div>
</template>