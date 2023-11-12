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
  items: { value: string; label: string }[];
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
const selected = ref("");

onMounted(() => {
  emits("change", "");
  if (props.default) {
    search.value = props.default.name;
    selected.value = props.default.name;
  }
});

// Watch
watch([search], () => {
  searchDebounced();
});

// Functions
const select = (selectedValue: any) => {
  open.value = false;
  value.value = selectedValue.value;
  search.value = selectedValue.label;
  selected.value = selectedValue.label;
};

onClickOutside(menuSelect, () => {
  open.value = false;
  search.value = selected.value;
});

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
        :key="item.value"
        v-for="item in items"
        @click="select(item)"
        class="text-sm hover:bg-blue-600 hover:text-white p-3 rounded cursor-pointer"
      >
        <slot name="item" :item="item">
          {{ item.label }}
        </slot>
      </div>
      <div v-if="items.length === 0" class="text-sm p-3 rounded cursor-pointer">
        Aucun donnée
      </div>
    </div>
  </div>
</template>
