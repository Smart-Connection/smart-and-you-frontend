<script setup lang="ts">
import dayjs from "dayjs";
import { Session } from "~/types/entity/Sessions";
import { getFormat, getFormatColor } from "~/helpers/contract";
import { PencilIcon, EyeIcon, PlusIcon } from "@heroicons/vue/24/solid";
import { format_dddd_d_mmmm_YYYY } from "~/helpers/date";

const { useParams } = useRouteList();
const params = useParams<{ id: string }>();

defineProps<{
  loading: boolean;
  sessions: Session[] | undefined;
}>();

const headers = computed(() => {
  return [
    {
      key: "consultant",
      label: "Consultant",
    },
    {
      key: "format",
      label: "Format",
    },
    {
      key: "date",
      label: "Date",
    },
    {
      key: "address",
      label: "Adresse",
    },
    {
      key: "zipcode",
      label: "Code postal",
    },
    {
      key: "city",
      label: "Ville",
    },
    {
      key: "action",
      label: "Actions",
    },
  ];
});
</script>
<template>
  <ui-card title="Sessions">
    <template #headerActions>
      <ui-button
        route-name="modules-session-create-id"
        :route-params="{ id: params.id }"
      >
        <PlusIcon class="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
        Session
      </ui-button>
    </template>

    <ui-simple-table :items="sessions" :headers="headers" :loading="loading">
      <template #item-consultant="{ item }">
        <ui-link
          v-if="item.consultant"
          route-name="modules-user-view-id"
          :route-params="{ id: item.consultant.id }"
        >
          {{ item.consultant.firstname }} {{ item.consultant.lastname }}
        </ui-link>
        <p v-else>Aucun consultant</p>
      </template>
      <template #item-date="{ item }">
        {{ format_dddd_d_mmmm_YYYY(item.date) }}
      </template>
      <template #item-format="{ item }">
        <ui-label :color="getFormatColor(item.format)">
          {{ getFormat(item.format) }}
        </ui-label>
      </template>
      <template #item-action="{ item }">
        <ui-action-button
          route-name="modules-session-view-id"
          :route-params="{ id: item.id }"
          :icon="EyeIcon"
        />
        <ui-action-button
          route-name="modules-session-edit-id"
          :route-params="{ id: item.id }"
          :icon="PencilIcon"
        />
      </template>
    </ui-simple-table>
  </ui-card>
</template>
