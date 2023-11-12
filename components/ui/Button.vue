<script lang="ts" setup>
import type { RouteParamsRaw } from "#vue-router";

// Props & emits
const props = defineProps<{
  text?: string;
  type?: "button" | "submit";
  color?: "primary" | "secondary" | "terciary" | "error";
  size?: "small" | "big";
  block?: boolean;
  loading?: boolean;
  routeName?: string;
  routeParams?: RouteParamsRaw;
}>();
const emits = defineEmits(["click"]);

// Composable
const { asAccess } = useRouteList();

// Computed
const getColor = computed(() => {
  if (props.color === "primary" || !props.color) {
    return "bg-indigo-600 font-medium text-white shadow-sm border-none";
  } else if (props.color === "secondary") {
    return "ring-1 ring-inset ring-gray-300 justify-center bg-white font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300";
  } else if (props.color === "error") {
    return "border-[1px] border-red-600 justify-center bg-red-600 font-medium text-white shadow-sm";
  } else {
    return "bg-indigo-600 font-medium text-white shadow-sm";
  }
});

const getSize = computed(() => {
  if (props.size === "small") {
    return "h-[24px] rounded-md px-2 text-xs inline-flex block items-center justify-center";
  } else {
    return "h-[36px] rounded-md px-4 text-sm inline-flex block items-center justify-center";
  }
});

const click = () => {
  if (!props.loading) {
    emits("click");
  }
};
</script>
<template>
  <nuxt-link
    v-if="routeName && asAccess(routeName)"
    :to="{ name: routeName, params: routeParams }"
  >
    <button
      :type="type ? type : 'button'"
      class="relative select-none"
      :class="[getColor, getSize, block ? 'w-full' : '']"
    >
      <div
        v-if="loading"
        class="absolute w-full h-full flex justify-center items-center top-0 left-0 rounded-md"
        :class="[getColor]"
      >
        <ui-loader class="w-5" />
      </div>

      {{ text }}
      <slot />
    </button>
  </nuxt-link>
  <button
    v-if="!routeName"
    :type="type ? type : 'button'"
    class="relative select-none"
    :class="[getColor, getSize, block ? 'w-full' : '']"
    @click="click()"
  >
    <div
      v-if="loading"
      class="absolute w-full h-full flex justify-center items-center top-0 left-0 rounded-md"
      :class="[getColor]"
    >
      <ui-loader class="w-5" />
    </div>

    {{ text }}
    <slot />
  </button>
</template>
