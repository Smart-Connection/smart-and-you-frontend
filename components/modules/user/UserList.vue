<script lang="ts" setup>
import { listUser } from "~/services/UserService";
import { User } from "~/types/entity/User";
import { getRole, getRoleColor } from "@/helpers/role";

// Composables
const { data, execute } = await listUser();

// Data
const searchText = ref<string>("");
const page = ref<number>(1);
const user = useState<User>("user");
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
    label: "Client",
    key: "client",
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
    <ui-page-header title="Utilisateurs">
      <nuxt-link to="/modules/user/create">
        <ui-button> Ajouter </ui-button>
      </nuxt-link>
    </ui-page-header>
    <ui-card title="Liste des utilisateurs">
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
          <template #item-client="{ item }">
            <nuxt-link
              class="text-blue-800"
              v-if="user.role === 'SUPER_ADMIN' && item.client_id"
              :to="`/modules/client/${item.client.id}`"
            >
              {{ item.client.name }}
            </nuxt-link>
            <p v-else-if="item.client_id">{{ item.client.name }}</p>
          </template>
          <template #item-role="{ item }">
            <ui-label :color="getRoleColor(item.role)">
              {{ getRole(item.role) }}
            </ui-label>
          </template>
          <template #item-action="{ item }">
            <nuxt-link class="text-blue-800" :to="`/modules/user/${item.id}`">
              {{
                user.role === "SUPER_ADMIN" ||
                (user.role === "ADMIN" && item.role != "SUPER_ADMIN")
                  ? "Modifier"
                  : "Voir"
              }}
            </nuxt-link>
          </template>
        </ui-table>
      </template>
    </ui-card>
  </div>
</template>