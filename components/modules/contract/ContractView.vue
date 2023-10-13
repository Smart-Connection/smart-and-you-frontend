<script lang="ts" setup>
import { getUser } from "~/services/UserService";
import { getRole, getRoleColor } from "@/helpers/role";
import { User } from "~/types/entity/User";
import { getContract } from "~/services/ContractService";

// Composable
const user = useState<User>("user");
const route = useRoute();
const id = route.params.id as string;

// Data
const { loading, data, error } = useAsyncData({
  promise: () => getContract(id),
});

// Breadcrumbs
const breadcrumbs = computed(() => [
  {
    label: "List des prestations",
    path: "/modules/contract",
  },
  {
    label: data.value ? data.value.title : "Prestation",
    path: data.value?.id ? `/modules/user/view/${data.value.id}` : "#",
  },
]);

// Fields
const fields = computed(() => {
  if (!data.value) return [];

  return [
    { label: "ID", value: data.value.id },
    { label: "Titre", value: data.value.title },
    { label: "Début", value: data.value.start_at },
    { label: "Fin", value: data.value.end_at },
    { label: "Format", value: data.value.format },
    {
      label: "Client",
      value: data.value.client.name,
      to: `/modules/client/view/${data.value.client_id}`,
    },
    { label: "Addresse", value: data.value.address },
    { label: "Code postal", value: data.value.zipcode },
    { label: "Ville", value: data.value.city },
    { label: "Status", value: data.value.status },
    { label: "Email de contact", value: data.value.contact_email },
    { label: "Téléphone de contact", value: data.value.contact_phone },
    { key: "consultant", label: "Consultant", value: data.value.consultants },
    { label: "Commentaire", value: data.value.comment },
  ];
});
</script>
<template>
  <ui-page-header
    :title="data ? data.title : 'Prestation'"
    :breadcrumbs="breadcrumbs"
  >
    <nuxt-link
      v-if="user.role === 'SUPER_ADMIN'"
      :to="`/modules/contract/edit/${id}`"
    >
      <ui-button>Modifier</ui-button>
    </nuxt-link>
  </ui-page-header>
  <ui-table-info :loading="loading" :fields="fields">
    <template #item-consultant="{ item }">
      <div v-if="item.value.length > 0">
        <nuxt-link
          v-for="(consultant, index) in item.value"
          class="text-blue-600"
          :to="`/modules/user/view/${consultant.id}`"
        >
          {{ consultant.firstname }}
          {{
            consultant.lastname + (item.value.length - 1 !== index ? ", " : "")
          }}
        </nuxt-link>
      </div>
      <div v-else>Aucun consultant</div>
    </template>
  </ui-table-info>
</template>
