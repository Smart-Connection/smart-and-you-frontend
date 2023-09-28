<script lang="ts" setup>
// Imports
import { ref } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";
import { useField } from "vee-validate";

// Props
const props = defineProps<{
  required?: boolean;
  label?: string;
  name: string;
  items: { key: string; value: string }[];
  hideDetail?: boolean;
  disabled?: boolean;
}>();

// Data
const { value, errorMessage } = useField<string>(props.name);
</script>
<template>
  <div class="w-full" :class="[hideDetail ? '' : 'mb-[16px]']">
    <label
      v-if="label"
      :class="errorMessage ? 'text-red-380' : 'text-gray-500'"
      class="font-medium text-sm mb-[8px] block"
    >
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="w-full relative">
      <select
        id="location"
        name="location"
        v-model="value"
        :disabled="disabled"
        :class="[
          errorMessage
            ? 'border-red-600 focus:border-red-600 focus:ring-red-100'
            : 'border-gray-300 focus:border-indigo-600 focus:ring-indigo-100',
        ]"
        class="mt-2 shadow block w-full h-[38px] rounded-[8px] py-1.5 pl-3 pr-10 outline-none focus:ring-[2px] ring-offset-0 focus:shadow-none border-[1px] text-[14px] text-gray-700"
      >
        <option :key="item.key" v-for="item in items" :value="item.key">
          {{ item.value }}
        </option>
      </select>
      <span class="absolute right-0 top-[38px] text-red-500 text-sm">
        {{ errorMessage }}
      </span>
    </div>
  </div>
</template>
