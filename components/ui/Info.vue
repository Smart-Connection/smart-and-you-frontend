<script setup lang="ts">
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/vue/24/outline";
import { XMarkIcon } from "@heroicons/vue/20/solid";

defineProps<{
  type: "alert" | "error" | "success";
  title: string;
  description: string;
}>();
</script>
<template>
  <div
    class="pointer-events-auto w-full overflow-hidden rounded-lg bg-white shadow ring-1 ring-black ring-opacity-5"
  >
    <div class="p-4 h-full">
      <div class="flex items-center h-full">
        <div class="flex h-full items-start">
          <CheckCircleIcon
            v-if="type === 'success'"
            class="h-6 w-6 text-green-400"
            aria-hidden="true"
          />
          <ExclamationCircleIcon
            v-if="type === 'error'"
            class="h-6 w-6 text-red-400"
            aria-hidden="true"
          />
          <ExclamationTriangleIcon
            v-if="type === 'alert'"
            class="h-6 w-6 text-orange-400"
            aria-hidden="true"
          />
        </div>
        <div class="ml-3 w-0 flex-1">
          <p class="text-sm font-medium text-gray-900">{{ title }}</p>
          <p class="mt-1 text-sm text-gray-500">
            {{ description }}
          </p>
        </div>
        <div class="ml-4 flex flex-shrink-0">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
