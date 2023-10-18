<script lang="ts" setup>
defineProps<{
  to?: string;
}>();
</script>
<template>
  <nuxt-link
    class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-blue-800"
    :to="to"
  >
    <slot />
  </nuxt-link>
</template>
