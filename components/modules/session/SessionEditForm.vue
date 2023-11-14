<script setup lang="ts">
import * as yup from "yup";
import { useForm } from "vee-validate";
import { fetchSession, updateSession } from "~/services/SessionService";
import { getFormatList } from "~/helpers/contract";
import { Session } from "~/types/entity/Sessions";
import { fetchUsers } from "~/services/UserService";
import { User } from "~/types/entity/User";
import { PencilIcon } from "@heroicons/vue/24/solid";
import { format_dddd_d_mmmm_YYYY } from "~/helpers/date";

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
    label: session.value
      ? `${session.value?.contract.client.name} - ${session.value?.contract.type}`
      : "...",
    path: `/modules/contract/view/${session.value?.contract_id}`,
  },
  {
    label: session.value
      ? `Modification de la session du ${format_dddd_d_mmmm_YYYY(
          session.value?.date
        )}`
      : "...",
    path: `/modules/session/view/${params.id}`,
  },
]);

// Form
const schema = yup.object().shape({
  format: yup.string().required("Le format est requis"),
  user_id: yup.string().required("Le consultant est requis"),
  contact_phone: yup.string().email("Téléphone incorrect").nullable(),
  contact_email: yup.string().email("Email incorrect").nullable(),
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
const { handleSubmit, values, resetForm } = useForm<Session>({
  validationSchema: schema,
  initialValues: {
    contact_email: "",
    contact_phone: "",
  },
});

// Session
const { data: session, loading } = useAsyncData({
  promise: () =>
    fetchSession({
      id: params.id,
      params: {
        populate: "contract,consultant",
      },
    }),
  callback: () => {
    if (session.value) {
      resetForm({ values: session.value as Session });
    }
  },
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
  submitApiCall: () => updateSession(params.id, values),
  messages: { success: "Session correctement modifié" },
  callbackSuccess: () =>
    navigateTo({ name: "modules-session-view-id", params: { id: params.id } }),
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

const formatDefaultConsultants = computed(() => {
  if (!session.value) return;
  return {
    value: session.value.consultant.id,
    label: `${session.value.consultant.firstname} ${session.value.consultant.lastname}`,
  };
});
</script>
<template>
  <ui-page-header
    :title="session ? format_dddd_d_mmmm_YYYY(session.date) : 'Session'"
    :breadcrumbs="breadcrumbs"
  />
  <div class="grid grid-cols-1 md:grid-cols-2 gap-x-0 gap-y-4 md:gap-4">
    <ui-card title="Informations général">
      <ui-form-input-comboboxe
        name="user_id"
        label="Consultant"
        required
        :items="formatConsultants"
        :loading="loading"
        @change="searchConsultant"
        :default="formatDefaultConsultants"
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
    <ui-button @click="save" :loading="saving">
      <PencilIcon class="-ml-0.5 mr-1.5 h-4 w-4" aria-hidden="true" />
      Modifier
    </ui-button>
  </div>
</template>
