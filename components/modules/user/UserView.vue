<script lang="ts" setup>
import { fetchUser, resendEmail, deleteUser } from "~/services/UserService";
import { getRole, getRoleColor } from "@/helpers/role";
import { User } from "~/types/entity/User";
import { PencilIcon } from "@heroicons/vue/24/solid";

// Composable
const router = useRouter();
const user = useState<User>("user");
const route = useRoute();
const id = route.params.id as string;

// Data
const { loading, data, error } = useAsyncData({
  promise: () =>
    fetchUser({
      id,
      params: {
        populate: "client",
      },
    }),
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

// Delete
const { deleteFunction, deleting } = useAsyncDelete({
  delete: () => deleteUser(id),
  callback: () => router.push("/modules/user"),
  messages: {
    error: "Une erreur est arrivé lors de le suppression de l'utilisateur",
    success: "Utilisateur correctement supprimé",
  },
});
</script>
<template>
  <ui-page-header
    :title="
      data?.firstname ? `${data?.firstname} ${data?.lastname}` : 'Utilisateur'
    "
    :breadcrumbs="breadcrumbs"
  >
    <ui-delete-modal
      rule-name="modules-user-delete"
      v-if="
        user.role === 'SUPER_ADMIN' ||
        (user.role === 'ADMIN' && data?.role != 'SUPER_ADMIN')
      "
      @confirm="deleteFunction"
      :loading="deleting"
      title="Suppression d'un utilisateur"
      description="Si vous cliquez sur supprimer, cette utilisateur sera totalement supprimé"
    />
    <ui-button route-name="modules-user-edit-id" :route-params="{ id: id }">
      <PencilIcon class="-ml-0.5 mr-1.5 h-4 w-4" aria-hidden="true" />
      Modifier
    </ui-button>
  </ui-page-header>
  <ui-info
    v-if="data?.account_creation_token"
    class="col-span-2 mb-4"
    type="alert"
    title="Attention"
    description="Cet utilisateur n'a pas finalisé sont inscription."
  >
    <ui-button color="secondary" @click="resendEmail(id)">
      Renvoyer l'invitation
    </ui-button>
  </ui-info>
  <ui-table-info :loading="loading" :fields="fields">
    <template #item-role="{ item }">
      <ui-label :color="getRoleColor(item.value)">
        {{ getRole(item.value) }}
      </ui-label>
    </template>
  </ui-table-info>
</template>
