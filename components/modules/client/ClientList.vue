<script lang="ts" setup>
import { getClients } from "~/services/ClientService";

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
  },
];

// Data
const { loading, data, execute } = useAsyncData({
  promise: () =>
    getClients({
      search: searchText.value,
      page: page.value,
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
      <template #content>
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
            <nuxt-link
              class="text-blue-800"
              :to="`/modules/client/edit/${item.id}`"
            >
              Modifier
            </nuxt-link>
          </template>
        </ui-table>
      </template>
    </ui-card>
  </div>
</template>
