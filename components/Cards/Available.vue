<script setup lang="ts">
import { LiquidWeb } from 'liquid-web/vue';

interface CardsAvailableProps {
  image: string;
  title: string;
  to: string;
}

defineProps<CardsAvailableProps>();
</script>

<template>
  <div class="card-container relative w-full overflow-hidden rounded">
    <img
      class="animation-default absolute left-0 top-0 flex aspect-square size-full transition-transform"
      loading="lazy"
      width="150"
      height="150"
      :src="image"
      :alt="title"
    />
    <LiquidWeb
      :options="{ saturation: 100, mode: 'standard', blur: 20, scale: 100 }"
    >
      <AppLink
        class="flex-start animation-default h-auto w-full flex-col gap-3 rounded border border-stroke p-4 transition-colors any-hover:border-stroke/60"
        :to="to"
      >
        <img
          class="mx-auto flex aspect-square w-3/4"
          loading="lazy"
          width="150"
          height="150"
          :src="image"
          :alt="title"
        />
        <span
          class="text_xl animation-default transition-padding max-mm:text_xs self-center text-center text-light"
        >
          {{ title }}
        </span>
      </AppLink>
    </LiquidWeb>
  </div>
</template>

<style lang="scss" scoped>
.card-container {
  @include hover {
    > img {
      transform: scale(1.4);
    }
  }
}
</style>
