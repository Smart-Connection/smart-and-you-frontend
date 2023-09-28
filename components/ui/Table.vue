<script lang="ts" setup>
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/solid";

const emits = defineEmits(["page"]);
const props = defineProps<{
  headers: { label: string; key: string }[];
  items?: any[];
  loading?: boolean;
  curentPage: number | undefined;
  numberOfPage: number | undefined;
}>();

// Methods
const previousPage = () => {
  if (props.curentPage && props.curentPage > 1) {
    emits("page", props.curentPage - 1);
  }
};

const nextPage = () => {
  if (
    props.numberOfPage &&
    props.curentPage &&
    props.curentPage < props.numberOfPage
  ) {
    emits("page", props.curentPage + 1);
  }
};
</script>
<template>
  <div class="px-4 lg:px-4">
    <div class="flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  :key="`th-${header.key}`"
                  v-for="header in headers"
                  scope="col"
                  class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  {{ header.label }}
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr
                v-if="loading"
                :key="`td-loading-${index}`"
                v-for="(item, index) in 5"
              >
                <td
                  :key="`td-${header.key}`"
                  v-for="header in headers"
                  class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0"
                >
                  <div
                    class="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-48 animate-pulse"
                  ></div>
                </td>
              </tr>
              <tr v-else :key="`td-${item.id}`" v-for="item in items">
                <td
                  :key="`td-${header.key}`"
                  v-for="header in headers"
                  class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0"
                >
                  <slot :name="`item-${header.key}`" :item="item">
                    {{ item[header.key] ?? "--" }}
                  </slot>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="curentPage && numberOfPage"
    class="flex items-center justify-end border-t border-gray-200 bg-white pt-6 pb-2"
  >
    <div>
      <nav
        class="isolate inline-flex -space-x-px rounded-md shadow-sm"
        aria-label="Pagination"
      >
        <div
          class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer"
          @click="previousPage()"
        >
          <ChevronLeftIcon class="h-5 w-5" />
        </div>
        <div
          class="relative select-none z-10 inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          {{ curentPage }} / {{ numberOfPage }}
        </div>
        <div
          class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 cursor-pointer"
        >
          <ChevronRightIcon class="h-5 w-5" @click="nextPage()" />
        </div>
      </nav>
    </div>
  </div>
</template>
