<template>
  <div>
    <div
      class="w-full h-[50px] bg-violet-950 lg:hidden px-4 flex items-center justify-between"
    >
      <!-- Logo -->
      <div
        class="w-[100px] flex items-center justify-center rounded-md text-xs"
      >
        <img src="@/assets/logo/logo-white.png" />
      </div>

      <div
        class="h-full flex items-center justify-center"
        @click="opened = true"
      >
        <Bars2Icon class="text-white w-8" />
      </div>
    </div>
    <div
      ref="sidebar"
      class="bg-violet-950 h-[100svh] w-full lg:w-[250px] lg:relative absolute z-[9999] p-4 transition-all"
      :class="opened ? 'translate-x-0' : 'lg:translate-x-0 -translate-x-full'"
    >
      <!-- Logo -->
      <div class="w-full flex justify-between items-start">
        <div
          class="lg:w-full lg:mt-5 lg:mb-12 w-[180px] mb-8 flex items-center justify-center rounded-md"
        >
          <img class="w-[80%]" src="@/assets/logo/logo-white.png" />
        </div>
        <XMarkIcon class="text-white w-8 lg:hidden" @click="opened = false" />
      </div>

      <!-- routes container -->
      <div class="sidebar-content">
        <div :key="link.label" v-for="link in links">
          <div v-if="link.child && link.hidden !== true" class="mb-2">
            <div
              :class="
                link.child.find((child) =>
                  child.routes.includes($route.path)
                ) &&
                (parentroutestatus === '' || parentroutestatus !== link.label)
                  ? 'select-background-color'
                  : ''
              "
              class="p-2 text-gray-50 flex items-center justify-between hover:bg-violet-900 rounded-md cursor-pointer"
              @click="openDropdown(link.label)"
            >
              <div class="flex">
                <component class="w-6 mr-4" :is="link.icon"></component>
                {{ link.label }}
              </div>
              <ChevronRightIcon
                class="w-6 transition-all duration-100"
                :class="
                  parentroutestatus === link.label ? 'rotate-90' : 'rotate-0'
                "
              />
            </div>
            <nuxt-link
              :key="child.label"
              v-for="child in link.child"
              :class="[
                parentroutestatus === link.label ? 'h-[40px]' : 'h-[0px]',
                child.routes.includes(route.path)
                  ? 'select-background-color'
                  : '',
              ]"
              class="text-gray-50 flex items-center justify-between hover:bg-violet-900 rounded-md cursor-pointer duration-150 transition-all"
              :to="child.path"
              @click="opened = false"
            >
              <transition>
                <div
                  v-if="parentroutestatus === link.label"
                  class="pl-[48px] select-none"
                >
                  {{ child.label }}
                </div>
              </transition>
            </nuxt-link>
          </div>
          <nuxt-link
            v-else-if="link.hidden !== true"
            class="p-2 hover:bg-violet-900 rounded-md cursor-pointer block mb-2"
            :class="
              link.routes?.includes($route.path)
                ? 'bg-violet-900 backdrop-opacity-10'
                : ''
            "
            :to="link.path"
            @click="(parentroutestatus = ''), (opened = false)"
          >
            <div class="text-gray-50 flex items-center select-none">
              <component class="w-6 mr-4" :is="link.icon"></component>
              {{ link.label }}
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onClickOutside } from "@vueuse/core";
import {
  ChevronRightIcon,
  Bars2Icon,
  XMarkIcon,
} from "@heroicons/vue/24/solid";

// Composable
const router = useRouter();
const route = useRoute();
const { links } = useRouteList();

// Data
const opened = ref<boolean>(false);
const sidebar = ref(null);
const parentroutestatus = ref<string>("");

// Functions
const openDropdown = (label: string) => {
  if (parentroutestatus.value === label) {
    parentroutestatus.value = "";
  } else {
    parentroutestatus.value = label;
  }
};

const setOpenDropdown = async () => {
  const dropdown = links.find((link) =>
    link.child?.find((element) => element.routes.includes(route.path))
  );
  if (dropdown) {
    parentroutestatus.value = dropdown.label;
  }
};

onClickOutside(sidebar, () => setOpenDropdown());

// Mounted
onMounted(() => {
  setOpenDropdown();
});
</script>
<style lang="scss">
.select-background-color {
  background-color: rgb(249, 250, 251, 0.1);
}

.sidebar-content {
  max-height: calc(100svh - 164px);
  overflow-x: auto;
}
</style>
