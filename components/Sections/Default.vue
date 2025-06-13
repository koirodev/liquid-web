<script setup lang="ts">
interface SectionsDefaultProps {
  title?: string;
  description?: string;
}

defineProps<SectionsDefaultProps>();
</script>

<template>
  <component :is="title ? 'section' : 'div'" class="section">
    <div class="container">
      <div class="section__head" v-if="title || description">
        <h2 class="h2 w-full max-w-[1300px]" v-if="title" v-html="title"></h2>
        <p
          class="text_base w-full max-w-[1300px] text-light/70"
          v-if="description"
          v-html="description"
        ></p>
      </div>
      <div class="section__content">
        <slot></slot>
      </div>
    </div>
  </component>
</template>
