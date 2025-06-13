<script setup lang="ts">
const { $stRefresh } = useNuxtApp();

interface AppTabProps {
  active?: boolean;
}

const props = withDefaults(defineProps<AppTabProps>(), {
  active: false,
});

watch(
  () => props.active,
  (newVal) => {
    if (newVal && process.client) {
      $stRefresh();
    }
  },
  { immediate: true }
);
</script>

<template>
  <button :class="['tab', { tab_active: active }]">
    <slot></slot>
  </button>
</template>
