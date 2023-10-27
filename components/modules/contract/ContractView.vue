<script lang="ts" setup>
import { User } from "~/types/entity/User";
import { getContract, deleteContract } from "~/services/ContractService";
import { getStatus } from "~/helpers/contract";

// Composable
const alert = useState("alert");
const user = useState<User>("user");
const route = useRoute();
const router = useRouter();
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
    path: data.value?.id ? `/modules/contract/view/${id}` : "#",
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
    { label: "Status", value: getStatus(data.value.status) },
    { label: "Email de contact", value: data.value.contact_email },
    { label: "Téléphone de contact", value: data.value.contact_phone },
    { label: "Commentaire", value: data.value.comment },
  ];
});

// Functions
const removeContract = async () => {
  try {
    await deleteContract(id);
    alert.value = {
      type: "success",
      message: "Prestation correctement supprimé",
      status: true,
    };
    router.push("/modules/contract");
  } catch (e) {
    alert.value = {
      type: "success",
      message: "Une erreur est arrivé lors de la suppression de la prestation",
      status: true,
    };
  }
};
</script>
<template>
  <ui-page-header
    :title="data ? data.title : 'Prestation'"
    :breadcrumbs="breadcrumbs"
  >
    <ui-button
      v-if="user.role === 'SUPER_ADMIN'"
      @click="removeContract"
      color="error"
      class="mr-2"
    >
      Supprimer
    </ui-button>
    <nuxt-link
      v-if="user.role === 'SUPER_ADMIN' && data?.status === 'OPEN'"
      :to="`/modules/contract/edit/${id}`"
    >
      <ui-button>Modifier</ui-button>
    </nuxt-link>
  </ui-page-header>
  <ui-table-info :loading="loading" :fields="fields" />
  <modules-contract-components-consultant-list
    v-if="data"
    :status="data?.status"
    :consultants="data.consultants"
    :contract-id="data.id"
  />
</template>
