<script lang="ts" setup>
import { getUser } from "~/services/UserService";
import { useAsyncData } from "~/composables/useAsyncData";
import { getRole, getRoleColor } from "@/helpers/role";

// Composable
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
  if (!data.value) return [];

  return [
    { label: "ID", value: data.value.id },
    { label: "Prénom", value: data.value.firstname },
    { label: "Nom", value: data.value.lastname },
    { label: "Email", value: data.value.email },
    { key: "role", label: "Rôle", value: data.value.role },
    {
      label: "Client",
      value: data.value.client.name,
      to: `/modules/client/view/${data.value.client.id}`,
    },
  ];
});
</script>
<template>
  <ui-page-header
    :title="
      data?.firstname ? `${data?.firstname} ${data?.lastname}` : 'Utilisateur'
    "
    :breadcrumbs="breadcrumbs"
  >
    <nuxt-link :to="`/modules/client/edit/${id}`">
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
