<template>
  <div>
    <modules-user-list />
  </div>
</template>
<script lang="ts" setup>
definePageMeta({
  middleware: ["role"],
});
</script>
