<script setup lang="ts">
import { ANIMATION } from '~/config';

const { $gsap, $cubicDefault } = useNuxtApp();

const pageRef: Ref<HTMLElement | null> = ref(null);
const isLoad = ref(false);
const isPreloader = ref(true);
const isOldBrowser = useState('isOldBrowser');

onMounted(() => {
  setTimeout(() => {
    isLoad.value = true;
    if (!pageRef.value) return;

    pageRef.value.classList.remove('overflow-hidden');
    pageRef.value.classList.remove('h-screen');

    setTimeout(() => {
      isPreloader.value = false;
    }, ANIMATION.DEFAULT * 1000);
  }, ANIMATION.DEFAULT * 1000);
});

watchEffect(() => {
  useHead({
    htmlAttrs: {
      lang: 'en',
      class: 'page',
    },
    bodyAttrs: {
      class: 'page__body',
    },
  });
});
</script>

<template>
  <div>
    <NuxtLoadingIndicator color="#89ffff" v-if="isLoad" />
    <LazyErrorOldBrowser v-if="isOldBrowser" />

    <AppPreloader
      :class="{
        'preloader-hidden': isLoad,
      }"
      v-if="isPreloader"
    />

    <div class="h-screen overflow-hidden font-primary" ref="pageRef">
      <BaseHeader />

      <div class="wrapper">
        <div class="wrapper__content">
          <main class="main">
            <slot></slot>
          </main>

          <LazyBaseFooter />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.preloader-hidden {
  @apply animation-default invisible opacity-0 transition-[opacity_visibility];
}
</style>
