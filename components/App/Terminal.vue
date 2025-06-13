<script setup lang="ts">
import { LiquidWeb } from 'liquid-web/vue';

interface AppLinkProps {
  command: string | null;
}

const props = withDefaults(defineProps<AppLinkProps>(), {
  command: null,
});

const isCopied = ref(false);

const copyCommand = () => {
  const text = props.command || '';
  if (
    navigator.clipboard &&
    typeof navigator.clipboard.writeText === 'function'
  ) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        isCopied.value = true;
        setTimeout(() => {
          isCopied.value = false;
        }, 5000);
      })
      .catch(() => {});
  } else {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      document.execCommand('copy');
      isCopied.value = true;
      setTimeout(() => {
        isCopied.value = false;
      }, 5000);
    } catch (e) {}
    document.body.removeChild(textarea);
  }
};
</script>

<template>
  <LiquidWeb class="w-full" :options="{ saturation: 100 }">
    <div
      class="relative inline-flex size-fit w-full items-center gap-2 rounded-infinity border border-stroke-light p-2"
    >
      <span class="icon-wrapper">
        <SvgFiRrAngleSmallRight class="icon" />
      </span>
      <input
        class="w-full bg-transparent text-base"
        type="text"
        disabled
        autocomplete="off"
        :name="`command ${command}`"
        :value="command"
        aria-label="Copy command"
      />
      <span class="icon-wrapper">
        <button
          type="button"
          :aria-label="!isCopied ? 'Copy' : 'Copied!'"
          padded="false"
          @click.prevent="copyCommand"
          v-tippy
        >
          <SvgFiRrCopy class="icon" v-if="!isCopied" />
          <SvgFiRrCheck class="icon" v-else />
        </button>
      </span>
    </div>
  </LiquidWeb>
</template>

<style lang="scss" scoped>
.icon {
  --icon-color: theme('colors.light.DEFAULT');
  --icon-size: 100%;
}

.icon-wrapper {
  @apply size-5 shrink-0;
}
</style>
