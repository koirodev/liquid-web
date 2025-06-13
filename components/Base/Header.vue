<script setup lang="ts">
import { LiquidWeb } from 'liquid-web/vue';

const { isHeaderHidden } = useHeaderScroll();
const { $globalSizes } = useNuxtApp();
const isStartPosition = ref(false);

const checkStartPosition = () => {
  const scrollY = window.scrollY;
  const headerHeight = $globalSizes.getGlobalHeaderHeight();
  isStartPosition.value = scrollY > headerHeight;
};

onMounted(() => {
  $globalSizes.updateAllSizes();
  checkStartPosition();

  window.addEventListener('resize', $globalSizes.updateAllSizes);
  window.addEventListener('scroll', checkStartPosition);
});

onUnmounted(() => {
  window.removeEventListener('resize', $globalSizes.updateAllSizes);
  window.removeEventListener('scroll', checkStartPosition);
});
</script>

<template>
  <LiquidWeb
    class="animation-default !fixed left-0 top-0 z-50 h-fit w-full transition-[transform]"
    :class="[{ '-translate-y-full': isHeaderHidden }]"
    :options="{
      mode: 'prominent',
      scale: 30,
      blur: 3,
      saturation: 130,
      aberration: 73,
    }"
  >
    <header
      class="h-fit w-full rounded-b rounded-bl border-b border-stroke-light bg-dark2/30 py-4"
    >
      <div class="container flex items-end justify-start gap-5">
        <AppLogo />

        <BaseNav />

        <AppBurgerButton />
      </div>
    </header>
  </LiquidWeb>
</template>
