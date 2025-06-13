<script setup lang="ts">
import { LiquidWeb } from 'liquid-web/vue';

interface AppButtonProps {
  type?: 'button' | 'submit' | 'reset';
  to?: string;
  title?: string | null;
  disabled?: boolean;
  tabindex?: string | number | null;
  icon?: string | null;
}

const props = withDefaults(defineProps<AppButtonProps>(), {
  type: 'button',
  icon: '',
});

const { component, linkProps, icon } = useButton(props);
</script>

<template>
  <LiquidWeb
    class="button-wrapper"
    :options="{ saturation: 120, mode: 'standard' }"
  >
    <component
      class="button"
      :is="component"
      v-bind="linkProps"
      :type="!to ? type : null"
      :title="title ?? $slots.default?.()?.[0]?.children ?? ''"
      :tabindex="tabindex || null"
      :disabled="disabled || null"
    >
      <span class="button__text"><slot></slot></span>
      <span class="button__icon" v-if="props.icon">
        <component :is="icon" class="icon" />
      </span>
    </component>
  </LiquidWeb>
</template>
