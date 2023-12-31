<script lang="ts" setup>
import { PencilIcon, EyeIcon, PlusIcon } from "@heroicons/vue/24/solid";
import { fetchUsers } from "~/services/UserService";
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

// Users
const { loading, data, execute } = useAsyncData({
  promise: () =>
    fetchUsers({
      search: searchText.value,
      page: page.value,
      populate: "client",
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
      <ui-button route-name="modules-user-create">
        <PlusIcon class="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
        Utilisateur
      </ui-button>
    </ui-page-header>
    <ui-card title="Liste des utilisateurs">
      <template #headerActions>
        <ui-search @search="search($event)" />
      </template>
      <ui-table
        :headers="headers"
        :data="data"
        :loading="loading"
        @add="$router.push('/modules/user/create')"
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
          <ui-action-button
            route-name="modules-user-view-id"
            :route-params="{ id: item.id }"
            :icon="EyeIcon"
          />
          <ui-action-button
            route-name="modules-user-edit-id"
            :route-params="{ id: item.id }"
            :icon="PencilIcon"
          />
        </template>
      </ui-table>
    </ui-card>
  </div>
</template>
