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
      class="bg-violet-950 flex flex-col justify-between h-[100svh] w-full lg:w-[250px] top-0 lg:relative absolute z-[8000] p-4 transition-all"
      :class="opened ? 'translate-x-0' : 'lg:translate-x-0 -translate-x-full'"
    >
      <!-- Logo -->
      <div>
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
                    child.routes.includes($route?.name?.toString() ?? '')
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
                  child.routes.includes(route.name?.toString() ?? '')
                    ? 'select-background-color'
                    : '',
                ]"
                class="text-gray-50 flex items-center justify-between hover:bg-violet-900 rounded-md cursor-pointer duration-150 transition-all"
                :to="{ name: child.name }"
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
                link.routes?.includes($route?.name?.toString() ?? '')
                  ? 'bg-violet-900 backdrop-opacity-10'
                  : ''
              "
              :to="{ name: link.name }"
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

      <!-- Account -->
      <div class="mb-4">
        <Menu as="div" class="relative">
          <MenuButton class="-m-1.5 flex items-center p-1.5">
            <span class="sr-only">Open user menu</span>
            <img
              class="h-8 w-8 rounded-full bg-gray-50"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
            <span class="flex items-center justify-between">
              <span
                class="ml-4 text-sm font-semibold leading-6 text-white"
                aria-hidden="true"
              >
                {{ user.firstname }} {{ user.lastname }}</span
              >
              <ChevronDownIcon
                class="ml-4 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </MenuButton>
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <MenuItems
              class="absolute bottom-[50px] right-0 z-10 mt-2.5 w-[100%] origin-bottom-right rounded-md bg-white p-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
            >
              <MenuItem v-slot="{ active, close }">
                <div
                  class="block px-3 py-2 text-sm rounded-sm leading-6 text-gray-900 hover:bg-gray-50 cursor-pointer"
                  @click="close(), router.push('/account'), (opened = false)"
                >
                  Mon compte
                </div>
              </MenuItem>
              <MenuItem v-slot="{ active, close }">
                <div
                  class="block px-3 py-2 text-sm rounded-sm leading-6 text-red-600 hover:bg-gray-50 cursor-pointer"
                  @click="
                    close(),
                      logout(),
                      router.push('/auth/login'),
                      (opened = false)
                  "
                >
                  Se déconnecter
                </div>
              </MenuItem>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onClickOutside } from "@vueuse/core";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import {
  ChevronRightIcon,
  Bars2Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/vue/24/solid";
import { User } from "~/types/entity/User";
import { logout } from "@/services/AuthService";

// Composable
const router = useRouter();
const route = useRoute();
const { links } = useRouteList();

// Data
const opened = ref<boolean>(false);
const sidebar = ref(null);
const parentroutestatus = ref<string>("");
const user = useState<User>("user");

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
    link.child?.find((element) =>
      element.routes.includes(route?.name?.toString() ?? "")
    )
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
