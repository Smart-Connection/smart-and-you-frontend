<script lang="ts" setup>
import { fetchClient } from "~/services/ClientService";

// Composable
const route = useRoute();
const id = route.params.id as string;

// Data
const { loading, data, error } = useAsyncData({
  promise: () => fetchClient({ id }),
});

// Breadcrumbs
const breadcrumbs = computed(() => [
  {
    label: "List des clients",
    path: "/modules/client",
  },
  {
    label: data.value?.name ?? "Client",
    path: data.value?.id ? `/modules/client/view/${data.value.id}` : "#",
  },
]);

// Fields
const fields = computed(() => {
  if (!data.value) return [];

  return [
    { label: "ID", value: data.value.id },
    { label: "Nom de l'entreprise", value: data.value.name },
    { label: "Siret", value: data.value.siret },
    { label: "Adresse", value: data.value.address },
    { label: "Ville", value: data.value.city },
    { label: "Code postal", value: data.value.zipcode },
    { label: "Pays", value: data.value.country },
  ];
});
</script>
<template>
  <ui-page-header :title="data?.name ?? 'Client'" :breadcrumbs="breadcrumbs">
    <nuxt-link :to="`/modules/client/edit/${id}`">
      <ui-button>Modifier</ui-button>
    </nuxt-link>
  </ui-page-header>
  <ui-table-info :loading="loading" :fields="fields" />
</template>
