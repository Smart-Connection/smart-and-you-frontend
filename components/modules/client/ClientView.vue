<script lang="ts" setup>
import { fetchClient, deleteClient } from "~/services/ClientService";
import { PencilIcon } from "@heroicons/vue/24/solid";

// Composable
const route = useRoute();
const router = useRouter();
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

// Delete
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
  <ui-page-header :title="data?.name ?? 'Client'" :breadcrumbs="breadcrumbs">
    <ui-delete-modal
      @confirm="deleteFunction"
      title="Suppression d'un client"
      :loading="deleting"
      description="Si vous cliquez sur supprimer, ce client sera totalement supprimé et les utilisateurs n'auront plus d'entreprise associer"
    />
    <ui-button route-name="modules-client-edit-id" :route-params="{ id: id }">
      <PencilIcon class="-ml-0.5 mr-1.5 h-4 w-4" aria-hidden="true" />
      Modifier
    </ui-button>
  </ui-page-header>
  <ui-table-info :loading="loading" :fields="fields" />
</template>
