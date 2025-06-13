<script setup lang="ts">
import { useNPMStore } from '~/stores/npmStore';

const npmStore = useNPMStore();
</script>

<template>
  <section
    class="section relative flex min-h-screen flex-col justify-center border-b border-stroke-light max-mt:min-h-fit max-mt:justify-start"
  >
    <div
      class="background pointer-events-none absolute left-0 top-0 z-10 flex size-full"
    ></div>
    <div class="container grid grid-cols-2 gap-6 max-mt:flex max-mt:flex-col">
      <div class="local-logo w-ful flex-start z-10 flex-col gap-6">
        <h1 class="flex-start gap h1 flex-col gap-2 text-primary">
          Liquid Web
          <span class="text_xl font-secondary font-medium text-light">
            Apple Liquid Glass effect by Prismify
          </span>
        </h1>
        <div class="flex-start flex-col gap-2">
          <p class="text_base text-light/80">
            <strong>Liquid Web</strong> allows you to create the most modern
            liquid glass effect for your components in a couple of clicks!
          </p>
          <span class="text_xs text-light/40">
            MIT License,
            {{ `${npmStore.versionPrefix}${npmStore.version}` }}
            released on {{ npmStore.releaseDate }}
          </span>
        </div>
        <AppButton
          to="https://github.com/koirodev/liquid-web?tab=readme-ov-file#installation"
          icon="fi-rr-rocket"
          >Get Started</AppButton
        >
      </div>
      <AppTerminal
        class="z-10 m-auto max-w-[300px] max-mt:m-0"
        command="npm install liquid-web"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.section {
  margin-top: calc(0px - var(--global-header-height, 80px));

  padding: var(--global-header-height, 80px) 0;

  @include mediaTablet {
    padding-top: calc(var(--global-header-height, 80px) * 2);
  }
}

.background {
  background-image: url('~/assets/svg/banner-background.svg');
  background-position: top center;
  background-size: cover;
}

.local-logo {
  @apply relative;

  &::before {
    background-image: url('~/assets/svg/stroke-logo.svg');
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;

    @apply absolute -left-0 -top-16 -z-10 size-64 opacity-10 content-[''];
  }
}
</style>
