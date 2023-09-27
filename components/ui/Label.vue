<script lang="ts" setup>
const props = defineProps<{
  color: string;
}>();

const getColor = computed(() => {
  if (props.color === "gray") {
    return "bg-gray-50 text-gray-600 ring-gray-500/10";
  } else if (props.color === "red") {
    return "bg-red-50 text-red-700 ring-red-600/10";
  } else if (props.color === "red") {
    return "bg-yellow-50 text-yellow-800 ring-yellow-600/20";
  } else if (props.color === "green") {
    return "bg-green-50 text-green-700 ring-green-600/20";
  } else if (props.color === "blue") {
    return "bg-blue-50 text-blue-700 ring-blue-700/10";
  } else if (props.color === "indigo") {
    return "bg-indigo-50 text-indigo-700 ring-indigo-700/10";
  } else if (props.color === "purple") {
    return "bg-purple-50 text-purple-700 ring-purple-700/10";
  } else if (props.color === "pink") {
    return "bg-pink-50 text-pink-700 ring-pink-700/10";
  }
});
</script>
<template>
  <span
    :class="getColor"
    class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset"
  >
    <slot />
  </span>
</template>
