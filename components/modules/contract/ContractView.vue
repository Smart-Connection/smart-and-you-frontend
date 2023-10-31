<script lang="ts" setup>
import { User } from "~/types/entity/User";
import { fetchContract, deleteContract } from "~/services/ContractService";
import { getStatus, getStatusColor } from "~/helpers/contract";

// Composable
const alert = useState("alert");
const user = useState<User>("user");
const route = useRoute();
const router = useRouter();
const id = route.params.id as string;

// Data
const { loading, data } = useAsyncData({
  promise: () => fetchContract({ id, params: { populate: "client" } }),
});

// Breadcrumbs
const breadcrumbs = computed(() => [
  {
    label: "List des prestations",
    path: "/modules/contract",
  },
  {
    label: data.value ? data.value.type : "Prestation",
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

// Functions
const removeContract = async () => {
  try {
    await deleteContract(id);
    alert.value = {
      type: "success",
      message: "Prestation correctement supprimé",
      status: true,
    };
    router.push("/modules/contract");
  } catch (e) {
    alert.value = {
      type: "success",
      message: "Une erreur est arrivé lors de la suppression de la prestation",
      status: true,
    };
  }
};
</script>
<template>
  <ui-page-header
    :title="data ? data.type : 'Prestation'"
    :breadcrumbs="breadcrumbs"
  >
    <ui-button
      v-if="user.role === 'SUPER_ADMIN'"
      @click="removeContract"
      color="error"
      class="mr-2"
    >
      Supprimer
    </ui-button>
    <nuxt-link
      v-if="user.role === 'SUPER_ADMIN'"
      :to="`/modules/contract/edit/${id}`"
    >
      <ui-button>Modifier</ui-button>
    </nuxt-link>
  </ui-page-header>
  <ui-table-info :loading="loading" :fields="fields">
    <template #item-status="{ item }">
      <ui-label :color="getStatusColor(item.value)">
        {{ getStatus(item.value) }}
      </ui-label>
    </template>
  </ui-table-info>
</template>
