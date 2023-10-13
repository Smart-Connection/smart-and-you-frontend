<script lang="ts" setup>
import { PencilIcon, EyeIcon } from "@heroicons/vue/24/solid";
import { getUsers } from "~/services/UserService";
import { User } from "~/types/entity/User";
import { getRole, getRoleColor } from "@/helpers/role";

// Data
const searchText = ref<string>("");
const page = ref<number>(1);
const user = useState<User>("user");
const headers = [
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
    align: "center",
  },
];

// Data
const { loading, data, execute } = useAsyncData({
  promise: () =>
    getUsers({
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
    <ui-page-header title="Utilisateurs">
      <nuxt-link to="/modules/user/create">
        <ui-button> Ajouter </ui-button>
      </nuxt-link>
    </ui-page-header>
    <ui-card title="Liste des utilisateurs">
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
        <template #item-client="{ item }">
          <nuxt-link
            class="text-blue-800"
            v-if="user.role === 'SUPER_ADMIN' && item.client_id"
            :to="`/modules/client/view/${item.client.id}`"
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
          <ui-action-button :to="`/modules/user/view/${item.id}`">
            <EyeIcon class="w-4 h-4" />
          </ui-action-button>
          <ui-action-button
            v-if="
              user.role === 'SUPER_ADMIN' ||
              (user.role === 'ADMIN' && item.role != 'SUPER_ADMIN')
            "
            :to="`/modules/user/edit/${item.id}`"
          >
            <PencilIcon class="w-4 h-4" />
          </ui-action-button>
        </template>
      </ui-table>
    </ui-card>
  </div>
</template>
