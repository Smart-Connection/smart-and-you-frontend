<script lang="ts" setup>
const props = defineProps<{
  fields: {
    key?: string;
    label: string;
    value: any;
    to?: string;
  }[];
  loading?: boolean;
  columnsCount?: 1 | 2 | 3 | 4;
}>();
const colCount = props.columnsCount ?? 2;

const columnFields = computed(() => {
  const fields = props.fields;
  const arr = [];
  for (let i = 0; i < colCount; i++) {
    const columnLength = Math.ceil(fields.length / (colCount - i));
    arr.push(fields.splice(0, columnLength));
  }

  return arr;
});
</script>

<template>
  <div v-if="loading" class="grid gap-4" :class="`grid-cols-${colCount}`">
    <ui-card v-for="col in colCount" :key="col">
      <table class="w-full divide-gray-300 divide-y">
        <tr v-for="index in 5">
          <td class="w-[30%] text-gray-900 font-medium p-3">
            <div
              class="h-3.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full animate-pulse"
            ></div>
          </td>
          <td class="text-gray-600 w-[70%]">
            <div
              class="h-3.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full animate-pulse"
            ></div>
          </td>
        </tr>
      </table>
    </ui-card>
  </div>
  <div v-else class="grid gap-4" :class="`grid-cols-${colCount}`">
    <ui-card v-for="(fieldsList, index) in columnFields" :key="index">
      <table class="w-full divide-gray-300 divide-y">
        <tr v-for="field in fieldsList">
          <td class="text-gray-900 font-medium p-2.5">
            {{ field.label }}
          </td>
          <td>
            <nuxt-link v-if="field.to" :to="field.to" class="text-blue-600">
              {{ field.value }}
            </nuxt-link>
            <div v-else class="text-gray-600">
              <slot :name="`item-${field.key}`" :item="field">
                {{ field.value }}
              </slot>
            </div>
          </td>
        </tr>
      </table>
    </ui-card>
  </div>
</template>
