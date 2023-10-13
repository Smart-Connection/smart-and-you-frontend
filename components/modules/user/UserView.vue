<script lang="ts" setup>
import { getUser } from "~/services/UserService";
import { getRole, getRoleColor } from "@/helpers/role";
import { User } from "~/types/entity/User";

// Composable
const user = useState<User>("user");
const route = useRoute();
const id = route.params.id as string;

// Data
const { loading, data, error } = useAsyncData({
  promise: () => getUser(id),
});

// Breadcrumbs
const breadcrumbs = computed(() => [
  {
    label: "List des utilisateurs",
    path: "/modules/user",
  },
  {
    label: data.value?.firstname
      ? `${data.value.firstname} ${data.value.lastname}`
      : "Utilisateur",
    path: data.value?.id ? `/modules/user/view/${data.value.id}` : "#",
  },
]);

// Fields
const fields = computed(() => {
  let list: any = [];
  if (!data.value) return list;

  list.push(
    { label: "ID", value: data.value.id },
    { label: "Prénom", value: data.value.firstname },
    { label: "Nom", value: data.value.lastname },
    { label: "Email", value: data.value.email },
    { key: "role", label: "Rôle", value: data.value.role }
  );

  if (data.value.client) {
    list.push({
      label: "Client",
      value: data.value.client.name,
      to: `/modules/client/view/${data.value.client.id}`,
    });
  } else {
    list.push({
      label: "Client",
      value: "Aucun client associé",
    });
  }

  return list;
});
</script>
<template>
  <ui-page-header
    :title="
      data?.firstname ? `${data?.firstname} ${data?.lastname}` : 'Utilisateur'
    "
    :breadcrumbs="breadcrumbs"
  >
    <nuxt-link
      v-if="
        user.role === 'SUPER_ADMIN' ||
        (user.role === 'ADMIN' && data?.role != 'SUPER_ADMIN')
      "
      :to="`/modules/client/edit/${id}`"
    >
      <ui-button>Modifier</ui-button>
    </nuxt-link>
  </ui-page-header>
  <ui-table-info :loading="loading" :fields="fields">
    <template #item-role="{ item }">
      <ui-label :color="getRoleColor(item.value)">
        {{ getRole(item.value) }}
      </ui-label>
    </template>
  </ui-table-info>
</template>
