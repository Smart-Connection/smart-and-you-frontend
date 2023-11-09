<script lang="ts" setup>
import { PencilIcon, EyeIcon, PlusIcon } from "@heroicons/vue/24/solid";
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
      <ui-button route-name="modules-client-create">
        <PlusIcon class="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
        Client
      </ui-button>
    </ui-page-header>
    <ui-card title="Liste des Clients">
      <template #headerActions>
        <ui-search @search="search($event)" />
      </template>
      <ui-table
        :headers="headers"
        :data="data"
        :loading="loading"
        @add="$router.push('/modules/client/create')"
        @page="
          page = $event;
          execute();
        "
      >
        <template #item-users="{ item }">
          <ui-label color="blue">{{ item.users.length }}</ui-label>
        </template>
        <template #item-action="{ item }">
          <ui-action-button
            route-name="modules-client-view-id"
            :route-params="{ id: item.id }"
            :icon="EyeIcon"
          />
          <ui-action-button
            route-name="modules-client-edit-id"
            :route-params="{ id: item.id }"
            :icon="PencilIcon"
          />
        </template>
      </ui-table>
    </ui-card>
  </div>
</template>
