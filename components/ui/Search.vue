<script lang="ts" setup>
import { useDebounceFn } from "@vueuse/core";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/solid";

// Emits
const emits = defineEmits(["search"]);

const searchText = ref<string>("");
const searchDebounced = useDebounceFn(() => {
  emits("search", searchText.value);
}, 500);

watch([searchText], () => {
  searchDebounced();
});
</script>
<template>
  <div
    class="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end"
  >
    <div class="w-full max-w-lg lg:max-w-xs">
      <label for="search" class="sr-only">Rechercher</label>
      <div class="relative">
        <div
          class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
        >
          <MagnifyingGlassIcon
            class="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </div>
        <input
          id="search"
          name="search"
          class="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Search"
          type="search"
          v-model="searchText"
        />
      </div>
    </div>
  </div>
</template>
