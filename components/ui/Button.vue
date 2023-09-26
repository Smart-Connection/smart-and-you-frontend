<template>
  <button
    :type="type ? type : 'button'"
    class="relative"
    :class="[getColor, getSize, block ? 'w-full' : '']"
    @click="emits('click')"
  >
    <div>
      <div
        v-if="loading"
        class="absolute w-full h-full flex justify-center items-center top-0 left-0 rounded-md"
        :class="[getColor]"
      >
        <ui-loader class="w-5" />
      </div>

      {{ text }}
      <slot />
    </div>
  </button>
</template>
<script lang="ts" setup>
// Props & emits
const props = defineProps<{
  text?: string;
  type?: "button" | "submit";
  color?: "primary" | "secondary" | "terciary" | "error";
  size?: "small" | "big";
  block?: boolean;
  loading?: boolean;
}>();
const emits = defineEmits(["click"]);

// Computed
const getColor = computed(() => {
  if (props.color === "primary" || !props.color) {
    return "bg-indigo-600 font-medium text-white shadow-sm";
  } else if (props.color === "secondary") {
    return "border-gray-300 px-4 justify-center bg-white font-medium text-gray-700 shadow-sm";
  } else if (props.color === "error") {
    return "border-[1px] border-red-600 justify-center bg-white font-medium text-red-600 shadow-sm";
  } else {
    return "bg-indigo-600 font-medium text-white shadow-sm";
  }
});

const getSize = computed(() => {
  if (props.size === "small") {
    return "h-[24px] rounded-md px-2 text-xs inline-flex block items-center justify-center";
  } else {
    return "h-[36px] rounded-md px-4 text-sm inline-flex block items-center justify-center";
  }
});
</script>