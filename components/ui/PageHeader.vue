<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/20/solid";

defineProps<{
  title: string;
  breadcrumbs?: { label: string; path: string }[];
}>();
</script>

<template>
  <div class="mb-8">
    <div v-if="breadcrumbs">
      <nav v-if="breadcrumbs?.length > 1" class="sm:hidden" aria-label="Back">
        <nuxt-link
          :to="breadcrumbs[0].path"
          class="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          <ChevronLeftIcon
            class="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400"
            aria-hidden="true"
          />
          Back
        </nuxt-link>
      </nav>
      <nav
        v-if="breadcrumbs?.length > 1"
        class="hidden sm:flex"
        aria-label="Breadcrumb"
      >
        <ol role="list" class="flex items-center">
          <li v-for="(breadcrumb, index) in breadcrumbs">
            <div class="flex" :class="index !== 0 ? 'items-center' : ''">
              <ChevronRightIcon
                v-if="index !== 0"
                class="h-5 w-5 flex-shrink-0 text-gray-400 mx-1"
                aria-hidden="true"
              />
              <nuxt-link
                :to="breadcrumb.path"
                class="text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                {{ breadcrumb.label }}
              </nuxt-link>
            </div>
          </li>
        </ol>
      </nav>
    </div>
    <div class="mt-2 md:flex md:items-center md:justify-between">
      <div class="min-w-0 flex-1">
        <h2
          class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight"
        >
          {{ title }}
        </h2>
      </div>
      <div class="mt-4 flex flex-shrink-0 md:ml-4 md:mt-0">
        <slot />
      </div>
    </div>
  </div>
</template>
