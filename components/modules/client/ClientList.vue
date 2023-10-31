<script lang="ts" setup>
import { PencilIcon, EyeIcon } from "@heroicons/vue/24/solid";
import { fetchClients } from "~/services/ClientService";

// Data
const searchText = ref<string>("");
const page = ref<number>(1);
const headers = [
  {
    label: "Nom",
    key: "name",
  },
  {
    label: "Addresse",
    key: "address",
  },
  {
    label: "Ville",
    key: "city",
  },
  {
    label: "Pays",
    key: "country",
  },
  {
    label: "Utilisateurs",
    key: "users",
  },
  {
    label: "Actions",
    key: "action",
    align: "center",
  },
];

// API
const { loading, data, execute } = useAsyncData({
  promise: () =>
    fetchClients({
      search: searchText.value,
      page: page.value,
      populate: "users",
    }),
});

// Functions
const search = (text: string) => {
  searchText.value = text;
  page.value = 1;
  execute();
};
</script>
<template>
  <div>
    <ui-page-header title="Clients">
      <nuxt-link to="/modules/client/create">
        <ui-button> Ajouter </ui-button>
      </nuxt-link>
    </ui-page-header>
    <ui-card title="Liste des Clients">
      <template #headerActions>
        <ui-search @search="search($event)" />
      </template>
      <ui-table
        :headers="headers"
        :data="data"
        :loading="loading"
        @page="
          page = $event;
          execute();
        "
      >
        <template #item-users="{ item }">
          <ui-label color="blue">{{ item.users.length }}</ui-label>
        </template>
        <template #item-action="{ item }">
          <ui-action-button :to="`/modules/client/view/${item.id}`">
            <EyeIcon class="w-4 h-4" />
          </ui-action-button>
          <ui-action-button :to="`/modules/client/edit/${item.id}`">
            <PencilIcon class="w-4 h-4" />
          </ui-action-button>
        </template>
      </ui-table>
    </ui-card>
  </div>
</template>
