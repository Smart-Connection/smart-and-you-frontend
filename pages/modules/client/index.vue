<template>
  <modules-client-list />
</template>
<script lang="ts" setup>
definePageMeta({
  middleware: ["role"],
});
</script>
