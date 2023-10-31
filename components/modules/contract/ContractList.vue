<script lang="ts" setup>
import { PencilIcon, EyeIcon, PlusIcon } from "@heroicons/vue/24/solid";
import { getStatus, getType, getStatusColor } from "~/helpers/contract";
import { fetchContracts } from "~/services/ContractService";
import { User } from "~/types/entity/User";

// Data
const searchText = ref<string>("");
const page = ref<number>(1);
const headers = [
  {
    label: "Type",
    key: "type",
  },
  {
    label: "Société",
    key: "client",
  },
  {
    label: "Status",
    key: "status",
  },
  {
    label: "Sessions",
    key: "sessions",
  },
  {
    label: "Actions",
    key: "action",
    align: "center",
  },
];

// API
const {
  loading: loadingContracts,
  data: contracts,
  execute: getContracts,
} = useAsyncData({
  promise: () =>
    fetchContracts({
      search: searchText.value,
      page: page.value,
      populate: "client,sessions",
    }),
});

// Functions
const search = (text: string) => {
  searchText.value = text;
  page.value = 1;
  getContracts();
};
</script>
<template>
  <ui-page-header title="Prestations">
    <nuxt-link to="/modules/contract/create">
      <ui-button>
        <PlusIcon class="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
        Ajouter
      </ui-button>
    </nuxt-link>
  </ui-page-header>
  <ui-card title="Liste des Prestations">
    <template #headerActions>
      <ui-search @search="search($event)" />
    </template>
    <ui-table
      :headers="headers"
      :data="contracts"
      :loading="loadingContracts"
      @add="$router.push('/modules/contract/create')"
      @page="
        page = $event;
        getContracts();
      "
    >
      <template #item-sessions="{ item }">
        <ui-label :color="item.sessions.length === 0 ? 'red' : 'blue'">
          {{ item.sessions.length }}
        </ui-label>
      </template>
      <template #item-type="{ item }"> {{ getType(item.type) }}</template>
      <template #item-status="{ item }">
        <ui-label :color="getStatusColor(item.status)">
          {{ getStatus(item.status) }}
        </ui-label>
      </template>
      <template #item-client="{ item }">
        <nuxt-link
          :to="`/modules/client/view/${item.client.id}`"
          class="text-blue-800"
        >
          {{ item.client.name }}
        </nuxt-link>
      </template>
      <template #item-action="{ item }">
        <ui-action-button :to="`/modules/contract/view/${item.id}`">
          <EyeIcon class="w-4 h-4" />
        </ui-action-button>
        <ui-action-button :to="`/modules/contract/edit/${item.id}`">
          <PencilIcon class="w-4 h-4" />
        </ui-action-button>
      </template>
    </ui-table>
  </ui-card>
</template>
