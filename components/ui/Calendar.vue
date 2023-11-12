<script lang="ts" setup>
import dayjs from "dayjs";
import "dayjs/locale/fr";
import isBetween from "dayjs/plugin/isBetween";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/vue/24/solid";
import { Event } from "~/types/entity/Calendar";

interface Calendar {
  date: string;
  isCurrentMonth: boolean;
  events: Event[];
  isToday: boolean;
  isSelected: boolean;
}

// props & emits
const emits = defineEmits(["change"]);
const props = defineProps<{
  events?: Event[] | [];
  loading?: boolean;
}>();

// Data
dayjs.extend(isBetween);
dayjs.locale("fr");
const selectedDay = ref(dayjs().format("YYYY-MM-DD"));
const weekDaysBefore: number[] = [5, 6, 0, 1, 2, 3, 4];
const weekDaysAfter: number[] = [6, 5, 4, 3, 2, 1, 0];

// Computed
const days = computed(() => {
  const day = dayjs(selectedDay.value);
  const firstDay = day.startOf("month");
  const lastDay = day.endOf("month");
  const days: Calendar[] = [];

  let currentDay = firstDay;

  // Get month days before
  if (firstDay.day() !== 1) {
    for (let i = 0; i <= weekDaysBefore[firstDay.day()]; i++) {
      const date = firstDay.subtract(i + 1, "day");
      days.unshift({
        date: date.format("YYYY-MM-DD"),
        isCurrentMonth: false,
        events: getEvents(date),
        isSelected: false,
        isToday: currentDay.isSame(dayjs(), "day"),
      });
    }
  }

  // Get current month days
  while (currentDay.isBefore(lastDay)) {
    days.push({
      date: currentDay.format("YYYY-MM-DD"),
      isCurrentMonth: true,
      events: getEvents(currentDay),
      isSelected: false,
      isToday: currentDay.isSame(dayjs(), "day"),
    });

    currentDay = currentDay.add(1, "day");
  }

  // Get month days after
  if (lastDay.day() !== 0) {
    for (let i = 0; i <= weekDaysAfter[lastDay.day()]; i++) {
      const date = lastDay.add(i + 1, "day");
      days.push({
        date: date.format("YYYY-MM-DD"),
        isCurrentMonth: false,
        events: getEvents(date),
        isSelected: false,
        isToday: currentDay.isSame(dayjs(), "day"),
      });
    }
  }

  return days;
});

// Functions
const getEvents = (date: dayjs.Dayjs) => {
  if (!props.events) return [];
  return props?.events.filter((element) =>
    dayjs(element.date).isSame(date, "day")
  );
};

const nextMonth = () => {
  const date = dayjs(selectedDay.value);
  selectedDay.value = date.add(1, "month").format("YYYY-MM-DD");
  emits("change", { start_at: days.value.at(0), end_at: days.value.at(-1) });
};

const previousMonth = () => {
  const date = dayjs(selectedDay.value);
  selectedDay.value = date.subtract(1, "month").format("YYYY-MM-DD");
  emits("change", {
    start_at: days.value.at(0),
    end_at: days.value.at(-1),
  });
};

const setAsToday = () => {
  const date = dayjs();
  selectedDay.value = date.format("YYYY-MM-DD");
  emits("change", {
    start_at: days.value.at(0),
    end_at: days.value.at(-1),
  });
};

// Init
emits("change", {
  start_at: days.value.at(0),
  end_at: days.value.at(-1),
});
</script>
<template>
  <ui-card
    :title="dayjs(selectedDay).locale('fr').format('MMMM YYYY')"
    class="mb-4"
  >
    <template #headerActions>
      <ui-button color="secondary" class="mr-2" @click="setAsToday()"
        >Aujourd'hui</ui-button
      >
      <ui-button color="secondary" class="mr-2" @click="previousMonth()">
        <ChevronLeftIcon class="w-5 text-gray-400" />
      </ui-button>
      <ui-button color="secondary" @click="nextMonth()">
        <ChevronRightIcon class="w-5 text-gray-400" />
      </ui-button>
    </template>
    <div class="lg:flex lg:h-full lg:flex-col">
      <div
        class="shadow-sm rounded-md ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col"
      >
        <div
          class="grid grid-cols-7 rounded-t-md gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none"
        >
          <div class="bg-white rounded-tl-md py-2">
            L<span class="sr-only sm:not-sr-only">undi</span>
          </div>
          <div class="bg-white py-2">
            M<span class="sr-only sm:not-sr-only">ardi</span>
          </div>
          <div class="bg-white py-2">
            M<span class="sr-only sm:not-sr-only">ercredi</span>
          </div>
          <div class="bg-white py-2">
            J<span class="sr-only sm:not-sr-only">eudi</span>
          </div>
          <div class="bg-white py-2">
            V<span class="sr-only sm:not-sr-only">endredi</span>
          </div>
          <div class="bg-white py-2">
            S<span class="sr-only sm:not-sr-only">amedi</span>
          </div>
          <div class="bg-white rounded-tr-md py-2">
            D<span class="sr-only sm:not-sr-only">imanche</span>
          </div>
        </div>
        <div
          class="flex bg-gray-200 rounded-b-md text-xs leading-6 text-gray-700 lg:flex-auto"
        >
          <div
            :class="days.length / 7 === 6 ? 'grid-rows-6' : 'grid-rows-5'"
            class="w-full rounded-b-md grid grid-cols-7 lg:gap-px"
          >
            <div
              v-for="(day, index) in days"
              :key="day.date"
              class="lg:h-[120px] h-[50px]"
              :class="[
                day.isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-500',
                'relative px-3 py-2',
                index === days.length - 1 ? 'rounded-br-md' : '',
                index === days.length - 7 ? 'rounded-bl-md' : '',
              ]"
            >
              <time
                :datetime="day.date"
                :class="
                  day.isToday
                    ? 'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white'
                    : undefined
                "
                >{{ dayjs(day.date).format("DD") }}</time
              >
              <ol v-if="day.events.length > 0" class="mt-2 space-y-1">
                <li v-for="event in day.events" :key="event.id">
                  <nuxt-link
                    v-if="event.link"
                    class="flex rounded-full pl-2 cursor-pointer h-[12px]"
                    :class="event.color"
                    :to="event.link"
                  >
                    <p
                      class="flex-auto leading-3 truncate text-[10px] text-white font-medium"
                    >
                      {{ event.title }}
                    </p>
                  </nuxt-link>
                  <div
                    v-else
                    class="flex rounded-full pl-2 h-[12px]"
                    :class="event.color"
                  >
                    <p
                      class="flex-auto leading-3 truncate text-[10px] text-white font-medium"
                    >
                      {{ event.title }}
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ui-card>
</template>
