<script lang="ts" setup>
import { getType, getTypeBackgroundColor } from "~/helpers/contract";
import { fetchSessions } from "~/services/SessionService";
import { Event } from "~/types/entity/Calendar";
import { User } from "~/types/entity/User";

// Composables
const user = useState<User>("user");

// Data
const startAt = ref("");
const endAt = ref("");

const {
  loading: loadingSessions,
  data: sessions,
  execute: getSessions,
} = useAsyncData({
  promise: () =>
    fetchSessions({
      populate: "contract",
      start_at: startAt.value,
      end_at: endAt.value,
    }),
  options: {
    immediate: false,
  },
});

const items = computed(() => {
  if (!sessions.value) return [];
  return sessions.value.map((session) => {
    const event: Event = {
      id: session.id,
      title: `${getType(session.contract.type)} - ${
        session.contract.client.name
      }`,
      date: session.date,
      color: getTypeBackgroundColor(session.contract.type),
    };
    return event;
  });
});

const updateDate = (dates: { startAt: string; endAt: string }) => {
  startAt.value = dates.startAt;
  endAt.value = dates.endAt;
  getSessions();
};
</script>
<template>
  <ui-page-header title="Calendrier"></ui-page-header>
  <ui-calendar @change="updateDate" :events="items" />
</template>
