<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";
import { useField } from "vee-validate";
import { Pagination } from "~/types/api/Global";
import { onClickOutside } from "@vueuse/core";

// Props
const emits = defineEmits(["change"]);
const props = defineProps<{
  name: string;
  label?: string;
  itemKey: string;
  itemLabel: string;
  items: Pagination<any> | null | undefined;
  required?: boolean;
  placeholder?: string;
  default?: any;
}>();

// Composables
const { value, errorMessage } = useField(props.name);

// Data
const menuSelect = ref(null);
const search = ref();
const open = ref(false);

onMounted(() => {
  emits("change", "");
  console.log(props.default);
  if (props.default) {
    search.value = props.default.name;
  }
});

// Watch
watch([search], () => {
  searchDebounced();
});

// Functions
const select = (selectedValue: any) => {
  open.value = false;
  value.value = selectedValue[props.itemKey];
  search.value = selectedValue[props.itemLabel];
};

onClickOutside(menuSelect, () => (open.value = false));

const searchDebounced = useDebounceFn(() => {
  emits("change", search.value);
}, 100);
</script>
<template>
  <div class="relative" ref="menuSelect">
    <ui-form-input-search
      :label="label"
      :required="required"
      :placeholder="placeholder"
      v-model="search"
      :error="errorMessage"
      @focus="open = true"
    />

    <div
      class="w-full bg-white shadow rounded-md absolute p-1 z-50 top-[72px]"
      v-if="items && open"
    >
      <div
        :key="item[itemKey]"
        v-for="item in items.data"
        @click="select(item)"
        class="text-sm hover:bg-blue-600 hover:text-white p-3 rounded cursor-pointer"
      >
        {{ item[itemLabel] }}
      </div>
      <div
        v-if="items.data.length === 0"
        class="text-sm p-3 rounded cursor-pointer"
      >
        Aucun donnée
      </div>
    </div>
  </div>
</template>
