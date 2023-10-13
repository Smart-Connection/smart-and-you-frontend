<script lang="ts" setup>
import { PencilIcon, EyeIcon } from "@heroicons/vue/24/solid";
import { getContracts } from "~/services/ContractService";
import { User } from "~/types/entity/User";
import { getFormat } from "~/helpers/format";

// Composables
const user = useState<User>("user");

// Data
const searchTextOpenContracts = ref<string>("");
const pageOpenContracts = ref<number>(1);
const searchTextCloseContracts = ref<string>("");
const pageCloseContracts = ref<number>(1);

// Contracts - Open
const {
  loading: loadingOpenContracts,
  data: openContracts,
  execute: executeOpenContracts,
} = useAsyncData({
  promise: () =>
    getContracts({
      search: searchTextOpenContracts.value,
      page: pageOpenContracts.value,
    }),
});

// Contracts - Close
const {
  loading: loadingCloseContracts,
  data: closeContracts,
  execute: executeCloseContracts,
} = useAsyncData({
  promise: () =>
    getContracts({
      search: searchTextOpenContracts.value,
      page: pageOpenContracts.value,
      status: "CLOSE",
    }),
});

const headers = [
  {
    label: "Nom de la prestation",
    key: "title",
  },
  {
    label: "Client",
    key: "client",
  },
  {
    label: "Format",
    key: "format",
  },
  {
    label: "Consultants",
    key: "consultants",
  },
  {
    label: "Actions",
    key: "action",
    align: "center",
  },
];

// Functions
const searchOpenContracts = (text: string) => {
  searchTextOpenContracts.value = text;
  pageOpenContracts.value = 1;
  executeOpenContracts();
};

const searchCloseContracts = (text: string) => {
  searchTextCloseContracts.value = text;
  pageCloseContracts.value = 1;
  executeCloseContracts();
};
</script>
<template>
  <ui-page-header title="Prestations">
    <nuxt-link to="/modules/contract/create">
      <ui-button> Ajouter </ui-button>
    </nuxt-link>
  </ui-page-header>

  <!-- Current contracts -->
  <ui-card title="Liste des prestations en cours" class="mb-4">
    <template #headerActions>
      <ui-search @search="searchOpenContracts($event)" />
    </template>
    <ui-table
      :headers="headers"
      :data="openContracts"
      :loading="loadingOpenContracts"
      @page="
        pageOpenContracts = $event;
        executeOpenContracts();
      "
    >
      <template #item-client="{ item }">
        <nuxt-link
          class="text-blue-600"
          :to="`/modules/client/view/${item.client_id}`"
        >
          {{ item.client.name }}
        </nuxt-link>
      </template>
      <template #item-format="{ item }">
        <ui-label :color="item.format === 'ON_LINE' ? 'green' : 'indigo'">
          {{ getFormat(item.format) }}
        </ui-label>
      </template>
      <template #item-consultants="{ item }">
        <ui-label :color="item.consultants.length === 0 ? 'red' : 'green'">
          {{ item.consultants.length }}
        </ui-label>
      </template>
      <template #item-action="{ item }">
        <ui-action-button :to="`/modules/contract/view/${item.id}`">
          <EyeIcon class="w-4 h-4" />
        </ui-action-button>
        <ui-action-button
          v-if="user.role === 'SUPER_ADMIN'"
          :to="`/modules/contract/edit/${item.id}`"
        >
          <PencilIcon class="w-4 h-4" />
        </ui-action-button>
      </template>
    </ui-table>
  </ui-card>

  <!-- Close contracts -->
  <ui-card title="Liste des prestations terminé">
    <template #headerActions>
      <ui-search @search="searchCloseContracts($event)" />
    </template>
    <ui-table
      :headers="headers"
      :data="closeContracts"
      :loading="loadingCloseContracts"
      @page="
        pageCloseContracts = $event;
        executeCloseContracts();
      "
    >
      <template #item-client="{ item }">
        <nuxt-link
          class="text-blue-600"
          :to="`/modules/client/view/${item.client_id}`"
        >
          {{ item.client.name }}
        </nuxt-link>
      </template>
      <template #item-consultants="{ item }">
        <ui-label :color="item.consultants.length === 0 ? 'red' : 'green'">
          {{ item.consultants.length }}
        </ui-label>
      </template>
      <template #item-format="{ item }">
        <ui-label :color="item.format === 'ON_LINE' ? 'green' : 'indigo'">
          {{ getFormat(item.format) }}
        </ui-label>
      </template>
      <template #item-action="{ item }">
        <ui-action-button :to="`/modules/contract/view/${item.id}`">
          <EyeIcon class="w-4 h-4" />
        </ui-action-button>
      </template>
    </ui-table>
  </ui-card>
</template>
