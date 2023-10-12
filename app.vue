<template>
  <div class="bg-gray-50">
    <nuxt-layout v-if="!loading">
      <nuxt-page />
      <ui-alert />
    </nuxt-layout>
    <div v-else class="flex h-screen w-screen items-center justify-center">
      <ui-loader class="w-10" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { loadUser } from "./services/AuthService";
import { useAsyncData } from "~/composables/useAsyncData";

const user = useState("user");

const { loading, data } = useAsyncData({
  promise: () => loadUser(),
  callback: () => {
    user.value = data.value;
  },
});
</script>
