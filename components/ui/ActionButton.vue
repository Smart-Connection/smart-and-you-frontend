<script lang="ts" setup>
import type { RouteParamsRaw } from "#vue-router";
import { FunctionalComponent } from "nuxt/dist/app/compat/capi";

defineProps<{
  routeName: string;
  routeParams?: RouteParamsRaw;
  icon: FunctionalComponent;
}>();

// Composable
const { asAccess } = useRouteList();
</script>
<template>
  <nuxt-link
    v-if="asAccess(routeName)"
    class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-blue-800"
    :to="{ name: routeName, params: routeParams }"
  >
    <component :is="icon" class="w-4 h-4" />
  </nuxt-link>
</template>
