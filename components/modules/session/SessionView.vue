<script lang="ts" setup>
import { User } from "~/types/entity/User";
import { PencilIcon } from "@heroicons/vue/24/solid";
import { fetchSession, deleteSession } from "~/services/SessionService";
import { format_dddd_d_mmmm_YYYY } from "~/helpers/date";
import { getFormat, getFormatColor } from "~/helpers/contract";

// Composable
const user = useState<User>("user");
const router = useRouter();

const { useParams } = useRouteList();
const params = useParams<{ id: string }>();

// Data
const { loading, data: session } = useAsyncData({
  promise: () =>
    fetchSession({
      id: params.id,
      params: { populate: "contract,consultant" },
    }),
});

// Breadcrumbs
const breadcrumbs = computed(() => [
  {
    label: "List des prestations",
    path: "/modules/contract",
  },
  {
    label: session.value?.contract
      ? `${session.value.contract.client.name} - ${session.value.contract.type}`
      : "...",
    path: session.value
      ? `/modules/contract/view/${session.value.contract.id}`
      : "#",
  },
  {
    label: session.value
      ? `Session du ${format_dddd_d_mmmm_YYYY(session.value.date)}`
      : "...",
    path: session.value ? `/modules/contract/view/${params.id}` : "#",
  },
]);

// Fields
const fields = computed(() => {
  if (!session.value) return [];

  return [
    { label: "ID", value: session.value.id },
    { label: "Consultant", value: session.value.consultant, key: "consultant" },
    { label: "Format", value: session.value.format, key: "format" },
    { label: "Adresse", value: session.value.address, key: "address" },
    { label: "Code postal", value: session.value.zipcode, key: "zipcode" },
    { label: "Ville", value: session.value.city, key: "city" },
    {
      label: "Email de contact",
      value: session.value.contact_email,
      key: "email",
    },
    {
      label: "Téléphone de contact",
      value: session.value.contact_phone,
      key: "phone",
    },
  ];
});

// Delete
const { deleteFunction, deleting } = useAsyncDelete({
  delete: () => deleteSession(params.id),
  callback: () =>
    navigateTo({
      name: "modules-contract-view-id",
      params: { id: session.value?.contract.id },
    }),
  messages: {
    error: "Une erreur est arrivé lors de la suppression de la session",
    success: "Session correctement supprimé",
  },
});
</script>
<template>
  <ui-page-header
    :title="session ? format_dddd_d_mmmm_YYYY(session.date) : 'Session'"
    :breadcrumbs="breadcrumbs"
  >
    <ui-delete-modal
      v-if="user.role === 'SUPER_ADMIN'"
      @confirm="deleteFunction"
      title="Suppression d'une prestation"
      :loading="deleting"
      rule-name="modules-session-delete"
      description="Si vous cliquez sur supprimer, cette session sera totalement supprimé"
    />
    <ui-button
      route-name="modules-session-edit-id"
      :route-params="{ id: params.id }"
    >
      <PencilIcon class="-ml-0.5 mr-1.5 h-4 w-4" aria-hidden="true" />
      Modifier
    </ui-button>
  </ui-page-header>

  <!-- Infos -->
  <ui-table-info :loading="loading" :fields="fields">
    <template #item-consultant="{ item }">
      <ui-link
        route-name="modules-user-view-id"
        :route-params="{ id: item.value.id }"
      >
        {{ item.value.firstname }} {{ item.value.lastname }}
      </ui-link>
    </template>
    <template #item-format="{ item }">
      <ui-label :color="getFormatColor(item.value)">
        {{ getFormat(item.value) }}
      </ui-label>
    </template>
  </ui-table-info>
</template>
