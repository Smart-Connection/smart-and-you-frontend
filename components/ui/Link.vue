<script setup lang="ts">
import type { RouteParamsRaw } from "#vue-router";

// Props
const props = defineProps<{
  routeName: string;
  routeParams?: RouteParamsRaw;
}>();

// Composable
const { asAccess } = useRouteList();
</script>
<template>
  <nuxt-link
    v-if="asAccess(routeName)"
    :to="{ name: routeName, params: routeParams }"
    class="text-blue-800"
  >
    <slot />
  </nuxt-link>
  <div v-else>
    <slot />
  </div>
</template>
