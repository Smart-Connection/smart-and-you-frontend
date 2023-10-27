<template>
  <nav class="bg-white shadow">
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between items-center">
        <h2 class="text-2xl font-bold text-gray-900">
          {{ getCurrentRoute?.label }}
        </h2>

        
      </div>
    </div>
  </nav>
  <div class="md:flex md:items-center md:justify-between">
    <div class="min-w-0 flex-1"></div>
  </div>
</template>
<script lang="ts" setup>
// Composables
const { routes } = useRouteList();
const route = useRoute();

// Computed
const getCurrentRoute = computed(() =>
  routes.find((element) => element.path === route.path)
);
</script>
