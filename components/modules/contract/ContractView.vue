<script lang="ts" setup>
import { User } from "~/types/entity/User";
import { fetchContract, deleteContract } from "~/services/ContractService";
import { getStatus, getStatusColor } from "~/helpers/contract";
import { PencilIcon } from "@heroicons/vue/24/solid";

// Composable
const alert = useState("alert");
const user = useState<User>("user");
const route = useRoute();
const router = useRouter();
const id = route.params.id as string;

// Data
const { loading, data } = useAsyncData({
  promise: () => fetchContract({ id, params: { populate: "client,sessions" } }),
});

// Breadcrumbs
const breadcrumbs = computed(() => [
  {
    label: "List des prestations",
    path: "/modules/contract",
  },
  {
    label: data.value
      ? `${data.value.client.name} - ${data.value.type}`
      : "...",
    path: data.value?.id ? `/modules/contract/view/${id}` : "#",
  },
]);

// Fields
const fields = computed(() => {
  if (!data.value) return [];

  return [
    { label: "ID", value: data.value.id },
    { label: "Type", value: data.value.type },
    {
      label: "Client",
      value: data.value.client.name,
      to: `/modules/client/view/${data.value.client.id}`,
    },
    { label: "Status", key: "status", value: data.value.status },
  ];
});

// Delete
const { deleteFunction, deleting } = useAsyncDelete({
  delete: () => deleteContract(id),
  callback: () => router.push("/modules/contract"),
  messages: {
    error: "Une erreur est arrivé lors de la suppression de la prestation",
    success: "Prestation correctement supprimé",
  },
});
</script>
<template>
  <ui-page-header
    :title="data ? `${data.client.name} - ${data.type}` : 'Prestation'"
    :breadcrumbs="breadcrumbs"
  >
    <ui-delete-modal
      v-if="user.role === 'SUPER_ADMIN'"
      @confirm="deleteFunction"
      title="Suppression d'une prestation"
      :loading="deleting"
      rule-name="modules-session-delete"
      description="Si vous cliquez sur supprimer, cette prestation sera totalement supprimé et les sessions seront supprimé avec"
    />
    <ui-button route-name="modules-contract-edit-id" :route-params="{ id: id }">
      <PencilIcon class="-ml-0.5 mr-1.5 h-4 w-4" aria-hidden="true" />
      Modifier
    </ui-button>
  </ui-page-header>

  <!-- Résumé -->
  <ui-table-info :loading="loading" :fields="fields">
    <template #item-status="{ item }">
      <ui-label :color="getStatusColor(item.value)">
        {{ getStatus(item.value) }}
      </ui-label>
    </template>
  </ui-table-info>

  <!-- Sessions -->
  <modules-contract-components-sessions-list
    class="mt-4"
    :loading="loading"
    :sessions="data?.sessions"
  />
</template>
