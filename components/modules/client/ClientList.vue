<script lang="ts" setup>
import { listClient } from "~/services/ClientService";
import { User } from "~/types/entity/User";

// Composables
const { data, execute } = await listClient();

// Data
const searchText = ref<string>("");
const page = ref<number>(1);
const loading = ref<boolean>(true);
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

// Functions
const load = async () => {
  await execute({ page: page.value, search: searchText.value });
};

const search = (text: string) => {
  searchText.value = text;
  page.value = 1;
  load();
};

onMounted(async () => {
  loading.value = true;
  await load();
  loading.value = false;
});
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
          :items="data?.data"
          :number-of-page="data?.last_page"
          :curent-page="data?.current_page"
          :loading="loading"
          @page="
            page = $event;
            load();
          "
        >
          <template #item-users="{ item }">
            <ui-label color="blue">{{ item.users.length }}</ui-label>
          </template>
          <template #item-action="{ item }">
            <nuxt-link class="text-blue-800" :to="`/modules/client/${item.id}`">
              Modifier
            </nuxt-link>
          </template>
        </ui-table>
      </template>
    </ui-card>
  </div>
</template>
