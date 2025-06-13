<script setup>
import { useBurgerStore } from '~/stores/burgerStore';
import { LiquidWeb } from 'liquid-web/vue';

const burgerStore = useBurgerStore();
const isMobile = ref(false);

useWindowWidthResize(() => {
  isMobile.value = window.innerWidth <= 780;
});

onMounted(() => {
  nextTick(() => {
    isMobile.value = window.innerWidth <= 780;
  });
});
</script>

<template>
  <LiquidWeb class="ml-auto" :options="{ saturation: 100 }" v-if="isMobile">
    <button
      :class="['burger-button', { active: burgerStore.isBurgerOpen }]"
      @click="burgerStore.toggleBurger"
    >
      <span></span>
    </button>
  </LiquidWeb>
</template>
