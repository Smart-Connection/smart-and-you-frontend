<script lang="ts" setup>
import { getClient } from "~/services/ClientService";
import {useAsyncData} from "~/composables/useAsyncData";


// Composable
const router = useRouter();
const route = useRoute();

// Data
const {
  loading,
  data,
  error
} = useAsyncData({
  promise: () =>
      getClient('9a47b73e-e2fc-4e36-aa4d-1883599f75be')
})

// Breadcrumbs
const breadcrumbs = computed(() => [
  {
    label: "List des clients",
    path: "/modules/client",
  },
  // {
  //   label: client.value?.name ?? "...",
  //   path: client.value?.id
  //     ? `/modules/client/${client.value.id}`
  //     : "/modules/client/create",
  // },
]);
</script>
<template>
  <ui-page-header title="Création d'un client" :breadcrumbs="breadcrumbs" />
  {{ loading }}
  {{ data }}
  {{ error }}
</template>
