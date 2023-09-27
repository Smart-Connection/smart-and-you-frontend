<script lang="ts" setup>
import { listUser } from "~/services/UserService";
import { User } from "~/types/entity/User";
import { getRole, getRoleColor } from "@/helpers/role";

// Composables
const { data, execute } = await listUser();

// Data
const loading = ref<boolean>(true);
const headers = [
  {
    label: "id",
    key: "id",
  },
  {
    label: "Prénom",
    key: "firstname",
  },
  {
    label: "Nom",
    key: "lastname",
  },
  {
    label: "Email",
    key: "email",
  },
  {
    label: "Role",
    key: "role",
  },
  {
    label: "Actions",
    key: "action",
  },
];

// Functionsz
const load = async (options: { page?: number; search?: string }) => {
  await execute(options);
};

onMounted(() => {
  loading.value = true;
  load({ page: 1 });
  loading.value = false;
});
</script>
<template>
  <div>
    <ui-card title="Liste des utilisateurs">
      <template #headerActions>
        <ui-search @search="load({ search: $event })" />
        <ui-button> Ajouter un utilisateur </ui-button>
      </template>
      <template #content>
        <ui-table
          :headers="headers"
          :items="data?.data"
          :number-of-page="data?.last_page"
          :curent-page="data?.current_page"
          :loading="loading"
          @page="load({ page: $event })"
        >
          <template #item-role="{ item }">
            <ui-label :color="getRoleColor(item.role)">
              {{ getRole(item.role) }}
            </ui-label>
          </template>
          <template #item-action="{ item }">
            <span class="text-blue-800">Modifier</span>
          </template>
        </ui-table>
      </template>
    </ui-card>
  </div>
</template>
