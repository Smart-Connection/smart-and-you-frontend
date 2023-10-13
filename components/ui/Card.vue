<template>
  <div class="bg-white flex flex-col shadow rounded-lg w-full h-full">
    <div
      v-if="title"
      class="border-b border-gray-200 px-4 py-4 flex items-center justify-between"
    >
      <h3 class="text-base font-semibold leading-6 text-gray-900">
        {{ title }}
      </h3>
      <slot name="headerActions" />
    </div>
    <div class="p-4 flex-auto"><slot /></div>
    <div
      v-if="$slots.bottomActions"
      class="border-t border-gray-200 px-4 py-4 flex items-center justify-end flex-none"
    >
      <slot name="bottomActions" />
    </div>
  </div>
</template>
<script lang="ts" setup>
defineProps<{
  title?: string;
}>();
</script>
