<template>
  <nav class="bg-white shadow">
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between items-center">
        <h2 class="text-2xl font-bold text-gray-900">
          {{ getCurrentRoute?.label }}
        </h2>

        <div class="md:ml-4 md:flex md:flex-shrink-0 md:items-center">
          <nuxt-link
            type="button"
            class="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            id="user-menu-button"
            aria-expanded="false"
            aria-haspopup="true"
            to="/account"
          >
            <img
              class="h-8 w-8 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </nuxt-link>
        </div>
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
