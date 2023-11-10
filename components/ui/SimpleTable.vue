<script setup lang="ts">
import { PlusIcon } from "@heroicons/vue/24/solid";

// Defined props
const emits = defineEmits(["page", "add"]);
defineProps<{
  headers: { key: string; label: string }[];
  items: any;
  loading?: boolean;
}>();

// functions
const add = () => {
  emits("add");
};
</script>
<template>
  <table class="divide-y divide-gray-300 w-full">
    <thead>
      <tr>
        <th
          :key="header.label"
          v-for="header in headers"
          :class="header.label === 'Actions' ? 'text-center' : ''"
          class="pb-3 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
        >
          {{ header.label }}
        </th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <tr
        v-if="loading"
        :key="`tr-loading-${index}`"
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
      <tr v-if="!loading && items.length === 0">
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
                  <PlusIcon class="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                  Ajouter
                </ui-button>
              </div>
            </div>
          </div>
        </td>
      </tr>
      <tr v-else :key="item.id" v-for="(item, index) in items">
        <td
          :key="`body-${header.label}`"
          v-for="header in headers"
          class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0"
          :class="
            header.label === 'Actions' ? 'flex items-center justify-center' : ''
          "
        >
          <slot :name="`item-${header.key}`" :item="item">
            {{ item[header.key] ?? "--" }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>
