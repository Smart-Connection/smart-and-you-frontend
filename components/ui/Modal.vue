<script lang="ts" setup>
import { onClickOutside } from "@vueuse/core";

// Props
defineProps<{
  title: string;
}>();

// Data
const target = ref(null);

// Status
const modelValue = defineModel();

// Functions
onClickOutside(target, () => (modelValue.value = false));
</script>
<template>
  <transition>
    <div
      v-if="modelValue"
      class="relative z-[8001]"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity flex items-center justify-center"
      >
        <div
          ref="target"
          class="bg-white flex flex-col shadow rounded-lg w-[95%] md:w-[700px] max-h-[90%]"
        >
          <div
            class="border-b border-gray-200 px-4 py-4 flex items-center justify-between"
          >
            <h3 class="text-base font-semibold leading-6 text-gray-900">
              {{ title }}
            </h3>
            <slot name="headerActions" />
          </div>
          <div class="p-4 flex-auto overflow-y-auto">
            <slot />
          </div>
          <div
            class="border-t border-gray-200 px-4 py-4 flex items-center justify-end flex-none"
          >
            <ui-button
              color="secondary"
              class="mr-2"
              @click="modelValue = false"
            >
              Fermer
            </ui-button>
            <slot name="bottomActions" />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<style lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
