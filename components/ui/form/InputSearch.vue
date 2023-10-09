<script lang="ts" setup>
// Imports
import { useField } from "vee-validate";

// Props & Emits & Refs
const emits = defineEmits(["focus"]);
const props = defineProps<{
  iconLeft?: string;
  iconRight?: string;
  hideDetail?: boolean;
  label?: string;
  placeholder?: string;
  noScroll?: boolean;
  autocomplete?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
}>();

// Data
const value = defineModel();
const input = ref(null);
const inputContainer = ref(null);

// Computed
const getPadding = computed(() => {
  if (props.iconLeft) {
    return "";
  } else if (props.iconRight) {
    return "";
  } else {
    return "px-[12px]";
  }
});
</script>
<template>
  <div
    ref="inputContainer"
    class="w-full"
    :class="[hideDetail ? '' : 'mb-[16px]']"
  >
    <label
      v-if="label"
      class="font-medium text-sm mb-[8px] block text-gray-500"
    >
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="w-full relative">
      <!-- icon -->
      <input
        ref="input"
        :autocomplete="autocomplete"
        :disabled="disabled"
        :placeholder="placeholder"
        :class="[
          getPadding,
          error
            ? 'border-red-600 focus:border-red-600 focus:ring-red-100'
            : 'border-gray-300 focus:border-indigo-600 focus:ring-indigo-100',
        ]"
        class="shadow h-[38px] text-md autofill:bg-white outline-none focus:ring-[2px] ring-offset-0 focus:shadow-none border-[1px] w-full text-[14px] text-gray-700 rounded-[8px]"
        type="text"
        @focus="emits('focus')"
        v-model="value"
      />
      <span class="absolute right-0 top-[38px] text-red-500 text-sm">
        {{ error }}
      </span>
      <!-- icon -->
    </div>
  </div>
</template>
