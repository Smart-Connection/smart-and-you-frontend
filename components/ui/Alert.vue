<template>
  <div
    class="rounded-md p-4 fixed top-[25px] border-solid border transition-all duration-500"
    :class="[
      alert?.type === 'success'
        ? 'bg-green-50 border-green-400'
        : 'bg-red-50 border-red-400',
      alert?.status ? 'right-[25px]' : '-right-[100%]',
    ]"
  >
    <div class="flex">
      <div class="flex-shrink-0">
        <CheckCircleIcon
          v-if="alert?.type === 'success'"
          class="h-5 w-5 text-green-400"
        />
        <XCircleIcon v-else class="h-5 w-5 text-red-400" />
      </div>
      <div class="ml-3">
        <p
          class="text-sm font-medium"
          :class="[
            alert?.type === 'success' ? 'text-green-800' : 'text-red-800',
          ]"
        >
          {{ alert?.message }}
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { CheckCircleIcon, XCircleIcon } from "@heroicons/vue/24/solid";

const alert = useState<{ message: string; type: string; status: boolean }>(
  "alert"
);

watch(
  () => alert.value?.status,
  () => {
    if (alert.value?.status) {
      setTimeout(() => {
        alert.value.status = false;
      }, 3000);
    }
  }
);
</script>
