<script setup lang="ts">
import * as yup from "yup";
import { useForm } from "vee-validate";
import { fetchContract } from "~/services/ContractService";
import { getFormatList } from "~/helpers/contract";
import { Session } from "~/types/entity/Sessions";
import { fetchUsers } from "~/services/UserService";
import { User } from "~/types/entity/User";
import { insertSession } from "~/services/SessionService";
import { PlusIcon } from "@heroicons/vue/24/solid";

const { useParams } = useRouteList();
const params = useParams<{ id: string }>();

// Static
const clientSearchText = ref("");
const breadcrumbs = computed(() => [
  {
    label: "Prestations",
    path: "/modules/contract",
  },
  {
    label: contract.value
      ? `${contract.value?.client.name} - ${contract.value?.type}`
      : "...",
    path: `/modules/contract/view/${params.id}`,
  },
  {
    label: "Création d'une session",
    path: "/modules/contract/create",
  },
]);

// Form
const schema = yup.object().shape({
  format: yup.string().required("Le format est requis"),
  user_id: yup.string().required("Le consultant est requis"),
  contact_email: yup.string().email("Email incorrect"),
  date: yup.string().required("La date est requise"),
  address: yup.string().when("format", {
    is: (format: string) => format === "FACE_TO_FACE",
    then: () => yup.string().required("L'adresse est requise"),
  }),
  city: yup.string().when("format", {
    is: (format: string) => format === "FACE_TO_FACE",
    then: () => yup.string().required("La ville est requise"),
  }),
  zipcode: yup.string().when("format", {
    is: (format: string) => format === "FACE_TO_FACE",
    then: () => yup.string().required("Le code postal est requis"),
  }),
});
const { handleSubmit, values } = useForm<Session>({
  validationSchema: schema,
  initialValues: {
    format: "ON_LINE",
    contract_id: params.id,
  },
});

// Contract
const { data: contract } = useAsyncData({
  promise: () =>
    fetchContract({
      id: params.id,
      params: {
        populate: "client",
      },
    }),
});

// User list
const { execute: reloadConsultants, data: consultants } = useAsyncData({
  promise: () =>
    fetchUsers({
      search: clientSearchText.value,
      per_page: 5,
      page: 1,
      role: "CONSULTANT",
    }),
});

// Submit
const submit = handleSubmit(async () => {
  return save();
});
const { submit: save, saving } = useAsyncSubmit({
  submitApiCall: () => insertSession({ ...values }),
  messages: { success: "Session correctement créée" },
  callbackSuccess: () =>
    navigateTo({ name: "modules-contract-view-id", params: { id: params.id } }),
});

// Functions
const searchConsultant = ($event: string) => {
  clientSearchText.value = $event;
  reloadConsultants();
};

// Computed
const formatConsultants = computed(() => {
  if (consultants.value) {
    return consultants.value.data.map((consultant: User) => {
      return {
        value: consultant.id,
        label: `${consultant.firstname} ${consultant.lastname}`,
      };
    });
  } else {
    return [];
  }
});
</script>
<template>
  <ui-page-header title="Création d'une session" :breadcrumbs="breadcrumbs" />
  <div class="grid grid-cols-1 md:grid-cols-2 gap-x-0 gap-y-4 md:gap-4">
    <ui-card title="Informations général">
      <ui-form-input-comboboxe
        name="user_id"
        label="Consultant"
        required
        :items="formatConsultants"
        @change="searchConsultant"
        placeholder="Chercher un consultant"
      />
      <ui-form-input-text name="date" label="Date" required type="date" />
      <ui-form-input-select
        name="format"
        label="Format de la prestation"
        :items="getFormatList"
        required
      />
      <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="transform opacity-0 scale-90"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-90"
      >
        <div v-if="values.format === 'FACE_TO_FACE'">
          <ui-form-input-text
            name="address"
            required
            type="text"
            placeholder="1 rue de rivoli"
            label="Adresse"
          />
          <ui-form-input-text
            name="city"
            required
            type="text"
            placeholder="Paris"
            label="Ville"
          />
          <ui-form-input-text
            name="zipcode"
            required
            type="text"
            placeholder="75001"
            label="Code postal"
          />
        </div>
      </transition>
    </ui-card>
    <ui-card title="Informations de contact">
      <ui-form-input-text
        name="contact_email"
        type="text"
        placeholder="jean.dupont@mail.com"
        label="Email de contact"
      />
      <ui-form-input-text
        name="contact_phone"
        type="text"
        placeholder="0708091011"
        label="Numéro de contact"
      />
    </ui-card>
  </div>
  <div class="flex items-center justify-end mt-4">
    <ui-button @click="submit" :loading="saving">
      <PlusIcon class="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
      Ajouter
    </ui-button>
  </div>
</template>
