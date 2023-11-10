<script lang="ts" setup>
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
} from "@heroicons/vue/24/solid";
import { Pagination } from "~/types/api/Global";

const emits = defineEmits(["page", "add"]);
const props = defineProps<{
  headers: { label: string; key: string; align?: string }[];
  data: Pagination<any[]> | null | any;
  loading?: boolean;
}>();

// Methods
const previousPage = () => {
  if (props.data?.current_page && props.data?.current_page > 1) {
    emits("page", props.data?.current_page - 1);
  }
};

const nextPage = () => {
  if (
    props.data?.current_page &&
    props.data.current_page < props.data.last_page
  ) {
    emits("page", props.data?.current_page + 1);
  }
};

const add = () => {
  emits("add");
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
                  :class="
                    header.align === 'center'
                      ? 'flex items-center justify-center'
                      : ''
                  "
                >
                  {{ header.label }}
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-if="!loading && data.data.length === 0">
                <td :colSpan="headers.length">
                  <div class="flex justify-center items-center w-full py-10">
                    <div class="text-center">
                      <h3 class="mt-2 text-sm font-semibold text-gray-900">
                        Aucun résultat
                      </h3>
                      <p class="mt-1 text-sm text-gray-500">
                        Aucun donné pour cette page
                      </p>
                      <div class="mt-6">
                        <ui-button @click="add()">
                          <PlusIcon
                            class="-ml-0.5 mr-1.5 h-5 w-5"
                            aria-hidden="true"
                          />
                          Ajouter
                        </ui-button>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>

              <tr
                v-if="loading"
                :key="`td-loading-${index}`"
                v-for="(number, index) in 5"
              >
                <td
                  :key="`td-${header.key}`"
                  v-for="header in headers"
                  class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0"
                >
                  <div
                    class="h-3.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 animate-pulse"
                  ></div>
                </td>
              </tr>
              <tr
                v-if="!loading && data?.data"
                :key="`td-${element.id}`"
                v-for="element in data?.data"
              >
                <td
                  :key="`td-${header.key}`"
                  v-for="header in headers"
                  class="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0"
                  :class="
                    header.align === 'center'
                      ? 'flex items-center justify-center space-x-1'
                      : ''
                  "
                >
                  <slot :name="`item-${header.key}`" :item="element"
                    >^
                    {{ element[header.key] ?? "--" }}
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
    v-if="data?.current_page && data.last_page"
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
          {{ data.current_page }} / {{ data.last_page }}
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
