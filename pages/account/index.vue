<template>
  <div class="grid md:grid-cols-2 gap-4">
    <modules-account-personnal-information-form />
    <modules-account-auth-information-form />
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
  middleware: ["role"],
});
</script>
